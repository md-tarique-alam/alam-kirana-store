import { createContext, useEffect, useState } from "react";

export const authcontext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(()=>{return JSON.parse(localStorage.getItem("userdata")) || null});
 const isLoggedIn=!!user;

 console.log(user)
 console.log(isLoggedIn)


function login(userdata){
 setUser(userdata);
 localStorage.setItem("userdata", JSON.stringify(userdata)) ;
};

function logout(){
setUser(null);
localStorage.removeItem("userdata");
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
