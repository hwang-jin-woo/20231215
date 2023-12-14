import { Link, useParams } from "react-router-dom"
import styled from "styled-components"
import games from "./db/Data"

const Container=styled.div`
width: 900px;
display: flex;
flex-direction: column;
`
const Img=styled.img`
width:100%;
`
const Content=styled.div`
font-size:.9rem;
`
export function SingleProduct(){
  const {id}=useParams();
  const game=games.find((g)=>g.id==id);
  return<>
    <h3>{game.title}</h3>
    <Container>
      <Img src={game.image}></Img>
      <Content>
        <p>타이틀 : {game.title}</p>
        <p>장르 : {game.genre}</p>
        <p>가격 : {game.price}</p>
        <p>{game.text}</p>
        <Link to="/products">목록으로 돌아가기</Link>
      </Content>
    </Container>
  </>
}