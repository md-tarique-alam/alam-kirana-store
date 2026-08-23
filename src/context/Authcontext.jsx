import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const authcontext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [error,setError] = useState()
 const isLoggedIn=!!user;

function login(userdata){
 setUser(userdata);
};

useEffect(()=>{
   getUser()
}, []);

async function getUser(){
   try{
    const res=await axios.get("http://localhost:5000/users/me" , {withCredentials:true})
    setUser(res.data)
   }
   catch(error){
    setError(error.response?.data?.message)
   }
}

async function logout(){
  try{
  await axios.post("http://localhost:5000/users/logout", {}, {withCredentials:true});
   setUser(null)
  }
  catch(error){
   setError(error.response?.data?.message || "something went wrong")
  }
};
  
  return (
    <div>
      <authcontext.Provider value={{ login, logout, user, isLoggedIn }}>
        {children}
      </authcontext.Provider>
    </div>
  );
}
export default AuthProvider;
