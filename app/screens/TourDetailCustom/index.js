import React, { Component } from "react";
import {
    View,
    ScrollView,
    FlatList,
    Animated,
    RefreshControl,
    InteractionManager,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Dimensions
} from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import {
    Header,
    SafeAreaView,
    Icon,
    Text,
    Button,
    Image,
    RateDetail,
    CommentItem,
    PostListItem,
    HelpBlock,
    StarRating,
    Tag
} from "@components";
import { TabView, TabBar } from "react-native-tab-view";
import * as Utils from "@utils";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import SetDate from "../../components/SetDate";
import SetPenumpang from "../../components/SetPenumpang";
// import styles from "./styles";

// Load sample data
import { HelpBlockData, ReviewData } from "@data";
import HTML from "react-native-render-html";

const styles = StyleSheet.create({
    imgBanner: {
        width: "100%",
        height: 250,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center"
    },
    contentButtonBottom: {
        borderTopColor: BaseColor.textSecondaryColor,
        borderTopWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    tabbar: {
        backgroundColor: "white",
        height: 40
    },
    tab: {
        width: 130
    },
    indicator: {
        backgroundColor: BaseColor.primaryColor,
        height: 1
    },
    label: {
        fontWeight: "400"
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    lineInfor: {
        flexDirection: "row",
        borderColor: BaseColor.textSecondaryColor,
        borderBottomWidth: 1,
        paddingVertical: 10
    },
    todoTitle: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 15,
        alignItems: "center"
    },
    itemReason: {
        paddingLeft: 10,
        marginTop: 10,
        flexDirection: "row"
    },

    itemPrice: {
        borderBottomWidth: 1,
        borderColor: BaseColor.textSecondaryColor,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    linePrice: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 5,
    },
    linePriceMinMax: {
        backgroundColor: BaseColor.whiteColor,
        borderRadius: 10
    },
    iconRight: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
});


export default class TourDetailCustom extends Component {
    constructor(props) {
        super(props);
        var product = this.props.navigation.state.params.product;
        console.log('TourDetailCustom',JSON.stringify(product));
        // Temp data define
        this.state = {
            heightHeader: Utils.heightHeader(),
            title: "Europe Cruises",
            region: {
                latitude: 1.9344,
                longitude: 103.358727,
                latitudeDelta: 0.05,
                longitudeDelta: 0.004
            },
            service: [
                { id: "1", name: "wifi" },
                { id: "2", name: "coffee" },
                { id: "3", name: "bath" },
                { id: "4", name: "car" },
                { id: "5", name: "paw" },
                { id: "6", name: "futbol" },
                { id: "7", name: "user-secret" },
                { id: "8", name: "clock" },
                { id: "9", name: "tv" },
                { id: "10", name: "futbol" }
            ],
            index: 0,
            routes: [
                { key: "hotel", title: "Hotel" },
                { key: "itinerary", title: "Itinerary" },
                { key: "include", title: "Include" },
                { key: "exclude", title: "Exclude" },
                // { key: "information", title: "Information" },
                // { key: "review", title: "Review" },
                // { key: "feedback", title: "Feedback" }
            ],
            product: product,
            minPerson:0,
            minPrice:0,
            totalPrice:0
        };
        this._deltaY = new Animated.Value(0);
        this.setPrice = this.setPrice.bind(this);
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
                <View style={{ flex: 1, width: 130, alignItems: "center" }}>
                    <Text headline semibold={focused} style={{ color }}>
                        {route.title}
                    </Text>
                </View>
            )}
        />
    );
    
    setPrice(select){
        var minPerson=select.trip_minimum[0].count_minimum;
        var minPrice=select.trip_minimum[0].price_minimum;
        
        var totalPrice=parseInt(minPerson)*parseInt(minPrice);
        this.setState({minPerson:minPerson});
        this.setState({minPrice:minPrice});
        this.setState({totalPrice:totalPrice});
        
    }
    // Render correct screen container when tab is activated
    _renderScene = ({ route, jumpTo }) => {
        switch (route.key) {
            case "hotel":
                return (
                    <Hotel
                        product={this.state.product}
                        jumpTo={jumpTo}
                        navigation={this.props.navigation}
                        setPrice={this.setPrice}
                    />
                );
            case "include":
                return (
                    <Include
                        product={this.state.product}
                        jumpTo={jumpTo}
                        navigation={this.props.navigation}
                    />
                );
            case "exclude":
                return (
                    <Exclude
                        product={this.state.product}
                        jumpTo={jumpTo}
                        navigation={this.props.navigation}
                    />
                );
            case "information":
                return (
                    <InformationTab
                        jumpTo={jumpTo}
                        navigation={this.props.navigation}
                    />
                );
            case "itinerary":
                return (
                    <Itinerary
                        product={this.state.product}
                        jumpTo={jumpTo}
                        navigation={this.props.navigation}
                    />
                );
            case "feedback":
                return (
                    <Feedback
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

    render() {
        const { navigation } = this.props;
        const { title, heightHeader, service, product,minPerson,minPrice,totalPrice} = this.state;
        const heightImageBanner = Utils.scaleWithPixel(250, 1);
        const marginTopBanner = heightImageBanner - heightHeader;
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));


        return (
            <View style={{ flex: 1 }}>
                <Animated.View
                    style={[
                        styles.imgBanner,
                        {
                            height: this._deltaY.interpolate({
                                inputRange: [
                                    0,
                                    Utils.scaleWithPixel(150),
                                    Utils.scaleWithPixel(150)
                                ],
                                outputRange: [
                                    heightImageBanner,
                                    heightHeader,
                                    heightHeader
                                ]
                            })
                        }
                    ]}
                >
                    <Image
                        source={{ uri: product.img_featured_url }}
                        style={{ width: "100%", height: "100%" }}
                        resizeMode="cover"
                    />
                    {/* <Text
                        title2
                        semibold
                        whiteColor
                        style={{
                            position: "absolute",
                            paddingTop: heightHeader - 45
                        }}
                    >
                        {product.product_name}
                    </Text> */}
                </Animated.View>
                <SafeAreaView
                    style={BaseStyle.safeAreaView}
                    forceInset={{ top: "always" }}
                >
                    {/* Header */}
                    <Header
                        title=""
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
                                    name="images"
                                    size={20}
                                    color={BaseColor.whiteColor}
                                />
                            );
                        }}
                        onPressLeft={() => {
                            navigation.goBack();
                        }}
                        onPressRight={() => {
                            navigation.navigate("PreviewImage");
                        }}
                        // style={{backgroundColor:BaseColor.primaryColor}}
                        transparent={true}
                    />
                    <ScrollView
                        onScroll={Animated.event([
                            {
                                nativeEvent: {
                                    contentOffset: { y: this._deltaY }
                                }
                            }
                        ])}
                        onContentSizeChange={() =>
                            this.setState({
                                heightHeader: Utils.heightHeader()
                            })
                        }
                        scrollEventThrottle={8}
                    >
                        {/* Main Container */}



                        <View
                            style={[
                                {
                                    flexDirection: "row",
                                    paddingHorizontal: 20,
                                    marginBottom: 10,
                                    paddingTop: 10
                                },
                                { marginTop: marginTopBanner }
                            ]}
                        >
                            <Tag
                                primary
                                style={{ marginRight: 15 }}
                            >
                                {product.product_detail.name_trip_category}
                            </Tag>
                        </View>


                        <View
                            style={[
                                { paddingHorizontal: 20, paddingTop: 0 },
                            ]}
                        >
                            <Text
                                //headline
                                style={{ marginBottom: 10 }}
                            //semibold
                            >
                                {product.product_name}
                            </Text>
                            {/* <FlatList
                                numColumns={5}
                                data={service}
                                keyExtractor={(item, index) => item.id}
                                renderItem={({ item }) => (
                                    <View
                                        style={{
                                            alignItems: "center",
                                            paddingHorizontal: 10,
                                            marginBottom: 10
                                        }}
                                    >
                                        <Icon
                                            name={item.name}
                                            size={24}
                                            color={BaseColor.accentColor}
                                        />
                                        <Text overline grayColor>
                                            Free Wifi
                                        </Text>
                                    </View>
                                )}
                            /> */}
                        </View>


                        <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingBottom: 20 }}>
                            <Icon
                                name="map-marker-alt"
                                color={BaseColor.lightPrimaryColor}
                                size={10}
                            />
                            <Text
                                caption1
                                style={{ marginLeft: 10 }}
                                numberOfLines={1}
                            >
                                {product.product_detail.country_name}, {product.product_detail.capital}
                            </Text>
                        </View>


                        <TabView
                            lazy
                            navigationState={this.state}
                            renderScene={this._renderScene}
                            renderTabBar={this._renderTabBar}
                            onIndexChange={this._handleIndexChange}
                        />
                    </ScrollView>
                    {/* Pricing & Booking Process */}
                    <View style={styles.contentButtonBottom}>
                        <View>
                            <Text caption1 semibold>
                                {minPerson} x Rp {priceSplitter(minPrice)}
                            </Text>
                            <Text title3 primaryColor semibold>
                                {priceSplitter(totalPrice)}
                            </Text>
                        </View>
                        <View>
                            <SetDate
                                label="Date"
                                detail=">= 12 years"
                                value={this.state.dewasa}
                                setJumlahDewasa={this.setJumlahDewasa}
                                typeOld="1"
                            />
                        </View>
                        
                        <View>
                            <SetPenumpang
                                label="Penumpang"
                                detail=">= 12 years"
                                value={this.state.dewasa}
                                setJumlahDewasa={this.setJumlahDewasa}
                                typeOld="1"
                            />
                        </View>
                        
                        
                        <Button
                            style={{ height: 46 }}
                            onPress={() =>
                                navigation.navigate("PreviewBooking")
                            }
                        >
                            Next
                        </Button>
                    </View>
                </SafeAreaView>
            </View>
        );
    }
}

