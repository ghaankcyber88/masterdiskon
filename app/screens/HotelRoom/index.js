import React, { Component } from "react";
import { View, ScrollView, FlatList, TouchableOpacity,StyleSheet } from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import {
    Image,
    Header,
    SafeAreaView,
    Icon,
    Text,
    StarRating,
    ProfileDetail,
    ProfilePerformance,
    Tag,
    PostListItem,
    Button,
    RoomType
} from "@components";
// import styles from "./styles";
import * as Utils from "@utils";

// Load sample data
import { UserData } from "@data";
import { HelpBlockData,DataMasterDiskon } from "@data";
const styles = StyleSheet.create({
    contentGallery: { width: "100%", height: Utils.scaleWithPixel(205) },
    galleryLineTop: {
        flexDirection: "row",
        flex: 1,
        paddingBottom: 5
    },
    galleryLineBottom: {
        flexDirection: "row",
        flex: 1
    },
    line: {
        height: 1,
        backgroundColor: BaseColor.textSecondaryColor,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        marginBottom: 10
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
    blockView: {
        paddingVertical: 10,
        borderBottomColor: BaseColor.textSecondaryColor,
        borderBottomWidth: 1,
        paddingHorizontal:20
    },
});

export default class HotelRoom extends Component {
    constructor(props) {
        super(props);
        var hotelData=this.props.navigation.state.params.hotelData;
        // var hotelDetail=hotelData.hotel;
        // var hotelRoom=hotelData.room;
        // var hotelReview=hotelData.review;
        // var hotelReviewCustomer=hotelData.review_teks;
        
        
        var param=this.props.navigation.state.params.param;
        //var paramOther=this.props.navigation.state.params.paramOther;
        var product=this.props.navigation.state.params.product;
        
        
        // Temp data define
        this.state = {
            userData: UserData[0],
            hotelData:hotelData,
            DataMasterDiskon:DataMasterDiskon[0],
            
            param:param,
            //paramOther:paramOther,
            product:product
            
            
        };
    }
    render() {
        const { navigation } = this.props;
        const { userData, service } = this.state;
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <Header
                    title="Hotel Room"
                    renderLeft={() => {
                        return (
                            <Icon
                                name="arrow-left"
                                size={20}
                                color={BaseColor.primaryColor}
                            />
                        );
                    }}
                    onPressLeft={() => {
                        navigation.goBack();
                    }}
                />
                <ScrollView>
               
                    {/* <View
                        style={[
                            BaseStyle.bodyPaddingDefault,
                            {
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginBottom: 10,
                                marginTop: 20
                            }
                        ]}
                    >
                    </View> */}
                                <View style={styles.blockView}>
                               
                                <FlatList
                                    data={this.state.hotelData.room}
                                    keyExtractor={(item, index) => item.id_hotel_room}
                                    renderItem={({ item }) => (
                                        <RoomType
                                            image={'dd32d9b188d86d6d8dc40d1ff9a0ebf6.jpg'}
                                            url={this.state.DataMasterDiskon.site+'assets/upload/product/hotel/img/featured/'}
                                            name={item.room_type}
                                            price={'Rp '+priceSplitter(item.price)}
                                            available={item.available}
                                            services={item.services}
                                            amenities={item.amenities}
                                            style={{ marginTop: 10 }}
                                            onPress={() => {
                                                alert('xxx');
                                                // this.props.navigation.navigate(
                                                //     "HotelInformation"
                                                // );
                                            }}
                                            buttonBookNow={true}
                                            onPressBookNow={() => {
                                                // var xx={
                                                //     param:this.state.param,
                                                //     paramOther:this.state.paramOther,
                                                //     product:this.state.product,
                                                //     productPart:item
                                                // }
                                                //console.log('HotelRoomParam',JSON.stringify(this.state.param));
                                                
                                                this.props.navigation.navigate(
                                                    "Summary",
                                                        {
                                                            param:this.state.param,
                                                            product:this.state.product,
                                                            productPart:item
                                                        }
                                                );
                                            }}
                                        />
                                    )}
                                />
                            </View>
                    
                </ScrollView>
             
            </SafeAreaView>
        );
    }
}
