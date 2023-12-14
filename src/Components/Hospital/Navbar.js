import { Outlet, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { useState,useEffect } from "react";
import "./css/navbar.css";
import Sidebar from "./Sidebar";
import Login from "./Login";
import { ModalContainer, ModalOverlay, ModalCloseBtn, ModalContent } from "./Modal";
import Axios from 'axios';


const Container=styled.div`
    width: calc(100vw-10px);
    background-color: ffcdb2;
`
const Nav=styled.nav`
    padding-top: 10px;
    width: 1200px;
    margin: 0 auto; 
    display: flex;
    flex-direction: row;
    align-items: start;
    justify-content: space-between;
    
    li{
        
        line-height:50px;
        list-style: none;
        
        font-weight: bold;
        font-size: 18px;
        z-index: 1;
        text-align:center;
    }
    li a:hover{
    color: rgb(55, 55, 198);
    li a {
        color: black;
        text-decoration: none;
        
        /* text-underline-position : under; */
    }
}

`;
const NavBrand = styled.div`
    display: flex;
    position: relative;
    right: 90px;
    h2 {
        margin-left: 30px;
    }
`;
const MainMenu = styled.ul`
    display: flex;
    flex-direction: column;    
    ul {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 500px;
        
        li {
            width: calc( 25% );
            text-align: center;                        
        }
        a {
        color: black;
        text-decoration: none;
        /* text-underline-position : under; */
    }

    }
`;
const SubMenu = styled.div`
    width: 500px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: start;
    ul {
        display: flex;
        flex-direction: column;
        align-items:center;
        width: calc( 25% );
        text-align: center;
        position: relative;
        li {
            width: 100%;
            a{
                font-size: 16px;
            }
        }
        li a:hover{
            color: #ff7200;
        }
    }
    max-height: ${({ "$isSubContainerVisible": isSubContainerVisible }) =>
    isSubContainerVisible ? '500px' : '0'};
    opacity: ${({ "$isSubContainerVisible": isSubContainerVisible }) =>
    isSubContainerVisible ? '1' : '0.8'};
    overflow: hidden;
    transition: max-height 600ms, opacity 600ms;
`;
const Search = styled.div`
    position: relative;
    left: 70px;
    input{
        height: 40px;
        border: 1px solid black;
        font-size: 16px;
        margin-right: 10px;
        position: relative;
        top: 3px;
    }
    button{
    width: 100px;
    height: 40px;
    background: #ff7200;
    border: 2px solid #ff7200;
    font-size: 16px;
    color: #fff;
    cursor: pointer;
    border-bottom-right-radius: 5px;
    border-bottom-right-radius: 5px;
    }
`;
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
export function Navbar(){
    const navigate=useNavigate();
    const [inputValue,setInputValue]=useState("");
    const [isSubContainerVisible, setSubContainerVisible]=useState(false);

    const handleMouseEnter = () => {
        setSubContainerVisible(true);
    };
    
    const handleMouseLeave = () => {
        setSubContainerVisible(false);
    };

    const mypageClick = () => {
        navigate('/Mypage');
    };
    const mbClick = () => {
        navigate('/Mb');
    };
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
    console.log('open');
    };
    useEffect(() => {
    // 페이지 로딩 시 사이드바를 숨겨둘 경우
    setSidebarOpen(false);
    }, []);

    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    
    const [isLogin, setIsLogin] = useState(false);
    
    useEffect(() => {
        if (sessionStorage.getItem('isLogin')) {
        setIsLogin(true);
        }
    },[]);


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

return<>
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
                                <option value="내과" >내과</option>
                                <option value="외과">외과</option>
                                <option value="치과">치과</option>
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

    <Nav>
        <Sidebar mypageClick={mypageClick} mbClick={mbClick} isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} toggleSidebar={toggleSidebar}/>
        <NavBrand>
            <div className="brand-icon">HP</div>
            <h2>병원 예약시스템</h2>
        </NavBrand>
        <MainMenu onMouseLeave={handleMouseLeave}>
            <ul >
                <li><Link to="./home" onMouseEnter={handleMouseEnter}>진료예약</Link></li>
                <li><Link to="./mg" onMouseEnter={handleMouseEnter}>나의 관리</Link></li>
                <li><Link to="./sc" onMouseEnter={handleMouseEnter}>검색</Link> </li>
                <li><Link to="./faq" onMouseEnter={handleMouseEnter}>FAQ</Link></li>
            </ul>
            <SubMenu $isSubContainerVisible={isSubContainerVisible}>
                <ul>
                    <li><Link to="./home"onClick={() => setModalOpen(true)}>예약하기</Link>
                    </li>                       
                    <li><Link to="./home"onClick={() => setModalOpen1(true)}>예약확인</Link>
                    </li> 
                    <li><Link to="/home"onClick={() => setModalOpen2(true)}>예약자현황</Link>
                    
                    </li>
                    <li><Link to="/home"onClick={() => setModalOpen3(true)}>병원정보</Link>
                    </li>
                </ul>
                <ul>
                    <li><Link to="https://www.hira.or.kr/dummy.do?pgmid=HIRAA030009200000"target="_blank">병원내역조회</Link></li>
                    <li><Link to="https://www.kahp.or.kr/ho/medi/intro.do"target="_blank">건강검진</Link></li>
                    <li><Link to="./BmiMeasurement">BMI측정</Link></li>
                </ul>
                <ul>
                    <li><Link to="/sc"onClick={() => setModalOpen4(true)}>내가 가본병원</Link>
                    </li>
                    <li><Link to="/sc"onClick={() => setModalOpen5(true)}>가까운병원</Link>
                    </li>
                    <li><Link to="/sc"onClick={() => setModalOpen6(true)}>인기병원</Link>
                    </li>
                </ul>
            </SubMenu>
        </MainMenu>
        <Search>
            <input value={inputValue} onChange={(e)=>setInputValue(e.target.value)} placeholder="검색어를 입력하세요." />
            <button  onClick={()=>{
                setInputValue("");
                navigate(`/search?keyword=${inputValue}`);
            }}>검색</button>
        </Search>            
    </Nav>
</Container>
<Login isLogin={isLogin} setIsLogin={setIsLogin} userId={userId} setUserId={setUserId} password={password} setPassword={setPassword} mbClick={mbClick} />
<Outlet />

</>
}