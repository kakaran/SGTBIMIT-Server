const Registration = require('../Models/Registration');

// const mailer = (Name, email, PNumber, Course) => {
//     try {
//         var transporter = nodemailer.createTransport({
//             service: ' gmail ',
//             port: 465,
//             secure: false,
//             auth: {
//                 user: 'web.sgtbimit@gmail.com',
//                 pass: process.env.Emailer_Password
//             }
//         });
//         var mailOptions = {
//             from: 'web.sgtbimit@gmail.com',
//             to: `<${email}>`,
//             subject: 'Admission or joining regarding enquiry/query',
//             html: `<!DOCTYPE html>
//         <html lang="en">
        
//         <head>
//             <title></title>
//             <style>
//                 @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@100;200;300;400;500&display=swap');
//                 .Container{
//                     font-family: 'IBM Plex Mono', monospace;
//                 }
//                 .TableContainer {
//                     width: 50%;
//                     /* margin: auto; */
//                 }
        
//                 table {
//                     margin: 20px;
//                     font-size: 20px;
//                     text-align: center;
//                     text-transform: capitalize;
//                     border: 1px solid #d9d9d9;
//                 }
        
//                 .Container p, pre{
//                     font-size: 18px;
//                 }
        
//                 th,
//                 td {
//                     border: 1px solid #4a4e69;
//                     padding: 10px;
//                 }
//             </style>
//         </head>
        
//         <body>
//             <div class="Container">
//                 <p>Dear ${Name}</p>
//                 <p>Greetings from SGTBIMIT.</p>
//                 <p>Thank you for your time and efforts. We have received your query regarding admissions.</p>
//                 <div class="TableContainer">
//                     <table>
//                         <tr>
//                             <th>Name</th>
//                             <td>${Name}</td>
//                         </tr>
//                         <tr>
//                             <th>Email</th>
//                             <td>${email}</td>
//                         </tr>
//                         <tr>
//                             <th>Phone Number</th>
//                             <td>${PNumber}</td>
//                         </tr>
//                         <tr>
//                             <th>Course</th>
//                             <td>${Course}</td>
//                         </tr>
//                     </table>
//                 </div>
//                 <p>The process of responding to your query is initiated. The college will contact you soon and respond to the query.</p>
//                 <p>Thanks and Regards,</p>
//                 <p>Admission Team</p>
//                 <p>SGTBIMIT</p>
//             </div>
//         </body>
        
//         </html>`
//             // text: `${otp} is your One-Time Password (OTP) to complete reset your password.`,
//         };

//         transporter.sendMail(mailOptions, function (error, info) {
//             if (error) {
//                 console.log(error);
//             } else {
//                 console.log('email sent ' + info.response);
//             }
//         });
//     } catch (error) {
//         console.log(error);
//     }
// }


const RegistrationAdd = async (req, res) => {
    try {
        const { Fname, Lname, Email, MNumber, Address, AdhaarNo, course, Year, employed, placement, presentOrgani, CurrentDesignation } = req.body;

        if(!Fname){
            return res.status(401).send("First Name is required");
        }else if(!Lname){
            return res.status(401).send("Last Name is required");
        }else if(!Email){
            return res.status(401).send("Emailis is required");
        }else if(!MNumber){
            return res.status(401).send("Mobile Number is required");
        }else if(!Address){
            return res.status(401).send("Address is required");
        }else if(!AdhaarNo){
            return res.status(401).send("Adhaar No is required");
        }else if(!course){
            return res.status(401).send("Course is required");
        }else if(!Year){
            return res.status(401).send("Year is  required");
        }else if(!employed){
            return res.status(401).send("Employed Detail is required");
        }

        const RegistrationCheck = await Registration.find({Email : Email});
        if(!RegistrationCheck.length){
            const RegistrationData = await Registration({
                Fname :Fname,
                Lname :Lname,
                Email :Email,
                MNumber :MNumber,
                Address :Address,
                AdhaarNo : AdhaarNo,
                HigerEducation :{
                    course : course,
                    Year : Year,
                    employed :employed
                },
                CurrentWorking :{
                    placement : placement,
                    presentOrgani :presentOrgani,
                    CurrentDesignation :CurrentDesignation
                }
            });
    
            await RegistrationData.save();
    
            return res.status(200).send("Registration Successfully Submit")
        }else {
            return res.status(200).send("Your are allready Submited")
        }
        
    } catch (error) {
        console.log(error);
    }
}

const RegistrationDisplayAll = async (req,res) =>{
    try {
        const data = await Registration.find();

        if(data){
            return res.status(200).send(data);
        }else{
            return res.status(404).send("Data not found")
        }
    } catch (error) {
        console.log(error);
    }
}

const RegistrationDelete = async (req,res) =>{
    try {
        const {_id} = req.params
        const data = await Registration.find({_id});
        if(data){
            await Registration.findByIdAndDelete({_id});
            return res.status(200).send("Deleted")
        }
    } catch (error) {
        console.log(error);
    }
}


module.exports ={
    RegistrationAdd,
    RegistrationDisplayAll,
    RegistrationDelete
}