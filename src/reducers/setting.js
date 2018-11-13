const initalState = {
    themeColor: '#FFFFFF',
    clockFrame: '#000000',
    pathColor: '#2196f3',
    backwardColor: '#C0C0C0',
    textColor: '#000000',
    soundAlert: require('../sound/alarm.mp3'),
    soundFile: 'alarm.mp3',
}

const settingReducer = (state = initalState, action) => {
    switch(action.type){
        case 'THEME_COLOR_CHANGE': 
            return {
                ...state, 
                themeColor: action.payload.newThemeColor
            }
        case 'PATH_COLOR_CHANGE': 
            return {
                ...state, 
                pathColor: action.payload.newPathColor
            }
        default:
            return state
    }
}

export default settingReducer