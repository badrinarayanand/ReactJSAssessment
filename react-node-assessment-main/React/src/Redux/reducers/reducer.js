import { GET_EMPLOYEES_SUCCESS, GET_SOFTLOCK_SUCCESS, REQUEST_LOCK_SUCCESS } from "../Actions/action";

export const loginReducer=(state={username:"NA",token:"NA",usertype:"NA",message:""},action)=>{
    switch(action.type){
        case "LOGIN_SUCCESS":
            console.log(action.data)
            return {...action.data,message:"Login Successful"};
        case "LOGIN_FAILURE":
            console.log(action)
            return {...state,message:"Login Credentials incorrect"}
        default:
            return state
    }
}

export const managerReducer=(state={ employees: [] }, action)=>{
    switch(action.type){
        case GET_EMPLOYEES_SUCCESS:
            console.log(action.data)
            return {...state, employees: action.data}
        case "EMPLOYEE_FETCH_FAILURE":
            console.log(action)
            return {...state,message:"No Employees"}
        default:
            return state
    }
}

export const wfmManagerReducer=(state={ softlocks: [] }, action)=>{
    switch(action.type){
        case GET_SOFTLOCK_SUCCESS:
            console.log(action.data)
            return {...state, softlocks: action.data}
        default:
            return state
    }
}

export const requestReducer=(state={employee_id: "NA"}, action)=>{
    switch(action.type){
        case REQUEST_LOCK_SUCCESS:
            console.log(action.data)
            return {...state, message: action.data}
        default:
            return state
    }
}
