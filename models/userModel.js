module.exports = (sequelize, DataTypes)=>{
    const user = sequelize.define("user",{
        roll_number:{
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            validate:{
                isInt:{
                    msg: "Roll number must be an Integer."
                }
            }
        },
        name:{
            type:DataTypes.STRING
        },
        date_of_birth:{
            type:DataTypes.DATEONLY
        },
        score:{
            type: DataTypes.INTEGER,
            validate:{
                isInt:{
                    msg: "Score must be an Integer."
                }
            }
        }
    })

    return user
}