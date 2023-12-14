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
  const sql_hpinformation = 'SELECT * FROM hpinformation';

  db.query(sql_hpinformation, (err, results) => {
    if (err) {
      console.error('데이터 가져오기 오류: ' + err.message);
      res.status(500).json({ error: '데이터 가져오기 오류' });
    } else {
      const hpinformationData = results.map((row) => ({
        hpif:row.hpif,
        hp_name: row.hp_name,
        hp_location: row.hp_location,
        hp_time: row.hp_time,
        hp_phone:row.hp_phone,
        hp_review:row.hp_review,
      }));
      res.json(hpinformationData);
    }
  });
});

// 병원정보 업데이트
router.put('/:hpif', (req, res) => {
  const hpif = req.params.hpif;
  const finalFormData = req.body;

  console.log('Received update request:', finalFormData);  // 추가된 콘솔

  // Prepared Statement를 사용하여 SQL Injection 방지
  const query =
  'UPDATE hpinformation SET hp_name=?, hp_location=?, hp_time=?, hp_phone=?, hp_review=? WHERE hpif=? '


  // 쿼리 실행
  db.query(
    query,
    [
      finalFormData.hp_name,
      finalFormData.hp_location,
      finalFormData.hp_time,
      finalFormData.hp_phone,
      finalFormData.hp_review,
      hpif,
    ],
    (err) => {
      if (err) {
        console.error('쿼리 실행 오류:', err);
        res.status(500).send('서버 오류');
      } else {
        res.status(200).json({ message: '게시판 수정이 완료되었습니다' });
      }
    }
  );
});



module.exports = router;


