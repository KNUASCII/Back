const mysql = require('mysql2/promise');

// 데이터베이스 연결 설정
const db = mysql.createPool({
  host: 'svc.sel4.cloudtype.app', // DB 호스트
  port: 31711, // DB 포트
  user: 'root', // DB 사용자 이름
  password: 'snow1010', // DB 비밀번호
  database: 'ascii', // DB 이름
});

module.exports = db;
