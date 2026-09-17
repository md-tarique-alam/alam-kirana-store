const Address = require("../models/address");

exports.getAddress = async (req, res) => {
    try {
        const addresses = await Address.find({userId:req.user.userId});
        res.status(200).json(addresses);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.addAddress = async (req, res) => {
    try {
        const address=await Address.create({...req.body, userId:req.user.userId});
        res.status(201).json({
            message: "Address added successfully",
            address
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.updateAddress = async (req, res) => {
  try {
    const address = await Address.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.userId
      },
      req.body,
      { new: true, runValidators: true }
    );

    if (!address) {
      return res.status(404).json({
        message: "Address not found"
      });
    }
    res.status(200).json({
      message: "Address updated successfully",
      address
    });
    
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    const address = await Address.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId
    });

    if (!address) {
      return res.status(404).json({
        message: "Address not found" 
      });
    }
   res.status(200).json({
      message: "Address deleted successfully",
      address
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};