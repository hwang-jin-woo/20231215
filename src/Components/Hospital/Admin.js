import styled from "styled-components"
import "./css/admin.css";
import Login from "./Login";
import { useState,useEffect } from "react";
import { ModalContainer, ModalOverlay, ModalCloseBtn, ModalContent } from "./Modal";
import { Link } from "react-router-dom"
import Axios from 'axios';
const Container=styled.div`
  width: calc(100vw-10px);
  background-color:khaki ;
`
const Footer=styled.div`
display: flex;
`
const Sidebar=styled.div`
  width: 10%;
  height: 900px;
  background-color: ffb4a2;
  li{    
    position: relative;
    text-align: center;
    top: 100px;
  }
  li a{
    color: black;
  }
  li a:hover{
    cursor: pointer;
    color:rgb(55, 55, 198);
  }
`
const Table=styled.table`
    width: 100%;
    border: 1px solid #444444;
    background-color: ffcdb2;
  th{
    background-color: lightsalmon;
  }
  th, td {
    border: 1px solid #444444;
    
  }
`

export function Admin(){
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const [isLogin, setIsLogin] = useState(false);




const [modalOpen1, setModalOpen1] = useState(false);
const [modalOpen2, setModalOpen2] = useState(false);



//병원정보
const [hpinformation, Sethpinformation] = useState([]);

useEffect(() => {
  const hpinformationLoading = async () => {
    try {
      const response = await Axios.get('http://localhost:3301/api/hpinformation'); // 백엔드 서버 주소로 수정
      Sethpinformation(response.data);
    } catch (error) {
      console.error('데이터 가져오기 실패:', error);
    }
  };

  hpinformationLoading();
}, []);

const [selectedPost, setSelectedPost] = useState(null);
const [post, setPosts] = useState([]);
const handleUpdate = async (e) => {
  e.preventDefault();
  const finalFormData = {
    hp_name: formData.hp_name,
    hp_location: formData.hp_location,
    hp_time: formData.hp_time,
    hp_phone: formData.hp_phone,
    hp_review: formData.hp_review,
  };
  
  console.log('Sending update request:', finalFormData);
  
  try {
    await Axios.put(`http://localhost:3301/api/hpinformation/${selectedPost.hpif}`, finalFormData);
  
    // 게시글을 업데이트한 후 목록을 다시 불러와서 화면에 갱신
    const response = await Axios.get('http://localhost:3301/api/hpinformation');
    setPosts(response.data);
  
    console.log('게시글이 성공적으로 업데이트되었습니다.');
    alert('게시글 업데이트 성공');
  } catch (error) {
    console.error('게시글 업데이트 오류:', error);
  }
};
const [formData, setFormData] = useState({
  hp_name: '',
  hp_location: '',
  hp_time: '',
  hp_phone: '',
  hp_review: '',
});
const handleInputChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};
const handleSubmit = async (e) => {
  e.preventDefault();
  const isLogin = sessionStorage.getItem('isLogin');
  if (isLogin === "true") {
    const finalFormData = {
      hp_name: formData.hp_name,
      hp_location: formData.hp_location,
      hp_time: formData.hp_time,
      hp_phone: formData.hp_phone,
      hp_review: formData.hp_review,

    };
    try {
      await Axios.post('http://localhost:3301/api/hpinformation', finalFormData);

      setFormData({
        hp_name: '',
        hp_location: '',
        hp_time: '',
        hp_phone: '',
        hp_review: '',
      });

      // 게시글을 추가한 후 목록을 다시 불러와서 화면에 갱신
      const response = await Axios.get('http://localhost:3301/api/hpinformation');
      setPosts(response.data);

      console.log('게시글이 성공적으로 추가되었습니다.');
      alert('게시글 추가 성공');
    } catch (error) {
      console.error('게시글 추가 오류:', error);
    }
  } else {
    // 로그인 상태 아닐 경우
    alert("로그인 plz");
  }
};
  const handleUpdateClick = (item) => {
    // 선택한 게시글의 정보를 폼 데이터에 설정
    setFormData({
      hp_name: item.hp_name,
      hp_location: item.hp_location,
      hp_time: item.hp_time,
      hp_phone: item.hp_phone,
      hp_review: item.hp_review,
    });
    // 선택한 게시글의 ID를 저장하여 업데이트 시 사용
    setSelectedPost(item);
  };

  return<>
      <Container>
      <h1>FAQ 게시판</h1>
            <form onSubmit={handleSubmit}>
            <label>
  병원이름:
  <input type="text" name="hp_name" value={formData.hp_name} onChange={handleInputChange} />
</label>
<label>
  병원위치:
  <textarea name="hp_location" value={formData.hp_location} onChange={handleInputChange} />
</label>
<label>
  병원시간:
  <textarea name="hp_time" value={formData.hp_time} onChange={handleInputChange} />
</label>
<label>
  병원전화번호:
  <textarea name="hp_phone" value={formData.hp_phone} onChange={handleInputChange} />
</label>
<label>
  병원리뷰:
  <textarea name="hp_review" value={formData.hp_review} onChange={handleInputChange} />
</label>
            </form>

    <form onSubmit={selectedPost && handleUpdate}>
                {selectedPost && (
                  <>
                    <button type="button" onClick={handleUpdate}>
                      게시글 업데이트
                    </button>                
                  </>
                )}
              </form>
      {
    modalOpen1 &&
        <ModalContainer >
        <ModalOverlay onClick={() => setModalOpen1(false)}/>    
        <ModalContent>
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
        <Table>
          <thead>
            <tr>
              <th>번호</th>
              <th>병원이름</th>
              <th>병원위치</th>
              <th>병원시간</th>
              <th>병원전화번호</th>
              <th>병원리뷰</th>
            </tr>
          </thead>
          <tbody>
            {hpinformation && hpinformation.length > 0 && hpinformation.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.hp_name}</td>
                <td>{item.hp_location}</td>
                <td>{item.hp_time}</td>
                <td>{item.hp_phone}</td>
                <td>{item.hp_review}</td>
                        <td>
                          <button onClick={() => handleUpdateClick(post)}>수정</button>
                          </td>
              </tr>
            ))}
          </tbody>
        </Table>
            <ModalCloseBtn className="modal-close-btn" onClick={() => setModalOpen2(false)}>
            x
            </ModalCloseBtn>
        </ModalContent>
        </ModalContainer>
    }
    
        <main>
        <Login isLogin={isLogin} setIsLogin={setIsLogin} userId={userId} setUserId={setUserId} password={password} setPassword={setPassword} />
              <section >
                <Sidebar>
                  <h2>관리자</h2>
                  <ul>
                    <li><Link to="/admin"onClick={() => setModalOpen1(true)}>회원정보</Link></li>
                    <li><Link to="/admin"onClick={() => setModalOpen2(true)}>병원정보</Link></li>
                  </ul>
                </Sidebar>
              </section>
          </main>
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