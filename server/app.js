import express from 'express'
import router from './routes/index.js'
import logger from 'morgan';
import cookieParser from 'cookie-parser';

const app = express();
const port = 8080;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/signup', router.signup);
app.use('/signin', router.signin);
app.use('/verifyTest', router.verifyTest);

app.listen(8080, ()=>{console.log(`app start at ${port}`)});
