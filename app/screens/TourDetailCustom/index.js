import React, { Component } from "react";
import {
    View,
    ScrollView,
    FlatList,
    Animated,
    TouchableOpacity,
    StyleSheet

} from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import {
    Header,
    SafeAreaView,
    Icon,
    Text,
    StarRating,
    PostListItem,
    HelpBlock,
    Button,
    RoomType,
    Card,
    TourDay,
    TourItem,
    PackageItem,
    RateDetail,
    CommentItem
    
} from "@components";
import * as Utils from "@utils";
import { InteractionManager,Dimensions  } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
// import styles from "./styles";
// Load sample data
import { HelpBlockData,UserData, ReviewData, TourData, PackageData,DataMasterDiskon } from "@data";
import HTML from 'react-native-render-html';
import { WebView } from 'react-native-webview';
const styles = StyleSheet.create({
    imgBanner: {
        width: "100%",
        height: 250,
        position: "absolute"
    },
    blockView: {
        paddingVertical: 10,
        borderBottomColor: BaseColor.textSecondaryColor,
        borderBottomWidth: 1
    },
    contentService: {
        paddingVertical: 10,
        borderBottomColor: BaseColor.textSecondaryColor,
        borderBottomWidth: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between"
    },
    contentBoxTop: {
        padding: 10,
        height: 120,
        width: "100%",
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 20,
        backgroundColor: BaseColor.whiteColor,
        shadowOffset: { width: 3, height: 3 },
        shadowColor: BaseColor.grayColor,
        shadowOpacity: 1.0,
        elevation: 5
    },
    circlePoint: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 5,
        backgroundColor: BaseColor.primaryColor,
        alignItems: "center",
        justifyContent: "center"
    },
    contentRateDetail: {
        flexDirection: "row",
        paddingTop: 20
    },
    lineBaseRate: {
        width: "100%",
        height: 12,
        borderRadius: 8,
        backgroundColor: BaseColor.textSecondaryColor
    },
    linePercent: {
        width: "80%",
        height: 12,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        backgroundColor: BaseColor.accentColor,
        position: "absolute",
        bottom: 0
    },
    contentLineRate: {
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-end"
    },
    listContentIcon: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: 50,
        width: "100%"
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    itemReason: {
        paddingLeft: 10,
        marginTop: 10,
        flexDirection: "row"
    },
    contentButtonBottom: {
        borderTopColor: BaseColor.textSecondaryColor,
        borderTopWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }
});
  

