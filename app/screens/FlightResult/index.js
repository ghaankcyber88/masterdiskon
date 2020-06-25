import React, { Component } from "react";
import {
    FlatList,
    RefreshControl,
    View,
    Animated,
    Platform,
    ActivityIndicator,
    Text
} from "react-native";
import { BaseStyle, BaseColor } from "@config";
import {
    Header,
    SafeAreaView,
    Icon,
    FlightItem,
    FilterSort
} from "@components";
import styles from "./styles";
import { FlightData,DataLoading } from "@data";
import { FlightSearch } from "@data";
import {PostData} from '../../services/PostData';
import {PostDataNew} from '../../services/PostDataNew';
import {AsyncStorage} from 'react-native';
import Modal from "react-native-modal";


import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
  } from "rn-placeholder";

import Timeline from 'react-native-timeline-flatlist';

export default class FlightResult extends Component {
    constructor(props) {
        super(props);
        const scrollAnim = new Animated.Value(0);
        const offsetAnim = new Animated.Value(0);
        
        var param=this.props.navigation.state.params.param;
        var paramOther=this.props.navigation.state.params.paramOther;
  
        var listdata_departure_original=[];
        var listdata_return_original=[];

      
        this.state = {
            refreshing: false,
            flights: FlightData,
            scrollAnim,
            offsetAnim,
            clampedScroll: Animated.diffClamp(
                Animated.add(
                    scrollAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                        extrapolateLeft: "clamp"
                    }),
                    offsetAnim
                ),
                0,
                40
            ),

