import styled from "styled-components";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Table=styled.table`
    width: 800px;
    border: 1px solid #444444;
    background-color: ffcdb2;
    position: absolute;
    top: 200px;
    right: -300px;

  th{
    background-color: lightsalmon; 
  }
  th, td {
    border: 1px solid #444444;
    
  }
`

const Container = styled.div`
  width: calc(100vw-10px);
  background-color: #e5989b;
`
const Footer = styled.div`
  display: flex;
`
const Board = styled.div`
  position: relative;
  left: 800px;
  label{
    display: flex;
    flex-direction: column;
  }
`

export function FAQ() {
  const userID = sessionStorage.getItem('id');
  const [formData, setFormData] = useState({
    title: '',
    context: '',
    time: '',
    modiatedDate: '',
    writer: '',
    modifiter: '',
  });

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3301/api/board');
        setPosts(response.data);
      } catch (error) {
        console.error('게시글 불러오기 오류:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isLogin = sessionStorage.getItem('isLogin');
    if (isLogin === "true") {
      const writer = sessionStorage.getItem('id');
      const current = new Date();
      const finalFormData = {
        title: formData.title,
        context: formData.context,
        writer: writer,
        time: current, // 현재 시간으로 업데이트
        modiatedDate: current, // 현재 시간으로 업데이트
      };
      try {
        await axios.post('http://localhost:3301/api/board', finalFormData);
  
        setFormData({
          title: '',
          context: '',
          time: current, // 현재 시간으로 업데이트
          modiatedDate: current, // 현재 시간으로 업데이트
        });
  
        // 게시글을 추가한 후 목록을 다시 불러와서 화면에 갱신
        const response = await axios.get('http://localhost:3301/api/board');
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

  const handleDelete = async (uboard) => {
    try {
      await axios.delete(`http://localhost:3301/api/board/delete/${uboard}`);
  
      // 게시글을 삭제한 후 목록을 다시 불러와서 화면에 갱신
      const response = await axios.get('http://localhost:3301/api/board');
      setPosts(response.data);
  
      console.log('게시글이 성공적으로 삭제되었습니다.');
      alert('게시글 삭제 성공');
    } catch (error) {
      console.error('게시글 삭제 오류:', error);
    }
  };

  const [selectedPost, setSelectedPost] = useState(null);

  const handleUpdateClick = (post) => {
    // 선택한 게시글의 정보를 폼 데이터에 설정
    setFormData({
      title: post.title,
      context: post.context,
      modiatedDate:new Date(),
      // 다른 필드도 필요에 따라 추가
    });

    // 선택한 게시글의 ID를 저장하여 업데이트 시 사용
    setSelectedPost(post);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const modifiter = sessionStorage.getItem('id');
    const modiatedDate = new Date();
    const finalFormData = {
      title: formData.title,
      context: formData.context,
      modifiter: modifiter,
      modiatedDate: modiatedDate,
    };
    
    console.log('Sending update request:', finalFormData);
    
    try {
      await axios.put(`http://localhost:3301/api/board/${selectedPost.uboard}`, finalFormData);
    
      // 게시글을 업데이트한 후 목록을 다시 불러와서 화면에 갱신
      const response = await axios.get('http://localhost:3301/api/board');
      setPosts(response.data);
    
      // 선택한 게시글 정보 초기화
      setSelectedPost(null);
      setFormData({
        title: '',
        context: '',
        time: new Date(), // 현재 시간으로 업데이트
        modiatedDate: new Date(), // 현재 시간으로 업데이트
        // 다른 필드도 초기화
      });
    
      console.log('게시글이 성공적으로 업데이트되었습니다.');
      alert('게시글 업데이트 성공');
    } catch (error) {
      console.error('게시글 업데이트 오류:', error);
    }
  };
  
  

  function handleCancle() {
    setSelectedPost(null);
    setFormData({
      title: '',
      context: '',
      // 다른 필드도 초기화
    });
  };
  function formatDate(dateString) {
    if (!dateString) {
      return ''; // dateString이 비어있는 경우 빈 문자열 반환
    }
    const date = new Date(dateString);   
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분 ${second}초`;
  }

  return <>
    <Container>
      <main className="main">
        <section>
          <Board>
            <h1>FAQ 게시판</h1>
            <form onSubmit={handleSubmit}>
              <label>
                제목:
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} />
              </label>
              <label>
                내용:
                <textarea name="context" value={formData.context} onChange={handleInputChange} />
              </label>
              {/* 다른 필드들도 위와 같이 추가 */}
              <button type="submit">게시글 추가</button>
            </form>

            <form onSubmit={selectedPost && handleUpdate}>
                {selectedPost && (
                  <>
                    <button type="button" onClick={handleCancle}>
                      취소
                    </button>
                    <button type="button" onClick={handleUpdate}>
                      게시글 업데이트
                    </button>                
                  </>
                )}
              </form>
              <Table>
              <thead>
                <tr>
                  <th>제목</th>
                  <th>내용</th>
                  <th>작성자</th>
                  <th>작성일</th>
                  <th>수정일</th>
                  <th>작업</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post,index) => (
                  <tr key={post.uboard}>
                    <td>{index + 1}</td>
                    <td>{post.title}</td>
                    <td>{post.context}</td>
                    <td>{post.writer}</td>
                    <td>{formatDate(post.time)}</td>
                    <td>{formatDate(post.modiatedDate)}</td>
                    <td>
                      {userID === post.writer && (
                        <>
                          <button onClick={() => handleDelete(post.uboard)}>삭제</button>
                          <button onClick={() => handleUpdateClick(post)}>수정</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Board>
        </section>
      </main>
      <Footer>
        <ul>
          <li><Link to='https://cocoder.tistory.com' target='_blank'>Blog</Link> </li>
          <li><Link to='https://github.com/hwang-jin-woo/' target='_blank'>Github</Link></li>
        </ul>
        <p>
          <span>저자 : 황진우</span><br />
          <span>이메일 : hjinu91@naver.com</span><br />
          <span>Copyright 2023. copy. All Rights Reserved.</span>
        </p>
      </Footer>
    </Container>
  </>
}
