import React, { Component } from "react";
import { FlatList, RefreshControl, View, Animated } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, TourItem, FilterSort } from "@components";
import styles from "./styles";
import * as Utils from "@utils";
import {PostData} from '../../services/PostData';
// Load sample data
import { TourData, DataMasterDiskon,DataLoading} from "@data";
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
  } from "rn-placeholder";

export default class Tour extends Component {
    constructor(props) {
        super(props);
        const scrollAnim = new Animated.Value(0);
        const offsetAnim = new Animated.Value(0);
        
        if(this.props.navigation.state.params && this.props.navigation.state.params.country){
            country=this.props.navigation.state.params.country;
            id_country=country.id_country;
        }else{
            id_country='';
        }
        

        this.state = {
            refreshing: false,
            modeView: "block",
            tours: TourData,
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
            id_country:id_country,
            DataMasterDiskon:DataMasterDiskon[0],
            listdata_trip:DataLoading
        };
        this.onChangeView = this.onChangeView.bind(this);
        this.onFilter = this.onFilter.bind(this);
        this.onChangeSort = this.onChangeSort.bind(this);
    }


    
    getTour(){
        this.setState({ loading_spinner: true }, () => {
            const data={'id_trip':'','id_country':this.state.id_country,'harga_min':'','harga_max':''}
            const param={"param":data}
            console.log('-------------param trip-------------');
            console.log(JSON.stringify(param));
            PostData('trip',param)
                .then((result) => {
                    this.setState({ loading_spinner: false });
                    this.setState({listdata_trip: result});
                    console.log("-------------GET TOUR--------------")
                    console.log(JSON.stringify(result));
                },
                (error) => {
                    this.setState({ error });
                }
            ); 

        });    

    }

    componentDidMount() {
        this.getTour();
    }


    onChangeSort() {}

    /**
     * @description Open modal when filterring mode is applied
     * @author Passion UI <passionui.com>
     * @date 2019-08-03
     */
    onFilter() {
        const { navigation } = this.props;
        navigation.navigate("Filter");
    }

    /**
     * @description Open modal when view mode is pressed
     * @author Passion UI <passionui.com>
     * @date 2019-08-03
     */
    onChangeView() {
        let { modeView } = this.state;
        Utils.enableExperimental();
        switch (modeView) {
            case "block":
                this.setState({
                    modeView: "grid"
                });
                break;
            case "grid":
                this.setState({
                    modeView: "list"
                });
                break;
            case "list":
                this.setState({
                    modeView: "block"
                });
                break;
            default:
                this.setState({
                    modeView: "block"
                });
                break;
        }
    }

