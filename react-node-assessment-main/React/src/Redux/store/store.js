import {combineReducers,applyMiddleware,createStore} from 'redux'
import createSagaMiddleware from 'redux-saga'
import { loginReducer, managerReducer, wfmManagerReducer, requestReducer } from '../reducers/reducer'
import { rootSaga } from '../saga/root'

const appData = combineReducers({
    loginData: loginReducer,
    managerReducer,
    wfmManagerReducer,
    requestReducer
})

const sagaMiddleware=createSagaMiddleware()
export const store=createStore(appData,applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)

