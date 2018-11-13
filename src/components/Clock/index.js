'use strict';

import React, { Component } from 'react';
import { Image, View, Dimensions, StyleSheet, Button, TextInput, Alert, Animated } from 'react-native';
import Svg, { Circle, Path, Line } from 'react-native-svg';
import Sound from 'react-native-sound';

const AnimatedPath = Animated.createAnimatedComponent(Path);

const start = null;


const {height, width} = Dimensions.get('window');
const svgHeight = 330;
const svgWidth = 330;

const strokeWidth = 4; // ketebalan border lingkaran
const bigRadiusCanvas = (width - strokeWidth) / 2 - 30; // jari-jari lingkaran jam
const bigRadius = bigRadiusCanvas - strokeWidth / 2;

const topMargin = 0; // jarak dari top height ke file SVG (sesuai ukuran HEADER)
const topSpace = ((height / 2) - topMargin - bigRadiusCanvas) + topMargin - 15; // jarak dari top height ke lingkaran jam

const k = 4;
const angleDensity = 6;
const smallRadius = bigRadius / k;

const pathWidth = (bigRadiusCanvas-(strokeWidth / 2));
const pathPosition = (bigRadiusCanvas-(strokeWidth / 2)) / 2;

function transformX (x) {
	return (x) + (width / 2);
}

function transformY (y) {
	return (-y) + (height / 2) - topSpace;
}

function reTransformX(x){
	return x - (width / 2);
}

function reTransformY(y){
	return (((y - (height / 2)) * -1) - topSpace) + topMargin;
}

function convertToDegree (x) {
	return (x * (Math.PI / 180));
}

function convertToRadian(x) {
	return (x * (180 / Math.PI));
}

function minuteCoorX(x, n){
	return (Math.cos(convertToDegree(x)) * (bigRadius - n));
}

function minuteCoorY (x, n) {
	return (Math.sin(convertToDegree(x)) * (bigRadius - n));
}

function secondToMinute(second){
	var m = Math.floor(second / 60);
	var s = (second % 60);
	
	if(s < 10){
		s = "0" + s;
	}
	
	return m + " : " + s;
}

function minuteToAngle(minute){
	var angle = 0;

	if(minute <= 15){
		angle = (15 - minute) * 6;
	}
	else{
		angle = ((60 - minute) + 15) * 6;
	}
	
	return angle;
}

function angleToMinute(degree, round_degree){
	var menit = 0;
	if(degree > 90){
		menit = 60 - ((round_degree / 6) - 15);
	}
	else{
		menit = 15 - (round_degree / 6);
	}

	return menit;
}

function getMinuteDiff(a, b){
	return (a > b) ? (a-b) : (b-a);
}

function getTimeDiff(a, b){
	var counter = 0;
	if(b >= a){
		counter = b - a;
	}
	else{
		if((b-a) > (-30)){
			counter = (b - a) * -1;
		}
		else{
			counter = (b - a) + 60;
		}
	}
	
	return counter;
}

function getAngleDiff(start, end){
	var diff = 0;
	if(start == 360){
		start = 0;
	}
	
	if(start >= end){
		diff = ((end - start) + 360) / 6;
	}
	else{
		diff = (end - start) / 6;
	}
	return diff;
}

function getMinutes(x, y){
	var koordinat_x = reTransformX(x);
	var koordinat_y = reTransformY(y);
	var minute = 0;
	
	var r = Math.sqrt((koordinat_x * koordinat_x) + (koordinat_y * koordinat_y));
	var cos_a = koordinat_x / r;
	var sin_a = koordinat_y / r;
	
	var degree = convertToRadian(Math.acos(cos_a));
	
	var counter = 0;
	
	if(koordinat_y < 0){		
		degree = 360 - (convertToRadian(Math.acos(cos_a)));
	}
	
	counter = (90 - (Math.floor(degree / 6) * 6)) / 6;
	
	if(degree < 90 || degree > 354){
		counter = (90 - (Math.ceil(degree / 6) * 6)) / 6;
	}
	
	var round_degree = 90 - (counter * 6);
	
	minute = angleToMinute(degree, round_degree);
	
	return minute;
}

function setTimeRange(x, y, start, end, timer){
	var minute = getMinutes(x, y);
	var time = [2];
	time[0] = "";
	time[1] = "";

	if(start === ""){
		time[0] = minute;
		time[1] = "";
	}
	else if(end === ""){
		time[0] = start;
		time[1] = minute;
	}
	else{	
		if(timer == 59 && (minute == start || minute == end)){
			time[0] = minute;
			time[1] = minute;	
		}
		else{
			if(getTimeDiff(minute, start) < getTimeDiff(end, minute)){	
				time[0] = minute;
				time[1] = end;	
			}
			else{
				time[0] = start;
				time[1] = minute;
			}
		}
	}

	return time;
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
	var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

	return {
		x: centerX + (radius * Math.cos(angleInRadians)),
		y: centerY + (radius * Math.sin(angleInRadians))
	};
}

