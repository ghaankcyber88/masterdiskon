import React, { Component } from "react";
import { View, ScrollView, Animated,Dimensions,ActivityIndicator } from "react-native";
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


export default class WebViewPage extends Component {
    constructor(props) {
        var url=props.navigation.state.params.url;
        var title=props.navigation.state.params.title;
        // var url='https://masterdiskon.com/front/user/purchase/detail/'+id_order+'?access=app';
        console.log('url',url);
        super(props);
        this.state = {
            url:url,
            title:title
        };
    }

    render() {
        const { navigation} = this.props;
        return (
        // <SafeAreaView
        //     style={BaseStyle.safeAreaView}
        //     forceInset={{ top: "always" }}
        // > 
        
        // <Header
        //             title="Summary"
        //             renderLeft={() => {
        //                 return (
        //                     <Icon
        //                         name="arrow-left"
        //                         size={20}
        //                         color={BaseColor.primaryColor}
        //                     />
        //                 );
        //             }}
        //             onPressLeft={() => {
        //                 navigation.goBack();
        //             }}
        //         />
        //      <ScrollView>
        //         <View style={{flex:1,marginTop:20}}>
        //             {/* <Text>{this.state.url}</Text> */}
        //             <WebView style={{}} source={{ uri: this.state.url }} />
        //         </View>
        //     </ScrollView>
        // </SafeAreaView>
        
           <SafeAreaView
            style={BaseStyle.safeAreaView}
            forceInset={{ top: "always" }}
        > 
        <Header
                    title={this.state.title}
                    renderLeft={() => {
                        return (
                            <Icon
                                name="arrow-left"
                                size={20}
                                color={BaseColor.primaryColor}
                            />
                        );
                    }}
                    onPressLeft={() => {
                        navigation.goBack();
                    }}
                />
        
                <View style={{flex:1,marginTop:20}}>
                    {/* <Text>{this.state.url}</Text> */}
                    <WebView style={{}} source={{ uri: this.state.url }} />
                </View>
        </SafeAreaView>
        );
    }
}
