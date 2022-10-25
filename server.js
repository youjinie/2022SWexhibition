const express = require('express');
const app = express(); // express 서버 생성
const port = process.env.PORT || 3000;

// get : 읽기(사이트) , post : 쓰기(댓글작성), put: 수정, delete: 삭제(댓글) 
 // 메인 페이지
app.get('/', function(요청, 응답){
    응답.sendFile(__dirname + '/main.html');
    
});

app.get('/search', function(요청, 응답){
    응답.sendFile(__dirname + '/member.html');
    
});
app.get('/pet', function(요청, 응답){
    응답.send('펫 용품 쇼핑 할 수 있는 페이지 입니다.');
    
});


app.listen(port,()=> console.log(`Example app listening on port ${port}`));

