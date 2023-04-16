const Filter = require('../Models/QuestionPaperFilter')
const QuestionPaper = require('../Models/QuestionPaper');
const fs = require('fs');

const PaperFilter = async (course, year, Semester) => {
    try {
        console.log(course, year, Semester);
        const data = await Filter.find({ course: course });

        const Year = {
            result: false,
            data: ""
        }

        const SEMESTER = {
            result: false,
            data: ""
        }

        if (!data.length) {
            const filterdata = Filter({
                course: course,
                Years: [{
                    year: year,
                    Semesters: [{
                        Semester: Semester
                    }]
                }]
            })

            await filterdata.save()
            return
        }

        data[0].Years.forEach((value1) => {
            if (value1.year == year) {
                Year.result = true;
                Year.data = value1
            }
        })

        if (Year.result) {
            Year.data.Semesters.forEach((value2) => {
                if (value2.Semester == Semester) {
                    SEMESTER.result = true;
                    SEMESTER.data = value2
                }
            })

        } else {
            await Filter.updateOne({ course: course }, {
                $push: {
                    Years: [{
                        year: year,
                        Semesters: [{
                            Semester: Semester
                        }]
                    }]
                }
            })
            return
        }


        if (!SEMESTER.result) {
            const data = await Filter.updateOne(
                { course: course, "Years.year": year },
                { $push: { "Years.$.Semesters": { Semester: Semester } } }
            );
            // console.log(data);
        }

    } catch (error) {
        console.log(error);
    }
}


const QuestionPaperAdd = async (req, res) => {
    try {
        const { course, Year, Semester } = req.fields;
        const { file } = req.files;
        // console.log(req.fields);
        // console.log(req.files);

        if (!course) {
            return res.status(401).send({ message: "Course is required" });
        } else if (!Year) {
            return res.status(401).send({ message: "Year name is required" });
        } else if (!Semester) {
            return res.status(401).send({ message: "Index name is required" });
        } else if (file && file.size > 1000000) {
            return res.status(401).send({ message: "file is required and should be less 1mb" });
        }


        const Search_Data = await QuestionPaper.find({ course: course, Year: Year, Semester: Semester })

        if (!Search_Data.length) {
            const QuestiPaper = await new QuestionPaper(req.fields);
            if (file.length) {
                for (let i = 0; i < file.length; i++) {
                    QuestiPaper.file.push({
                        data: fs.readFileSync(file[i].path),
                        contentType: file[i].type,
                        Name: `${course + " " + Semester + "-Semester" + " " + Year + " " + file[i].name}`
                    })
                }
            } else {
                // console.log(QuestiPaper);
                QuestiPaper.file.push({
                    data: fs.readFileSync(file.path),
                    contentType: file.type,
                    Name: `${course + " " + Semester + "-Semester" + " " + Year + " " + file.name}`
                })
            }

            await PaperFilter(course, Year, Semester)
            await QuestiPaper.save()
            res.status(201).send({
                success: true,
                message: "file Upload",
                data: QuestiPaper,
            })
        } else {
            return res.status(208).send(
                {
                    message: `${course} Course year ${Year} Semester ${Semester} was all ready created , kindly update the Semester`
                }
            )
        }
    } catch (error) {
        console.log(error);
        // return res.send({
        //     message: "Please check the detail",
        // });
    }
}


