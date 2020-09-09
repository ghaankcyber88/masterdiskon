import React, { Component } from "react";
import {
    View,
    ScrollView,
    Animated,
    TouchableOpacity,
    FlatList,
} from "react-native";
import {
    Text,
    Icon,
    SafeAreaView,
    Header,
    Image
} from "@components";
import { BaseStyle, BaseColor, Images } from "@config";
import * as Utils from "@utils";
import styles from "./styles";

import {PostDataNew} from '../../services/PostDataNew';
import {AsyncStorage} from 'react-native';
import CardCustom from "../../components/CardCustom";
import {DataLoading,DataConfig,DataTrip,DataHotelPackage } from "@data";
// import Swiper from 'react-native-swiper'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from '../../components/CarouselItem/styles/SliderEntry.style';
import { ENTRIES1, ENTRIES2 } from '../../components/CarouselItem/static/entries';
//import {SliderEntry} from '../../components/Carousel/components/SliderEntry';
import CarouselItem from "../../components/CarouselItem";
import styles_carousel, { colors_carousel } from '../../components/CarouselItem/styles/index.style';

const SLIDER_1_FIRST_ITEM = 1;

const renderPagination = (index, total, context) => {
  return (
    <View style={styles.paginationStyle}>
      <Text style={{ color: 'grey' }}>
        <Text style={styles.paginationText}>{index + 1}</Text>/{total}
      </Text>
    </View>
  )
}




