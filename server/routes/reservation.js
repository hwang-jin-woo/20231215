const express = require('express');
const reservationRouter = express.Router();
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hospital',
});

// 예약하기 API
reservationRouter.post('/', (req, res) => {
  const current = new Date();
  const {
    year,
    hospital,
    hospital_name,
    user_id,
    
  } = req.body;

  // Prepared Statement를 사용하여 SQL Injection 방지
  const query =
    'INSERT INTO reservation (year,hospital,hospital_name,user_id,reservationtime) VALUES (?, ?, ?,?,?)';

  // 쿼리 실행
  db.query(
    query,
    [
      year,
      hospital,
      hospital_name,
      user_id,
      current,
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







module.exports = reservationRouter;
