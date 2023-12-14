import { useState } from "react"
import styled from "styled-components"

const Box=styled.div`
width: 200px;
height: 180px;
background-color: khaki;
position: absolute;
top: 200px;
left: 200px;
transition: all 0.5s ease;
&.modal{
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 600px;
  height: 650px;
  padding: 5px;
}
`
const Img=styled.img`
width:100%;
`
const Backdrop=styled.div`
width: 100vw;
height: 100vh;
position: fixed;
top: 0;
left: 0;
background-color: rgba(0,0,0,0.3);
`
const Text=styled.div`
margin: 10px 0;
padding: 0 10px;
opacity: 0;
transition: all 0.3s linear;
&.visible{
  opacity: 1;
}
`
function ModalBox(){
  const [modal,setModal]=useState("");
  const [isModal,setIsModal]=useState(false);
  const [visible,setVisible]=useState("");
  function onClick(){
    if(isModal){
      setIsModal(false);
      setModal("");
      setVisible("");
    }else{
      setIsModal(true);
      setModal("modal");
      setTimeout(()=>{
        setVisible("visible");
        },400);
    }
  }
  return<>
  <h1>Modal 창 만들기</h1>
    {isModal&&<Backdrop onClick={onClick}/>}
    <Box onClick ={onClick} className={modal}>
      <Img src="https://picsum.photos/id/127/900/600" alt="img" />
      {
        isModal&& <Text className={visible}>
          <h2>사진제목</h2>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
          </p>
          <button>x</button>
        </Text>
      }
    </Box>
  </>
}
export function Modal(){
  return<>
    <ModalBox />
  </>
}