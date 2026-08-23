import axios from "axios"
import { useEffect, useState } from "react"

function Orders(){
    const [orders, setOrders]=useState([])
    const [error, setError]=useState("")

    useEffect(()=>{
        getorders()
    },[]);

   async function getorders(){
      try{
        const res=await axios.get("http://localhost/5000/orders/my-orders", {withCredentials:true});
        setOrders(res.data.orders);
      }
      catch(error){
        setError(error.response?.data?.message || "Something went wrong");
      }
    }
    return(
        <div>
          {error&&<h2>{error}</h2>}
         {orders.map((order)=>(
            <div key={order._id}>
              {order.items.map((item)=>{
                <div key={item._id}>
                  <h1>item.name</h1>
                  <h2>item.price</h2>
                  <h3>item.quantity</h3>
                </div>
              })}
              <div>
              <p>Total</p>
              <h2>order.total</h2>
              </div>
              <div>
                <div>
                  order placed: <h3>new Date(order.createdAt).toLocaleString</h3>
                </div>
              <p>status:</p>
              <h2>order.status</h2>
              </div>
              <div>
              <p>Payment Method</p>
              <h2>order.paymentmethod</h2>
              </div>
              <div>
              <p>Address</p>
              <h2>order.address.name</h2>
              <h2>order.address.city</h2>
              <h2>order.address.address</h2>
              <h2>order.address.landmark</h2>
              <h2>order.address.pincode</h2>
              <h3>order.address.mobilenumber</h3> 
              </div>
            </div>
         ))}
        </div>
    )
}
export default Orders