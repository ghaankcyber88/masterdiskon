import React, { Component } from "react";
import { View,TouchableOpacity } from "react-native";
import { Images, BaseColor } from "@config";
import { Text, Image, StarRating,Icon } from "@components";
import PropTypes from "prop-types";
import styles from "./styles";
import * as Utils from "@utils";
import moment from 'moment';
import CountDown from 'react-native-countdown-component';
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade
} from "rn-placeholder";



export default class CommentItem extends Component {
    duration(expirydate)
    {
        
        var date = moment()
        var diffr = moment.duration(moment(expirydate).diff(moment(date)));
        var hours = parseInt(diffr.asHours());
        var minutes = parseInt(diffr.minutes());
        var seconds = parseInt(diffr.seconds());
        var d = hours * 60 * 60 + minutes * 60 + seconds;
        return d;
    
    }

    isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }



    render() {
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

        const { style, image, name, rate, date, title, comment, item,onPress,status,loading } = this.props;

        
        var fieldsArray = [];
        item.detail.map(item => {
            fieldsArray.push(
                <View>
                    <View style={styles.line} />
                    <View style={styles.validContent}>
                        <View style={{ flex: 1 }}>
                            <Text caption3>
                            {item.product_name} ({item.type})
                            </Text>
                        </View>
                    </View>
                </View>
                
            );

        });
    
    var statusPay='';
    var countDown=<View></View>;
    var current_payment=item.current_payment;
    var order_expired=item.order_expired;
    var order_status=item.order_status;
    //var expiredTime=this.duration(current_payment.expired);
    var expiredTime=this.duration(order_expired);
    var stat='';
 
    // if(item.status_payment=="lunas"){
    //         // statusPay= <View style={styles.validContentRed}>
    //         //     <Text caption3 semibold>
    //         //         Status
    //         //     </Text>
    //         //     <Text grayColor>
    //         //         Lunas
    //         //     </Text>
    //         // </View>

    //         statusPay='Lunas';
    // }else{
    //     if(expiredTime > 0){
    //         // statusPay= <View style={styles.validContentGreen}>
    //         // <Text caption3 semibold>
    //         //     Status
    //         // </Text>
    //         // <Text caption3 semibold>
    //         //     Belum Lunas
    //         // </Text>
    //         // </View>
    //         statusPay='Belum Lunas';
    //     }else{
    //         // statusPay= <View style={styles.validContentGreen}>
    //         // <Text caption3 semibold>
    //         //     Status 
    //         // </Text>
    //         // <Text caption3 semibold>
    //         //     Cancel
    //         // </Text>
    //         // </View>
    //         statusPay='Cancel';
    //     }


    //     if(expiredTime > 0){
    //     countDown=<View style={styles.validContent}>
    //             {/* <Text caption3 semibold>
    //                 Tagihan Pembayaran
    //             </Text> */}
    //             <CountDown
    //                 size={12}
    //                 until={expiredTime}
    //                 // onFinish={() => alert('Finished')}
    //                 style={{float:'left'}}
    //                 digitStyle={{backgroundColor: '#FFF', borderWidth: 2, borderColor: BaseColor.primaryColor}}
    //                 digitTxtStyle={{color: BaseColor.primaryColor}}
    //                 timeLabelStyle={{color: BaseColor.primaryColor, fontWeight: 'bold'}}
    //                 separatorStyle={{color: BaseColor.primaryColor}}
    //                 timeToShow={['H', 'M', 'S']}
    //                 timeLabels={{m: null, s: null}}
    //                 showSeparator
    //             />
    //     </View>
    //     }
    // }



            statusPay=item.order_status_name;
        
            if(expiredTime > 0){
                countDown=<View style={styles.validContent}>
                        {/* <Text caption3 semibold>
                            Tagihan Pembayaran
                        </Text> */}
                        <CountDown
                            size={12}
                            until={expiredTime}
                            // onFinish={() => alert('Finished')}
                            style={{float:'left'}}
                            digitStyle={{backgroundColor: '#FFF', borderWidth: 2, borderColor: BaseColor.primaryColor}}
                            digitTxtStyle={{color: BaseColor.primaryColor}}
                            timeLabelStyle={{color: BaseColor.primaryColor, fontWeight: 'bold'}}
                            separatorStyle={{color: BaseColor.primaryColor}}
                            timeToShow={['H', 'M', 'S']}
                            timeLabels={{m: null, s: null}}
                            showSeparator
                        />
                </View>
            }

    var icon='';
    if(item.product=='Flight'){
        icon=<Icon
                                    name={'plane'}
                                    color={BaseColor.primaryColor}
                                    size={18}
                                    solid
                                    style={{ marginLeft: -10,marginTop:20,position:'absolute',width:40,height:40,
                                    backgroundColor: "#fff",
                                    borderRadius: 18,
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 2,
                                    },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 3.84,
                                    elevation: 5,
                                    padding:10,
                                         }}
                                />
    }else if(item.product=='Trip'){
        icon=<Icon
                                    name={'suitcase'}
                                    color={BaseColor.primaryColor}
                                    size={18}
                                    solid
                                    style={{ marginLeft: -10,marginTop:25,position:'absolute',width:40,height:40,
                                    backgroundColor: "#fff",
                                    borderRadius: 18,
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 2,
                                    },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 3.84,
                                    elevation: 5,
                                    padding:10,
                                         }}
                                />
    }else if(item.product=='Hotel'){
        icon=<Icon
                                    name={'hotel'}
                                    color={BaseColor.primaryColor}
                                    size={18}
                                    solid
                                    style={{ marginLeft: -10,marginTop:20,position:'absolute',width:40,height:40,
                                    backgroundColor: "#fff",
                                    borderRadius: 18,
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 2,
                                    },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 3.84,
                                    elevation: 5,
                                    padding:10,
                                         }}
                                />

    }


    var title_product='';
    if(item.product=='Flight'){
        title_product=<Text headline semibold style={{fontSize:12}}>
               {item.detail[0].order_flight_detail[0].airline_name} - {item.product_name} 
            </Text>
    }else if(item.product=='Trip'){
        title_product=<Text headline semibold style={{fontSize:12}}>
                {item.product_name} 
            </Text>
    }else if(item.product=='Hotel'){
        title_product=<Text headline semibold style={{fontSize:12}}>
                {item.product_name} 
            </Text>
    
    }

    var content='';
    if(loading==true){
    content=<View style={styles.contain}>
                                <Icon
                                    name={'spinner'}
                                    color={BaseColor.primaryColor}
                                    size={18}
                                    solid
                                    style={{ marginLeft: -10,marginTop:10,position:'absolute',width:40,height:40,
                                    backgroundColor: "#fff",
                                    borderRadius: 18,
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 2,
                                    },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 3.84,
                                    elevation: 5,
                                    padding:10,
                                         }}
                                />
                    <View style={styles.content}>
                        <View style={styles.left}>
                            <PlaceholderLine width={50} />
                            <PlaceholderLine width={100} />
                        </View>
                        <View style={styles.right}>
                            <PlaceholderLine width={40} />
                            <PlaceholderLine width={50} />
                        </View>
                    </View>
                </View>
    }else{
        content=<View style={styles.contain}>
                                {icon}
                    <View style={styles.content}>
                        <View style={styles.left}>
                            {title_product}
                            <Text
                                note
                                numberOfLines={2}
                                grayColor
                                style={{
                                    paddingTop: 5
                                }}
                            >
                                No.Tagihan {item.order_code}
                            </Text>
                            <Text
                                note
                                numberOfLines={2}
                                grayColor
                                style={{
                                    paddingTop: 5
                                }}
                            >
                                IDR {priceSplitter(item.total_price)}
                            </Text>
                        </View>
                        <View style={styles.right}>
                            <Text caption2 grayColor style={{fontSize:14,fontWeight: "bold"}}>
                               Status
                            </Text>
                            <Text caption2 grayColor>
                               {statusPay}
                            </Text>
                            {countDown}
                        </View>
                    </View>
                </View>

    }   
    
        var page='';
        
        if(item.order_status=='complete'){
            page='FlightTicket';
        }else{
            page='Pembayaran';
        }

        return (
            // <TouchableOpacity
            // style={[styles.contain, style]}
            // activeOpacity={0.9}
            // onPress={onPress}
            // >

             <TouchableOpacity
                style={[styles.item, style]}
                //onPress={onPress}
                onPress={() => {
                    var param={
                        id_order:item.id_order,
                        dataPayment:{}
                    }
                    this.props.navigation.navigate(page,{param:param});
                }}
                activeOpacity={0.9}
            >
                {content}
            </TouchableOpacity>
        );
    }
}

CommentItem.propTypes = {
    item: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    image: PropTypes.node.isRequired,
    name: PropTypes.string,
    rate: PropTypes.number,
    date: PropTypes.string,
    title: PropTypes.string,
    comment: PropTypes.string,
    onPress: PropTypes.func,
    status: PropTypes.func,
    loading: PropTypes.bool
};

CommentItem.defaultProps = {
    item: {},
    style: {},
    image: Images.profile2,
    name: "",
    rate: 0,
    date: "",
    title: "",
    comment: "",
    onPress: () => {},
    status: "",
    loading: true,
};
