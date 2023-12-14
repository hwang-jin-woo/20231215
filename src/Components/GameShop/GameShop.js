import { BrowserRouter,Routes,Route, Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Home } from "./Home";
import { Products } from "./Products";
import { SingleProduct } from "./SingleProduct";
import { Dashboard } from "./Dashboard";
import { Login } from "./Login";
import { Cart } from "./Cart";
import { Error } from "./Error";
import { ProductsWrapper } from "./ProductsWrapper";
import { createContext, useState } from "react";
import { ProtectedRoute } from "./ProtectedRoute";
import games from "./db/Data";
export const GameContext=createContext();
const initialCheckList=games.map((game)=>{
  return {id:game.id,checked:false};
})
export function GameShop(){
  const [user,setUser]=useState({
    userName:"",userEmail:""
  })
  const [checkList,setCheckList]=useState(initialCheckList);
  console.log(checkList);
  return<>
    <h1>GameShop</h1>
    <GameContext.Provider value={{user,setUser,checkList,setCheckList}}>
      <BrowserRouter>
        <Routes>
          {/*루트이하 모든 서브라우트들은 Navbar의 자식이므로
          화면랜더링을 위해서 Navbar에 <Outlet />컴포넌트가 필요*/}
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />}></Route>
            <Route path="home" element={<Home />}></Route>
            <Route path="products" element={<ProductsWrapper />}>
              <Route index element={<Products />}></Route>
              <Route path=":id" element={<SingleProduct />}></Route>
            </Route>
            <Route path="dashboard" 
              element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }>
            </Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="cart" element={<Cart />}></Route>
            <Route path="*" element={<Error />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </GameContext.Provider>
  </>
}