import { createStore, combineReducers, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import settingReducer from '../reducers/setting'

const reducers = combineReducers({
    setting: settingReducer,
})

const middleware = applyMiddleware(logger, thunk)

export default createStore(reducers, middleware)