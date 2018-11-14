import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	FlatList,
	TouchableHighlight,
} from 'react-native';
import { Checkbox } from 'react-native-material-ui'
import { connect } from 'react-redux'
import { changePathColor, fetchPaths } from '../actions/setting'

class ListColor extends React.PureComponent {
	_onPress = () => {
		const { id, name, color } = this.props
		this.props.onPressItem({id, name, color});
	}

	render() {
        const { name, color, selected } = this.props

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

class ColorSetting extends Component {
	constructor(props) {
		super(props)

		this.state = { 
			path: this.props.setting.path.color,
		}
	}

	componentDidMount() {
		this.props.getPathList()
    }
	
	_keyExtractor = (item, index) => item.id;
	
	_renderItem = ({item, index}) => (
		<ListColor
            id={item.id}
            onPressItem={this._onPressItem}
            selected={this.state.path == item.color}
            name={item.name}
            color={item.color}
		/>
	);
	
	_onPressItem = (path) => {
		this.setState((state) => {
            return {path: path.color}
        })
        
		return this.props.changePath(path)        
	}
	
	render() {
		const { setting } = this.props
		const pathList = setting.pathList

		return (	
			<View style={styles.SettingContainer}>
				<FlatList 
					data={pathList}
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
		changePath: (newPath) => dispatch(changePathColor(newPath)),
		getPathList: () => dispatch(fetchPaths()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ColorSetting)
