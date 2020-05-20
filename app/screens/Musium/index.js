import React, { Component } from "react";
import { View, ScrollView, Animated,Dimensions } from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import {
    Header,
    SafeAreaView,
    Icon,
    Text,
    ProfileAuthor,
    ProfileGroup,
    Card,
    PostListItem
} from "@components";
import * as Utils from "@utils";
// import styles from "./styles";
import { DataMasterDiskon } from "@data";
import HTML from 'react-native-render-html';
import { WebView } from 'react-native-webview';


export default class Musium extends Component {
    constructor(props) {
        var url=props.navigation.state.params.url;
        console.log('https://artsandculture.google.com'+url);
        super(props);
        this.state = {
            url:url,
        };
    }

    render() {
        return (
        <View style={{flex:1,marginTop:20}}>
            <WebView style={{}} source={{ uri: 'https://artsandculture.google.com'+this.state.url }} />
        </View>
        );
    }
}