/**
 * @description Show when tab Information activated
 * @author Passion UI <passionui.com>
 * @date 2019-08-03
 * @class PreviewTab
 * @extends {Component}
 */
class InformationTab extends Component {
    constructor(props) {
        super();
    }

    render() {
        return (
            <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
                <Text headline semibold>
                    Day 1: London - Somme - Paris
                </Text>
                <Image
                    source={Images.cruise1}
                    style={{ height: 120, width: "100%", marginTop: 10 }}
                />
                <Text body2 style={{ marginTop: 10 }}>
                    Curabitur non nulla sit amet nisl tempus convallis quis ac
                    lectus. Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit.
                </Text>
                <Text body2 style={{ marginTop: 10 }}>
                    Curabitur non nulla sit amet nisl tempus convallis quis ac
                    lectus. Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit.
                </Text>
                <Text body2 style={{ marginTop: 10 }}>
                    Curabitur non nulla sit amet nisl tempus convallis quis ac
                    lectus. Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit.
                </Text>
                <Text headline semibold style={{ marginTop: 20 }}>
                    Day 2: Paris - Burgundy - Swiss Alps
                </Text>
                <Image
                    source={Images.cruise2}
                    style={{ height: 120, width: "100%", marginTop: 10 }}
                />
                <Text body2 style={{ marginTop: 10 }}>
                    Curabitur non nulla sit amet nisl tempus convallis quis ac
                    lectus. Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit.
                </Text>
                <Text body2 style={{ marginTop: 10 }}>
                    Curabitur non nulla sit amet nisl tempus convallis quis ac
                    lectus. Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit.
                </Text>
                <Text body2 style={{ marginTop: 10 }}>
                    Curabitur non nulla sit amet nisl tempus convallis quis ac
                    lectus. Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit.
                </Text>
                <Text headline semibold style={{ marginTop: 20 }}>
                    Day 3: Swiss Alps - Strasbourg - Heidel…
                </Text>
                <Image
                    source={Images.cruise3}
                    style={{ height: 120, width: "100%", marginTop: 10 }}
                />
                <Text body2 style={{ marginTop: 10 }}>
                    Curabitur non nulla sit amet nisl tempus convallis quis ac
                    lectus. Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit.
                </Text>
                <Text body2 style={{ marginTop: 10 }}>
                    Curabitur non nulla sit amet nisl tempus convallis quis ac
                    lectus. Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit.
                </Text>
                <Text body2 style={{ marginTop: 10 }}>
                    Curabitur non nulla sit amet nisl tempus convallis quis ac
                    lectus. Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit.
                </Text>
            </View>
        );
    }
}





