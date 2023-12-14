import { useContext } from "react"
import { GameContext } from "./GameShop"
import { Navigate } from "react-router-dom"

export function ProtectedRoute({children}){
  const {user}=useContext(GameContext);
  if(user.userName && user.userEmail){
    return children
  }else {
    return <Navigate to="/login" />
  }
}