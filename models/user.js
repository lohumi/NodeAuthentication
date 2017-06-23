var mongoose=require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Userschema=mongoose.Schema({
	local:{
		email:String,
		password:String,
	},
	facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }
});
//hash password
Userschema.methods.generateHash=function(password){
	return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
};
//check if pass is valid
Userschema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

/*var Userschema=new schema({
	name:String,
	password:String,
	admin:Boolean
});*/
module.exports=mongoose.model('User',Userschema);
		