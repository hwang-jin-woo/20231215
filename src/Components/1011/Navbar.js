import styled from "styled-components"
import { NavLink,Link, Outlet } from "react-router-dom"
const Container =styled.div`
width: 100%;
height: 100vh;
background-color: #eee;
font-size: 1.5rem;
padding: 50px 10px;
`
const Li=styled.li`
list-style: none;
/*a.active{
  background-color: lightblue;
}*/
`
//HTML 스탠다드 태그가 아닌 다른 컴포넌트를 스타일링하는 방법
const StyledLink=styled(NavLink)`
margin-left: 10px;
text-decoration: none;
&.active{
  background-color: lightblue;
}
`
export function Navbar(){
  return<>
    <Container>
      <ul>
        <Li><StyledLink to="/home">HOME</StyledLink></Li>
        <Li><StyledLink to="/contact">CONTACT</StyledLink></Li>
        <Li><StyledLink to="/about">ABOUT</StyledLink></Li>
      </ul>
    </Container>
  </>
}

const Wrapper=styled.div`
display: flex;
background-color: #eee;
`
export function Navbar2(){
  return<>
    <Wrapper>
        <StyledLink to="/">HOME</StyledLink>
        <StyledLink to="/contact">CONTACT</StyledLink>
        <StyledLink to="/about">ABOUT</StyledLink>
    </Wrapper>
    <Outlet />
  </>
}