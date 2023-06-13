const summerInternshipModel = require("../Models/SummerInternship");
const fs = require("fs");


const SummerInternshipAdd = async(req,res) => {

    try {
        const {companyName,companyDetail,partnershipWith,internshipOffered,studName,studYear,internshipIn} = req.fields;
        const {companyImage,studImage} = req.files;
        
        if (!companyName || !companyDetail || !partnershipWith || !internshipOffered) {
            return res.status(401).send("all fileds is Required");
          } else if (!companyImage || companyImage.size > 1000000) {
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
        return res.status(200).send({ Message: "Data upload ", status: true });


    } catch (error) {
        console.log(error);        
    }
}


const SummerInternshipDisplay = async(req,res) => {
    try {
        
    } catch (error) {
        
    }
}
const SummerInternshipImageDisplay = async(req,res) => {
    try {
        
    } catch (error) {
        
    }
}
const SummerInternshipImagesDisplay = async(req,res) => {
    try {
        
    } catch (error) {
        
    }
}
const SummerInternshipDelete = async(req,res) => {
    try {
        
    } catch (error) {
        
    }
}


module.exports = {
    SummerInternshipAdd,
    SummerInternshipDisplay,
    SummerInternshipImageDisplay,
    SummerInternshipImagesDisplay,
    SummerInternshipDelete
}