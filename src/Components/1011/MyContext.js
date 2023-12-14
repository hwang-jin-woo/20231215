import { useState,createContext,useContext } from "react";

const UserContext=createContext();

export function MyContext() {
  const [user,setUser]=useState("Tom");
  return<>
    <UserContext.Provider value={{user,setUser}}>
      <h1>MyContext</h1>
      <Component1/>
    </UserContext.Provider>
  </>
}

function Component1(){
  return<>
    <h1>Component1</h1>
    <Component2 />
  </>
}
function Component2(){
  return<>
    <h1>Component2</h1>
    <Component3 />
  </>
}
function Component3(){
  return<>
    <h1>Component3</h1>
    <Component4 />
  </>
}
function Component4(){
  const {user,setUser}=useContext(UserContext);
  setUser("Steve");
  return<>
    <h1>Component4</h1>
    <h3>Hello~{user}</h3>
  </>
}