const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const adminRoutes = require('./routes/admin-routes');
const studentRoutes = require('./routes/student-routes');
// const cors = require("cors");
// const corsOptions ={
//    origin:'*', 
//    credentials:true,            //access-control-allow-credentials:true
//    optionSuccessStatus:201,
// }

const app = express();

app.use(bodyParser.json());

//app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

app.use(bodyParser.json());

app.use('/admin', adminRoutes);
app.use('/', studentRoutes);

mongoose
  .connect(
    `mongodb+srv://Dumb_Programmer:minecraftdr@teachertable.t7fdq.mongodb.net/TeacherTable?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Serving at PORT", 5000);
    app.listen(5000);
  })
  .catch(err => {
    console.log(err);
  });

// app.listen(5000, function(err) {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log("Serving at PORT", 5000);
//     }
// });