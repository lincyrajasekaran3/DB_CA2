const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name:{type:String, required:true},
    description:String,
    price:{type:Number, required:true}
});

const restaurantSchema=new mongoose.Schema({
    name:{type:String, required:true},
    location:{type:String, required:true},
    cuisine:{type:String, required:true},
    rating:Number,
    menu:[menuSchema]
});

module.exports=mongoose.model('Restaurant', restaurantSchema);