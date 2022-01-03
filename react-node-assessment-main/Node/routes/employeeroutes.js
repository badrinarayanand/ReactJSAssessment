var express=require("express")
var route = express.Router();
var model = require('../orm/model')
const jwt=require("jsonwebtoken");

// Manager Employees - Not Requested
route.post("/all", async function(request,response){
   const {manager}=request.body 
   try{
         const employees = await model.employee.findAll(
            {
               attributes: ['employee_id', 'name', 'status', 'experience', 'manager'],
               where: {manager: manager, lockstatus: 'not_requested'},
               include: [{
                  model: model.skill,
                  through: {
                     attributes: ['skillid', 'employee_id']
                  }
               }]
            })
         
         if(employees[0]){
            response.json({
               employees
            })
         } else {
            response.status(204).send("No Data Available")
         }

   }
   catch(e)
   {
      console.log(e)
         response.status(500)
   }

})

route.post("/requests", async function(request,response){
   const {wfm_manager}=request.body 
   try{
         let managers = new Array();
         await model.employee.findAll({
            attributes: ['manager'],
            where: {wfm_manager: wfm_manager},
            group: ['manager']
         }).then(function(employees){
            
            for (var i=0; i < employees.length; i++){
               let k = employees[i].dataValues
               managers.push(k.manager)
            }

         })
         
         let softlock_reqs = await model.softlock.findAll({
            attributes: ['employee_id', 'manager', 'status', 'reqdate', 'lockid', 'requestmessage'],
            where: {manager: managers }
         })

         if(softlock_reqs[0]){
            response.json({
               softlock_reqs
            })
         } else {
            response.status(204).send("No Data Available")
         }

   }
   catch(e)
   {
        console.log(e)
        response.status(500)
   }

})

route.put("/manager_request", async function(request, response){
    let {employee_id, manager, message} = request.body
    
    try{  
        var today = new Date()
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;

        // Create Entry in Softlock table
        const softlock = await model.softlock.create({
            employee_id: employee_id,
            manager: manager,
            reqdate: today,
            status: 'awaiting_confirmation',
            lastupdated: today,
            requestmessage: message
        }).then(async function(){
            const emp_status = await model.employee.update(
                {lockstatus: 'request_waiting'},
                {where: {employee_id: employee_id}}
            ).then(async function(){
                response.status(201).send("Request Created Successfully.")
            }).catch(function (err) {
                response.status(500).send("Request Not created.")
            })
        }).catch(function (err) {
            response.status(500).send("Request Not created.")
        });
  
    }
    catch(e)
    {
         console.log(e)
         response.status(500)
    }
})

route.put("/wfm_manager_response", async function(request, response){
    let {lockid, wfm_status, lockstatus, employee_id, message} = request.body
    
    try{  
        var today = new Date()
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;

        // Create Entry in Softlock table
        const softlock = await model.softlock.update(
            {
                managerstatus: wfm_status,
                mgrstatuscomment: message,
                mgrlastupdate: today,
                status: wfm_status
            },
            {where: {lockid: lockid}}
        ).then(async function(){
            const emp_status = await model.employee.update(
                {lockstatus: lockstatus},
                {where: {employee_id: employee_id}}
            ).then(async function(){
                response.status(201).send("Status Updated Successfully.")
            }).catch(function (err) {
                response.status(500).send("Status Not updated.")
            })
        }).catch(function (err) {
            response.status(500).send("Status Not updated.")
        })
  
    }
    catch(e)
    {
         console.log(e)
         response.status(500)
    }
})

module.exports=  route