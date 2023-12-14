import styled from "styled-components";

const Title=styled.li`
font-size: 2.5rem;
color: ${(props)=>props.myColor ?props.myColor:"orange"};
`
const container=styled.div`
width: 100vw;
margin: 0 auto;
text-align: center;
`
const Photo=styled.img`
border-radius: 50%;
`
export function List(){
  const products=[
    {title:"Banana"},
    {title:"Apple"},
    {title:"Grape"},
  ];
  const user={
    name:"Hedy Lamarr",
    imgUrl:"https://i.imgur.com/WohslsL_d.webp",
  }
  return<>
    <h1>List Component</h1>
    <p>리액트 연습코드</p>
    <ul>
      {
        products.map((p,i)=><Title key={i}>{p.title}</Title>)
      }
    </ul>
    <container>
      <ul>
      <Title myColor="dodgerblue">{user.name}</Title>
      </ul>
      <Photo src={user.imgUrl} alt="img"/>
    </container>
  </>
}



