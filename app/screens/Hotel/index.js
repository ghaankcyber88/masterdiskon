import React, { Component } from "react";
import { FlatList, RefreshControl, View, Animated,ScrollView } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, HotelItem, FilterSort,Text } from "@components";
import styles from "./styles";
import * as Utils from "@utils";
import {PostData} from '../../services/PostData';
import {PostDataNew} from '../../services/PostDataNew';
import {AsyncStorage} from 'react-native';
import CardCustom from "../../components/CardCustom";
import CardCustomProduct from "../../components/CardCustomProduct";

// Load sample data
import {DataLoading,DataConfig} from "@data";
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
  } from "rn-placeholder";

export default class Hotel extends Component {
    constructor(props) {
        super(props);
        
        if(this.props.navigation.state.params && this.props.navigation.state.params.country){
            country=this.props.navigation.state.params.country;
            id_country=country.id_country;
        }else{
            id_country='';
        }

        this.state = {
            
            id_country:id_country,
            listdata_product_hotel_package:[
                {
                    "id": "1",
                    "product_name": "STAY SAFE FUN",
                    "img_featured": "product/hotelpackage/2020/mercure_bali-min.jpeg",
                    "img_featured_url": "https://masterdiskon.com/assets/upload/product/hotelpackage/2020/mercure_bali-min.jpeg",
                    "product_detail": {
                        "id_hotelpackage": "1",
                        "hotelpackage_code": "MDP20070001",
                        "package_name": "STAY SAFE FUN",
                        "slug_hotelpackage": "stay-safe-fun",
                        "stars": "3",
                        "id_country": "191",
                        "id_province": "11",
                        "id_city": "1102",
                        "address": "dfghdfgh",
                        "area": null,
                        "term": "Voucher berlaku 2 orang / room<br />\r\nDilarang membawa binatang perliharaan<br />\r\nVoucher berlaku untuk periode menginap hingga 31 Agustus 2021<br />\r\nVoucher berlaku setiap hari, termasuk hari libur nasional dan long weekend<br />\r\nTidak ada high/peak season surchage<br />\r\nVoucher hanya berlaku untuk domestik / Pemegang KITAS<br />\r\nVoucher tidak dapat dibatalkan atau diuangkan<br />\r\nKonfirmasi hanya dapat dilakukan appabila masih ada ketersediaan kamar<br />\r\n&nbsp;",
                        "start_date": "2020-07-01",
                        "end_date": "2020-08-31",
                        "start_price": "750000",
                        "img_package": "product/hotelpackage/2020/mercure_bali-min.jpeg",
                        "detail_category": "voucher_hotel",
                        "status": "1",
                        "id_pengajuan": "55",
                        "approval_status": "waiting",
                        "date_added": "2020-06-30 00:00:00"
                    },
                    "product_option": []
                },
                {
                    "id": "44",
                    "product_name": "dfghdfgh",
                    "img_featured": "product/hotelpackage/2020/Berpikir_Matematis1.jpg",
                    "img_featured_url": "https://masterdiskon.com/assets/upload/product/hotelpackage/2020/Berpikir_Matematis1.jpg",
                    "product_detail": {
                        "id_hotelpackage": "44",
                        "hotelpackage_code": "MDP20080001",
                        "package_name": "dfghdfgh",
                        "slug_hotelpackage": "dfghdfgh",
                        "stars": "4",
                        "id_country": "191",
                        "id_province": "16",
                        "id_city": "1605",
                        "address": "dfsg sdfg dsfg ",
                        "area": null,
                        "term": "Voucher berlaku 2 orang / room<br />\r\nDilarang membawa binatang perliharaan<br />\r\nVoucher berlaku untuk periode menginap hingga 31 Agustus 2021<br />\r\nVoucher berlaku setiap hari, termasuk hari libur nasional dan long weekend<br />\r\nTidak ada high/peak season surchage<br />\r\nVoucher hanya berlaku untuk domestik / Pemegang KITAS<br />\r\nVoucher tidak dapat dibatalkan atau diuangkan<br />\r\nKonfirmasi hanya dapat dilakukan appabila masih ada ketersediaan kamar<br />\r\n&nbsp;",
                        "start_date": "2020-08-06",
                        "end_date": "2020-08-20",
                        "start_price": "4500",
                        "img_package": "product/hotelpackage/2020/Berpikir_Matematis1.jpg",
                        "detail_category": "voucher_hotel",
                        "status": "1",
                        "id_pengajuan": "55",
                        "approval_status": "waiting",
                        "date_added": "2020-08-06 11:47:05"
                    },
                    "product_option": []
                },
                {
                    "id": "45",
                    "product_name": "dfghdfgh",
                    "img_featured": "product/hotelpackage/2020/WhatsApp_Image_2020-07-03_at_10_40_19.jpeg",
                    "img_featured_url": "https://masterdiskon.com/assets/upload/product/hotelpackage/2020/WhatsApp_Image_2020-07-03_at_10_40_19.jpeg",
                    "product_detail": {
                        "id_hotelpackage": "45",
                        "hotelpackage_code": "MDP20080001",
                        "package_name": "dfghdfgh",
                        "slug_hotelpackage": "dfghdfgh1",
                        "stars": "4",
                        "id_country": "191",
                        "id_province": "13",
                        "id_city": "1304",
                        "address": "dfsg sdfg dsfg ",
                        "area": null,
                        "term": "Voucher berlaku 2 orang / room<br />\r\nDilarang membawa binatang perliharaan<br />\r\nVoucher berlaku untuk periode menginap hingga 31 Agustus 2021<br />\r\nVoucher berlaku setiap hari, termasuk hari libur nasional dan long weekend<br />\r\nTidak ada high/peak season surchage<br />\r\nVoucher hanya berlaku untuk domestik / Pemegang KITAS<br />\r\nVoucher tidak dapat dibatalkan atau diuangkan<br />\r\nKonfirmasi hanya dapat dilakukan appabila masih ada ketersediaan kamar<br />\r\n&nbsp;",
                        "start_date": "2020-08-06",
                        "end_date": "2020-08-20",
                        "start_price": "4500",
                        "img_package": "product/hotelpackage/2020/WhatsApp_Image_2020-07-03_at_10_40_19.jpeg",
                        "detail_category": "voucher_hotel",
                        "status": "1",
                        "id_pengajuan": "55",
                        "approval_status": null,
                        "date_added": "2020-08-06 11:48:57"
                    },
                    "product_option": [
                        {
                            "id_hotelpackage_detail": "191",
                            "id_hotelpackage": "45",
                            "detail_name": "dgfh dfgh dfg",
                            "normal_price": "6000",
                            "price": "5000",
                            "buy_price": "4000",
                            "minimum_book": null,
                            "discount": "10",
                            "duration": "1",
                            "guest_per_room": "2",
                            "bed_type": "Double or Twin Bed",
                            "bath_type": "Shower",
                            "room_size": "67",
                            "include": "dfghdfgh dfgh dfgh",
                            "available": "1"
                        }
                    ]
                },
                {
                    "id": "46",
                    "product_name": "xdsgfhsdfgsdfg",
                    "img_featured": "product/hotelpackage/2020/IMG_20200708_124250.jpg",
                    "img_featured_url": "https://masterdiskon.com/assets/upload/product/hotelpackage/2020/IMG_20200708_124250.jpg",
                    "product_detail": {
                        "id_hotelpackage": "46",
                        "hotelpackage_code": "MDP20080001",
                        "package_name": "xdsgfhsdfgsdfg",
                        "slug_hotelpackage": "xdsgfhsdfgsdfg",
                        "stars": "4",
                        "id_country": "191",
                        "id_province": "14",
                        "id_city": "1404",
                        "address": "dfg hdfg hdfg hdfg h",
                        "area": null,
                        "term": "Voucher berlaku 2 orang / room<br />\r\nDilarang membawa binatang perliharaan<br />\r\nVoucher berlaku untuk periode menginap hingga 31 Agustus 2021<br />\r\nVoucher berlaku setiap hari, termasuk hari libur nasional dan long weekend<br />\r\nTidak ada high/peak season surchage<br />\r\nVoucher hanya berlaku untuk domestik / Pemegang KITAS<br />\r\nVoucher tidak dapat dibatalkan atau diuangkan<br />\r\nKonfirmasi hanya dapat dilakukan appabila masih ada ketersediaan kamar<br />\r\n&nbsp;",
                        "start_date": "2020-08-06",
                        "end_date": "2020-08-20",
                        "start_price": "454543",
                        "img_package": "product/hotelpackage/2020/IMG_20200708_124250.jpg",
                        "detail_category": "voucher_hotel",
                        "status": "1",
                        "id_pengajuan": "55",
                        "approval_status": null,
                        "date_added": "2020-08-06 11:58:04"
                    },
                    "product_option": [
                        {
                            "id_hotelpackage_detail": "196",
                            "id_hotelpackage": "46",
                            "detail_name": "dfghdfghd",
                            "normal_price": "454345",
                            "price": "354345",
                            "buy_price": "30000",
                            "minimum_book": null,
                            "discount": "10",
                            "duration": "1",
                            "guest_per_room": "3",
                            "bed_type": "Double or Twin Bed",
                            "bath_type": "Shower",
                            "room_size": "354345",
                            "include": "dfghdf ghdfg",
                            "available": "1"
                        },
                        {
                            "id_hotelpackage_detail": "197",
                            "id_hotelpackage": "46",
                            "detail_name": "sdfgsdfgsdfg",
                            "normal_price": "54434",
                            "price": "34434",
                            "buy_price": "30000",
                            "minimum_book": null,
                            "discount": "10",
                            "duration": "34",
                            "guest_per_room": "2",
                            "bed_type": "Double or Twin Bed",
                            "bath_type": "Shower",
                            "room_size": "34434",
                            "include": "<ul>\r\n\t<li>sdfg sdfg sdf</li>\r\n\t<li>sdfg sdfg sdf</li>\r\n\t<li>sdfg sdfg sdf</li>\r\n</ul>\r\n",
                            "available": "1"
                        }
                    ]
                },
                {
                    "id": "47",
                    "product_name": "3D/2N - One Bedroom Pool Villa - Tanadewa Villas and Spa Nusa Dua",
                    "img_featured": "product/hotelpackage/2020/Y997968005.jpg",
                    "img_featured_url": "https://masterdiskon.com/assets/upload/product/hotelpackage/2020/Y997968005.jpg",
                    "product_detail": {
                        "id_hotelpackage": "47",
                        "hotelpackage_code": "MDP20080001",
                        "package_name": "3D/2N - One Bedroom Pool Villa - Tanadewa Villas and Spa Nusa Dua",
                        "slug_hotelpackage": "3d-2n---one-bedroom-pool-villa---tanadewa-villas-and-spa-nusa-dua",
                        "stars": "5",
                        "id_country": "191",
                        "id_province": "51",
                        "id_city": "5103",
                        "address": "Jl. Taman Giri No.11, Benoa, Kec. Kuta Sel., Kabupaten Badung, Bali 80363",
                        "area": "Nusa Dua",
                        "term": "Voucher berlaku 2 orang / room<br />\r\nDilarang membawa binatang perliharaan<br />\r\nVoucher berlaku untuk periode menginap hingga 31 Agustus 2021<br />\r\nVoucher berlaku setiap hari, termasuk hari libur nasional dan long weekend<br />\r\nTidak ada high/peak season surchage<br />\r\nVoucher hanya berlaku untuk domestik / Pemegang KITAS<br />\r\nVoucher tidak dapat dibatalkan atau diuangkan<br />\r\nKonfirmasi hanya dapat dilakukan appabila masih ada ketersediaan kamar<br />\r\n&nbsp;",
                        "start_date": "2020-08-15",
                        "end_date": "2020-08-29",
                        "start_price": "1999000",
                        "img_package": "product/hotelpackage/2020/Y997968005.jpg",
                        "detail_category": "voucher_hotel",
                        "status": "1",
                        "id_pengajuan": "55",
                        "approval_status": "waiting",
                        "date_added": "2020-08-06 15:32:27"
                    },
                    "product_option": [
                        {
                            "id_hotelpackage_detail": "283",
                            "id_hotelpackage": "47",
                            "detail_name": "3D/2N - One Bedroom Pool Villa - Tanadewa Villas and Spa Nusa Dua",
                            "normal_price": "2399000",
                            "price": "1999000",
                            "buy_price": "1900000",
                            "minimum_book": "1",
                            "discount": "10",
                            "duration": "1",
                            "guest_per_room": "2",
                            "bed_type": "Double or Twin Bed",
                            "bath_type": "Shower",
                            "room_size": "40",
                            "include": "<ul>\r\n\t<li>2 Nights Stay at One Bedroom Pool Villa</li>\r\n\t<li>Daily Breakfast for 2</li>\r\n\t<li>Welcoaaa</li>\r\n</ul>\r\n",
                            "available": "1"
                        }
                    ]
                },
                {
                    "id": "58",
                    "product_name": "Nama Package",
                    "img_featured": "product/hotelpackage/2020/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg",
                    "img_featured_url": "https://masterdiskon.com/assets/upload/product/hotelpackage/2020/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg",
                    "product_detail": {
                        "id_hotelpackage": "58",
                        "hotelpackage_code": "MDP20080001",
                        "package_name": "Nama Package",
                        "slug_hotelpackage": "nama-package",
                        "stars": "5",
                        "id_country": "191",
                        "id_province": "32",
                        "id_city": "3276",
                        "address": "Jl. Jalan No. 47 Tugu Cimanggis",
                        "area": "Area",
                        "term": "Term",
                        "start_date": "2020-08-10",
                        "end_date": "2020-09-28",
                        "start_price": "100000",
                        "img_package": "product/hotelpackage/2020/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg",
                        "detail_category": "voucher_hotel",
                        "status": "1",
                        "id_pengajuan": "56",
                        "approval_status": "waiting",
                        "date_added": "2020-08-10 10:31:22"
                    },
                    "product_option": [
                        {
                            "id_hotelpackage_detail": "289",
                            "id_hotelpackage": "58",
                            "detail_name": "Package Name 1",
                            "normal_price": "120000",
                            "price": "100000",
                            "buy_price": "80000",
                            "minimum_book": "1",
                            "discount": "10",
                            "duration": "1",
                            "guest_per_room": "2",
                            "bed_type": "Double or Twin Bed",
                            "bath_type": "Shower",
                            "room_size": "40",
                            "include": "Include 1",
                            "available": "1"
                        },
                        {
                            "id_hotelpackage_detail": "290",
                            "id_hotelpackage": "58",
                            "detail_name": "Package Name 2",
                            "normal_price": "220000",
                            "price": "200000",
                            "buy_price": "160000",
                            "minimum_book": "2",
                            "discount": "10",
                            "duration": "1",
                            "guest_per_room": "2",
                            "bed_type": "Twin Bed",
                            "bath_type": "Bathtub",
                            "room_size": "40",
                            "include": "Include 2",
                            "available": "1"
                        },
                        {
                            "id_hotelpackage_detail": "291",
                            "id_hotelpackage": "58",
                            "detail_name": "Package Name 3",
                            "normal_price": "330000",
                            "price": "300000",
                            "buy_price": "240000",
                            "minimum_book": "3",
                            "discount": "10",
                            "duration": "1",
                            "guest_per_room": "2",
                            "bed_type": "Double Bed",
                            "bath_type": "Jacuzzi",
                            "room_size": "40",
                            "include": "Include 3",
                            "available": "1"
                        }
                    ]
                }
            ],
            config:DataConfig,


        };
        this.getConfig();

    }
    
