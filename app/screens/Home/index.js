import React, { Component } from "react";
import {
    View,
    ScrollView,
    Animated,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    Dimensions
} from "react-native";
import {
    Image,
    Text,
    Icon,
    HotelItem,
    Card,
    Button,
    SafeAreaView,
    PostListItem,

    EventCard,
    ProfileDescription
} from "@components";
import { BaseStyle, BaseColor, Images } from "@config";
import * as Utils from "@utils";
import styles from "./styles";

import {PostData} from '../../services/PostData';
import {AsyncStorage} from 'react-native';



// Load sample data
import { PromotionData, TourData, HotelData,FeaturedDestination,DataMasterDiskon, DataLoading } from "@data";
import Swiper from 'react-native-swiper'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";

const { width } = Dimensions.get('window');

import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade
} from "rn-placeholder";


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
        // Temp data define
        this.state = {
            icons: [
                {
                    icon: "calendar-alt",
                    name: "Hotel",
                    route: "Hotel"
                },
                {
                    icon: "map-marker-alt",
                    name: "Tour",
                    route: "Tour"
                    // <i class="fas fa-pencil-alt"></i>
                },
                // {
                //     icon: "car-alt",
                //     name: "Car",
                //     route: "OverViewCar"
                // },
                {
                    icon: "plane",
                    name: "Flight",
                    route: "FlightSearch",
                    // route: "BusSearch"
                },
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
                // }
            ],
            relate: [
                {
                    id: "0",
                    image: Images.event4,
                    title: "BBC Music Introducing",
                    time: "Thu, Oct 31, 9:00am",
                    location: "Tobacco Dock, London"
                },
                {
                    id: "1",
                    image: Images.event5,
                    title: "Bearded Theory Spring Gathering",
                    time: "Thu, Oct 31, 9:00am",
                    location: "Tobacco Dock, London"
                }
            ],
            promotion: PromotionData,
            tours: TourData,
            featuredDestination:FeaturedDestination,
            hotels: HotelData.splice(0, 4),
            heightHeader: Utils.heightHeader(),
            DataMasterDiskon:DataMasterDiskon[0],


            listdata_featured_destination:DataLoading,
            listdata_popular_destination:DataLoading,
            listdata_trip_domestic:DataLoading,
            listdata_blog_new:DataLoading,
            listdata_promo:DataLoading,
            listdata_musium:DataLoading,
            listdata_culture:DataLoading,


            listdata_assets:{},


           loaded: false,
          imageOpacity: new Animated.Value(0.0),
          placeholderOpacity: new Animated.Value(1.0),
          placeholderScale: new Animated.Value(1.0),

        };
        this._deltaY = new Animated.Value(0);
    }



    getPayment(){
            PostData('selectpayment_list')
                    .then((result) => {
                        console.log('-----------data bank payment----------------');
                        console.log(JSON.stringify(result));
                        AsyncStorage.setItem('bankPayment', JSON.stringify(result));
                    }
                );
        
    }

    getToken(){
         var details = {
            "grant_type":"password",
            "client_id":"website.2",
            "client_secret":"4bUbd9IH",
            "username":"external@agent.com",
            "password":"123456",
            "timezone":"Asia/Jakarta",
            "lang":"en_US",
            "is_agent":"true",
        };
        
        var formBody = [];
        for (var property in details) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");


        /*untuk mendapatkan token*/
        fetch('https://dev-api.megaelectra.co.id/connect/token', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: formBody
        })
        .then(response => response.json())
        .then(result => {
            var access_token=result.access_token;
            console.log("-------token------");
            console.log(access_token);
            AsyncStorage.setItem('tokenAgi', access_token);    
        })
        .catch(error => console.log('error', error));
    }

    getFeaturedDestination(){
        this.setState({ loading_featured: true }, () => {
       
            PostData('get_featured_destination')
                    .then((result) => {
                        console.log('listdata_featured_destination',JSON.stringify(result));
                        this.setState({loading_featured: false });
                        this.setState({listdata_featured_destination: result});
                    }
                );
            });
        
    }

    getPopularDestination(){
        this.setState({ loading_popular: true }, () => {
            const data={
                "id_trip":"",
                "id_country":"0",
                "harga_min":"","harga_max":""
            }
            const param={"param":data}
            console.log('-------------param trip-------------');
            console.log(JSON.stringify(param));
            PostData('trip',param)
                 .then((result) => {
                    this.setState({loading_popular: false });
                     this.setState({listdata_popular_destination: result});
                 },
                 (error) => {
                     this.setState({ error });
                 }
             ); 
        });
    }
    

    getTripDomestic(){
        this.setState({ loading_domestic: true }, () => {
            const data={
                "id_trip":"",
                "id_country":"193",
                "harga_min":"","harga_max":""
            }
            const param={"param":data}
            console.log('-------------param trip-------------');
            console.log(JSON.stringify(param));
            PostData('trip',param)
                 .then((result) => {
                    this.setState({loading_domestic: false });
                     this.setState({listdata_trip_domestic: result});
                 },
                 (error) => {
                     this.setState({ error });
                 }
             ); 
        });
     }

     getTripDunia(){
        this.setState({ loading_dunia: true }, () => {
            const data={"id_trip":"","id_country":"","harga_min":"","harga_max":""}
            const param={"param":data}
            PostData('trip',param)
                 .then((result) => {
                    this.setState({loading_dunia: false });
                     this.setState({listdata_trip_dunia: result});
                 },
                 (error) => {
                     this.setState({ error });
                 }
             ); 
        });

     }

    getBlog(){
        this.setState({ loading_blog: true }, () => {
            PostData('get_blog_new')
                .then((result) => {
                    this.setState({loading_blog: false });
                    this.setState({listdata_blog_new: result});
                },
                (error) => {
                    this.setState({ error });
                }
            );   
        });
    }

    getPromo(){
        this.setState({ loading_promo: true }, () => {
            PostData('get_promo')
                .then((result) => {
                    this.setState({loading_promo: false });
                    this.setState({listdata_promo: result});
                },
                (error) => {
                    this.setState({ error });
                }
            );   
        });
    }


    getMusium(){
        this.setState({ loading_musium: true }, () => {
            PostData('get_musium')
                .then((result) => {
                    console.log(JSON.stringify(result));
                    this.setState({loading_musium: false });
                    this.setState({listdata_musium: result});
                },
                (error) => {
                    this.setState({ error });
                }
            );   
        });
    }

    getculture(){
        this.setState({ loading_culture: true }, () => {
            PostData('get_culture')
                .then((result) => {
                    console.log(JSON.stringify(result));
                    this.setState({loading_culture: false });
                    this.setState({listdata_culture: result});
                },
                (error) => {
                    this.setState({ error });
                }
            );   
        });
    }

    getAssets(){
        this.setState({ loading_assets: true }, () => {
          
            PostData('get_assets')
                 .then((result) => {
                    this.setState({loading_assets: false });
                    this.setState({listdata_assets: result});
                 },
                 (error) => {
                     this.setState({ error });
                 }
             ); 
        });
     }


    addDate(dt, amount, dateType) {
        switch (dateType) {
          case 'days':
            return dt.setDate(dt.getDate() + amount) && dt;
          case 'weeks':
            return dt.setDate(dt.getDate() + (7 * amount)) && dt;
          case 'months':
            return dt.setMonth(dt.getMonth() + amount) && dt;
          case 'years':
            return dt.setFullYear( dt.getFullYear() + amount) && dt;
        }
      }

    minmaxDate(value,dateType){
        let dt = new Date();
        dt = this.addDate(dt, -value, dateType);
        var date = dt.getFullYear()+'-'+(dt.getMonth()+1)+'-'+dt.getDate();
        return date;
    }


    getAge(dateString) {
        var today = new Date();
        var DOB = new Date(dateString);
        var totalMonths = (today.getFullYear() - DOB.getFullYear()) * 12 + today.getMonth() - DOB.getMonth();
        totalMonths += today.getDay() < DOB.getDay() ? -1 : 0;
        var years = today.getFullYear() - DOB.getFullYear();
        if (DOB.getMonth() > today.getMonth())
            years = years - 1;
        else if (DOB.getMonth() === today.getMonth())
            if (DOB.getDate() > today.getDate())
                years = years - 1;
    
        var days;
        var months;
    
        if (DOB.getDate() > today.getDate()) {
            months = (totalMonths % 12);
            if (months == 0)
                months = 11;
            var x = today.getMonth();
            switch (x) {
                case 1:
                case 3:
                case 5:
                case 7:
                case 8:
                case 10:
                case 12: {
                    var a = DOB.getDate() - today.getDate();
                    days = 31 - a;
                    break;
                }
                default: {
                    var a = DOB.getDate() - today.getDate();
                    days = 30 - a;
                    break;
                }
            }
    
        }
        else {
            days = today.getDate() - DOB.getDate();
            if (DOB.getMonth() === today.getMonth())
                months = (totalMonths % 12);
            else
                months = (totalMonths % 12) + 1;
        }
        var age = years + ' years ' + months + ' months ' + days + ' days';
        return age;
    }
    


    componentDidMount() {
        console.log("------------maximal----------");
        console.log(this.minmaxDate(12,'years'));


        console.log("------------minimal-----------");
        console.log(this.minmaxDate(60,'years'));

        console.log("------------getage-----------");
        console.log(this.getAge("1987-09-18"));

        
        this.getToken();
        // this.getPayment();
        
        // this.getFeaturedDestination();
        // this.getPopularDestination();
        // this.getTripDomestic();
        // this.getTripDunia();
        // this.getBlog();
        // this.getAssets();
        // this.getPromo();
        // this.getMusium();
        // this.getculture();
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
                                navigation.navigate(item.route);
                            }}
                        >
                            <View style={styles.iconContent}>
                                <Icon
                                    name={item.icon}
                                    size={25}
                                    color={BaseColor.primaryColor}
                                    solid
                                />
                            </View>
                            <Text footnote>
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    );
                }}
            />
        );
    }



     _onLoad = () => {
    const {
      placeholderScale,
      placeholderOpacity,
      imageOpacity
    } = this.state

    Animated.sequence([
      // Delay is just so here so it can be seen
      Animated.timing(placeholderOpacity, {
        delay: 1000,
        toValue: 1.0
      }),
      // Begin explode animation
      Animated.parallel([
        Animated.timing(placeholderScale, {
          toValue: 0.7,
          duration: 100,
          useNativeDriver: true
        }),
        Animated.timing(placeholderOpacity, {
          toValue: 0.66,
          duration: 100,
          useNativeDriver: true
        }),
      ]),
      Animated.parallel([
        Animated.parallel([
          Animated.timing(placeholderOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true
          }),
          Animated.timing(placeholderScale, {
            toValue: 1.2,
            duration: 200,
            useNativeDriver: true
          }),
        ]),
        Animated.timing(imageOpacity, {
          toValue: 1.0,
          delay: 200,
          duration: 300,
          useNativeDriver: true
        })
      ])
    ]).start(() => {
      this.setState(() => ({ loaded: true }))
    })
  }





    render() {
        
        const todo = [
            {
            id: '1',
            title: 'South Travon',
            image: Images.trip1,
            },
            {
            id: '2',
            title: 'South Travon',
            image: Images.trip2,
            },
            {
            id: '3',
            title: 'South Travon',
            image: Images.trip3,
            },
            {
            id: '4',
            title: 'South Travon',
            image: Images.trip4,
            },
            {
            id: '5',
            title: 'South Travon',
            image: Images.trip5,
            },
        ];
        const valueProduct = [
            {
            image: Images.profile2,
            subName: 'CEO Founder',
            name: 'Kondo Ieyasu',
            screen: 'Profile1',
            description:
                'Andaz Tokyo Toranomon Hills is one of the newest luxury hotels in Tokyo. Located in one of the uprising areas of Tokyo',
            },
            {
            image: Images.profile3,
            subName: 'Sale Manager',
            name: 'Yeray Rosales',
            screen: 'Profile2',
            description:
                'Andaz Tokyo Toranomon Hills is one of the newest luxury hotels in Tokyo. Located in one of the uprising areas of Tokyo',
            },
            {
            image: Images.profile5,
            subName: 'Product Manager',
            name: 'Alf Huncoot',
            screen: 'Profile3',
            description:
                'Andaz Tokyo Toranomon Hills is one of the newest luxury hotels in Tokyo. Located in one of the uprising areas of Tokyo',
            },
            {
            image: Images.profile4,
            subName: 'Designer UI/UX',
            name: 'Chioke Okonkwo',
            screen: 'Profile4',
            description:
                'Andaz Tokyo Toranomon Hills is one of the newest luxury hotels in Tokyo. Located in one of the uprising areas of Tokyo',
            },
        ];


        const { navigation } = this.props;
        const { promotion, tours, hotels, relate, heightHeader} = this.state;
        const heightImageBanner = Utils.scaleWithPixel(140);
        const marginTopBanner = heightImageBanner - heightHeader+150;
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));


        const {
          placeholderColor,
          source
        } = this.props

        const {
          imageOpacity,
          placeholderOpacity,
          placeholderScale
        } = this.state

        if(this.state.loading_assets){

            var banner=<Animated.View
                          style={[
                            styles.imageBackground,
                            // {
                            //     backgroundColor: placeholderColor || BaseColor.fieldColor,    
                            //     height: this._deltaY.interpolate({
                            //         inputRange: [
                            //             0,
                            //             Utils.scaleWithPixel(100),
                            //             Utils.scaleWithPixel(100)
                            //         ],
                            //         outputRange: [
                            //             heightImageBanner,
                            //             heightHeader,
                            //             0
                            //         ]
                            //     })
                            // }
                          ]} />
        }else{
             var banner=<Animated.Image
                    source={{uri : this.state.listdata_assets.banner}}
                    style={[
                        styles.imageBackground,
                        // {
                        //     height: this._deltaY.interpolate({
                        //         inputRange: [
                        //             0,
                        //             Utils.scaleWithPixel(100),
                        //             Utils.scaleWithPixel(100)
                        //         ],
                        //         outputRange: [
                        //             heightImageBanner,
                        //             heightHeader,
                        //             0
                        //         ]
                        //     })
                        // }
                    ]}
                />

        }

        return (
            <View style={{ flex: 1 }}>
                {banner}
                <SafeAreaView
                    style={BaseStyle.safeAreaView}
                    forceInset={{ top: "always" }}
                >
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
                    
                        <View style={{ marginTop: marginTopBanner,backgroundColor:'#fff',borderRadius:30,elevation: 5}}>
                            
                            <View>
                                <View style={styles.contentHiking2}>
                                    <Text title3 semibold>
                                    Hey Kamu Mau Kemana ?
                                    </Text>
                                </View>
                                <View>
                                    {this.renderIconService()}
                                </View>
                            </View>


                            {/* <View>
                                <View style={styles.contentHiking}>
                                    <Text title3 semibold>
                                        Featuread Destination
                                    </Text>
                                    <Text body2>
                                    Sekumpulan tempat menginap pilihan yang telah terverifikasi kualitas dan desainnya
                                    </Text>
                                </View>
                            
                                <FlatList
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    data={this.state.listdata_featured_destination}
                                    keyExtractor={(item, index) => item.id}
                                    renderItem={({ item, index }) => (
                                        <Card
                                            style={[
                                                styles.tourItem,
                                                index == 0
                                                    ? { marginHorizontal: 20 }
                                                    : { marginRight: 20 }
                                            ]}
                                            image={item.country_image}
                                            url={this.state.DataMasterDiskon.site+'assets/upload/country/img/'}
                                            onPress={() =>
                                                navigation.navigate("Tour",{country:item})
                                            }
                                            loading={this.state.loading_featured}
                                        >
                                        {!this.state.loading_featured && (
                                            <View>
                                                <Text headline whiteColor semibold>
                                                    {item.country_name}
                                                </Text>
                                                <Text subhead whiteColor>
                                                    {item.listing} pencarian
                                                </Text>
                                            </View>
                                        )}
                                        </Card>
                                    )}
                                />
                                    
                            </View> */}

                            <View>
                                <View style={styles.contentHiking}>
                                    <Text title3 semibold>
                                        Rekomendasi
                                    </Text>
                                    <Text body2>
                                    Jelajahi Sekarang
                                    </Text>
                                </View>
                                
                                <FlatList
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    data={this.state.listdata_popular_destination}
                                    keyExtractor={(item, index) => item.id}
                                    renderItem={({ item, index }) => (
                                        <Card
                                            style={[
                                                styles.promotionItem,
                                                index == 0
                                                    ? { marginHorizontal: 20 }
                                                    : { marginRight: 20 }
                                            ]}
                                            image={item.img_featured}
                                            url='https://masterdiskon.co.id/assets/upload/product/img/featured/'
                                            onPress={() =>
                                                navigation.navigate("TourDetailCustom",{product:item})
                                            }
                                            loading={this.state.loading_popular}
                                        >
                                        {!this.state.loading_popular && (
                                            <View>
                                            <Text subhead whiteColor>
                                                {item.judul_trip}
                                            </Text>
                                            <Text title2 whiteColor semibold>
                                                {item.duration} hari
                                            </Text>
                                            <View
                                                style={styles.contentCartPromotion}
                                            >
                                                <Button
                                                    style={styles.btnPromotion}
                                                    onPress={() => {
                                                        navigation.navigate(
                                                            "PreviewBooking"
                                                        );
                                                    }}
                                                >
                                                    <Text body2 semibold whiteColor>
                                                    IDR {priceSplitter(item.harga)}
                                                    </Text>
                                                </Button>
                                            </View>
                                        </View>
                                            )}
                                        </Card>
                                    )}
                                />
                            </View>
                                
                            <View>
                                <View style={styles.contentHiking}>
                                    <Text title3 semibold>
                                    Domestic
                                    </Text>
                                    <Text body2>
                                    Sekumpulan destinasi pilihan di Indonesia
                                    </Text>
                                </View>
                                
                                <FlatList
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    data={this.state.listdata_trip_domestic}
                                    keyExtractor={(item, index) => item.id}
                                    renderItem={({ item, index }) => (
                                        <Card
                                            style={[
                                                styles.promotionItem,
                                                index == 0
                                                    ? { marginHorizontal: 20 }
                                                    : { marginRight: 20 }
                                            ]}
                                            image={item.img_featured}
                                            url='https://masterdiskon.co.id/assets/upload/product/img/featured/'
                                            onPress={() =>
                                                navigation.navigate("TourDetailCustom",{product:item})
                                            }
                                            loading={this.state.loading_domestic}
                                        >
                                        {!this.state.loading_domestic && (
                                            <View>
                                                <Text subhead whiteColor>
                                                    {item.judul_trip}
                                                </Text>
                                                <Text title2 whiteColor semibold>
                                                    {item.duration} hari
                                                </Text>
                                                <View
                                                    style={styles.contentCartPromotion}
                                                >
                                                    <Button
                                                        style={styles.btnPromotion}
                                                        onPress={() => {
                                                            navigation.navigate(
                                                                "PreviewBooking"
                                                            );
                                                        }}
                                                    >
                                                        <Text body2 semibold whiteColor>
                                                        IDR {priceSplitter(item.harga)}
                                                        </Text>
                                                    </Button>
                                                </View>
                                            </View>
                                            )}
                                        </Card>
                                    )}
                                />
                            </View>
                        
                            

                            <View>
                                <View style={styles.contentHiking}>
                                    <Text title3 semibold>
                                    National Musium Collection
                                    </Text>
                                    <Text body2>
                                    Sekumpulan tempat menginap pilihan yang telah terverifikasi kualitas dan desainnya
                                    </Text>
                                </View>
                            
                            
                                <FlatList
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    data={this.state.listdata_musium}
                                    keyExtractor={(item, index) => item.id}
                                    renderItem={({ item, index }) => (
                                        <Card
                                            style={[
                                                styles.tourItem,
                                                index == 0
                                                    ? { marginHorizontal: 20 }
                                                    : { marginRight: 20 }
                                            ]}
                                            image={'https:'+item[2]}
                                            url={''}
                                            onPress={() =>
                                                navigation.navigate("Musium",{url:item[3]})
                                            }
                                            loading={this.state.loading_featured}
                                        >
                                        {!this.state.loading_featured && (
                                            <View>
                                                <Text headline whiteColor semibold>
                                                {item[0]}
                                                </Text>
                                                <Text subhead whiteColor>
                                                {item[1]}
                                                </Text>
                                            </View>
                                        )}
                                        </Card>
                                    )}
                                />
                                    
                            </View>
                            

                            <View>
                                <View style={styles.contentHiking}>
                                    <Text title3 semibold>
                                        Art & Culture Stories
                                    </Text>
                                    <Text body2>
                                    Jelajahi Sekarang
                                    </Text>
                                </View>
                                
                                <FlatList
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    data={this.state.listdata_culture}
                                    keyExtractor={(item, index) => item.id}
                                    renderItem={({ item, index }) => (
                                        <Card
                                            style={[
                                                styles.promotionItem,
                                                index == 0
                                                    ? { marginHorizontal: 20 }
                                                    : { marginRight: 20 }
                                            ]}
                                            image={'https:'+item[2]}
                                            url=''
                                            onPress={() =>
                                                navigation.navigate("Musium",{url:item[3]})
                                            }
                                            loading={this.state.loading_popular}
                                        >
                                        {!this.state.loading_popular && (
                                            <View>
                                            <Text subhead whiteColor>
                                                {item[1]}
                                            </Text>
                                            {/* <Text title2 whiteColor semibold>
                                                {item.duration} hari
                                            </Text> */}
                                            <View
                                                style={styles.contentCartPromotion}
                                            >
                                                
                                                    <Text body2 semibold whiteColor>
                                                    {item[0]}
                                                    </Text>
                                              
                                            </View>
                                        </View>
                                            )}
                                        </Card>
                                    )}
                                />
                            </View>
                                
                            
                            <View
                                style={{
                                    padding: 20,
                                    height: wp("75%"),
                                }}
                            >
                                <Text title3 semibold>
                                    Wonders of Indonesia
                                </Text>
                                <Text body2>
                                A gallery for Indonesia's best cultures. From ancient monuments to contemporary art, find inspiration from the country's rich cultures.
                                </Text>

                                {this.state.loading_promo ?
                                
                                <Placeholder
                                        Animation={Fade}
                                        style={{marginTop: 5}}
                                        >
                                            <PlaceholderLine width={100} height={200} style={{marginTop: 2,marginBottom:0,borderRadius: 5}} />
                                            <PlaceholderLine width={100} style={{marginTop: 2,marginBottom:0}} />
                                        </Placeholder>

                                :      
                                <Swiper
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
                                                    <Image style={styles.image}  source={{uri : this.state.DataMasterDiskon.site+'assets/upload/promo/'+item.img_featured}} />
                                                    </View>

                                            )
                                        })
                                    }

                                </Swiper>
                                }

                            </View>



                        
                           

                            <View style={styles.contentHiking}>
                                    <Text title3 semibold>
                                        BLOG
                                    </Text>
                                    <Text body2 grayColor>
                                    Dapatkan Informasi Seputar Dunia Wisata
                                    </Text>
                            </View>
                            <View>
                                <FlatList
                                    contentContainerStyle={{
                                        paddingRight: 20
                                    }}
                                    horizontal={true}
                                    data={this.state.listdata_blog_new}
                                    showsHorizontalScrollIndicator={false}
                                    keyExtractor={(item, index) => item.id}
                                    renderItem={({ item, index }) => (
                                        <EventCard
                                            image={item.featured_image}
                                            url={this.state.DataMasterDiskon.site+'assets/upload/blog/post/'}
                                            title={item.title}
                                            time={item.name_blog_category}
                                            location={item.location}
                                            onPress={() =>
                                                navigation.navigate("PostDetail",{item:item})
                                            }
                                            style={{ marginLeft: 20 }}
                                            loading={this.state.loading_blog}
                                        />
                                    )}
                                />
                            </View>


                            
                            <View
                                style={{
                                    padding: 20,
                                    height: wp("75%"),
                                }}
                            >
                                <Text title3 semibold>
                                    Wonders of Indonesia
                                </Text>
                                <Text body2>
                                A gallery for Indonesia's best cultures. From ancient monuments to contemporary art, find inspiration from the country's rich cultures.
                                </Text>

                                {this.state.loading_promo ?
                                
                                <Placeholder
                                        Animation={Fade}
                                        style={{marginTop: 5}}
                                        >
                                            <PlaceholderLine width={100} height={200} style={{marginTop: 2,marginBottom:0,borderRadius: 5}} />
                                            <PlaceholderLine width={100} style={{marginTop: 2,marginBottom:0}} />
                                        </Placeholder>

                                :      
                                <Swiper
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
                                                    <Image style={styles.image}  source={{uri : this.state.DataMasterDiskon.site+'assets/upload/promo/'+item.img_featured}} />
                                                    </View>

                                            )
                                        })
                                    }

                                </Swiper>
                                }
                            </View>
                                

                         
                            <View style={{padding: 20}}>
                                    <Text title3 semibold>
                                        BLOG
                                    </Text>
                                    <Text body2 grayColor>
                                    Dapatkan Informasi Seputar Dunia Wisata
                                    </Text>
                            </View>
                            <View style={{paddingLeft: 20,paddingRight: 20}}>
                                <FlatList
                                    columnWrapperStyle={{ marginBottom: 10 }}
                                    numColumns={2}
                                    data={this.state.listdata_blog_new}
                                    keyExtractor={(item, index) => item.id}
                                    renderItem={({ item, index }) => (
                                        <HotelItem
                                            grid
                                            image={item.featured_image}
                                            name={item.title}
                                            location={item.name_blog_category}
                                            price={item.price}
                                            available={item.available}
                                            rate={item.rate}
                                            rateStatus={item.rateStatus}
                                            numReviews={item.numReviews}
                                            services={item.services}
                                            style={
                                                index % 2 ? { marginLeft: 15 } : {}
                                            }
                                            onPress={() =>
                                                navigation.navigate("PostDetail",{item:item})
                                            }
                                            url={this.state.DataMasterDiskon.site+'assets/upload/blog/post/'}
                                            loading={this.state.loading_blog}
                                            type={'blog'}
                                        />
                                    )}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View>
        );
    }
}
