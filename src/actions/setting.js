import axios from 'axios'
import { baseUrl } from '../config/api.js'

export const changeThemeColor = (newTheme) => {
    return {
        type: 'THEME_COLOR_CHANGE',
        payload: {
            newTheme: newTheme
        }
    }
}

export const changePathColor = (newPath) => {
    return {
        type: 'PATH_COLOR_CHANGE',
        payload: {
            newPath: newPath
        }
    }
}

export const fetchSettings = () => {
    return (dispatch) => {
        axios
        .get(baseUrl + "setting")
        .then(response => {
            const settings = response.data

            dispatch({
                type: 'LIST_SETTING',
                payload: {
                    settingList: settings,
                }
            })
        })
        .catch(error => {
            // dispatch({
            //     type: 'LIST_SETTING',
            //     payload: {
            //         settingList: {error: error},
            //     }
            // })
            console.log(error)
        })
    }
}

export const fetchThemes = () => {
    return (dispatch) => {
        axios
        .get(baseUrl + "setting/theme")
        .then(response => {
            const themes = response.data

            dispatch({
                type: 'LIST_THEME',
                payload: {
                    themeList: themes,
                }
            })
        })
        .catch(error => {
            // dispatch({
            //     type: 'LIST_THEME',
            //     payload: {
            //         themeList: {error: error},
            //     }
            // })
            console.log(error)
        })
    }
}

export const fetchPaths = () => {
    return (dispatch) => {
        axios
        .get(baseUrl + "setting/path")
        .then(response => {
            const paths = response.data

            dispatch({
                type: 'LIST_PATH',
                payload: {
                    pathList: paths,
                }
            })
        })
        .catch(error => {
            // dispatch({
            //     type: 'LIST_PATH',
            //     payload: {
            //         pathList: {error: error},
            //     }
            // })
            console.log(error)
        })
    }
}