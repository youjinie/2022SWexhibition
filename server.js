var express = require('express');
var app = express(); // express 서버 생성


var port = 6608;


 // 메인 페이지
app.get('/', function(요청, 응답){
    응답.sendFile(__dirname + '/map.html');
    
});

app.listen(port,function(){
    console.log('listening ib 6608');
}) // 서버 연결 

//app.get('/pet', function(요청, 응답){
//    응답.send('펫 용품 쇼핑 할 수 있는 페이지 입니다.');
    
//});



