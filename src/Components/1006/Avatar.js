import styled from "styled-components";

const Container=styled.div`
width: 300px;
background-color: ${(props)=>props.$mybgcolor};
box-shadow: 1px 2px 5px gray;
padding: 10px;
margin-bottom:20px;
`
const Bold =styled.p`
font-weight: 700;
font-size: 2rem;
color: #333;
`
//const {mybgcolor ,person:{name,job,country}}=props;
export function Avatar({mybgcolor,person: {name, job, country}}){
  return<>
  <Container $mybgcolor={mybgcolor}>
    <div>
      <Bold>{name}</Bold>
      <p>{job}</p>
      <p>{country}</p>
      <hr />
    </div>
  </Container>
  </>
}