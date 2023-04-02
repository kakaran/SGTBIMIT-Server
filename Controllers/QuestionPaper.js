const { log } = require('console');
const QuestionPaper = require('../Models/QuestionPaper');
const fs = require('fs');

const QuestionPaperAdd = async (req, res) => {
    try {
        const { course, Year, Semester } = req.fields;
        const { file } = req.files;
        // console.log(file);

        if (!course) {
            return res.status(401).send("Course is required");
        } else if (!Year) {
            return res.status(401).send("Year name is required");
        } else if (!Semester) {
            return res.status(401).send("Index name is required");
        } else if (file && file.size > 1000000) {
            return res.status(401).send("file is required and should be less 1mb");
        }


        const Search_Data = await QuestionPaper.find({ course: course, Year: Year, Semester: Semester })
        console.log(Search_Data);

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
                    Name: file.name
                })
            }

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
        return res.send({
            message: "Please check the detail",
        });
    }
}


const QuestionPaperDisplay = async (req, res) => {
    try {

        const { course, Year, Semester } = req.params;

        if (!course) {
            return res.status(500).send("Kindly select the Course");
        } else if (!Year) {
            return res.status(500).send("Kindly select the Year");
        } else if (!Semester) {
            return res.status(500).send("Kindly select the Semester");
        }

        const Search_Data = await QuestionPaper.find({ course: course, Year: Year, Semester: Semester }).select("-file")
        if (!Search_Data) {
            return res.send({
                message: "Data not found"
            })
        } else {
            const file = await QuestionPaper.findById({ _id: Search_Data[0]._id }).select("file")
            let filenames = []
            for (let i = 0; i < file.file.length; i++) {
                filenames.push(file.file[i].Name);
            }
            return res.status(200).send({
                Data: Search_Data,
                FileNames: filenames
            })
        }

    } catch (error) {
        console.log(error);
        return res.send({
            message: "Please check the detail",
        })
    }
}

const QuestionPaperFileDisplay = async (req, res) => {
    try {
        const { _id, Index } = req.params;
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
        const Search_Data = await QuestionPaper.findById({ _id }).select("file");

        if (Search_Data) {
            const FileId = Search_Data.file[Index]._id;
            const data1 = await QuestionPaper.updateOne({ _id: { $eq: _id } }, {
                $pull: {
                    file: { _id: FileId }
                }
            })
            console.log(data1);
            return res.status(410).send("Deleted")
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

const QuestionPaperYearDelete = async (req, res) => {
    try {
        const { _id } = req.params;
        const Search_Data = await QuestionPaper.findById({ _id }).select("file");

        if (Search_Data) {
            await QuestionPaper.findByIdAndDelete(_id);
            return res.status(410).send("Delete")
        }

    } catch (error) {
        console.log(error);
        return res.send({
            message: "Please check the detail",
        })
    }
}


const QuestionPaperUpdate = async (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        return res.send({
            message: "Please check the detail",
        })
    }
}

module.exports = {
    QuestionPaperAdd,
    QuestionPaperDisplay,
    QuestionPaperFileDisplay,
    QuestionPaperDelete,
    QuestionPaperYearDelete
}