import React, { Component } from "react";
import {
    FlatList,
    RefreshControl,
    View,
    Animated,
    Platform,
    ActivityIndicator,
    ScrollView,
    Alert,
    TouchableOpacity
} from "react-native";

import { BaseStyle, BaseColor } from "@config";
import {
    Header,
    SafeAreaView,
    Icon,
    FilterSort,Text,Button
} from "@components";
import styles from "./styles";
import { FlightData } from "@data";
import {PostData} from '../../services/PostData';
import {AsyncStorage} from 'react-native';
import CartCard from "../../components/CartCard";
import ActionCart from "../../components/ActionCart";
import DropdownAlert from 'react-native-dropdownalert';
import ButtonOrder from "../../components/ButtonOrder";

import moment from 'moment';
import { cos } from "react-native-reanimated";



export default class CheckOut extends Component {
    constructor(props) {
        super(props);
        item=this.props.navigation.state.params.item;
        
        
        AsyncStorage.getItem('userSession', (error, result) => {
            if (result) {
                let userSession = JSON.parse(result);
                //console.log("---------------data session user  ------------");
                //console.log(JSON.stringify(userSession));
                this.setState({userSession:userSession});
                this.setState({login:true});

                // var id_user='9';
                var id_user=userSession.id_user;
                this.setState({id_user:id_user});
               
             }
            
        });

        this.state = {
            item:item
        };
        
        this.onSubmit = this.onSubmit.bind(this);
       
        
    }

  
    componentDidMount() {
        
    }
    
    
    deleteCart(idCart){
        AsyncStorage.getItem('dataCartArray', (error, result) => {
            if (result) {
                let dataCartArray = JSON.parse(result);
                dataCartArray = dataCartArray.filter(item => item.id != idCart);
                AsyncStorage.setItem('dataCartArray', JSON.stringify(dataCartArray));
                AsyncStorage.setItem('dataCartArrayReal', JSON.stringify(dataCartArray));
                
             }
            
        });
    }

