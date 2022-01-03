import axios from 'axios'
import {call,put} from 'redux-saga/effects'
import { GET_EMPLOYEES_SUCCESS, GET_SOFTLOCK_SUCCESS, REQUEST_LOCK_SUCCESS } from '../Actions/action'

export function* loginHandler(action){
    try{
 let  result = yield call(axios.post,"http://localhost:8000/users/signin",action.data)
 console.log(result.data)

 localStorage.setItem("username",result.data.username)
 localStorage.setItem("usertype",result.data.usertype)
 localStorage.setItem("token",result.data.token)

 yield put({type:"LOGIN_SUCCESS",data: 
  {
     username:result.data.username,
     usertype:result.data.usertype,
     token: result.data.token
  }})
    } 
  catch(e){
      yield put({type:"LOGIN_FAILURE"})
  }
 
}

export function* managerHandler(req){
  console.log("Fetching Employees")
  try{
    const uri = 'http://localhost:8000/employees/all';
    const result = yield call(axios.post, uri, {"manager": req.manager})
    console.log(result.data.employees)

    yield put({type: GET_EMPLOYEES_SUCCESS, data: result.data.employees})
  } 
  catch(e){
      yield put({type:"EMPLOYEE_FETCH_FAILURE"})
  }
}

export function* wfmManagerHandler(req){
  console.log("Fetching Softlock Requests")
  try{
    const uri = 'http://localhost:8000/employees/requests';
    const result = yield call(axios.post, uri, {"wfm_manager": req.wfm_manager})
    console.log(result.data.softlock_reqs)

    yield put({type: GET_SOFTLOCK_SUCCESS, data: result.data.softlock_reqs})
  } 
  catch(e){
      yield put({type:"SOFTLOCK_FETCH_FAILURE"})
  }
}

export function* requestLockHandler(req){
  console.log("Update Softlock Requests")
  try{
    const uri = 'http://localhost:8000/employees/manager_request';
    const result = yield call(axios.put, uri, {"employee_id": req.employee_id, "manager": req.manager, "message": req.message})
    console.log(result.data)

    yield put({type: REQUEST_LOCK_SUCCESS, data: result.data})
  } 
  catch(e){
      yield put({type:"REQUEST_LOCK_FAILURE"})
  }
}