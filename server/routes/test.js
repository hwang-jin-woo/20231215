// test.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost', 
  user: 'root', 
  password: '', 
  database: 'test', 
});

router.get('/', (req, res) => {
  const sql_test = 'SELECT * FROM test';

  db.query(sql_test, (err, results) => {
    if (err) {
      console.error('데이터 가져오기 오류: ' + err.message);
      res.status(500).json({ error: '데이터 가져오기 오류' });
    } else {
      const testData = results.map((row) => ({
        no: row.no,
        content: row.content,
        title: row.title,
        type: row.type,
      }));
      res.json(testData);
    }
  });
});

module.exports = router;


