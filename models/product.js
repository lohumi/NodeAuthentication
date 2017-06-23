//defining products schema
var mongoose=require('mongoose');
var schema=mongoose.Schema;
var ProdSchema=new schema({
	name:String
});
module.exports=mongoose.model('Prod',ProdSchema);