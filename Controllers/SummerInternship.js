const summerInternshipModel = require("../Models/SummerInternship");
const fs = require("fs");


const SummerInternshipAdd = async(req,res) => {

    try {
        const {companyName,companyDetail,partnershipWith,internshipOffered,studName,studYear,internshipIn} = req.fields;
        const {companyImage,studImage} = req.files;
        
        if (!companyName || !companyDetail || !internshipOffered || !studYear || !studName || !internshipIn) {
            return res.status(401).send("all fileds is Required");
          } else if (!companyImage || companyImage.size > 1000000) {
            return res.status(200).send("companyImage size under 1MB only");
          } else if (!studImage || studImage.size > 1000000) {
            return res.status(200).send("companyImage size under 1MB only");
          }

          const summerInter = await new summerInternshipModel(req.fields);
          console.log(summerInter);

          if (companyImage) {
              summerInter.companyImage.data = fs.readFileSync(companyImage.path);
              summerInter.companyImage.contentType = companyImage.type;
            }
            
                if (studImage.length) {
  
                  for (let i = 0; i < studImage.length; i++) {  
                      summerInter.topInterns.push({
                              studImage : {
                                data : fs.readFileSync(studImage[i].path),
                                contentType : studImage[i].type,
                              },
                              studName : studName[i],
                              studYear : studYear[i],
                              internshipIn : internshipIn[i],                            
                      })                
                  }
  
                }else {
                    summerInter.topInterns.push({
                            studImage : {
                                data : fs.readFileSync(studImage.path),
                                contentType : studImage.type,
                            },
                            studName,
                            studYear,
                            internshipIn,
                    })                   
                }
                
        await summerInter.save();
        return res.status(200).send({ Message: "Data upload", status: true });


    } catch (error) {
        console.log(error);        
    }
}


const SummerInternshipDisplay = async(req,res) => {

    try {

        const summerintern = await summerInternshipModel.find({}).select("-companyImage -topInterns.studImage");

        if (!summerintern) {
            return res.status(200).send({ Message: "Data not found"});
        }

        return res.status(200).send(summerintern);

        
    } catch (error) {
        
    }
}


const SummerInternshipCompanyImageDisplay = async(req,res) => {

    try {
        
        const id = req.params._id
        const summerintern = await summerInternshipModel.findById(id, {companyImage: 1});

        if (summerintern) {
            res.set("Content-type", summerintern.companyImage.contentType);
            return res.status(200).send(summerintern.companyImage.data);            
        }
        
        return res.status(400).send({ Message: "Data not found"});            

        
    } catch (error) {
        
    }
}


const SummerInternshipTopInternsImagesDisplay = async(req,res) => {

    try {

        const id = req.params._id
        const studentImage = req.params.studentImage

        const summerintern = await summerInternshipModel.findById(id,
            { topInterns : { $elemMatch : {_id : studentImage}}});
        console.log(summerintern);

        if (summerintern) {
            res.set("Content-type", summerintern.topInterns[0].studImage.contentType);
            return res.status(200).send(summerintern.topInterns[0].studImage.data);            
        }
        
        return res.status(400).send({ Message: "Data not found"});            

        
    } catch (error) {
        
    }
}



const SummerInternshipDelete = async(req,res) => {

    try {

        const _id = req.params._id

        const summerintern = await summerInternshipModel.findById(_id);

        if (!summerintern) {
            return res.status(200).send({ Message: "Data not found"});
        }

        await summerInternshipModel.findByIdAndDelete(summerintern);        
        return res.status(200).send({ Message: "deleted successfully"});
        
    } catch (error) {
        
    }
}


const SummerInternshipStudentUpdate = async(req,res) => {

    try {

        const id = req.params._id
        const {studName,studYear,internshipIn} = req.fields;
        const {studImage} = req.files;
        console.log(req.fields);
        
        const summerintern = await summerInternshipModel.findById(id);

        if (!summerintern) {
            return res.status(400).send({ Message: "Data not found"});
        }

        await summerInternshipModel.updateOne({_id: id}, 
            {$set : { 
                        topInterns : {
                            studImage : {
                                data : fs.readFileSync(studImage.path),
                                contentType : studImage.type,
                            },
                            studName,
                            studYear,
                            internshipIn,
                            }
             }},
             { new: true}
            );        

        return res.status(200).send({ Message: "student Updated successfully"});
        
    } catch (error) {
        
    }
}

const SummerInternshipStudentAdd = async(req,res) => {

    try {

        const id = req.params._id
        const {studName,studYear,internshipIn} = req.fields;
        const {studImage} = req.files;
        console.log(req.fields);
        
        const summerintern = await summerInternshipModel.findById(id);

        if (!summerintern) {
            return res.status(400).send({ Message: "Data not found"});
        }

        await summerInternshipModel.updateOne({id}, 
            {$push : { 
                        topInterns : {
                            studImage : {
                                data : fs.readFileSync(studImage.path),
                                contentType : studImage.type,
                            },
                            studName,
                            studYear,
                            internshipIn,
                            }
             }},
             { new: true}
            );        

        return res.status(200).send({ Message: "student Added successfully"});
        
    } catch (error) {
        console.log(error);
    }
}




module.exports = {
    SummerInternshipAdd,
    SummerInternshipDisplay,
    SummerInternshipCompanyImageDisplay,
    SummerInternshipTopInternsImagesDisplay,
    SummerInternshipDelete,
    SummerInternshipStudentAdd,
    SummerInternshipStudentUpdate,
}