const mongoose=require('mongoose');
const PackageSchema=require('./schema/packageSchema')
const Package=  mongoose.model('User',PackageSchema)

module.exports=Package