const mongoose = require("mongoose");
const {Schema,model} = mongoose;
const ObjectId = mongoose.Schema.Types.ObjectId;

const accountSchema = new Schema({
    userId : {
        type : ObjectId,
        ref : "user",
        required : [true,"account must be associated with a user"],
        index : true  //Makes searching a little bit faster 
    },
    status : {
        type : String,
        enum : {
            values: ["ACTIVE","FROZEN","CLOSED"],
            message: "Status can be either ACTIVE FROZEN or CLOSED"
        },
        default: "ACTIVE"
    },
    currency:{
        type : String,
        require : [true,"Currency is require for creating an account"],
        default : "INR"
    }
},{
    timestamps : true
});

accountSchema.index({userId:1,status:1}); //Creating index using multiple fields --> Compound Index

const accountModel = model("account",accountSchema);

module.exports = accountModel;