import React, { Component } from "react";
import { FlatList, RefreshControl,View,TouchableOpacity,AsyncStorage,ActivityIndicator,ScrollView,Dimensions } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, BookingHistory,Text,Button,BookingDetailFlight,BookingDetailTrip,PackageItem,RateDetail,CommentItem } from "@components";
import { TabView, TabBar } from "react-native-tab-view";
import { BookingHistoryData,UserData, ReviewData, TourData, PackageData,DataLoading } from "@data";
import {PostData} from '../../services/PostData';
import styles from "./styles";
import { Image } from "@components";
import { Images } from "@config";
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
  } from "rn-placeholder";
  import NotYetLogin from "../../components/NotYetLogin";

export default class Booking extends Component {
    constructor(props) {
        super(props);


        // AsyncStorage.getItem('userSession', (error, result) => {
        //     if (result) {
        //         let userSession = JSON.parse(result);
        //         console.log("---------------data session user  ------------");
        //         console.log(JSON.stringify(userSession));
        //         this.setState({userSession:userSession});
        //         this.setState({login:true});
        //      }
            
        // });

        this.state = {
            loading: false,
            refreshing: false,
            bookingHistory: BookingHistoryData,
            login:true,
            loading_spinner:false,

            index: 0,
            routes: [
              


                { key: "OrderFlight", title: "Flight" },
                { key: "OrderHotel", title: "Hotel" },
                { key: "OrderTrip", title: "Trip" },
                { key: "OrderVoucher", title: "Voucher" },
                // { key: "OrderBooked", title: "Booked" },
                // { key: "OrderComplete", title: "Complete" },
                // { key: "OrderCanceled", title: "Cancel" },
                // { key: "OrderExpired", title: "Expired" },
                // { key: "OrderBilled", title: "Billed" },


                
            ],
            dataBooking:[]
        };
    }



    // When tab is activated, set what's index value
    _handleIndexChange = index =>
        this.setState({
            index
        });

    // Customize UI tab bar
    _renderTabBar = props => (
        <TabBar
            {...props}
            scrollEnabled
            indicatorStyle={styles.indicator}
            style={styles.tabbar}
            tabStyle={styles.tab}
            labelStyle={styles.noLabel}
            inactiveColor={BaseColor.grayColor}
            activeColor={BaseColor.textPrimaryColor}
            renderLabel={({ route, focused, color }) => (
                <View style={{ flex: 1, width: 100, alignItems: "center" }}>
                    <Text headline semibold={focused} style={{ color }}>
                        {route.title}
                    </Text>
                </View>
            )}
        />
    );

    // Render correct screen container when tab is activated

    // { key: "OrderNew", title: "New Order" },
    // { key: "OrderProcess", title: "Processed" },
    // { key: "OrderPaid", title: "Paid" },
    // { key: "OrderBooked", title: "Booked" },
    // { key: "OrderComplete", title: "Complete" },
    // { key: "OrderCanceled", title: "Cancel" },
    // { key: "OrderExpired", title: "Expired" },
    // { key: "OrderBilled", title: "Billed" },


    _renderScene = ({ route, jumpTo }) => {
        switch (route.key) {
            case "OrderFlight":
                return (
                    <OrderTab
                        status={'new'}
                        product={'Flight'}
                        jumpTo={jumpTo}
                        navigation={this.props.navigation}
                    />
                );
            case "OrderHotel":
                    return (
                        <OrderTab
                        status={'process'}
                        product={'Hotel'}
                        jumpTo={jumpTo}
                        navigation={this.props.navigation}
                        />
            );
            case "OrderTrip":
                    return (
                        <OrderTab
                        status={'paid'}
                        product={'Trip'}
                        jumpTo={jumpTo}
                        navigation={this.props.navigation}
                        />
            );
            // case "OrderBooked":
            //         return (
            //             <OrderTab
            //             status={'booked'}
            //             jumpTo={jumpTo}
            //             navigation={this.props.navigation}
            //             />
            // );
            // case "OrderComplete":
            //     return (
            //         <OrderTab
            //         status={'complete'}
            //         jumpTo={jumpTo}
            //         navigation={this.props.navigation}
            //         />
            // );
            // case "OrderCanceled":
            //     return (
            //         <OrderTab
            //         status={'cancel'}
            //         jumpTo={jumpTo}
            //         navigation={this.props.navigation}
            //         />
            // );
            // case "OrderExpired":
            //     return (
            //         <OrderTab
            //         status={'expired'}
            //         jumpTo={jumpTo}
            //         navigation={this.props.navigation}
            //         />
            // );
            // case "OrderBilled":
            //     return (
            //         <OrderTab
            //         status={'billed'}
            //         jumpTo={jumpTo}
            //         navigation={this.props.navigation}
            //         />
            // );
          
          
           
         
        }
    };
  

    componentDidMount() {
       
        
        const {navigation} = this.props;
        navigation.addListener ('willFocus', () =>{
            this.setState({ loading_spinner: true }, () => {

                AsyncStorage.getItem('userSession', (error, result) => {
                if (result) {
                    let userSession = JSON.parse(result);
                    console.log("---------------data session user  ------------");
                    console.log(JSON.stringify(userSession));
                    this.setState({userSession:userSession});
                    this.setState({login:true});
                    this.setState({ loading_spinner: false });
    
                 }else{
                    this.setState({login:false});
    
                 }
                
                });
            });
        });
        
        
    }


    renderItem(item) {

        
        return (
            <BookingHistory
                item={item}
                name={item.product+' - '+item.product}
                checkIn={item.product}
                checkOut={item.product}
                total={item.product}
                price={item.product}
                style={{ paddingVertical: 10, marginHorizontal: 20 }}
                onPress={() => {
                    this.props.navigation.navigate("PreviewBooking",{id_order:item.id_order});
                }}
            />
        );
    }

