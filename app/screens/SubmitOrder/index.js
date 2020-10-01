import React, { Component } from "react";
import { View, ScrollView,Animated,RefreshControl,TouchableOpacity,StyleSheet,ActivityIndicator,FlatList, Alert} from "react-native";
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
import {PostData} from '../../services/PostData';
import CountDown from 'react-native-countdown-component';
import DropdownAlert from 'react-native-dropdownalert';


const styles = StyleSheet.create({
    contain: {
        // paddingLeft: 20,
        // paddingRight: 20,
        padding:20,
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


export default class SubmitOrder extends Component {
    constructor(props) {
        super(props);
        const scrollAnim = new Animated.Value(0);
        const offsetAnim = new Animated.Value(0);
        var selectDataDeparture=this.props.navigation.state.params.selectDataDeparture;
        var selectDataReturn=this.props.navigation.state.params.selectDataReturn;
        var param=this.props.navigation.state.params.param;
        var paramOther=this.props.navigation.state.params.paramOther;
        var departurePost=this.props.navigation.state.params.departurePost;
        var returnPost=this.props.navigation.state.params.returnPost;
        var dataPrice=this.props.navigation.state.params.dataPrice;
        var paramGetCart=this.props.navigation.state.params.paramGetCart;
        var listdata_participant=this.props.navigation.state.params.listdata_participant;
        var listdata_customer=this.props.navigation.state.params.listdata_customer;
        var amount = parseInt(param.Adults)+parseInt(param.Children)+parseInt(param.Infants);
        // alert(JSON.stringify(dataPrice));
        

        

        this.state = {
            selectDataDeparture:selectDataDeparture,
            selectDataReturn:selectDataReturn,
            param:param,
            paramOther:paramOther,
            dataPrice:dataPrice,
            paramGetCart:paramGetCart,
            departurePost:departurePost,
            returnPost:returnPost,
            jumlahPenumpang:amount,
            listdata_participant:listdata_participant,
            listdata_customer:listdata_customer,


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
            dataCart:[],
            payment_method:null,
            id_order:'',
            total_price:0
            

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

    
    getPayment(){
        AsyncStorage.getItem('bankPayment', (error, result) => {
            if (result) {
            let resultParsed = JSON.parse(result)
            this.setState({listdata_payment:resultParsed.data});
            }
        });

    }
    
    

    
    

    
    componentDidMount(){
        //untuk get cart


        this.getPayment();
        var param=this.state.param;
        var customer=this.state.listdata_customer;
        var guest=this.state.listdata_participant;
        var departurePost=this.state.departurePost;
        var returnPost=this.state.returnPost;
        var selectDataDeparture=this.state.selectDataDeparture;
        var selectDataReturn=this.state.selectDataReturn;

        var dataPrice=this.state.dataPrice;
        var paramGetCart=this.state.paramGetCart;
        var departurePrice=dataPrice.data.detail_price[0];
        var returnPrice=dataPrice.data.detail_price[1];
        var paramOther=this.state.paramOther;
    

        this.setState({ loading_spinner: true }, () => {
            AsyncStorage.getItem('tokenAgi', (error, result) => {
                if (result) {    
                    var access_token=result;
    
                    //get cart
                    var myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");
                    myHeaders.append("Authorization", "Bearer "+access_token);
    
    
                    var raw = JSON.stringify(paramGetCart);
                    var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                    };
    
                    fetch("https://dev-api.megaelectra.co.id/flight/Cart", requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        this.setState({ loading_spinner: false });
                        // var cart_id=result.data.id;
                        //console.log("---------------cart  ------------");
                        //console.log(JSON.stringify(result));
                        
                        var dataCart=result.data;
                        this.setState({dataCart:dataCart});

                        setTimeout(() => {
                            this.postOrder();
                        }, 500);
                        
                   
    
                    })
                    .catch(error => console.log('error', error));
    
                        }
                    });
        });
    }

    postOrder() {
        var dataCart=this.state.dataCart;
        alert(JSON.stringify(dataCart));
        // var param=this.state.listdata_participant;
        // var contact=this.state.listdata_customer[0];
        // const data={  
        //   'type':this.state.paramOther.type,
        //   'id_trip':'',
        //   'order_code':'',
        //   'payment_code':'0',
        //   'promo_code':'',
        //   'id_user':'',
        //   'user_token':'',
        //   'id_user':'',
        //   'contact_name':contact.fullname,
        //   'contact_phone':contact.phone,
        //   'contact_email':contact.email,
        //   'pax':this.state.jumlahPenumpang,
        //   'adult':this.state.param.Adults,
        //   'children':this.state.param.Children,
        //   'baby':this.state.param.Infants,
        //   'payment_method':'',
        //   'payment_expired':'',
        //   'subtotal':dataCart.nett_price,
        //   'start_date':this.state.param.DepartureDate,
        //   'ret_date':this.state.param.ReturnDate,
        //   'a':this.state.param.Origin,
        //   'd':this.state.param.Destination,
        //   'insurance':dataCart.insurance_total,
        //   'tax':'',
        //   'pp':'0',
        //   'title':contact.title,
        //   'total_price':dataCart.total_price,
        //   'param':param
        //   }


        //     PostData('submitbook_order',data)
        //         .then((result) => {
        //         //console.log(JSON.stringify(result));
        //         id_order=result.id_order;
        //         total_price=result.total_price;
        //         this.setState({id_order:id_order});
        //         this.setState({total_price:total_price});
        //         },
        //         (error) => {
        //             this.setState({ error });
        //         }
        //     );
  
      
    }


    getVa(){
        var id_order=this.props.navigation.state.params.id_order;
        var pay=this.props.navigation.state.params.pay;
        var payment_method=this.props.navigation.state.params.payment_method;

        PostData('api/fu_get_virtualaccount_app?id_order='+id_order+'&pay='+pay+'&payment_method='+payment_method)
        .then((result) => {
            //this.setState({listdata});
        var id_order_payment=result.key;
        //alert(result.key);
        //console.log("---------------ID ORDER PAYMENT------------");
        //console.log(id_order_payment);
        this.confirm_wa(id_order_payment);
        
        // this.props.navigation.navigate('PageConfirmationVA',
        //         {id_order_payment: id_order_payment}
        //     );
        },
        (error) => {
            this.setState({ error });
        }
        );

    }

    confirm_wa(id_order_payment){
        //alert(id_order_payment);
        PostData('api/confirmation_va_app/'+id_order_payment)
            .then((result) => {
                //console.log("---------------Virtual Account------------");
            //console.log(JSON.stringify(result));
            this.setState({dataVa:result.va});
         

                            var expirydate=result.va.expired;
                            this.duration(expirydate);
                            
            },
            (error) => {
                this.setState({ error });
            }
        );

    }

  

    onSubmit() {
        const { navigation } = this.props;
        param={
            id_order:this.state.id_order,
            pay:this.state.total_price,
            payment_method:this.state.payment_method,
        
            param:this.state.param,
            paramOther:this.state.paramOther,
            selectDataDeparture:this.state.selectDataDeparture,
            selectDataReturn:this.state.selectDataReturn,
            departurePost:this.state.departurePost,
            returnPost:this.state.returnPost,
            dataPrice:this.state.dataPrice,
            paramGetCart:this.state.paramGetCart,
            dataCart:this.state.dataPrice,
            listdata_customer:this.state.listdata_customer,
            listdata_participant:this.state.listdata_participant
        };
        // navigation.navigate("FlightResult",param);
        //alert(this.state.payment_method);
        //alert(JSON.stringify(param));
        
        if(this.state.payment_method==null){
        this.dropdown.alertWithType('error', 'Error', 'Belum Memilih Payment');
        }else{
            navigation.navigate("VirtualAccount",param);
        }
    }
  
    

    render() {
        return (
            <View></View>
        );
    }
}
