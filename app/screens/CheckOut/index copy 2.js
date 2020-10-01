import React, { Component } from "react";
import { View, TextInput, ScrollView,ActivityIndicator } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, Text, Button } from "@components";
import styles from "./styles";
import {AsyncStorage} from 'react-native';
import moment from 'moment';
import CountDown from 'react-native-countdown-component';

export default class CheckOut extends Component {
    constructor(props) {
        super(props);

        var selectDataDeparture=this.props.navigation.state.params.selectDataDeparture;
        var selectDataReturn=this.props.navigation.state.params.selectDataReturn;
        var param=this.props.navigation.state.params.param;
        var paramOther=this.props.navigation.state.params.paramOther;
        var departurePost=this.props.navigation.state.params.departurePost;
        var returnPost=this.props.navigation.state.params.returnPost;
        var dataPrice=this.props.navigation.state.params.dataPrice;
        var listdata_customer=this.props.navigation.state.params.listdata_customer;
        var listdata_participant=this.props.navigation.state.params.listdata_participant;
        var dataCart=this.props.navigation.state.params.dataCart;
        var dataPayment=this.props.navigation.state.params.dataPayment;
        var amount = parseInt(param.Adults)+parseInt(param.Children)+parseInt(param.Infants);



        // Temp data define
        this.state = {
            selectDataDeparture:selectDataDeparture,
            selectDataReturn:selectDataReturn,
            param:param,
            paramOther:paramOther,
            departurePost:departurePost,
            returnPost:returnPost,
            dataPrice:dataPrice,
            listdata_customer:listdata_customer,
            listdata_participant:listdata_participant,
            dataCart:dataCart,
            dataPayment:dataPayment,
            jumlahPenumpang:amount,
        };
    }

    convertTime(timeLimit)
    {

        
    var date = moment()
    // .utcOffset('+05:30')
    // .format('YYYY-MM-DD hh:mm:ss');
    //Getting the current date-time with required formate and UTC   
    
    var expirydate = timeLimit;//You can set your own date-time
    //Let suppose we have to show the countdown for above date-time 

    var diffr = moment.duration(moment(expirydate).diff(moment(date)));
    //difference of the expiry date-time given and current date-time

    var hours = parseInt(diffr.asHours());
    var minutes = parseInt(diffr.minutes());
    var seconds = parseInt(diffr.seconds());
    
    var d = hours * 60 * 60 + minutes * 60 + seconds;
    //converting in seconds

    return d;
    


    

    }



    componentDidMount(){
       
                            // var timeLimit="2020-02-04T16:09:52";
                            // //console.log("---------------Time Limit------------");
                            // //console.log(this.convertTime(timeLimit));
                            // var numTimeLimit=this.convertTime(timeLimit);
                            // this.setState({numTimeLimit:numTimeLimit});

        var param=this.state.param;
        var customer=this.state.listdata_customer;
        var guest=this.state.listdata_participant;
        var departurePost=this.state.departurePost;
        var returnPost=this.state.returnPost;
        var selectDataDeparture=this.state.selectDataDeparture;
        var selectDataReturn=this.state.selectDataReturn;

        var dataPrice=this.state.dataPrice;
        var departurePrice=dataPrice.data.detail_price[0];
        var returnPrice=dataPrice.data.detail_price[1];
        var paramOther=this.state.paramOther;
        var dataCart=this.state.dataCart;
        var cart_id=dataCart.id;

        var dataPayment=this.state.dataPayment;
        var paymentFlight=dataPayment.data.flight[0].data;
        var orderId=paymentFlight.orderid;
        
        var url="https://dev-api.megaelectra.co.id/crm/MyOrder/v2/"+orderId;
        //console.log("---------------url ------------");
        //console.log(url);
        

        this.setState({ loading_spinner: true }, () => {
            AsyncStorage.getItem('tokenAgi', (error, result) => {
                if (result) {    
                        
                        var access_token=result;
                        //console.log("---------------token ------------");
                        //console.log(access_token);
                        //get payment
                        var myHeaders = new Headers();
                        myHeaders.append("Content-Type", "application/json");
                        myHeaders.append("Authorization", "Bearer "+access_token);
                       
                        var requestOptions = {
                        method: 'GET',
                        headers: myHeaders,
                        // body: raw,
                        redirect: 'follow'
                        };
    
                        fetch(url, requestOptions)
                        .then(response => response.json())
                        .then(result => {
                            this.setState({ loading_spinner: false });
                            //console.log("---------------Data Order------------");
                            //console.log(JSON.stringify(result));
                            var dataOrder=result;
                            var timeLimit=dataOrder.data.timeLimitPayment;
                            //console.log("---------------Time Limit------------");
                            //console.log(this.convertTime(timeLimit));
                            var numTimeLimit=this.convertTime(timeLimit);
                            this.setState({numTimeLimit:numTimeLimit});
                        })
                        .catch(error => //console.log('error', error));
                        //get payment
                        
                }
            });
        });
    
    }
    // onCheckOut() {
    //     const { navigation } = this.props;
    //     const bookingType = navigation.getParam("bookingType");
    //     this.setState(
    //         {
    //             loading: true
    //         },
    //         () => {
    //             setTimeout(() => {
    //                 this.setState({
    //                     loading: false
    //                 });
    //                 switch (bookingType) {
    //                     case "Event":
    //                         navigation.navigate("EventTicket");
    //                         break;
    //                     case "Bus":
    //                         navigation.navigate("BusTicket");
    //                         break;
    //                     default:
    //                         navigation.navigate("BookingDetail");
    //                         break;
    //                 }
    //             }, 500);
    //         }
    //     );
    // }

    render() {
        const { navigation } = this.props;
        const { loading_spinner } =this.state;

        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <Header
                    title="Check Out"
                    renderLeft={() => {
                        return (
                            <Icon
                                name="arrow-left"
                                size={20}
                                color={BaseColor.primaryColor}
                            />
                        );
                    }}
                    renderRight={() => {
                        return (
                            <Text headline primaryColor>
                                Reset
                            </Text>
                        );
                    }}
                    onPressLeft={() => {
                        navigation.goBack();
                    }}
                    onPressRight={() => {}}
                />
                <ScrollView>
                {
                loading_spinner ? 
                    <ActivityIndicator
                        size="large"
                        color={BaseColor.primaryColor}
                    /> 
                :
                    <View
                        style={[
                            BaseStyle.bodyPaddingDefault,
                            { marginBottom: 20 }
                        ]}
                    >
                        <Text headline semibold style={{ marginTop: 20 }}>
                            Credit Card Details
                        </Text>
                        <CountDown
                            size={15}
                            until={this.state.numTimeLimit}
                            onFinish={() => alert('Finished')}
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
                </ScrollView>
                {/* <View style={{ margin: 20 }}>
                    <Button
                        loading={loading}
                        full
                        onPress={() => {
                            this.onCheckOut();
                        }}
                    >
                        Check Out
                    </Button>
                </View> */}
            </SafeAreaView>
        );
    }
}
