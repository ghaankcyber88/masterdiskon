import React, { Component } from "react";
import { View, ScrollView, Animated,Dimensions,ActivityIndicator,TouchableOpacity,StyleSheet } from "react-native";
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


const styles = StyleSheet.create({
    containField: {
        margin: 20,
        marginTop: 90,
        flexDirection: "row",
        height: 140,
        backgroundColor: BaseColor.fieldColor,
        borderRadius: 10
    },
    contentLeftItem: {
        flex: 1,
        padding: 20,
        alignItems: "center"
    },
    tagFollow: { width: 150, margin: 10 },
    tabbar: {
        backgroundColor: "white",
        height: 40
    },
    tab: {
        width: Utils.getWidthDevice() / 3
    },
    indicator: {
        backgroundColor: BaseColor.primaryColor,
        height: 1
    },
    label: {
        fontWeight: "400"
    },
    containProfileItem: {
        paddingLeft: 20,
        paddingRight: 20
    },
    profileItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomColor: BaseColor.textSecondaryColor,
        borderBottomWidth: 1,
        paddingBottom: 20,
        paddingTop: 20
    }
});


export default class Pembayaran extends Component {
    constructor(props) {
        var id_order=props.navigation.state.params.param;
        //var url='https://masterdiskon.com/front/user/purchase/detail/'+id_order+'?access=app';
        //console.log('url',url);
        super(props);
        this.state = {
            //url:url,
            id_order:id_order,
            payment: [
                {
                    title: "Cicilan Tanpa Kartu Kredit",
                    subPayment:[
                                    {
                                        title:"Akulaku",
                                        icon:""
                                    },
                                ]
                },
                {
                    title: "Kartu Kredit/Debit",
                    subPayment:[
                                    {
                                        title:"Kartu Kredit",
                                        icon:""
                                    },
                                    {
                                        title:"Kartu Debit",
                                        icon:""
                                    },
                                ]
                },
            ],
        };
    }

    render() {
        const { navigation} = this.props;
        return (
      
        
           <SafeAreaView
            style={BaseStyle.safeAreaView}
            forceInset={{ top: "always" }}
        > 
        <Header
                    title="Pembayaran"
                    renderLeft={() => {
                        return (
                            <Icon
                                name="arrow-left"
                                size={20}
                                color={BaseColor.whiteColor}
                            />
                        );
                    }}
                    onPressLeft={() => {
                        navigation.goBack();
                    }}
                />
                
                <View style={{ padding: 20 }}>
                    <Text title3 semibold>
                        Cicilan Tanpa Kartu Kredit
                    </Text>
                    <View>
                    <TouchableOpacity
                            style={styles.profileItem}
                            onPress={() => {
                                navigation.navigate("ChangeLanguage");
                            }}
                        >
                            <Text body1>Akulaku</Text>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center"
                                }}
                            >
                                <Text body1 grayColor>
                                    English
                                </Text>
                                <Icon
                                    name="angle-right"
                                    size={18}
                                    color={BaseColor.primaryColor}
                                    style={{ marginLeft: 5 }}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                
                
                <View style={{ padding: 20 }}>
                    <Text title3 semibold>
                        Cicilan Tanpa Kartu Kredit
                    </Text>
                    <View>
                        <TouchableOpacity
                            style={styles.profileItem}
                            onPress={() => {
                                navigation.navigate("ChangeLanguage");
                            }}
                        >
                            <Text body1>Language</Text>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center"
                                }}
                            >
                                <Text body1 grayColor>
                                    English
                                </Text>
                                <Icon
                                    name="angle-right"
                                    size={18}
                                    color={BaseColor.primaryColor}
                                    style={{ marginLeft: 5 }}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
        </SafeAreaView>
        );
    }
}


class OrderTab extends Component {
    constructor(props) {
        super(props);
        var product=this.props.product;
        //alert(product);
        this.state = {
           
        };
    }



    render() {
    const {navigation}=this.props;
        return (
            <View>

                                
            
            </View>
        );
    }
}

