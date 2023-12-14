
import styled from "styled-components";
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./css/login.css";

const LoginWrap = styled.div`
  padding: 15px 10px;
  border-radius: 16px;
  position: absolute;
  width: 12%;
  left: 1500px;
  top: 80px;
  font-size: 20px;
  font-weight: bold;
  background-color: rgb(250, 250, 250);
  box-shadow: 0 8px 16px rgba(40, 40, 40, 0.5);
  
`;


export default function Login({ isLogin, setIsLogin, userId, setUserId, password, setPassword, mbClick }) {
  const navigate = useNavigate();

  const pageClick = () => {
    navigate('/Mypage');
  };

  const handleLogin = () => {
    Axios.post('http://localhost:3301/api/login', {
      user_id: userId,
      user_pw: password,
    })
      .then((response) => {
        if (response.data.isLogin) {
          console.log(response.data.userInfo);
          sessionStorage.setItem('isLogin', true);
          sessionStorage.setItem('uid', response.data.userInfo.uid);
          sessionStorage.setItem('id', response.data.userInfo.user_id);
          sessionStorage.setItem('pw', response.data.userInfo.user_pw);
          sessionStorage.setItem('birth', response.data.userInfo.user_birth);
          sessionStorage.setItem('gender', response.data.userInfo.user_gender.data);
          sessionStorage.setItem('location', response.data.userInfo.user_location);
          sessionStorage.setItem('phone', response.data.userInfo.user_phone);
          setIsLogin(true);
          if(response.data.userInfo.is_admin===1){
            navigate('/admin'); 
          }         
        } else {
          navigate('/home');   
        }
      })
      .catch((error) => {
        // 로그인 실패 시 처리
        console.error('로그인 오류:', error.response.data.message);
        // 로그인 실패 시 사용자에게 알림 등을 추가할 수 있습니다.
      });
  };

  function handleLogout() {
    setIsLogin(false);
    sessionStorage.removeItem('uid');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('pw');
    sessionStorage.removeItem('birth');
    sessionStorage.removeItem('gender');
    sessionStorage.removeItem('location');
    sessionStorage.removeItem('phone');
    sessionStorage.removeItem('isLogin');
    navigate('/Home'); 
  }


  return (
    <>
                  {!isLogin &&
                  <LoginWrap>
                      <div className="login-id-wrap">
                        <input placeholder="아이디" type="text" className="input-id" onChange={(e) => setUserId(e.target.value)}></input>
                      </div>
                      <div className="login-pw-wrap">
                        <input placeholder="비밀번호" type="password" className="input-pw" onChange={(e) => setPassword(e.target.value)}></input>
                      </div>
                      <div className="login-btn-wrap">
                        <button className="login-btn"onClick={handleLogin}>로그인</button>
                      </div>
                      <div className="under-login">
                        <span className="stay-check">
                          <input type="checkbox" name="stay-btn" value="stay" className="stay-checkbox" />로그인 상태 유지
                        </span>
                      </div>
                      <div className="login-btn1">         
                        <button  className="login-btn2"onClick={mbClick}>회원가입</button>       
                      </div>
                  </LoginWrap> 
                }
                {isLogin &&
                  <LoginWrap>
                      <button className="login-btn3"onClick={handleLogout}>로그아웃</button>
                      <button  className="login-btn3"onClick={pageClick}>내정보수정</button>
                  </LoginWrap> 
                }
    </>
  )

}