import React, { Component,useEffect,useState } from "react";
import { View, ScrollView, Animated,Dimensions,ActivityIndicator,TouchableOpacity,StyleSheet,AsyncStorage, Alert,Clipboard } from "react-native";
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
import CountDown from 'react-native-countdown-component';
import moment from 'moment';
import {PostDataNew} from '../../services/PostDataNew';

import {fcmService} from '../../src/FCMService';
import {localNotificationService} from '../../src/LocalNotificationService';
// import Clipboard from "@react-native-community/clipboard";
import { Form, TextValidator } from 'react-native-validator-form';


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
        // paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    contentProfile: {
        // marginTop: 15,
        flexDirection: "row",
        // backgroundColor: BaseColor.fieldColor,
        marginBottom: 15,
        width: '100%',
    },
});


export default function PembayaranDetail(props) {

    var param=props.navigation.state.params.param;
    // var id_order=param.id_order;
    // var dataPayment=param.dataPayment;
 
      const { navigation} = props;
      const [dataPayment, setDataPayment]=useState(param.dataPayment);
      const [idOrder, setIdOrder]=useState(param.id_order);
      const [count, setCount] = useState(0);
      const [tokenFirebase, setTokenFirebase]= useState(0);
      const [loading, setLoading]=useState(true);
      const [dataBooking, setDataBooking]=useState(DataBooking);
      const [statusMidtrans, setStatusMidtrans]=useState({"va_numbers":[{"bank":"bca","va_number":"81174157162"}],"payment_amounts":[],"transaction_time":"2020-07-06 16:33:07","gross_amount":"740800.00","currency":"IDR","order_id":"MD2007060026","payment_type":"bank_transfer","signature_key":"7eb271c8362f64dd96c7519a7067ccb5d8f563ee45e7c64e4606773332aad32841e522fcdfb30dae96c183d57a044db425f07a3772a3e4d848ccbb1d65765884","status_code":"201","transaction_id":"1df337f3-5dc2-4cc7-a445-ae8c46eabefa","transaction_status":"pending","fraud_status":"accept","status_message":"Success, transaction is found","merchant_id":"G042781174"});
      const [fee, setFee]= useState(0);
      const [totalPembayaran, setTotalPembayaran]= useState(0);
      
      const [cardNumber, setCardNumber]= useState('4811 1111 1111 1114');
      const [cardExpMonth, setCardExpMonth]= useState('01');
      const [cardExpYear, setCardExpYear]= useState('2025');
      const [cardCVV, setCardCVV]= useState('123');
      const [cardToken, setCardToken]= useState(0);
      
      
      const [colorButton,setColorButton] =useState(BaseColor.greyColor);
      const [colorButtonText,setColorButtonText] =useState(BaseColor.whiteColor);
      const [disabledButton,setDisabledButton] =useState(true);

      console.log('dataBookingBro',JSON.stringify(dataBooking));
      
      const [config, setConfig]=useState();
        
    AsyncStorage.getItem('tokenFirebase', (error, result) => {
        if (result) {
            //console.log('Token Firebase',result);
            setTokenFirebase(result);
        }
    });
    
    function validation(){
        if( 
            cardNumber != '' && 
            cardExpMonth !='' &&
            cardExpYear !='' &&
            cardCVV !=''
        ){
                //console.log('perfect');
                setColorButton(BaseColor.secondColor);
                setColorButtonText(BaseColor.primaryColor);
                setDisabledButton(false);
        }else{
            //console.log('not yet');
            setColorButton(BaseColor.greyColor);
            setColorButtonText(BaseColor.whiteColor);
            setDisabledButton(true);
        }
    }

    
    function getConfig(){
            AsyncStorage.getItem('config', (error, result) => {
                if (result) {    
                    let config = JSON.parse(result);
                    setConfig(config);
                }
            });
       
    }
    
    
    
    function submitPayment(){
        var payment_type=dataPayment.payment_type;
        ////console.log(payment_type);
        
        
        var paramPayMD={
            "total_pembayaran":totalPembayaran,
            "fee":fee,
            "id_invoice":dataBooking[0].order_payment_recent.id_invoice,
            "dataPayment":dataPayment,
            "token":""
            }
        //console.log('paramPayMD',JSON.stringify(paramPayMD));
        
        
        if(payment_type=='bank_transfer'){
            payMasterDiskon(paramPayMD);
        }else if(payment_type=='credit_card'){
            tokenCC(paramPayMD);
        }
    }
    
    function tokenCC(paramPayMD){
        var param={
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(),
          }
       
         //var url='https://api.sandbox.midtrans.com/';
         var url=config.midtransUrl;
         //console.log('baseUrl',url);
         
         return PostDataNew(url,'v2/token?client_key='+config.midtransKey.client+'&card_number='+cardNumber+'&card_exp_month='+cardExpMonth+'&card_exp_year='+cardExpYear+'&card_cvv='+cardCVV,param)
             .then((result) => {
                var tokenCC=result.token_id;
                paramPayMD.token=tokenCC;
                payMasterDiskon(paramPayMD);
                },
             (error) => {
                 this.setState({ error });
             }
        );  
    
    }
    
    function payMasterDiskon(paramPayMD){
            setLoading(true);
            //console.log("---------------paramPayMD ------------");
            //console.log(JSON.stringify(paramPayMD));

            
            var param={
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(paramPayMD),
              }
           
             var url=config.baseUrl;
             //console.log('baseUrl',url);
             
             return PostDataNew(url,'front/api/OrderSubmit/payment_update',param)
                 .then((result) => {
                            //console.log("---------------result payment md ------------");
                            //console.log(JSON.stringify(result));
                            var id_invoice=result.id_invoice;
                            var token=result.token;
                            var dataSendMidTrans={
                                id_invoice:id_invoice,
                                token:token
                            }
                            payMidtrans(dataSendMidTrans);
                 },
                 (error) => {
                     this.setState({ error });
                 }
            ); 
    
    }
    
    
    
    function payMidtrans(dataSendMidTrans){
        var payment_type=dataPayment.payment_type;
        var payment_sub=dataPayment.payment_sub;
        
        
        
        var transaction_details={
            gross_amount: totalPembayaran,
            order_id: dataSendMidTrans.id_invoice
        }
        var customer_details={
            email: dataBooking[0].contact.contact_email,
            first_name: dataBooking[0].contact.contact_first,
            last_name: dataBooking[0].contact.contact_last,
            phone: dataBooking[0].contact.contact_phone,
        }
        
        
        if(payment_type=='bank_transfer'){
            var paramPay={
                payment_type: payment_type,
                transaction_details: transaction_details,
                customer_details: customer_details,
                bank_transfer: {
                  bank: payment_sub
                }
            }
        }else if(payment_type=='credit_card'){
            var paramPay={
                payment_type: payment_type,
                transaction_details: transaction_details,
                customer_details: customer_details,
                credit_card: {
                    token_id: dataSendMidTrans.token,
                    authentication:false
                    
                }
            }
        }
        
        var param={
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Basic U0ItTWlkLXNlcnZlci1rYUg3VlctakNpVjAyOGtWcmJmbjZITGY6',
            },
            body: JSON.stringify(paramPay),
          }
       
         //var url='https://api.sandbox.midtrans.com/';
         var url=config.midtransUrl;
         //console.log('baseUrl',url);
         
         return PostDataNew(url,'v2/charge',param)
             .then((result) => {
                
                setLoading(false);
                
                var redirect='PembayaranDetail';
                    var param={
                        id_order:idOrder,
                        dataPayment:dataPayment
                    }
                navigation.navigate("Loading",{redirect:redirect,param:param});
                },
             (error) => {
                 this.setState({ error });
             }
        ); 

    
    }
    
    
    function changePayment(){
        var item=dataBooking[0];
        var order_payment_recent=item.order_payment_recent;
        var total_pembayaran=parseInt(order_payment_recent.iv_total_amount)-parseInt(fee);
        var paramPayMD={
            "total_pembayaran": total_pembayaran,
            "fee": "0",
            "id_invoice": order_payment_recent.id_invoice,
            "dataPayment": {
                "payment_type": "",
                "payment_type_label": "",
                "payment_sub": "",
                "payment_sub_label": ""
            }
        }
        //console.log('paramPayMD',JSON.stringify(paramPayMD));
       
        setLoading(true);
            //console.log("---------------paramPayMD ------------");
            //console.log(JSON.stringify(paramPayMD));

            
            var param={
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(paramPayMD),
              }
           
             var url=config.baseUrl;
             //console.log('baseUrl',url);
             
             return PostDataNew(url,'front/api/apiOrder/payment_update',param)
                 .then((result) => {
                        //     setLoading(false);
                        //    //console.log("---------------result payment md ------------");
                        //     //console.log(JSON.stringify(result));
                        //     var redirect='Pembayaran';
                        //     var param={
                        //         id_order:idOrder,
                        //         dataPayment:{}
                        //     }
                        //     navigation.navigate("Loading",{redirect:redirect,param:param});
                        var id_invoice=result.id_invoice;
                        // payMidtrans(id_invoice);
                        cancelMidtrans(id_invoice);
                 },
                 (error) => {
                     this.setState({ error });
                 }
            ); 
         
            
    }
    
    function cancelMidtrans(id_invoice){
        //var dataBooking=dataBooking;
        
        // var myHeaders = new Headers();
        // myHeaders.append("Accept", "application/json");
        // myHeaders.append("Content-Type", "application/json");
        // myHeaders.append("Authorization", "Basic U0ItTWlkLXNlcnZlci1rYUg3VlctakNpVjAyOGtWcmJmbjZITGY6");
        
        // var raw = "";
        
        // var requestOptions = {
        //   method: 'POST',
        //   headers: myHeaders,
        //   body: raw,
        //   redirect: 'follow'
        // };
        
        // return fetch("https://api.sandbox.midtrans.com/v2/"+order_code+"/cancel", requestOptions)
        //   .then(response => response.json())
        //   .then(result => {
        //                     setLoading(false);
        //                     //this.setState({ loading_spinner: false });
        //                     //console.log("---------------cancel midtrans ------------");
        //                     //console.log(JSON.stringify(result));
        //                     var redirect='Pembayaran';
        //                     var param={
        //                         id_order:this.state.id_order,
        //                         dataPayment:{}
        //                     }
        //                     navigation.navigate("Loading",{redirect:redirect,param:param});
        //   })
        //   .catch(error => //console.log('error', error)); 
          
          
          
        var order_code=id_invoice;
           
          var param={
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Basic U0ItTWlkLXNlcnZlci1rYUg3VlctakNpVjAyOGtWcmJmbjZITGY6',
            },
            //body: JSON.stringify(paramPay),
            redirect: 'follow'
          }
       
         //var url='https://api.sandbox.midtrans.com/';
         var url=config.midtransUrl;
         //console.log('baseUrl',url);
         
         return PostDataNew(url,"v2/"+order_code+"/deny",param)
             .then((result) => {
             
                            setLoading(false);
                            //this.setState({ loading_spinner: false });
                            //console.log("---------------cancel midtrans ------------");
                            //console.log(JSON.stringify(result));
                            var redirect='Pembayaran';
                            var param={
                                id_order:idOrder,
                                dataPayment:{}
                            }
                            navigation.navigate("Loading",{redirect:redirect,param:param});

                         
                },
             (error) => {
                 this.setState({ error });
             }
        ); 

    }
    
    
    
    function fetch(){

        
            AsyncStorage.getItem('userSession', (error, result) => {
            if (result) {
                AsyncStorage.getItem('config', (error, resultx) => {
                    if (resultx) {
                        let userSession = JSON.parse(result);
                        let config = JSON.parse(resultx);
                        
                        var id_user=userSession.id_user;
                        var url=config.baseUrl;
                        var path=config.user_order.dir;
                        
                        var data={"id":id_user,"id_order":idOrder,"id_order_status":"","product":""}
                        var parameter={"param":data}
                
                        var body=parameter;
                        console.log('bodyparamter',JSON.stringify(body));
                        
                        var param={
                            method: 'POST',
                            headers: {
                              Accept: 'application/json',
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(body),
                          }
                          
                          
                        return PostDataNew(url,path,param)
                            .then((result) => {
                                var dataBooking=result;
                                console.log("---------------get_booking_historyssss ------------");
                                console.log(JSON.stringify(result));
                                setLoading(false);
                                setDataBooking(dataBooking);
                                
                                //jika refresh setelah pembayaran lunas
                                var statusOrder=dataBooking[0].order_status.order_status_slug;
                                if(statusOrder=='complete'){
                                    var redirect='Pembayaran';
                                    var param={
                                        id_order:idOrder,
                                        dataPayment:{}
                                    }
                                    navigation.navigate("Loading",{redirect:redirect,param:param});
                                }else{
                                    //-------------------------------
                                    var order_payment_recent=dataBooking[0].order_payment_recent;
                                    var order_payment_num=dataBooking[0].order_payment_num;
                                    if(order_payment_recent != null){
                                        var id_invoice=order_payment_recent.id_invoice;
                                        if(order_payment_recent.payment_type==""){
                                            var payment_type=dataPayment.payment_type;
                                            var payment_sub=dataPayment.payment_sub;
                                        }else{
                                            var payment_type=order_payment_recent.payment_type;
                                            var payment_sub=order_payment_recent.payment_sub;
                                            fetchMidtrans(id_invoice);
                                        }
                                        
                                        var fee='';
                                        if(order_payment_num == 1){
                                            // if(payment_type=='bank_transfer'){
                                            //     fee=config.transaction_fee;
                                            // }
                                            fee=config.transaction_fee;
                                        }else{
                                            fee=0;
                                        }
                                        
                                        var totalPembayaran=parseInt(order_payment_recent.iv_amount)+parseInt(fee);
                                        setFee(fee);
                                        setTotalPembayaran(totalPembayaran);
                                    }
                                }
                                
                                
                            },
                            (error) => {
                                setState({ error });
                            }
                        ); 
                    }
                });
             }
            });
       
    
    }


    function fetchMidtrans(id_invoice){
          
          
          var param={
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Basic U0ItTWlkLXNlcnZlci1rYUg3VlctakNpVjAyOGtWcmJmbjZITGY6',
            },
            redirect: 'follow'
          }
       
         var url=config.midtransUrl;
         //console.log('baseUrl',url);
         
         return PostDataNew(url,"v2/"+id_invoice+"/status",param)
             .then((result) => {
                            var statusMidtrans=result;
                //console.log('status_midtransasd',JSON.stringify(result));
                setStatusMidtrans(statusMidtrans);

                },
             (error) => {
                 this.setState({ error });
             }
        ); 

    
    }
    
    function duration(expirydate)
    {
        
        var date = moment()
        var diffr = moment.duration(moment(expirydate).diff(moment(date)));
        var hours = parseInt(diffr.asHours());
        var minutes = parseInt(diffr.minutes());
        var seconds = parseInt(diffr.seconds());
        var d = hours * 60 * 60 + minutes * 60 + seconds;
        return d;
    
    }
    
    
    function content_countdown(){
        var item=dataBooking[0];
        var order_payment_recent=item.order_payment_recent;
        var countDown=<View></View>;
        
        if(order_payment_recent != null){
            var expiredTime=duration(order_payment_recent.expired);
            if(expiredTime > 0){
                countDown=<View style={{
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
                                                        Batas Waktu Pembayaran
                                                        </Text>
                                                    </View>
                                                </View>
                                                <View style={{flex: 4,justifyContent: "center",alignItems: "flex-end"}}>
                                                    <CountDown
                                                        size={12}
                                                        until={expiredTime}
                                                        // onFinish={() => alert('Finished')}
                                                        style={{float:'left'}}
                                                        digitStyle={{backgroundColor: '#FFF', borderWidth: 2, borderColor: BaseColor.primaryColor}}
                                                        digitTxtStyle={{color: BaseColor.primaryColor}}
                                                        timeLabelStyle={{color: BaseColor.primaryColor, fontWeight: 'bold'}}
                                                        separatorStyle={{color: BaseColor.primaryColor}}
                                                        timeToShow={['H', 'M', 'S']}
                                                        timeLabels={{m: null, s: null}}
                                                        showSeparator
                                                    />
                                                </View>
                                            </View>
                                        </View>
                    </View>
            }
        }
     
        
        
        return(
            <View>
                    {countDown}
            </View>
        )
    }
    
    
    
    function content_payment(){
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

        var order_payment_num=dataBooking[0].order_payment_num;
        var order_payment_recent=dataBooking[0].order_payment_recent;
        var content=<View></View>;
        var virtual_account='';
        
            if(order_payment_recent != null){
                if(order_payment_recent.payment_type==""){
                    var payment_type=dataPayment.payment_type;
                    var payment_sub=dataPayment.payment_sub;
                    virtual_account='';
                }else{
                    var payment_type=order_payment_recent.payment_type;
                    var payment_sub=order_payment_recent.payment_sub;
                    
                    if(payment_type=='bank_transfer'){
                        if(payment_sub=='bca'){
                            virtual_account=statusMidtrans.va_numbers[0].va_number;
                        }else if(payment_sub=='bni'){
                            virtual_account=statusMidtrans.va_numbers[0].va_number;
                        }else if(payment_sub=='permata'){
                            virtual_account=statusMidtrans.permata_va_number;
                        }
                    }
                    
                }
                
                
                if(order_payment_recent.payment_type == ""){
            
        
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
                                                                       No. Tagihan
                                                                    </Text>
                                                                </View>
                                                            </View>
                                                            <View style={{flex: 5,justifyContent: "center",alignItems: "flex-end"}}>
                                                                    <Text headline semibold numberOfLines={1}>
                                                                    {order_payment_recent.id_invoice}
                                                                    </Text>
                                                            </View>
                                                        </View>
                                            </View>
                                            <View style={{flexDirection:'row',paddingLeft:20,paddingRight:20,paddingTop:5,paddingBottom:5}} >
                                                <View style={{flexDirection:'row',flex: 10,justifyContent: "flex-start",alignItems: "center"}}>
                                                    <View style={{ flex: 5,flexDirection: "row",justifyContent: "flex-start",alignItems: "center"}}>
                                                        <View>
                                                            <Text>
                                                               Sub Total 
                                                            </Text>
                                                        
                                                        </View>
                                                    </View>
                                                    <View style={{flex: 5,justifyContent: "center",alignItems: "flex-end"}}>
                                                            <Text headline semibold numberOfLines={1}>
                                                            {'IDR '+priceSplitter(dataBooking[0].total_price)}
                                                            </Text>
                                                    </View>
                                                </View>
                                            </View>
                                            
                                            <View style={{flexDirection:'row',paddingLeft:20,paddingRight:20,paddingTop:5,paddingBottom:5}} >
                                                <View style={{flexDirection:'row',flex: 10,justifyContent: "flex-start",alignItems: "center",borderBottomWidth: 1,borderBottomColor: BaseColor.textSecondaryColor,borderBottomStyle: 'solid',paddingBottom:10}}>
                                                    <View style={{ flex: 5,flexDirection: "row",justifyContent: "flex-start",alignItems: "center"}}>
                                                        <View>
                                                            <Text>
                                                               Fee
                                                            </Text>
                                                        
                                                        </View>
                                                    </View>
                                                    <View style={{flex: 5,justifyContent: "center",alignItems: "flex-end"}}>
                                                            <Text headline semibold numberOfLines={1}>
                                                            {'IDR '+priceSplitter(fee)}
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
                                                            {'IDR '+priceSplitter(totalPembayaran)}
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
                                                        No. Tagihan
                                                    </Text>
                                                    <Text>
                                                        {order_payment_recent.id_invoice}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    
                                    
                                    <View style={{flexDirection:'row',paddingLeft:20,paddingRight:20,paddingTop:5,paddingBottom:5}} >
                                        <View style={{flexDirection:'row',flex: 10,justifyContent: "flex-start",alignItems: "center",borderBottomWidth: 1,borderBottomColor: BaseColor.textSecondaryColor,borderBottomStyle: 'solid',paddingBottom:10}}>
                                            <View style={{ flex: 8,flexDirection: "row",justifyContent: "flex-start",alignItems: "center"}}>
                                                <View>
                                                    <Text style={{color:BaseColor.grayColor,fontSize:12}}>
                                                        Transfer
                                                    </Text>
                                                    <Text>
                                                        {dataPayment.payment_sub_label} 
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
                                                        {dataBooking[0].order_payment_info.norek}
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={{flex:4,justifyContent: "center",alignItems: "flex-end"}}>
                                                    <Text></Text>
                                                    <TouchableOpacity onPress={() => Clipboard.setString(dataBooking[0].order_payment_info.norek)}>
                                                        <View>
                                                            <Text>
                                                                SALIN
                                                            </Text>
                                                          </View>
                                                    </TouchableOpacity>
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
                                                    {'IDR '+priceSplitter(order_payment_recent.iv_total_amount)}
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={{flex:4,justifyContent: "center",alignItems: "flex-end"}}>
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
                                                    <TouchableOpacity onPress={() => Clipboard.setString(virtual_account)}>
                                                        <View>
                                                            <Text>
                                                                SALIN
                                                            </Text>
                                                          </View>
                                                    </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                    
                                    
                                    
                                </View>
                            </View>
                
                    
                    
                }
            }
        
            
        
        return(
            <View>
                    {content}
            </View>
        )
    }
    
    
    function content_payment_form(){
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

        var order_payment_recent=dataBooking[0].order_payment_recent;
        var content=<View></View>;

            if(order_payment_recent != null){
                var cardNumberForm=<View style={{marginBottom: 10}}>
                                        <TouchableOpacity 
                                        style={{width:'100%'}}
                                    >
                                            <View style={styles.contentProfile}>
                                                <View style={{ flex: 6}}>
                                                <TextValidator
                                                name="cardNumber"
                                                label="cardNumber"
                                                validators={['required']}
                                                errorMessages={['This field is required']}
                                                placeholder="e.g., 4811 1111 1111 1114"
                                                type="text"
                                                // keyboardType="email-address"
                                                value={cardNumber}
                                                onChangeText={(cardNumber)=> {
                                                    setCardNumber(cardNumber);
                                                    setTimeout(() => {
                                                        validation();
                                                    }, 500);
                                                }}
                                                
                                               
                                            />
                                                </View>
                                               
                                            </View>
                                        </TouchableOpacity>
                                        
                                        <Text body2 style={{marginTop:-15,color:BaseColor.primaryColor}}>
                                             Card Number
                                        </Text>
                                        
            </View>
            
            
            var cardExpired=<View style={{marginBottom: 10}}>
                            <View style={{flexDirection: "row"}}>
                                <View style={{flex: 6,marginRight: 15}}>
                                    <TouchableOpacity 
                                    style={{width:'100%',flexDirection: "row"}}
                                    >
                                        <View style={styles.contentProfile}>
                                            <View style={{ flex: 6 }}>
                                            <TextValidator
                                                            name="firstname"
                                                            label="lastname"
                                                            validators={['required']}
                                                            errorMessages={['This field is required']}
                                                            placeholder="e.g., 01"
                                                            type="text"
                                                            value={cardExpMonth}
                                                            onChangeText={(cardExpMonth)=> {
                                                                setCardExpMonth(cardExpMonth);
                                                                setTimeout(() => {
                                                                    validation();
                                                                }, 500);
                                                                
                                                            }} 
                                                        />
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    <Text body2 style={{marginTop:-20,color:BaseColor.primaryColor}}>
                                        Month Expired
                                    </Text>
                                </View>                    
                                        
                                <View style={{flex: 6}}>

                                                    <TouchableOpacity 
                                                    style={{width:'100%',flexDirection: "row"}}
                                                >
                                                        <View style={styles.contentProfile}>
                                                            <View style={{ flex: 6 }}>
                                                                <TextValidator
                                                                    name="lastname"
                                                                    label="lastname"
                                                                    validators={['required']}
                                                                    errorMessages={['This field is required']}
                                                                    placeholder="e.g., 2025"
                                                                    type="text"
                                                                    value={cardExpYear}
                                                                    onChangeText={(cardExpYear)=> {
                                                                        setCardExpYear(cardExpYear);
                                                                        setTimeout(() => {
                                                                            validation();
                                                                        }, 500);
                                                                    }} 
                                                                />
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                    <Text body2 style={{marginTop:-20,color:BaseColor.primaryColor}}>
                                                        Year Expired
                                                    </Text>
                                </View>
                            </View>
                            
                       </View>
                
                
                
                var ccv=<View style={{marginBottom: 10}}>
                                        <TouchableOpacity 
                                        style={{width:'100%'}}
                                    >
                                            <View style={styles.contentProfile}>
                                                <View style={{ flex: 6}}>
                                                <TextValidator
                                                name="cardNumber"
                                                label="cardNumber"
                                                validators={['required']}
                                                errorMessages={['This field is required']}
                                                placeholder="e.g., 123"
                                                type="text"
                                                // keyboardType="email-address"
                                                value={cardCVV}
                                                onChangeText={(cardCVV)=> {
                                                    setCardCVV(cardCVV);
                                                    setTimeout(() => {
                                                        validation();
                                                    }, 500);
                                                }}
                                                
                                               
                                            />
                                                </View>
                                               
                                            </View>
                                        </TouchableOpacity>
                                        
                                        <Text body2 style={{marginTop:-15,color:BaseColor.primaryColor}}>
                                             CCV
                                        </Text>
                                        
            </View>
            
            if(order_payment_recent.payment_type==""){
                var payment_type=dataPayment.payment_type;
                var payment_sub=dataPayment.payment_sub;
                virtual_account='';
            }
            
             
                        if(payment_type=='credit_card'){
                            content=<View style={{
                                    borderWidth: 1, 
                                    borderColor: BaseColor.textSecondaryColor,
                                    borderRadius: 10,
                                    marginBottom:10,
                                    padding:10
                                    }}>
                                    <Form
                                        onSubmit={this.submit}
                                    >
                                    {cardNumberForm}
                                    {cardExpired}
                                    {ccv}
                                    </Form>
                                    </View>
                        }
                                    
                                
                            
            }
        
        return content;
            
        
        
    }
    
    function content_button(){
        //var dataBooking=dataBooking;
        //const { navigation} = props;
        //const {dataPayment,loading,dataBooking} =state;
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

        var order_payment_num=dataBooking[0].order_payment_num;
        var order_payment_recent=dataBooking[0].order_payment_recent;
        var content=<View></View>;
        
        if(order_payment_recent != null){
            if(order_payment_recent.payment_type == ""){
                var payment_type=dataPayment.payment_type;
                var payment_sub=dataPayment.payment_sub;
                if(payment_type=='bank_transfer'){
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
                                        {text: 'YES', onPress: () => submitPayment()},
                                      ]
                                    );
                            }}    
                            >
                                Bayar
                            </Button>
                    </View>
                    }else{
                        content=<View>
                                    <TouchableOpacity  disabled={disabledButton} 
                                        onPress={() => {
                                        Alert.alert(
                                            'Confirm',
                                            'Yakin ingin membayar tagihan ini ?',
                                            [
                                              {text: 'NO', onPress: () => console.warn('NO Pressed'), style: 'cancel'},
                                              {text: 'YES', onPress: () => submitPayment()},
                                            ]
                                          );
                                        }} 
                                        
                                        
                                        >
                                        <View pointerEvents='none' style={styles.groupinput}>
                                            <Button
                                                loading={loading}
                                                style={{backgroundColor:colorButton}}
                                                full
                                            >
                                                <Text style={{color:colorButtonText}}>Bayar</Text>
                                            </Button>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                    }
            }else{
                
                    
                content=<View>
                    {/* <View style={styles.contentButtonBottom}>
                            <Button
                                full
                                loading={loading}
                                onPress={() => { 
                                    onSubmit();
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
                                                {text: 'NO', onPress: () => //console.warn('NO Pressed'), style: 'cancel'},
                                                {text: 'YES', onPress: () => changePayment()},
                                              ]
                                            );
                                    }}
                                    style={{backgroundColor:BaseColor.grayColor}}
                                >
                                    <Text style={{color:BaseColor.whiteColor}}>Ganti Metode Pembayaran</Text>
                                </Button>
                        </View> */}
                    </View>
            
            }
        }
        
        return(
        
            <View>
                    {content}
            </View>
        )
    
    }
    
    
  useEffect(() => {
    getConfig();
    fetch();  
    
    fcmService.registerAppWithFCM()
    fcmService.register(onRegister, onNotification, onOpenNotification)
    localNotificationService.configure(onOpenNotification)
    

    function onRegister(token) {
        //console.log("[App] onRegister: ", token);
        AsyncStorage.setItem('tokenFirebase', token);
      }
  
    function onNotification(notify) {
        //console.log("[App] onNotification: ", notify)
        var body_msg=notify.body;
        var body_array = body_msg.split("|||");
        var message=body_array[0];
        var id_order=body_array[1];
        var id_invoice=body_array[2];
        
        
        //alert("Notification " + id_invoice);
        
        var redirect='PembayaranDetail';
        var param={
            id_order:idOrder,
            dataPayment:dataPayment
        }
        navigation.navigate("Loading",{redirect:redirect,param:param});
        
        const options = {
          soundName: 'default',
          playSound: true //,
          // largeIcon: 'ic_launcher', // add icon large for Android (Link: app/src/main/mipmap)
          // smallIcon: 'ic_launcher' // add icon small for Android (Link: app/src/main/mipmap)
        }
        localNotificationService.showNotification(
          0,
          notify.title,
          notify.body,
          notify,
          options
        )
      }
  
    function onOpenNotification(notify) {
        //console.log("[App] onOpenNotification: ", notify)
        //alert("Open Notification: " + notify.body)
      }
      
      return () => {
        //console.log("[App] unRegister")
        fcmService.unRegister()
        localNotificationService.unregister()
      }
  
    },[]);
    
    
    
    var payment_type=dataPayment.payment_type;
    var title='';
    if(payment_type=='bank_transfer'){
        title=dataPayment.payment_type_label+' - '+dataPayment.payment_sub_label;
    }else if(payment_type=='credit_card'){
        title=dataPayment.payment_type_label;
    }
    

  return (
      
        
    <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: "always" }}
    >
        <Header
            title={title}
            subTitle={'No.Order :'+dataBooking[0].order_code}
            renderLeft={() => {
                return (
                    <Icon
                        name="arrow-left"
                        size={20}
                        color={BaseColor.blackColor}
                    />
                );
            }}
            onPressLeft={() => {
                navigation.goBack();
            }}
        />
      
        {
                        loading ? 
                        
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
                                    overlayColor="rgba(255,255,255,0.1)"
                                    source={require("app/assets/loader_paperline.json")}
                                    animationStyle={{width: 300,height: 300}}
                                    speed={1}
                                  />
                                <Text>
                                    Connecting.. to Masterdiskon
                                </Text>
                            </View>
                        </View>
                        :
        <ScrollView>
            <View  style={{ padding: 20 }}>
                {/* {content_countdown()}
                {content_payment()}
                {content_button()} */}
                
                
                
                {content_countdown()}
                {content_payment()}
                {content_payment_form()}
                {content_button()}
            </View>
        </ScrollView>
        }
        
    </SafeAreaView>
    );
}