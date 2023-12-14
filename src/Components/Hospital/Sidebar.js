import {  AiOutlineMenu  } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";
import { FiLogIn } from "react-icons/fi";
import "./css/sidebar.css";
import styled from "styled-components"
import { Link,useNavigate} from "react-router-dom"
import { useState,useEffect } from "react";
import { ModalContainer, ModalOverlay, ModalCloseBtn, ModalContent } from "./Modal";
import Axios from 'axios';

const Container=styled.div` 
position: absolute;
left: 5px;
top: 60px;
li{
    font-size: 20px;
}
li a{
    font-size: 18px;
}
`
const Barbrand=styled.div`
display: flex;
h2 {
        margin-left: 30px;
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

export default function Sidebar({mypageClick,mbClick,isSidebarOpen,setSidebarOpen,toggleSidebar}){
    const navigate=useNavigate();
    
const [modalOpen, setModalOpen] = useState(false);
const [modalOpen1, setModalOpen1] = useState(false);
const [modalOpen2, setModalOpen2] = useState(false);
const [modalOpen3, setModalOpen3] = useState(false);
const [modalOpen4, setModalOpen4] = useState(false);
const [modalOpen5, setModalOpen5] = useState(false);
const [modalOpen6, setModalOpen6] = useState(false);
    //예약하기 불러오기
    const [reservation, setReservation] = useState('');
    const [isResvationLoadong,setisReservationLoading]=useState(false);
    
        function reservationLoading() {
            // 서버의 API를 호출하여 데이터 가져오기
            fetch('http://localhost:3301/api/reservationUpdate') // 백엔드 서버 주소를 사용
            .then((response) => response.json())
            .then((data) => {
                // 예약자 아이디 추가
                const reservationsWithUserId = data.map((reservation) => ({
                ...reservation,
                user_id: sessionStorage.getItem('id'), // 예약자 아이디 추가
                }));
                setReservation(reservationsWithUserId);
                setisReservationLoading(true);
                console.log(reservationsWithUserId);
            })
            .catch((error) => {
                console.error('데이터 불러오기 실패:', error);
            });
        }
    useEffect(() => {
        reservationLoading();
        }, [isResvationLoadong]);

        // 사용자 정보를 담을 상태 변수들
        const [year, setYear] = useState('');
        const [hospital, setHospital] = useState('');
        const [hospitalName, setHospitalName] = useState('');
        // 예약하기 버튼 클릭 시 실행되는 함수
        const handleRegister= async (e) =>{
            e.preventDefault();
            // 서버에 회원가입 요청을 보냄
            const current = new Date();
            const currentDateTime = current.toISOString(); // ISO 형식으로 현재 날짜와 시간 가져오기
        const isLogin = sessionStorage.getItem('isLogin');
        if (isLogin === "true") {
                
                    Axios.post('http://localhost:3301/api/reservation', {
                    year: year,
                    hospital: hospital,
                    hospital_name: hospitalName,
                    reservationtime:currentDateTime,
                    })
                    .then((response) => {
                    // 예약 성공 시 처리
                    alert("예약성공 성공");
                    navigate('/home');
                    // 예약 성공 후 리다이렉션 등 필요한 처리 추가
                    })
                    .catch((error) => {
                    // 예약 실패 시 처리
                    console.error('예약 실패오류:', error);
                    });
                } else {
                    // 로그인 상태 아닐 경우
                    alert("로그인 plz");
                }          
            };

            function formatDate(dateString) {
                const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'Asia/Seoul' };
                return new Intl.DateTimeFormat('ko-KR', options).format(new Date(dateString));
            }

//예약자 확인
const [reservationMember, setreservationMember] = useState([]);

    useEffect(() => {
    const fetchData = async () => {
        try {
        const response = await Axios.get('http://localhost:3301/api/reservationMember'); // 백엔드 서버 주소로 수정
        setreservationMember(response.data);
        } catch (error) {
        console.error('데이터 가져오기 실패:', error);
        }
    };

    fetchData();
    }, []);


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

return(
    <>
    <Container>
    {modalOpen &&
        <ModalContainer >
            <ModalOverlay onClick={() => setModalOpen(false)}/>
            <ModalContent>
                <ModalCloseBtn onClick={() => setModalOpen(false)}>x</ModalCloseBtn>
                <div className="tap-panels">
                    <div className="tab-panel">
                    <div className="date"onChange={(e) => setYear(e.target.value)}>날짜:<input type="date" /></div>
                    <table>
                        <tbody>
                        <tr>
                            <td>
                            <select name="nation"onChange={(e) => setHospital(e.target.value)}>
                                <option value="">병원을 선택하세요.</option>
                                <optgroup label="병원">
                                <option value="medc" >내과</option>
                                <option value="surg">외과</option>
                                <option value="dent">치과</option>
                                </optgroup>
                            </select>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div><input type="text" onChange={(e) => setHospitalName(e.target.value)}/></div>
                    <div>예약하기<input type="submit" value="Submit" onClick={handleRegister}/></div>
                    </div>
                </div>
            </ModalContent>
        </ModalContainer>
    }
    {
    modalOpen1 &&
        <ModalContainer >
        <ModalOverlay onClick={() => setModalOpen1(false)}/>    
        <ModalContent>
        <Table>
            <thead>
                <tr>
                <th>번호</th>
                <th>예약일자</th>
                <th>병원종류</th>
                <th>병원이름</th>
                <th>예약자</th>
                <th>예약등록시간</th>
                </tr>
            </thead>
            <tbody>
                {reservation && reservation.length > 0 && reservation.map((item, index) => (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{formatDate(item.year)}</td>
                    <td>{item.hospital}</td>
                    <td>{item.hospital_name}</td>
                    <td>{item.user_id}</td>
                    <td>{formatDate(item.reservationtime)}</td>
                </tr>
                ))}
            </tbody>
            </Table>
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
                <th>예약자</th>
                <th>병원이름</th>
                <th>예약시간</th>
                </tr>
            </thead>
            <tbody>
                {reservationMember && reservationMember.length > 0 && reservationMember.map((item, index) => (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.member}</td>
                    <td>{item.hospital_name}</td>
                    <td>{formatDate(item.reservationtime)}</td>
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
    {
    modalOpen3 &&
        <ModalContainer >
        <ModalOverlay onClick={() => setModalOpen3(false)}/>    
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
                </tr>
                ))}
            </tbody>
            </Table>
            <ModalCloseBtn className="modal-close-btn" onClick={() => setModalOpen3(false)}>
            x
            </ModalCloseBtn>
        </ModalContent>
        </ModalContainer>
    }
    {
    modalOpen4 &&
        <ModalContainer >
        <ModalOverlay onClick={() => setModalOpen4(false)}/>    
        <ModalContent>
            <ModalCloseBtn className="modal-close-btn" onClick={() => setModalOpen4(false)}>
            x
            </ModalCloseBtn>
        </ModalContent>
        </ModalContainer>
    }
    {
    modalOpen5 &&
        <ModalContainer >
        <ModalOverlay onClick={() => setModalOpen5(false)}/>    
        <ModalContent>
            <ModalCloseBtn className="modal-close-btn" onClick={() => setModalOpen5(false)}>
            x
            </ModalCloseBtn>
        </ModalContent>
        </ModalContainer>
    }
    {
    modalOpen6 &&
        <ModalContainer >
        <ModalOverlay onClick={() => setModalOpen6(false)}/>    
        <ModalContent>
            <ModalCloseBtn className="modal-close-btn" onClick={() => setModalOpen6(false)}>
            x
            </ModalCloseBtn>
        </ModalContent>
        </ModalContainer>
    }
    <div className={`sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
                <div className="menu-icon"onClick={toggleSidebar}> 
                <AiOutlineMenu />
                </div>
                    <Barbrand>        
                        <div className="sidebabrand-icon">HP</div>
                        <h2>병원 예약시스템</h2>
                        </Barbrand>
                        <div className="Sidebaicon1">
                        <button className="sidebarlogin"onClick={mypageClick}>
                            <div className="user-icon">
                            <AiOutlineUser />
                            </div>
                        <h3>내정보수정</h3>
                        </button>
                        <button className="sidebarmb"onClick={mbClick}>
                            <div className="login-icon">
                            <FiLogIn/>
                            </div>
                    <h3>회원가입</h3>
                        </button>
                        </div>
                        <ul id="Sidebamenu">
                        <li className="Sidebamenu-item">
                            <div className="Sidebamenu-button">
                            <div className="down-icon">
                            진료예약<FiChevronDown />
                            </div>
                            </div>
                            <ul className="Sidebamenu-sub">
                            <li className="Sidebamenu-sub-item">
                                <Link to={"/home"}className="sidemenu"onClick={() => setModalOpen(true)}>예약하기</Link>
                                
                            </li>
                            <li className="Sidebamenu-sub-item">
                                <Link to={"/home"}className="sidemenu"onClick={() => setModalOpen1(true)}>예약확인</Link>
                                
                            </li>
                            <li className="Sidebamenu-sub-item">
                                <Link to={"/home"}className="sidemenu"onClick={() => setModalOpen2(true)}>예약자 현황</Link>
                            </li>
                            <li className="Sidebamenu-sub-item">
                                <Link to={"/home"}className="sidemenu"onClick={() => setModalOpen3(true)}>병원정보</Link>
                                
                            </li>
                            </ul>
                        </li>
                        <li className="Sidebamenu-item">
                            <div className="Sidebamenu-button">
                            <div className="down-icon">
                            나의관리<FiChevronDown />
                            </div>
                            </div>
                            <ul className="Sidebamenu-sub">
                            <li className="Sidebamenu-sub-item">
                                <Link to="https://www.hira.or.kr/dummy.do?pgmid=HIRAA030009200000"target="_blank"className="sidemenu">병원내역 조회</Link>
                            </li>
                            <li className="Sidebamenu-sub-item">
                                <Link to="https://www.kahp.or.kr/ho/medi/intro.do"target="_blank"className="sidemenu">건강검진</Link>
                            </li>
                            <li className="Sidebamenu-sub-item">
                                <Link to={"/bmiMeasurement"}className="sidemenu">BMI측정</Link>
                            </li>
                            </ul>
                        </li>
                        <li className="Sidebamenu-item">
                            <div className="Sidebamenu-button">                        
                            <div className="down-icon">
                                검색<FiChevronDown />
                                </div>
                            </div>
                            <ul className="Sidebamenu-sub">
                            <li className="Sidebamenu-sub-item">
                                <Link to={"/sc"}className="sidemenu"onClick={() => setModalOpen4(true)}>내가 가본 병원</Link>
                            </li>
                            <li className="Sidebamenu-sub-item">
                                <Link to={"/sc"}className="sidemenu"onClick={() => setModalOpen5(true)}>가까운 병원</Link>
                            </li>
                            <li className="Sidebamenu-sub-item">
                                <Link to={"/sc"}className="sidemenu"onClick={() => setModalOpen6(true)}>인기병원</Link>
                            </li>
                            </ul>
                        </li>
                        <li className="Sidebamenu-item">
                            <div className="Sidebamenu-button">
                            <Link to={"/reservationConfirm"}className="sidemenu">FAQ</Link>
                            </div>
                        </li>
                        </ul>
                </div>
    </Container>
    </>
)
}