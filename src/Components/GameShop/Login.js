import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { GameContext } from "./GameShop";
const Container=styled.div`
width:300px;
background-color: #eee;
box-shadow: 2px 2px 5px gray;
padding: 20px;
border-radius: 20px;
margin: 50px;
`
const Header=styled.div`
font-size: 1.5rem;
text-align: center;
`
const Div=styled.div`
width: 100%;
margin-top: 10px;
display: grid;
grid-template-columns:40% 60% ;
`
const Button=styled.button`
width: 100%;
height: 25px;
margin-top: 20px;
background-color: lightblue;
border-radius: 5px;
text-align: center;
cursor: pointer;
font-weight: bold;
color: black;
border: 2px solid blue;
`
export function Login(){
  const [username,setUsername]=useState("");
  const[email,setEmail]=useState("");
  const navigate=useNavigate();
  const{user,setUser}=useContext(GameContext);
  function onSubmit(e){
    e.preventDefault();
    if(username && email){
      navigate("/dashboard");//마이페이지로 포워딩
      setUser({
        userName:username,userEmail:email
      })
    }
  }
  return<>
    <Container>
      <form onSubmit={onSubmit}>
        <Header>Login</Header>
        <Div>
          <label>User Name</label>
          <input id="name" value={username} 
            onChange={(e)=>setUsername(e.target.value)} />
        </Div>
        <Div>
          <label>User Email</label>
          <input id="email" value={email} 
            onChange={(e)=>setEmail(e.target.value)} />
        </Div>
        <Button type="submit">제출</Button>
      </form>
    </Container>
  </>
}