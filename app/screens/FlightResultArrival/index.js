import React, { Component } from "react";
import {
    FlatList,
    RefreshControl,
    View,
    Animated,
    Platform,
    ActivityIndicator
} from "react-native";
import { BaseStyle, BaseColor } from "@config";
import {
    Header,
    SafeAreaView,
    Icon,
    FlightItem,
    FilterSort
} from "@components";
// import styles from "./styles";
import {StyleSheet } from "react-native";
import {FlightData } from "@data";
import {PostData} from '../../services/PostData';
import {AsyncStorage} from 'react-native';

export default class FlightResultArrival extends Component {
    constructor(props) {
        super(props);
        const scrollAnim = new Animated.Value(0);
        const offsetAnim = new Animated.Value(0);
        var param=this.props.navigation.state.params.param;
        //var paramOther=this.props.navigation.state.params.paramOther;
        var listdata_return=this.props.navigation.state.params.listdata_return;
        var selectDataDeparture=this.props.navigation.state.params.selectDataDeparture;

        var listdata_return_original=listdata_return;


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
            //paramOther:paramOther,
            listdata_return:listdata_return,
            selectDataDeparture:selectDataDeparture,
            listdata_return_original:listdata_return_original
        };
        this.onChangeView = this.onChangeView.bind(this);
        this.onFilter = this.onFilter.bind(this);
        this.onChangeSort = this.onChangeSort.bind(this);
        this.filterProcess = this.filterProcess.bind(this);
        this.sortProcess = this.sortProcess.bind(this);
        this.onClear = this.onClear.bind(this);
        
    }

    onChangeSort() {}

    onFilter() {
        const { navigation } = this.props;
                navigation.navigate("FlightFilter",
                {
                    listdata:this.state.listdata_return_original,
                    filterProcess: this.filterProcess
                }
                );
    }
    
    onClear() {
        //console.log("---------------original------------------------------------");
        //console.log(JSON.stringify(this.state.listdata_return_original));
        this.setState({listdata_return:this.state.listdata_return_original});
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
        //console.log("----------------filter------------------------------------");
        //console.log(filter);
    
        var filter=filter;
        const products =this.state.listdata_return_original;
    
        
        if(filter.length != 0){
        var filters = {}
        if(filter.length != 0){
           filters = {
            num: num => filter.includes(num)
          };
        }
        filtered = this.filterArray(products, filters);
        this.setState({listdata_return:filtered});
    
       
        //console.log("----------------hasil filter------------------------------------");
        //console.log(filtered);
    
        }else{
            //console.log("----------------hasil filter------------------------------------");
            //console.log("null");
            this.setState({listdata_return:[]});
        }
    }
    
    sortProcess(listdata)
    {   
    
       //console.log('hasil sort',JSON.stringify(listdata));
       this.setState({listdata_return:listdata});
     
    }
    
    
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
        var param=this.state.param;

        var returnPost=this.removePrice(select);
        var departurePost=this.removePrice(this.state.selectDataDeparture);
       
        this.props.navigation.navigate("Summary",
                            {
                                param:this.state.param,
                                //paramOther:this.state.paramOther,
                                selectDataDeparture:this.state.selectDataDeparture,
                                selectDataReturn:select,
                                departurePost:departurePost,
                                returnPost:returnPost,
                            });



    }

    renderContent() {
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

        const { flights, refreshing, clampedScroll } = this.state;
        const { navigation } = this.props;
        const navbarTranslate = clampedScroll.interpolate({
            inputRange: [0, 40],
            outputRange: [0, -40],
            extrapolate: "clamp"
        });
        return (
            <View style={{ flex: 1 }}>
                <Animated.FlatList
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
                    data={this.state.listdata_return}
                    keyExtractor={(item, index) => item.id}
                    renderItem={({ item, index }) => (
                        
                        <FlightItem
                            loading={false}
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
                <Animated.View
                    style={[
                        styles.navbar,
                        { transform: [{ translateY: navbarTranslate }] }
                    ]}
                >
                    {/* <FilterSort
                        labelCustom={this.state.listdata_return.length+' result'}
                        onChangeSort={this.onChangeSort}
                        onFilter={this.onFilter}
                        onClear={this.onClear}
                    /> */}
                    
                    <FilterSort
                        labelCustom={this.state.listdata_return.length+' result'}
                        listdata={this.state.listdata_return_original}
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
        this.setState({listdata_return:this.state.listdata_return});
 }


    render() {
        const { navigation } = this.props;
        let { loading_spinner } = this.state;
        var param=this.state.param;
        var title=param.Destination+" to "+param.Origin;
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
        var subTitle=param.ReturnDate+", "+qty+" pax, "+kelas;
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
                
                            {
                            loading_spinner ? 
                            <ActivityIndicator
                                    size="large"
                                    color={BaseColor.primaryColor}
                            /> 
                            :
                            this.renderContent(this.state.listdata_return)
                            }       
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    navbar: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
        backgroundColor: BaseColor.whiteColor
    }
});
  
