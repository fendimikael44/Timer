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
import { fetchSettings, fetchThemes } from '../actions/setting.js'
import { ListItem } from 'react-native-material-ui';

class ListMenu extends React.Component {
	_onPress = (id) => {
		this.props.onPressItem(id);
	}

	render() {
		const { id, title, desc, selected } = this.props
		
		return (			
			<TouchableHighlight
				onPress={this._onPress.bind(this, id)}
				underlayColor='#dddddd'>
				<View>
					<View style={styles.rowContainer}>			
						<View style={styles.textContainer}>
							<Text style={styles.title}>{title}</Text>
							<Text style={styles.desc}
							numberOfLines={1}>{desc}</Text>	
							<Text style={styles.soundDesc}>{selected}</Text>
						</View>
					</View>
				<View style={styles.separator}/>
				</View>
			</TouchableHighlight>
		);
	}
}

class SettingPage extends Component {
	constructor(props) {
		super(props);
		// const data = this.props.navigation.state.params;
		const { setting } = props
		this.state = { 
			settingList: setting.settingList,
			themeList: setting.themeList,
			theme: setting.theme,
			path: setting.path,
			// themeColor: setting.theme.color,
			// pathColor: setting.pathColor,
			// backwardTimer: data.configData.backwardTimer,
			// textColor: data.configData.textColor,
			// sound: '',
		}
	}

	componentDidMount() {
		this.props.getSettingList()
		// this.props.getThemeList()
    }
	
	_keyExtractor = (item, index) => item.id;
	
	_renderItem = ({item, index}) => (
		<ListMenu
			id={item.id}
			title={item.title}
			desc={item.desc}
			// selected={this.state[item.type].name}
			selected={this.props.setting[item.type].name}
			index={index}
			onPressItem={this._onPressItem}
		/>
	);
	
	
	_onPressItem = (id) => {	
		const { navigate } = this.props.navigation;

		if(id == "1"){
			navigate('ThemeSetting');
		}
		else if(id == "2"){
			navigate('ColorSetting');
		}
	}
	
	render() {	
		const { setting } = this.props
		const settingList = setting.settingList
		// const themeList = setting.themeList
		// const FlatListMenu = [
		// 		{id: '1', title: 'Custom Theme', desc: 'Change Theme', selected: setting.themeColor},
		// 		{id: '2', title: 'Custom Timer Color', desc: 'Change Timer Color', selected: setting.pathColor},
		// 		{key: '3', title: 'Custom Remaining Timer Color', desc: 'Change Remaining Timer Color', selected: data.configData.backwardTimer},
		// 		{key: '4', title: 'Custom Notification', desc: 'Play a custom notification when the timer finishes', selected: data.configData.sound},
		// ]

		return (	
			settingList.length > 0 &&
			<View style={styles.SettingContainer}>
				<FlatList 
					data={settingList}
					// extraData={this.state}
					extraData={setting}
					keyExtractor={this._keyExtractor}
					renderItem={this._renderItem}
				/>
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
		padding: 5,
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
		padding: 5
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

const mapDispatchToProps = (dispatch) => {
    return {
		getSettingList: () => dispatch(fetchSettings()),
		getThemeList: () => dispatch(fetchThemes()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingPage)