    /**
     * @description Render container view
     * @author Passion UI <passionui.com>
     * @date 2019-08-03
     * @returns
     */
    renderContent() {
        const { modeView, tours, refreshing, clampedScroll,loading_spinner} = this.state;
        const { navigation } = this.props;
        const navbarTranslate = clampedScroll.interpolate({
            inputRange: [0, 40],
            outputRange: [0, -40],
            extrapolate: "clamp"
        });
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

        switch (modeView) {
            case "block":
                return (
                    <View style={{ flex: 1 }}>
                    {
                    loading_spinner ? 
                    <Placeholder
                    Animation={Fade}s
                    style={{ padding: 0 }}
                    >
                        <PlaceholderLine width={100} height={180} style={{marginTop: 10,marginBottom:0,borderRadius: 5}} />
                        <View style={{padding:20}}>
                          
                            <PlaceholderLine width={100} height={15} style={{marginBottom:0}} />
                            <PlaceholderLine width={100} height={20} style={{marginTop: 5,marginBottom:0}} />
                        </View>


                        <PlaceholderLine width={100} height={180} style={{marginTop: 10,marginBottom:0,borderRadius: 5}} />
                        <View style={{padding:20}}>
                          
                            <PlaceholderLine width={100} height={15} style={{marginBottom:0}} />
                            <PlaceholderLine width={100} height={20} style={{marginTop: 5,marginBottom:0}} />
                        </View>


                        <PlaceholderLine width={100} height={180} style={{marginTop: 10,marginBottom:0,borderRadius: 5}} />
                        <View style={{padding:20}}>
                          
                            <PlaceholderLine width={100} height={15} style={{marginBottom:0}} />
                            <PlaceholderLine width={100} height={20} style={{marginTop: 5,marginBottom:0}} />
                        </View>

                        <PlaceholderLine width={100} height={180} style={{marginTop: 10,marginBottom:0,borderRadius: 5}} />
                        <View style={{padding:20}}>
                          
                            <PlaceholderLine width={100} height={15} style={{marginBottom:0}} />
                            <PlaceholderLine width={100} height={20} style={{marginTop: 5,marginBottom:0}} />
                        </View>
                       
                    </Placeholder>
                        :
                        <Animated.FlatList
                            data={this.state.listdata_trip}
                            key={"block"}
                            keyExtractor={(item, index) => item.id_trip}
                            renderItem={({ item, index }) => (
                                <TourItem
                                    block
                                    url={this.state.DataMasterDiskon.site+'assets/upload/product/img/featured/'}

                                    image={item.img_featured}
                                    name={item.judul_trip}
                                    nameSub={item.sub_judul_trip}
                                    location={item.location}
                                    travelTime={item.location}
                                    startTime={item.startTime}
                                    price={'IDR '+priceSplitter(item.harga)}
                                    rate={5}
                                    rateCount={item.rateCount}
                                    numReviews={item.numReviews}
                                    author={item.author}
                                    services={item.services}
                                    style={{
                                        marginBottom: 10
                                    }}
                                    onPress={() => {
                                        //navigation.navigate("TourDetailCustom");
                                       this.props.navigation.navigate('TourDetailCustom',{product:item});
                                    }}
                                    onPressBookNow={() => {
                                        navigation.navigate("PreviewBooking");
                                    }}
                                />
                            )}
                        />

                        }


                        <Animated.View
                            style={[
                                styles.navbar,
                                { transform: [{ translateY: navbarTranslate }] }
                            ]}
                        >
                            <FilterSort
                                modeView={modeView}
                                onChangeSort={this.onChangeSort}
                                onChangeView={this.onChangeView}
                                onFilter={this.onFilter}
                            />
                        </Animated.View>



                    </View>
                );
            case "grid":
                return (
                    <View style={{ flex: 1 }}>
                        <Animated.FlatList
                            contentContainerStyle={{
                                paddingTop: 50,
                                paddingBottom: 20
                            }}
                            columnWrapperStyle={{
                                marginHorizontal: 20
                            }}
                            refreshControl={
                                <RefreshControl
                                    colors={[BaseColor.primaryColor]}
                                    tintColor={BaseColor.primaryColor}
                                    refreshing={refreshing}
                                    onRefresh={() => {}}
                                />
                            }
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
                            showsVerticalScrollIndicator={false}
                            numColumns={2}
                            data={tours}
                            key={"gird"}
                            keyExtractor={(item, index) => item.id}
                            renderItem={({ item, index }) => (
                                <TourItem
                                    grid
                                    image={item.image}
                                    name={item.name}
                                    location={item.location}
                                    travelTime={item.travelTime}
                                    startTime={item.startTime}
                                    price={item.price}
                                    rate={item.rate}
                                    rateCount={item.rateCount}
                                    numReviews={item.numReviews}
                                    author={item.author}
                                    services={item.services}
                                    style={{
                                        marginBottom: 10,
                                        marginLeft: index % 2 ? 15 : 0
                                    }}
                                    onPress={() => {
                                        navigation.navigate("TourDetailCustom");
                                    }}
                                    onPressBookNow={() => {
                                        navigation.navigate("PreviewBooking");
                                    }}
                                />
                            )}
                        />
                        <Animated.View
                            style={[
                                styles.navbar,
                                {
                                    transform: [{ translateY: navbarTranslate }]
                                }
                            ]}
                        >
                            <FilterSort
                                modeView={modeView}
                                onChangeSort={this.onChangeSort}
                                onChangeView={this.onChangeView}
                                onFilter={this.onFilter}
                            />
                        </Animated.View>
                    </View>
                );

            case "list":
                return (
                    <View style={{ flex: 1 }}>
                        <Animated.FlatList
                            contentContainerStyle={{
                                paddingTop: 50,
                                paddingBottom: 20
                            }}
                            refreshControl={
                                <RefreshControl
                                    colors={[BaseColor.primaryColor]}
                                    tintColor={BaseColor.primaryColor}
                                    refreshing={refreshing}
                                    onRefresh={() => {}}
                                />
                            }
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
                            data={tours}
                            key={"list"}
                            keyExtractor={(item, index) => item.id}
                            renderItem={({ item, index }) => (
                                <TourItem
                                    list
                                    image={item.image}
                                    name={item.name}
                                    location={item.location}
                                    travelTime={item.travelTime}
                                    startTime={item.startTime}
                                    price={item.price}
                                    rate={item.rate}
                                    rateCount={item.rateCount}
                                    numReviews={item.numReviews}
                                    author={item.author}
                                    services={item.services}
                                    style={{
                                        marginBottom: 20,
                                        marginHorizontal: 20
                                    }}
                                    onPress={() => {
                                        navigation.navigate("TourDetailCustom");
                                    }}
                                    onPressBookNow={() => {
                                        navigation.navigate("PreviewBooking");
                                    }}
                                />
                            )}
                        />
                        <Animated.View
                            style={[
                                styles.navbar,
                                {
                                    transform: [{ translateY: navbarTranslate }]
                                }
                            ]}
                        >
                            <FilterSort
                                modeView={modeView}
                                onChangeSort={this.onChangeSort}
                                onChangeView={this.onChangeView}
                                onFilter={this.onFilter}
                            />
                        </Animated.View>
                    </View>
                );
            default:
                return (
                    <View style={{ flex: 1 }}>
                        <Animated.FlatList
                            contentContainerStyle={{
                                paddingTop: 50,
                                paddingBottom: 20
                            }}
                            refreshControl={
                                <RefreshControl
                                    colors={[BaseColor.primaryColor]}
                                    tintColor={BaseColor.primaryColor}
                                    refreshing={refreshing}
                                    onRefresh={() => {}}
                                />
                            }
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
                            data={tours}
                            key={"block"}
                            keyExtractor={(item, index) => item.id}
                            renderItem={({ item, index }) => (
                                <TourItem
                                    block
                                    image={item.image}
                                    name={item.name}
                                    location={item.location}
                                    travelTime={item.travelTime}
                                    startTime={item.startTime}
                                    price={item.price}
                                    rate={item.rate}
                                    rateCount={item.rateCount}
                                    numReviews={item.numReviews}
                                    author={item.author}
                                    services={item.services}
                                    style={{
                                        marginBottom: 10
                                    }}
                                    onPress={() => {
                                        navigation.navigate("TourDetailCustom");
                                    }}
                                    onPressBookNow={() => {
                                        navigation.navigate("PreviewBooking");
                                    }}
                                />
                            )}
                        />
                        <Animated.View
                            style={[
                                styles.navbar,
                                { transform: [{ translateY: navbarTranslate }] }
                            ]}
                        >
                            <FilterSort
                                modeView={modeView}
                                onChangeSort={this.onChangeSort}
                                onChangeView={this.onChangeView}
                                onFilter={this.onFilter}
                            />
                        </Animated.View>
                    </View>
                );
                break;
        }
    }


    render() {
        const { navigation } = this.props;
        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <Header
                    title="Tourss"
                    subTitle="24 Dec 2018, 2 Nights, 1 Room"
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
                                name="search"
                                size={20}
                                color={BaseColor.primaryColor}
                            />
                        );
                    }}
                    onPressLeft={() => {
                        navigation.goBack();
                    }}
                    onPressRight={() => {
                        navigation.navigate("SearchHistory");
                    }}
                />
                {this.renderContent()}
            </SafeAreaView>
        );
    }
}
