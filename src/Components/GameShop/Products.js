import styled from "styled-components"
import games from "./db/Data"
import { Outlet, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { GameContext } from "./GameShop"

const Container=styled.div`
width: 900px;
display: grid;
grid-template-columns: 1fr 1fr 1fr ;
`
const Card=styled.div`
width: 280px;
border: 2px solid dodgerblue;
margin-bottom: 20px;
font-size:0.8rem;
cursor: pointer;
`
const Img=styled.img`
width:100%;
`
const Text=styled.p`
margin-left:10px;
`
const Input =styled.input`
margin-left: 10px;
`
export function Products(){
  //url을 변경시커서 페이지를 포워딩
  const navigate=useNavigate();
  const{checkList,setCheckList}=useContext(GameContext);
  function onClick(id){
    navigate(`${id}`); //상대경로.현재url뒤에 추가됨
  }
  function onChange(e){
    const temp=checkList.map((item)=>{
      if(item.id == e.target.id){
        return{...item,checked: e.target.checked};
      }else{
        return item;
      }
    });
    setCheckList(temp);
  }
  return<>
    <h3>Games list</h3>
    <Container>
      {
        games.map((game,i)=>(
          <Card key={game.id}>
            <div onClick={(e)=>onClick(game.id)}>
              <Img src={game.image } />
              <Text>타이틀: {game.title}</Text>
              <Text>장르: {game.genre}</Text>
              <Text>가격: {game.price}</Text>
            </div>
            <Input type="checkbox" 
              id={game.id}
              onChange={onChange}
              checked={checkList[i].checked}
            />
          </Card>
        ))
      }
    </Container>
    <Outlet />
  </>
}