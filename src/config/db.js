const mongoose = require("mongoose");

async function connectDatabase(){
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Server is connected to Database");
    }catch(err){
        console.log(`Error connecting to Database `);
        process.exit(1);
    }
}

module.exports = connectDatabase;