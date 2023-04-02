const adminModel = require("../Models/Admin");
const {hashPassword, comparePassword} = require("../Middlewares/authPassword");
const Jwt = require("jsonwebtoken");

const adminRegister = async(req,res) => {
    try {
        
        const {name,email,phoneNo,password} = req.body;

        if (!name || !email || !phoneNo || !password) {
            return res.status(400).send({message : `all fields are required`});
        }
        if (password.length < 8) {
            return res.status(400).send('Password should have min 8 characters');
        }
        if (phoneNo.length < 10  || phoneNo.length > 10 ) {
            return res.status(400).send({ message: "You have typed wrong phone number" });
        }

        //check user
        const exisitingUser = await adminModel.findOne({ email });

        if (exisitingUser) {
            return res.status(400).send({message: "Already Register please login"})
        }

        const hashedPassword = await hashPassword(password);

        await new adminModel({
            name,
            email,
            phoneNo,
            password : hashedPassword
        }).save();

        res.status(201).send({
            message: "User Register Successfully",
          });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message : 'Error in Registration',
        });       
    }
}

const adminLogin = async(req,res) => {
    try {
        
        const { email, password } = req.body;

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
    const token = await Jwt.sign({ _id: admin._id }, process.env.JWT_SECRET, { expiresIn: "7d",});
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



module.exports = {adminRegister, adminLogin}