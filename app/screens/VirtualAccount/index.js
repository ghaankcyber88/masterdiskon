import React, { Component } from "react";
import { View, ScrollView,Animated,RefreshControl,TouchableOpacity,StyleSheet,ActivityIndicator,FlatList} from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import {
    Header,
    SafeAreaView,
    Icon,
    FlightPlan,
    Text,
    FlightItem,
    Button
    
} from "@components";
// import styles from "./styles";
import ButtonOrder from "../../components/ButtonOrder";
import FormOptionEdit from "../../components/FormOptionEdit";
import {AsyncStorage} from 'react-native';
import { PackageData } from "@data";
//import {PostData} from '../../services/PostData';
import {PostData} from '../../services/PostDataBayar';
import CountDown from 'react-native-countdown-component';
import moment from 'moment';

const styles = StyleSheet.create({
    contain: {
        padding: 20,
        width: "100%"
    },
    line: {
        width: "100%",
        height: 1,
        borderWidth: 0.5,
        borderColor: BaseColor.dividerColor,
        borderStyle: "dashed",
        marginTop: 15
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
    contentTitle: {
        alignItems: "flex-start",
        width: "100%",
        height: 32,
        justifyContent: "center"
    },
  
    textInput: {
        height: 56,
        backgroundColor: BaseColor.fieldColor,
        borderRadius: 5,
        padding: 10,
        width: "100%"
    },
    profileItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomColor: BaseColor.textSecondaryColor,
        borderBottomWidth: 1,
        paddingBottom: 20,
        paddingTop: 20
    },
    textInput: {
        height: 46,
        backgroundColor: BaseColor.fieldColor,
        borderRadius: 5,
        padding: 10,
        width: "100%"
    },
    contain: {
        alignItems: "center",
        padding: 20,
        width: "100%"
    },
    item: {
        paddingTop: 15,
        paddingBottom: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: BaseColor.fieldColor
    },
    imageBrand: {
        width: 32,
        height: 32,
        marginRight: 10
    }
  });


export default class VirtualAccount extends Component {
    constructor(props) {
        super(props);
        const scrollAnim = new Animated.Value(0);
        const offsetAnim = new Animated.Value(0);
        // var selectDataDeparture=this.props.navigation.state.params.selectDataDeparture;
        // var selectDataReturn=this.props.navigation.state.params.selectDataReturn;
        // var param=this.props.navigation.state.params.param;
        // var paramOther=this.props.navigation.state.params.paramOther;
        // var departurePost=this.props.navigation.state.params.departurePost;
        // var returnPost=this.props.navigation.state.params.returnPost;
        // var dataPrice=this.props.navigation.state.params.dataPrice;
        // var dataCart=this.props.navigation.state.params.dataCart;
        // var paramGetCart=this.props.navigation.state.params.paramGetCart;
        // var listdata_participant=this.props.navigation.state.params.listdata_participant;
        // var listdata_customer=this.props.navigation.state.params.listdata_customer;
        // var amount = parseInt(param.Adults)+parseInt(param.Children)+parseInt(param.Infants);
        // alert(JSON.stringify(dataPrice));
        // expirydate=this.props.navigation.state.params.expirydate;
        countDown=this.props.navigation.state.params.countDown;
        id_order=this.props.navigation.state.params.id_order;
        //alert(JSON.stringify(dataOrderSubmit));

        this.state = {
            // selectDataDeparture:selectDataDeparture,
            // selectDataReturn:selectDataReturn,
            // param:param,
            // paramOther:paramOther,
            // dataPrice:dataPrice,
            // dataCart:dataCart,
            // paramGetCart:paramGetCart,
            // departurePost:departurePost,
            // returnPost:returnPost,
            // jumlahPenumpang:amount,
            // listdata_participant:listdata_participant,
            // listdata_customer:listdata_customer,
            // expirydate:expirydate,
            countDown:countDown,
            id_order:id_order,


            refreshing: false,
            scrollAnim,
            offsetAnim,
            clampedScroll: Animated.diffClamp(
                Animated.add(
                    scrollAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                        extrapolateLeft: "clamp"
                    }),
                    offsetAnim
                ),
                0,
                40
            ),

            packageItem: PackageData[0],
            packageItemDetail: PackageData[1],
            loading: false,
            totalDuration: 0,

        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    duration(expirydate)
    {
        
        var date = moment()
        var diffr = moment.duration(moment(expirydate).diff(moment(date)));
        var hours = parseInt(diffr.asHours());
        var minutes = parseInt(diffr.minutes());
        var seconds = parseInt(diffr.seconds());
        var d = hours * 60 * 60 + minutes * 60 + seconds;
        this.setState({ totalDuration: d });
    
    }

    
    // confirm_wa(id_order_payment){
    //     //alert(id_order_payment);
    //     PostData('confirmation_va_app/'+id_order_payment)
    //         .then((result) => {
    //             console.log("---------------Virtual Account------------");
    //         console.log(JSON.stringify(result));
    //         this.setState({dataVa:result.va});
         

    //                         var expirydate=result.va.expired;
    //                         this.duration(expirydate);
                            
    //         },
    //         (error) => {
    //             this.setState({ error });
    //         }
    //     );

    // }


