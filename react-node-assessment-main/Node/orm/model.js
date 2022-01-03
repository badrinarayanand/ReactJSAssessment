const Sequelize = require('sequelize');
const user = require('../orm/Models/User')
var employee = require('../orm/Models/Employee')
var softlock = require('../orm/Models/Softlock')
const skill = require('../orm/Models/Skill')
const skillmap = require('../orm/Models/Skillmap')

//employee.hasOne(softlock)
//softlock.belongsTo(employee, {foreignKey: "employee_id"})

employee.hasMany(skillmap)
skillmap.belongsTo(employee, {foreignKey: "employee_id"})

skill.hasMany(skillmap)
skillmap.belongsTo(skill, {foreignKey: "skillid"})

employee.belongsToMany(skill, {
  through: "skillmap",
  foreignKey: "employee_id"
})

skill.belongsToMany(employee, {
  through: "skillmap",
  foreignKey: "skillid"
})

module.exports={user:user, employee:employee, softlock: softlock, skill: skill, skillmap: skillmap};