function describeArc(startAngle, endAngle){
	var x = transformX(0);
	var y = transformY(0);
	var radius = pathPosition;

	if(startAngle == endAngle){
		endAngle = (endAngle - 1) + 0.99;
	}
	
    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);
	
	if(endAngle - startAngle >= 0){
		var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
	}
	else{
		var largeArcFlag = endAngle - startAngle <= -180 ? "0" : "1";
	}

    var d = [
        "M", start.x, start.y, 	
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");
	
    return d;       
}

export default class Clock extends Component {
	constructor(props) {
		super(props);

		this.state = {
			startAngle: '',
			endAngle: '',
			startMinute: '',
			endMinute: '',
			timer: 0,
			sec: 0,
			newTimer: true,
			old_path: '',
			path: '',	
			time_string : '',
			isPause: false,
		};	
	}
	
	_getSound = () => {
		//var audio = "./sound/alert.mp3";
		return new Sound(this.props.soundAlert, (error) => {
			if (error) {
				console.log("error = " + error);
			}
		});
	}
	
	_onClick = (e) => {	
		if(this.state.newTimer){
			var x_coor = e.nativeEvent.locationX;
			var y_coor = e.nativeEvent.locationY;
			
			var time = setTimeRange(x_coor, y_coor, this.state.startMinute, this.state.endMinute, this.state.timer);	
			var start_minute = time[0];
			var end_minute = time[1];
	
			this.setState({
				startMinute: start_minute,
				endMinute: end_minute		
			})	
			
			if(start_minute !== "" && end_minute !== ""){			
				var start_angle = start_minute * 6;
				var end_angle = end_minute * 6;
				
				if(end_minute <= 15 && end_angle != this.state.endAngle){
					end_angle = end_angle + 6;
				}
				
				var line = describeArc(start_angle, end_angle);
				var time = getAngleDiff(start_angle, end_angle);
				if(time == 60){
					
				}
				this.setState({
					startAngle: start_angle,
					endAngle: end_angle,
					path: line,
					timer: time,
					time_string: secondToMinute((time * 60))
				})
			}
		}
	}
	
	_onMove = (e) => {
		if(this.state.newTimer){
			var x_coor = e.nativeEvent.locationX;
			var y_coor = e.nativeEvent.locationY;
			
			var time = setTimeRange(x_coor, y_coor, this.state.startMinute, this.state.endMinute, this.state.timer);	
			var start_minute = time[0];
			var end_minute = time[1];
	
			this.setState({
				startMinute: start_minute,
				endMinute: end_minute		
			})	
			
			if(start_minute !== "" && end_minute !== ""){					
				var start_angle = start_minute * 6;
				var end_angle = end_minute * 6;
				
				if(end_minute <= 15 && end_angle != this.state.endAngle){
					end_angle = end_angle + 6;
				}
				
				var line = describeArc(start_angle, end_angle);
				var time = getAngleDiff(start_angle, end_angle);
				
				this.setState({
					startAngle: start_angle,
					endAngle: end_angle,
					path: line,
					timer: time,
					time_string: secondToMinute((time * 60))
				})
			}
		}
	}

	_onStart = (e) => {	
		if(this.state.timer != 0){
			var sound = this._getSound();
			var counter = 0;
			var start_angle = this.state.startAngle;
			var end_angle = this.state.endAngle;

			this.setState({
				newTimer: false
			})
			
			start = setInterval(() => {
				counter = counter + 0.1;		
				var line = describeArc(start_angle + counter, end_angle);
				var old_line = describeArc(start_angle, start_angle + counter);
							
				this.setState(previousState => {		
					return {
						sec: previousState.sec + 1,				
					}
				})
				
				this.setState({
					path: line,
					old_path: old_line,
					time_string: secondToMinute((this.state.timer * 60) - this.state.sec)
				})
				
				if (this.state.sec === (this.state.timer * 60)) {
					this._reset();					
					sound.play();
					Alert.alert(
						'Alert',
						'Times Up',
						[
							{text: 'Stop', onPress: () => sound.stop()},
						],
						{ cancelable: false }
					)
				}
			}, 1000);
		}
	}
	
	_onPause = () => {
		this.setState({
			isPause: true
		})
		
		clearInterval(start);
	}
	
	_onStop = () => {
		this._reset();
	}
	
	_onResume = () => {
		var sound = this._getSound();
		this.setState({
			isPause: false
		})
		
		var counter = (0.1 * this.state.sec);
		var start_angle = this.state.startAngle;
		var end_angle = this.state.endAngle;
	
		start = setInterval(() => {
			counter = counter + 0.1;		
			var line = describeArc(start_angle + counter, end_angle);
			var old_line = describeArc(start_angle, start_angle + counter);
						
			this.setState(previousState => {		
				return {
					sec: previousState.sec + 1,				
				}
			})
			
			this.setState({
				path: line,
				old_path: old_line,
				time_string: secondToMinute((this.state.timer * 60) - this.state.sec)
			})
			
			if (this.state.sec === (this.state.timer * 60)) {
				this._reset();					
				sound.play();
				Alert.alert(
					'Alert',
					'Times Up',
					[
						{text: 'Stop', onPress: () => sound.stop()},
					],
					{ cancelable: false }
				)
			}
		}, 1000);
	}
	
