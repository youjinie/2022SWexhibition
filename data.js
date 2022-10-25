const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database('./data/mapdata.db',sqlite3.OPEN_READWRITE, (err)=> {

    if (err) return console.error(err.message);

    console.log("connection successful");

});

var sql = `SELECT * from '24시 편의점';`;
var templist = [];
db.all(sql, function(err, rows){
    let cnttemp = 0;

    rows.forEach(function (row){
        //templist[cnttemp] = row;
        //console.log(row);
        //templist.push(row.업체명);
        //console.log(templist[cnttemp]);
        //cnttemp++;

        //아마 여기서 res.send 어쩌구 하면서 서버랑 같이 써야 할 듯 유진이랑 같이 얘기해보깅
    });
}
);





db.close((err) => {
    if(err) return console.error(err.message);
})