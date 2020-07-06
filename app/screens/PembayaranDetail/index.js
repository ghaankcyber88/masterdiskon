import React, { Component } from "react";
import { View, ScrollView, Animated,Dimensions,ActivityIndicator,TouchableOpacity,StyleSheet,AsyncStorage, Alert } from "react-native";
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
import AnimatedLoader from "react-native-animated-loader";


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
        //paddingVertical: 10,
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
        var param=props.navigation.state.params.param;
        var id_order=param.id_order;
        var dataPayment=param.dataPayment;
        //var dataPayment=props.navigation.state.params.dataPayment;
        //var subPayment=props.navigation.state.params.subPayment;
        
         console.log('dataPayments',JSON.stringify(dataPayment));
        // console.log('subPayment',JSON.stringify(subPayment));
        

        this.state = {
            dataPayment:dataPayment,
            dataBooking:DataBooking,
            statusMidtrans:{"va_numbers":[{"bank":"bca","va_number":"81174157162"}],"payment_amounts":[],"transaction_time":"2020-07-06 16:33:07","gross_amount":"740800.00","currency":"IDR","order_id":"MD2007060026","payment_type":"bank_transfer","signature_key":"7eb271c8362f64dd96c7519a7067ccb5d8f563ee45e7c64e4606773332aad32841e522fcdfb30dae96c183d57a044db425f07a3772a3e4d848ccbb1d65765884","status_code":"201","transaction_id":"1df337f3-5dc2-4cc7-a445-ae8c46eabefa","transaction_status":"pending","fraud_status":"accept","status_message":"Success, transaction is found","merchant_id":"G042781174"},
            id_order:id_order,
            loading:false,
        };
    }
    
    submitPayment(){
        const{dataPayment,dataBooking}=this.state;
        var payment_type=dataPayment.payment.payment_type;
        var payment_type_sub=dataPayment.subPayment.name;
        
        
        var transaction_details={
            gross_amount: dataPayment.dataBooking[0].total_price,
            order_id: dataPayment.dataBooking[0].order_code
        }
        var customer_details={
            email: dataPayment.dataBooking[0].contact.contact_email,
            first_name: dataPayment.dataBooking[0].contact.contact_first,
            last_name: dataPayment.dataBooking[0].contact.contact_last,
            phone: dataPayment.dataBooking[0].contact.contact_phone,
        }
        
        
        if(payment_type=='bank_transfer'){
            var paramPayMidtrans={
                payment_type: payment_type,
                transaction_details: transaction_details,
                customer_details: customer_details,
                bank_transfer: {
                  bank: payment_type_sub
                }
            }
        }
        
        
        
        var paramPayMD={
            "pay":dataBooking[0].total_price,
            "id_order":dataBooking[0].id_order,
            "fee":dataBooking[0].order_payment_info.transaction_fee,
            }
        console.log('paramPayMD',JSON.stringify(paramPayMD));
        console.log('paramPayMidtrans',JSON.stringify(paramPayMidtrans));
        this.payMasterDiskon(paramPayMD,paramPayMidtrans);
        
    }
    
    payMasterDiskon(paramPayMD,paramPayMidtrans){
        this.setState({ loading_spinner: true }, () => {
            console.log("---------------paramPayMD ------------");
            console.log(JSON.stringify(paramPayMD));

     
            
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");


            var raw = JSON.stringify(paramPayMD);
            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };

            fetch("https://masterdiskon.com/front/api/apiOrder/payment", requestOptions)
            .then(response => response.json())
            .then((result) => {
                console.log("---------------result payment md ------------");
                console.log(JSON.stringify(result));
                this.payMidtrans(paramPayMidtrans);
                
            });
        });  
    
    }
    
    
    payMidtrans(paramPay){
    
        var paramPay=paramPay;
        
        console.log('paramPay',JSON.stringify(paramPay))
        
        
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Basic U0ItTWlkLXNlcnZlci1rYUg3VlctakNpVjAyOGtWcmJmbjZITGY6");
        
        var raw = JSON.stringify(paramPay);
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch("https://api.sandbox.midtrans.com/v2/charge", requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log("---------------result payment midtarns ------------");
            console.log(JSON.stringify(result));
            
            this.setState({ loading_spinner: false });
            
            var redirect='PembayaranDetail';
                var param={
                    id_order:this.state.id_order,
                    dataPayment:this.state.dataPayment
                }
            this.props.navigation.navigate("Loading",{redirect:redirect,param:param});
          })
          .catch(error => console.log('error', error));
    
    }
    
    
    content_payment(){
        const { navigation} = this.props;
        const {dataPayment,loading,dataBooking,statusMidtrans} =this.state;
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

        var order_payment_num=dataBooking[0].order_payment_num;
        var content=<View></View>;
        var virtual_account='';
        var payment_type=dataPayment.payment.payment_type;
        var payment_type_sub=dataPayment.subPayment.name;
        
        if(payment_type=='bank_transfer'){
            if(payment_type_sub=='bca'){
                virtual_account=this.state.statusMidtrans.va_numbers[0].va_number;
            }else if(payment_type_sub=='bni'){
                virtual_account=this.state.statusMidtrans.va_numbers[0].va_number;
            }else if(payment_type_sub=='permata'){
                virtual_account=this.state.statusMidtrans.permata_va_number;
            }
        }
        
        if(order_payment_num==0){
            content=<View>
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
                                <View style={{flex:5,justifyContent: "center",alignItems: "flex-end"}}>
                                       
                                        <Text headline semibold numberOfLines={1}>
                                        {'IDR '+priceSplitter(this.state.dataBooking[0].total_price)}
                                        </Text>
                                </View>
                            </View>
                        </View>
                        
                        <View style={{flexDirection:'row',paddingLeft:20,paddingRight:20,paddingTop:5,paddingBottom:5,}} >
                            <View style={{flexDirection:'row',flex: 10,justifyContent: "flex-start",alignItems: "center",borderBottomWidth: 1,borderBottomColor: BaseColor.textSecondaryColor,borderBottomStyle: 'solid',paddingBottom:10}}>
                                <View style={{ flex: 5,flexDirection: "row",justifyContent: "flex-start",alignItems: "center"}}>
                                    <View>
                                        <Text>
                                            Fee 
                                        </Text>
                                    
                                    </View>
                                </View>
                                <View style={{flex: 
                                
                                5,justifyContent: "center",alignItems: "flex-end"}}>
                                        <Text headline semibold numberOfLines={1}>
                                        {'IDR '+priceSplitter(this.state.dataBooking[0].fee)}
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
                                        {'IDR '+priceSplitter(parseInt(this.state.dataBooking[0].total_price)+parseInt(this.state.dataBooking[0].order_payment_info.transaction_fee))}
                                        </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
        }else{
            content=<View>
                        <View style={{
                                    borderWidth: 1, 
                                    borderColor: BaseColor.textSecondaryColor,
                                    borderRadius: 10,
                                    marginBottom:10,
                                    padding:10
                                    }}>
                            <View style={{flexDirection:'row',paddingLeft:20,paddingRight:20,paddingTop:5,paddingBottom:5}} >
                                <View style={{flexDirection:'row',flex: 10,justifyContent: "flex-start",alignItems: "center",borderBottomWidth: 1,borderBottomColor: BaseColor.textSecondaryColor,borderBottomStyle: 'solid',paddingBottom:10}}>
                                    <View style={{ flex: 8,flexDirection: "row",justifyContent: "flex-start",alignItems: "center"}}>
                                        <View>
                                            <Text style={{color:BaseColor.grayColor,fontSize:12}}>
                                                Transfer 
                                            </Text>
                                            <Text>
                                                {dataPayment.subPayment.title} 
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{flex:4,justifyContent: "center",alignItems: "flex-end"}}>
                                            <Text></Text>
                                            <Text headline semibold numberOfLines={1}>
                                            
                                            </Text>
                                    </View>
                                </View>
                            </View>
                            
                            
                            <View style={{flexDirection:'row',paddingLeft:20,paddingRight:20,paddingTop:5,paddingBottom:5}} >
                                <View style={{flexDirection:'row',flex: 10,justifyContent: "flex-start",alignItems: "center",borderBottomWidth: 1,borderBottomColor: BaseColor.textSecondaryColor,borderBottomStyle: 'solid',paddingBottom:10}}>
                                    <View style={{ flex: 8,flexDirection: "row",justifyContent: "flex-start",alignItems: "center"}}>
                                        <View>
                                            <Text style={{color:BaseColor.grayColor,fontSize:12}}>
                                                No Rekening 
                                            </Text>
                                            <Text headline semibold numberOfLines={6}>
                                                {this.state.dataBooking[0].order_payment_info.norek}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{flex:4,justifyContent: "center",alignItems: "flex-end"}}>
                                            <Text></Text>
                                            <Text headline semibold numberOfLines={1}>
                                                SALIN
                                            </Text>
                                    </View>
                                </View>
                            </View>
                            
                            
                            <View style={{flexDirection:'row',paddingLeft:20,paddingRight:20,paddingTop:5,paddingBottom:5}} >
                                <View style={{flexDirection:'row',flex: 10,justifyContent: "flex-start",alignItems: "center",borderBottomWidth: 1,borderBottomColor: BaseColor.textSecondaryColor,borderBottomStyle: 'solid',paddingBottom:10}}>
                                    <View style={{ flex: 8,flexDirection: "row",justifyContent: "flex-start",alignItems: "center"}}>
                                        <View>
                                            <Text style={{color:BaseColor.grayColor,fontSize:12}}>
                                                Total Pembayaran 
                                            </Text>
                                            <Text headline semibold numberOfLines={1}>
                                            {'IDR '+priceSplitter(this.state.dataBooking[0].order_payment[0].iv_total_amount)}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{flex:4,justifyContent: "center",alignItems: "flex-end"}}>
                                            <Text></Text>
                                            <Text headline semibold numberOfLines={1}>
                                                SALIN
                                            </Text>
                                    </View>
                                </View>
                            </View>
                            
                            <View style={{flexDirection:'row',paddingLeft:20,paddingRight:20,paddingTop:5,paddingBottom:5}} >
                                <View style={{flexDirection:'row',flex: 10,justifyContent: "flex-start",alignItems: "center"}}>
                                    <View style={{ flex: 8,flexDirection: "row",justifyContent: "flex-start",alignItems: "center"}}>
                                        <View>
                                            <Text style={{color:BaseColor.grayColor,fontSize:12}}>
                                                Virtual Account 
                                            </Text>
                                            <Text headline semibold numberOfLines={10}>
                                                {virtual_account}
                                                
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{flex:4,justifyContent: "center",alignItems: "flex-end"}}>
                                            <Text></Text>
                                            <Text headline semibold numberOfLines={1}>
                                                SALIN
                                            </Text>
                                    </View>
                                </View>
                            </View>
                            
                            
                            
                        </View>
                    </View>
        
        }
        
        return(
            <View  style={{ padding: 20 }}>
                    {content}
            </View>
        )
    }
    content_button(){
    
        const { navigation} = this.props;
        const {dataPayment,loading,dataBooking} =this.state;
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

        var order_payment_num=dataBooking[0].order_payment_num;
        var content=<View></View>;
        
        
        if(order_payment_num==0){
            content=<View style={styles.contentButtonBottom}>
                        <Button
                            full
                            loading={loading}
                            onPress={() => { 
                                Alert.alert(
                                  'Confirm',
                                  'Yakin ingin membayar tagihan ini ?',
                                  [
                                    {text: 'NO', onPress: () => console.warn('NO Pressed'), style: 'cancel'},
                                    {text: 'YES', onPress: () => this.submitPayment()},
                                  ]
                                );
                        }}    
                        >
                            Bayar
                        </Button>
                </View>
        }else{
            
                
            content=<View>
                <View style={styles.contentButtonBottom}>
                        <Button
                            full
                            loading={loading}
                            onPress={() => { 
                                this.onSubmit();
                            }}
                        >
                            Sudah Membayar
                        </Button>
                </View>
                    <View style={styles.contentButtonBottom}>
                            <Button
                                full
                                loading={loading}
                                onPress={() => { 
                                        Alert.alert(
                                          'Confirm',
                                          'Ingin mengganti metode pembayaran ?',
                                          [
                                            {text: 'NO', onPress: () => console.warn('NO Pressed'), style: 'cancel'},
                                            {text: 'YES', onPress: () => this.changePayment()},
                                          ]
                                        );
                                }}
                                style={{backgroundColor:BaseColor.grayColor}}
                            >
                                <Text style={{color:BaseColor.whiteColor}}>Ganti Metode Pembayaran</Text>
                            </Button>
                    </View>
                </View>
        
        }
        
        
        return(
        
            <View>
                    {content}
            </View>
        )
    
    }
    
    
    // submitPayment(){
       
           
    //     const data={"id_order":this.state.id_order}
    //     const param={"param":data}
    //     console.log('-------------param change payment-------------');
    //     console.log(JSON.stringify(param));

    //     PostData('order_payment_delete',param)
    //         .then((result) => {
    //             console.log("---------------get_booking_historys ------------");
    //             console.log(JSON.stringify(result));
    //             //this.setState({dataBooking:result});
    //         },
    //         (error) => {
    //             this.setState({ error });
    //         }
    //     ); 

    // }


    changePayment(){
       
        this.setState({ loading_spinner: true }, () => {
                    const data={"id_order":this.state.id_order}
                    const param={"param":data}
                    console.log('-------------param change payment-------------');
                    console.log(JSON.stringify(param));

                    PostData('order_payment_delete',param)
                        .then((result) => {
                            this.cancelMidtrans();
                            
                        },
                        (error) => {
                            this.setState({ error });
                        }
                    ); 
        });           
            
    }
    
    cancelMidtrans(){
        var dataBooking=this.state.dataBooking;
        var order_code=dataBooking[0].order_code;
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Basic U0ItTWlkLXNlcnZlci1rYUg3VlctakNpVjAyOGtWcmJmbjZITGY6");
        
        var raw = "";
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch("https://api.sandbox.midtrans.com/v2/"+order_code+"/cancel", requestOptions)
          .then(response => response.json())
          .then(result => {
                            this.setState({ loading_spinner: false });
                            console.log("---------------cancel midtrans ------------");
                            console.log(JSON.stringify(result));
                            var redirect='Pembayaran';
                            var param={
                                id_order:this.state.id_order,
                                dataPayment:{}
                            }
                            this.props.navigation.navigate("Loading",{redirect:redirect,param:param});
          })
          .catch(error => console.log('error', error)); 
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
                            var dataBooking=result;
                            console.log("---------------get_booking_historys ------------");
                            console.log(JSON.stringify(result));
                            this.setState({ loading_spinner: false });
                            this.setState({dataBooking:result});
                            
                            
                            var order_code=dataBooking[0].order_code;
                            this.fetchMidtrans(order_code);
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
    
    fetchMidtrans(order_code){
        console.log('order_code',order_code);
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Basic U0ItTWlkLXNlcnZlci1rYUg3VlctakNpVjAyOGtWcmJmbjZITGY6");
        
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        
        fetch("https://api.sandbox.midtrans.com/v2/"+order_code+"/status", requestOptions)
          .then(response => response.json())
          .then(result => {
            var statusMidtrans=result;
            console.log('status_midtrans',JSON.stringify(result));
            this.setState({statusMidtrans:statusMidtrans});
          })
          .catch(error => console.log('error', error));

    }
    
    
    componentDidMount(){
        this.fetch();
    }

    render() {
        const { navigation} = this.props;
        const {dataPayment,loading,dataBooking,loading_spinner} =this.state;
        
        
        return (
      
        
            <SafeAreaView
            style={BaseStyle.safeAreaView}
            forceInset={{ top: "always" }}
        >
            <Header
                title={dataPayment.payment.title+' - '+dataPayment.subPayment.title}
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
          
            {
                            loading_spinner ? 
                            
                            <View style={{flex: 1,backgroundColor:  "#FFFFFF",justifyContent: "center",alignItems: "center"}}>
                                <View
                                    style={{
                                        position: "absolute",
                                        top: 220,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}
                                >
                                    
                                    <AnimatedLoader
                                        visible={true}
                                        overlayColor="rgba(255,255,255,0.75)"
                                        source={require("app/assets/loader_paperline.json")}
                                        animationStyle={{width: 300,height: 300}}
                                        speed={1}
                                      />
                                    <Text grayColor>
                                        Connecting.. to Masterdiskon
                                    </Text>
                                </View>
                            </View>
                            :
            <ScrollView>
                {this.content_payment()}
                {this.content_button()}
            </ScrollView>
            }
            
        </SafeAreaView>
        );
    }
}