    getConfig(){
        AsyncStorage.getItem('config', (error, result) => {
            if (result) {    
                let config = JSON.parse(result);
                //console.log('getConfig',config);
                this.setState({config:config});
            }
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
                    console.log("getProductHotelPackage",JSON.stringify(result));
                    this.setState({loading_product_hotel_package: false });
                    this.setState({listdata_product_hotel_package: result});
                 },
                 (error) => {
                     this.setState({ error });
                 }
            ); 
        });
    }


    componentDidMount() {
        setTimeout(() => {
            this.getProductHotelPackage();
        }, 500);
    }


    renderContent() {
        const { config} = this.state;
        const { navigation } = this.props;
    
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

      
                return (
                            <View>
                                <View style={{marginTop: 20}}>
                                    <FlatList
                                        contentContainerStyle={{
                                            paddingRight: 20
                                        }}
                                        //untuk horizontal false
                                        // columnWrapperStyle={{ marginBottom: 10 }}
                                        // numColumns={2}
                                        
                                        //untuk horizontal false
                                        //horizontal={true}
                                        
                                        data={this.state.listdata_product_hotel_package}
                                        showsHorizontalScrollIndicator={false}
                                        keyExtractor={(item, index) => item.id}
                                        renderItem={({ item, index }) => (
                                        
                                            <CardCustom
                                                item={item}
                                                img={item.img_featured_url}
                                                titleIcon={{text:item.product_detail.address,icon:"home"}}
                                                title={item.product_name}
                                                subtitle={item.product_duration}
                                                subtitle2={'Rp '+priceSplitter(item.product_detail.start_price)}
                                                subtitleLeftRight={{enable:false,textLeft:"",textRight:""}}
                                                style={
                                                    //style untuk horizontal true
                                                    // { borderRadius: 5,width: Utils.scaleWithPixel(200),marginLeft:20}
                                                    
                                                    //style untuk horizontal false
                                                    //index % 2 ? { marginLeft: 20 } : {marginLeft:20}
                                                    {marginLeft:20,marginBottom:20}
                                                }
                                               

                                                onPress={() =>
                                                    navigation.navigate("HotelDetail",{product:item})
                                                }
                                                url={config.baseUrl+'assets/upload/product/voucher/2020/'}
                                                loading={this.state.loading_product_hotel_package}
                                                property={{inFrame:true,innerText:false}}
                                                type={''}
                                            />
                                        
                                        )}
                                    />
                                </View>
                            </View>
                );
            
    }


    render() {
        const { navigation } = this.props;
        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <Header
                    title="Hotels"
                    subTitle="24 Dec 2018, 2 Nights, 1 Room"
                    renderLeft={() => {
                        return (
                            <Icon
                                name="arrow-left"
                                size={20}
                                color={BaseColor.blackColor}
                            />
                        );
                    }}
                    // renderRight={() => {
                    //     return (
                    //         <Icon
                    //             name="search"
                    //             size={20}
                    //             color={BaseColor.primaryColor}
                    //         />
                    //     );
                    // }}
                    onPressLeft={() => {
                        navigation.goBack();
                    }}
                    onPressRight={() => {
                        navigation.navigate("SearchHistory");
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
                {this.renderContent()}
                </ScrollView>
            </SafeAreaView>
        );
    }
}
