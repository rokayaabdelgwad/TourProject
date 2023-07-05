const mongoose = require('mongoose');

const governorSchema = new mongoose.Schema({
    name:{
        type:String
    },
    description: {
        type: String,
        trim: true
    
      }, 
      imageCover: {
        type:String
      },
      images: [String],


})

module.exports=governorSchema