            param:param,
            paramOther:paramOther,
            listdata_departure:[
              {
                "num": "1",
                "price": {
                  "type": "",
                  "segment": "",
                  "total_price": 1878520,
                  "nett_price": 1849060,
                  "commission_percent": 0,
                  "commission_amount": 29460,
                  "insurance_code": "CIU",
                  "insurance_name": "CIU Insurance",
                  "insurance_company": "PT Citra International Underwriters",
                  "insurance_program": "Protection",
                  "insurance_fee": 20500,
                  "insurance_total": 82000,
                  "transaction_fee": 4320,
                  "detail_price": [
                    {
                      "commission": 9820,
                      "nett": 595280,
                      "markup": 0,
                      "markdown": 0,
                      "insurance_fee": 20500,
                      "transaction_fee": 1080,
                      "markup_detail": [],
                      "markdown_detail": [],
                      "tax": [],
                      "pax_type": "ADT",
                      "pax_count": 2,
                      "price": 491000,
                      "total_tax": 114100,
                      "total": 606180
                    },
                    {
                      "commission": 9820,
                      "nett": 595280,
                      "markup": 0,
                      "markdown": 0,
                      "insurance_fee": 20500,
                      "transaction_fee": 1080,
                      "markup_detail": [],
                      "markdown_detail": [],
                      "tax": [],
                      "pax_type": "CHD",
                      "pax_count": 1,
                      "price": 491000,
                      "total_tax": 114100,
                      "total": 606180
                    },
                    {
                      "commission": 0,
                      "nett": 58900,
                      "markup": 0,
                      "markdown": 0,
                      "insurance_fee": 20500,
                      "transaction_fee": 1080,
                      "markup_detail": [],
                      "markdown_detail": [],
                      "tax": [],
                      "pax_type": "INF",
                      "pax_count": 1,
                      "price": 49000,
                      "total_tax": 9900,
                      "total": 59980
                    }
                  ]
                },
                "international": false,
                "combinable": true,
                "match_id": "-",
                "supplier_id": 3,
                "airline_id": 3,
                "validating_carrier": "SJ",
                "from": "CGK",
                "to": "DPS",
                "adult": 2,
                "child": 1,
                "infant": 1,
                "currency": "IDR",
                "price_type": "E",
                "flight_schedule": [
                  {
                    "from_city": "Jakarta",
                    "from_country": "Indonesia",
                    "from_country_code": "ID",
                    "to_city": "Bali",
                    "to_country": "Indonesia",
                    "to_country_code": "ID",
                    "supplier_id": 3,
                    "supplier_code": "SJ",
                    "departure_timezone": 7,
                    "arrival_timezone": 8,
                    "gmt_departure": "2020-06-06T12:35:00",
                    "gmt_arrival": "2020-06-06T14:30:00",
                    "duration": 115,
                    "airline_id": 3,
                    "airline_logo": "https://megaelectra-dev.oss-ap-southeast-5.aliyuncs.com/1d0e152d-3484-4271-9a4b-8309d45b7a34.logo",
                    "cabin_baggage": 0,
                    "inflight_entertainment": false,
                    "service_type": "Full Service",
                    "toc_url": "https://www.sriwijayaair.co.id/SJ/Termcondition",
                    "from": "CGK",
                    "from_name": "Bandar Udara Internasional Soekarno Hatta",
                    "from_terminal_id": "-",
                    "to": "DPS",
                    "to_name": "Ngurah Rai (Bali) International Airport",
                    "to_terminal_id": "-",
                    "cabin": "E",
                    "airline_name": "SRIWIJAYA AIR",
                    "airline_code": "SJ",
                    "flight_code": "SJ 260",
                    "flight_number": "260",
                    "departure_date": "2020-06-06",
                    "departure_time": "19:35",
                    "arrival_date": "2020-06-06",
                    "arrival_time": "22:30",
                    "baggage": "20",
                    "meal": "0",
                    "seat_available": "9",
                    "class": "X",
                    "key": "020007518389676888777468898468908985848666757972|-|46523131:X:S"
                  }
                ],
                "supplier_code": "SJ",
                "airline_code": "SJ",
                "reference": "b5c8fb8b-9231-44c2-b32f-afe198fb8ad2",
                "subclasses": false,
                "airline_name": "SRIWIJAYA AIR",
                "airline_logo": "https://megaelectra-dev.oss-ap-southeast-5.aliyuncs.com/1d0e152d-3484-4271-9a4b-8309d45b7a34.logo",
                "departure_date": "2020-06-06",
                "departure_time": "19:35",
                "departure_timezone": "7",
                "gmt_departure": "2020-06-06T12:35:00",
                "arrival_date": "2020-06-06",
                "arrival_time": "22:30",
                "arrival_timezone": "8",
                "gmt_arrival": "2020-06-06T14:30:00",
                "duration": 115,
                "transit": 0,
                "from_name": "Bandar Udara Internasional Soekarno Hatta",
                "from_city": "Jakarta",
                "from_country": "Indonesia",
                "from_country_code": "ID",
                "to_name": "Ngurah Rai (Bali) International Airport",
                "to_city": "Bali",
                "to_country": "Indonesia",
                "to_country_code": "ID",
              },
            ],
            data_timeline: '',
            listdata_return:[],

