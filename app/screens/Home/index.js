import React, { Component } from "react";
import {
    View,
    ScrollView,
    Animated,
    TouchableOpacity,
    FlatList,
    StatusBar
} from "react-native";
import {
    Text,
    SafeAreaView,
    Header,
    Image
} from "@components";
import { BaseStyle, BaseColor, Images } from "@config";
import * as Utils from "@utils";
import styles from "./styles";
import {AsyncStorage} from 'react-native';

import {PostDataNew} from '../../services/PostDataNew';
import CardCustom from "../../components/CardCustom";
import CardCustomTitle from "../../components/CardCustomTitle";
import NotYetLogin from "../../components/NotYetLogin";


import {DataLoading,DataConfig,DataTrip,DataHotelPackage,DataIcon} from "@data";

export default class Home extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            login:false,
            icons: DataIcon,
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
        this.getSession();

    }
    
    //memanggil config
    getConfig(){
            AsyncStorage.getItem('config', (error, result) => {
                if (result) {    
                    let config = JSON.parse(result);
                    this.setState({config:config});
                }
            });
    }

    //memanggil session
    getSession(){    
        AsyncStorage.getItem('userSession', (error, result) => {
            if (result) {    
                let userSession = JSON.parse(result);
                var id_user=userSession.id_user;
                this.setState({id_user:id_user});
                this.setState({userSession:userSession});
                this.setState({login:true});
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
                    //console.log('getProductFlash',JSON.stringify(result));
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
                    config.log('blog',JSON.stringify(result));
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
        //membuat bar transparant
        StatusBar.setBackgroundColor("rgba(0,0,0,0)");
        StatusBar.setTranslucent(true);
        
        
        setTimeout(() => {
            this.getMusium();
            this.getculture();
            this.getProductTripCountry();
            this.getProductTrip();
            this.getProductHotelPackage();
            this.getProductFlash();
            //this.getBlog();
        }, 500);

     }

     
    //fungsi untuk menampilkan icon
    renderIconService() {
        const { navigation } = this.props;
        const { icons} = this.state;
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
                            <Text overline>
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
        const { heightHeader,login } = this.state;
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
        
        const heightImageBanner = Utils.scaleWithPixel(300, 1);
        const marginTopBanner = heightImageBanner - heightHeader;

        
   
        return (
            login ? 
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
                        source={{ uri: 'https://masterdiskon.com/assets/front/img/homebanner/shutterstock_1298526841-min.jpg' }}
                        style={{ width: "100%", height: "100%" }}
                        resizeMode="cover"
                    />
                </Animated.View>

                
                <SafeAreaView
                    style={[BaseStyle.safeAreaView,{marginBottom:10}]}
                    forceInset={{ top: "always" }}
                >
                
                
                <Header
                        title=""
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
                        style={{marginBottom:0}}
                    >
                        <View style={{marginTop:100}}>
                                <View style={{marginHorizontal:20}}>
                                    <Text header bold style={{color:BaseColor.whiteColor}}>
                                    VIVRE ET AIMER
                                    </Text>
                                    
                                    <Text headline style={{color:BaseColor.whiteColor}}>
                                    Temukan dan pesanlah destinasi paket tur dan travel dengan harga yang kompetitif
                                    </Text>
                                </View>
                                
                            <View style={{ 
                                marginTop:20,
                                backgroundColor:'#fff',
                                width:'90%',
                                alignSelf: 'center',
                                borderRadius: 18,
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                elevation: 5,
                                padding:10
                                }}>
                                <View>
                                    <Text body2 bold style={{alignSelf: 'center'}}>
                                    Hey Kamu Mau Kemana ?
                                    </Text>
                                </View>
                                <View>
                                    {this.renderIconService()}
                                </View>
                            </View>
                            
                            {   
                            this.state.listdata_product_trip.length != 0 ?
                            <View>
                                <CardCustomTitle style={{marginLeft:20}} title={'Trip'} desc={''} />
                                <FlatList
                                        contentContainerStyle={{
                                            paddingRight: 20
                                        }}
                                        horizontal={true}
                                        data={this.state.listdata_product_trip}
                                        showsHorizontalScrollIndicator={false}
                                        keyExtractor={(item, index) => item.id}
                                        renderItem={({ item, index }) => (
                                        
                                            <CardCustom
                                                propImage={{height:200,url:item.img_featured_url}}
                                                propInframe={{top:'top',bottom:'bottom'}}
                                                propTitle={{text:item.product_name}}
                                                propDesc={{text:'Temukan penerbangan nyaman dengan penawaran terbaik'}}
                                                propPrice={{price:'2000',startFrom:true}}
                                                propStar={{rating:10,enabled:true}}
                                                propLeftRight={{left:'ss',right:'dsf'}}
                                                onPress={() =>
                                                    navigation.navigate("TourDetailCustom",{product:item})
                                                }
                                                loading={this.state.loading_product_trip}
                                                propOther={{inFrame:false,horizontal:true,width:Utils.scaleWithPixel(200)}}
                                            />
                                        
                                        )}
                                    />
                            </View>
                            :
                            <View></View>
                            }
                                    

                            {   
                            this.state.listdata_product_hotel_package.length != 0 ?
                            <View>
                                <CardCustomTitle style={{marginLeft:20}} title={'Hotel'} desc={''} />
                                <FlatList
                                        contentContainerStyle={{
                                            paddingRight: 20
                                        }}
                                        horizontal={true}
                                        data={this.state.listdata_product_hotel_package}
                                        showsHorizontalScrollIndicator={false}
                                        keyExtractor={(item, index) => item.id}
                                        renderItem={({ item, index }) => (
                                        
                                            <CardCustom
                                                propImage={{height:250,url:item.img_featured_url}}
                                                propInframe={{top:'top',bottom:'bottom'}}
                                                propTitle={{text:item.product_name}}
                                                propDesc={{text:'Temukan penerbangan nyaman dengan penawaran terbaik'}}
                                                propPrice={{price:'2000',startFrom:true}}
                                                propStar={{rating:10,enabled:true}}
                                                propLeftRight={{left:'ss',right:'dsf'}}
                                                onPress={() =>
                                                    navigation.navigate("HotelDetail",{product:item})
                                                }
                                                loading={this.state.loading_product_hotel_package}
                                                propOther={{inFrame:true,horizontal:true,width:Utils.scaleWithPixel(200)}}
                                            />
                                        
                                        )}
                                    />
                            </View>
                            :
                            <View></View>
                            }
                            
                            
                            
                            {/* <View>
                                    <View style={{marginTop: 20,marginLeft: 20,marginBottom: 10}}>
                                    <Text title1 bold>
                                        Hotel Deals
                                        </Text>
                                        <Text body1 style={{color:BaseColor.greyColor}}>
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
                            </View> */}
                            
                            
                            
                            
                            
                            
                            
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
                            
                            
                            

                            {/* <View>
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
                            </View> */}
                            
                            
                            
                            {/* <View>
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
                            </View> */}
                            
                            
                            
                            
                            
                            
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
            :
            <NotYetLogin redirect={'Home'} navigation={navigation} />
        

        );
    }
}
