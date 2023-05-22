const PlacementStatic = require("../Models/PlacementStatic");
const PlacementStaticAdd = async (req, res) => {
  try {
    const Data = await PlacementStatic.find();
    const { Year, Name, Eligible, Offers } = req.body;

    const NameCheck = {
      status: false,
      value: "",
    };

    const YearCheck = {
      status: false,
      value: "",
    };

    if (Data.length > 2) {
      return res.status(500).send("Kindly Delete the Previeus Year");
    }

    Data?.map((value) => {
      if (value.Year == Year) {
        (YearCheck.status = true), (YearCheck.value = value);
      }
    });


    if (!YearCheck.status) {
      await PlacementStatic({
        Year,
        Course: [
          {
            Name: Name,
            Eligible: Eligible,
            Offers: Offers,
          },
        ],
      }).save();
      return res.status(200).send("Data Added");
    } else {
      YearCheck.value.Course.map((value) => {
        if (value.Name == Name) {
          (NameCheck.status = true), NameCheck.value == value;
        }
      });
    }

    if (NameCheck.status) {
      return res.status(404).send({
        message: `${Name} Course Detail Allready Added in ${Year} Year`,
      });
    } else {
      await PlacementStatic.updateOne(
        { Year },
        { $push: { Course: { Name, Eligible, Offers } } }
      );
      return res.status(200).send("Data Added");
    }
  } catch (error) {
    console.log(error);
  }
};


const PlacementStaticYearDelete = async (req,res) =>{
    try {
        const {_id} = req.params;
        const SearchData = await PlacementStatic.findById(_id);

        if(SearchData){
            await PlacementStatic.findByIdAndDelete(_id);
            return res.status(200).send({message : "Data Deleted"})
        }
    } catch (error) {
        console.log(error);
    }
}


const PlacementStaticCourseDelete = async (req,res) =>{
  try {
    const {_id, Course_id} = req.params;
    
    const SearchData = await PlacementStatic.findById(_id);

    if(SearchData){
      await PlacementStatic.updateOne({_id},{$pull : {Course : {_id : Course_id}}});
      return res.status(201).send({message : "Data Deleted"});
    }
  } catch (error) {
    console.log(error);
  }
}

const PlacementStaticDisplay = async (req,res) =>{
  try {
    const AllData = await PlacementStatic.find();

    if(AllData.length) return res.status(200).send({message :"All Data send" , AllData})
    else return res.status(404).send({message : "Data not Found", status : false})

  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  PlacementStaticAdd,
  PlacementStaticYearDelete,
  PlacementStaticCourseDelete,
  PlacementStaticDisplay
};