	_reset = () => {
		clearInterval(start);
		this.setState({
			startAngle: '',
			endAngle: '',
			startMinute: '',
			endMinute: '',
			timer: 0,
			sec: 0,
			path: '',
			old_path: '',
			newTimer: true,
			time_string: ''
		})
	};
	
	_onRelease = () => {
		
	};
	
	_onStartShouldSetResponder = (e) => {
		return true;
	};
	
	_onMoveShouldSetResponder = () => {
		return true;
	};

	renderFields() {	
		const fields = [];
		var degree = 0;
		var length = 8;
		var strokeWidth = 1;
		for (var i=0; i < 60; i++) {	
			if((i % 5) == 0){
				length = 15;
				strokeWidth = 2;
			}
			else{
				length = 8;
				strokeWidth = 1;
			}
			
			fields.push(
				<Line
					key={"minute_"+i} 
					x1={transformX(minuteCoorX(degree,0))}
					y1={transformY(minuteCoorY(degree,0))}
					x2={transformX(minuteCoorX(degree,length))}
					y2={transformY(minuteCoorY(degree,length))}
					stroke={this.props.clockFrame}
					strokeWidth={strokeWidth}
				/>
			);
			degree += 6;
		}
		return fields;
	}

	render() {
		const btnStart = this.state.timer == 0 || !this.state.newTimer ? null :
					<View style={styles.btn}>
					<Button
					  onPress={this._onStart}
					  title="Start"							 
					/>
					</View>
					
		const btnStop = this.state.newTimer ? null : 
					<View style={styles.btn}>
					<Button
						onPress={this._onStop}
						title="Stop"
						color="red"					  
					/>
					</View>
					
		const btnPause = this.state.newTimer || this.state.isPause ? null : 	
					<View style={styles.btn}>
					<Button
						onPress={this._onPause}
						title="Pause"
						color="red"					  
					/>
					</View>
		
		const btnResume = !this.state.isPause ? null : 	
					<View style={styles.btn}>
					<Button
						onPress={this._onResume}
						title="Resume"
						color="green"					  
					/>
					</View>

		return (
			<View style={{flex: 1}}>
				<View style={styles.clockStyle}>
					<Svg				
						height={svgHeight}
						width={svgWidth} 
						onResponderGrant={this._onClick}
						onResponderMove={this._onMove}
						onResponderRelease={this._onRelease}
						onStartShouldSetResponder={this._onStartShouldSetResponder}
						onMoveShouldSetResponder={this._onMoveShouldSetResponder}>
						
						<Circle
							cx={transformX(0)}
							cy={transformY(0)}
							r={bigRadiusCanvas}
							strokeWidth={strokeWidth}
							stroke={this.props.clockFrame}
							fill='#fff'
						/>		
	
						<Circle
							cx={transformX(0)}
							cy={transformY(0)}
							r={bigRadiusCanvas-(strokeWidth / 2)}					
							strokeWidth={0}
							fill={this.props.clockColor}												
						/>
						
						<Path
							d={this.state.old_path}
							fill='none'
							stroke={this.props.backwardColor}
							strokeWidth={pathWidth}
						/>
						
						<Path
							d={this.state.path}
							fill='none'
							stroke={this.props.timerColor}
							strokeWidth={pathWidth}
						/>
						
						{this.renderFields()}										
					</Svg>
				</View>
				<View style={styles.box}>		
					<TextInput
						underlineColorAndroid = "transparent"
						editable={false} 
						selectTextOnFocus={false}
						textAlign={'center'}
						style={[styles.textBox, {color:this.props.textColor}]}
						value={this.state.time_string}
					/>
				</View>
				<View style={styles.boxButton}>
					{btnStart}
					{btnStop}
					{btnPause}
					{btnResume}
				</View>
			</View>
		)
	};
};

Clock.defaultProps = {
	clockColor: '#FFFFFF',
	clockFrame: '#000000',
	timerColor: '#133C99',
	backwardColor: '#C0C0C0',
	textColor: '#000000',
	soundAlert: require('../../sound/alarm.mp3')
};

const styles = StyleSheet.create({
	clockStyle: {
		marginTop: topMargin
	},
	box: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 70,
	},
	boxButton: {	
		flexDirection: 'row',
		justifyContent: 'center',
	},
	btn: {
		paddingHorizontal: 10,
	},
	textBox: {
		height: 40, 
		width: 70, 
		borderColor: 'gray', 
		borderWidth: 1,
		fontSize: 18,	
		fontWeight: 'bold'
	}
});