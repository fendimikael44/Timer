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
	Button,
	CheckBox,
	NativeModules,
	Image
} from 'react-native';

const FilePicker = NativeModules.FileChooser;


class ListSound extends React.PureComponent {
	_onPress = (title) => {
		this.props.onPressItem(title);
	}

	render() {
		const item = this.props.item;
		const title = item.title;
		const checked = item.key == "1" ? true : false;
		const action = item.action == 'add' ? 
						<Image style={styles.icon} source={require ('../img/plus.png')} /> : 
							<CheckBox 
								onChange={this._onPress.bind(this, title)}
								value={checked} 
							/>;
		
		
		return (
			<TouchableHighlight
				onPress={this._onPress.bind(this, title)}
				underlayColor='#dddddd' >
				<View>
					<View style={styles.rowContainer}>									
						<View style={styles.textContainer}>
							<View style={styles.checkBox}>	
								{action}
							</View>
						</View>
						<View style={styles.textContainer}>
							<Text style={styles.title}>{title}</Text>
						</View>
					</View>
					<View style={styles.separator}/>
				</View>
			</TouchableHighlight>
		);
	}
}

export default class NotifSetting extends Component {
	constructor(props) {
		super(props);
		const data = this.props.navigation.state.params;	
		this.state = { 
			Sound: [
				{key: '1', title: 'Kalimba.mp3', desc: 'Change Background Color', action: 'choose'},
				{key: '2', title: 'Add from phone', desc: 'Change Timer Color', action: 'add'},			
			],		
			selectedSound: '',
		}
	}
	
	// static navigationOptions = {
	// 	title: 'Sound Picker',
	// };
	
	_renderItem = ({item, index}) => (
		<ListSound
			item={item}
			index={index}
			selected={this.state.selectedSound}
			onPressItem={this._onPressItem}
		/>
	);
	
	_onPressItem = (title) => {
		var options = {
			title: 'Audio Picker',
			mimeType: 'audio/*',
			customButtons: [
				{name: 'fb', title: 'Choose Photo from Facebook'},
			],
			storageOptions: {
				skipBackup: true,
				path: 'images'
			}
		};	
		
		FilePicker.show(options, (response) => {
			console.log('Response = ' + response);

			if (response.didCancel) {
				console.log('User cancelled file chooser');  
			}
			else if (response.error) {
				console.log('FileChooserManager Error: ', response.error);
			}
			else {
				console.log(response);
				this.setState({
					file: response
				});
			}
		});
	}
	
	render() {	
		return (	
			<View style={styles.SettingContainer}>
				<FlatList 
					data={this.state.Sound}
					renderItem={this._renderItem}
				/>	
			</View>
		);
		
	}
}

const styles = StyleSheet.create({
	SettingContainer : {
		backgroundColor: '#fff',
		justifyContent: 'center',
		flex:1,	
	},	
	textContainer: {
		justifyContent: 'center',
		margin: 10,
		alignSelf: 'flex-end',
	},
	separator: {
		height: 1,
		backgroundColor: '#dddddd'
	},
	title: {
		fontSize: 15,
		//fontWeight: 'bold',
		color: '#000'
	},
	checkBox: {
		//marginLeft:20
	},
	rowContainer: {
		flexDirection: 'row',
		padding: 5,
		flex:1,
	},
	icon: {
		width: 30,
		height: 30
	}
});
