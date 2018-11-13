export const changeThemeColor = (newThemeColor) => {
    return {
        type: 'THEME_COLOR_CHANGE',
        payload: {
            newThemeColor: newThemeColor
        }
    }
}

export const changePathColor = (newPathColor) => {
    return {
        type: 'PATH_COLOR_CHANGE',
        payload: {
            newPathColor: newPathColor
        }
    }
}