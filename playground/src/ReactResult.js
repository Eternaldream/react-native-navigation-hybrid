/**
 * Sample React Native ReactNavigation
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
	TouchableOpacity,
	StyleSheet,
	Text,
	View,
	Image,
	TextInput
} from 'react-native';

import styles from './Styles'

import { RESULT_OK } from 'react-native-navigation-hybrid'

export default class ReactResult extends Component {

	static titleItem = {
		title: 'RN result',
	}

	static rightBarButtonItem = {
		title: '点我',
		//icon: Image.resolveAssetSource(require('./ic_settings.png')),
		action: 'somthing happen',
	}

	constructor(props){
		super(props);
		this.pushToNative = this.pushToNative.bind(this);
		this.pushToReact = this.pushToReact.bind(this);
        this.sendResult = this.sendResult.bind(this);
        this.onInputTextChanged = this.onInputTextChanged.bind(this);
		this.replaceWithNative = this.replaceWithNative.bind(this);
		this.replaceAllwithNative = this.replaceAllwithNative.bind(this);
		this.state = {
			text: '',
		}
	}

	componentWillMount() {
		this.props.navigator.isRoot().then((isRoot) => {
			if(isRoot) {
				console.info('-------------------is root---------------');
				this.props.garden.setLeftBarButtonItem({title: '取消', action: 'cancel'});
			} else {
				console.info('-------------------is not root---------------');
			}
		})
	}

	onBarButtonItemClick(action) {
		console.info('-------------------' + action + '------------------');
		if (action === 'cancel') {
			this.props.navigator.dismiss();
		}
	}

	pushToNative() {
		this.props.navigator.push('NativeResult');
	}

	pushToReact() {
		this.props.navigator.push('ReactResult');
	}

	replaceWithNative() {
		this.props.navigator.replace('NativeResult');
	}

	replaceAllwithNative() {
		this.props.navigator.replaceAll('NativeResult');
	}

	sendResult() {
        this.props.navigator.setResult(RESULT_OK, {text: this.state.text})
		this.props.navigator.dismiss();
    }

    onInputTextChanged(text) {
        this.setState({text: text})
    }
    
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>
					这是一个 React Native 页面:
        		</Text>

				<TextInput style={styles.input} onChangeText={this.onInputTextChanged} value={this.state.text} 
					placeholder={'请输入要返回的结果'} underlineColorAndroid='#00000000'/>

				<TouchableOpacity onPress={this.sendResult} activeOpacity={0.2} style={styles.button}>
					<Text style={styles.buttonText}>
						返回结果
          			</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={this.pushToReact} activeOpacity={0.2} style={styles.button}>
					<Text style={styles.buttonText}>
						到另一个 React Native 页面
          			</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={this.pushToNative} activeOpacity={0.2} style={styles.button}>
					<Text style={styles.buttonText}>
						到 native 页面
          			</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={this.replaceWithNative} activeOpacity={0.2} style={styles.button}>
					<Text style={styles.buttonText}>
						替换成 native 页面
          			</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={this.replaceAllwithNative} activeOpacity={0.2} style={styles.button}>
					<Text style={styles.buttonText}>
						替换所有页面为一个 native 页面
          			</Text>
				</TouchableOpacity>
			</View>
		);
	}
}