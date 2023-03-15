

export const justForchecking = async(req,res) => {
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