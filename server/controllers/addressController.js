import Address from "../models/address.js";
// Add Address Controller : /api/address/add

export const addAddress = async (req, res) => {
  try {
    const { userId, address } = req.body;
    await Address.create({ userId, ...address });
    return res
      .status(200)
      .json({ success: true, message: "Address added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// get address controller : /api/address/get


export const getAddress = async (req, res) => {
   try{
     const {userId} = req.body;
     const addresses = await Address.find({userId});
     return res.status(200).json({success: true, addresses});

   }
   catch(error){
     console.log(error);
     return res.status(500).json({success: false, message: error.message });
   }
}
