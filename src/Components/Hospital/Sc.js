import styled from "styled-components"
import "./css/sc.css";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom"
import sc1 from "./images/sc1.jpg"
import sc2 from "./images/sc2.jpg"
import { ModalContainer, ModalOverlay, ModalCloseBtn, ModalContent } from "./Modal";
const Container=styled.div`
  width: calc(100vw-10px);
  background-color:e5989b ;
`
const Footer=styled.div`
display: flex;
`
const Buttons=styled.ul`
li{
    list-style: none;
    margin: 20px;
    float: left;
    position: relative;
    left: 600px;
    top: 200px;
    width: calc( 10% );
    text-align: center; 
    z-index: 1;
  
}
p{
  font-weight: bold;
}
`
export function Sc(){
  const [test, setTest] = useState('');

  function testLoading() {
    // 서버의 API를 호출하여 데이터 가져오기
    fetch('http://localhost:3301/api/test') // 백엔드 서버 주소를 사용
    .then((response) => response.json())
    .then((data) => {
      setTest(data);
    })
    .catch((error) => {
    });
  }

  useEffect(() => {
    testLoading();
  }, [test]);

  const [modalOpen1, setModalOpen1] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [modalOpen3, setModalOpen3] = useState(false);

  

  

  return<>
      <Container> 
      {
    modalOpen1 &&
        <ModalContainer>
        <ModalOverlay onClick={() => setModalOpen1(false)}/>    
        <ModalContent>
            {test && test.length > 0 &&
                <ul  style={{ zIndex: 10000 }} >
                <li>no:{test[0].no}</li>
                <li>title:{test[0].title}</li>
                <li>content:{test[0].content}</li>
                <li>type:{test[0].type}</li>
                </ul>
                }
            <ModalCloseBtn className="modal-close-btn" onClick={() => setModalOpen1(false)}>
            x
            </ModalCloseBtn>
        </ModalContent>
        </ModalContainer>
    }
    {
    modalOpen2 &&
        <ModalContainer >
        <ModalOverlay onClick={() => setModalOpen2(false)}/>    
        <ModalContent>
            <ModalCloseBtn className="modal-close-btn" onClick={() => setModalOpen2(false)}>
            x
            </ModalCloseBtn>
        </ModalContent>
        </ModalContainer>
    }
    {
    modalOpen3 &&
        <ModalContainer>
        <ModalOverlay onClick={() => setModalOpen3(false)}/>    
        <ModalContent>
            <ModalCloseBtn className="modal-close-btn" onClick={() => setModalOpen3(false)}>
            x
            </ModalCloseBtn>
        </ModalContent>
        </ModalContainer>
    } 
        <main>
              <section className="sc-section">
                    <div>
                      <Buttons>        
                          <li>
                              <button className="button" onClick={() => setModalOpen1(true)}>
                                <p>내가 가본 병원</p>
                              </button>  
                            </li>          
                          <li>
                              <button className="button" onClick={() => setModalOpen2(true)}>
                                <p>가까운 병원</p>
                              </button>  
                            </li>          
                          <li>
                              <button className="button" onClick={() => setModalOpen3(true)}>
                                <p>인기 병원</p>
                              </button>  
                            </li>          
                        </Buttons>
                    </div>
              </section>
          </main>
          <div className="scimage">
            <img className="scimage1"src={sc1} alt="sc"  />
            <img className="scimage2"src={sc2}  alt="sc"  />
            <img className="scimage1"src={sc1} alt="sc"  />
            <img className="scimage2"src={sc2}  alt="sc"  />
            <img className="scimage1"src={sc1} alt="sc"  />
            <img className="scimage2"src={sc2}  alt="sc"  />
            <img className="scimage1"src={sc1} alt="sc"  />
          </div>
          <Footer>
    <ul>
        <li><Link to='https://cocoder.tistory.com' target='_blank'>Blog</Link> </li>
        <li><Link to='https://github.com/hwang-jin-woo/' target='_blank'>Github</Link></li>
    </ul>
    <p>
        <span>저자 : 황진우</span><br/>
        <span>이메일 : hjinu91@naver.com</span><br/>
        <span>Copyright 2023. copy. All Rights Reserved.</span>
    </p>
</Footer>
    </Container>  
  </>
}