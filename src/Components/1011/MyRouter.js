import { BrowserRouter,Routes,Route } from "react-router-dom"
import {Navbar, Navbar2} from "./Navbar"
import styled from "styled-components"
import {Home} from "./Home"
import {About} from "./About"
import {Contact} from "./Contact"
import {Error} from "./Error"
import {Modal} from "./Modal"

const Container=styled.div`
width: 100vw;
height: 100vh;
margin: 0 auto;
display: grid;
grid-template-columns: 20% 80%;
`
const Wrapper=styled.div`
width: 100vw;
height: 100vh;
margin: 0 auto;
`
const Content=styled.div`
padding: 20px;
background-color: lightgray;
`
export function MyRouter(){
  return<>
    <h1>MyRouter</h1>
    <BrowserRouter>
      {/*<Container>*/}
      <Wrapper>
        <Content className="content">
          <Routes>
            <Route path="/"element={<Navbar2 />}>
              <Route index element={<Home />}></Route>  //index는  진입점 
              <Route path="/home"element={<Home />}></Route>
              <Route path="/about"element={<About />}></Route>
              <Route path="/contact"element={<Contact />}></Route>
              <Route path="*"element={<Error />}></Route>//*는 나머지 모두
            </Route>
          </Routes>
        </Content>
      {/*</Container>*/}
      <Modal />
      </Wrapper>
    </BrowserRouter>
  </>
}