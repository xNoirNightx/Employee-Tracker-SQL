require ('dotenv').config ()
const mySQL=require ('mysql2')

const connection=mySQL .createConnection ({
    host:process.env.host,
    user:process.env.user,
    password:process.env.password,
    database:process.env.database,
}) 

module.exports=connection 