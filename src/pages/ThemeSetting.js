import React, { Component } from 'react'
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	Alert,
	TouchableHighlight,
	Button,
} from 'react-native';
import { Checkbox } from 'react-native-material-ui'
import { connect } from 'react-redux'
import { changeThemeColor } from '../actions/setting'

class ListTheme extends React.PureComponent {
	_onPress = () => {
		this.props.onPressItem(this.props.color);
	}

	render() {
        const { id, name, color, selected } = this.props
        // const checked = selected == color; 
		return (
			<TouchableHighlight
				onPress={this._onPress}
				underlayColor='#dddddd' >
				<View>
					<View style={styles.rowContainer}>			
                        <Checkbox label={name} value={color} checked={selected} onCheck={this._onPress} />
					</View>
					<View style={styles.separator}/>
				</View>
			</TouchableHighlight>
		);
	}
}

class ThemeSetting extends Component {
	constructor(props) {
		super(props);

		this.state = { 
			theme: this.props.setting.themeColor,
		}
	}
	
	_keyExtractor = (item, index) => item.id;
	
	_renderItem = ({item, index}) => (
		<ListTheme
            id={item.id}
            onPressItem={this._onPressItem}
            selected={this.state.theme == item.color}
            name={item.name}
            color={item.color}
		/>
	);
	
	_onPressItem = (color) => {
        this.setState((state) => {
            return {theme: color}
        })
        
		return this.props.changeTheme(color)        
	}
	
	render() {
        const data = [
                    {id: '1', name: 'Light Theme', color: '#FFFFFF'},
                    {id: '2', name: 'Dark Theme', color: '#000000'},
                ]

		return (	
			<View style={styles.SettingContainer}>
				<FlatList 
					data={data}
                    extraData={this.state}
					keyExtractor={this._keyExtractor}
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

export default connect(mapStateToProps, mapDispatchToProps)(ThemeSetting)