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
    PostListItem,
    Button
} from "@components";
import * as Utils from "@utils";
// import styles from "./styles";
import { DataMasterDiskon,DataPayment,DataBooking} from "@data";
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
    },
    contentButtonBottom: {
        // borderTopColor: BaseColor.textSecondaryColor,
        // borderTopWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
});


export default class PembayaranDetail extends Component {
    constructor(props) {
        super(props);
        //var dataPayment=props.navigation.state.params.dataPayment;
        var id_order=props.navigation.state.params.param;

        this.state = {
            dataPayment:DataPayment,
            dataBooking:DataBooking,
            id_order:id_order,
            loading:false,
            // paramPayment:{
            //     payment_type: dataPayment.payment_type,
            //     transaction_details: {
            //         gross_amount: "44000",
            //         order_id: "order-101i-{{$timestamp}}"
            //     },
            //     customer_details: {
            //         email: "noreply@example.com",
            //         first_name: "budi",
            //         last_name: "utomo",
            //         phone: "+6281 1234 1234"
            //     },
            //     item_details: [
            //     {
            //        id: "item01",
            //        price: 21000,
            //        quantity: 1,
            //        name: "Ayam Zozozo"
            //     }
            //    ],
            //     cimb_clicks: {
            //       description: "Purchase of a Food Delivery"
            //     }
            // }
        };
    }
    
    onSubmit(){
        // const{dataPayment}=this.state;
        this.props.navigation.navigate("Loading",{redirect:'PembayaranDetail',param:this.state.id_order});
        // var payment_type=dataPayment.payment.payment_type;
        // var transaction_details={
        //     gross_amount: dataPayment.dataBooking[0].total_price,
        //     order_id: dataPayment.dataBooking[0].order_code
        // }
        // var customer_details={
        //     email: dataPayment.dataBooking[0].contact.contact_email,
        //     first_name: dataPayment.dataBooking[0].contact.contact_first,
        //     last_name: dataPayment.dataBooking[0].contact.contact_last,
        //     phone: dataPayment.dataBooking[0].contact.contact_phone,
        // }
        // var paramPayment={
        //     payment_type: payment_type,
        //     transaction_details: transaction_details,
        //     customer_details: customer_details,
        //     cimb_clicks: {
        //       description: "Purchase of a Food Delivery"
        //     }
        // }
        
        // console.log('paramPayment',JSON.stringify(paramPayment));
        
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
    
    
    componentDidMount(){
        this.fetch();
    }

    render() {
        const { navigation} = this.props;
        const {dataPayment,loading} =this.state;
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
                                <View style={{ flex: 5,flexDirection: "row",justifyContent: "flex-start",alignItems: "center"}}>
                                    <View>
                                        <Text>
                                            Harga 
                                        </Text>
                                    
                                    </View>
                                </View>
                                <View style={{flex: 
                                
                                5,justifyContent: "center",alignItems: "flex-end"}}>
                                       
                                        <Text headline semibold numberOfLines={1}>
                                        {'IDR '+priceSplitter(this.state.dataBooking[0].total_price)}
                                        </Text>
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
                </View>
            </ScrollView>
            <View style={styles.contentButtonBottom}>
                    <Button
                        full
                        loading={loading}
                        onPress={() => { 
                            this.onSubmit();
                            //console.log('Param Payment',JSON.stringify(this.state.paramPayment));
                        }}
                    >
                        Bayar
                    </Button>
            </View>
        </SafeAreaView>
        );
    }
}

