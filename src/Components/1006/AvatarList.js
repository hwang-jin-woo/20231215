import styled from "styled-components";
import { Avatar } from "./Avatar";

const Container=styled.div`
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
gap: 50px;
`
const persons =[
  {name: "Steve",job:"programmer",country:"USA"},
  {name: "Tom",job:"student",country:"Korea"},
  {name: "Adrian",job:"writer",country:"France"},
  {name: "Max",job:"engineer",country:"Germany"},
]
const colors =["lightgreen","teal","lightgray","khaki"];
export function AvatarList(){
  return<>
    <Container>
      {
        persons.map((p,i)=>(
          <Avatar key={i} mybgcolor={colors[i]}person={p} />
        ))
      }
    </Container>
  </>
}