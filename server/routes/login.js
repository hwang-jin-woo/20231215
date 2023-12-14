// 서버 측 API (예: routes/login.js)

const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hospital',
});

// 로그인 API
router.post('/', (req, res) => {
  const { user_id, user_pw } = req.body;
  // 사용자 아이디로 데이터베이스에서 사용자 정보를 가져옴
  const query = 'SELECT * FROM member WHERE user_id = ?';
  db.query(query, [user_id], (err, results) => {
    if (err) {
      console.error('쿼리 실행 오류:', err);
      res.status(500).send('서버 오류');
    } else {
      // 사용자가 입력한 아이디가 데이터베이스에 존재하는지 확인
      if (results.length > 0) {
        const storedPassword = results[0].user_pw;
        // 비밀번호 비교
        if (user_pw === storedPassword) {
          // 비밀번호가 일치하면 로그인 성공 응답
          const userInfo = results[0];
          res.status(200).json({ message: '로그인 성공', isLogin: true, userInfo });
        } else {
          // 비밀번호가 일치하지 않으면 로그인 실패 응답
          res.status(401).json({ message: '비밀번호가 일치하지 않습니다.', isLogin: false });
        }
      } else {
        // 사용자가 입력한 아이디가 데이터베이스에 없으면 로그인 실패 응답
        res.status(401).json({ message: '아이디가 존재하지 않습니다.', isLogin: false });

      }
    }
  });
});

module.exports = router;
