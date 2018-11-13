/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';
import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	Alert,
	TouchableHighlight,
	Button
} from 'react-native';
import { connect } from 'react-redux'
import { ListItem } from 'react-native-material-ui';

class ListMenu extends React.Component {
	_onPress = (key) => {
		this.props.onPressItem(key);
	}

	render() {
		const item = this.props.item;
		const title = item.title;
		const desc = item.desc;
		const color = item.selected;
		const colorSelected = item.key == '4' ? 
							<Text style={styles.soundDesc}>{item.selected}</Text> : 
							<Text style={[styles.colorDesc, {backgroundColor:color}]}></Text>
		
		return (			
			<TouchableHighlight
				onPress={this._onPress.bind(this, item.key)}
				underlayColor='#dddddd'>
				<View>
					<View style={styles.rowContainer}>			
						<View style={styles.textContainer}>
							<Text style={styles.title}>{title}</Text>
							<Text style={styles.desc}
							numberOfLines={1}>{desc}</Text>	
							{colorSelected}
						</View>
					</View>
				<View style={styles.separator}/>
				</View>
			</TouchableHighlight>
		);
		// return (	
		// 	<TouchableHighlight
		// 		onPress={this._onPress.bind(this, item.key)}
		// 		underlayColor='#dddddd'>		
		// 		<View>
		// 			<ListItem
		// 				divider
		// 				centerElement={{
		// 					primaryText: {title},
		// 					secondaryText: {desc}
		// 				}}
		// 				onPress={this._onPress.bind(this, item.key)}	
		// 			/>
		// 		</View>
		// 	</TouchableHighlight>
		// );
	}
}

class SettingPage extends Component {
	constructor(props) {
		super(props);
		// const data = this.props.navigation.state.params;
		const { setting } = this.props
		this.state = { 
			FlatListMenu: [
				{key: '1', title: 'Custom Background Color', desc: 'Change Background Color', selected: setting.themeColor},
				{key: '2', title: 'Custom Timer Color', desc: 'Change Timer Color', selected: setting.pathColor},
				// {key: '3', title: 'Custom Remaining Timer Color', desc: 'Change Remaining Timer Color', selected: data.configData.backwardTimer},
				// {key: '4', title: 'Custom Notification', desc: 'Play a custom notification when the timer finishes', selected: data.configData.sound},
			],
			// theme: data.configData.theme,
			// timer: data.configData.timer,
			// backwardTimer: data.configData.backwardTimer,
			// textColor: data.configData.textColor,
			// sound: '',
		}
	}
	
	// static navigationOptions = {
	// 	title: 'Setting',
	// };
	
	_keyExtractor = (item, index) => index;
	
	_renderItem = ({item, index}) => (
		<ListMenu
			item={item}
			index={index}
			onPressItem={this._onPressItem}
		/>
	);
	
	// changeTheme = (color) => {
	// 	this.setState({
	// 		theme: color
	// 	})
	// }
	
	// changeTimer = (color) => {
	// 	this.setState({
	// 		timer: color
	// 	})
	// }
	
	// changeRemainingTimer = (color) => {
	// 	this.setState({
	// 		backwardTimer: color
	// 	})
	// }
	
	// changeNotification = (sound) => {
	// 	this.setState({
	// 		sound: sound
	// 	})
	// }
	
	_onPressItem = (key) => {	
		// const { params } = this.props.navigation;

		if(key == "1"){
			this.props.navigation.navigate('ColorSetting');
		}
		else if(key == "2"){
			this.props.navigation.navigate('ColorSetting');
		}
		// else if(key == "3"){
		// 	this.props.navigation.navigate('ColorSetting', {onGoBack: this.changeRemainingTimer, selected: this.state.backwardTimer});
		// }
		// else if(key == "4"){
		// 	this.props.navigation.navigate('NotifSetting', {onGoBack: this.chageNotification, selected: this.state.sound})
		// }
	}
	
	// _apply = () => {	
	// 	var objSetting = {};
		
	// 	if(this.state.theme != ''){
	// 		objSetting.themeColor = this.state.theme;	
	// 		if(this.state.theme == '#000000'){
	// 			objSetting.textColor = '#fff';
	// 			objSetting.clockFrame = '#fff';
	// 		}
	// 		else{
	// 			objSetting.textColor = '#000000';
	// 			objSetting.clockFrame = '#000000';
	// 		}
	// 	}
	// 	if(this.state.timer != ''){
	// 		objSetting.timerColor = this.state.timer;
	// 	}
	// 	if(this.state.backwardTimer != ''){
	// 		objSetting.backwardColor = this.state.backwardTimer;	
	// 	}
	// 	objSetting.soundFile = this.state.sound;
	// 	objSetting.soundAlert = "require('./sound/' + this.state.sound)";
	// 	//Alert.alert(objSetting.soundAlert);
	// 	this.props.navigation.goBack();
		
	// 	this.props.navigation.state.params.onGoBack(objSetting);
	// }
	
	render() {			
		return (	
			<View style={styles.SettingContainer}>
				<FlatList 
					data={this.state.FlatListMenu}
					//keyExtractor={this._keyExtractor}
					renderItem={this._renderItem}
				/>
				<View style={styles.flowRight}>
				{/* <Button 
					onPress={this._apply}
					color='#48BBEC'
					title='Apply' /> */}
				</View>
			</View>
		);
		
	}
}

const styles = StyleSheet.create({
	SettingContainer :{
		backgroundColor: '#fff',
		justifyContent: 'center',
		flex:1,	
	},
	item: {
		padding: 10,
		fontSize: 18,
		height: 44,
	},
	textContainer: {
		justifyContent: 'center',
		flex:1,
		margin: 10
	},
	separator: {
		height: 1,
		backgroundColor: '#dddddd'
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		//color: '#48BBEC'
		color: '#000'
	},
	desc: {
		fontSize: 11,
		color: '#656565'
	},
	colorDesc: {
		height: 10,
		borderColor: '#000',
		borderWidth: 2,
	},
	soundDesc: {
		fontSize: 13,
		color: '#48BBEC'
	},
	rowContainer: {
		flexDirection: 'row',
		padding: 10
	},
	flowRight: {
		marginBottom: 10,
		flexDirection: 'row',		
		alignSelf: 'center',
	},
});

const mapStateToProps = (state) => {
	return {
		setting: state.setting,
	}
}

export default connect(mapStateToProps)(SettingPage)
