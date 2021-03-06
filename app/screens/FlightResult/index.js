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
import { FlightData,DataLoading,DataFlight } from "@data";
import { FlightSearch } from "@data";
import {PostData} from '../../services/PostData';
import {AsyncStorage} from 'react-native';
import Modal from "react-native-modal";
import AnimatedLoader from "react-native-animated-loader";


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
        //var paramOther=this.props.navigation.state.params.paramOther;
  
        // var listdata_departure_original=[];
        // var listdata_return_original=[];

        var Origin='Origin='+param.Origin;
        var Destination='&Destination='+param.Destination;
        var DepartureDate='&DepartureDate='+param.DepartureDate;
        var Adults='&Adults='+param.Adults;
        var Children='&Children='+param.Children;
        var Infants='&Infants='+param.Infants;
        var CorporateCode='&CorporateCode';
        var Subclasses='&Subclasses=false';
        var CabinClass='&CabinClass=E';
        var Airlines='&Airlines=';
        
        
        if(param.IsReturn==true){
            var ReturnDate='&ReturnDate='+param.ReturnDate;
        }else{
            var ReturnDate='';
        }
        
        
        var paramUrl=Origin+Destination+DepartureDate+ReturnDate+Adults+Children+Infants+CorporateCode+Subclasses+CabinClass+Airlines;
        //console.log('paramUrl',JSON.stringify(paramUrl));
        
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
            paramUrl:paramUrl,
            
            //paramOther:paramOther,
            listdata_departure:DataFlight,
            data_timeline: '',
            listdata_return:[],

            listdata_departure_original:[],
            listdata_return_original:[],
            
            
            modalVisible: false,
            loading_load_more:true
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
            obj['data_type'] = "real";
            
            obj['filter_price'] = item.price.total_price;
            obj['filter_airline_code'] = item.airline_code;
            obj['filter_transit'] = item.transit;
            obj['filter_entertainment'] = item.flight_schedule[0].inflight_entertainment;
            obj['filter_baggage'] = item.flight_schedule[0].baggage;
            obj['filter_meal'] = item.flight_schedule[0].meal;
            
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
            obj["price_custom"]=item.price.total_price;
            listdata_new.push(obj);
            a++;
        });

       return listdata_new;
    }
    
    rebuildRow(item,num){
    
        var row={
            "num" : num.toString(),
            "nums" : num,
            "data_type" : "real",
            
            "filter_price" : item.price.total_price,
            "filter_airline_code" : item.airline_code,
            "filter_transit" : item.transit,
            "filter_entertainment" : item.flight_schedule[0].inflight_entertainment,
            "filter_baggage" : item.flight_schedule[0].baggage,
            "filter_meal" : item.flight_schedule[0].meal,
            
            "price":item.price,
            "international": item.international,
            "combinable": item.combinable,
            "match_id": item.match_id,
            "supplier_id": item.supplier_id,
            "airline_id": item.airline_id,
            "validating_carrier": item.validating_carrier,
            "from": item.from,
            "to": item.to,
            "adult": item.adult,
            "child": item.child,
            "infant": item.infant,
            "currency": item.currency,
            "price_type": item.price_type,
            "flight_schedule": item.flight_schedule,
            "supplier_code": item.supplier_code,
            "airline_code": item.airline_code,
            "reference": item.reference,
            "subclasses": item.subclasses,
            "airline_name": item.airline_name,
            "airline_logo": item.airline_logo,
            "departure_date": item.departure_date,
            "departure_time": item.departure_time,
            "departure_timezone": item.departure_timezone,
            "gmt_departure": item.gmt_departure,
            "arrival_date": item.arrival_date,
            "arrival_time": item.arrival_time,
            "arrival_timezone": item.arrival_timezone,
            "gmt_arrival": item.gmt_arrival,
            "duration": item.duration,
            "transit": item.transit,
            "from_name": item.from_name,
            "from_city": item.from_city,
            "from_country": item.from_country,
            "from_country_code": item.from_country_code,
            "to_name": item.to_name,
            "to_city": item.to_city,
            "to_country": item.to_country,
            "to_country_code": item.to_country_code,
            "price_custom":item.price.total_price,
        
        }
        return row;
    
    }
    getProduct() {
        var param=this.state.param;
        var paramUrl=this.state.paramUrl;
  
        
        this.setState({ loading_spinner: true }, () => {
            this.setState({loading_load_more:true});
            AsyncStorage.getItem('config', (error, result) => {
                if (result) {    

                            let config = JSON.parse(result);
                            var token=config.token;
                            var url=config.aeroUrl;
                            
                           
                            var myHeaders = new Headers();
                            myHeaders.append("Authorization", "Bearer "+token);
                            
                            var raw = "";
                            
                            var requestOptions = {
                              method: 'GET',
                              headers: myHeaders,
                              body: raw,
                              redirect: 'follow'
                            };
                            
                            var urlReq=url+"flight/search?"+paramUrl;
                            //console.log('urlReq',urlReq);
                            fetch(urlReq, requestOptions)
                              .then(response => response.json())
                              .then(result => {
                                                            var length=result.data.departure.length;
                                                            //console.log('getProduct',JSON.stringify(result.data.departure));
                                                            console.log('flight_result',length);   

                                                            if(length != 0){
                                                                this.setState({ loading_spinner: false });
                                                                var listdata_departure=this.rebuild(result.data.departure);
                                                                var listdata_return=this.rebuild(result.data.return);  
                                                                //console.log('flight_results',JSON.stringify(this.rebuild(result.data.departure)));                            

                                                                this.setState({ listdata_departure: listdata_departure });
                                                                this.setState({ listdata_return: listdata_return });
                                
                                                                this.setState({ listdata_departure_original: listdata_departure });
                                                                this.setState({ listdata_return_original: listdata_return });
    
                                                            
                                                            
                                                            }
                                                            

                                                            
                                                            var dataKey=result.data.key;
                                                            var datacontinue=result.data.continue;
                                                            
                                                            if(datacontinue==true){
                                                                this.setState({loading_load_more:true});
                                                                this.getProductNext(dataKey);
                                                            }else{
                                                                this.setState({loading_load_more:false});
                                                            }
                                                            
                              })
                              .catch(error => console.log('error', error));
                }
            });

        });
      
    }
    
    getProductNext(dataKey){
            AsyncStorage.getItem('config', (error, result) => {
                if (result) {    

                            let config = JSON.parse(result);
                            var token=config.token;
                            var url=config.aeroUrl;
                            
                           
                            var myHeaders = new Headers();
                            myHeaders.append("Authorization", "Bearer "+token);
                            
                            var requestOptions = {
                              method: 'POST',
                              headers: myHeaders,
                              redirect: 'follow'
                            };
                            
                            fetch(url+"flight/search/"+dataKey, requestOptions)
                              .then(response => response.json())
                              .then(result => {
                                ////console.log('getProductNext',JSON.stringify(result.data.departure));
                                    
                                    var length=result.data.departure.length;
                                    console.log('flight_result_next',length);   

                                    
                                    if(length != 0){
                                        this.setState({ loading_spinner: false });
                                        ////console.log('flight_result',JSON.stringify(result.data.departure));                            
                                        var dataDeparture=result.data.departure;
                                        var dataReturn=result.data.return;
                                        
                                        
                                        var listdata_departure_state=this.state.listdata_departure;
                                        var listdata_return_state=this.state.listdata_return;
                                       
                                        
                                        var a=listdata_departure_state.length;
                                        dataDeparture.map((item, index) => {
                                            a++;
                                            var rebuidDeparture=this.rebuildRow(item,a);
                                            listdata_departure_state.push(rebuidDeparture);
                                                                    
                                        })
                                        
                                        var b=listdata_return_state.length;
                                        dataReturn.map((item, index) => {
                                            b++;
                                            var rebuidReturn=this.rebuildRow(item,b);
                                            listdata_return_state.push(rebuidReturn);
                                                                    
                                        })
                                        ////console.log('listdata_departure_state',JSON.stringify(listdata_departure_state));
                                        
                                        const index = listdata_departure_state.findIndex(x => x.data_type === "sample");
                                        if (index !== undefined) listdata_departure_state.splice(index, 1);
                                        
                                        
                                        
                                        this.setState({ listdata_departure: listdata_departure_state });
                                        this.setState({ listdata_return: listdata_return_state });
                                
                                        this.setState({ listdata_departure_original: listdata_departure_state });
                                        this.setState({ listdata_return_original: listdata_return_state });
                                        
                                    
                                    }

                                    
                                    var dataKey=result.data.key;
                                    var datacontinue=result.data.continue;
                                    
                                    if(datacontinue==true){
                                        this.setState({loading_load_more:true});
                                        this.getProductNext(dataKey);
                                    }else{
                                        this.setState({loading_load_more:false});
                                    }
                                
                              
                              })
                              .catch(error => console.log('error', error));
                }
            });

          
    }

    onChangeSort() {



    }
    
    sortProcess(selected)
    {   
       if(selected=='low_price'){
       this.sortLowestPrice();
        }else if(selected=='hight_price'){
            this.sortHightestPrice();
        }
    }
    
    sortLowestPrice(){
        //----------untuk sort asc---------//
        var data = eval(this.state.listdata_departure);
        var results = data;
        results.sort(function(a,b){
            if(a.filter_price == b.filter_price)
                return 0;
            if(a.filter_price < b.filter_price)
                return -1;
            if(a.filter_price > b.filter_price)
                return 1;
        });

        this.setState({listdata_departure:results});
    }

    sortHightestPrice(){
        //----------untuk sort desc---------//
        var data = eval(this.state.listdata_departure);
        var results = data;
        results.sort(function(a,b){
            if(a.filter_price == b.filter_price)
                return 0;
            if(a.filter_price < b.filter_price)
                return 1;
            if(a.filter_price > b.filter_price)
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
                    listdata:this.state.listdata_departure,
                    filterProcess: this.filterProcess
                }
                );
    }

    onClear() {
        //console.log("---------------original------------------------------------");
        //console.log(JSON.stringify(this.state.listdata_departure_original));
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

      
      

    filterProcess(filters)
    {
   
        var products=this.state.listdata_departure;
        const filtered=this.filterArray(products, filters);
        this.setState({listdata_departure:filtered});

        
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
                //paramOther:this.state.paramOther,
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
                                    //paramOther:this.state.paramOther,
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
                    brandCode={item.airline_code}
                    image={item.flight_schedule[0]['airline_logo']}
                    type={item.flight_schedule[0]['cabin']}
                    price={item.currency+ " "+priceSplitter(item.price['total_price'])}
                    route={item.transit}
                    onPress={() => this.onSelect(item)}
                    onPressDetail={() => this.onSelectDetail(item)}
                />
            )}
        />
      
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
       // this.getProduct();
       
       const {navigation} = this.props;
        // navigation.addListener ('willFocus', () =>{
        //     // this.setState({ loading_spinner: true });
        //     setTimeout(() => {
        //         this.getProduct();
        //     }, 200);
        // });
        
        setTimeout(() => {
            this.getProduct();
        }, 200);
 
    }
    
    



    render() {
        const { navigation} = this.props;
        let { loading_spinner,loading_load_more } = this.state;
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
                                color={BaseColor.blackColor}
                            />
                        );
                    }}
                    onPressLeft={() => {
                        navigation.goBack();
                    }}
                />
                        
                            
                {this.renderContent()}
                {
                    loading_load_more ?
                    <ActivityIndicator size="large" color={BaseColor.primaryColor} />
                    :
                    <View></View>
                }
                
              
                {/* <Modal
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
                </Modal> */}
            </SafeAreaView>
        );
    }
}
