import styled from "styled-components"


const Btn=styled.button`
width: 150px;
height: 60px;
`

export function Event(){
  const isActive=true;
  function clickHandler(){
    console.log("click");
  }
  function onMouseEnter(){
    console.log("mouse enter");
  }
  return<>
  <h1 onMouseEnter={onMouseEnter}
    onMouseEnter={()=>console.log("mouse leave")}
    >Event</h1>
  <Btn onClick={clickHandler}>버튼</Btn>
  {
    isActive && <p>active가 참이면 이 문장을 보여주자</p>
  }
  </>
}