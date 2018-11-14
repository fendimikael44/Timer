const initalState = {
    settingList: [],
    themeList: [],
    pathList: [],
    // themeName: 'Light Theme',
    // themeColor: '#FFFFFF',
    theme: {
        id: '1',
        name: 'Light Theme',
        color: '#FFFFFF',
    },
    path: {
        id: '1',
        name: 'Primary',
        color: '#2196f3',
    },
    clockFrame: '#000000',
    pathColor: '#2196f3',
    backwardColor: '#C0C0C0',
    textColor: '#000000',
    soundAlert: require('../sound/alarm.mp3'),
    soundFile: 'alarm.mp3',
}

const settingReducer = (state = initalState, action) => {
    switch(action.type){
        case 'LIST_SETTING':
            return {
                ...state,
                settingList: action.payload.settingList
            }
        case 'LIST_THEME':
            return {
                ...state,
                themeList: action.payload.themeList
            }
        case 'LIST_PATH':
            return {
                ...state,
                pathList: action.payload.pathList
            }
        case 'THEME_COLOR_CHANGE': 
            return {
                ...state, 
                theme: action.payload.newTheme,
            }
        case 'PATH_COLOR_CHANGE': 
            return {
                ...state, 
                path: action.payload.newPath
            }
        default:
            return state
    }
}

export default settingReducer