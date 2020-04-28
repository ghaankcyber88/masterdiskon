import React, { Component } from "react";
import { View, ScrollView, TextInput,StyleSheet,Dimensions } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, Text, Button } from "@components";
// import styles from "./styles";
import HTML from 'react-native-render-html';
import { WebView } from 'react-native-webview';


const styles = StyleSheet.create({
    contentTitle: {
        alignItems: "flex-start",
        width: "100%",
        height: 32,
        justifyContent: "center"
    },
    contain: {
        alignItems: "center",
        padding: 20,
        width: "100%"
    },
    textInput: {
        height: 46,
        backgroundColor: BaseColor.fieldColor,
        borderRadius: 5,
        padding: 10,
        width: "100%"
    }
  });


export default class Static extends Component {
    constructor(props) {
        super(props);
        var item=props.navigation.state.params.item;
        var type=props.navigation.state.params.type;
        this.state = {
            password: "",
            repassword: "",
            loading: false,
            item:item,
            type:type
        };
    }

    render() {
        const { navigation } = this.props;
        let {item,type}=this.state;

        var content='';
        if(type=='tentang'){
            content=item.tentang;
        }else if(type=='kebijakan'){
            content=item.kebijakan;
        }
        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <Header
                    title={type}
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
                <ScrollView>
                    <View style={styles.contain}>
                       
                    <HTML body2 html={content} imagesMaxWidth={Dimensions.get('window').width} />   
                       
                        
                    </View>
                </ScrollView>
                {/* <View style={{ padding: 20 }}>
                    <Button
                        loading={this.state.loading}
                        full
                        onPress={() => {
                            this.setState(
                                {
                                    loading: true
                                },
                                () => {
                                    setTimeout(() => {
                                        navigation.goBack();
                                    }, 500);
                                }
                            );
                        }}
                    >
                        Confirm
                    </Button>
                </View> */}
            </SafeAreaView>
        );
    }
}
