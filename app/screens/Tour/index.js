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

export default class Tour extends Component {
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
            listdata_product_trip:DataTrip,
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
                    console.log("getProductTripTour",JSON.stringify(result));
                    this.setState({loading_product_trip: false });
                    this.setState({listdata_product_trip: result});
                 },
                 (error) => {
                     this.setState({ error });
                 }
            ); 
        });
    }


    componentDidMount() {
        setTimeout(() => {
            this.getProductTrip();
        }, 500);
    }


    renderContent() {
        const { config} = this.state;
        const { navigation } = this.props;
    
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

      
                return (
                                <View style={{marginTop: 20}}>

                                {   
                                    this.state.listdata_product_trip.length != 0 ?
                                    <View>
                                        <FlatList
                                                contentContainerStyle={{
                                                    paddingRight: 20
                                                }}
                                                horizontal={false}
                                                data={this.state.listdata_product_trip}
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
                                                            navigation.navigate("TourDetailCustom",{product:item})
                                                        }
                                                        loading={this.state.loading_product_trip}
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
                    title="Trip"
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
