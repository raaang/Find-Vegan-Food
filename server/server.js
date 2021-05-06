const express = require('express') 
const app = express() 
const port = 3005 // react의 기본값은 3000이니까 3000이 아닌 아무 수
const mysql = require("mysql"); // mysql 모듈 사용

var connection = mysql.createConnection({
    host : "127.0.0.1",
    port: '3306',
    user : "vegan_id", //mysql의 id
    password : "190131", //mysql의 password
    database : "Vegan", //사용할 데이터베이스
});

// connection.connect();
app.set('port', process.env.PORT || 3005);

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(cors());

app.get('/', (req, res) =>{
    res.send('Start Connecting');
})

app.get('/member', (req, res) => {
  connection.query("select * from vegan.member", (err, data) => {
    if (err) res.send(err);
    else res.send(data);
  })
})

// app.post("/member", (req,res)=>{
//     const test = req.body.test;
//     // console.log(req.body);
//     connection.query("INSERT INTO test (test_body) values (?)",[test],
//     function(err,rows,fields){
//         if(err){
//             console.log("실패");
//             // console.log(err);
//         }else{
//             console.log("성공");
//             // console.log(rows);
//         };
//     });
// });

app.listen(port, ()=>{
  console.log(`Connect at http://localhost:${port}`); // '가 아닌 좌측상단의 esc버튼 밑의 `다.
})
