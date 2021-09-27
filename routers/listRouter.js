const express = require("express");
//schemas/list에서 정보 가져오기
const Lists = require("../schemas/list");

const router = express.Router();


//view/list.ejs (전체 홈피 페이지) 위한 서버를 구축한 것
//api/list에서 클라이언트에게 값을 주는 것
router.get("/list", async (req, res, next) => {
  try {
    // const { submitDate } = req.query;
    const list = await Lists.find({}).sort("-submitDate");
    res.json({ list: list });
  } catch (err) {
    console.error(err);
    next(err);
  }
});


//글쓰기 post(새롭게 데이터 추가하기)
router.post('/list', async (req, res) => {
  const {
    title, 
    name, 
    pwd, 
    // date, 
    content
  } = await req.body;

  const date = new Date();
  let currentDate= date.toLocaleString();
  const submitDate = date.getTime();

  await Lists.create({
    title:title, 
    name: name, 
    pwd:pwd, 
    date : currentDate,
    submitDate:submitDate, 
    content:content
  })

  res.send({ result: "success" });
});


//상세페이지
// router.get("/list/:date", async (req, res) => {
//   const { date } = await req.query;
//   console.log(req.query)
//   let listDate = await Lists.findOne({ date: date });
//   console.log(listDate)
//   res.json({ detail: listDate });
// });

router.get("/list/:ID", async (req, res) => {
  const { ID } = req.params;
  console.log(ID)
  let listID = await Lists.findOne({ _id:ID });
  res.json({ detail: listID });
});

// // views/edit.ejs 글 수정 페이지
router.patch("/list/:date", async (req, res) => {
  
})


//삭제 페이지
router.delete("/borderList/:borderDate", async (req, res) => {
 
});



module.exports = router;