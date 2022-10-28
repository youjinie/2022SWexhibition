const express = require('express');
const app = express(); // express 서버 생성
const port = process.env.PORT || 3000;

const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database('C:user\OneDrive\바탕 화면\capstone\data\mapdata.db',sqlite3.OPEN_READWRITE, (err)=> {

    if (err) return console.error(err.message);

    console.log("connection successful");

});

app.set('view engine', 'ejs');


// get : 읽기(사이트) , post : 쓰기(댓글작성), put: 수정, delete: 삭제(댓글) 
 // 메인 페이지
app.get('/', function(요청, 응답){
    응답.sendFile(__dirname + '/main.html');
    
    
});

app.get('/search', function(요청, 응답){
    응답.sendFile(__dirname + '/search.html');
    
    var hpname = `SELECT 병원명 from '병원';`;
    db.all(hpname, function(err, rows){
        rows.forEach(function (row){
            console.log(row);

            응답.render('hpname', { hpname : row.병원명,
                hpaddress : row.주소, 
                hptel : row.전화번호,
                hppy : row.평일운영시간,
                hpty : row.토요일운영시간,
                hpiy : row.일요일운영시간 });
            

        });
    });
});
app.get('/pet', function(요청, 응답){
    
    
});


app.listen(port,()=> console.log(`Example app listening on port ${port}`));

