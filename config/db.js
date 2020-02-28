const mongoose = require('mongoose')
//@access the global config file
const config = require('config');
//@get the atlas url
const db = config.get('mongoURI');

const connectDB = async ()=>{


   try {
      await mongoose.connect(db,{
       useNewUrlParser:true,
       useCreateIndex:true,
       useFindAndModify:false,
       useUnifiedTopology: true
       
   })

   console.log("MongoDb Connected Successfully!!!!")
   } catch (err) {
       console.error(err.message);

    //    process.exit(1)
        
   }


}

module.exports=connectDB
