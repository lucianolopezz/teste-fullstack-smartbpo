import dotenv from 'dotenv';
dotenv.config();
import bodyParser from 'body-parser';
import routes from './routes';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('tmp/uploads'));
app.use('/', routes);

app.listen(process.env.PORT || 3333, function(){
  console.log(`listening on port ${process.env.PORT || 3333}`);
});