const Order = require("../models/order")
const Product = require("../models/product")

exports.getmyorders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId })
    res.status(200).json({ orders })
  }
  catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
};

exports.allorders = async (req, res) => {
  try {
    const allorders = await Order.find()
    res.status(200).json({ allorders })
  }
  catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

exports.createorders = async (req, res) => {
  const orderItems = [];
  let total = 0;
  try {
    const { items, address } = req.body
    for (const item of items) {
      const product = await Product.findById(item.productId)
      if (!product) {
        return res.status(404).json({
          message: "Product not found"
        })
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${product.name}`
        });
      }

      orderItems.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity
      })

      total += product.price * item.quantity
    }
    const order = await Order.create({ user: req.user.userId, items: orderItems, address, total });

    for (const orderItem of orderItems) {
      await Product.findByIdAndUpdate(
        orderItem.productId,
        { $inc: { stock: -orderItem.quantity } }
      )
    }

    res.status(201).json({
      message: "Order placed successfully",
      order,
    })
  }
  catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
}

exports.cancelorder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    if (order.user.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "You are not authorized to cancel this order"
      });
    }

    if (order.status !== "placed") {
      return res.status(400).json({
        message: "Order is not in cancellable mode"
      });
    }

    for (const orderItem of order.items) {
      await Product.findByIdAndUpdate(
        orderItem.productId,
        {
          $inc: {
            stock: orderItem.quantity
          }
        }
      );
    }

    order.status = "cancelled";
    await order.save();

    return res.status(200).json({
      message: "Order cancelled successfully",
      order
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

exports.orderstatus=async(req,res)=>{
 
  try{
  const {status}=req.body;

  const allowedStatus=["placed","confirmed","out-for-delivery","delivered"];

  if(!allowedStatus.includes(status)){
    return res.status(400).json({
      message: "Invalid order status"
    });
  }
    const order=await Order.findByIdAndUpdate(req.params.id,{status},{new:true});

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

   return res.status(200).json({
      message: "Status updated successfully"
    });
  }
  catch(error){
  return res.status(500).json({
    message: error.message
  });
  }
};