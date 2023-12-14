const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hospital',
});

// 회원가입 API
router.post('/', (req, res) => {
  const {
    user_id,
    user_pw,
    user_name,
    user_gender,
    user_phone_num, // 수정된 변수명
    user_birth,
    user_location,
    is_admin,
  } = req.body;

  // Prepared Statement를 사용하여 SQL Injection 방지
  const query =
    'INSERT INTO member (user_id, user_pw, user_name, user_gender, user_phone, user_birth, user_location, is_admin) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

  // 쿼리 실행
  db.query(
    query,
    [
      user_id,
      user_pw,
      user_name,
      user_gender,
      user_phone_num,
      user_birth,
      user_location,
      is_admin,
    ],
    (err) => {
      if (err) {
        console.error('쿼리 실행 오류:', err);
        res.status(500).send('서버 오류');
      } else {
        res.status(200).send('회원가입 성공');
      }
    }
  );
});




module.exports = router;