    componentDidMount(){
        //this.duration(this.state.expirydate);
        // var id_order=this.props.navigation.state.params.id_order;
        // var pay=this.props.navigation.state.params.pay;
        // var payment_method=this.props.navigation.state.params.payment_method;

        // PostData('fu_get_virtualaccount_app?id_order='+id_order+'&pay='+pay+'&payment_method='+payment_method)
        // .then((result) => {
        //     //this.setState({listdata});
        // var id_order_payment=result.key;
        // //alert(result.key);
        // console.log("---------------ID ORDER PAYMENT------------");
        // console.log(id_order_payment);
        // this.confirm_wa(id_order_payment);
        
        // // this.props.navigation.navigate('PageConfirmationVA',
        // //         {id_order_payment: id_order_payment}
        // //     );
        // },
        // (error) => {
        //     this.setState({ error });
        // }
        // );

    }
    

    

    onSubmit() {
        

        
    }
    
    onChange(select) {

        this.setState({
            listdata_payment: this.state.listdata_payment.map(item => {
                if (item.bankCode == select.bankCode) {
                    return {
                        ...item,
                        checked: true
                    };
                } else {
                    return {
                        ...item,
                        checked: false
                    };
                }
               
            })
        });
    }
    

    onRemoveCart(){
        AsyncStorage.removeItem('dataCartArray');
        alert('Cart Dihapus');
    }
    

    // convertDate(date){
    //     var d = new Date(date);
    //     var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    //     var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    //     return days[d.getDay()]+", "+d.getDate()+" "+months[d.getMonth()]+" "+d.getFullYear();
    // }
    render() {
        const { navigation } = this.props;
        let { loading,loading_spinner } = this.state;
        // const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
        // var totalDeparture=parseInt(selectDataDeparture.price['insurance_total'])+parseInt(selectDataDeparture.price['total_price']);
        // var totalReturn=parseInt(selectDataReturn.price['insurance_total'])+parseInt(selectDataReturn.price['total_price']);

        // var totalAll=dataPrice.data.total_price;
        // var jumlahPenumpang=parseInt(param.Adults)+parseInt(param.Children)+parseInt(param.Infants);
        const { flights, refreshing, clampedScroll } = this.state;
        
        
        // var returnBoard='';
        // if(param.IsReturn==true){
        //     returnBoard=<View>
        //                 <View style={styles.line} />
        //                 <Text title3 style={{ paddingVertical: 10 }}>
        //                 {this.convertDate(selectDataReturn.departure_date)}
        //                 </Text>
        //                 <FlightItem
        //                     fromHour={selectDataReturn.flight_schedule[0]['Return_time']}
        //                     toHour={selectDataReturn.flight_schedule[0]['arrival_time']}
        //                     fromFlight={selectDataReturn.flight_schedule[0]['from']}
        //                     toFlight={selectDataReturn.flight_schedule[0]['to']}
        //                     totalHour={selectDataReturn.flight_schedule[0]['duration']}
        //                     brand={selectDataReturn.airline_name}
        //                     image={selectDataReturn.flight_schedule[0]['airline_logo']}
        //                     type={selectDataReturn.flight_schedule[0]['cabin']}
        //                     price={selectDataReturn.currency+ " "+priceSplitter(totalReturn)}
        //                     route={selectDataReturn.transit}
        //                     onPress={() => navigation.navigate("FlightTicket")}
        //                 /></View>
        // }else if(param.IsReturn==false){
        //     returnBoard=<View></View>
        // }
        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <Header
                    title="Booking Summary"
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
                   
                    
                {
                loading_spinner ? 
                    <ActivityIndicator
                        size="large"
                        color={BaseColor.primaryColor}
                    /> 
                :
                    <View>
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
                                size={12}
                                until={this.state.countDown}
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

                            {/* <Text headline semibold style={{ marginTop: 20 }}>
                                Credit Card Details
                            </Text> */}
                            
                        </View>
                        {/* <View>
                            <ButtonOrder
                            packageName={'IDR '+priceSplitter(totalAll)}
                            price={packageItem.price}
                            type={'Total Price for '+jumlahPenumpang+' Person(s)'}
                            description={'Include insurance'}
                            onPressIcon={() => {
                                navigation.navigate("PricingTable");
                            }}
                            style={{ marginBottom: 10 }}
                            />
                        </View> */}
                        <View style={{ padding: 20,borderRadius: 8,width: "100%"}}>

                            <Button
                            loading={loading}
                            full
                            onPress={() => {
                                this.setState({ loading: true }, () => {
                                    setTimeout(() => {
                                        //this.onSubmit();
                                        //alert(this.state.dataOrderSubmit.id_order);
                                        navigation.navigate("Booking",{id_order:this.state.id_order});
                                        this.setState({ loading: false });
                                    }, 500);
                                });
                            }}
                            >
                            Go To Detail Pesanan
                            </Button>

                            
                            {/* <Button
                            loading={loading}
                            full
                            onPress={() => {
                                this.setState({ loading: true }, () => {
                                    setTimeout(() => {
                                        this.onRemoveCart();
                                        //navigation.navigate("FlightResult");
                                        this.setState({ loading: false });
                                    }, 500);
                                });
                            }}
                            >
                            Remove Cart
                            </Button> */}
                        </View>
                    </View>
                    
                    
                }
                </ScrollView>
                {/* <View style={styles.contentButtonBottom}>
                    <View>
                        <Text caption1 semibold>
                            Total Price for {jumlahPenumpang} Person(s)
                        </Text>
                        <Text title3 primaryColor semibold>
                            {selectDataDeparture.currency+ " "+priceSplitter(totalAll)}
                        </Text>
                        <Text caption1 semibold style={{ marginTop: 5 }}>
                            All Charged Included
                        </Text>
                    </View>
                    <Button
                        style={{ height: 46 }}
                        onPress={() => navigation.navigate("PreviewBooking")}
                        //onPress={() => this.onSubmit()}
                    >
                        Book Now
                    </Button>
                </View> */}
            </SafeAreaView>
        );
    }
}