export default class TourDetailCustom extends Component {
    constructor(props) {
        super(props);
        var product=this.props.navigation.state.params.product;

        // Temp data define
        this.state = {
            DataMasterDiskon:DataMasterDiskon[0],
            heightHeader: Utils.heightHeader(),
            renderMapView: false,
            region: {
                latitude: 1.9344,
                longitude: 103.358727,
                latitudeDelta: 0.05,
                longitudeDelta: 0.004
            },
            roomType: [
                {
                    id: "1",
                    image: Images.room8,
                    name: "Standard Twin Room",
                    price: "$399,99",
                    available: "Hurry Up! This is your last room!",
                    services: [
                        { icon: "wifi", name: "Free Wifi" },
                        { icon: "shower", name: "Shower" },
                        { icon: "users", name: "Max 3 aduts" },
                        { icon: "subway", name: "Nearby Subway" }
                    ]
                },
                {
                    id: "2",
                    image: Images.room5,
                    name: "Delux Room",
                    price: "$399,99",
                    available: "Hurry Up! This is your last room!",
                    services: [
                        { icon: "wifi", name: "Free Wifi" },
                        { icon: "shower", name: "Shower" },
                        { icon: "users", name: "Max 3 aduts" },
                        { icon: "subway", name: "Nearby Subway" }
                    ]
                }
            ],
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
            helpBlock: HelpBlockData,
            product:product
        };
        this._deltaY = new Animated.Value(0);
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({ renderMapView: true });
        });
    }

    render() {
        const { navigation } = this.props;
        const {
            roomType,
            heightHeader,
            helpBlock,
            todo,
            renderMapView
        } = this.state;
        const heightImageBanner = Utils.scaleWithPixel(250, 1);
        const marginTopBanner = heightImageBanner - heightHeader - 40;
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

        return (
            <View style={{ flex: 1 }}>
                <Animated.Image
                    // source={Images.room6}
                    source={{uri : this.state.DataMasterDiskon.site+'assets/upload/product/img/featured/'+this.state.product.img_featured}}
                    style={[
                        styles.imgBanner,
                        {
                            height: this._deltaY.interpolate({
                                inputRange: [
                                    0,
                                    Utils.scaleWithPixel(200),
                                    Utils.scaleWithPixel(200)
                                ],
                                outputRange: [
                                    heightImageBanner,
                                    heightHeader,
                                    heightHeader
                                ]
                            })
                        }
                    ]}
                />
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
                        <View style={{ paddingHorizontal: 20 }}>
                            {/* Information */}
                            <View
                                style={[
                                    styles.contentBoxTop,
                                    { marginTop: marginTopBanner }
                                ]}
                            >
                                <Text
                                    title2
                                    semibold
                                    style={{ marginBottom: 7 }}
                                >
                                   {this.state.product.judul_trip}
                                </Text>
                                <StarRating
                                    disabled={true}
                                    starSize={14}
                                    maxStars={5}
                                    rating={4.5}
                                    selectedStar={rating => {}}
                                    fullStarColor={BaseColor.yellowColor}
                                />
                                <Text
                                    body2
                                    style={{
                                        marginTop: 7,
                                        textAlign: "center"
                                    }}
                                >
                                    {this.state.product.sub_judul_trip}
                                </Text>
                            </View>
                            {/* Rating Review */}
                            <View style={styles.blockView}>
                                {/* <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center"
                                    }}
                                >
                                    <View style={styles.circlePoint}>
                                        <Text title3 whiteColor>
                                            9.5
                                        </Text>
                                    </View>
                                    <View>
                                        <Text
                                            title3
                                            primaryColor
                                            style={{ marginBottom: 3 }}
                                        >
                                            Excellent
                                        </Text>
                                        <Text body2>See 801 reviews</Text>
                                    </View>
                                </View> */}
                                <Text
                                    headline
                                    style={{ marginBottom: 0 }}
                                    semibold
                                >
                                    Information
                                </Text>
                               
                                <View>
                                  <InformationTab
                                  product={this.state.product}
                                  />
                                </View>
                            </View>
                            {/* Description */}
                            {/* <View style={styles.blockView}>
                                <Text headline semibold>
                                    Hotel Description
                                </Text>
                                <Text body2 style={{ marginTop: 5 }}>
                                    218 Austen Mountain, consectetur adipiscing,
                                    sed eiusmod tempor incididunt ut labore et
                                    dolore
                                </Text>
                            </View> */}
                           
                            {/* Map location */}
                            {/* <View style={styles.blockView}>
                                <Text
                                    headline
                                    style={{ marginBottom: 5 }}
                                    semibold
                                >
                                    Location
                                </Text>
                                <Text body2 numberOfLines={2}>
                                    218 Austen Mountain, consectetur adipiscing,
                                    sed do eiusmod tempor incididunt ut labore
                                    et …
                                </Text>
                                
                            </View> */}
                            {/* Open Time */}
                            {/* <View style={styles.blockView}>
                                <Text headline semibold>
                                    Good To Know
                                </Text>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        marginTop: 5
                                    }}
                                >
                                    <View
                                        style={{
                                            flex: 1,
                                            justifyContent: "center"
                                        }}
                                    >
                                        <Text body2 grayColor>
                                            Check in from
                                        </Text>
                                        <Text body2 accentColor semibold>
                                            15:00
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            flex: 1,
                                            justifyContent: "center"
                                        }}
                                    >
                                        <Text body2 grayColor>
                                            Check in from
                                        </Text>
                                        <Text body2 accentColor semibold>
                                            15:00
                                        </Text>
                                    </View>
                                </View>
                            </View> */}
                          
                            {/* Other Information */}
                            {/* <View style={{ paddingVertical: 10 }}>
                                <Text headline semibold>
                                    4 Reason To Choose Us
                                </Text>
                                <View style={styles.itemReason}>
                                    <Icon
                                        name="map-marker-alt"
                                        size={18}
                                        color={BaseColor.accentColor}
                                    />
                                    <View style={{ marginLeft: 10 }}>
                                        <Text subhead semibold>
                                            Good Location
                                        </Text>
                                        <Text body2>
                                            Lorem ipsum dolor sit amet, nec et
                                            suas augue diceret, cu cum malis
                                            veniam democritum. Eu liber vocibus
                                            his, qui id cetero
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.itemReason}>
                                    <Icon
                                        name="pagelines"
                                        size={18}
                                        color={BaseColor.accentColor}
                                    />
                                    <View style={{ marginLeft: 10 }}>
                                        <Text subhead semibold>
                                            Great Food
                                        </Text>
                                        <Text body2>
                                            Excellent cuisine, typical dishes
                                            from the best Romagna tradition and
                                            more!
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.itemReason}>
                                    <Icon
                                        name="servicestack"
                                        size={18}
                                        color={BaseColor.accentColor}
                                    />
                                    <View style={{ marginLeft: 10 }}>
                                        <Text subhead semibold>
                                            Private Beach
                                        </Text>
                                        <Text body2>
                                            Excellent cuisine, typical dishes
                                            from the best Romagna tradition and
                                            more!
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.itemReason}>
                                    <Icon
                                        name="trophy"
                                        size={18}
                                        color={BaseColor.accentColor}
                                    />
                                    <View style={{ marginLeft: 10 }}>
                                        <Text subhead semibold>
                                            5 Stars Hospitality
                                        </Text>
                                        <Text body2>
                                            Romagna hospitality, typical and
                                            much
                                        </Text>
                                    </View>
                                </View>
                            </View> */}
                        </View>
                    </ScrollView>
                    {/* Pricing & Booking Process */}
                    <View style={styles.contentButtonBottom}>
                        <View>
                            <Text caption1 semibold>
                                Price/Room/Night
                            </Text>
                            <Text title3 primaryColor semibold>
                            {'IDR '+priceSplitter(this.state.product.harga)}
                            </Text>
                            <Text caption1 semibold style={{ marginTop: 5 }}>
                                AVG/Night
                            </Text>
                        </View>
                        <Button
                            style={{ height: 46 }}
                            onPress={() =>
                                {
                                // navigation.navigate("PreviewBooking")
                                //navigation.navigate("TourSet",{product:this.state.product})
                                alert('Masih dalam pengembangan')
                                }
                            }
                        >
                            Book Now
                        </Button>
                    </View>
                </SafeAreaView>
            </View>
        );
    }
}


