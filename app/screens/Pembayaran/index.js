import React, { Component } from "react";
import { View, ScrollView, Animated,Dimensions,ActivityIndicator,TouchableOpacity,StyleSheet,AsyncStorage } from "react-native";
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
import { DataMasterDiskon,DataBooking } from "@data";
import HTML from 'react-native-render-html';
import { WebView } from 'react-native-webview';
import {PostData} from '../../services/PostData';

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
        
        var param=props.navigation.state.params.param;
        var id_order=param.id_order;
        super(props);
        this.state = {
            id_order:id_order,
            dataBooking:DataBooking,
            payment: [
                // {
                //     title: "Payment Card",
                //     payment_type:"peyment_card",
                //     subPayment:[
                //                     {
                //                         title:"Credit Card",
                //                         name:"credit_card",
                //                         icon:""
                //                     },
                //                 ]
                // },
                {
                    title: "Bank Transfer",
                    payment_type:"bank_transfer",
                    subPayment:[
                                    {
                                        title:"BCA",
                                        name:"bca",
                                        icon:"",
                                        attribute:{
                                                    bank_transfer:{
                                                        bank: "bca"
                                                    }
                                        }
                                    },
                                    {
                                        title:"Permata",
                                        name:"permata",
                                        icon:"",
                                        attribute:{
                                            bank_transfer:{
                                                bank: "permata"
                                            }
                                        }
                                    },
                                    {
                                        title:"BNI",
                                        name:"bni",
                                        icon:"",
                                        attribute:{
                                            bank_transfer:{
                                                bank: "bni"
                                            }
                                        }
                                    },
                                    
                                ]
                },
            ],
        };
    }
    
    componentDidMount(){
        this.fetch();
    }
    
    fetch(){

        this.setState({ loading_spinner: true }, () => {
            AsyncStorage.getItem('userSession', (error, result) => {
            if (result) {
                let userSession = JSON.parse(result);
                console.log("---------------data session user  ------------");
                console.log(JSON.stringify(userSession));
                this.setState({userSession:userSession});
                this.setState({login:true});
                
                var id_user=userSession.id_user;
                    const data={"id":id_user,"id_order":this.state.id_order,"order_status":"","product":""}
                    const param={"param":data}
                    console.log('-------------param booking-------------');
                    console.log(JSON.stringify(param));


                    PostData('get_booking_history',param)
                        .then((result) => {
                            console.log("---------------get_booking_historys ------------");
                            console.log(JSON.stringify(result));
                            this.setState({ loading_spinner: false });
                            this.setState({dataBooking:result});
                        },
                        (error) => {
                            this.setState({ error });
                        }
                    ); 
             }else{
                this.setState({login:false});
             }
            
            });
        });

    }

    render() {
        const { navigation} = this.props;
        const {id_order} =this.state;
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

        return (
      
        
            <SafeAreaView
            style={BaseStyle.safeAreaView}
            forceInset={{ top: "always" }}
        >
            <Header
                title="Pembayaran"
                subTitle={'No.Tagihan :'+this.state.dataBooking[0].order_code}
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
          
            
            <ScrollView>
                <View  style={{ padding: 20 }}>
                    <View style={{
                                borderWidth: 1, 
                                borderColor: BaseColor.textSecondaryColor,
                                borderRadius: 10,
                                marginBottom:10,
                                padding:10
                                }}>
                        <View style={{flexDirection:'row',paddingLeft:20,paddingRight:20,paddingTop:5,paddingBottom:5}} >
                            <View style={{flexDirection:'row',flex: 10,justifyContent: "flex-start",alignItems: "center"}}>
                                <View style={{ flex: 8,flexDirection: "row",justifyContent: "flex-start",alignItems: "center"}}>
                                    <View>
                                        <Text>
                                        No.Tagihan : {this.state.dataBooking[0].order_code}
                                        </Text>
                                    
                                    </View>
                                </View>
                                <View style={{flex: 4,justifyContent: "center",alignItems: "flex-end"}}>
                                       
                                            <Icon
                                                name="angle-down"
                                                size={18}
                                                color={BaseColor.primaryColor}
                                                style={{ textAlign: "center"}}
                                            />
                                </View>
                            </View>
                        </View>
                        <View style={{flexDirection:'row',paddingLeft:20,paddingRight:20,paddingTop:5,paddingBottom:5}} >
                            <View style={{flexDirection:'row',flex: 10,justifyContent: "flex-start",alignItems: "center"}}>
                                <View style={{ flex: 5,flexDirection: "row",justifyContent: "flex-start",alignItems: "center"}}>
                                    <View>
                                        <Text>
                                           Total Pembayaran
                                        </Text>
                                    
                                    </View>
                                </View>
                                <View style={{flex: 5,justifyContent: "center",alignItems: "flex-end"}}>
                                        <Text headline semibold numberOfLines={1}>
                                        {'IDR '+priceSplitter(this.state.dataBooking[0].total_price)}
                                        </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    {this.state.payment.map((item, index) => (
                    <View>
                        <Text title3 semibold>
                            {item.title}
                        </Text>
                        <Bank id_order={this.state.id_order} payment={item} subPayment={item.subPayment} navigation={navigation} dataBooking={this.state.dataBooking} />
                    </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
        );
    }
}



class Bank extends Component {
    constructor(props) {
        super(props);
        var product=this.props.product;
        this.state = {
           
        };
    }



    render() {
    const {navigation}=this.props;
        return (
            <View>      
                    {this.props.subPayment.map((item, index) => (
                        <TouchableOpacity
                            style={styles.profileItem}
                            onPress={() => {
                            
                            var dataPayment={
                                                payment:this.props.payment,
                                                subPayment:item,
                                                dataBooking:this.props.dataBooking
                                            }
                                            
                            var param={
                                id_order:this.props.id_order,
                                dataPayment:dataPayment
                            }
                            console.log('dataPayment',JSON.stringify(dataPayment));
                            navigation.navigate("PembayaranDetail",{
                                param:param,
                            });
                            }}
                        >
                            <Text body1>{item.title}</Text>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center"
                                }}
                            >
                                <Text body1 grayColor>
                                    {item.icon}
                                </Text>
                                <Icon
                                    name="angle-right"
                                    size={18}
                                    color={BaseColor.primaryColor}
                                    style={{ marginLeft: 5 }}
                                />
                            </View>
                        </TouchableOpacity>
                    ))}
            </View>
        );
    }
}

