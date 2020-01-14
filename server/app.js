const dotenv = require("dotenv");
const { promisify } = require('util');

dotenv.config();

var morgan = require("morgan");
const express = require('express')
const next = require('next')
const mongoose = require('mongoose');
const MongoClient = require("mongodb").MongoClient;


const serviceProvider = require('./routes/provider')
const clientRoutes = require("./routes/clients");
const cookieParser = require("cookie-parser");


const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const globalErrorHandle = require('./controllers/errorHandler')



process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

//Configure mongoose's promise to global promise
// mongoose.promise = global.Promise;



const DB = `mongodb+srv://kevon:passlock30@school-jjtxd.mongodb.net/slg`;
const dburl = 'mongodb://localhost/test'
const mlab = 'mongodb://blogdata:password@ds239387.mlab.com:39387/blogdata29';



if(process.env.NODE_ENV  == 'production'){
  console.log(process.env.PROD_MONGODB);
  mongoose
    .connect(process.env.PROD_MONGODB, {
      useNewUrlParser: true,
       useUnifiedTopology: true
      // useCreateIndex: true,
      // useFindAndModify: false
    })
    .then(() => console.log('DB connection successful!'));

  }else{
  console.log(DB);
  
  mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
      // useCreateIndex: true,
      // useFindAndModify: false
    })
    .then(() => console.log("DB connection successful!"));

} 













app.prepare().then(() => {
  const server = express();
  
  // Body parser, reading data from body into req.body
  server.use(express.json({ limit: "10kb" }));
  
  server.use(cookieParser());
  server.use(morgan('dev'))

  // server.get("/profile", protected);
  // server.get("/jobfeeds", protected);
  server.use("/api/v1/provider", serviceProvider);
  server.use("/api/v1/client", clientRoutes);
  
  server.use(globalErrorHandle)

  

    
  
    server.all("*", (req, res) => {
        return handle(req, res);
    });
    


  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port} env: ${process.env.NODE_ENV}`);
  });

})

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});




