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
    Dimensions,
    Image,
} from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import {
    Header,
    SafeAreaView,
    Icon,
    Text,
    Button,
    RateDetail,
    CommentItem,
    PostListItem,
    HelpBlock,
    StarRating,
    Tag,
    QuantityPicker,
} from "@components";
import { TabView, TabBar } from "react-native-tab-view";
import * as Utils from "@utils";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import SetDate from "../../components/SetDate";
import SetPenumpang from "../../components/SetPenumpang";
import FormOptionQty from "../../components/FormOptionQty";
// import styles from "./styles";

// Load sample data
import { HelpBlockData, ReviewData } from "@data";
import HTML from "react-native-render-html";
import Modal from "react-native-modal";
import CalendarPicker from 'react-native-calendar-picker';

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
        //paddingVertical: 5,
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



    contentForm: {
        padding: 10,
        borderRadius: 8,
        width: "100%",
        //backgroundColor: BaseColor.fieldColor
        borderRadius: 8,
        borderWidth: 3,
        borderColor: BaseColor.fieldColor,
    },
    bottomModal: {
        justifyContent: "flex-end",
        margin: 0
    },
    contentFilterBottom: {
        width: "100%",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        paddingHorizontal: 20,
        backgroundColor: BaseColor.whiteColor
    },
    contentSwipeDown: {
        paddingTop: 10,
        alignItems: "center"
    },
    lineSwipeDown: {
        width: 30,
        height: 2.5,
        backgroundColor: BaseColor.dividerColor
    },
    contentActionModalBottom: {
        flexDirection: "row",
        paddingVertical: 10,
        marginBottom: 10,
        justifyContent: "space-between",
        borderBottomColor: BaseColor.textSecondaryColor,
        borderBottomWidth: 1
    },
    contentService: {
        paddingVertical: 10,
        //borderBottomColor: BaseColor.textSecondaryColor,
        //borderBottomWidth: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between"
    },
});


export default class HotelDetail extends Component {
    constructor(props) {
        super(props);
        var product = this.props.navigation.state.params.product;
        //console.log('HotelDetail',JSON.stringify(product));

        var minDate = new Date(); // Today
        minDate.setDate(minDate.getDate() + 7);
        var tglAwal=this.convertDate(minDate);


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
                // { key: "hotel", title: "Hotel" },
                { key: "paket", title: "Paket" },
                { key: "kebijakan", title: "Kebijakan" },
                { key: "informasi", title: "Informasi" },
                // { key: "exclude", title: "Exclude" },
                // { key: "information", title: "Information" },
                // { key: "review", title: "Review" },
                // { key: "feedback", title: "Feedback" }
            ],
            product: product,
            minPerson:0,
            minPrice:0,
            totalPrice:0,
            modalVisiblePerson: false,
            modalVisibleDate: false,
            dewasa:"0",
            anak:"0",
            bayi:"0",
            selectedStartDate: null,
            tglAwal:tglAwal,
            tglAkhir:'',
            tglAwalNumber:0,
            tglAkhirNumber:0,
            
            listdataPerson:[{
                value: 1,
                text: "1"
                }
            ],
            
