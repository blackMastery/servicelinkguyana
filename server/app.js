const dotenv = require("dotenv");
const { promisify } = require('util');

dotenv.config();

var morgan = require("morgan");
const express = require('express')
const next = require('next')
const mongoose = require('mongoose');
const MongoClient = require("mongodb").MongoClient;


const serviceProvider = require('./routes/serviceProvider')
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
  console.log(process.env.LOCAl_DB);
    
  mongoose
    .connect(process.env.LOCAl_DB, {
      useNewUrlParser: true,
       useUnifiedTopology: true
      // useCreateIndex: true,
      // useFindAndModify: false
    })
    .then(() => console.log('DB connection successful!'));

} 


// const uri = "mongodb+srv://kevon:passlock30@school-jjtxd.mongodb.net/slg?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   // const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });



app.prepare().then(() => {
  const server = express();

  // Body parser, reading data from body into req.body
  server.use(express.json({ limit: "10kb" }));
  server.use(cookieParser());
  server.use(morgan('dev'))

  server.use("/api/v1/serviceprovider", serviceProvider);
  server.use("/api/v1/client", clientRoutes);


  
  //  server.get("/jobfeeds", (req, res) => {
    //    return app.render(req, res, "/jobfeeds", req.query);
    //  });

    // server.get('/profile', async (req, res, next) => {
    //   if (req.cookies.jwt) {
    //     try {
    //       // 1) verify token
    //       const decoded = await promisify(jwt.verify)(
    //         req.cookies.jwt,
    //         process.env.JWT_SECRET
    //       );

    //       // 2) Check if user still exists
    //       const currentUser = await User.findById(decoded.id);
    //       if (!currentUser) {
    //         // return next();
    //         return app.render(req, res, "/", req.query);
    //       }

    //       // 3) Check if user changed password after the token was issued
    //       // if (currentUser.changedPasswordAfter(decoded.iat)) {
    //       //   return next();
    //       // }

    //       // THERE IS A LOGGED IN USER
    //       res.locals.user = currentUser;

    //       return next();
    //     } catch (err) {
    //       // return next();
    //         return app.render(req, res, "/", req.query);

    //     }
    //   }
    //   next();
    //   console.log(req.cookies)
    //   next()

    // })
    
    server.all("*", (req, res) => {
      return handle(req, res);
    });
    
  // server.use(globalErrorHandle)
  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });

                  })

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});




