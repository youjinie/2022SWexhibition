const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database('./data/mapdata.db',sqlite3.OPEN_READWRITE, (err)=> {

    if (err) return console.error(err.message);

    console.log("connection successful");

});

//병원 DB
var hpname = `SELECT 병원명 from '병원';`;
db.all(hpname, function(err, rows){
    rows.forEach(function (row){
        console.log(row);
    });
}
);

var hpaddress = `SELECT 주소 from '병원';`;
db.all(hpaddress, function(err, rows){
    rows.forEach(function (row){
        console.log(row);
    });
}
);

var hptime = `SELECT 평일운영시간 from '병원';`;
db.all(hptime, function(err, rows){
    rows.forEach(function (row){
        console.log(row);
    });
}
);

var hpbg = `SELECT 비고 from '병원';`;
db.all(hpbg, function(err, rows){
    rows.forEach(function (row){
        console.log(row);
    });
}
);

var hpwg = `SELECT 위도, 경도 from '병원';`;
db.all(hpwg, function(err, rows){
    rows.forEach(function (row){
        console.log(row);
    });
}
);






db.close((err) => {
    if(err) return console.error(err.message);
})