class Hotel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            renderMapView: false,
            region: {
                latitude: 1.9344,
                longitude: 103.358727,
                latitudeDelta: 0.05,
                longitudeDelta: 0.004
            },
            helpBlock: HelpBlockData,
            todo: [
                {
                    id: "1",
                    title: "South Travon",
                    image: Images.trip1
                },
                {
                    id: "2",
                    title: "South Travon",
                    image: Images.trip2
                },
                {
                    id: "3",
                    title: "South Travon",
                    image: Images.trip3
                },
                {
                    id: "4",
                    title: "South Travon",
                    image: Images.trip4
                },
                {
                    id: "5",
                    title: "South Travon",
                    image: Images.trip5
                }
            ],
            product_option:props.product.product_option
        };
    }

    componentDidMount() {
        const { navigation, product } = this.props;
        var select=product.product_option[0];
        
        this.props.setPrice(select);
        
        
        InteractionManager.runAfterInteractions(() => {
            this.setState({ renderMapView: true });
        });
        
                    const selected = select.id_trip_option;
        
                    if (selected) {
                        this.setState({
                            product_option: this.state.product_option.map(item => {
                                return {
                                    ...item,
                                    checked: item.id_trip_option == selected
                                };
                            })
                        });
                    }
    }
    
    onChange(select) {
        const { navigation, product } = this.props;
        //alert(select.id_trip_option)
        this.setState({
            product_option: this.state.product_option.map(item => {
                if (item.id_trip_option == select.id_trip_option) {
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
        
        this.props.setPrice(select);
        
        // setTimeout(() => {
        //     this.props.navigation.state.params.setBandaraTujuan(
        //         selected[0].code,selected[0].label
        //         )
        //     navigation.goBack();
        // }, 500);


    }


    render() {
        const { renderMapView, todo, helpBlock,product_option } = this.state;
        const { navigation} = this.props;
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));


        return (
            <View style={{}}>
                {/* {contentHotelOption} */}
                
                <FlatList
                            data={product_option}
                            keyExtractor={(item, index) => item.id_trip_option}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    // style={styles.item}
                                    onPress={() => 
                                    
                                    {
                                    //alert(item.id_trip_option);
                                    this.onChange(item)
                                    //console.log('product_option',item.id_trip_option);
                                    
                                    }
                                    
                                    }
                                >
                                    <View style={[styles.itemPrice, { backgroundColor: BaseColor.secondColor == BaseColor.whiteColor ? item.checked : null}]}>
                                            <View style={styles.linePrice}>
                                                <Text headline semibold>
                                                    {item.name_trip_option}
                                                </Text>
                                                
                                                {item.checked && (
                                                    <View style={styles.iconRight}>
                                                    <Icon
                                                        name="check"
                                                        size={24}
                                                        color={'green'}
                                                        />
                                                    </View>
                                                )}
                                                
                                            </View>
                        
                                            <View style={styles.linePriceMinMax}>
                                                <View style={styles.linePrice}>
                                                    <Text primaryColor semibold style={{ paddingHorizontal: 10 }}>
                                                        Minimum: 2
                                                                </Text>
                                                    <View style={styles.iconRight}>
                                                        <Text
                                                            style={{ paddingHorizontal: 10 }}
                                                        >
                                                            Rp {priceSplitter(item.trip_minimum[0].price_minimum)}
                                                        </Text>
                                                    </View>
                                                </View>
                        
                                                {/* <View style={styles.linePrice}>
                                                    <Text primaryColor semibold style={{ paddingHorizontal: 10 }}>
                                                        Minimum: 4
                                                                </Text>
                                                    <View style={styles.iconRight}>
                                                        <Text
                                                            style={{ paddingHorizontal: 10 }}
                                                        >
                                                            Rp {priceSplitter(item.trip_minimum[1].price_minimum)}
                                                        </Text>
                                                    </View>
                                                </View> */}
                                            </View>
                                        </View>
                                </TouchableOpacity>
                            )}
                            />
            </View>
        );
    }
}



