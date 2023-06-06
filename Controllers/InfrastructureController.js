const Infrastructure = require("../Models/Infrastructure");
const fs = require("fs");


const AddtheInfrastructure = async (req, res) => {
  try {
    const { InfraName, Detail } = req.fields;
    const { Images } = req.files;

    if (!InfraName) {
      return res.status(401).send("Name is Required");
    } else if (!Detail) {
      return res.status(401).send("Infra Page Detail is Required");
    }

    const InfraData = await new Infrastructure(req.fields);

    if (Images.length) {
      for (let i = 0; i < Images.length; i++) {
        InfraData.Images.push({
          data: fs.readFileSync(Images[i].path),
          contentType: Images[i].type,
        });
      }
    } else {
      InfraData.Images.push({
        data: fs.readFileSync(Images.path),
        contentType: Images.type,
      });
    }

    await InfraData.save();
    return res.status(200).send({ message : "Infra Data Upload", status : true});
  } catch (error) {
    console.log(error);
  }
};

const InfrastructureDropdownData = async (req, res) => {
  try {
    const Data = await Infrastructure.find(
      {},
      {InfraName: 1, _id: 1 }
    );

    if (Data) return res.status(200).send({ message: "Data Send", status: true, Data });
  } catch (error) {
    console.log(error);
  }
};

const SingleInfrastructureDisplay = async (req, res) => {
  try {
    const { _id } = req.params;

    const Data = await Infrastructure.findById({ _id }, { "Images._id": 1 , InfraName : 1,Detail : 1});

    if (Data) return res.status(200).send({ message: "Data Send", status: true, Data });
  } catch (error) {
    console.log(error);
  }
};

const ImageDisplay = async (req, res) => {
  try {
    const { _id, Image_id } = req.params;

    const Data = await Infrastructure.findById(
      { _id },
      { Images: { $elemMatch: { _id: Image_id } } }
    );
    if (Data) {
      res.set("Content-type", Data.Images[0].contentType);
      return res.status(200).send(Data.Images[0].data);
    }
  } catch (error) {
    console.log(error);
  }
};

const InfrastructureDelete = async (req, res) => {
  try {
    const { _id } = req.params;

    const Data = await Infrastructure.find({ _id });

    if (Data) {
      await Infrastructure.findByIdDelete({ _id });
      return res
        .status(200)
        .send({ message: "Infrastructure Delete", status: true });
    }
  } catch (error) {
    console.log(error);
  }
};

const InfrastructureImageDelete = async (req,res) =>{
    try {
        const {_id,Image_id}= req.params;

        const Data =  await Infrastructure.findById({_id});

        if(Data){
            await Infrastructure.updateOne({_id},{
                $pull : {
                    "Images" : {_id :Image_id} 
                }
            },{arrayFilters : [{"image._id" : Image_id}]})
        }
        return res.status(200).send("Image Delete")
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
  AddtheInfrastructure,
  InfrastructureDropdownData,
  SingleInfrastructureDisplay,
  ImageDisplay,
  InfrastructureDelete,
  InfrastructureImageDelete
};
