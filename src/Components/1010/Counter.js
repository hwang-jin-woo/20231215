import { useState } from "react";
import styled from "styled-components";

const Countainer=styled.div`
width: 500px;
text-align: center;
margin: 0 auto;
h1{
  font-size: 4rem;
}
button{
  width: 100px;
  font-size: 2rem; 
  margin: 10px;
}
`


export function Counter(){
  console.log("Counter component begin");
  // useState는 리액트의 상태등록 함수
  //배열을 리턴함 ,[변수,변수의 Setter함수]
  //배열의 디스트럭쳐문법으로 받아옴
  const [count,setCount]=useState(0); //count변수, setCount세터
  function minus(){
    setCount(count-1);
    console.log("minus",count);
  }
  function plus(){
    setCount(count+1);
    console.log("plus",count);
  }
  console.log("Counter component end",count);
  return<>
  <Countainer>
    <h1>{count}</h1>
    <button onClick={minus}>-</button>
    <button onClick={plus}>+</button>
  </Countainer>
  </>
}

// function func1(){
//   let x=0;
//   function setX(a){
//     x=a;
//   }
//   return[x,sexX];
// }
// const [p1,p2]=func1();