/**
 * @description Show when tab Itinerary activated
 * @author Passion UI <passionui.com>
 * @date 2019-08-03
 * @class PreviewTab
 * @extends {Component}
 */
class Include extends Component {
    constructor(props) {
        super(props);
        this.state = {
            renderMapView: false,
            region: {
                latitude: 1.9344,
                longitude: 103.358727,
                latitudeDelta: 0.05,
                longitudeDelta: 0.004
            },
            helpBlock: HelpBlockData,
            todo: [
                {
                    id: "1",
                    title: "South Travon",
                    image: Images.trip1
                },
                {
                    id: "2",
                    title: "South Travon",
                    image: Images.trip2
                },
                {
                    id: "3",
                    title: "South Travon",
                    image: Images.trip3
                },
                {
                    id: "4",
                    title: "South Travon",
                    image: Images.trip4
                },
                {
                    id: "5",
                    title: "South Travon",
                    image: Images.trip5
                }
            ]
        };
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({ renderMapView: true });
        });
    }

    render() {
        const { renderMapView, todo, helpBlock} = this.state;
        const { navigation,product } = this.props;
        var product_detail=product.product_detail;
        
        
        
        return (
            <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
                <HTML
                  html={product_detail.include}
                  imagesMaxWidth={Dimensions.get("window").width}
                />
            </View>
        );
    }
}



/**
 * @description Show when tab Itinerary activated
 * @author Passion UI <passionui.com>
 * @date 2019-08-03
 * @class PreviewTab
 * @extends {Component}
 */
