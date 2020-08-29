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
import CountDown from 'react-native-countdown-component';
import AnimatedLoader from "react-native-animated-loader";
import moment from 'moment';
import {PostDataNew} from '../../services/PostDataNew';
import Barcode from "react-native-barcode-builder";
import CardCustomProfile from "../../components/CardCustomProfile";

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
        //var id_order=props.navigation.state.params.param;
        
        var param=props.navigation.state.params.param;
        var id_order=param.id_order;
        // var id_invoice=param.id_invoice;
        super(props);
        this.state = {
            id_order:id_order,
            pnrDeparture:'-',
            pnrReturns:'-',
            order_id_aero:'',//untuk chek booking aero,
            dataDeparture:{
                "item_id": "3806ad46-bd0d-4cd1-bf3a-c3158e731782",
                "origin": "CGK",
                "origin_name": "Soekarno-Hatta International Airport",
                "destination": "DPS",
                "destination_name": "Ngurah Rai (Bali) International Airport",
                "url_logo": "https://megaelectra-dev-new.oss-ap-southeast-5.aliyuncs.com/83493b9f-84ee-4c46-9408-7ef9aca29442.logo",
                "airline": "CITILINK INDONESIA",
                "airline_code": "QG",
                "pnr": "C6Q3NI",
                "gmt_departure": "2020-08-04T21:55:00",
                "gmt_arrival": "2020-08-04T23:55:00",
                "departure_time": "04:55:00",
                "arrival_time": "07:55:00",
                "flight_segment": null,
                "price_pax": [
                    {
                        "pax_type": "ADT",
                        "count": 1,
                        "price": 740800.0
                    },
                    {
                        "pax_type": "ADT",
                        "count": 1,
                        "price": 795800.0
                    }
                ],
                "trans_information_details": [
                    {
                        "cabinClass": "Economy",
                        "subClass": "N",
                        "paxName": "NdaruKurniawan",
                        "paxType": "Adult",
                        "ticketNumber": "N/A",
                        "picEmail": "kurniandaru@gmail.com",
                        "baggage": "20",
                        "requestStatus": false,
                        "insurance": false
                    }
                ]
            },
            dataReturns:null,
            
            //id_invoice:id_invoice,
            dataBooking:DataBooking,
            payment: [
                {
                    payment_type:"bank_transfer",
                    payment_type_label: "Bank Transfer",
                    subPayment:[
                                    {
                                        payment_sub:"bca",
                                        payment_sub_label:"BCA",
                                        icon:"",
                                    },
                                    {
                                        payment_sub:"bni",
                                        payment_sub_label:"BNI",
                                        icon:"",
                                    },
                                    {
                                        payment_sub:"permata",
                                        payment_sub_label:"PERMATA",
                                        icon:"",
                                    },
                                   
                                    
                                ]
                },
                {
                    payment_type:"credit_card",
                    payment_type_label: "Kartu Kredit",
                    subPayment:[
                                    {
                                        payment_sub:"visa_mastercard",
                                        payment_sub_label:"Kartu Kredit",
                                        icon:"",
                                    }
                                ]
                },
            ],
        };

        this.getConfig();
        this.getSession();
    }

    getConfig(){    
        AsyncStorage.getItem('config', (error, result) => {
            if (result) {    
                let config = JSON.parse(result);
                //console.log('getConfig',config);
                this.setState({config:config});
            }
        });
    }
    
    
    getSession(){    
        AsyncStorage.getItem('userSession', (error, result) => {
            if (result) {    
                let userSession = JSON.parse(result);
                var id_user=userSession.id_user;
                //console.log('getSession',userSession);
                this.setState({id_user:id_user});
                this.setState({userSession:userSession});
                this.setState({login:true});
            }
        });
    }


    duration(expirydate)
    {
        
        var date = moment()
        var diffr = moment.duration(moment(expirydate).diff(moment(date)));
        var hours = parseInt(diffr.asHours());
        var minutes = parseInt(diffr.minutes());
        var seconds = parseInt(diffr.seconds());
        var d = hours * 60 * 60 + minutes * 60 + seconds;
        return d;
    
    }
    
    content_countdown(){
        var item=this.state.dataBooking[0];
        var order_payment_recent=item.order_payment_recent;
        var countDown=<View></View>;
        
        
        if(order_payment_recent != null){
            var expiredTime=this.duration(order_payment_recent.expired);
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
    
    
    
    content_payment(){
        
        var item=this.state.dataBooking[0];
        var order_payment_recent=item.order_payment_recent;
        var order_payment=item.order_payment;
        var order_expired=item.order_expired;
        var expiredTime=this.duration(order_expired);
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

        var content='';
        var content_tagihan=<View></View>;
        var content_invoice=<View></View>;
        var content_countdown=<View></View>;

        
        
       
        content_order=<View style={{flexDirection:'row',paddingLeft:20,paddingRight:20,paddingTop:5,paddingBottom:5,borderBottomWidth: 1,borderBottomColor: BaseColor.textSecondaryColor,borderBottomStyle: 'solid',paddingBottom:10}} >
                                    <View style={{flexDirection:'row',flex: 11,justifyContent: "flex-start",alignItems: "center"}}>
                                        <View style={{ flex: 5,flexDirection: "row",justifyContent: "flex-start",alignItems: "center"}}>
                                            <View>
                                                <Text>
                                                   No. Order
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={{flex: 5,justifyContent: "center",alignItems: "flex-end"}}>
                                                <Text headline semibold numberOfLines={1}>
                                                {this.state.dataBooking[0].order_code}
                                                </Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity
                                        style={{flex: 1}}
                                        onPress={() => {
                                            this.props.navigation.navigate("PreviewBooking",{
                                                item:item
                                            });
                                            }
                                        }
                                    >
                                                     <Icon
                                                        name="angle-down"
                                                        size={18}
                                                        color={BaseColor.primaryColor}
                                                        style={{ textAlign: "center"}}
                                                    />
                                    </TouchableOpacity>
                                </View>
        if (item.product=='Flight' || item.product=='Voucher'  || item.product=='Hotelpackage' || item.product=='Hotel'){
            if(order_payment_recent != null){
                var expiredTime=this.duration(order_payment_recent.expired);
                content_invoice=<View style={{flexDirection:'row',paddingLeft:20,paddingRight:20,paddingTop:5,paddingBottom:5}} >
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
                if(expiredTime > 0){
                    content_tagihan=<View style={{flexDirection:'row',paddingLeft:20,paddingRight:20,paddingTop:5,paddingBottom:5}} >
                                        <View style={{flexDirection:'row',flex: 10,justifyContent: "flex-start",alignItems: "center"}}>
                                            <View style={{ flex: 5,flexDirection: "row",justifyContent: "flex-start",alignItems: "center"}}>
                                                <View>
                                                    <Text>
                                                       Tagihan
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={{flex: 5,justifyContent: "center",alignItems: "flex-end"}}>
                                                    <Text headline semibold numberOfLines={1}>
                                                    Rp {priceSplitter(order_payment_recent.iv_total_amount)}
                                                    </Text>
                                            </View>
                                        </View>
                                    </View>
                                    
                    content_countdown=<View style={{flexDirection:'row',paddingLeft:20,paddingRight:20,paddingTop:5,paddingBottom:5}} >
                                    <View style={{flexDirection:'row',flex: 10,justifyContent: "flex-start",alignItems: "center"}}>
                                        <View style={{ flex: 5,flexDirection: "row",justifyContent: "flex-start",alignItems: "center"}}>
                                            <View>
                                                <Text>
                                                   Batas Pembayaran
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={{flex: 5,justifyContent: "center",alignItems: "flex-end"}}>
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
                    
                }else{
                    if(item.order_status.order_status_slug=='new'){
                        content_tagihan=<View style={{flexDirection:'row',paddingLeft:20,paddingRight:20,paddingTop:5,paddingBottom:5}} >
                                        <View style={{flexDirection:'row',flex: 10,justifyContent: "flex-start",alignItems: "center"}}>
                                            <View style={{ flex: 5,flexDirection: "row",justifyContent: "flex-start",alignItems: "center"}}>
                                                <View>
                                                    <Text>
                                                       Tagihan
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={{flex: 5,justifyContent: "center",alignItems: "flex-end"}}>
                                                    <Text headline semibold numberOfLines={1}>
                                                    Rp {priceSplitter(order_payment_recent.iv_total_amount)}
                                                    </Text>
                                            </View>
                                        </View>
                                    </View>                        
                    }else{
                        content_tagihan=<View style={{flexDirection:'row',paddingLeft:20,paddingRight:20,paddingTop:5,paddingBottom:5}} >
                                        <View style={{flexDirection:'row',flex: 10,justifyContent: "flex-start",alignItems: "center"}}>
                                            <View style={{ flex: 5,flexDirection: "row",justifyContent: "flex-start",alignItems: "center"}}>
                                                <View>
                                                    <Text>
                                                       Tagihan
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={{flex: 5,justifyContent: "center",alignItems: "flex-end"}}>
                                                    <Text headline semibold numberOfLines={1}>
                                                    Rp {priceSplitter(order_payment_recent.iv_total_amount)}
                                                    </Text>
                                            </View>
                                        </View>
                                    </View>
                        
                    }
                }
            }else{
                content_invoice=<View style={{flexDirection:'row',paddingLeft:20,paddingRight:20,paddingTop:5,paddingBottom:5}} >
                                    <View style={{flexDirection:'row',flex: 10,justifyContent: "flex-start",alignItems: "center"}}>
                                        <View style={{ flex: 5,flexDirection: "row",justifyContent: "flex-start",alignItems: "center"}}>
                                            <View>
                                                <Text>
                                                   No. Pembayaran
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={{flex: 5,justifyContent: "center",alignItems: "flex-end"}}>
                                                <Text headline semibold numberOfLines={1}>
                                                {order_payment[0].id_invoice}
                                                </Text>
                                        </View>
                                    </View>
                                </View>
            
                content_tagihan=<View style={{flexDirection:'row',paddingLeft:20,paddingRight:20,paddingTop:5,paddingBottom:5}} >
                                        <View style={{flexDirection:'row',flex: 10,justifyContent: "flex-start",alignItems: "center"}}>
                                            <View style={{ flex: 5,flexDirection: "row",justifyContent: "flex-start",alignItems: "center"}}>
                                                <View>
                                                    <Text>
                                                       Terbayar
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={{flex: 5,justifyContent: "center",alignItems: "flex-end"}}>
                                                    <Text headline semibold numberOfLines={1}>
                                                    Rp {priceSplitter(order_payment[0].iv_total_amount)}
                                                    </Text>
                                            </View>
                                        </View>
                                    </View>
                
            }
        }else{
        
            var payArray = [];
            var a=1;
            order_payment.map(item => {
                payArray.push(
                            <View style={{borderBottomWidth: 1,borderBottomColor: BaseColor.textSecondaryColor,borderBottomStyle: 'solid',paddingBottom:10}}>
                            <View style={{flexDirection:'row',paddingLeft:20,paddingRight:20,paddingTop:5,paddingBottom:5}} >
                                <View style={{flexDirection:'row',flex: 10,justifyContent: "flex-start",alignItems: "center"}}>
                                    <View style={{ flex: 5,flexDirection: "row",justifyContent: "flex-start",alignItems: "center"}}>
                                        <View>
                                            <Text>
                                               No. Tagihan {a}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{flex: 5,justifyContent: "center",alignItems: "flex-end"}}>
                                            <Text headline semibold numberOfLines={1}>
                                            {item.id_invoice}
                                            </Text>
                                    </View>
                                </View>
                            </View>
                            
                            <View style={{flexDirection:'row',paddingLeft:20,paddingRight:20,paddingTop:5,paddingBottom:5}} >
                                        <View style={{flexDirection:'row',flex: 10,justifyContent: "flex-start",alignItems: "center"}}>
                                            <View style={{ flex: 5,flexDirection: "row",justifyContent: "flex-start",alignItems: "center"}}>
                                                <View>
                                                    { 
                                                    item.pay_status === "settlement" ?
                                                            <Text>Terbayar</Text>
                                                           :
                                                           <Text>Tagihan</Text>
                                                    }
                                                </View>
                                            </View>
                                            <View style={{flex: 5,justifyContent: "center",alignItems: "flex-end"}}>
                                                    <Text headline semibold numberOfLines={1}>
                                                    Rp {priceSplitter(item.iv_total_amount)}
                                                    </Text>
                                            </View>
                                        </View>
                            </View>
                            
                            <View style={{flexDirection:'row',paddingLeft:20,paddingRight:20,paddingTop:5,paddingBottom:5}} >
                                    <View style={{flexDirection:'row',flex: 10,justifyContent: "flex-start",alignItems: "center"}}>
                                        <View style={{ flex: 5,flexDirection: "row",justifyContent: "flex-start",alignItems: "center"}}>
                                            <View>
                                                { 
                                                    item.pay_status === "settlement" ?
                                                            <Text>Status</Text>
                                                           :
                                                           <Text>Batas Pembayaran</Text>
                                                }
                                            </View>
                                        </View>
                                        <View style={{flex: 5,justifyContent: "center",alignItems: "flex-end"}}>
                                                { 
                                                    item.pay_status === "settlement" ?
                                                            <Text>Lunas</Text>
                                                           :
                                                           <CountDown
                                                                size={12}
                                                                until={this.duration(item.expired)}
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
                                                }
                                                    
                                                    
                                        </View>
                                    </View>
                                </View>
                        </View>
                    
                );
                a++;
            });
        
        }
        var content=<View></View>
        if (item.product=='Flight' || item.product=='Voucher'  || item.product=='Hotelpackage' || item.product=='Hotel'){
            content=<View style={{
                        borderWidth: 1, 
                        borderColor: BaseColor.textSecondaryColor,
                        borderRadius: 10,
                        marginBottom:10,
                        padding:10
                        }}>
                
                        {content_order}
                        {content_invoice}
                        {content_tagihan}
                        {content_countdown}
                    </View>
        }else{
            content=<View style={{
                        borderWidth: 1, 
                        borderColor: BaseColor.textSecondaryColor,
                        borderRadius: 10,
                        marginBottom:10,
                        padding:10
                        }}>
                
                        {content_order}
                        {payArray}
                    </View>
        }

        
        return(
            <View>
                {content}
            </View>
        )
    }
    
    
    content_bank(){
        var item=this.state.dataBooking[0];
        var order_payment_recent=item.order_payment_recent;
        var order_expired=item.order_expired;
        var expiredTime=this.duration(order_expired);
        var content=<View></View>
        var status_name='';
        var content=<View></View>


        
        const { navigation} = this.props;
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
        var content_bank = [];
        this.state.payment.map((item, index) => (
            content_bank.push(<View>
                <Text title3 semibold>
                    {item.payment_type_label}
                </Text>
                <Bank 
                    id_order={this.state.id_order} 
                    payment={item} 
                    subPayment={item.subPayment} 
                    navigation={navigation} 
                    />
            </View>
            )
        ))
      
      
        if(order_payment_recent != null){
            var expiredTime=this.duration(order_payment_recent.expired);

            if(expiredTime > 0){
                status_name=item.order_status.order_status_name;
                content=content_bank;
            }else{
                if(item.order_status.order_status_slug=='new'){
                    status_name='Expired';
                    content=<View
                        style={{
                            borderWidth: 1, 
                            borderColor: BaseColor.textSecondaryColor,
                            borderRadius: 10,
                            marginBottom:10,
                            padding:10,
                            justifyContent: 'center', alignItems: 'center'
                            }}
                        >
                            <Icon
                                name="times-circle"
                                size={50}
                                color={BaseColor.thirdColor}
                                solid
                            />
                            <Text style={{fontSize:50}}>
                                {status_name}
                            </Text>
                        </View>
                }else{
                    status_name=item.order_status.order_status_name;
                    content=<View
                        style={{
                            borderWidth: 1, 
                            borderColor: BaseColor.textSecondaryColor,
                            borderRadius: 10,
                            marginBottom:10,
                            padding:10,
                            justifyContent: 'center', alignItems: 'center'
                            }}
                        >
                            <Icon
                                name="times-circle"
                                size={50}
                                color={BaseColor.thirdColor}
                                solid
                            />
                            <Text style={{fontSize:50}}>
                                {status_name}
                            </Text>
                        </View>
                }
            
            }
        }else{
            status_name=item.order_status.order_status_name;
            content=<View
                        style={{
                            borderWidth: 1, 
                            borderColor: BaseColor.textSecondaryColor,
                            borderRadius: 10,
                            marginBottom:10,
                            padding:10,
                            justifyContent: 'center', alignItems: 'center'
                            }}
                        >
                            <Icon
                                name="check-circle"
                                size={50}
                                color={'green'}
                                solid
                            />
                            <Text style={{fontSize:50}}>
                                {status_name}
                            </Text>
                        </View>
           
        }
        
        
        return(
            <View>
                    {content}
            </View>
        )
    }
    
    content_booking_code(){
        var item=this.state.dataBooking[0];
        var dataDeparture=this.state.dataDeparture;
        var dataReturns=this.state.dataReturns;
        var order_id_aero=this.state.order_id_aero;
        
        

        if(dataReturns != null){
        
        
        var content_returns=<CardCustomProfile 
                                    title={'E-Ticket Returns'}
                                    subtitle={'Check tiket kepulangan Anda'}
                                    icon={'tag'}
                                    onPress={() => {
                                        this.props.navigation.navigate("Eticket",
                                        {order_id_aero:order_id_aero,dataFlight:dataReturns,type:'Returns'});
                                    }}
                                
                                />
                            }
                                
        var content=<View></View>
        if(item.product=='Flight' && item.order_status.order_status_slug=='complete'){
            var order_detail=item.detail[0].order_detail[0];
            content=<View
                        style={{
                            borderWidth: 1, 
                            borderColor: BaseColor.textSecondaryColor,
                            borderRadius: 10,
                            marginBottom:10,
                            }}
                        >
                                <CardCustomProfile 
                                    title={'E-Ticket Departure'}
                                    subtitle={'Check tiket keberangkatan Anda'}
                                    icon={'tag'}
                                    onPress={() => {
                                        this.props.navigation.navigate("Eticket",{order_id_aero:order_id_aero,dataFlight:dataDeparture,type:'Departure'});
                                    }}
                                
                                />
                            {content_returns}
                                
                                
                        </View>
                        
        
        }
        
        return(
            <View>
                    {content}
            </View>
        )
        
    
    }

    
    componentDidMount(){
        const {navigation} = this.props;
        navigation.addListener ('willFocus', () =>{
            this.setState({ loading_spinner: true });
            setTimeout(() => {
                this.fetch();
            }, 200);
        });
    }

    fetch(){
        const {config} =this.state;
        var url=config.baseUrl;
        var path=config.user_order.dir;
        
        var id_user=this.state.id_user;
        var data={"id":id_user,"id_order":"","order_status":"","product":""}
        var parameter={"param":data}

        var body=parameter;
        //console.log('bodyparamter',JSON.stringify(body));
        this.setState({ loading_spinner: true }, () => {
            var param={
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
              }
             PostDataNew(url,path,param)
                 .then((result) => {
                    var dataBooking=result;
                            //console.log("---------------get_booking_historys ------------");
                            //console.log(JSON.stringify(result));
                            
                            this.setState({ loading_spinner: false });
                            this.setState({dataBooking:dataBooking});
                            
                            var order_status=dataBooking[0].order_status.order_status_slug;
                            var product=dataBooking[0].product;
                            
                            if(product=='Flight' && order_status=='complete'){
                                var order_code=dataBooking[0].aero_orderid;
                                this.checkBooking(order_code);
                            }
                 },
                 (error) => {
                     this.setState({ error });
                 }
            ); 
        });
    }
    
    
    checkBooking(order_code){
    
        AsyncStorage.getItem('config', (error, result) => {
            if (result) {    
                
                
                let config = JSON.parse(result);
                var access_token=config.token;
                var url=config.aeroUrl;

                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("Authorization", "Bearer "+access_token);


                var raw = JSON.stringify();
                var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
                };
                
                PostDataNew(url,'crm/MyOrder/v3/'+order_code,requestOptions)
                             .then((result) => {
                                this.setState({dataBookingAero:result.data});
                                
                                var order_id_aero=result.data.order_id;
                                var dataDeparture=result.data.orders[0].items[0].departure;
                                var pnrDeparture=result.data.orders[0].items[0].departure.pnr;
                                
                                this.setState({order_id_aero:order_id_aero});
                                
                                this.setState({dataDeparture:dataDeparture});
                                this.setState({pnrDeparture:pnrDeparture});
                                
                                var dataReturns=result.data.orders[0].items[0].returns;
                                this.setState({dataReturns:dataReturns});

                                if(dataReturns != null){
                                    var pnrReturns=result.data.orders[0].items[0].returns.pnr;
                                    this.setState({pnrReturns:pnrReturns});
                                }
                                
                                
                               
                             },
                             (error) => {
                                 this.setState({ error });
                             }
                ); 

                
                
                
            }
        });
    }
    

    render() {
        const { navigation} = this.props;
        const {id_order,loading_spinner} =this.state;
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

        return (
      
        
            <SafeAreaView
            style={BaseStyle.safeAreaView}
            forceInset={{ top: "always" }}
        >
            <Header
                title="Pembayaran"
                subTitle={'No.Order :'+this.state.dataBooking[0].order_code}
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
                {this.content_payment()}
                {this.content_booking_code()}
                {this.content_bank()}    
                </View>
            </ScrollView>
            }
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
                                                    payment_type:this.props.payment.payment_type,
                                                    payment_type_label:this.props.payment.payment_type_label,
                                                    payment_sub:item.payment_sub,
                                                    payment_sub_label:item.payment_sub_label,
                                                }
                                                
                                var param={
                                    id_order:this.props.id_order,
                                    dataPayment:dataPayment
                                }
                                //console.log('dataPayment',JSON.stringify(dataPayment));
                                navigation.navigate("PembayaranDetail",{
                                    param:param,
                                });
                            }}
                        >
                            <Text body1>{item.payment_sub_label}</Text>
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

