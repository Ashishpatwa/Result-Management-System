
module.exports = (sequelize, DataTypes)=>{
    const teacher = sequelize.define("teacher",{
        username:{
            type:DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        name:{
            type:DataTypes.STRING
        },
        password:{
            type:DataTypes.STRING 
        }
    })

    return teacher
}