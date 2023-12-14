
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
  const sql_reservationmember = 'SELECT * FROM reservationmember';

  db.query(sql_reservationmember, (err, results) => {
    if (err) {
      console.error('데이터 가져오기 오류: ' + err.message);
      res.status(500).json({ error: '데이터 가져오기 오류' });
    } else {
      const reservationData = results.map((row) => ({
        re_member:row.re_member,
        member: row.member,
        hospital_name: row.hospital_name,
        reservationtime:row.reservationtime,
      }));
      res.json(reservationData);
    }
  });
});



module.exports = router;


