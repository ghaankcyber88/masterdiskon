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
//import { cos } from "react-native-reanimated";



export default class CheckOut extends Component {
    constructor(props) {
        super(props);
        item=this.props.navigation.state.params.item;
        console.log("dataOrder",JSON.stringify(item));
      

        this.state = {
            item:item
        };
        
       
        
    }





    setPayment(payment_method,payment_method_title){
        this.setState({payment_method: payment_method});
        this.setState({payment_method_title: payment_method_title});
    }
    
    
    renderContent() {
        var item=this.state.item;
        
        var content=<View></View>
        if(item.product=="Flight"){
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
        //return days[d.getDay()]+", "+d.getDate()+" "+months[d.getMonth()]+" "+d.getFullYear();
        return d.getDate()+" "+months[d.getMonth()]+" "+d.getFullYear();
    }
    
    renderContentFlight(){
        var item=this.state.item;
        var order_flight_departure=item.detail[0].order_detail[0];
        var order_flight=item.detail[0].order;
        var pax=item.detail[0].pax;
        var type=item.detail[0].type;
        var contact=item.contact;
        
        if(type=="Return"){
            var order_flight_return=item.detail[0].order_detail[1];
            var content_return_flight=<View></View>
            content_return_flight=<View><View style={styles.contentTop}>
                                        <View style={{ flex: 1 }}>
                                            <Text title2>{order_flight_return.origin_id}</Text>
                                            <Text footnote light numberOfLines={3}>
                                                {order_flight_return.origin_airport.name}
                                            </Text>
                                            <Text footnote light style={{color:BaseColor.primaryColor}}>
                                                {this.convertDate(order_flight_return.departure_date)}
                                            </Text>
                                            <Text footnote light style={{color:BaseColor.primaryColor}}>
                                                {order_flight_return.departure_time}
                                            </Text>
                                        </View>
                                        <View style={{ flex: 1.5, alignItems: "center" }}>
                                            <Text caption1 light>
                                               Flight {order_flight_return.segment}
                                            </Text>
                                            <View style={styles.contentLine}>
                                                <View style={styles.lineFlight} />
                                                <Icon
                                                    name="plane"
                                                    color={BaseColor.dividerColor}
                                                    size={30}
                                                    solid
                                                />
                                                {/* <View style={styles.dot} /> */}
                                            </View>
                                            
                                        </View>
                                        <View style={{ flex: 1, alignItems: "flex-end" }}>
                                            <Text title2>{order_flight_return.destination_id}</Text>
                                            <Text footnote light numberOfLines={3} style={{textAlign:'right'}} >
                                                {order_flight_return.destination_airport.name}
                                            </Text>
                                            <Text footnote light style={{textAlign:'right',color:BaseColor.primaryColor}}>
                                                {this.convertDate(order_flight_return.arrival_date)}
                                            </Text>
                                            <Text footnote light style={{color:BaseColor.primaryColor}}>
                                                {order_flight_return.arrival_time}
                                            </Text>
                                        </View>
                                    </View>
                                    <View>
                                        <View style={{paddingVertical: '4%' }}>
                                            <View style={{ alignItems: 'stretch', justifyContent: 'space-between', flexDirection: 'row', marginBottom: '2%' }}>
                                                <Text>BOOKING CODE</Text>
                                                <Text>DURATION</Text>
                                                <Text>CABIN</Text>
                                            </View>
                                            <View style={{ alignItems: 'stretch', justifyContent: 'space-between', flexDirection: 'row' }}>
                                                <Text style={{ fontWeight: 'bold' }}>{order_flight_return.booking_code}</Text>
                                                <Text style={{ fontWeight: 'bold' }}>{order_flight_return.duration}</Text>
                                                <Text style={{ fontWeight: 'bold' }}>{order_flight_return.cabin_name}</Text>
                                            </View>
                                        </View>
                                        <View style={{ paddingVertical: '4%' }}>
                                            <View style={{ alignItems: 'stretch', justifyContent: 'space-between', flexDirection: 'row', marginBottom: '2%' }}>
                                                <Text>FLIGHT CODE</Text>
                                                <Text>FLIGHT NUMBER</Text>
                                            </View>
                                            <View style={{ alignItems: 'stretch', justifyContent: 'space-between', flexDirection: 'row' }}>
                                                <Text style={{ fontWeight: 'bold' }}>{order_flight_return.airline_code}</Text>
                                                <Text style={{ fontWeight: 'bold' }}>{order_flight_return.airline_name}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
        
        }
        
        
        var content_passanger=<View></View>
        var content_passanger = [];
        pax.map(item => {
            content_passanger.push(<View style={{ paddingVertical: '4%' }}>
                                <View style={{ alignItems: 'stretch', justifyContent: 'space-between', flexDirection: 'row', marginBottom: '2%' }}>
                                    <Text>NAME</Text>
                                    <Text>TYPE</Text>
                                </View>
                                <View style={{ alignItems: 'stretch', justifyContent: 'space-between', flexDirection: 'row' }}>
                                    <Text style={{ fontWeight: 'bold' }}>{item.title} {item.first_name} {item.last_name}</Text>
                                    <Text style={{ fontWeight: 'bold' }}>{item.type}</Text>
                                </View>
                            </View>)
        });
        var content=<View style={styles.contain}>
                        <View style={{ marginTop: '2%', }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Flight Information</Text>
                        </View>
                
                        <View style={styles.contentTop}>
                            <View style={{ flex: 1 }}>
                                <Text title2>{order_flight_departure.origin_id}</Text>
                                <Text footnote light numberOfLines={3}>
                                    {order_flight_departure.origin_airport.name}
                                </Text>
                                <Text footnote light style={{color:BaseColor.primaryColor}}>
                                    {this.convertDate(order_flight_departure.departure_date)}
                                </Text>
                                <Text footnote light style={{color:BaseColor.primaryColor}}>
                                    {order_flight_departure.departure_time}
                                </Text>
                            </View>
                            <View style={{ flex: 1.5, alignItems: "center" }}>
                                <Text caption1 light>
                                   Flight {order_flight_departure.segment}
                                </Text>
                                <View style={styles.contentLine}>
                                    <View style={styles.lineFlight} />
                                    <Icon
                                        name="plane"
                                        color={BaseColor.dividerColor}
                                        size={30}
                                        solid
                                    />
                                    {/* <View style={styles.dot} /> */}
                                </View>
                                
                            </View>
                            <View style={{ flex: 1, alignItems: "flex-end" }}>
                                <Text title2>{order_flight_departure.destination_id}</Text>
                                <Text footnote light numberOfLines={3} style={{textAlign:'right'}} >
                                    {order_flight_departure.destination_airport.name}
                                </Text>
                                <Text footnote light style={{textAlign:'right',color:BaseColor.primaryColor}}>
                                    {this.convertDate(order_flight_departure.arrival_date)}
                                </Text>
                                <Text footnote light style={{color:BaseColor.primaryColor}}>
                                    {order_flight_departure.arrival_time}
                                </Text>
                            </View>
                        </View>
                        
                        
                        
                        <View>
                            <View style={{paddingVertical: '4%' }}>
                                <View style={{ alignItems: 'stretch', justifyContent: 'space-between', flexDirection: 'row', marginBottom: '2%' }}>
                                    <Text>BOOKING CODE</Text>
                                    <Text>DURATION</Text>
                                    <Text>CABIN</Text>
                                </View>
                                <View style={{ alignItems: 'stretch', justifyContent: 'space-between', flexDirection: 'row' }}>
                                    <Text style={{ fontWeight: 'bold' }}>{order_flight_departure.booking_code}</Text>
                                    <Text style={{ fontWeight: 'bold' }}>{order_flight_departure.duration}</Text>
                                    <Text style={{ fontWeight: 'bold' }}>{order_flight_departure.cabin_name}</Text>
                                </View>
                            </View>
                            <View style={{ paddingVertical: '4%',borderBottomWidth: 0.5, borderColor: 'grey' }}>
                                <View style={{ alignItems: 'stretch', justifyContent: 'space-between', flexDirection: 'row', marginBottom: '2%' }}>
                                    <Text>AIRLINE CODE</Text>
                                    <Text>AIRLINE NAME</Text>
                                </View>
                                <View style={{ alignItems: 'stretch', justifyContent: 'space-between', flexDirection: 'row' }}>
                                    <Text style={{ fontWeight: 'bold' }}>{order_flight_departure.airline_code}</Text>
                                    <Text style={{ fontWeight: 'bold' }}>{order_flight_departure.airline_name}</Text>
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
                                    {/* <Text>COUNTRY</Text> */}
                                    <Text>PHONE</Text>
                                </View>
                                <View style={{ alignItems: 'stretch', justifyContent: 'space-between', flexDirection: 'row' }}>
                                    <Text style={{ fontWeight: 'bold' }}>{contact.contact_title} {contact.contact_first} {contact.contact_last}</Text>
                                    {/* <Text style={{ fontWeight: 'bold' }}>{contact.country_name}</Text> */}
                                    <Text style={{ fontWeight: 'bold' }}>({contact.phone_code}) {contact.contact_phone}</Text>
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
                    title="Preview Booking"
                    subTitle={'No. Order '+this.state.item.order_code}
                    renderLeft={() => {
                        return (
                            <Icon
                                name="arrow-left"
                                size={20}
                                color={BaseColor.whiteColor}
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
                    <View  style={{ padding: 20 }}>
                    {this.renderContent()}
                    </View>
                </ScrollView>
                
            
                    
                {/* <View style={styles.contentButtonBottom}>
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
                 
                </View> */}
                <DropdownAlert ref={ref => this.dropdown = ref} messageNumOfLines={10} closeInterval={10000} />

            </SafeAreaView>
        );
    }
}
