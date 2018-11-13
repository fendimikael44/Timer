import React from 'react'
import { Toolbar, IconToggle } from 'react-native-material-ui';
import { connect } from 'react-redux'

const AppBar = (props) =>{
    const currentRoute = props.navigation.state.routeName
    const { leftElement, centerElement, rightElement, navigation } = props

    return(
        <Toolbar
            leftElement={leftElement}
            onLeftElementPress= { () => navigation.goBack() }
            centerElement={centerElement}
            rightElement={
                rightElement &&
                (<IconToggle 
                    name="settings"
                    onPress={() => navigation.navigate('Settings')}
                    color="white"
                />)
            }
        />
    )
}

const mapStateToProps = (state) => {
	return {
		nav: state.nav,
	}
}

export default AppBar
// export default connect(mapStateToProps)(AppBar)