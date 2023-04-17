const adminModel = require("../Models/Admin");
const { hashPassword, comparePassword } = require("../Middlewares/authPassword");
const mailer = require("../Middlewares/nodemailer");
const Otp = require("../Models/otp");
const Jwt = require("jsonwebtoken");

const adminRegister = async (req, res) => {
  try {

    const { name, email, phoneNo, password } = req.body;

    if (!name || !email || !phoneNo || !password) {
      return res.status(400).send({ message: `all fields are required` });
    }
    if (password.length < 8) {
      return res.status(400).send('Password should have min 8 characters');
    }
    if (phoneNo.length < 10 || phoneNo.length > 10) {
      return res.status(400).send({ message: "You have typed wrong phone number" });
    }

    //check user
    const exisitingUser = await adminModel.findOne({ email });

    if (exisitingUser) {
      return res.status(400).send({ message: "Already Register please login" })
    }

    const hashedPassword = await hashPassword(password);

    await new adminModel({
      name,
      email,
      phoneNo,
      password: hashedPassword
    }).save();

    res.status(201).send({
      message: "User Register Successfully",
    });

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: 'Error in Registration',
    });
  }
}

const adminLogin = async (req, res) => {
  try {

    const { email, password } = req.body;
    // console.log(req.body);

    if (!email || !password) {
      return res.status(400).send({
        message: "Invalid email or password",
      });
    }

    //check admin already exists
    const admin = await adminModel.findOne({ email });
    if (!admin) {
      return res.status(400).send({
        message: "Email is not registerd",
      });
    }

    const match = await comparePassword(password, admin.password);

    if (!match) {
      return res.status(200).send({
        message: "Invalid Password",
      });
    }

    //token
    const token = await Jwt.sign({ _id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1d", });


    // res.cookie("auth", token, {
    //   expires: new Date(Date.now() + 86400000),
    //   httpOnly: true
    // })

    res.status(200).send({
      message: "login successfully",
      admin: {
        _id: admin._id,
      },
      token,
    });



  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in login",
    });

  }
}


//For Password Reset To Check the email ID
const EmailCheck = async (req, res) => {
  try {
    const { email } = req.params;
    console.log(email);
    if (!email) {
      return res.status(500).send("Email Id Is Not defined")
    }
    const user = await adminModel.findOne({ email });
    if (!user) {
      return res.status(500).send("User Not Found");
    } else {
      const otpcode = Math.floor((Math.random() * 10000) + 1);
      const otpData = await Otp.create({
        email: email,
        code: otpcode,
        expireIn: new Date().getTime() + 300 * 1000
      });
      await mailer(otpData.email, otpData.code)
      return res.send({
        status: true,
        message: "We Have Sent AN OTP. Please Check Your Email"
      });
    }
  } catch (error) {
    console.log(error);
  }
};





//Change the user password route

const forgetpassword = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(500).send("Confirm Password Does Not Match With Password, Please Re-Enter");
    }

    const hashedPassword = await hashPassword(password);
    const checkdata = { email: req.params.email, code: req.body.code }
    console.log(checkdata);
    const check = await Otp.find(checkdata);
    console.log(check);
    if (check) {
      let currentTime = new Date().getTime();
      let diff = check[0].expireIn - currentTime;
      console.log(check[0].expireIn, currentTime, diff);
      if (diff < 0) {
        return res.status(500).send("OTP Is Expired");
      } else {
        const passwordChange = { password: hashedPassword }
        console.log(checkdata.email);
        await adminModel.findOneAndUpdate({ email: req.params.email }, passwordChange, {
          new: true,
          runValidators: true
        });
        return res.send("Password Successfully Changed");
      }
    } else {
      return res.status(500).send("OTP Is Invalid");
    }

  } catch (error) {
    console.log(error);
  }
};


module.exports = { adminRegister, adminLogin, forgetpassword, EmailCheck }