class InformationTab extends Component {
    constructor(props) {
        super(props);
        var product=this.props.product;

        var baby='';
        if(product.baby=='1'){
            baby='Allow';
        }else{
            baby='Not Allowed';
        }
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));


        this.state = {
            tours: TourData,
            product:product,
            // dayTour: [
            //     {
            //         id: "1",
            //         image: Images.trip1,
            //         day: "Day 1",
            //         title: "London - Somme - Paris",
            //         description:
            //             "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem"
            //     },
            //     {
            //         id: "2",
            //         image: Images.trip2,
            //         day: "Day 2",
            //         title: "Paris - Burgundy - Swiss Alps",
            //         description:
            //             "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem"
            //     },
            //     {
            //         id: "3",
            //         image: Images.trip3,
            //         day: "Day 3",
            //         title: "Swiss Alps - Strasbourg",
            //         description:
            //             "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem"
            //     },
            //     {
            //         id: "4",
            //         image: Images.trip4,
            //         day: "Day 4",
            //         title: "Grand Ducal Palace",
            //         description:
            //             "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem"
            //     }
            // ],
            information: [
                { title: "County", detail: product.country_name },
                { title: "Category", detail: product.nama_trip_kategori },
                { title: "Duration", detail: product.duration+' day' },
                { title: "Baby", detail: baby},
                { title: "Price for Adult / Children", detail: 'IDR '+priceSplitter(product.harga)},
                { title: "Price for baby", detail: 'IDR '+priceSplitter(parseInt(product.harga)*0.2) },
                // { title: "Group size", detail: "3 - 20 people" },
                // { title: "Transportation", detail: "Boat, Bicycle, Car" }
            ]
        };
    }

    render() {
        let { information, dayTour, tours } = this.state;
        return (
            <ScrollView>
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

                <View style={{ paddingHorizontal: 0, marginTop: 20 }}>
                    <Text headline semibold style={{ marginBottom: 10 }}>
                        To Do
                    </Text>
                   
                    <HTML body2 html={this.state.product.to_do} imagesMaxWidth={Dimensions.get('window').width} />
                    
                    {/* <Text body2 style={{ marginTop: 5 }}>
                        - Curabitur arcu erat, accumsan id imperdiet et,
                        porttitor at sem. Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit.
                    </Text>
                    <Text body2 style={{ marginTop: 5 }}>
                        - Mauris blandit aliquet elit, eget tincidunt nibh
                        pulvinar a. Donec rutrum congue leo eget malesuada.
                    </Text> */}
                </View>
            
                <View style={{ paddingHorizontal: 0, marginTop: 20 }}>
                    <Text headline semibold style={{ marginBottom: 10 }}>
                        Includes
                    </Text>
                 
                    <HTML body2 html={this.state.product.include} imagesMaxWidth={Dimensions.get('window').width} />
                    {/* <Text body2 style={{ marginTop: 5 }}>
                        - Curabitur arcu erat, accumsan id imperdiet et,
                        porttitor at sem. Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit.
                    </Text>
                    <Text body2 style={{ marginTop: 5 }}>
                        - Mauris blandit aliquet elit, eget tincidunt nibh
                        pulvinar a. Donec rutrum congue leo eget malesuada.
                    </Text> */}
                </View>
                <View style={{ paddingHorizontal: 0, marginTop: 20 }}>
                    <Text headline semibold style={{ marginBottom: 10 }}>
                        Excludes
                    </Text>
                  
                    <HTML body2 html={this.state.product.exclude} imagesMaxWidth={Dimensions.get('window').width} />

                    {/* <Text body2 style={{ marginTop: 5 }}>
                        - Curabitur arcu erat, accumsan id imperdiet et,
                        porttitor at sem. Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit.
                    </Text>
                    <Text body2 style={{ marginTop: 5 }}>
                        - Mauris blandit aliquet elit, eget tincidunt nibh
                        pulvinar a. Donec rutrum congue leo eget malesuada.
                    </Text> */}
                </View>
            </ScrollView>
        );
    }
}
