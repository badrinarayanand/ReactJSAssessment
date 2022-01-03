const Sequelize = require('sequelize');
var sequelize=require('../connection');

var skill=sequelize.define('skills',{
    skillid:{
        type: Sequelize.INTEGER,
        primaryKey:true
    },
    name:{
        type: Sequelize.STRING,
        allowNull:false
    }
  },{
        //don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,

    // If don't want createdAt
    createdAt: false,

    // If don't want updatedAt
    updatedAt: false
  }

);

skill.sync({force: false}).then(() => {
  console.log("Skills table Synched!!!");
});

module.exports = skill