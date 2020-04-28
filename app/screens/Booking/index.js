import React, { Component } from "react";
import { FlatList, RefreshControl,View,TouchableOpacity,AsyncStorage,ActivityIndicator,ScrollView } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, BookingHistory,Text,Button,BookingDetailFlight,BookingDetailTrip,PackageItem,RateDetail,CommentItem } from "@components";
import { TabView, TabBar } from "react-native-tab-view";
import { BookingHistoryData,UserData, ReviewData, TourData, PackageData,DataLoading } from "@data";
import {PostData} from '../../services/PostData';
import styles from "./styles";

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
                { key: "belumLunas", title: "Belum Lunas" },
                { key: "lunas", title: "Lunas" },
                // { key: "cancel", title: "Cancel" },
                // { key: "package", title: "Packages" },
                // { key: "review", title: "Review" }
                
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
    _renderScene = ({ route, jumpTo }) => {
        switch (route.key) {
            case "belumLunas":
                return (
                    <BelumLunasTab
                        jumpTo={jumpTo}
                        navigation={this.props.navigation}
                        data={this.state.dataBooking}
                    />
                );
            case "lunas":
                return (
                    <LunasTab
                        jumpTo={jumpTo}
                        navigation={this.props.navigation}
                        data={'yy'}
                    />
                );
            case "cancel":
                return (
                    <CancelTab
                        jumpTo={jumpTo}
                        navigation={this.props.navigation}
                        data={'zz'}
                    />
                );
            case "package":
                return (
                    <PackageTab
                        jumpTo={jumpTo}
                        navigation={this.props.navigation}
                    />
                );
            case "review":
                return (
                    <ReviewTab
                        jumpTo={jumpTo}
                        navigation={this.props.navigation}
                    />
                );
         
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

                // var id_user=userSession.id_user;
                //     const data={"id":id_user,"id_order":""}
                //     const param={"param":data}
                //     console.log('-------------param booking-------------');
                //     console.log(JSON.stringify(param));
                //     PostData('get_booking_history',param)
                //         .then((result) => {
                //             console.log("---------------get_booking_history ------------");
                //             console.log(JSON.stringify(result));
                //             this.setState({ loading_spinner: false });
                //             this.setState({dataBooking:result});
                //             AsyncStorage.setItem('dataBooking', JSON.stringify(result));    
                //         },
                //         (error) => {
                //             this.setState({ error });
                //         }
                //     ); 

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
                // <FlatList
                //         refreshControl={
                //             <RefreshControl
                //                 colors={[BaseColor.primaryColor]}
                //                 tintColor={BaseColor.primaryColor}
                //                 refreshing={refreshing}
                //                 onRefresh={() => {}}
                //             />
                //         }
                //         data={this.state.dataBooking}
                //         keyExtractor={(item, index) => item.id}
                //         renderItem={({ item }) => this.renderItem(item)}
                //     />
                     
                    <TabView
                    lazy
                    navigationState={this.state}
                    renderScene={this._renderScene}
                    renderTabBar={this._renderTabBar}
                    onIndexChange={this._handleIndexChange}
                />
                
                :
                <View>
                        <View style={{ padding: 20, alignItems: "center" }}>
                            <Icon
                                name="lock"
                                size={72}
                                color={BaseColor.lightPrimaryColor}
                                style={{ paddingTop: 50, paddingBottom: 20 }}
                            />
                            <Text title3 style={{ marginVertical: 0 }} semibold>
                                Your Profile
                            </Text>
                            <Text body1 grayColor style={{ textAlign: "center" }}>
                                Log in to start planning your next trip
                            </Text>
                            
                            <Button
                                full
                                style={{ marginTop: 20 }}
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
                    </View>    
                }
            </SafeAreaView>
        );
    }
}



class BelumLunasTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataBooking: [],
            DataLoading:DataLoading
        };
    }


    componentDidMount() {
        this.setState({ loading_spinner: true }, () => {

            AsyncStorage.getItem('userSession', (error, result) => {
            if (result) {
                let userSession = JSON.parse(result);
                console.log("---------------data session user  ------------");
                console.log(JSON.stringify(userSession));
                this.setState({userSession:userSession});
                this.setState({login:true});
                
                var id_user=userSession.id_user;
                    const data={"id":id_user,"id_order":"","status_payment":"belum_lunas"}
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

    render() {
        let { reviewList,loading_spinner } = this.state;
        return (
            <View>
            {
                loading_spinner ? 
                <Placeholder
                    Animation={Fade}
                    style={{ padding: 20 }}
                >
                    <PlaceholderLine width={100} height={100} style={{marginTop: 10,marginBottom:0,borderRadius: 5}} />
                    <PlaceholderLine width={100} height={100} style={{marginTop: 10,marginBottom:0,borderRadius: 5}} />
                    <PlaceholderLine width={100} height={100} style={{marginTop: 10,marginBottom:0,borderRadius: 5}} />
                    <PlaceholderLine width={100} height={100} style={{marginTop: 10,marginBottom:0,borderRadius: 5}} />
                </Placeholder>
            :

            <FlatList
                style={{ padding: 20 }}
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
                        onPress={() => {
                            this.props.navigation.navigate("PreviewBooking",{item:item});
                        }}
                        status={'belum_lunas'}
                    />
                )}
            />
                    }
            </View>
        );
    }
}


class LunasTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataBooking: [],
            DataLoading:DataLoading
        };
    }


    componentDidMount() {
        this.setState({ loading_spinner: true }, () => {

            AsyncStorage.getItem('userSession', (error, result) => {
            if (result) {
                let userSession = JSON.parse(result);
                console.log("---------------data session user  ------------");
                console.log(JSON.stringify(userSession));
                this.setState({userSession:userSession});
                this.setState({login:true});
                
                var id_user=userSession.id_user;
                const data={"id":id_user,"id_order":"","status_payment":"lunas"}
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

    render() {
        let { reviewList,loading_spinner } = this.state;
        return (
            <View>
            {
                loading_spinner ? 
                <Placeholder
                    Animation={Fade}
                    style={{ padding: 20 }}
                >
                    <PlaceholderLine width={100} height={100} style={{marginTop: 10,marginBottom:0,borderRadius: 5}} />
                    <PlaceholderLine width={100} height={100} style={{marginTop: 10,marginBottom:0,borderRadius: 5}} />
                    <PlaceholderLine width={100} height={100} style={{marginTop: 10,marginBottom:0,borderRadius: 5}} />
                    <PlaceholderLine width={100} height={100} style={{marginTop: 10,marginBottom:0,borderRadius: 5}} />
                </Placeholder>
            :

            <FlatList
                style={{ padding: 20 }}
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
                        onPress={() => {
                            this.props.navigation.navigate("PreviewBooking",{item:item});
                        }}
                        status={'lunas'}
                    />
                )}
            />
                    }
            </View>
        );
    }
}


class CancelTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataBooking: [],
            DataLoading:DataLoading
        };
    }


    componentDidMount() {
        this.setState({ loading_spinner: true }, () => {

            AsyncStorage.getItem('userSession', (error, result) => {
            if (result) {
                let userSession = JSON.parse(result);
                console.log("---------------data session user  ------------");
                console.log(JSON.stringify(userSession));
                this.setState({userSession:userSession});
                this.setState({login:true});
                
                var id_user=userSession.id_user;
                    const data={"id":id_user,"id_order":"","status_payment":"lunas"}
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

    render() {
        let { reviewList,loading_spinner } = this.state;
        return (
            <View>
            {
                loading_spinner ? 
                <Placeholder
                    Animation={Fade}
                    style={{ padding: 20 }}
                >
                    <PlaceholderLine width={100} height={100} style={{marginTop: 10,marginBottom:0,borderRadius: 5}} />
                    <PlaceholderLine width={100} height={100} style={{marginTop: 10,marginBottom:0,borderRadius: 5}} />
                    <PlaceholderLine width={100} height={100} style={{marginTop: 10,marginBottom:0,borderRadius: 5}} />
                    <PlaceholderLine width={100} height={100} style={{marginTop: 10,marginBottom:0,borderRadius: 5}} />
                </Placeholder>
            :

            <FlatList
                style={{ padding: 20 }}
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
                        onPress={() => {
                            this.props.navigation.navigate("PreviewBooking",{id_order:item.id_order});
                        }}
                        status={'cancel'}
                    />
                )}
            />
                    }
            </View>
        );
    }
}






/**
 * @description Show when tab Package activated
 * @author Passion UI <passionui.com>
 * @date 2019-08-03
 * @class PreviewTab
 * @extends {Component}
 */
class PackageTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            packageItem: PackageData[0],
            packageItem2: PackageData[2]
        };
    }

    render() {
        const { packageItem, packageItem2 } = this.state;

        return (
            <ScrollView>
                <View style={{ paddingHorizontal: 20 }}>
                    <Text body2 style={{ marginTop: 20 }}>
                        Europe welcomes millions of travelers every year. With
                        Expat Explore you can see all that Europe has to offer.
                        Take the time to explore small villages and big cities.
                        There's lots to choose from in over 50 independent
                        states. Our Europe multi-country tours are some of the
                        best packages. We offer you great prices, quality and
                        convenience. Get ready for the best European vacation!
                        Europe has a list of possible adventures for everyone.{" "}
                    </Text>
                    <PackageItem
                        packageName={packageItem.packageName}
                        price={packageItem.price}
                        type={packageItem.type}
                        description={packageItem.description}
                        services={packageItem.services}
                        onPressIcon={() => {
                            this.props.navigation.navigate("PricingTable");
                        }}
                        style={{ marginBottom: 10, marginTop: 20 }}
                    />
                    <PackageItem
                        detail
                        packageName={packageItem2.packageName}
                        price={packageItem2.price}
                        type={packageItem2.type}
                        description={packageItem2.description}
                        services={packageItem2.services}
                    />
                </View>
            </ScrollView>
        );
    }
}

/**
 * @description Show when tab Review activated
 * @author Passion UI <passionui.com>
 * @date 2019-08-03
 * @class PreviewTab
 * @extends {Component}
 */
class ReviewTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rateDetail: {
                point: 4.7,
                maxPoint: 5,
                totalRating: 25,
                data: ["80%", "10%", "10%", "0%", "0%"]
            },
            reviewList: ReviewData
        };
    }
    render() {
        let { rateDetail, reviewList } = this.state;
        return (
            <FlatList
                style={{ padding: 20 }}
                refreshControl={
                    <RefreshControl
                        colors={[BaseColor.primaryColor]}
                        tintColor={BaseColor.primaryColor}
                        refreshing={this.state.refreshing}
                        onRefresh={() => {}}
                    />
                }
                data={reviewList}
                keyExtractor={(item, index) => item.id}
                ListHeaderComponent={() => (
                    <RateDetail
                        point={rateDetail.point}
                        maxPoint={rateDetail.maxPoint}
                        totalRating={rateDetail.totalRating}
                        data={rateDetail.data}
                    />
                )}
                renderItem={({ item }) => (
                    <CommentItem
                        style={{ marginTop: 10 }}
                        image={item.source}
                        name={item.name}
                        rate={item.rate}
                        date={item.date}
                        title={item.title}
                        comment={item.comment}
                    />
                )}
            />
        );
    }
}