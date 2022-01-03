const Sequelize = require('sequelize');
var sequelize=require('../connection');

var skillmap=sequelize.define('skillmap', {
    employee_id: {
        type: Sequelize.INTEGER,
        allowNull:false
    },
    skillid:{
        type: Sequelize.INTEGER,
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

skillmap.sync({force: false}).then(() => {   
  console.log("SkillMap table Synched!!!");
});


module.exports = skillmap