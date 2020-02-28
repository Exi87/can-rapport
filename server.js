const express = require('express');
const connectDB = require('../api/config/db')
const app = express();
const path = require('path')
const Port = process.env.Port ||5050;
//Connect to db
connectDB()

//MidlleWare Init
app.use(express.json({extended:false}));


//Define Routes
app.use('/api/users', require('../api/routes/users'));
app.use('/api/auth', require('../api/routes/auth'))
app.use('/api/urgence', require('../api/routes/urgence'));



    //set static folder

    //app.use(express.static(path.join(__dirname, "client", "build")))

    // ...
    // Right before your app.listen(), add this:
    // app.get("*", (req, res) => {
    //     res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    // });

app.listen(Port, ()=>{console.log(`App is listening on port ${Port}`)}
)