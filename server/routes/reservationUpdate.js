// test.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost', 
  user: 'root', 
  password: '', 
  database: 'hospital', 
});

router.get('/', (req, res) => {
  const sql_reservation = 'SELECT * FROM reservation';

  db.query(sql_reservation, (err, results) => {
    if (err) {
      console.error('데이터 가져오기 오류: ' + err.message);
      res.status(500).json({ error: '데이터 가져오기 오류' });
    } else {
      const reservationData = results.map((row) => ({
        year: row.year,
        hospital: row.hospital,
        hospital_name: row.hospital_name,
        reservationtime:row.reservationtime,
      }));
      res.json(reservationData);
    }
  });
});

// 게시글 삭제
router.delete('/delete/:	user_hospital ', (req, res) => {
  const 	user_hospital  = req.params.	user_hospital ;

  db.query('DELETE FROM board WHERE 	user_hospital  = ?', 	user_hospital , (err, result) => {
    if (err) {
      console.error('게시글 삭제 오류:', err);
      res.status(500).send('게시글 삭제 오류');
    } else {
      res.status(200).send('게시글이 성공적으로 삭제되었습니다.');
    }
  });
});

module.exports = router;


