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
import CardCustomTitle from "../../components/CardCustomTitle";

// Load sample data
import {DataLoading,DataConfig,DataHotelPackage,DataTrip} from "@data";
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
  } from "rn-placeholder";

export default class Hotel extends Component {
    constructor(props) {
        super(props);
        
        if(this.props.navigation.state.params && this.props.navigation.state.params.id_country){
            id_country=this.props.navigation.state.params.id_country;
        }else{
            id_country='';
        }

        var id_city='';
        if(this.props.navigation.state.params && this.props.navigation.state.params.id_city){
            id_city=this.props.navigation.state.params.id_city;
        }else{
            id_city='';
        }

        var detail_category='';
        if(this.props.navigation.state.params && this.props.navigation.state.params.detail_category){
            detail_category=this.props.navigation.state.params.detail_category;
        }else{
            detail_category='';
        }

        

        

        this.state = {
            id_country:id_country,
            listdata_product_hotel_package:DataHotelPackage,
            config:DataConfig,
        };
        this.getConfig();

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
                    //console.log("getProductHotelPackage",JSON.stringify(result));
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
                                <View style={{marginTop: 20}}>

                                {   
                                    this.state.listdata_product_hotel_package.length != 0 ?
                                    <View>
                                        <FlatList
                                                contentContainerStyle={{
                                                    paddingRight: 20
                                                }}
                                                horizontal={false}
                                                data={this.state.listdata_product_hotel_package}
                                                showsHorizontalScrollIndicator={false}
                                                keyExtractor={(item, index) => item.id}
                                                renderItem={({ item, index }) => (
                                                
                                                    <CardCustom
                                                        propImage={{height:200,url:item.img_featured_url}}
                                                        propInframe={{top:item.product_detail.area,bottom:item.product_detail.detail_category}}
                                                        propTitle={{text:item.product_name}}
                                                        propDesc={{text:item.product_detail.address}}
                                                        propPrice={{price:'Rp '+priceSplitter(item.product_detail.price),startFrom:true}}
                                                        propStar={{rating:item.product_detail.stars,enabled:true}}
                                                        propLeftRight={{left:'',right:''}}
                                                        onPress={() =>
                                                            navigation.navigate("HotelDetail",{product:item})
                                                        }
                                                        loading={this.state.loading_product_hotel_package}
                                                        propOther={{inFrame:true,horizontal:false,width:Utils.scaleWithPixel(200)}}
                                                    />
                                                
                                                )}
                                            />
                                    </View>
                                    :
                                    <View></View>
                                    }
                                </View>
                );
            
    }


    render() {
        const { navigation } = this.props;
        return (
            <SafeAreaView
                style={[BaseStyle.safeAreaView,{backgroundColor:BaseColor.bgColor}]}
                forceInset={{ top: "always" }}
            >
                <Header
                    title="Hotel"
                    // subTitle="24 Dec 2018, 2 Nights, 1 Room"
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
