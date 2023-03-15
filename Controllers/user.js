

export const justForchecking = async(req,res) => {
    try {
        
        return res.status(200).send("Everything is working fine!");

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message : `Error`
        });
    }
}


export const sgtbimitCheck = async(req,res) => {
    try {
        
        return res.status(200).send("SGTBIMIT project!");

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message : `Error`
        });
    }
}