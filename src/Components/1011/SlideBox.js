import { useRef, useState } from "react"
import styled from "styled-components"

//슬라이드 한개의 크기를 세팅
//화면전체는 window.innerWidth,window.innerHeight
const WIDTH=900;
const HEIGHT=600;
//화면 전체,슬라이드 컨테이너를 화면 가운데 배치
const Wrapper=styled.div`
width: 100vw;
height: 100vh;
position: relative;
display: flex;
justify-content: center;
align-items: center;
`
//슬라이드 1개를 보여주는 윈도우(액자).슬라이드 한개의 사이즈를 가짐
const Container=styled.div`
width: ${WIDTH}px;
height: ${HEIGHT}px;
overflow: hidden;
position: relative;
`
//실제 이동하는 컴포넌트.여러개의 페이지를 가지고 있음
const Slide=styled.div`
position: absolute;
transition: all 0.5s ease;
transform: translateX(${(props)=>props.x}px);
`
const Btn=styled.button`
width: 100px;
height: 60px;
position: absolute;
top: 600px;
font-size: 2rem;
`
const Btn1=styled(Btn)`
left: 100px;
`
const Btn2=styled(Btn)`
right: 100px;
`
export function SlideBox(){
  const pageList=[Page1,Page2,Page3,Page4];
  //slideX는 정수(...,-2,-1,0,1,2...,)이고 버튼을 누를대마다 한칸씩 이동.
  //(이동거리는 slideX*페이지 가로길이)
  const [slideX,setSlideX]=useState(0);
  const currentPage=useRef(0);
  function onPrev(){
    if(currentPage.current>0){
      setSlideX(slideX+1);
      currentPage.current=currentPage.current-1;
    }
  }
  function onNext(){
    if(currentPage.current<pageList.length-1){
      setSlideX(slideX-1);
      currentPage.current=currentPage.current+1;
    }
  }
  return<>
    <Wrapper>
      <Container>
        <Slide x={slideX*900}>
          {
            pageList.map((Page,index)=>(
              <Page key={index} left={900*index}/>
            ))
          }
        </Slide>
      </Container>
      <Btn1 onClick={onPrev}>Prev</Btn1>
      <Btn2 onClick={onNext}>Next</Btn2>
  </Wrapper>
  </>
}

const Page=styled.div`
width: ${WIDTH}px;
height: ${HEIGHT}px;
background-color: ${(props)=>props.bgcolor};
position: absolute;
top: 0;
left: ${(props)=>props.left}px;
display: flex;
justify-content: center;
align-items: center;
`
function Page1({left}){
  return<>
    <Page left={left} bgcolor="lightgreen">
      <h1>Page 1</h1>
    </Page>
  </>
}
function Page2({left}){
  return<>
    <Page left={left} bgcolor="lightblue">
      <h1>Page 2</h1>
    </Page>
  </>
}
function Page3({left}){
  return<>
    <Page left={left} bgcolor="khaki">
      <h1>Page 3</h1>
    </Page>
  </>
}
function Page4({left}){
  return<>
    <Page left={left} bgcolor="teal">
      <h1>Page 4</h1>
    </Page>
  </>
}