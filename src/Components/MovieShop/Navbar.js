import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { NavItem } from "./MovieShop/NavItem"
import styled from "styled-components"
import { useState } from "react";
const Container=styled.div`
width: 900px;
display: flex;
background-color: lightblue;
position: relative;
`
const StyledNavLink=styled(NavLink)`
text-decoration: none;
color: #555;
padding: 5px;

&.active{
  background-color: dodgerblue;
  color: white;
}`
const SearchBox=styled.div`
position: absolute;
top: 15px;
right: 10px;
`

export function Navbar(){
  const [inputValue,setInputValue]=useState("");
  const navigate=useNavigate();
  return<>
    <Container>
      <StyledNavLink to="/"><NavItem icon="ti ti-home-2" name="HOME"></NavItem>
      </StyledNavLink>
      <StyledNavLink to="/products"><NavItem icon="ti ti-building-store" name="SHOP"></NavItem>
      </StyledNavLink>
      <StyledNavLink to="/search"><NavItem icon="ti ti-search" name="SEARCH"></NavItem>
      </StyledNavLink>
      <StyledNavLink to="/dashboard"><NavItem icon="ti ti-user" name="MYPAGE"></NavItem>
      </StyledNavLink>
      <StyledNavLink to="/login"><NavItem icon="ti ti-login" name="LOGIN"></NavItem>
      </StyledNavLink>
      <StyledNavLink to="/cart"><NavItem icon="ti ti-shopping-cart" name="CART"></NavItem>
      </StyledNavLink>
        <SearchBox>
        <input
        placeholder="검색어를 입력하세요"
        value={inputValue}
        onChange={(e)=>setInputValue(e.target.value)}
        />
        <button onClick={()=>{
          setInputValue("");
          navigate(`/search?keyword=${inputValue}`);
        }}>검색</button>
      </SearchBox>
    </Container>
    <Outlet />
  </>
}