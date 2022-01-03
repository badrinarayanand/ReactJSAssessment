const Sequelize = require('sequelize');
var sequelize=require('../connection');

var softlock=sequelize.define('softlock',{
    employee_id:{
        type: Sequelize.INTEGER,
        allowNull:true
    },
    manager:{
        type: Sequelize.STRING,
        allowNull:true
    },
    reqdate:{
        type: Sequelize.DATE,
        allowNull:true
    },
    status:{
        type: Sequelize.STRING,
        allowNull:true
    },
    lastupdated:{
        type: Sequelize.DATE,
        allowNull:true
    },
    lockid:{
        type: Sequelize.INTEGER,
        allowNull:false,
        primaryKey: true,
        autoIncrement: true
    },
    lockstatus:{
        type: Sequelize.STRING,
        allowNull:true
    },
    requestmessage:{
        type: Sequelize.TEXT,
        allowNull:true
    },
    wfmremark:{
        type: Sequelize.TEXT,
        allowNull:true
    },
    managerstatus:{
        type: Sequelize.STRING,
        allowNull:true
    },
    mgrstatuscomment:{
        type: Sequelize.TEXT,
        allowNull:true
    },
    mgrlastupdate:{
        type: Sequelize.DATE,
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

softlock.sync({force: false}).then(() => {
  console.log("softlock table Synched!!!");
});

//softlock.removeAttribute('id')

module.exports = softlock