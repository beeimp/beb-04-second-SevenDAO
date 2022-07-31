import express from 'express'
import router from './routes/index.js'
import logger from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
const port = 8080;

app.use(logger('dev'));
app.use(cors({
  origin: true,
  credentials: true,
  methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
}))
app.use(express.json({limit : "50mb"}));
app.use(express.urlencoded({limit:"50mb",extended: false}));
app.use(cookieParser());

// 로그인 & 회원가입
app.use('/signup', router.signup);
app.use('/signin', router.signin);
app.use('/verify', router.verify);
app.use('/mypage', router.mypage);
app.use('/search', router.search);

// wallet test
// app.use('/wallet', router.wallet);
// 게시판
app.use('/posts', router.posts);
// token 쪽
app.use('/token', router.token);

app.listen(port, ()=>{console.log(`app start at ${port}`)});
