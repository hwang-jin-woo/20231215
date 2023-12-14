const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hospital',
});

// 아이디 중복 체크 API
router.post('/', (req, res) => {
  const { user_id } = req.body;

  // 아이디 중복 여부 쿼리
  const query = 'SELECT COUNT(*) AS count FROM member WHERE user_id = ?';

  db.query(query, [user_id], (err, result) => {
    if (err) {
      console.error('쿼리 실행 오류:', err);
      res.status(500).send('서버 오류');
    } else {
      const count = result[0].count;
      if (count > 0) {
        // 중복된 아이디가 존재
        res.status(200).json({ duplicate: true });
      } else {
        // 중복된 아이디가 없음
        res.status(200).json({ duplicate: false });
      }
    }
  });
});

module.exports = router;
