const researchAnddevlpmtModel = require("../Models/Research&Development");
const fs = require("fs");

const AddResearchDevelopment = async (req, res) => {
  try {
    const { Date, Detail, category, index, heading } = req.fields;
    const { image, images } = req.files;

    if (!Date) {
      return res.status(409).send({ message: "Date is Required", status: false })
    } else if (!Detail) {
      return res.status(409).send({ message: "Detail is Requires", status: false })
    } else if (!category) {
      return res.status(409).send({ message: "Category is Requires", status: false })
    } else if (!heading) {
      return res.status(409).send({ message: "Evnet Heading is Requires", status: false })
    }

    const resanddev = await researchAnddevlpmtModel(req.fields);

    if (image) {
      resanddev.image.data = fs.readFileSync(image.path);
      resanddev.contentType = image.type;
    }
    if (images.length) {
      for (let i = 0; i < images.length; i++) {
        resanddev.images.push({
          data: fs.readFileSync(images[i].path),
          contentType: images[i].type,
        });
      }
    } else {
      resanddev.images.push({
        data: fs.readFileSync(images.path),
        contentType: images.type,
      });
    }

    const final = await resanddev.save();

    return res
      .status(200)
      .send({ message: "R and D created successfully", final });
  } catch (error) {
    console.log(error);
  }
};

const Research_DevelopmentImageDisplay = async (req, res) => {
  try {
    const { _id } = req.params;
    const res_dev = await researchAnddevlpmtModel.findById({ _id }).select("image");
    console.log(res_dev);

    if (!res_dev) {
      return res.status(401).send({ message: "data can not be found" });
    }

    res.set("content-type", res_dev.image.contentType);
    return res.status(200).send(res_dev.image.data);
  } catch (error) {
    console.log(error);
  }
};

const Research_DevelopmentImagesDisplay = async (req, res) => {
  try {
    const { _id, Image_id } = req.params;

    const Data = await researchAnddevlpmtModel.findById(
      { _id },
      { images: { $elemMatch: { _id: Image_id } } }
    );

    if (Data) {
      res.set("Content-type", Data.images[0].contentType);
      return res.status(200).send(Data.images[0].data);
    }
  } catch (error) {
    console.log(error);
  }
};
const ResearchDevlopmetDisplay = async (req, res) => {
  try {
    const Data = await researchAnddevlpmtModel.find({}, { Detail: 1, Date: 1, category: 1, heading: 1, "images._id": 1 })
    if (Data) return res.status(200).send({ message: "Data Send", status: true, Data })
  } catch (error) {
    console.log(error);
  }
}

const SingleResearch_Development = async (req, res) => {
  try {
    const { _id } = req.params;
    const Data = await researchAnddevlpmtModel.findById(_id);
    if (Data) return res.status(200).send({ message: "Data Send", Data });
  } catch (error) {
    console.log(error);
  }
};
const Research_DevelopmentDelete = async (req, res) => {
  try {
    const { _id } = req.params;
    const Data = await researchAnddevlpmtModel.findByIdAndDelete(_id);
    if (Data) return res.status(200).send({ message: "Data Deleted", Data });
  } catch (error) {
    console.log(error);
  }
};
const Research_DevelopmentUpdate = async (req, res) => { };

module.exports = {
  AddResearchDevelopment,
  SingleResearch_Development,
  Research_DevelopmentImageDisplay,
  Research_DevelopmentImagesDisplay,
  Research_DevelopmentDelete,
  Research_DevelopmentUpdate,
  ResearchDevlopmetDisplay
};
