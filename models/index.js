const dbConfig = require('../config/dbConfig');
const { Sequelize, DataType, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.User,
    dbConfig.PASSWORD,{
        host : dbConfig.HOST,
        dialect : dbConfig.Dialet, 
        operatorsAliases: false
    }
)


sequelize.authenticate()
.then(()=>{
    console.log("connection successfull");
})
.catch((err)=>{
    console.log("Error" + err);
})

// empty db object
const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('./userModel.js')(sequelize, DataTypes)
db.teachers = require('./teacherModel.js')(sequelize, DataTypes)
db.sessions = require('./session.js')(sequelize, DataTypes)

db.sequelize.sync({force: false})
.then(()=>{
    console.log("Re-sync done");
})

module.exports = db