            kelas:'Economy Class',
            kelasId:'E',

        };
        this._deltaY = new Animated.Value(0);
        this.setPrice = this.setPrice.bind(this);
        this.setJumlahDewasa = this.setJumlahDewasa.bind(this);
        this.setJumlahAnak = this.setJumlahAnak.bind(this);
        this.setJumlahBayi = this.setJumlahBayi.bind(this);
        this.setMinPerson = this.setMinPerson.bind(this);
        this.setTglAwal = this.setTglAwal.bind(this);
        this.setTglAkhir = this.setTglAkhir.bind(this);
        this.setListdataPerson=this.setListdataPerson.bind(this);
        // this.setKelasPesawat = this.setKelasPesawat.bind(this);
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
    
    setTglAwal(dateConversion,dateNumber){
        this.setState({tglAwal:dateConversion});
        this.setState({tglAwalNumber:dateNumber});
        //console.log('setTglAwal',dateNumber);
        //alert(dateNumber);
    }

    setTglAkhir(dateConversion,dateNumber){
        this.setState({tglAkhir:dateConversion});
        this.setState({tglAkhirNumber:dateNumber});
    }


    setPrice(select){
        this.setState({select:select});
        
    }

    setJumlahDewasa(jml){
        this.setState({dewasa:jml});

    }

    setJumlahAnak(jml){
        this.setState({anak:jml});
    }

    setJumlahBayi(jml){
        this.setState({bayi:jml});
    }

    setMinPerson(jml){
        this.setState({minPerson:jml});
        setTimeout(() => {
        this.setListdataPerson();
        }, 500);
    }
    
    setListdataPerson(){
        var listdataPerson=[];
            for(a=this.state.minPerson;a<=this.state.maxPerson;a++){
                var obj = {};
                obj['value'] = a;
                obj['text'] = a + ' Voucher';
                listdataPerson.push(obj);
            }
        this.setState({listdataPerson:listdataPerson});
    }

    componentDidMount(){
        const {product}=this.state;
          min = Math.min.apply(null, product.product_option.map(function(item) {
            return item.minimum_book;
          })),
          max = Math.max.apply(null, product.product_option.map(function(item) {
            return item.minimum_book;
          }));
          
          this.setState({maxPerson:max});
          this.setState({minPerson:min});
         
        setTimeout(() => {
            this.setListdataPerson();
        }, 500);
    }
    // Render correct screen container when tab is activated
    _renderScene = ({ route, jumpTo }) => {
        switch (route.key) {
            case "paket":
                    return (
                        <Paket
                            product={this.state.product}
                            jumpTo={jumpTo}
                            navigation={this.props.navigation}
                            setMinPerson={this.setMinPerson}
                            setPrice={this.setPrice}
                        />
                    );
            case "informasi":
                return (
                    <Informasi
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
            case "kebijakan":
                return (
                    <Kebijakan
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

    convertDate(date){

        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = date.getFullYear();

        date = yyyy + '-' + mm + '-' + dd;
        return date;
    }
    
    setDate(date) {
    
        var date = new Date(date);
        var tempoMonth = (date.getMonth()+1);
        var tempoDate = (date.getDate());
        var finaldate="";
        if (tempoMonth < 10) tempoMonth = '0' + tempoMonth;
        if (tempoDate < 10) tempoDate = '0' + tempoDate;
    
        return finaldate = date.getFullYear()  + '-' +  tempoMonth  + '-' +  tempoDate;
    };
    
    onSubmit() {
    
        const {type,product,select} =this.state;
        var tgl_akhir='';

 
          var param = {
            DepartureDate:this.state.tglAwal,
            ReturnDate:tgl_akhir,
            Adults:this.state.dewasa,
            Children:this.state.anak,
            Infants:this.state.bayi,
            }
        
        var productPart={}
        var link='';
       
            link='Summary';
            param.type='hotelpackage';
            param.cityId=this.state.cityId;
            param.cityText=this.state.cityText;
            param.cityProvince=this.state.cityProvince;
            param.Qty=parseInt(this.state.minPerson);
            param.totalPrice=parseInt(this.state.minPerson)*parseInt(select.price);
            param.participant=false;
            
            this.props.navigation.navigate(link,
                {
                    param:param,
                    product:product,
                    productPart:select
                });
                
            // console.log('paramHotel',JSON.stringify(param));
            // console.log('productHotel',JSON.stringify(product));
            // console.log('productPartHotel',JSON.stringify(select));

    }
    
    content_button(){
        const {product}=this.state;
        const { navigation } = this.props;
        var content=<View></View>
        
        if(product.product_detail.detail_category=='voucher_hotel'){
        content=<View style={styles.contentButtonBottom}>
                        <FormOptionQty
                                style={{ marginVertical: 10 }} 
                                label={'Quantity'}
                                listdata={this.state.listdataPerson}
                                setMinPerson={this.setMinPerson}
                                selectedText={this.state.minPerson + ' Voucher'}
                        />
                        
                        <Button
                            style={{ height: 46 }}
                            onPress={() => {  
                                this.onSubmit();
                               
                            }}
                        >
                            Book Now
                        </Button>
                    </View>
        }else{
        
            content=<View style={styles.contentButtonBottom}>
                        <Button
                            style={{ height: 46,width:'100%' }}
                            onPress={() => {  
                                navigation.navigate('FlightSearch',{type:'hotelpackage',product:this.state.product,productPart:this.state.select})
                               
                            }}
                        >
                            Book Now
                        </Button>
                    </View>
        
        }
        return(
            <View>
                {content}
            </View>
            
        )
    }
   
    render() {
        const { navigation } = this.props;
        const { title, heightHeader, service, product,minPerson,minPrice,totalPrice} = this.state;
        const heightImageBanner = Utils.scaleWithPixel(250, 1);
        const marginTopBanner = heightImageBanner - heightHeader;
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

        const { modalVisiblePerson,modalVisibleDate} = this.state;
      
        

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
                  
                </Animated.View>
                <SafeAreaView
                    style={BaseStyle.safeAreaView}
                    forceInset={{ top: "always" }}
                >
                    {/* Header */}
                    <Header
                        title="Paket Hotel"
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
                                Valid Until {product.product_detail.end_date}
                            </Tag>
                        </View>


                        <View
                            style={[
                                { paddingHorizontal: 20, paddingTop: 0 },
                            ]}
                        >
                            <Text
                                style={{ marginBottom: 10 }}
                            >
                                {product.product_name}
                            </Text>
                            
                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 20 }}>
                            <StarRating
                                    disabled={true}
                                    starSize={14}
                                    maxStars={5}
                                    rating={5}
                                    selectedStar={rating => {}}
                                    fullStarColor={BaseColor.yellowColor}
                                />
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
                                {product.product_detail.address}, {product.product_detail.capital}
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
                   {this.content_button()}
                    
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





class Paket extends Component {
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
        const { product_option } =this.state;
        
        
                if (product_option.length != 0) {
                    var select=product.product_option[0];
                    this.props.setPrice(select);
                    const selected = select.id_hotelpackage_detail;
                    if (selected) {
                        this.setState({
                            product_option: this.state.product_option.map(item => {
                                return {
                                    ...item,
                                    checked: item.id_hotelpackage_detail == selected
                                };
                            })
                        });
                    }
                }
    }
    
    onChange(select) {
        const { navigation, product,setMinPerson,setListdataPerson} = this.props;
        var minPerson=select.minimum_book;
        setMinPerson(minPerson);
        
        this.setState({
            product_option: this.state.product_option.map(item => {
                if (item.id_hotelpackage_detail == select.id_hotelpackage_detail) {
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
    }


    render() {
        const { renderMapView, todo, helpBlock,product_option } = this.state;
        const { navigation} = this.props;
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

        var content=<View></View>
        if (product_option.length == 0) {
            content=<View
                        style={{
                                // flexDirection: 'column',
                                // justifyContent: 'center',
                                alignItems: 'center',
                                height: '100%',padding: 20
                            }}
                        >       
                        <Image
                            source={Images.empty}
                            style={{ width: "40%", height: "40%" }}
                            resizeMode="cover"
                        />
                        </View>
        }else{
            content=<FlatList
            data={product_option}
            keyExtractor={(item, index) => item.id_hotelpackage_detail}
            renderItem={({ item }) => (
                <TouchableOpacity
                    // style={styles.item}
                    onPress={() => 
                    {
                    this.onChange(item)
                    }
                    
                    }
                >
                    <View style={[styles.itemPrice, { backgroundColor: BaseColor.secondColor == BaseColor.whiteColor ? item.checked : null}]}>
                            <View style={styles.linePrice}>
                                <Text headline semibold>
                                    {item.detail_name}
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
                                <View style={styles.contentService}>
                                    {[
                                        { key: "1", name: "clock",label:item.duration+ 'night' },
                                        { key: "2", name: "user",label:item.guest_per_room+' guest' },
                                        { key: "3", name: "crop",label:item.room_size+' m2' },
                                        { key: "4", name: "bed",label:item.bed_type},
                                        { key: "5", name: "bath",label:'shower' }
                                    ].map((item, index) => (
                                        <View
                                            style={{ alignItems: "center" }}
                                            key={"service" + index}
                                        >
                                            <Icon
                                                name={item.name}
                                                size={24}
                                                color={BaseColor.primaryColor}
                                            />
                                            <Text
                                                overline
                                                grayColor
                                                style={{ marginTop: 4 }}
                                            >
                                                {item.label}
                                            </Text>
                                        </View>
                                    ))}
                                </View>
                                <View style={styles.linePrice}>
                                    <Text primaryColor semibold>
                                        Minimum: 2
                                                </Text>
                                    <View style={styles.iconRight}>
                                        <Text>
                                            Rp {priceSplitter(item.price)}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                </TouchableOpacity>
            )}
        />


        }

        return (
            <View style={{}}>
                {content}
            </View>
        );
    }
}



/**
 * @description Show when tab Kebijakan activated
 * @author Passion UI <passionui.com>
 * @date 2019-08-03
 * @class PreviewTab
 * @extends {Component}
 */
class Informasi extends Component {
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
        
        var informasi='Biaya penambahan orang dalam kamar mungkin berlaku dan berbeda-beda menurut kebijakan properti.Tanda pengenal berfoto yang dikeluarkan oleh pemerintah dan kartu kredit, kartu debit, dan deposit uang tunai diperlukan saat check-in untuk biaya tidak terduga.Pemenuhan permintaan khusus bergantung pada ketersediaan sewaktu check-in dan mungkin menimbulkan biaya tambahan. Permintaan khusus tidak dijamin akan terpenuhi.';
        
        return (
            <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
                <HTML
                  html={informasi}
                  imagesMaxWidth={Dimensions.get("window").width}
                />
            </View>
        );
    }
}



/**
 * @description Show when tab Kebijakan activated
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
 * @description Show when tab Kebijakan activated
 * @author Passion UI <passionui.com>
 * @date 2019-08-03
 * @class PreviewTab
 * @extends {Component}
 */
class Kebijakan extends Component {
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
        
    }

    render() {
        const { renderMapView, todo, helpBlock} = this.state;
        const { navigation,product } = this.props;
        
        
        
        return (
            <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
                <HTML
                  html={product.product_detail.term}
                  imagesMaxWidth={Dimensions.get("window").width}
                />
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
