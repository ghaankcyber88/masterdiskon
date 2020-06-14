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
                <View
                    style={{flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',padding: 20}}
                    >       
                    <Image
                        source={Images.login}
                        style={{ width: "60%", height: "60%" }}
                        resizeMode="cover"
                    />
                    <View><Text>Anda Belum Login</Text></View>
                    <Button
                                full
                                style={{ 
                                     marginTop: 20,
                                    borderRadius: 18,
                                // backgroundColor: BaseColor.fieldColor,
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                elevation: 5 }}
                                loading={this.state.loading}
                                onPress={() => navigation.navigate("SignIn",{redirect:'Booking'})}
                            >
                                Sign In
                            </Button>
                    <View style={styles.contentActionBottom}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate("SignUp")}
                                >
                                    <Text body1 grayColor>
                                        Haven’t registered yet?
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => navigation.navigate("SignUp")}
                                >
                                    <Text body1 primaryColor>
                                        Join Now
                                    </Text>
                                </TouchableOpacity>
                            </View>
                </View>
                  
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
            dataBooking: [],
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
                        onPress={() => {
                            //this.props.navigation.navigate("PreviewBooking",{item:item});
                            this.props.navigation.navigate("Pembayaran",{param:item.id_order});
                        }}
                    />
                )}
            />
            
            </View>
        );
    }
}




