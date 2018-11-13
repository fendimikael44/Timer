import React from 'react'
import { Toolbar, IconToggle } from 'react-native-material-ui';

const AppBar = (props) =>{
    return(
        <Toolbar
            // leftElement="arrow-back"
            centerElement="Timer"
            rightElement={
                <IconToggle 
                    name="settings"
                    onPress={() => props.navigation.navigate('Settings')}
                    color="white"
                />
            }
        />
    )
}

export default AppBar