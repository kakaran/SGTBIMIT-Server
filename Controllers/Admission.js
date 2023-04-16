const Admission = require("../Models/Admission");
const emailformat = /^[A-Za-z0-9_.]{3,}@[a-zA-Z]{4,}[a-zA-Z.]{5,}$/;
const nodemailer = require("nodemailer");


const mailer = (Name, email, PNumber, Course) => {
    try {
        var transporter = nodemailer.createTransport({
            service: ' gmail ',
            port: 465,
            secure: false,
            auth: {
                user: 'web.sgtbimit@gmail.com',
                pass: 'zbqlvzuvhjrhibrh'
            }
        });
        var mailOptions = {
            from: 'web.sgtbimit@gmail.com',
            to: `<${email}>`,
            subject: 'Admission or joining regarding enquiry/query',
            html: `<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <title></title>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@100;200;300;400;500&display=swap');
                .Container{
                    font-family: 'IBM Plex Mono', monospace;
                }
                .TableContainer {
                    width: 50%;
                    /* margin: auto; */
                }
        
                table {
                    margin: 20px;
                    font-size: 20px;
                    text-align: center;
                    text-transform: capitalize;
                    border: 1px solid #d9d9d9;
                }
        
                .Container p, pre{
                    font-size: 18px;
                }
        
                th,
                td {
                    border: 1px solid #4a4e69;
                    padding: 10px;
                }
            </style>
        </head>
        
        <body>
            <div class="Container">
                <p>Dear ${Name}</p>
                <p>Greetings from SGTBIMIT.</p>
                <p>Thank you for your time and efforts. We have received your query regarding admissions.</p>
                <div class="TableContainer">
                    <table>
                        <tr>
                            <th>Name</th>
                            <td>${Name}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>${email}</td>
                        </tr>
                        <tr>
                            <th>Phone Number</th>
                            <td>${PNumber}</td>
                        </tr>
                        <tr>
                            <th>Course</th>
                            <td>${Course}</td>
                        </tr>
                    </table>
                </div>
                <p>The process of responding to your query is initiated. The college will contact you soon and respond to the query.</p>
                <p>Thanks and Regards,</p>
                <p>Admission Team</p>
                <p>SGTBIMIT</p>
            </div>
        </body>
        
        </html>`
            // text: `${otp} is your One-Time Password (OTP) to complete reset your password.`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('email sent ' + info.response);
            }
        });
    } catch (error) {
        console.log(error);
    }
}

const AdmissionFormFill = async (req, res) => {
    try {
        const { Name, Email, PNumber, Course } = req.body;

        if (!Name) {
            return res.status(401).send("Name is required");
        } else if (!Email) {
            return res.status(401).send("Email is required");
        } else if (!PNumber) {
            return res.status(401).send("Phone Number is required");
        } else if (!Course) {
            return res.status(401).send("Course is required");
        }

        if (!Email.match(emailformat)) {
            return res.status(401).send("Kindly Please check your Email");
        }


        const SearchData = await Admission.find({ Email: Email });


        if (!SearchData.length) {
            const AdmissionFormDetail = await Admission(req.body);
            await AdmissionFormDetail.save();
            await mailer(Name, Email, PNumber, Course);
            return res.send("Request Successfully Submitted");
        } else {
            return res.send("Your request Allready Submitted")
        }
    } catch (error) {
        console.log(error);
    }
}


const AdmissionRequestDisplay = async (req, res) => {
    try {
        const AllRequests = await Admission.find();

        return res.send(AllRequests);
    } catch (error) {
        console.log(error);
    }
}

const AdmissionRequestDelete = async (req, res) => {
    try {
        const { _id } = req.params;

        const Data = await Admission.findById({ _id });

        if (Data) {
            await Admission.findByIdAndDelete({ _id });
            return res.send("Request Sucessfully Delete");
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    AdmissionRequestDelete,
    AdmissionRequestDisplay,
    AdmissionFormFill
}