class Exclude extends Component {
    constructor(props) {
        super(props);
        this.state = {
            renderMapView: false,
            region: {
                latitude: 1.9344,
                longitude: 103.358727,
                latitudeDelta: 0.05,
                longitudeDelta: 0.004
            },
            helpBlock: HelpBlockData,
            todo: [
                {
                    id: "1",
                    title: "South Travon",
                    image: Images.trip1
                },
                {
                    id: "2",
                    title: "South Travon",
                    image: Images.trip2
                },
                {
                    id: "3",
                    title: "South Travon",
                    image: Images.trip3
                },
                {
                    id: "4",
                    title: "South Travon",
                    image: Images.trip4
                },
                {
                    id: "5",
                    title: "South Travon",
                    image: Images.trip5
                }
            ]
        };
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({ renderMapView: true });
        });
    }

    render() {
        const { renderMapView, todo, helpBlock} = this.state;
        const { navigation,product } = this.props;
        var product_detail=product.product_detail;
        
        
        
        return (
            <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
                <HTML
                  html={product_detail.exclude}
                  imagesMaxWidth={Dimensions.get("window").width}
                />
            </View>
        );
    }
}


/**
 * @description Show when tab Itinerary activated
 * @author Passion UI <passionui.com>
 * @date 2019-08-03
 * @class PreviewTab
 * @extends {Component}
 */
class Itinerary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            renderMapView: false,
            region: {
                latitude: 1.9344,
                longitude: 103.358727,
                latitudeDelta: 0.05,
                longitudeDelta: 0.004
            },
            helpBlock: HelpBlockData,
            todo: [
                {
                    id: "1",
                    title: "South Travon",
                    image: Images.trip1
                },
                {
                    id: "2",
                    title: "South Travon",
                    image: Images.trip2
                },
                {
                    id: "3",
                    title: "South Travon",
                    image: Images.trip3
                },
                {
                    id: "4",
                    title: "South Travon",
                    image: Images.trip4
                },
                {
                    id: "5",
                    title: "South Travon",
                    image: Images.trip5
                }
            ]
        };
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({ renderMapView: true });
        });
    }

    render() {
        const { renderMapView, todo, helpBlock} = this.state;
        const { navigation,product } = this.props;
        var product_itinerary=product.product_itinerary;
        
        
        var contentIntinerary = [];
        var b=1;
        for(a=0;a<product_itinerary.length;a++){
            contentIntinerary.push(
                <View style={{marginBottom:10}}>
                <Text headline semibold style={{marginVertical:10}}>
                    Day {b}: {product_itinerary[a].title_day}
                </Text>
                {/* <Image
                    source={Images.cruise1}
                    style={{ height: 120, width: "100%", marginTop: 10 }}
                /> */}
                {/* <Text body2 style={{ marginTop: 10 }}>
                    Curabitur non nulla sit amet nisl tempus convallis quis ac
                    lectus. Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit.
                </Text> */}
                
                <HTML
                  html={product_itinerary[a].desc_day}
                  imagesMaxWidth={Dimensions.get("window").width}
                />
                </View>
                
            );
            b++;
        }

        
        
        return (
            <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
                {contentIntinerary}
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
class Feedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rate: 4.5,
            title: "",
            review: ""
        };
    }

    render() {
        const { rate, title, review } = this.state;
        return (
            <View style={{ alignItems: "center", padding: 20 }}>
                <View style={{ width: 160 }}>
                    <StarRating
                        starSize={26}
                        maxStars={5}
                        rating={rate}
                        selectedStar={rating => {
                            this.setState({ rate: rating });
                        }}
                        fullStarColor={BaseColor.yellowColor}
                        containerStyle={{ padding: 5 }}
                    />
                    <Text caption1 grayColor style={{ textAlign: "center" }}>
                        Tap a star to rate
                    </Text>
                </View>
                <TextInput
                    style={[BaseStyle.textInput, { marginTop: 10 }]}
                    onChangeText={text => this.setState({ title: text })}
                    autoCorrect={false}
                    placeholder="Title"
                    placeholderTextColor={BaseColor.grayColor}
                    value={title}
                    selectionColor={BaseColor.primaryColor}
                />
                <TextInput
                    style={[
                        BaseStyle.textInput,
                        { marginTop: 20, height: 140 }
                    ]}
                    onChangeText={text => this.setState({ review: text })}
                    textAlignVertical="top"
                    multiline={true}
                    autoCorrect={false}
                    placeholder="Reviews"
                    placeholderTextColor={BaseColor.grayColor}
                    value={review}
                    selectionColor={BaseColor.primaryColor}
                />
                <Button full style={{ marginTop: 20 }} onPress={() => { }}>
                    Sent
                </Button>
            </View>
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
                        onRefresh={() => { }}
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
