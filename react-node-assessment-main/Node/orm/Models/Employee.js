const Sequelize = require('sequelize');
var sequelize=require('../connection');

var employee=sequelize.define('employees',{
    employee_id:{
        type: Sequelize.INTEGER,
        primaryKey:true
    },
    name:{
        type: Sequelize.STRING,
        allowNull:false
    },
    status:{
        type: Sequelize.STRING,
        allowNull:false
    },
    manager:{
        type: Sequelize.STRING,
        allowNull:true
    },
    wfm_manager:{
        type: Sequelize.STRING,
        allowNull:true
    },
    email:{
        type: Sequelize.TEXT,
        allowNull:true
    },
    lockstatus:{
        type: Sequelize.STRING,
        allowNull:true
    },
    experience:{
        type: Sequelize.DECIMAL,
      allowNull:true
    },
    profile_id:{
        type: Sequelize.INTEGER,
        allowNull:true
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

employee.sync({force: false}).then(() => {  
  console.log("Employee table Synched!!!");
});

module.exports = employee