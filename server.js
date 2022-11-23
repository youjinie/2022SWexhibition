const express = require("express");
const app = express(); // express 서버 생성
const port = process.env.PORT || 3000;
const sqlite3 = require("sqlite3").verbose();

app.use(express.static(__dirname)); // nodejs에서는 css파일이 바로 안열림  서버에서 해당 파일을 제공하지 못함 따라서 express.static 미들웨어 함수에 해당 파일을 전달하면 됨

const db = new sqlite3.Database(
  "./data/mapdata.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) return console.error(err.message);

    console.log("connection successful");
  }
);

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static(__dirname));

app.post("/change");

// get : 읽기(사이트) , post : 쓰기(댓글작성), put: 수정, delete: 삭제(댓글)
// 메인 페이지
app.get("/", function (요청, 응답) {
  응답.sendFile(__dirname + "/mainPG.html");
});
app.get("/Login", function (요청, 응답) {
  응답.sendFile(__dirname + "/login.html");
});
app.get("/mypage", function (요청, 응답) {
  응답.sendFile(__dirname + "/mypage.html");
});

app.get("/searchhospital", function (요청, 응답) {
  var setState = false;
  var name = 요청.query.search;
  var sOrt = 요청.query.sOrt;
  var sql = `SELECT * from 병원 order by 병원명;`;
  if (typeof name != "undefined") {
    sql =
      `SELECT * FROM 병원 WHERE 병원명 LIKE "%` + name + `%" order by 병원명;`;
  }

  if (typeof sOrt != "undefined") {
    for (var i = 0; i < sOrt.length; i++) {
      var index = parseInt(sOrt[i].index);
      var sql_sort =
        `UPDATE 병원 SET 정렬=` + index + ` WHERE id=` + parseInt(i + 1);
      console.log(sql_sort);
      db.run(sql_sort, function (err) {
        if (err) {
          return console.log(err.message);
        }
      });
    }

    sql = `SELECT * FROM 병원 order by 정렬;`;
  }

  db.all(sql, function (err, rows) {
    응답.render("searchhospital", { model: rows });
  });
});

app.get("/searchhospital_distance", function (요청, 응답) {
  var sql = `SELECT * FROM 병원 order by 정렬;`;
  var name = 요청.query.search;

  if (typeof name != "undefined") {
    sql =
      `SELECT * FROM 병원 WHERE 병원명 LIKE "%` + name + `%" order by 병원명;`;
  }

  db.all(sql, function (err, rows) {
    응답.render("searchhospital_distance", { model: rows });
  });
});

app.get("/searchpharmacy", function (요청, 응답) {
  var name = 요청.query.search;
  var sOrt = 요청.query.sOrt;
  var sql = `SELECT * from '약국' order by 업체명;`;

  if (typeof name != "undefined") {
    sql =
      `SELECT * FROM 약국 WHERE 업체명 LIKE "%` + name + `%" order by 업체명;`;
  }

  if (typeof sOrt != "undefined") {
    for (var i = 0; i < sOrt.length; i++) {
      var index = parseInt(sOrt[i].index);
      var sql_sort =
        `UPDATE 약국 SET 정렬=` + index + ` WHERE id=` + parseInt(i + 1);
      console.log(sql_sort);
      db.run(sql_sort, function (err) {
        if (err) {
          return console.log(err.message);
        }
      });
    }
  }

  db.all(sql, function (err, rows) {
    응답.render("searchpharmacy", { model: rows });
  });
});

app.get("/searchpharmacy_distance", function (요청, 응답) {
  var sql = `SELECT * FROM 약국 order by 정렬;`;
  var name = 요청.query.search;

  if (typeof name != "undefined") {
    sql =
      `SELECT * FROM 약국 WHERE 업체명 LIKE "%` + name + `%" order by 업체명;`;
  }

  db.all(sql, function (err, rows) {
    응답.render("searchpharmacy_distance", { model: rows });
  });
});

app.get("/searchpcrCenter", function (요청, 응답) {
  var name = 요청.query.search;
  var sql = `SELECT * from '선별진료소' order by 선별진료소명;`;

  if (typeof name != "undefined") {
    sql =
      `SELECT * FROM 선별진료소 WHERE 선별진료소명 LIKE "%` +
      name +
      `%" order by 선별진료소명;`;
  }

  db.all(sql, function (err, rows) {
    응답.render("searchpcrCenter", { model: rows });
  });
});

app.get("/searchisolation", function (요청, 응답) {
  응답.render("searchisolation");
});

app.get("/api/hospitals", function (요청, 응답) {
  var sql = `SELECT * from '병원';`;
  db.all(sql, function (err, rows) {
    응답.render("hospital", { model: rows });
  });
});

app.get("/api/pharmacy", function (요청, 응답) {
  var sql = `SELECT * from '약국';`;

  db.all(sql, function (err, rows) {
    응답.render("pharmacy", { model: rows });
  });
});

app.get("/api/sbjinryoso", function (요청, 응답) {
  var sql = `SELECT * from '선별진료소';`;
  db.all(sql, function (err, rows) {
    응답.render("sbjinryoso", { model: rows });
  });
});

app.get("/pharmach_list", (req, res) => {
  let api = async () => {
    let response = null;
    try {
      //http://api.odcloud.kr/api/3033733/v1/uddi:835b1c55-fbaf-45ee-936e-83b92b3c2a8d?page=1&perPage=10&returnType=XML&serviceKey=bb2DyTkLtZ69N9NXxrrn9JDou2Rshqy2nscuvs%2BPCKEv7NapMVsqMSJlxsXYHIs46GNI82Jp7qYApFEMokq5Jw%3D%3D
      response = await axios.get(
        "http://api.odcloud.kr/api/3033733/v1/uddi:835b1c55-fbaf-45ee-936e-83b92b3c2a8d",
        {
          params: {
            serviceKey:
              "bb2DyTkLtZ69N9NXxrrn9JDou2Rshqy2nscuvs+PCKEv7NapMVsqMSJlxsXYHIs46GNI82Jp7qYApFEMokq5Jw==",
            page: req.query.page,
            perPage: req.query.perPage,
            returnType: req.query.returnType,
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
    return response;
  };
  api().then((response) => {
    res.setHeader("Access Control Allow Origin", "*");
    res.json(response.data.response.body);
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));
