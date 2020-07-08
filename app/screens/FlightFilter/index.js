import React, { Component } from "react";
import { View, FlatList, Switch, ScrollView,TouchableOpacity } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import {
    Header,
    SafeAreaView,
    Icon,
    Text,
    BookingTime,
    Tag
} from "@components";
import RangeSlider from "rn-range-slider";
import * as Utils from "@utils";
import styles from "./styles";

export default class FlightFilter extends Component {
    constructor(props) {
        super(props);
        var listdata=this.props.navigation.state.params.listdata;
        console.log("----------------listdata asli ------------------------------------");
        console.log(JSON.stringify(listdata));


        var listdata_new = [];
        var a=1;
        listdata.map(item => {
            var obj = {};
            var fas=[];
            obj['num'] = a.toString();
            obj['transit'] = item.transit.toString();
            obj['airline'] = item.airline_code;
            obj['price'] = item.price.total_price;
            obj['meal'] = item.flight_schedule[0].meal;
            

            if (item.flight_schedule[0].inflight_entertainment != false){
                obj['entertainment']="1";
                fas.push("entertainment"); 
            }else{
                obj['entertainment']="0";
            }


            if (item.flight_schedule[0].baggage != 0){
                obj['baggage']="1";
                fas.push("baggage");
            }else{
                obj['baggage']="0";
            }

            if (item.flight_schedule[0].meal != "0"){
                fas.push("meal");
            }

            obj['fasilities']=fas;


            listdata_new.push(obj);
            a++;
        });


        console.log("----------------departure new ------------------------------------");
        console.log(listdata_new);


        

        this.state = {
            round: true,
            scrollEnabled: true,
            priceBegin: 0,
            priceEnd: 1000,
            durationBegin: 0,
            durationEnd: 18,
            facilities: [
                { id: "1", name: "Economy", checked: true },
                { id: "2", name: "Business" },
                { id: "3", name: "First" },
                { id: "4", name: "Normal" }
            ],
            transit: [
                { id: "1", name: "Direct", checked: true },
                { id: "2", name: "1 Transit" },
                { id: "3", name: "2 Transits" },
                { id: "4", name: "+2 Transits" }
            ],
            airline: [
                // { id: "ALL", selected: true, title: "All" },
                { id: "QG", selected: false, title: "Citilink" },
                { id: "SJ", selected: false, title: "Sriwijaya" },
                { id: "GA", selected: false, title: "Garuda Indonesia" },
            ],
            transits: [
                // { id: "ALL", selected: true, title: "All" },
                { id: "0", selected: false, title: "Direct" },
                { id: "1", selected: false, title: "1 Transit" },
                { id: "2", selected: false, title: "2 Transits" },
                { id: "4", selected: false, title: "+2 Transits" },
            ],
            facilitiess: [
                // { id: "ALL", selected: true, title: "All" },
                { id: "baggage", selected: false, title: "Bagasi" },
                { id: "entertainment", selected: false, title: "Hiburan" },
                { id: "meal", selected: false, title: "Makanan" },
            ],

            // listdata_departure_new:listdata_departure_new,
            listdata_new:listdata_new,
            listdata:listdata,

        };
        this.onChangeRound = this.onChangeRound.bind(this);
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

    componentDidMount() {
          
    }


    onChangeRound(status) {
        this.setState({ round: status });
    }

    /**
     * @description Called when filtering option > Facilities
     * @author Passion UI <passionui.com>
     * @date 2019-08-03
     * @param {*} select
     */
    onSelectTransit(select) {
        this.setState({
            transit: this.state.transit.map(item => {
                if (item.name == select.name) {
                    return {
                        ...item,
                        checked: true
                    };
                } else {
                    return {
                        ...item,
                        checked: false
                    };
                }
            })
        });
    }

    /**
     * @description Called when filtering option > Facilities
     * @author Passion UI <passionui.com>
     * @date 2019-08-03
     * @param {*} select
     */
    onSelectFacilities(select) {
        this.setState({
            facilities: this.state.facilities.map(item => {
                if (item.name == select.name) {
                    return {
                        ...item,
                        checked: true
                    };
                } else {
                    return {
                        ...item,
                        checked: false
                    };
                }
            })
        });
    }

    onSelectTransits(selected) {
        this.setState({
            transits: this.state.transits.map(item => {
                return {
                    ...item,
                    selected:
                        selected.id == item.id ? !item.selected : item.selected
                };
            })
        });
    }

    onSelectAirline(selected) {
        this.setState({
            airline: this.state.airline.map(item => {
                return {
                    ...item,
                    selected:
                        selected.id == item.id ? !item.selected : item.selected
                };
            })
        });
    }

    onSelectFacilitiess(selected) {
        this.setState({
            facilitiess: this.state.facilitiess.map(item => {
                return {
                    ...item,
                    selected:
                        selected.id == item.id ? !item.selected : item.selected
                };
            })
        });
    }

    filterByAirline(){
        var airline=[]
        this.state.airline.map(item => {
            if(item.selected==true){
                airline.push(item.id);
            }

        })

        var filter=airline;
        const products =this.state.listdata_new;

        //script filter
        var filters = {}
        if(filter.length != 0){
           filters = {
            airline: airline => filter.includes(airline.toUpperCase())
          };
        }
        const filtered = this.filterArray(products, filters);


        console.log("----------------hasil filter airline------------------------------------");
        console.log(filtered);

        
        this.filterByTransit(filtered);
        

    }

    filterByTransit(filtered){

        var transits=[]
        this.state.transits.map(item => {
            if(item.selected==true){
                transits.push(item.id);
            }

        })
        console.log("---------------filter transits------------------------------------");
        console.log(JSON.stringify(transits));

         var filter=transits;
         const products =filtered;

         //script filter
         var filters = {}
         if(filter.length != 0){
            filters = {
             transit: transit => filter.includes(transit)
           };
         }
         filtered = this.filterArray(products, filters);
 
 
         console.log("----------------hasil filter transit------------------------------------");
         console.log(filtered);
         this.filterByFasilites(filtered);
        
    }

    filterByFasilites(filtered){

        var facilitiess=[]
        this.state.facilitiess.map(item => {
            if(item.selected==true){
                facilitiess.push(item.id);
            }

        })
        console.log("----------------filter fasilitas-----------------------------------");
        console.log(JSON.stringify(facilitiess));


         var filter=facilitiess;
         const products =filtered;

         //script filter
         var filters = {}
         if(filter.length != 0){
            filters = {
                fasilities: fasilities => fasilities.find(x => filter.includes(x.toLowerCase()))
           };
         }
         filtered = this.filterArray(products, filters);
 
 
         console.log("----------------hasil filter fasilities------------------------------------");
         console.log(filtered);
         this.filterByBudget(filtered);
        
    }

    filterByBudget(filtered){
        
        var priceBegin=this.state.priceBegin;
        var priceEnd=this.state.priceEnd;       

        console.log("----------------harga terendah ------------------------------------");
        console.log(priceBegin);

        console.log("----------------harga tertinggi ------------------------------------");
        console.log(priceEnd);
        
        const products =filtered;
        
       
        filtered = products.filter(function (el) {
          return el.price >= parseInt(priceBegin) && el.price <= parseInt(priceEnd); 
        });


       console.log("----------------hasil filter harga------------------------------------");
       console.log(filtered);
       this.filterFinal(filtered);
    }
    
    filterFinal(filtered){
        const { navigation } = this.props;
        var filter = [];
        filtered.map(item => {
            filter.push(item.num);
        });


        this.props.navigation.state.params.filterProcess(filter);
        navigation.goBack();

        
    }


    submitFilter(){
        const { navigation } = this.props;

        this.filterByAirline();


     


       


 

        // const products =this.state.listdata_departure_new;
      
        // const filters = {
        //   airline_code: airline_code => airline.includes(airline_code.toUpperCase()),
        // };

        //     const filtered = this.filterArray(products, filters);
        //  console.log("----------------hasil filter asli------------------------------------");
        //  console.log(filtered);
        //  console.log(filters);




         // const products = [
        //     { name: 'A', color: 'Blue', size: 50, locations: ['USA', 'Europe'], details: { length: 20, width: 70 } },
        //     { name: 'B', color: 'Blue', size: 60, locations: [], details: { length: 20, width: 70 } },
        //     { name: 'C', color: 'Black', size: 70, locations: ['Japan'], details: { length: 20, width: 71 } },
        //     { name: 'D', color: 'Green', size: 50, locations: ['USA'], details: { length: 20, width: 71 } },
        //   ];
      
        //   const filters = {
        //     size: size => size === 50 || size === 70,
        //     color: color => ['blue', 'black'].includes(color.toLowerCase()),
        //     locations: locations => locations.find(x => ['JAPAN', 'USA'].includes(x.toUpperCase())),
        //     details: details => details.length < 30 && details.width >= 70,
            
        //   };




        //navigation.goBack();

                                // navigation.navigate('FlightResult',
                                // {
                                // param:param,
                                // paramOther:paramOther,
                                // listdata_departure:listdata_departure,
                                // listdata_return:listdata_return,
                                // });
    }

    render() {
        const { navigation } = this.props;
        const {
            round,
            scrollEnabled,
            priceBegin,
            priceEnd,
            durationBegin,
            durationEnd,
            facilities,
            facilitiess,
            transit,
            transits,
            airline
        } = this.state;
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <Header
                    title="Filtering"
                    renderLeft={() => {
                        return (
                            <Icon
                                name="times"
                                size={20}
                                color={BaseColor.whiteColor}
                            />
                        );
                    }}
                    renderRight={() => {
                        return (
                            <Text headline whiteColor numberOfLines={1}>
                                Apply
                            </Text>
                        );
                    }}
                    onPressLeft={() => navigation.goBack()}
                    onPressRight={() => this.submitFilter()}
                />
                <ScrollView
                    scrollEnabled={scrollEnabled}
                    onContentSizeChange={(contentWidth, contentHeight) =>
                        this.setState({
                            scrollEnabled: Utils.scrollEnabled(
                                contentWidth,
                                contentHeight
                            )
                        })
                    }
                >
                    <View style={styles.contain}>
                        {/* <BookingTime
                            style={{ marginTop: 20, marginHorizontal: 20 }}
                        /> */}
                        {/* <View style={styles.roundLine}>
                            <Text headline semibold>
                                ROUND TRIP
                            </Text>
                            <Switch
                                size={18}
                                onValueChange={this.onChangeRound}
                                value={round}
                            />
                        </View> */}
                       
                        
                        {/* <Text
                            headline
                            semibold
                            style={{ marginLeft: 20, marginTop: 20 }}
                        >
                            Class Cabin
                        </Text>
                        <View style={{ marginTop: 5 }}>
                            <FlatList
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                data={facilities}
                                keyExtractor={(item, index) => item.id}
                                renderItem={({ item, index }) => (
                                    <Tag
                                        style={{ marginLeft: 20, width: 80 }}
                                        outline={!item.checked}
                                        primary={item.checked}
                                        onPress={() =>
                                            this.onSelectFacilities(item)
                                        }
                                    >
                                        {item.name}
                                    </Tag>
                                )}
                            />
                        </View> */}





                        {/* <View style={{ marginTop: 20, marginHorizontal: 20 }}>
                            <Text headline semibold>
                                DURATION
                            </Text>
                            <View style={styles.contentRange}>
                                <Text caption1 grayColor>
                                    0h
                                </Text>
                                <Text caption1 grayColor>
                                    18h
                                </Text>
                            </View>
                            <RangeSlider
                                style={{
                                    width: "100%",
                                    height: 40
                                }}
                                thumbRadius={12}
                                lineWidth={5}
                                gravity={"center"}
                                labelStyle="none"
                                min={0}
                                max={18}
                                step={1}
                                selectionColor={BaseColor.primaryColor}
                                blankColor={BaseColor.textSecondaryColor}
                                onValueChanged={(low, high, fromUser) => {
                                    this.setState({
                                        durationBegin: low,
                                        durationEnd: high
                                    });
                                }}
                                onTouchStart={() => {
                                    this.setState({
                                        scrollEnabled: false
                                    });
                                }}
                                onTouchEnd={() => {
                                    this.setState({
                                        scrollEnabled: true
                                    });
                                }}
                            />
                            <View style={styles.contentResultRange}>
                                <Text caption1>AVG Time</Text>
                                <Text caption1>
                                    {durationBegin}h - {durationEnd}h
                                </Text>
                            </View>
                        </View> */}
                        <View style={styles.roundLine}>
                            <Text headline semibold>
                                AIR PLANE
                            </Text>
                        </View>
                        <View style={{ marginLeft: 20, marginTop: 20 }}>
                        {airline.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    key={index.toString()}
                                    style={styles.lineCategory}
                                    onPress={() => this.onSelectAirline(item)}
                                >
                                    <Icon
                                        name={
                                            item.selected
                                                ? "check-circle"
                                                : "circle"
                                        }
                                        size={24}
                                        color={BaseColor.primaryColor}
                                    />
                                    <Text body1 style={{ marginLeft: 10 }}>
                                        {item.title}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                        </View>


                        <View style={styles.roundLine}>
                            <Text headline semibold>
                                TRANSITS
                            </Text>
                        </View>
                        <View style={{ marginLeft: 20, marginTop: 20 }}>
                        {transits.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    key={index.toString()}
                                    style={styles.lineCategory}
                                    onPress={() => this.onSelectTransits(item)}
                                >
                                    <Icon
                                        name={
                                            item.selected
                                                ? "check-circle"
                                                : "circle"
                                        }
                                        size={24}
                                        color={BaseColor.primaryColor}
                                    />
                                    <Text body1 style={{ marginLeft: 10 }}>
                                        {item.title}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                        </View>

                        <View style={styles.roundLine}>
                            <Text headline semibold>
                                FASILITIES
                            </Text>
                        </View>
                        <View style={{ marginLeft: 20, marginTop: 20 }}>
                        {facilitiess.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    key={index.toString()}
                                    style={styles.lineCategory}
                                    onPress={() => this.onSelectFacilitiess(item)}
                                >
                                    <Icon
                                        name={
                                            item.selected
                                                ? "check-circle"
                                                : "circle"
                                        }
                                        size={24}
                                        color={BaseColor.primaryColor}
                                    />
                                    <Text body1 style={{ marginLeft: 10 }}>
                                        {item.title}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                        </View>


                        {/* <Text
                            headline
                            semibold
                            style={{ marginLeft: 20, marginTop: 20 }}
                        >
                            TRANSIT
                        </Text>
                        <View style={{ marginTop: 5 }}>
                            <FlatList
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                data={transit}
                                keyExtractor={(item, index) => item.id}
                                renderItem={({ item, index }) => (
                                    <Tag
                                        style={{ marginLeft: 20, width: 80 }}
                                        outline={!item.checked}
                                        primary={item.checked}
                                        onPress={() =>
                                            this.onSelectTransit(item)
                                        }
                                    >
                                        {item.name}
                                    </Tag>
                                )}
                            />
                        </View> */}


                        <View style={{ marginTop: 20, marginHorizontal: 20 }}>
                            <Text headline semibold>
                                BUDGET
                            </Text>
                            <View style={styles.contentRange}>
                                <Text caption1 grayColor>
                                    Rp 100.000
                                </Text>
                                <Text caption1 grayColor>
                                    Rp 10.000.000
                                </Text>
                            </View>
                            <RangeSlider
                                style={{
                                    width: "100%",
                                    height: 40
                                }}
                                thumbRadius={12}
                                lineWidth={5}
                                gravity={"center"}
                                labelStyle="none"
                                min={100000}
                                max={10000000}
                                step={1}
                                selectionColor={BaseColor.primaryColor}
                                blankColor={BaseColor.textSecondaryColor}
                                onValueChanged={(low, high, fromUser) => {
                                    this.setState({
                                        priceBegin: low,
                                        priceEnd: high
                                    });
                                }}
                                onTouchStart={() => {
                                    this.setState({
                                        scrollEnabled: false
                                    });
                                }}
                                onTouchEnd={() => {
                                    this.setState({
                                        scrollEnabled: true
                                    });
                                }}
                            />
                            <View style={styles.contentResultRange}>
                                <Text caption1>Range Price</Text>
                                <Text caption1>
                                    IDR {priceSplitter(priceBegin)} - IDR {priceSplitter(priceEnd)}
                                </Text>
                            </View>
                        </View>

                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}
