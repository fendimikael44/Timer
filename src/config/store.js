import { createStore, combineReducers, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import settingReducer from '../reducers/setting'
import navReducer from '../reducers/nav'

const reducers = combineReducers({
    setting: settingReducer,
    // nav: navReducer,
})

const middleware = applyMiddleware(logger, thunk)

export default createStore(reducers, middleware)