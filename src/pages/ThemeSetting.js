import React, { Component } from 'react'
import {
	StyleSheet,
	View,
	FlatList,
	TouchableHighlight,
} from 'react-native';
import { Checkbox } from 'react-native-material-ui'
import { connect } from 'react-redux'
import { changeThemeColor, fetchThemes } from '../actions/setting'

class ListTheme extends React.PureComponent {
	_onPress = () => {
		const { id, name, color } = this.props
		this.props.onPressItem({id, name, color});
	}

	render() {
        const { id, name, color, selected } = this.props

		return (
			<TouchableHighlight
				onPress={ this._onPress }
				underlayColor='#dddddd' >
				<View>
					<View style={styles.rowContainer}>			
						<Checkbox label={name} value={color} checked={selected} 
							onCheck={ this._onPress } />
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
			theme: this.props.setting.theme.color,
		}
	}

	componentDidMount() {
		this.props.getThemeList()
    }
	
	_keyExtractor = (item, index) => item.id
	
	_renderItem = ({item, index}) => (
		<ListTheme
            id={item.id}
            onPressItem={this._onPressItem}
            selected={this.state.theme == item.color}
            name={item.name}
            color={item.color}
		/>
	);
	
	_onPressItem = (theme) => {
        this.setState((state) => {
            return {theme: theme.color}
        })
        
		return this.props.changeTheme(theme)        
	}
	
	render() {
		const { setting } = this.props
		const themeList = setting.themeList

        // const data = [
        //             {id: '1', name: 'Light Theme', color: '#FFFFFF'},
        //             {id: '2', name: 'Dark Theme', color: '#000000'},
        //         ]

		return (	
			<View style={styles.SettingContainer}>
				<FlatList 
					data={themeList}
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
		changeTheme: (newTheme) => dispatch(changeThemeColor(newTheme)),
		getThemeList: () => dispatch(fetchThemes()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ThemeSetting)