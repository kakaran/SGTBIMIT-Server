const { log } = require("console");
const aluminiModel = require("../Models/AluminiGallery");
const fs = require("fs");

//alumini image add
const aluminiAddImage = async (req, res) => {
  try {
    const { category } = req.fields;
    const { image, images } = req.files;

    if (!image || !images || image.size > 1000000) {
      return res
        .status(401)
        .send(`image is req or image size should be less then 1MB`);
    } else if (!category) {
      return res.status(401).send(`category must be defined`);
    }

    const already = await aluminiModel.findOne({ category });

    if (already) {
      return res.status(400).send(`This kind of Category is already exists`);
    }

    const alumini = await new aluminiModel(req.fields);

    if (image) {
      (alumini.image.data = fs.readFileSync(image.path)),
        (alumini.image.contentType = image.type);
    }
    if (images.length) {
      for (let i = 0; i < images.length; i++) {
        alumini.images.push({
          data: fs.readFileSync(images[i].path),
          contentType: images[i].type,
        });
      }
    } else {
      alumini.images.push({
        data: fs.readFileSync(images.path),
        contentType: images.type,
      });
    }

    const final = await alumini.save();

    return res.status(200).send({
      message: `Image uploaded successfully`,
      final,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error",
    });
  }
};

//alumini image display
const aluminiDisplayImage = async (req, res) => {
  try {
    const image_display = await aluminiModel
      .find()
      .select("-images.data, -image");
    return res.status(201).send(image_display);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error",
    });
  }
};

const aluminiimageslength = async (req, res) => {
  try {
    const { _id } = req.params;
    const data = await aluminiModel.findById(_id).select("images");
    console.log(data.images.length);
    if (data) {
      return res.status(200).send(data.length);
    }
  } catch (error) {
    console.log(error);
  }
};

const aluminiimageDisplay = async (req, res) => {
  try {
    const { _id } = req.params;
    const Imagedata = await aluminiModel.findById(_id);

    if (Imagedata) {
      res.set("Content-type", Imagedata.image.contentType);
      return res.send(Imagedata.image.data);
    }
  } catch (error) {
    console.log(error);
  }
};

//alumini image update
const aluminiUpdateImage = async (req, res) => {
  try {
    const { image } = req.files;
    const id = req.params._id;

    if (!image || image.size > 1000000) {
      return res
        .status(401)
        .send(`image is req or image size should be less then 1MB`);
    }

    const alumini = await aluminiModel.findById(id);

    if (alumini) {
      const alumini_g = await aluminiModel.findByIdAndUpdate(
        alumini,
        { ...req.fields },
        { new: true }
      );
      alumini_g.image.data = fs.readFileSync(image.path);
      alumini_g.image.contentType = image.type;
    }

    return res.status(200).send({ message: `Image Updated successfully` });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error",
    });
  }
};

//one alumini delete with carousel images
const aluminiDelete = async (req, res) => {
  try {
    const id = req.params.id;

    const alumini_delete = await aluminiModel.findById(id);

    if (!alumini_delete) {
      return res.status(400).send(`No category found`);
    }

    const final = await aluminiModel.findByIdAndDelete(alumini_delete);

    return res.status(200).send(`alumini deleted successfully `);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error",
    });
  }
};

//-----------alumini images carousel----------------

//alumini images carousel display
const aluminiDisplayImages = async (req, res) => {
  try {
    const { _id, Index } = req.params;
    console.log(req.params);

    const data = await aluminiModel.find(
      { _id },
      { images: { $elemMatch: { _id: Index } } }
    );
    console.log(data);

    if (data) {
      res.set("Content-type", data[0].images[0].contentType);
      return res.send(data[0].images[0].data);
    } else {
      console.log("No result found");
      return res.status(400).send("No result found");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error",
    });
  }
};

//alumini images i.e carousel update
const aluminiUpdateImages = async (req, res) => {
  try {
    const { images } = req.files;
    const id = req.params.id;

    if (!images || images.size > 1000000) {
      return res
        .status(401)
        .send(`image is req or image size should be less then 1MB`);
    }

    const alumini = await aluminiModel.findById(id);

    if (alumini) {
      const alumini_g = await aluminiModel.findByIdAndUpdate(
        alumini,
        { ...req.fields },
        { new: true }
      );

      if (images.length) {
        for (let i = 0; i < images.length; i++) {
          alumini_g.images.push({
            data: fs.readFileSync(images[i].path),
            contentType: images[i].type,
          });
        }
      } else {
        alumini_g.images.push({
          data: fs.readFileSync(images.path),
          contentType: images.type,
        });
      }
      return res.status(200).send({ message: `Images Updated successfully` });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error",
    });
  }
};

//alumini images carousel delete
const aluminiImagesDelete = async (req, res) => {
  try {
    const { _id, Index } = req.params;
    console.log(req.params);
    const alumini_delete = await aluminiModel
      .findById({ _id })
      .select("images");

    if (alumini_delete) {
      const imgeId = alumini_delete.images[Index]._id;
      const data1 = await aluminiModel.updateOne(
        { _id: { $eq: _id } },
        {
          $pull: {
            images: { _id: imgeId },
          },
        }
      );
      console.log(data1);
      return res.status(200).send("Deleted");
    } else {
      return res.status(404).send("Data Not Found");
    }
  } catch (error) {
    console.log(error);
    return res.send({
      message: "Please check the detail",
    });
  }
};

module.exports = {
  aluminiAddImage,
  aluminiUpdateImage,
  aluminiUpdateImages,
  aluminiDelete,
  aluminiDisplayImage,
  aluminiDisplayImages,
  aluminiImagesDelete,
  aluminiimageDisplay,
  aluminiimageslength,
};