    onSubmit(){
        this.setState({ loading: true }, () => {
            AsyncStorage.getItem('config', (error, result) => {
                if (result) {    
                    
                    
                    let config = JSON.parse(result);
                    var access_token=config.token;
                    var url=config.aeroUrl;
                    
                    
                    var dataCartArrayRealSend={
                    "cart_select":[this.state.item],
                    "token":access_token,
                    "id_user":this.state.id_user,
                    "dataCart":this.state.item,
                    "dataSavePerson":{
                        "participant":this.state.item.participant
                    },
                    "paramOther":{
                        "type":this.state.item.typeProduct
                        },
                    }
                    
                    //console.log("---------------data cart array cart kirim  ------------");
                    //console.log(JSON.stringify(dataCartArrayRealSend));

             
                    
                    var myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");


                    var raw = JSON.stringify(dataCartArrayRealSend);
                    var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                    };

                    // fetch("https://masterdiskon.com/front/api/apiOrder/submit", requestOptions)
                    // .then(response => response.json())
                    // .then((result) => {
                    //     var dataOrderSubmit=result;
                    //     //console.log("---------------status carts-------------");
                    //     //console.log(JSON.stringify(dataOrderSubmit));
                    //         this.setState({ loading: false });
                            
                                
                                
                    //             id_order=result.id_order;
                    //             pay=result.pay;
    
                    //             var redirect='Pembayaran';
                    //             setTimeout(() => {
                    //                 var idCart=this.state.item.id;
                    //                 this.deleteCart(idCart);
                    //                 var id_order=dataOrderSubmit.id_order;
                    //                 this.props.navigation.navigate("Loading",{redirect:redirect,param:id_order});
                    //             }, 500);
                               
                    // });

                }
            });
        });

    }





    setPayment(payment_method,payment_method_title){
        this.setState({payment_method: payment_method});
        this.setState({payment_method_title: payment_method_title});
    }
    
    
    renderContent() {
        var item=this.state.item;
        
        var content=<View></View>
        if(item.typeProduct=="flight"){
            content=this.renderContentFlight();
        }
        return (
            <View style={{ flex: 1 }}>
                {content}
                
            </View>
        );
    }

    convertDate(date){
        var d = new Date(date);
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        return days[d.getDay()]+", "+d.getDate()+" "+months[d.getMonth()]+" "+d.getFullYear();
    }
    
    renderContentFlight(){
        var item=this.state.item;
        
        var content_return_flight=<View></View>
        if(item.return_flight != null){
            content_return_flight=<View>
            <View style={{ marginTop: '2%', }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Return Information</Text>
            </View>
            
            <View style={{ borderBottomWidth: 0.5, borderColor: 'grey', paddingVertical: '4%' }}>
                <View style={{ alignItems: 'stretch', justifyContent: 'space-between', flexDirection: 'row', marginBottom: '2%' }}>
                    <Text>DEPARTURE</Text>
                    <Text>ARRIVAL</Text>
                </View>
                <View style={{ alignItems: 'stretch', justifyContent: 'space-between', flexDirection: 'row' }}>
                    <Text style={{ fontWeight: 'bold' }}>{this.convertDate(item.return_flight.schedules[0].departure_date)}</Text>
                    <Text style={{ fontWeight: 'bold' }}>{this.convertDate(item.return_flight.schedules[0].arrival_date)}</Text>
                </View>
                <View style={{ alignItems: 'stretch', justifyContent: 'space-between', flexDirection: 'row' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{item.return_flight.schedules[0].departure_time}</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 15, }}>{item.return_flight.schedules[0].arrival_time}</Text>
                </View>
            </View>
            
            <View style={{ borderBottomWidth: 0.5, borderColor: 'grey',paddingVertical: '4%' }}>
                <View style={{ alignItems: 'stretch', justifyContent: 'space-between', flexDirection: 'row', marginBottom: '2%' }}>
                    <Text>DURATION</Text>
                    <Text>CABIN</Text>
                </View>
                <View style={{ alignItems: 'stretch', justifyContent: 'space-between', flexDirection: 'row' }}>
                    <Text style={{ fontWeight: 'bold' }}>{item.return_flight.duration}</Text>
                    <Text style={{ fontWeight: 'bold' }}>{item.return_flight.cabin_code} / {item.return_flight.cabin_name}</Text>
                </View>
            </View>
            
            <View style={{ paddingVertical: '4%' }}>
                <View style={{ alignItems: 'stretch', justifyContent: 'space-between', flexDirection: 'row', marginBottom: '2%' }}>
                    <Text>FLIGHT CODE</Text>
                    <Text>FLIGHT NUMBER</Text>
                    <Text>SUB CLASS</Text>
                </View>
                <View style={{ alignItems: 'stretch', justifyContent: 'space-between', flexDirection: 'row' }}>
                    <Text style={{ fontWeight: 'bold' }}>{item.return_flight.schedules[0].flight_code}</Text>
                    <Text style={{ fontWeight: 'bold' }}>{item.return_flight.schedules[0].flight_number}</Text>
                    <Text style={{ fontWeight: 'bold' }}>{item.return_flight.schedules[0].sub_class}</Text>
                </View>
            </View>
        </View>
        }
        
        
        var content_passanger=<View></View>
        var content_passanger = [];
        item.pax.map(item => {
            content_passanger.push(<View style={{ paddingVertical: '4%' }}>
                                <View style={{ alignItems: 'stretch', justifyContent: 'space-between', flexDirection: 'row', marginBottom: '2%' }}>
                                    <Text>NAME</Text>
                                    <Text>TYPE</Text>
                                </View>
                                <View style={{ alignItems: 'stretch', justifyContent: 'space-between', flexDirection: 'row' }}>
                                    <Text style={{ fontWeight: 'bold' }}>{item.title} {item.first_name} {item.last_name}</Text>
                                    <Text style={{ fontWeight: 'bold' }}>{item.type_name}</Text>
                                </View>
                            </View>)
        });
        var content=<View style={styles.contain}>
                        <View style={{ marginTop: '2%', }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Flight Information</Text>
                        </View>
                
                        {/* <View style={{ borderBottomWidth: 0.5, borderColor: 'grey', paddingVertical: '4%' }}>
                            <View style={{ alignItems: 'stretch', justifyContent: 'space-between', flexDirection: 'row' }}>
                                <Text>11057</Text>
                                <Text>TICKET FARE</Text>
                            </View>
                            <View style={{ alignItems: 'stretch', justifyContent: 'space-between', flexDirection: 'row' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 17 }}>CSMT ASR EXPRESS</Text>
                                <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'green' }}>1.310.98</Text>
                            </View>
                        </View> */}
                        
                        <View style={styles.contentTop}>
                            <View style={{ flex: 1 }}>
                                <Text title2>{item.origin.id}</Text>
                                <Text footnote light>
                                    {item.origin.name}
                                </Text>
                            </View>
                            <View style={{ flex: 1.5, alignItems: "center" }}>
                                <Text caption1 light>
                                   Flight Type
                                </Text>
                                <View style={styles.contentLine}>
                                    <View style={styles.lineFlight} />
                                    <Icon
                                        name="plane"
                                        color={BaseColor.dividerColor}
                                        size={24}
                                        solid
                                    />
                                    <View style={styles.dot} />
                                </View>
                                <Text caption1 light>
                                {item.type_name}
                                </Text>
                            </View>
                            <View style={{ flex: 1, alignItems: "flex-end" }}>
                                <Text title2>{item.destination.id}</Text>
                                <Text footnote light style={{textAlign:'right'}}>
                                    {item.destination.name}
                                </Text>
                            </View>
                        </View>
                        
                        
                        
                        <View>
                            <View style={{ marginTop: '2%', }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Departure Information</Text>
                            </View>
                            
                            <View style={{ borderBottomWidth: 0.5, borderColor: 'grey', paddingVertical: '4%' }}>
                                <View style={{ alignItems: 'stretch', justifyContent: 'space-between', flexDirection: 'row', marginBottom: '2%' }}>
                                    <Text>DEPARTURE</Text>
                                    <Text>ARRIVAL</Text>
                                </View>
                                <View style={{ alignItems: 'stretch', justifyContent: 'space-between', flexDirection: 'row' }}>
                                    <Text style={{ fontWeight: 'bold' }}>{this.convertDate(item.departure_flight.schedules[0].departure_date)}</Text>
                                    <Text style={{ fontWeight: 'bold' }}>{this.convertDate(item.departure_flight.schedules[0].arrival_date)}</Text>
                                </View>
                                <View style={{ alignItems: 'stretch', justifyContent: 'space-between', flexDirection: 'row' }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{item.departure_flight.schedules[0].departure_time}</Text>
                                    <Text style={{ fontWeight: 'bold', fontSize: 15, }}>{item.departure_flight.schedules[0].arrival_time}</Text>
                                </View>
                            </View>
                            
                            <View style={{ borderBottomWidth: 0.5, borderColor: 'grey',paddingVertical: '4%' }}>
                                <View style={{ alignItems: 'stretch', justifyContent: 'space-between', flexDirection: 'row', marginBottom: '2%' }}>
                                    <Text>DURATION</Text>
                                    <Text>CABIN</Text>
                                </View>
                                <View style={{ alignItems: 'stretch', justifyContent: 'space-between', flexDirection: 'row' }}>
                                    <Text style={{ fontWeight: 'bold' }}>{item.departure_flight.duration}</Text>
                                    <Text style={{ fontWeight: 'bold' }}>{item.departure_flight.cabin_code} / {item.departure_flight.cabin_name}</Text>
                                </View>
                            </View>
                            
                            <View style={{ paddingVertical: '4%' }}>
                                <View style={{ alignItems: 'stretch', justifyContent: 'space-between', flexDirection: 'row', marginBottom: '2%' }}>
                                    <Text>FLIGHT CODE</Text>
                                    <Text>FLIGHT NUMBER</Text>
                                    <Text>SUB CLASS</Text>
                                </View>
                                <View style={{ alignItems: 'stretch', justifyContent: 'space-between', flexDirection: 'row' }}>
                                    <Text style={{ fontWeight: 'bold' }}>{item.departure_flight.schedules[0].flight_code}</Text>
                                    <Text style={{ fontWeight: 'bold' }}>{item.departure_flight.schedules[0].flight_number}</Text>
                                    <Text style={{ fontWeight: 'bold' }}>{item.departure_flight.schedules[0].sub_class}</Text>
                                </View>
                            </View>
                        </View>
                        
                        {content_return_flight}
                            
                        
                        <View>
                            <View style={{ marginTop: '2%', }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Contact Information</Text>
                            </View>
                    
                            <View style={{ paddingVertical: '4%' }}>
                                <View style={{ alignItems: 'stretch', justifyContent: 'space-between', flexDirection: 'row', marginBottom: '2%' }}>
                                    <Text>NAME</Text>
                                    <Text>COUNTRY</Text>
                                    <Text>PHONE</Text>
                                </View>
                                <View style={{ alignItems: 'stretch', justifyContent: 'space-between', flexDirection: 'row' }}>
                                    <Text style={{ fontWeight: 'bold' }}>{item.contact.title} {item.contact.first_name} {item.contact.last_name}</Text>
                                    <Text style={{ fontWeight: 'bold' }}>{item.contact.country_name}</Text>
                                    <Text style={{ fontWeight: 'bold' }}>{item.contact.phone_code} {item.contact.phone_number}</Text>
                                </View>
                            </View>
                        </View>
                        
                        
                        <View>
                            <View style={{ marginTop: '2%', }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Passanger Information</Text>
                            </View>
                    
                            {content_passanger}
                        </View>
                    </View>
                    
                    
                    return (
                        <View style={{ flex: 1 }}>
                            {content}
                        </View>
                    );
    }

    render() {
        const { navigation} = this.props;
        let { loading_spinner,loading } = this.state;
        var title='Cart';
        var subTitle='asd';
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));


        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
               

                <Header
                    title="Checkout"
                    //subTitle={this.state.countCartReal+' Cart'}
                    renderLeft={() => {
                        return (
                            <Icon
                                name="arrow-left"
                                size={20}
                                color={BaseColor.primaryColor}
                            />
                        );
                    }}
                    renderRight={() => {
                        return (
                            <Icon
                                name="home"
                                size={24}
                                color={BaseColor.primaryColor}
                            />
                        );
                    }}
                
                    onPressLeft={() => {
                        navigation.goBack();
                    }}
                    onPressRight={() => {
                        navigation.navigate("Home");
                    }}
                />


                <ScrollView>
                    {this.renderContent()}
                </ScrollView>
                
            
                    
                <View style={styles.contentButtonBottom}>
                    <View>
                        <Text caption1 semibold>
                            Total Price
                        </Text>
                        <Text title3 primaryColor semibold>
                            IDR {priceSplitter(this.state.item.total_price)}
                        </Text>
                    </View>

                    
                    <Button
                        style={{ height: 46 }}

                        loading={loading}
                        onPress={() => {  
                            this.onSubmit();
                        }}
                    >
                       Bayar Sekarang
                    </Button>
                 
                </View>
                <DropdownAlert ref={ref => this.dropdown = ref} messageNumOfLines={10} closeInterval={10000} />

            </SafeAreaView>
        );
    }
}
