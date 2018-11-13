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
	CheckBox
} from 'react-native';
import { connect } from 'react-redux'
import { changeThemeColor } from '../actions/setting'

class ListColor extends React.PureComponent {
	_onPress = (key) => {
		this.props.onPressItem(key);
	}

	render() {
		const item = this.props.item;
		const name = item.name;
		const color = item.color;
		const checked = this.props.selected == color ? true : false;
	
		return (
			<TouchableHighlight
				onPress={this._onPress.bind(this, color)}
				underlayColor='#dddddd'
				//style={{backgroundColor: color}}
				>
				<View>
					<View style={styles.rowContainer}>			
						
						<View style={styles.textContainer}>
							<Text style={[styles.desc, {backgroundColor:color}]}></Text>
						</View>
						<View style={styles.textContainer}>
							<View style={styles.title}>	
								<CheckBox 
									onChange={this._onPress.bind(this, color)}
									value={checked} 
								/>
							</View>
						</View>
					</View>
					<View style={styles.separator}/>
				</View>
			</TouchableHighlight>
		);
	}
}

class ColorSetting extends Component {
	constructor(props) {
		super(props);
		// const data = this.props.navigation.state.params;
		this.state = { 
			Color: [
					{key: '#FFFFFF', name: 'White', color: '#FFFFFF'},
					{key: '#C0C0C0', name: 'Silver', color: '#C0C0C0'},
					{key: '#808080', name: 'Gray', color: '#808080'},
					{key: '#000000', name: 'Black', color: '#000000'},
					// {key: '#FF0000', name: 'Red', color: '#FF0000'},			
					// {key: '#ff4000', name: 'Red', color: '#ff4000'},
					// {key: '#ff8000', name: 'Red', color: '#ff8000'},
					// {key: '#ffbf00', name: 'Red', color: '#ffbf00'},
					// {key: '#bfff00', name: 'Red', color: '#bfff00'},
					// {key: '#ffff00', name: 'Red', color: '#ffff00'},
					// {key: '#80ff00', name: 'Red', color: '#80ff00'},
					// {key: '#40ff00', name: 'Red', color: '#40ff00'},
					// {key: '#00ff00', name: 'Red', color: '#00ff00'},
					// {key: '#00ff40', name: 'Red', color: '#00ff40'},
					// {key: '#00ff80', name: 'Red', color: '#00ff80'},
					// {key: '#00ffbf', name: 'Red', color: '#00ffbf'},
					// {key: '#00ffff', name: 'Red', color: '#00ffff'},
					// {key: '#00bfff', name: 'Red', color: '#00bfff'},
					// {key: '#0080ff', name: 'Red', color: '#0080ff'},			
					// {key: '#0040ff', name: 'Red', color: '#0040ff'},
					// {key: '#0000ff', name: 'Red', color: '#0000ff'},
					// {key: '#4000ff', name: 'Red', color: '#4000ff'},
					// {key: '#133C99', name: 'Red', color: '#133C99'},
					// {key: '#8000ff', name: 'Red', color: '#8000ff'},
					// {key: '#bf00ff', name: 'Red', color: '#bf00ff'},
					// {key: '#ff00ff', name: 'Red', color: '#ff00ff'},			
					// {key: '#ff00bf', name: 'Red', color: '#ff00bf'},
					// {key: '#ff0080', name: 'Red', color: '#ff0080'},
					// {key: '#ff0040', name: 'Red', color: '#ff0040'},
					// {key: '#ff0000', name: 'Red', color: '#ff0000'},
			],
			// selectedColor: data.selected,
			theme: this.props.setting.themeColor
		}
	}
	
	static navigationOptions = {
		title: 'Color List',
	};
	
	_keyExtractor = (item, index) => index;
	
	_renderItem = ({item, index}) => (
		<ListColor
			item={item}
			index={index}
			selected={this.state.theme}
			onPressItem={this._onPressItem}
		/>
	);
	
	_onPressItem = (color) => {
		// this.props.navigation.goBack();
		// this.props.navigation.state.params.onGoBack(color);
		console.log(color)
		return this.props.changeTheme(color)
	}
	
	render() {
		//const { params } = this.state.Color;
		return (	
			<View style={styles.SettingContainer}>
				<FlatList 
					data={this.state.Color}
					//keyExtractor={this._keyExtractor}
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
		marginLeft:20
	},
	desc: {	
		//backgroundColor: 'red',
		width: 250,
		height: 30,
		borderColor: '#000',
		borderWidth: 2,
	},
	rowContainer: {
		flexDirection: 'row',
		padding: 5,
		flex:1,
	},
});

const mapStateToProps = (state) => {
	return {
		setting: state.setting,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		changeTheme: (newTheme) => dispatch(changeThemeColor(newTheme))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ColorSetting)
