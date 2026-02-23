require("dotenv").config();
const app = require("./src/app");
const connectDatabase = require("./src/config/db");
const PORT = process.env.PORT || 8000;


connectDatabase().then(()=>{
    app.listen(PORT,()=>{
        console.log(`App is listening on ${PORT}`);
    })
})