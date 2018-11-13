'use strict';

import React, { Component } from 'react';
import {
	Alert,
	StyleSheet,
	View,
	TextInput,
	Button,
	TouchableOpacity,
	Image,
	Text
} from 'react-native';
import Clock from '../components/Clock';
import { connect } from 'react-redux'

class MainPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// themeColor: '#FFFFFF',
			clockFrame: '#212121',
			// timerColor: '#133C99',
			backwardColor: '#C0C0C0',
			textColor: '#000000',
			soundAlert: require('../sound/alarm.mp3'),
			soundFile: 'alarm.mp3',
		};
	}
	
	render() {	
		const { setting } = this.props

		return (
			<View style={{flex:1, backgroundColor:setting.themeColor}}>		
				<Clock 
					clockColor={setting.themeColor}
					clockFrame={this.state.clockFrame}
					timerColor={setting.pathColor}
					backwardColor={this.state.backwardColor}
					textColor={this.state.textColor}
					soundAlert={this.state.soundAlert}
				/>	
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: 20,
		borderColor: 'gray', borderWidth: 1,
		backgroundColor: 'red'
	},
	header: {
		flex:1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignSelf: 'stretch',
		borderColor: 'gray', borderWidth: 1,
		height: 50,	
		position:'absolute', 
		left:0, 
		right:0, 
		top: 0
	},
	title: {	
		alignItems: 'center',
		paddingVertical: 10,
		paddingLeft: 150,
		fontSize: 20,
		width: '80%'
	},
	button: {
		paddingVertical: 10,
		paddingHorizontal: 10,
		alignSelf: 'flex-end',
		alignItems: 'flex-end',
		width: '20%'
	},
	icon: {
		width: 30,
		height: 30
	}
});

const mapStateToProps = (state) => {
	return {
		setting: state.setting,
	}
}

export default connect(mapStateToProps)(MainPage)