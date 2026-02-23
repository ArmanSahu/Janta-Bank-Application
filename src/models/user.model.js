const mongoose = require("mongoose");
const {hashPassword,comparePassword} = require("../utils/password.util")

const {Schema,model} = mongoose;
// const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new Schema({
    email : {
        type : String,
        unique : [true,"Email already Exists."],
        required : [true,"Email is require for creating an accont"],
        trim : true,
        lowercase : true,
        match : [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Invalid Email address"]
    },
    username : {
        type : String,
        required : [true,"Name is required for creating an account"],
    },
    password : {
        type : String,
        required : [true,"Password is required for creating an account."],
        minlength : [6,"Password should contain more than 6 character"],
        select : false
    }
},{
    timestamps : true
});

userSchema.pre("save", async function(){
    if(!this.isModified("password")){
        return ;
    }
    const hashedpassword = await hashPassword(this.password); 
    this.password = hashedpassword;
    return;
});

userSchema.methods.comparePass = async function(password){
    console.log(password,this.password);
    return await comparePassword(password,this.password);
}

const userModel = model("user",userSchema);

module.exports = userModel;