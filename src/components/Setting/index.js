import React from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'

const _showSetting = () => {
    this.props.navigation.navigate('Settings')
}

const SettingMenu = (props) => {
    return(
        <TouchableOpacity onPress = { () => props.navigation.navigate('Settings') }>
            <Image style={styles.icon} source={require ('../../img/gear.png')} />
        </TouchableOpacity>	
    )
}

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30
    }
});

export default SettingMenu