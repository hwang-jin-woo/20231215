const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hospital',
});

// 정보수정 API
router.post('/', (req, res) => {
  const {
    user_uid,
    user_id,
    user_pw,
    user_name,
    user_gender,
    user_phone_num,
    user_birth,
    user_location,
  } = req.body;
  // Prepared Statement를 사용하여 SQL Injection 방지
  const query =
    'UPDATE member SET user_id=? ,user_pw=?, user_name=?, user_gender=?, user_phone=?, user_birth=?, user_location=? WHERE uid=?';

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
      user_uid,
    ],
    (err) => {
      if (err) {
        console.error('쿼리 실행 오류:', err);
        res.status(500).send('서버 오류');
      } else {
        res.status(200).json({ message: '회원정보 수정이 완료되었습니다' });
      }
    }
  );
});

module.exports = router;