/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, ScrollView, Animated,Dimensions,ActivityIndicator,TouchableOpacity,StyleSheet,AsyncStorage } from "react-native";
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
// import TicketModal from "react-native-ticket-modal";
import { BaseStyle, BaseColor, Images } from "@config";
import Barcode from "react-native-barcode-builder";
import {PostDataNew} from '../../services/PostDataNew';
import AnimatedLoader from "react-native-animated-loader";


export default class Eticket extends Component {
  constructor(props) {
      
    var dataFlight=props.navigation.state.params.dataFlight;
    var order_id_aero=props.navigation.state.params.order_id_aero;
    var type=props.navigation.state.params.type;
      super(props);
      this.state = {
        dataFlight:dataFlight,
        order_id_aero:order_id_aero,
        type:type
      };
  }
  
  componentDidMount(){
    const {order_id_aero}=this.state;
    this.checkBooking(order_id_aero);
}
  
  checkBooking(order_code){
    this.setState({ loading_spinner: true }, () => {
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
                              // console.log("---------------checkBooking  ------------");
                              // console.log(JSON.stringify(result));
                              this.setState({ loading_spinner: false });
                              
                              if(this.state.type=='Departure'){
                                this.setState({dataFlight:result.data.orders[0].items[0].departure});
                              }else{
                                this.setState({dataFlight:result.data.orders[0].items[0].returns});
                              }
                              
                             
                           },
                           (error) => {
                               this.setState({ error });
                           }
              ); 
  
              
              
              
          }
      });
  });
}


  convertDate(date){
    var d = new Date(date);
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    //return days[d.getDay()]+", "+d.getDate()+" "+months[d.getMonth()]+" "+d.getFullYear();
    return d.getDate()+" "+months[d.getMonth()]+" "+d.getFullYear();
}

  render() {
    const { navigation} = this.props;
    const {dataFlight,order_id_aero,type,loading_spinner}=this.state;
    
    var fieldsArray = [];
    dataFlight.trans_information_details.map(item => {
            fieldsArray.push(
              <View style={{ paddingHorizontal: "8%",marginTop: '2%'}}>
              <Text>{item.paxName} ({item.paxType}) - {item.cabinClass}({item.subClass})</Text>
              <Text>Ticket : {item.ticketNumber}</Text>
            </View>
            );
        });
    
    return (
      <SafeAreaView
            style={{ flex: 1, backgroundColor:BaseColor.primaryColor }}
            forceInset={{ top: "always" }}
        >
            <Header
                title="Eticket"
                // subTitle={'No.Order :'+this.state.dataBooking[0].order_code}
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

        <View style={{ flex: 1 }}>
          <View style={{ padding: "1%" }}>
            
            <Text style={{ color: "white", alignSelf: 'center', marginTop: "1%", fontSize: 16, textAlign: 'center' }}>Eticket {type} {'\n'} Order ID : {order_id_aero}</Text>

            <View style={{ marginVertical: "2%", marginHorizontal: "12%", backgroundColor: 'white', borderTopStartRadius: 16, borderTopEndRadius: 16, elevation: 10, }}>

              {/* Barcode */}
              <View style={{ backgroundColor: 'white', paddingTop: "2%", paddingBottom: "2%", borderTopStartRadius: 16, borderTopEndRadius: 16 }}>
                <View style={{ height: 130, width: 150, alignSelf: 'center', }}>
                  {/* <Image source={require('../../../Image/barcode.png')} style={{ width: undefined, height: undefined, resizeMode: 'contain', flex: 1 }} /> */}
                  <Barcode value={dataFlight.pnr} format="CODE128" />
                </View>
              </View>

              {/* Code */}
              <View style={{ height: 30, justifyContent: 'center' }}>
                <Text style={{ color: BaseColor.primaryColor, alignSelf: 'center', backgroundColor: 'white', paddingHorizontal: "13%", paddingVertical: "3%", borderWidth: 2, borderColor: BaseColor.primaryColor, fontWeight: 'bold' }}>PNR NO - {dataFlight.pnr}</Text>
                <View style={{ height: 30, width: 30, borderRadius: 200, backgroundColor: BaseColor.primaryColor, position: 'absolute', top: 8, bottom: 0, left: -20, alignSelf: 'center', justifyContent: 'center' }}></View>
                <View style={{ height: 30, width: 30, borderRadius: 200, backgroundColor: BaseColor.primaryColor, position: 'absolute', top: 8, bottom: 0, right: -20, alignSelf: 'center', justifyContent: 'center' }}></View>
              </View>

              {/* DATE */}
              <View style={{ paddingHorizontal: "8%", marginTop: '5%' }}>
                <Text style={{ fontSize: 12 }}>AIRLINE CODE : {dataFlight.airline_code}</Text>
                <Text style={{ fontSize: 17, fontWeight: 'bold', }}>{dataFlight.airline}</Text>
                <Text style={{ fontSize: 13, fontWeight: 'bold' }}> {dataFlight.gmt_departure}</Text>
              </View>
              
              <View style={{ paddingHorizontal: "8%", marginTop: '5%' }}>
                <Text style={{ fontSize: 12 }}>Origin</Text>
                <Text style={{ fontSize: 13, fontWeight: 'bold' }}>{dataFlight.origin}-{dataFlight.origin_name}</Text>
              </View>
              
              <View style={{ paddingHorizontal: "8%", marginTop: '5%' }}>
                <Text style={{ fontSize: 12 }}>Destination</Text>
                <Text style={{ fontSize: 13, fontWeight: 'bold' }}>{dataFlight.destination}-{dataFlight.destination_name}</Text>
              </View>
              

            
              <View style={{ height: '0.5%', backgroundColor: BaseColor.secondColor, marginTop: '3%' }}>
              </View>
              
              <View style={{ paddingHorizontal: "8%", marginTop: '5%' }}>
                <Text style={{ fontSize: 12 }}>Pax</Text>
              </View>
              
              {fieldsArray}

              {/* <View style={{paddingHorizontal: "8%",paddingVertical: "2%",flexDirection: 'row', alignItems: 'stretch', justifyContent: 'space-between' }}>
                <Text style={{ fontWeight: 'bold' }}>Origin</Text>
                <Text>{dataFlight.origin}</Text>
              </View>
              
              <View style={{paddingHorizontal: "8%",paddingVertical: "2%",flexDirection: 'row', alignItems: 'stretch', justifyContent: 'space-between'}}>
                <Text style={{ fontWeight: 'bold' }}>Origin</Text>
                <Text>{dataFlight.origin}</Text>
              </View>
               */}
              
            
              
              

            </View>
          </View>
        </View>
        
              }

        {/* <View style={{ backgroundColor: 'white', borderTopStartRadius: 24, borderTopEndRadius: 24 }}>
          <TouchableOpacity onPress={()=>{this.props.navigation.navigate('DetailTicket')}}>

            <Text style={{ alignSelf: 'center', color: 'black', fontWeight: 'bold', fontSize: 20, padding: "2%", paddingTop: "3%", }}>TICKET DETAILS</Text>
          </TouchableOpacity>
          <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20, paddingLeft: "2%", paddingRight: "2%", paddingBottom: "2%", }}>Train Informasi</Text>
        </View> */}
      </SafeAreaView>
    );
  }
}

// export default Eticket;