export default class Home extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
            icons: [
            
                // {
                //     icon: "calendar-alt",
                //     name: "Hotel",
                //     route: "Hotel"
                // },
                // {
                //     icon: "map-marker-alt",
                //     name: "Tour",
                //     route: "Tour"
                // },
                // {
                //     icon: "car-alt",
                //     name: "Car",
                //     route: "OverViewCar"
                // },
                // {
                //     icon: "plane",
                //     name: "Flight",
                //     route: "FlightSearch"
                // },
                // {
                //     icon: "ship",
                //     name: "Cruise",
                //     route: "CruiseSearch"
                // },
                // {
                //     icon: "bus",
                //     name: "Bus",
                //     route: "BusSearch"
                // },
                // {
                //     icon: "star",
                //     name: "Event",
                //     route: "DashboardEvent"
                // },
                // {
                //     icon: "ellipsis-h",
                //     name: "More",
                //     route: "More"
                // },
                {
                    icon: "calendar-alt",
                    name: "Hotel",
                    route: "Hotel",
                    iconAnimation:"hotel.json",
                    type:'hotel',
                    image: Images.hotel
                },
                {
                    icon: "map-marker-alt",
                    name: "Trip",
                    route: "Tour",
                    iconAnimation:"tour.json",
                    type:'trip',
                    image: Images.trip
                },
                {
                    icon: "plane",
                    name: "Flight",
                    route: "FlightSearch",
                    iconAnimation:"flight.json",
                    type:'flight',
                    image: Images.flight
                },
                // {
                //     icon: "tag",
                //     name: "Voucher",
                //     route: "Voucher",
                //     iconAnimation:"flight.json",
                //     type:'voucher',
                //     image: Images.voucher
                // },
            ],
            
            heightHeader: Utils.heightHeader(),

            listdata_promo:DataLoading,
            listdata_musium:DataLoading,
            listdata_culture:DataLoading,
            listdata_product_trip_country:DataLoading,
            listdata_product_trip:DataTrip,
            listdata_product_hotel_package:DataHotelPackage,
            listdata_product_flash:DataLoading,
            config:DataConfig,


        };
        this._deltaY = new Animated.Value(0);
        this.getConfig();
    }
    
    
    _renderItem = ({item, index}) => {
        return (
            <View>
                <Text>{ item.title }</Text>
            </View>
        );
    }
    
    _renderItemWithParallax ({item, index}, parallaxProps) {
        return (
            <CarouselItem
              data={item}
              even={(index + 1) % 2 === 0}
              parallax={true}
              parallaxProps={parallaxProps}
            />
        );
    }
    
    mainExample (number, title) {
        const { slider1ActiveSlide } = this.state;
    
        return (
            <View style={styles_carousel.exampleContainer}>
                {/* <Text style={styles_carousel.title}>{'Example ${number}'}</Text>
                <Text style={styles_carousel.subtitle}>{title}</Text> */}
                <Carousel
                  ref={c => this._slider1Ref = c}
                  data={this.state.listdata_product_voucher}
                  renderItem={this._renderItemWithParallax}
                  sliderWidth={sliderWidth}
                  itemWidth={itemWidth}
                  hasParallaxImages={true}
                  firstItem={1}
                  inactiveSlideScale={0.94}
                  inactiveSlideOpacity={0.7}
                  // inactiveSlideShift={20}
                  containerCustomStyle={styles_carousel.slider}
                  contentContainerCustomStyle={styles_carousel.sliderContentContainer}
                  loop={true}
                  loopClonesPerSide={2}
                  autoplay={true}
                  autoplayDelay={500}
                  autoplayInterval={3000}
                  onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
                />
                <Pagination
                  dotsLength={ENTRIES1.length}
                  activeDotIndex={slider1ActiveSlide}
                  containerStyle={styles_carousel.paginationContainer}
                  dotColor={BaseColor.primaryColor}
                  dotStyle={styles_carousel.paginationDot}
                  inactiveDotColor={'#1a1917'}
                  inactiveDotOpacity={0.4}
                  inactiveDotScale={0.6}
                  carouselRef={this._slider1Ref}
                  tappableDots={!!this._slider1Ref}
                />
            </View>
        );
    }
    
    getConfig(){
            AsyncStorage.getItem('config', (error, result) => {
                if (result) {    
                    let config = JSON.parse(result);
                    ////console.log('getConfig',config);
                    this.setState({config:config});
                }
            });
    }


    
    getProductTripCountry(){
        const {config} =this.state;
        var url=config.baseUrl;
        var path=config.common_country.dir;
        this.setState({ loading_product_trip_country: true }, () => {
            var param={
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(),
              }
             PostDataNew(url,path,param)
                 .then((result) => {
                    this.setState({loading_product_trip_country: false });
                    this.setState({listdata_product_trip_country: result});
                 },
                 (error) => {
                     this.setState({ error });
                 }
            ); 
        });
    }

    
    
    
    getProductTrip(){
        const {config} =this.state;
        var url=config.baseUrl;
        var path=config.product_trip.dir;
        this.setState({ loading_product_trip: true }, () => {
            var param={
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(),
              }
             PostDataNew(url,path,param)
                 .then((result) => {
                    this.setState({loading_product_trip: false });
                    this.setState({listdata_product_trip: result});
                    console.log('listdatatrip',JSON.stringify(result));
                 },
                 (error) => {
                     this.setState({ error });
                 }
            ); 
        });
    }
    
    
    getProductVoucher(){
        const {config} =this.state;
        var url=config.baseUrl;
        var path=config.url_md.product.product_voucher;
        this.setState({ loading_product_voucher: true }, () => {
            var param={
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(),
              }
             PostDataNew(url,path,param)
                 .then((result) => {
                    this.setState({loading_product_voucher: false });
                    this.setState({listdata_product_voucher: result});
                 },
                 (error) => {
                     this.setState({ error });
                 }
            ); 
        });
    }
    
    
    getProductHotelPackage(){
        const {config} =this.state;
        var url=config.baseUrl;
        var path=config.product_hotel_package.dir;
        this.setState({ loading_product_hotel_package: true }, () => {
            var param={
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(),
              }
             PostDataNew(url,path,param)
                 .then((result) => {
                    this.setState({loading_product_hotel_package: false });
                    this.setState({listdata_product_hotel_package: result});
                 },
                 (error) => {
                     this.setState({ error });
                 }
            ); 
        });
    }
    
    getProductFlash(){
        const {config} =this.state;
        var url=config.baseUrl;
        var path=config.product_flash.dir;
        this.setState({ loading_product_flash: true }, () => {
            var param={
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(),
              }
             PostDataNew(url,path,param)
                 .then((result) => {
                    console.log('getProductFlash',JSON.stringify(result));
                    this.setState({loading_product_flash: false });
                    this.setState({listdata_product_flash: result.daftar});
                 },
                 (error) => {
                     this.setState({ error });
                 }
            ); 
        });
    }
    
    getMusium(){
        const {config} =this.state;
        var url=config.baseUrl;
        var path=config.common_musium.dir;
        this.setState({ loading_musium: true }, () => {
            var param={
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(),
              }
           
             PostDataNew(url,path,param)
                 .then((result) => {
                    this.setState({loading_musium: false });
                    this.setState({listdata_musium: result});
                    console.log(JSON.stringify(result));
                 },
                 (error) => {
                     this.setState({ error });
                 }
            ); 
        });
    }
    
    getBlog(){
        const {config} =this.state;
        var url=config.baseUrl;
        var path=config.url_md.common.blog;
        this.setState({ loading_blog: true }, () => {
            var param={
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(),
              }
           
             PostDataNew(url,path,param)
                 .then((result) => {
                    this.setState({loading_blog: false });
                    this.setState({listdata_blog: result});
                 },
                 (error) => {
                     this.setState({ error });
                 }
            ); 
        });
    }

    getculture(){
        const {config} =this.state;
        var url=config.baseUrl;
        var path=config.common_culture.dir;
        this.setState({ loading_culture: true }, () => {
            var param={
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(),
              }
           
             PostDataNew(url,path,param)
                 .then((result) => {
                    this.setState({loading_culture: false });
                    this.setState({listdata_culture: result});
                 },
                 (error) => {
                     this.setState({ error });
                 }
            ); 
        });
    }
    
    


    componentDidMount() {
        setTimeout(() => {
            this.getMusium();
            this.getculture();
            this.getProductTripCountry();
            this.getProductTrip();
            this.getProductHotelPackage();
            this.getProductFlash();
            // this.getBlog();
        }, 500);

     }

     

    renderIconService() {
        const { navigation } = this.props;
        const { icons,loading_featured } = this.state;
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));


        return (
            <FlatList
                data={icons}
                numColumns={4}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            style={styles.itemService}
                            activeOpacity={0.9}
                            onPress={() => {
                                navigation.navigate(item.route,{type:item.type});
                            }}
                        >
                            <View style={styles.iconContent}>
                                {/* <Icon
                                    name={item.icon}
                                    size={25}
                                    color={BaseColor.primaryColor}
                                    solid
                                /> */}
                                <Image
                                    source={item.image}
                                    style={styles.imgProfile}
                                />
                            </View>
                            <Text footnote whiteColor>
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    );
                }}
            />
        );
    }


    render() {

        const { navigation } = this.props;
        const { heightHeader} = this.state;
        const heightImageBanner = Utils.scaleWithPixel(140);
        const marginTopBanner = heightImageBanner - heightHeader-50;
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
        const {config} =this.state;
        
        
   
        const example1 = this.mainExample(1, 'Default layout | Loop | Autoplay | Parallax | Scale | Opacity | Pagination with tappable dots');
        return (
            <View style={{ flex: 1 }}>
                
                
                <SafeAreaView
                    style={BaseStyle.safeAreaView}
                    forceInset={{ top: "always" }}
                >
                
                
                    <Header
                        title="Masterdiskon"
                        // subTitle={"Perjalanan di tanganmu"}
                        renderLeft={() => {
                            return (
                                <Icon
                                    name="home"
                                    size={20}
                                    color={BaseColor.whiteColor}
                                />
                            );
                        }}
                        
                        // renderRight={() => {
                        //     return (
                        //         <Icon
                        //             name="search"
                        //             size={20}
                        //             color={BaseColor.whiteColor}
                        //         />
                        //     );
                        // }}
                        
                        onPressLeft={() => {
                            navigation.goBack();
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
                        style={{marginBottom:0}}
                    >
                     
                    <View style={styles.containerSwipper}>
                        <View style={styles.top_background}>
                          <View style={styles.top_content}>
                            <View style={{ marginTop: 20,borderRadius:30,width:'90%',alignSelf: 'center'}}>
                                <View>
                                    <Text whiteColor style={ {
                                            fontSize: 20,
                                            fontWeight: "700",
                                            fontFamily: "Lato",
                                            alignSelf: 'center'
                                    }}>
                                    Wherever you are,
                                    </Text>
                                    
                                    <Text whiteColor  style={ {
                                            fontSize: 20,
                                            fontWeight: "700",
                                            fontFamily: "Lato",
                                            alignSelf: 'center'
                                    }}>
                                    you are always traveling
                                    </Text>
                                    
                                    {/* <Text whiteColor>
                                    Master Diskon provide everything you need for fun wherever and whenever you are
                                    </Text> */}
                                    
                                </View>
                                <View>
                                    {this.renderIconService()}
                                </View>
                            </View>
                                {/* <Swiper
                                    renderPagination={renderPagination}
                                    loop={false}
                                    style={styles.wrapper}
                                    style={{marginTop: 5}}
                                    >

                                    {
                                        this.state.listdata_promo.map((item, key) => {
                                            return (

                                                <View
                                                    style={styles.slide}
                                                    title={
                                                        <Text numberOfLines={1}>{item.title_promo}</Text>
                                                    }
                                                    >
                                                    <Text>asd</Text>
                                                    </View>

                                            )
                                        })
                                    }

                                </Swiper> */}
                          </View>
                        </View>
                      </View>
                      
                      
                        <View style={{backgroundColor:'#fff',marginTop:0}}>
                            {/* <View style={{ marginTop: -50,backgroundColor:'#fff',borderRadius:30,width:'90%',alignSelf: 'center'}}>
                                <View style={styles.contentHiking2}>
                                    <Text title3 semibold style={{alignSelf: 'center'}}>
                                    Hey Kamu Mau Kemana ?
                                    </Text>
                                </View>
                                <View>
                                    {this.renderIconService()}
                                </View>
                            </View>
                             */}
                            
                            
                            {/* <View>
                                <View style={{marginTop: 20,marginLeft: 20,marginBottom: 10}}>
                                    <Text title3 semibold>
                                        Featured Destination
                                    </Text>
                                    <Text body2>
                                    Sekumpulan tempat menginap pilihan yang telah terverifikasi kualitas dan desainnya
                                    </Text>
                                </View>
                                <View>
                                    <FlatList
                                        contentContainerStyle={{
                                            paddingRight: 20
                                        }}
                                        //untuk horizontal false
                                        // columnWrapperStyle={{ marginBottom: 10 }}
                                        // numColumns={2}
                                        
                                        //untuk horizontal false
                                        horizontal={true}
                                        
                                        data={this.state.listdata_product_trip_country}
                                        showsHorizontalScrollIndicator={false}
                                        keyExtractor={(item, index) => item.id}
                                        renderItem={({ item, index }) => (
                                        
                                            <CardCustom
                                                item={item}
                                                img={config.baseUrl+'assets/upload/destination/country/img/'+item.img_featured}
                                                imgHeight={150}
                                                titleIcon={{text:"",icon:""}}
                                                title={item.product_name}
                                                subtitle={''}
                                                subtitle2={''}
                                                subtitleLeftRight={{enable:false,textLeft:"",textRight:""}}
                                                style={
                                                    //style untuk horizontal true
                                                    { borderRadius: 5,width: Utils.scaleWithPixel(200),marginLeft:20}
                                                    
                                                    //style untuk horizontal false
                                                    // index % 2 ? { marginLeft: 20 } : {marginLeft:20,marginBottom:20}
                                                }
                                                onPress={() =>
                                                    navigation.navigate("WebViewPage",{url:'https://masterdiskon.com/blog/detail/'+item.slug_blog_category+'/'+item.title_slug+'?access=app',title:item.title})
                                                }
                                                loading={this.state.loading_product_trip_country}
                                                property={{inFrame:false,innerText:false}}
                                                type={''}
                                            />
                                        
                                        )}
                                    />
                                    
                                </View>
                            </View> */}
                            
                            
                            {/* <View>
                                <View style={{marginTop: 20,marginLeft: 20,marginBottom: 10}}>
                                    <Text title3 semibold>
                                        Voucher
                                    </Text>
                                    <Text body2>
                                    Dapatkan penawaran terbaik dari voucher yang tersedia
                                    </Text>
                                </View>
                                <View>
                                    {example1}
                                </View>
                            </View> */}
                            
                            
                            {/* <View>
                                <View style={{marginTop: 20,marginLeft: 20,marginBottom: 10}}>
                                    <Text title3 semibold>
                                        Flash
                                    </Text>
                                    <Text body2>
                                    Jelajahi sekarang
                                    </Text>
                                </View>
                                <View>
                                <FlatList
                                        contentContainerStyle={{
                                            paddingRight: 20
                                        }}
                                        //untuk horizontal false
                                        // columnWrapperStyle={{ marginBottom: 10 }}
                                        // numColumns={2}
                                        
                                        //untuk horizontal false
                                        horizontal={true}
                                        
                                        data={this.state.listdata_product_flash.daftar}
                                        showsHorizontalScrollIndicator={false}
                                        keyExtractor={(item, index) => item.id}
                                        renderItem={({ item, index }) => (
                                        
                                            <CardCustom
                                                item={item}
                                                img={item.img_featured_url}
                                                imgHeight={150}
                                                titleIcon={{text:"home",icon:"home"}}
                                                title={item.product_name}
                                                subtitle={''}
                                                subtitle2={''}
                                                subtitleLeftRight={{enable:false,textLeft:"",textRight:""}}
                                                style={
                                                    //style untuk horizontal true
                                                    { borderRadius: 5,width: Utils.scaleWithPixel(200),marginLeft:20}
                                                    
                                                    //style untuk horizontal false
                                                    // index % 2 ? { marginLeft: 20 } : {marginLeft:20,marginBottom:20}
                                                }
                                                onPress={() =>
                                                    navigation.navigate("TourDetailCustom",{product:item})
                                                }
                                                loading={this.state.loading_product_trip}
                                                property={{inFrame:false,innerText:false}}
                                                type={''}
                                            />
                                        
                                        )}
                                    />
                                    
                                    
                                </View>
                            </View> */}
                            
                            {/* <View>
                                <View style={{marginTop: 20,marginLeft: 20,marginBottom: 10}}>
                                    <Text title3 semibold>
                                        Flash 
                                    </Text>
                                    <Text body2>
                                    Jelajahi sekarang
                                    </Text>
                                </View>
                                <View>
                                <FlatList
                                        contentContainerStyle={{
                                            paddingRight: 20
                                        }}
                                        //untuk horizontal false
                                        // columnWrapperStyle={{ marginBottom: 10 }}
                                        // numColumns={2}
                                        
                                        //untuk horizontal false
                                        horizontal={true}
                                        
                                        data={this.state.listdata_product_flash}
                                        showsHorizontalScrollIndicator={false}
                                        keyExtractor={(item, index) => item.id}
                                        renderItem={({ item, index }) => (
                                        
                                            <CardCustom
                                                item={item}
                                                img={item.img_featured_url}
                                                imgHeight={150}
                                                titleIcon={{text:"Pay Now Start Later",icon:"home"}}
                                                title={item.product_name}
                                                subtitle={''}
                                                subtitle2={''}
                                                subtitleLeftRight={{enable:false,textLeft:"",textRight:""}}
                                                style={
                                                    //style untuk horizontal true
                                                    { borderRadius: 5,width: Utils.scaleWithPixel(200),marginLeft:20}
                                                    
                                                    //style untuk horizontal false
                                                    // index % 2 ? { marginLeft: 20 } : {marginLeft:20,marginBottom:20}
                                                }
                                                onPress={() =>
                                                    navigation.navigate("HotelDetail",{product:item})
                                                }
                                                loading={this.state.loading_product_hotel_package}
                                                property={{inFrame:true,innerText:false}}
                                                type={''}
                                            />
                                        
                                        )}
                                    />
                                    
                                    
                                </View>
                            </View> */}
                            
                            
                            <View>
                                <View style={{marginTop: 20,marginLeft: 20,marginBottom: 10}}>
                                    <Text title3 semibold>
                                        Trip
                                    </Text>
                                    <Text body2>
                                    Jelajahi sekarang
                                    </Text>
                                </View>
                                <View>
                                <FlatList
                                        contentContainerStyle={{
                                            paddingRight: 20
                                        }}
                                        //untuk horizontal false
                                        // columnWrapperStyle={{ marginBottom: 10 }}
                                        // numColumns={2}
                                        
                                        //untuk horizontal false
                                        horizontal={true}
                                        
                                        data={this.state.listdata_product_trip}
                                        showsHorizontalScrollIndicator={false}
                                        keyExtractor={(item, index) => item.id}
                                        renderItem={({ item, index }) => (
                                        
                                            <CardCustom
                                                item={item}
                                                img={item.img_featured_url}
                                                imgHeight={150}
                                                titleIcon={{text:item.product_detail.duration+' hari',icon:"home"}}
                                                title={item.product_name}
                                                subtitle={''}
                                                subtitle2={'Rp '+priceSplitter(item.product_price)}
                                                subtitleLeftRight={{enable:false,textLeft:"",textRight:""}}
                                                style={
                                                    //style untuk horizontal true
                                                    { borderRadius: 5,width: Utils.scaleWithPixel(200),marginLeft:20}
                                                    
                                                    //style untuk horizontal false
                                                    // index % 2 ? { marginLeft: 20 } : {marginLeft:20,marginBottom:20}
                                                }
                                                onPress={() =>
                                                    //console.log('TourDetailCustom',)
                                                    navigation.navigate("TourDetailCustom",{product:item})
                                                }
                                                loading={this.state.loading_product_trip}
                                                property={{inFrame:true,innerText:false}}
                                                type={''}
                                            />
                                        
                                        )}
                                    />
                                    
                                    
                                </View>
                            </View>
                            
                            
                            <View>
                                <View style={{marginTop: 20,marginLeft: 20,marginBottom: 10}}>
                                    <Text title3 semibold>
                                        Deals 
                                    </Text>
                                    {/* <Text body2>
                                    Jelajahi sekarang
                                    </Text> */}
                                </View>
                                <View>
                                <FlatList
                                        contentContainerStyle={{
                                            paddingRight: 20
                                        }}
                                        //untuk horizontal false
                                        // columnWrapperStyle={{ marginBottom: 10 }}
                                        // numColumns={2}
                                        
                                        //untuk horizontal false
                                        horizontal={true}
                                        
                                        data={this.state.listdata_product_hotel_package}
                                        showsHorizontalScrollIndicator={false}
                                        keyExtractor={(item, index) => item.id}
                                        renderItem={({ item, index }) => (
                                        
                                            <CardCustom
                                                item={item}
                                                img={item.img_featured_url}
                                                imgHeight={150}
                                                titleIcon={{text:item.product_detail.detail_category.replace(/_/g, " "),icon:"home"}}
                                                title={item.product_name}
                                                subtitle={'Start from'}
                                                subtitle2={'Rp '+priceSplitter(item.product_detail.start_price)}
                                                subtitleLeftRight={{enable:false,textLeft:"",textRight:""}}
                                                style={
                                                    //style untuk horizontal true
                                                    { borderRadius: 5,width: Utils.scaleWithPixel(200),marginLeft:20}
                                                    
                                                    //style untuk horizontal false
                                                    // index % 2 ? { marginLeft: 20 } : {marginLeft:20,marginBottom:20}
                                                }
                                                onPress={() =>
                                                    navigation.navigate("HotelDetail",{product:item})
                                                }
                                                loading={this.state.loading_product_hotel_package}
                                                property={{inFrame:true,innerText:false}}
                                                type={''}
                                            />
                                        
                                        )}
                                    />
                                    
                                    
                                </View>
                            </View>
                            
                            
                            
                            
                            
                            
                            
                            {/* <View>
                                <View style={{marginTop: 20,marginLeft: 20,marginBottom: 10}}>
                                    <Text title3 semibold>
                                    Voucher Hotel Domestik
                                    </Text>
                                    <Text body2>
                                    Pay Now Stay Later
                                    </Text>
                                </View>
                                <View>
                                    <FlatList
                                        contentContainerStyle={{
                                            paddingRight: 20
                                        }}
                                        //untuk coloumn
                                        // columnWrapperStyle={{ marginBottom: 10 }}
                                        // numColumns={2}
                                        
                                        //data memanjang horizontal
                                        horizontal={true}
                                        
                                        data={this.state.listdata_product_voucher}
                                        showsHorizontalScrollIndicator={false}
                                        keyExtractor={(item, index) => item.id}
                                        renderItem={({ item, index }) => (
                                            <CardCustom
                                                item={item}
                                                img={config.baseUrl+'assets/upload/product/voucher/2020/'+item.img_featured}
                                                imgHeight={150}
                                                titleIcon={{text:"home",icon:"home"}}
                                                title={item.product_name}
                                                subtitle={''}
                                                subtitle2={''}
                                                subtitleLeftRight={{enable:false,textLeft:"",textRight:""}}
                                                style={
                                                    //style untuk horizontal true
                                                    { borderRadius: 5,width: Utils.scaleWithPixel(250),marginLeft:20}
                                                    
                                                    //style untuk horizontal false
                                                    // index % 2 ? { marginLeft: 20 } : {marginLeft:20,marginBottom:20}
                                                }
                                                onPress={() =>
                                                    navigation.navigate("WebViewPage",{url:'https://masterdiskon.com/blog/detail/'+item.slug_blog_category+'/'+item.title_slug+'?access=app',title:item.title})
                                                }
                                                loading={this.state.loading_product_voucher}
                                                property={{inFrame:false,innerText:false}}
                                                type={''}
                                            />
                                            
                                        )}
                                    />
                                </View>
                            </View> */}
                            
                            
                            

                            <View>
                                <View style={{marginTop: 20,marginLeft: 20,marginBottom: 10}}>
                                    <Text title3 semibold>
                                    National Musium Collection
                                    </Text>
                                    <Text body2>
                                    Sekumpulan tempat menginap pilihan yang telah terverifikasi kualitas dan desainnya
                                    </Text>
                                </View>
                                <View>
                                    <FlatList
                                        contentContainerStyle={{
                                            paddingRight: 20
                                        }}
                                        //untuk coloumn
                                        // columnWrapperStyle={{ marginBottom: 10 }}
                                        // numColumns={2}
                                        
                                        //data memanjang horizontal
                                        horizontal={true}
                                        
                                        data={this.state.listdata_musium}
                                        showsHorizontalScrollIndicator={false}
                                        keyExtractor={(item, index) => item.id}
                                        renderItem={({ item, index }) => (
                                            <CardCustom
                                                item={item}
                                                img={'https:'+item[2]}
                                                imgHeight={200}
                                                titleIcon={{text:item[0],icon:"home"}}
                                                title={item[0]}
                                                subtitle={''}
                                                subtitle2={''}
                                                subtitleLeftRight={{enable:false,textLeft:"",textRight:""}}
                                                style={
                                                    //style untuk horizontal true
                                                    { borderRadius: 5,width: Utils.scaleWithPixel(200),marginLeft:20}
                                                    
                                                    //style untuk horizontal false
                                                    // index % 2 ? { marginLeft: 20 } : {marginLeft:20,marginBottom:20}
                                                }
                                                onPress={() =>
                                                    navigation.navigate("Musium",{url:item[3]})
                                                }
                                                loading={this.state.loading_musium}
                                                property={{inFrame:false,innerText:true}}
                                                type={''}
                                            />
                                        )}
                                    />
                                </View>
                            </View>
                            
                            
                            
                            <View>
                                <View style={{marginTop: 20,marginLeft: 20,marginBottom: 10}}>
                                    <Text title3 semibold>
                                        Art & Culture Stories
                                    </Text>
                                    <Text body2>
                                    Jelajahi Sekarang
                                    </Text>
                                </View>
                                <View>
                                    <FlatList
                                        contentContainerStyle={{
                                            paddingRight: 20
                                        }}
                                        //untuk coloumn
                                        // columnWrapperStyle={{ marginBottom: 10 }}
                                        // numColumns={2}
                                        
                                        //data memanjang horizontal
                                        horizontal={true}
                                        
                                        data={this.state.listdata_culture}
                                        showsHorizontalScrollIndicator={false}
                                        keyExtractor={(item, index) => item.id}
                                        renderItem={({ item, index }) => (
                                            <CardCustom
                                                item={item}
                                                img={'https:'+item[2]}
                                                imgHeight={150}
                                                titleIcon={{text:"",icon:"home"}}
                                                title={item[0]}
                                                subtitle={item[1]}
                                                subtitle2={''}
                                                subtitleLeftRight={{enable:false,textLeft:"",textRight:""}}
                                                style={
                                                    //style untuk horizontal true
                                                    { borderRadius: 5,width: Utils.scaleWithPixel(250),marginLeft:20}
                                                    
                                                    //style untuk horizontal false
                                                    // index % 2 ? { marginLeft: 20 } : {marginLeft:20,marginBottom:20}
                                                }
                                                onPress={() =>
                                                    navigation.navigate("Musium",{url:item[3]})
                                                }
                                                loading={this.state.loading_culture}
                                                property={{inFrame:true,innerText:false}}
                                                type={''}
                                            />
                                        )}
                                    />
                                </View>
                            </View>
                            
                            
                            
                            
                            
                            
                            {/* <View>
                                <View style={{marginTop: 20,marginLeft: 20,marginBottom: 10}}>
                                    <Text title3 semibold>
                                        BLOG
                                    </Text>
                                    <Text body2>
                                    Dapatkan Informasi Seputar Dunia Wisata
                                    </Text>
                                </View>
                                <View>
                                    <FlatList
                                        contentContainerStyle={{
                                            paddingRight: 20
                                        }}
                                        //untuk horizontal false
                                        columnWrapperStyle={{ marginBottom: 10 }}
                                        numColumns={2}
                                        
                                        //untuk horizontal false
                                        //horizontal={true}
                                        
                                        data={this.state.listdata_blog}
                                        showsHorizontalScrollIndicator={false}
                                        keyExtractor={(item, index) => item.id}
                                        renderItem={({ item, index }) => (
                                        
                                            <CardCustom
                                                item={item}
                                                img={config.baseUrl+'assets/upload/blog/post/'+item.featured_image}
                                                imgHeight={150}
                                                titleIcon={{text:"",icon:""}}
                                                title={item.title}
                                                subtitle={item.name_blog_category}
                                                subtitle2={''}
                                                subtitleLeftRight={{enable:false,textLeft:"",textRight:""}}
                                                style={
                                                    //style untuk horizontal true
                                                    // { borderRadius: 5,width: Utils.scaleWithPixel(200),marginLeft:20}
                                                    
                                                    //style untuk horizontal false
                                                    index % 2 ? { marginLeft: 20 } : {marginLeft:20,marginBottom:20}
                                                }
                                                onPress={() =>
                                                    //navigation.navigate("TourDetailCustom",{product:item})
                                                    navigation.navigate("WebViewPage",{url:config.baseUrl+'blog/detail/'+item.slug_blog_category+'/'+item.title_slug+'?access=app',title:item.title})
                                                }
                                                loading={this.state.loading_blog}
                                                property={{inFrame:false,innerText:false}}
                                                type={''}
                                            />
                                        
                                        )}
                                    />
                                </View>
                            </View> */}
                            
                            
                            
                            
                            
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View>
        );
    }
}