const QuestionPaperDisplay = async (req, res) => {
    try {

        const { course, Year, Semester } = req.params;

        // console.log(course, Year, Semester);
        if (!course) {
            return res.status(500).send("Kindly select the Course");
        } else if (!Year) {
            return res.status(500).send("Kindly select the Year");
        } else if (!Semester) {
            return res.status(500).send("Kindly select the Semester");
        }

        const Search_Data = await QuestionPaper.find({ course: course, Year: Year, Semester: Semester }).select("-file")
        // console.log(Search_Data);
        if (!Search_Data) {
            return res.send({
                message: "Data not found"
            })
        } else {
            const file = await QuestionPaper.findById({ _id: Search_Data[0]._id }).select("file")
            // console.log(file);
            let filenames = []
            for (let i = 0; i < file.file.length; i++) {
                filenames.push(file.file[i].Name);
            }
            // console.log(filenames);
            return res.status(200).send({
                Data: Search_Data,
                FileNames: filenames
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Please check the detail",
        })
    }
}

const QuestionPaperFileDisplay = async (req, res) => {
    try {
        const { _id,Index,name } = req.params;
        const Search_Data = await QuestionPaper.findById({ _id }).select("file");
        if (Search_Data) {
            res.set("Content-type", Search_Data.file[Number(Index)].contentType);
            return res.send(Search_Data.file[Number(Index)].data);
        } else {
            return res.status(404).send("Data Not Found")
        }
    } catch (error) {
        console.log(error);
        return res.send({
            message: "Please check the detail",
        })
    }
}

const QuestionPaperDelete = async (req, res) => {
    try {
        const { _id, Index } = req.params;
        console.log(req.params);
        const Search_Data = await QuestionPaper.findById({ _id }).select("file");

        if (Search_Data) {
            const FileId = Search_Data.file[Index]._id;
            const data1 = await QuestionPaper.updateOne({ _id: { $eq: _id } }, {
                $pull: {
                    file: { _id: FileId }
                }
            })
            console.log(data1);
            return res.status(200).send("Deleted")
        } else {
            return res.status(404).send("Data Not Found")
        }
    } catch (error) {
        console.log(error);
        return res.send({
            message: "Please check the detail",
        })
    }
}

const PaperFilterYearDelete = async (Year, course, Semester) => {
    try {

        const Yeardata = {
            result: false,
            data: ""
        }

        const data = await Filter.updateOne(
            { course: course, "Years.year": Year },
            { $pull: { "Years.$.Semesters": { Semester: Semester } } }
        );

        const SearData = await Filter.find({ course: course });

        SearData[0].Years.forEach((value1) => {
            if (value1.year == Year) {
                Yeardata.result = true;
                Yeardata.data = value1
            }
        })

        if (!Yeardata.data.Semesters.length) {

            const data = await Filter.updateOne(
                { course: course, "Years.year": Year },
                { $pull: { Years: { year: Year } } }
            );
        }

    } catch (error) {
        console.log(error);
    }
}

const QuestionPaperYearDelete = async (req, res) => {
    try {
        const { _id } = req.params;
        const Search_Data = await QuestionPaper.findById({ _id }).select("-file");

        if (Search_Data) {
            await PaperFilterYearDelete(Search_Data.Year, Search_Data.course, Search_Data.Semester);
            await QuestionPaper.findByIdAndDelete({ _id });
            return res.status(200).send("Delete")
        }

    } catch (error) {
        console.log(error);
        return res.send({
            message: "Please check the detail",
        })
    }
}

const QuestionPaperDisplayAll = async (req, res) => {
    try {
        const Search_Data = await QuestionPaper.find().select("-file");
        return res.status(201).send(Search_Data);
    } catch (error) {
        console.log(error);
        return res.send({
            message: "Please check the detail",
        })
    }
}

const QuestionPaperUpdate = async (req, res) => {
    try {
        const { _id } = req.params;
        const { course, Year, Semester } = req.fields;
        const { file } = req.files;
        // console.log(file);
        console.log(req.fields);
        console.log(_id);


        if (!course) {
            return res.status(401).send("Course is required");
        } else if (!Year) {
            return res.status(401).send("Year name is required");
        } else if (!Semester) {
            return res.status(401).send("Index name is required");
        } else if (file && file.size > 1000000) {
            return res.status(401).send("file is required and should be less 1mb");
        }

        const Search_Data = await QuestionPaper.findById({ _id })

        if (Search_Data) {
            const QuestiPaper = await QuestionPaper.findByIdAndUpdate(
                { _id },
                { ...req.fields },
                { new: true }
            );

            if (file.length) {
                for (let i = 0; i < file.length; i++) {
                    QuestiPaper.file.push({
                        data: fs.readFileSync(file[i].path),
                        contentType: file[i].type,
                        Name: `${course + " " + Semester + "-Semester" + " " + Year + " " + file[i].name}`
                    })
                }
            } else {
                // console.log(QuestiPaper);
                QuestiPaper.file.push({
                    data: fs.readFileSync(file.path),
                    contentType: file.type,
                    Name: `${course + " " + Semester + "-Semester" + " " + Year + " " + file.name}`
                })
            }
            PaperFilter(course,Year,Semester)
            await QuestiPaper.save();
            return res.send("Data Successfully Update")
        }
    } catch (error) {
        console.log(error);
        return res.send({
            message: "Please check the detail",
        })

    }
}

const PaperFilterDisplay = async (req, res) => {
    try {
        const { course } = req.params;
        const data = await Filter.find({ course: course });
        return res.status(200).send(data);
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    QuestionPaperAdd,
    QuestionPaperDisplay,
    QuestionPaperFileDisplay,
    QuestionPaperDelete,
    QuestionPaperYearDelete,
    QuestionPaperDisplayAll,
    QuestionPaperUpdate,
    PaperFilterDisplay
}