            listdata_departure_original:listdata_departure_original,
            listdata_return_original:listdata_return_original,
            
            
            modalVisible: false,
        };
        this.onChangeView = this.onChangeView.bind(this);
        this.onFilter = this.onFilter.bind(this);
        this.onChangeSort = this.onChangeSort.bind(this);
        this.filterProcess = this.filterProcess.bind(this);
        this.sortProcess = this.sortProcess.bind(this);
        this.onClear = this.onClear.bind(this);
    }

    rebuild(listdata){
        var listdata_new = [];
        var a=1;
        listdata.map(item => {
            var obj = {};
            obj['num'] = a.toString();
            obj['nums'] = a;
            obj["price"]=item.price;
            obj["international"]= item.international;
            obj["combinable"]= item.combinable;
            obj["match_id"]= item.match_id;
            obj["supplier_id"]= item.supplier_id;
            obj["airline_id"]= item.airline_id;
            obj["validating_carrier"]= item.validating_carrier;
            obj["from"]= item.from;
            obj["to"]= item.to;
            obj["adult"]= item.adult;
            obj["child"]= item.child;
            obj["infant"]= item.infant;
            obj["currency"]= item.currency;
            obj["price_type"]= item.price_type;
            obj["flight_schedule"]= item.flight_schedule;
            obj["supplier_code"]= item.supplier_code;
            obj["airline_code"]= item.airline_code;
            obj["reference"]= item.reference;
            obj["subclasses"]= item.subclasses;
            obj["airline_name"]= item.airline_name;
            obj["airline_logo"]= item.airline_logo;
            obj["departure_date"]= item.departure_date;
            obj["departure_time"]= item.departure_time;
            obj["departure_timezone"]= item.departure_timezone;
            obj["gmt_departure"]= item.gmt_departure;
            obj["arrival_date"]= item.arrival_date;
            obj["arrival_time"]= item.arrival_time;
            obj["arrival_timezone"]= item.arrival_timezone;
            obj["gmt_arrival"]= item.gmt_arrival;
            obj["duration"]= item.duration;
            obj["transit"]= item.transit;
            obj["from_name"]= item.from_name;
            obj["from_city"]= item.from_city;
            obj["from_country"]= item.from_country;
            obj["from_country_code"]= item.from_country_code;
            obj["to_name"]= item.to_name;
            obj["to_city"]= item.to_city;
            obj["to_country"]= item.to_country;
            obj["to_country_code"]= item.to_country_code;
            listdata_new.push(obj);
            a++;
        });

       return listdata_new;
    }
    
    
    getProduct() {
        var param=this.state.param;
        var paramOther=this.state.paramOther;
        console.log("-------param------");
        console.log(JSON.stringify(param));
        this.setState({ loading_spinner: true }, () => {
            AsyncStorage.getItem('config', (error, result) => {
                if (result) {    

                            let config = JSON.parse(result);
                            var access_token=config.token;
                            var url=config.aeroUrl;

                            var myHeaders = new Headers();
                            myHeaders.append("Content-Type", "application/json");
                            myHeaders.append("Authorization", "Bearer "+access_token);

                            var raw = JSON.stringify(param);

                            var requestOptions = {
                            method: 'POST',
                            headers: myHeaders,
                            body: raw,
                            redirect: 'follow'
                            };

                            
                            PostDataNew(url,'flight/search/v2',requestOptions)
                                     .then((result) => {
                                        
                                        this.setState({ loading_spinner: false });
                                        var listdata_departure=this.rebuild(result.data.departure);
                                        var listdata_return=this.rebuild(result.data.return);  
                                        console.log('listdata_departure_asli',JSON.stringify(result)); 
        
                                        this.setState({ listdata_departure: listdata_departure });
                                        this.setState({ listdata_return: listdata_return });
        
                                        this.setState({ listdata_departure_original: listdata_departure });
                                        this.setState({ listdata_return_original: listdata_return });
                                     },
                                     (error) => {
                                         this.setState({ error });
                                     }
                            ); 
                }
            });

        });
    }

    onChangeSort() {



    }

    sortLowestPrice(){
        //----------untuk sort asc---------//
        var data = eval(this.state.listdata_departure);
        var results = data;
        results.sort(function(a,b){
            if(a.price.total_price == b.price.total_price)
                return 0;
            if(a.price.total_price < b.price.total_price)
                return -1;
            if(a.price.total_price > b.price.total_price)
                return 1;
        });

        this.setState({listdata_departure:results});
    }

    sortHightestPrice(){
        //----------untuk sort desc---------//
        var data = eval(this.state.listdata_departure);
        var results = data;
        results.sort(function(a,b){
            if(a.price.total_price == b.price.total_price)
                return 0;
            if(a.price.total_price < b.price.total_price)
                return 1;
            if(a.price.total_price > b.price.total_price)
                return -1;
        });

        this.setState({listdata_departure:results});
    }

    /**
     * @description Open modal when filterring mode is applied
     * @author Passion UI <passionui.com>
     * @date 2019-08-03
     */
    onFilter() {
        const { navigation } = this.props;
                navigation.navigate("FlightFilter",
                {
                    listdata:this.state.listdata_departure_original,
                    filterProcess: this.filterProcess
                }
                );
    }

    onClear() {
        console.log("---------------original------------------------------------");
        console.log(JSON.stringify(this.state.listdata_departure_original));
        this.setState({listdata_departure:this.state.listdata_departure_original});
    }

    filterArray(array, filters) {
        const filterKeys = Object.keys(filters);
        return array.filter(item => {
          // validates all filter criteria
          return filterKeys.every(key => {
            // ignores non-function predicates
            if (typeof filters[key] !== 'function') return true;
            return filters[key](item[key]);
          });
        });
      }

    filterProcess(filter)
    {
        console.log("----------------filter------------------------------------");
        console.log(filter);

        var filter=filter;
        const products =this.state.listdata_departure_original;

        
        if(filter.length != 0){
            var filters = {}
            if(filter.length != 0){
               filters = {
                num: num => filter.includes(num)
              };
            }
            filtered = this.filterArray(products, filters);
            this.setState({listdata_departure:filtered});
    
           
            console.log("----------------hasil filter------------------------------------");
            console.log(filtered);

        }else{
            console.log("----------------hasil filter------------------------------------");
            console.log("null");
            this.setState({listdata_departure:[]});
        }
    }
    
    
    sortProcess(filter)
    {   
       
        this.setState({listdata_departure:this.state.listdata_departure_original});
        var filter=filter;
        setTimeout(() => {

            console.log("----------------sortProcess------------------------------------");
            console.log(filter);
    
            const products =this.state.listdata_departure_original;
        
        
            ordered_array = this.mapOrder(products, filter, 'nums');
            console.log('listdataSort',JSON.stringify(ordered_array));
            this.setState({listdata_departure:products});
        }, 50);
        
    }
    
     mapOrder(array, order, key) {
  
        array.sort( function (a, b) {
          var A = a[key], B = b[key];
          
          if (order.indexOf(A) > order.indexOf(B)) {
            return 1;
          } else {
            return -1;
          }
          
        });
        
        return array;
      };
      
    onChangeView() {}


    removePrice(dataObj)
    {
        var array = {};
        for (var key in dataObj) {
            var obj = {};
            if(key!='price'){
                array[key] = dataObj[key];
            }
        }
        return array;
        
    }
    
    onSelectDetail(select) {
        const { navigation } = this.props;

        navigation.navigate("FlightDetail", {
            select: select,
        });
    }
    
    
    onSelect(select) {
        
        if(this.state.param.IsReturn==true)
        {
            this.props.navigation.navigate("FlightResultArrival",
            {
                param:this.state.param,
                paramOther:this.state.paramOther,
                listdata_return:this.state.listdata_return,
                selectDataDeparture:select
            });
        }else if(this.state.param.IsReturn==false){
            var param=this.state.param;
            var returnPost=null;
            var departurePost=this.removePrice(select);
            this.props.navigation.navigate("Summary",
                                {
                                    param:this.state.param,
                                    paramOther:this.state.paramOther,
                                    selectDataDeparture:select,
                                    selectDataReturn:null,
                                    departurePost:departurePost,
                                    returnPost:null,
                                });

         
        }
        

    }


    renderContent() {
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

        const { flights, refreshing, clampedScroll,loading_spinner } = this.state;
        const { navigation } = this.props;
        const navbarTranslate = clampedScroll.interpolate({
            inputRange: [0, 40],
            outputRange: [0, -40],
            extrapolate: "clamp"
        });
        var content=<View></View>
        if(this.state.listdata_departure.length==0){
            content=<View
            style={{position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center'
            }}
    ><Text>Maaf data tidak tersedia</Text></View> 
        }else{

            content= <Animated.FlatList
            contentContainerStyle={{
                paddingTop: 50,
                paddingBottom: 20
            }}
         
            scrollEventThrottle={1}
            onScroll={Animated.event(
                [
                    {
                        nativeEvent: {
                            contentOffset: {
                                y: this.state.scrollAnim
                            }
                        }
                    }
                ],
                { useNativeDriver: true }
            )}
            data={this.state.listdata_departure}
            keyExtractor={(item, index) => item.id}
            renderItem={({ item, index }) => (
                
                <FlightItem
                    loading={loading_spinner}
                    style={{ marginBottom: 10, marginHorizontal: 20 }}
                    fromHour={item.flight_schedule[0]['departure_time']}
                    toHour={item.flight_schedule[0]['arrival_time']}
                    fromFlight={item.flight_schedule[0]['from']}
                    toFlight={item.flight_schedule[0]['to']}
                    totalHour={item.flight_schedule[0]['duration']}
                    brand={item.airline_name}
                    image={item.flight_schedule[0]['airline_logo']}
                    type={item.flight_schedule[0]['cabin']}
                    price={item.currency+ " "+priceSplitter(item.price['total_price'])}
                    route={item.transit}
                    onPress={() => this.onSelect(item)}
                    onPressDetail={() => this.onSelectDetail(item)}
                />
            )}
        />
        }
        return (
            <View style={{ flex: 1 }}>
                {content}
                       
                <Animated.View
                    style={[
                        styles.navbar,
                        { transform: [{ translateY: navbarTranslate }] }
                    ]}
                >
                    <FilterSort
                        labelCustom={this.state.listdata_departure.length+' result'}
                        listdata={this.state.listdata_departure_original}
                        onChangeSort={this.onChangeSort}
                        onFilter={this.onFilter}
                        onClear={this.onClear}
                        sortProcess={this.sortProcess}
                    />
                </Animated.View>
            </View>
        );
    }


    
  
    componentDidMount() {
        this.getProduct();
 
    }
    
    



    render() {
        const { navigation} = this.props;
        let { loading_spinner } = this.state;
        var param=this.state.param;
        var title=param.Origin+" to "+param.Destination;
        var qty=parseInt(param.Adults)+parseInt(param.Children)+parseInt(param.Infants);
        var kelas="";
        if(param.CabinClass=='E'){
            kelas="Economy Class";
        }else if(param.CabinClass=='S'){
            kelas="Premium Economy";
        }else if(param.CabinClass=='B'){
            kelas="Business Class";
        }else if(param.CabinClass=='F'){
            kelas="First Class";
        }
        var subTitle=param.DepartureDate+", "+qty+" pax, "+kelas;
        var modalVisible=this.state.modalVisible;

        var information= [
            { title: "County", detail: 'asd' },
            { title: "Category", detail: 'asd' },
            { title: "Duration", detail: 'asdsad' },
        ]


        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <Header
                    title={title}
                    subTitle={subTitle}
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
                         
                {this.renderContent()}
                <Modal
                    isVisible={modalVisible}
                    onBackdropPress={() => {
                        this.setState({
                            modalVisible: false,
                            // option: this.props.option
                        });
                        //onCancel();
                    }}
                    onSwipeComplete={() => {
                        this.setState({
                            modalVisible: false,
                            //option: this.props.option
                        });
                        //onCancel();
                    }}
                    swipeDirection={["down"]}
                    style={styles.bottomModal}
                >
                    <View style={styles.contentFilterBottom}>
                        <View style={styles.contentSwipeDown}>
                            <View style={styles.lineSwipeDown} />
                        </View>
                       
                        <Text>asd</Text>
                        <View style={{ paddingHorizontal: 0 }}>
                            {information.map((item, index) => {
                                return (
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            paddingVertical: 10,
                                            borderBottomColor:
                                                BaseColor.textSecondaryColor,
                                            borderBottomWidth: 1
                                        }}
                                        key={"information" + index}
                                    >
                                        <Text body2 grayColor>
                                            {item.title}
                                        </Text>
                                        <Text body2 semibold >
                                            {item.detail}
                                        </Text>
                                    </View>
                                );
                            })}
                        </View>
                        <View style={{flex:1}}>
                            <Text>{JSON.stringify(this.state.data_timeline)}</Text>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        );
    }
}
