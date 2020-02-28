const mongoose = require('mongoose');

const equipeAmbulancier = mongoose.Schema({

    user:{
      type:mongoose.SchemaTypes.ObjectId,
      ref:'users'
    },

    dateUrgence:{
        type:Date,
        default:Date.now()
    },

    vacation:{
        type:String,
        enum:['AM','PM']
    },

    heureUrgence:{
        type:String,

    },

    numMobile:{
        type:String,
        
    },
                   
    pointFixe:{
        type:String,
        
    },

    nomAppelant:{
        type:String,
        
    },

    nomPatient:{
        type:String,
        
    },

    telephone:{
        type:String,
        
    },
    lieuxRecuperaion:{
        type:String,
        
    },

    commune:{
        type:String,
        
    },

    age:{
        type:String,
        
    },

    hopital:{
        type:String,
        
    },

    sex:{
        type:String,
      
    },

    natureCas:{
        type:String,
    
    
    },

    autre:{
        type:String,
    
    
    },

    Diagnostiques:{
        type:String
    },

    PremierSoins:{
        type:String
    },

    MilleageAller:{
        type:String
    },

    MilleageRetour:{
        type:String
    },


    listHopRefusantPatient:{
        type:String
    },
    
    commentaires:{
        type:String
    },

   
})

module.exports=mongoose.model('equipeAmbulancier', equipeAmbulancier)