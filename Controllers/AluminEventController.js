const AluminiEvent = require("../Models/AluminiEvents");
const fs = require("fs");

const AluminEventAdd = async (req, res) => {
  try {
    const { Name, Year, Detail } = req.fields;
    const { Images, Image } = req.files;

    // console.log(Image);

    if (!Name) {
      return res.status(401).send("Event Name is Required");
    } else if (!Year) {
      return res.status(401).send("Event Year is Required");
    } else if (!Detail) {
      return res.status(401).send("Event Detail is Required");
    } else if (Image && Image.size > 1000000) {
      return res.status(200).send("Image size under 1MB only");
    }

    const AluminiEventData = await AluminiEvent(req.fields);

    if (Image) {
      AluminiEventData.Image.data = fs.readFileSync(Image.path);
      AluminiEventData.Image.contentType = Image.type;
      AluminiEventData.Image.Name = Image.name;
    }

    if (Images.length) {
      for (let i = 0; i < Images.length; i++) {
        AluminiEventData.Images.push({
          data: fs.readFileSync(Images[i].path),
          contentType: Images[i].type,
          Name: Images[i].name,
        });
      }
    } else {
      AluminiEventData.Images.push({
        data: fs.readFileSync(Images.path),
        contentType: Images.type,
        Name: Images.name,
      });
    }

    await AluminiEventData.save();
    return res.status(200).send({ Message: "Data upload ", status: true });
  } catch (error) {
    console.log(error);
  }
};

const AluyminiEventDisplay = async (req, res) => {
  try {
    const SearchData = await AluminiEvent.find(
      {},
      { Name: 1, Year: 1, "Images._id": 1, Detail: 1 }
    );

    if (SearchData) {
      return res
        .status(200)
        .send({ message: "All Data Send", status: true, SearchData });
    }
  } catch (error) {
    console.log(error);
  }
};

const AluminiEvenmaiImageDisplay = async (req, res) => {
  try {
    const { _id } = req.params;
    const data = await AluminiEvent.findById({ _id }, { Image: 1 });

    if (data) {
      res.set("Content-type", data.Image.contentType);
      return res.status(200).send(data.Image.data);
    }
  } catch (error) {
    console.log(error);
  }
};

const AluminImagesDisplay = async (req, res) => {
  try {
    const { _id, Image_id } = req.params;

    const Data = await AluminiEvent.findById(
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

//Delete the Single Image from Images Array
const AluminImagesDelete = async (req, res) => {
  try {
    const { _id, Image_id } = req.params;

    const Data = await AluminiEvent.findById({ _id });

    if (Data) {
      await AluminiEvent.updateOne(
        { _id },
        {
          $pull: {
            Images: { _id: Image_id },
          },
        }
      );
    }
    return res.status(200).send("Image Delete");
  } catch (error) {
    console.log(error);
  }
};

// Delete the Event
const AluminiEventDelete = async (req, res) => {
  try {
    const { _id } = req.params;

    const Data = await AluminiEvent.find({ _id });

    if (Data) {
      await AluminiEvent.findByIdDelete({ _id });
      return res
        .status(200)
        .send({ message: "Infrastructure Delete", status: true });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  AluminEventAdd,
  AluyminiEventDisplay,
  AluminiEvenmaiImageDisplay,
  AluminImagesDisplay,
  AluminImagesDelete,
  AluminiEventDelete,
};
