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
            listdata_product_hotel_package:DataLoading,
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
        var path=config.url_md.product.product_hotel_package;
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
                                                img={config.baseUrl+'assets/upload/product/trip/2020/featured/'+item.img_featured}
                                                titleIcon={{text:item.product_place,icon:"home"}}
                                                title={item.product_name}
                                                subtitle={item.product_duration}
                                                subtitle2={'Rp '+priceSplitter(item.product_price)}
                                                subtitleLeftRight={{enable:false,textLeft:"",textRight:""}}
                                                style={
                                                    //style untuk horizontal true
                                                    // { borderRadius: 5,width: Utils.scaleWithPixel(200),marginLeft:20}
                                                    
                                                    //style untuk horizontal false
                                                    //index % 2 ? { marginLeft: 20 } : {marginLeft:20}
                                                    {marginLeft:20,marginBottom:20}
                                                }
                                                onPress={() => {
                                                    alert('Dalam pengembangan');
                                                    // navigation.navigate(item.route,{type:item.type});
                                                }}
                                                url={config.baseUrl+'assets/upload/product/voucher/2020/'}
                                                loading={this.state.loading_product_trip}
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
                                color={BaseColor.whiteColor}
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