    /**
     * @description Loading booking item history one by one
     * @author Passion UI <passionui.com>
     * @date 2019-08-03
     * @returns
     */
    render() {
        const { navigation } = this.props;
        let { refreshing, bookingHistory,login,loading_spinner } = this.state;
        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <Header title="Booking History" />
                
                {
                    login ? 
                        loading_spinner ? 
                        <ActivityIndicator
                                size="large"
                                color={BaseColor.primaryColor}
                                style={{position: 'absolute',
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0,
                                alignItems: 'center',
                                justifyContent: 'center'
                                }}
                        /> 
                        :
                    <TabView
                    lazy
                    navigationState={this.state}
                    renderScene={this._renderScene}
                    renderTabBar={this._renderTabBar}
                    onIndexChange={this._handleIndexChange}
                    onIndexChange={index => this.setState({index})}
                    initialLayout={{height: 100, width: Dimensions.get('window').width}}
                />
                
                :
                <NotYetLogin redirect={'Booking'} navigation={navigation} />
                  
                }
            </SafeAreaView>
        );
    }
}



class OrderTab extends Component {
    constructor(props) {
        super(props);
        var product=this.props.product;
        //alert(product);
        this.state = {
            dataBooking: [
                {
                    "id_order": "2789",
                    "order_code": "MD2006180015",
                    "order_expired": "2020-06-17 13:37:00",
                    "order_status": "new",
                    "order_status_name": "New Order",
                    "aero_status": "0",
                    "product": "Trip",
                    "total_price": "2800000",
                    "pax_people": "0",
                    "status_payment": "belum_lunas",
                    "current_payment": {
                        "expired": null,
                        "amount": "2800000",
                        "datetime": "2020-06-18 17:09:31",
                        "status": "not_paid"
                    },
                    "order_payment": [
                        {
                            "expired": null,
                            "amount": "2800000",
                            "datetime": "2020-06-18 17:09:31",
                            "status": "not_paid"
                        }
                    ],
                    "detail": [
                        {
                            "type": "Trip",
                            "product_name": "EXPLORE SILANGIT – TOBA – BRASTAGI – MEDAN 3HARI 2MALAM",
                            "pax": [
                                {
                                    "title": "Mr",
                                    "first_name": "arifinss",
                                    "last_name": "hendra",
                                    "type": null
                                }
                            ],
                            "order_product": [
                                {
                                    "product_name": "EXPLORE SILANGIT – TOBA – BRASTAGI – MEDAN 3HARI 2MALAM",
                                    "qty": "1",
                                    "price": "2800000",
                                    "product_total": "2800000"
                                }
                            ],
                            "order_product_trip": []
                        }
                    ],
                    "payment": [],
                    "contact": {
                        "contact_name": "arifinss hendra",
                        "contact_phone": "6666666",
                        "contact_email": "matadesaindotcom@gmail.com"
                    }
                }],
            button:[
                {
                    title: "New Order",
                    status:"new"
                },
                {
                    title: "Processed",
                    status:"process"
                },
                {
                    title: "Paid",
                    status:"paid"
                },
                {
                    title: "Booked",
                    status:"booked"
                },
                {
                    title: "Complete",
                    status:"complete"
                },
                {
                    title: "Canceled",
                    status:"cancel"
                },
                {
                    title: "Expired",
                    status: "expired",
                },
                {
                    title: "Billed",
                    status: "billed",
                },
               
            ],
            status:'new',
            product:product,
            colorButtonActive:BaseColor.primaryColor,
            statusActive:'new'
        };
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
                    const data={"id":id_user,"id_order":"","order_status":this.state.status,"product":this.state.product}
                    const param={"param":data}
                    console.log('-------------param booking-------------');
                    console.log(JSON.stringify(param));


                    PostData('get_booking_history',param)
                        .then((result) => {
                            console.log("---------------get_booking_history ------------");
                            console.log(JSON.stringify(result));
                            this.setState({ loading_spinner: false });
                            this.setState({dataBooking:result});
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

    fetchByStatus(status){
       this.setState({status:status});
              setTimeout(() => {
                                  this.fetch();
                                }, 500);


    }


    componentDidMount() {
        this.fetch();
    }


    render() {
    const {navigation}=this.props;
        return (
            <View>

                                <FlatList
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    data={this.state.button}
                                    keyExtractor={(item, index) => item.id}
                                    renderItem={({ item, index }) => (
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.fetchByStatus(item.status);
                                            }}
                                        >
                                            <View style={{padding:10,backgroundColor:BaseColor.secondColor,margin:5,borderRadius:10}}>
                                                <Text>
                                                    {item.title}
                                                </Text>
                                            </View>
                                         
                                        </TouchableOpacity>
                                    )}
                                />


            <FlatList
                refreshControl={
                    <RefreshControl
                        colors={[BaseColor.primaryColor]}
                        tintColor={BaseColor.primaryColor}
                        refreshing={this.state.refreshing}
                        onRefresh={() => {}}
                    />
                }
                data={this.state.dataBooking}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item }) => (
                    <CommentItem
                        style={{ marginTop: 10 }}
                        item={item}
                        loading={this.state.loading_spinner}
                        navigation={navigation}
                        // onPress={() => {
                        //     //this.props.navigation.navigate("PreviewBooking",{item:item});
                        //     this.props.navigation.navigate("Pembayaran",{param:item.id_order});
                        // }}
                    />
                )}
            />
            
            </View>
        );
    }
}




