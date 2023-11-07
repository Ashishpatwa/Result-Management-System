module.exports = (sequelize, DataTypes)=>{
    const session = sequelize.define("session",{
     
        userId:{
            type:DataTypes.STRING,
            allowNull: false
        },
        jwt:{
            type:DataTypes.STRING
        },
        status:{
            type:DataTypes.STRING 
        }
    })

    return session
}

