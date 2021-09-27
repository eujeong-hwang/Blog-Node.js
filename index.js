const express = require('express')
const app = express()
const port = 3000
// express.json()은 post 메서드의 body 정보를 쉽게 가공해주는 
app.use(express.json())

//not sure
app.use(express.urlencoded({extended: false}))

//api 설정
const listRouters = require('./routers/listRouter')
app.use("/api", [listRouters]);

//schemas 파일들과 연결하기
const connect = require('./schemas');
connect();

//미들웨어 실행하게 해주는 것
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static('public'));


//ejs 템플릿 엔진을 위한 것 
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


//미들웨어, 터미널 쪽 부분에 req 부분을 미리 찍어놓은 것임, 
//next를 호출하고, 다음 정상적인 루트를 찾아서 들어오는 것임
// app.use((req, res, next) => {
//     console.log(req);
//     next();
//   });
  

//views/list.ejs 파일을 get하는 것!
app.get('/', (req, res) => {
  res.render('list');
})

//views/detail.ejs파일을 get 하는 것!
app.get('/detail', (req, res) => {
    res.render('detail');
})

//views/write.ejs파일을 get
app.get('/write', (req, res) => {
    res.render('write');
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})