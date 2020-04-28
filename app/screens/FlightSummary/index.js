import React, { Component } from "react";
import { View, ScrollView,Animated,RefreshControl,TouchableOpacity, ActivityIndicator } from "react-native";
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
import styles from "./styles";
import ButtonOrder from "../../components/ButtonOrder";
import FormOptionEdit from "../../components/FormOptionEdit";
import {AsyncStorage} from 'react-native';
import { PackageData } from "@data";
import {PostData} from '../../services/PostData';
import DropdownAlert from 'react-native-dropdownalert';


export default class FlightSummary extends Component {
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
        
        
        
        var amount = parseInt(param.Adults)+parseInt(param.Children)+parseInt(param.Infants);

        var MyDate = new Date();
        var MyDateString = '';
        MyDate.setDate(MyDate.getDate());
        var tempoMonth = (MyDate.getMonth()+1);
        var tempoDate = (MyDate.getDate());
        if (tempoMonth < 10) tempoMonth = '0' + tempoMonth;
        if (tempoDate < 10) tempoDate = '0' + tempoDate;

        var tglAwal = MyDate.getFullYear()  + '-' +  tempoMonth  + '-' +  tempoDate;
        var deviceId='xxx';

        //---------------------------------------------//
            var arr_old = [];
            var x=1;
            var y=param.Adults;
            
            var obj_adult=[];
            for (a=x; a <= y; a++) {
                obj_adult[a] = 'ADT';
            }

            var obj_children=[];
            var x=parseInt(param.Adults)+1;
            var y=(parseInt(param.Adults)+parseInt(param.Children));
            for (a=x; a <= y ; a++) {
                obj_children[a] = 'CHD';
            }
          

            var obj_infant=[];
            var x=(parseInt(param.Adults)+parseInt(param.Children))+1;
            var y=parseInt(x)+parseInt(param.Infants);
            for (a=x; a < y; a++) {
                obj_infant[a] = 'INF';
            }

            var obj_Old = obj_adult.concat(obj_children,obj_infant); 

            var a=1;
            var arrOldGuest=[];
            obj_Old.map(item => {
                arrOldGuest[a]=item;
                a++;
            });

            // for (a=1; a < arrOldGuest.length ; a++) {
            //     console.log(arrOldGuest[a]);
            // }
        //---------------------------------------------//

        this.state = {
            selectDataDeparture:selectDataDeparture,
            selectDataReturn:selectDataReturn,
            param:param,
            paramOther:paramOther,
            departurePost:departurePost,
            returnPost:returnPost,
            jumlahPenumpang:amount,
            listdata_participant:[],
            listdata_customer:[],


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
            arr_old:arrOldGuest,
            loading: false,

            fullname:'',
            firstname:'',
            lastname:'',
            birthday:'',
            nationality:'Indonesia',
            passport_number:'',
            passport_country:'',
            passport_expire:'',
            phone:'',
            title:'Mr',
            titleChild:'Mstr',
            email:'',
            nationality_id:'ID',
            nationality_phone_code:'021',
            passport_country_id:'ID',
            passport_country_phone_code:'021'


        };

        this.updateParticipant = this.updateParticipant.bind(this);
        this.setTitle = this.setTitle.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    setTitle(title){
        this.setState({title:title});
      }
    

    toPayment(orderId){  

        AsyncStorage.getItem('tokenAgi', (error, result) => {
            if (result) {    
                    
                    var access_token=result;
                    console.log("---------------token ------------");
                    console.log(access_token);
                    //get payment
                    var myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");
                    myHeaders.append("Authorization", "Bearer "+access_token);

                    
                   
                    var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    // body: raw,
                    redirect: 'follow'
                    };

                    fetch("https://dev-api.megaelectra.co.id/crm/MyOrder/v2/22020200000072", requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        console.log("---------------Data Order------------");
                        var dataOrder=result;
                        console.log(JSON.stringify(dataOrder));
                    })
                    .catch(error => console.log('error', error));
            }
        });
    
    }

    // getPayment(cart_id){
    //     AsyncStorage.getItem('tokenAgi', (error, result) => {
    //         if (result) {    
                    
    //                 var access_token=result;
    //                 console.log("---------------token ------------");
    //                 console.log(access_token);
    //                 //get payment
    //                 var myHeaders = new Headers();
    //                 myHeaders.append("Content-Type", "application/json");
    //                 myHeaders.append("Authorization", "Bearer "+access_token);

                    
    //                 var raw = JSON.stringify({
    //                     "payment_name_id":"",
    //                     "payment_method_id":"",
    //                     "payment_channel_id":"",
    //                     "fee":0,"currency":"IDR",
    //                     "back_url":"http://dev.megaelectra.co.id/paymentconfirmation?token="+access_token,
    //                     "cart_id":[cart_id]});
    //                 console.log("---------------param payment ------------");
    //                 console.log(raw);
    //                 var requestOptions = {
    //                 method: 'POST',
    //                 headers: myHeaders,
    //                 body: raw,
    //                 redirect: 'follow'
    //                 };

    //                 fetch("https://dev-api.megaelectra.co.id/payment/PaymentUniversal/switcherv3", requestOptions)
    //                 .then(response => response.json())
    //                 .then(result => {
    //                     var dataPayment=result;
    //                     var paymentFlight=this.state.dataPayment.data.flight[0].data;
    //                     console.log(JSON.stringify(paymentFlight));
    //                     var orderId=paymentFlight.orderid;
    //                     console.log("---------------order id------------");
    //                     console.log(orderId);
    //                     //this.toPayment(orderId);
    //                     setTimeout(() => {
    //                         this.toPayment(orderId);
    //                     }, 500);
    //                 })
    //                 .catch(error => console.log('error', error));
    //                 //get payment
    //         }
    //     });

    // }

//     postOrder(dataCart,paramGetCart) {
//         this.setState({ loading: true }, () => {
//           var param=this.state.listdata_participant;
//           var contact=this.state.listdata_customer[0];
          

//     });
    
        
// }


    onSubmit() {
        var param=this.state.param;
        var customer=this.state.listdata_customer;
        var guest=this.state.listdata_participant;
        var departurePost=this.state.departurePost;
        var returnPost=this.state.returnPost;
        var dataPrice=this.state.dataPrice;
        var departurePrice=dataPrice.data.detail_price[0];
        var returnPrice=dataPrice.data.detail_price[1];
        console.log('--param------------');
        console.log(JSON.stringify(param));
        console.log('------------------');
        
        var departureCart={
            "international": departurePost.international,
            "combinable": departurePost.combinable,
            "match_id": departurePost.match_id,
            "supplier_id": departurePost.supplier_id,
            "airline_id": departurePost.airline_id,
            "validating_carrier": departurePost.validating_carrier,
            "from": departurePost.from,
            "to": departurePost.to,
            "adult": departurePost.adult,
            "child": departurePost.child,
            "infant": departurePost.infant,
            "currency": departurePost.currency,
            "price_type": departurePost.price_type,
            "supplier_code": departurePost.supplier_code,
            "airline_code": departurePost.airline_code,
            "reference": departurePost.reference,
            "subclasses": departurePost.subclasses,
            "airline_name": departurePost.airline_name,
            "airline_logo": departurePost.airline_logo,
            "departure_date": departurePost.departure_date,
            "departure_time": departurePost.departure_time,
            "departure_timezone": departurePost.departure_timezone,
            "gmt_departure": departurePost.gmt_departure,
            "arrival_date": departurePost.arrival_date,
            "arrival_time": departurePost.arrival_time,
            "arrival_timezone": departurePost.arrival_timezone,
            "gmt_arrival": departurePost.gmt_arrival,
            "duration": departurePost.duration,
            "transit": departurePost.transit,
            "from_name": departurePost.from_name,
            "from_city": departurePost.from_city,
            "from_country": departurePost.from_country,
            "from_country_code": departurePost.from_country_code,
            "to_name": departurePost.to_name,
            "to_city": departurePost.to_city,
            "to_country": departurePost.to_country,
            "to_country_code": departurePost.to_country_code,
            "flight_schedule":departurePost.flight_schedule,
            "price":departurePrice
        };

        if(param.IsReturn==true){
                var returnCart={
                    "international": returnPost.international,
                    "combinable": returnPost.combinable,
                    "match_id": returnPost.match_id,
                    "supplier_id": returnPost.supplier_id,
                    "airline_id": returnPost.airline_id,
                    "validating_carrier": returnPost.validating_carrier,
                    "from": returnPost.from,
                    "to": returnPost.to,
                    "adult": returnPost.adult,
                    "child": returnPost.child,
                    "infant": returnPost.infant,
                    "currency": returnPost.currency,
                    "price_type": returnPost.price_type,
                    "supplier_code": returnPost.supplier_code,
                    "airline_code": returnPost.airline_code,
                    "reference": returnPost.reference,
                    "subclasses": returnPost.subclasses,
                    "airline_name": returnPost.airline_name,
                    "airline_logo": returnPost.airline_logo,
                    "departure_date": returnPost.departure_date,
                    "departure_time": returnPost.departure_time,
                    "departure_timezone": returnPost.departure_timezone,
                    "gmt_departure": returnPost.gmt_departure,
                    "arrival_date": returnPost.arrival_date,
                    "arrival_time": returnPost.arrival_time,
                    "arrival_timezone": returnPost.arrival_timezone,
                    "gmt_arrival": returnPost.gmt_arrival,
                    "duration": returnPost.duration,
                    "transit": returnPost.transit,
                    "from_name": returnPost.from_name,
                    "from_city": returnPost.from_city,
                    "from_country": returnPost.from_country,
                    "from_country_code": returnPost.from_country_code,
                    "to_name": returnPost.to_name,
                    "to_city": returnPost.to_city,
                    "to_country": returnPost.to_country,
                    "to_country_code": returnPost.to_country_code,
                    "flight_schedule":returnPost.flight_schedule,
                    "price":returnPrice
                };
        }else{
                var returnCart=null;
        }
        
        var contact= {
            "title": customer[0].title,
            "first_name": customer[0].firstname,
            "last_name": customer[0].lastname,
            "country": customer[0].nationality_id,
            "area_phone_code": customer[0].nationality_phone_code,
            "phone_number": customer[0].phone,
            "email": customer[0].email
            };



         
        var participant = [];
        var a=1;
        guest.map(item => {
            var obj = {};
            obj['type'] = this.state.arr_old[a];
            obj['title'] = item.title;
            obj['nationality'] = item.nationality_id;
            obj['first_name'] = item.firstname;
            obj['last_name'] = item.lastname;
            obj['dob'] = item.birthday;
            obj['identity_number'] = item.passport_number;
            obj['issuing_country'] = item.passport_country_id;
            obj['expiry_date'] = item.passport_expire;
            obj['departure_baggage'] = "0";
            obj['return_baggage'] = "0";
            participant.push(obj);
            a++;
        });
       
        var paramGetCart = {
            "Origin": param.Origin,
            "Destination": param.Destination,
            "DepartureDate": param.DepartureDate,
            "ReturnDate": param.ReturnDate,
            "Adults": param.Adults,
            "Children": param.Children,
            "Infants": param.Infants,
            "CorporateCode": "",
            "contact":contact,
            "pax":participant,
            "departure":departureCart,
            "return":returnCart,
            "insurance_included":true,

        };

        console.log('--parameter cartSSSSSS--');
        console.log(JSON.stringify(paramGetCart));
        console.log('------------------');

        
        this.setState({ loading: true }, () => {
            AsyncStorage.getItem('tokenAgi', (error, result) => {
                if (result) {    
                    var access_token=result;
    
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
                        console.log("---------------cart  ------------");
                        console.log(JSON.stringify(result));
                        if(result.errors){
                            this.dropdown.alertWithType('error', 'Error', JSON.stringify(result.errors));
                            this.setState({ loading: false });
                        }else if(result.status==="error"){
                            this.dropdown.alertWithType('error', 'Error', JSON.stringify(result.message));
                            this.setState({ loading: false });
                        }else if(result.status==="success"){
                            var dataCartArray = [];
                            var dataCart = {};
                            var dataCart=result.data;
   

                                const cartToBeSaved = dataCart;
                                AsyncStorage.getItem('dataCartArray', (err, result) => {
                                 let newcart = JSON.parse(result);
                              
                                 if(!newcart){
                                 newcart=[]
                                 }
                              
                                newcart.push(cartToBeSaved);
                                    setTimeout(() => {
                                        AsyncStorage.setItem('dataCartArray', JSON.stringify(newcart));
                                        AsyncStorage.setItem('dataCartArrayReal', JSON.stringify(newcart));
                                        this.props.navigation.navigate("Cart",{dataCart:dataCart}); 
                                        this.setState({ loading: false });
                                    }, 500);
                                });  
            
                        }
                    })
                    .catch(error => console.log('error', error));
    
                        }
                    });

        });
    }
    

    updateParticipant(
        key,
        fullname,
        firstname,
        lastname,
        birthday,
        nationality,
        passport_number,
        passport_country,
        passport_expire,
        phone,
        title,
        email,
        nationality_id,
          nationality_phone_code,
          passport_country_id,
          passport_country_phone_code,
        type
        ){
    
    if(type=='guest'){
        AsyncStorage.getItem('setDataParticipant', (error, result) => {
        if (result) {
            let resultParsed = JSON.parse(result)
            const newProjects = resultParsed.map(p =>
                p.key === key
                ? { ...p, 
                    fullname: fullname, 
                    firstname: firstname,
                    lastname:lastname,
                    birthday:birthday,
                    nationality:nationality,
                    passport_number:passport_number,
                    passport_country:passport_country,
                    passport_expire:passport_expire,
                    phone:phone,
                    title:title,
                    email:email,
                    nationality_id:nationality_id,
                        nationality_phone_code:nationality_phone_code,
                                                                    
                        passport_country_id:passport_country_id,
                        passport_country_phone_code:passport_country_phone_code,
                    }
                : p
            );

            AsyncStorage.setItem('setDataParticipant',JSON.stringify(newProjects));
            this.setState({listdata_participant:newProjects});
        }
        });
    
    }else if(type=='customer'){
        AsyncStorage.getItem('setDataCustomer', (error, result) => {
            if (result) {
                let resultParsed = JSON.parse(result)
                const newProjects = resultParsed.map(p =>
                    p.key === key
                    ? { ...p, 
                        fullname: fullname, 
                        firstname: firstname,
                        lastname:lastname,
                        birthday:birthday,
                        nationality:nationality,
                        passport_number:passport_number,
                        passport_country:passport_country,
                        passport_expire:passport_expire,
                        phone:phone,
                        title:title,
                        email:email,
                        nationality_id:nationality_id,
                        nationality_phone_code:nationality_phone_code,
                                                                    
                        passport_country_id:passport_country_id,
                        passport_country_phone_code:passport_country_phone_code,
                        }
                    : p
                );
    
                AsyncStorage.setItem('setDataCustomer',JSON.stringify(newProjects));
                this.setState({listdata_customer:newProjects});
            }
            });


    }



  }

  removePrice(dataObj)
  {
      var array = {};
      for (var key in dataObj) {
          var obj = {};
          if(key!='price'){
              array[key] = dataObj[key];
          }
      }
      return array;
  }

//   onSelect() {
//     var param=this.state.param;
//     var departurePost=this.removePrice(this.state.selectDataDeparture); 
//     var returnPost=this.removePrice(this.state.selectDataReturn);   
//     var paramGetPrice = {
//         "Adults": param.Adults,
//         "Children": param.Children,
//         "Infants": param.Infants,
//         "CabinClass": param.CabinClass[0],
//         "CorporateCode": param.CorporateCode,
//         "DepartureDate": param.DepartureDate,
//         "Destination": param.Destination,
//         "Origin": param.Origin,
//         "departure":departurePost,
//         "return":returnPost
//     };


//     AsyncStorage.getItem('tokenAgi', (error, result) => {
//         if (result) {    

//                     var access_token=result;
//                     var myHeaders = new Headers();
//                     myHeaders.append("Content-Type", "application/json");
//                     myHeaders.append("Authorization", "Bearer "+access_token);

//                     var raw = JSON.stringify(paramGetPrice);

//                     var requestOptions = {
//                     method: 'POST',
//                     headers: myHeaders,
//                     body: raw,
//                     redirect: 'follow'
//                     };

//                     fetch("https://dev-api.megaelectra.co.id/flight/Price/v3", requestOptions)
//                     .then((response) => response.json())
//                     .then((result) => {
//                         console.log("---------------data price------------");
//                         console.log(JSON.stringify(result));
//                         this.setState({dataPrice:result});
//                     })
//                     .catch(error => console.log('error', error));
//         }
//     });

    

// }

    componentDidMount() {
    var param=this.state.param;
    var departurePost=this.removePrice(this.state.selectDataDeparture); 
    var returnPost=this.removePrice(this.state.selectDataReturn);   
    var paramGetPrice = {
        "Adults": param.Adults,
        "Children": param.Children,
        "Infants": param.Infants,
        "CabinClass": param.CabinClass[0],
        "CorporateCode": param.CorporateCode,
        "DepartureDate": param.DepartureDate,
        "Destination": param.Destination,
        "Origin": param.Origin,
        "departure":departurePost,
        "return":returnPost
    };
    console.log("---------------param price------------");
    console.log(JSON.stringify(paramGetPrice));
    this.setState({ loading_spinner: true }, () => {
            AsyncStorage.getItem('tokenAgi', (error, result) => {
                if (result) {    

                            var access_token=result;
                            var myHeaders = new Headers();
                            myHeaders.append("Content-Type", "application/json");
                            myHeaders.append("Authorization", "Bearer "+access_token);

                            var raw = JSON.stringify(paramGetPrice);

                            var requestOptions = {
                            method: 'POST',
                            headers: myHeaders,
                            body: raw,
                            redirect: 'follow'
                            };

                            fetch("https://dev-api.megaelectra.co.id/flight/Price/v3", requestOptions)
                            .then((response) => response.json())
                            .then((result) => {
                                this.setState({ loading_spinner: false });
                                console.log("---------------data price------------");
                                console.log(JSON.stringify(result));
                                // alert();
                                this.setState({dataPrice:result});
                                this.setState({total_price:result.data.total_price});

                              
                            })
                            .catch(error => console.log('error', error));
                }
            });
        });    
    


        var customer = [];
        for (var i=1; i<=1; i++) {
        var obj = {};
            obj['key'] = i;
            obj['label'] = "Contact";

            obj['fullname'] = this.state.fullname;
            obj['firstname'] = this.state.firstname;
            obj['lastname'] = this.state.lastname;
            obj['birthday'] = this.state.birthday;
            obj['nationality'] = this.state.nationality;
            obj['passport_number'] = this.state.passport_number;
            obj['passport_country'] = this.state.passport_country;
            obj['passport_expire'] = this.state.passport_expire;
            obj['phone'] = this.state.phone;
            obj['title'] = this.state.title;
            obj['email'] = this.state.email;

            obj['nationality_id'] = this.state.nationality_id;
            obj['nationality_phone_code'] = this.state.nationality_phone_code;

            obj['passport_country_id'] = this.state.passport_country_id;
            obj['passport_country_phone_code'] = this.state.passport_country_phone_code;

            obj['old'] = 'Adult';
            customer.push(obj)
        }
        AsyncStorage.setItem('setDataCustomer',JSON.stringify(customer));
        this.setState({listdata_customer:customer});

        var participant = [];
        var title='';
        for (var i=1; i<=this.state.jumlahPenumpang; i++) {
        if(this.state.arr_old[i]=='ADT'){
            old='Adult';
            title=this.state.title;
        }else if(this.state.arr_old[i]=='CHD'){
            old='Children';
            title=this.state.titleChild;
        }else if(this.state.arr_old[i]=='INF'){
            old='Infant';
            title=this.state.titleChild;
        }

        


        
        var obj = {};
            obj['key'] = i;
            obj['label'] = "Pax "+i+" / "+old;

            obj['fullname'] = this.state.fullname;
            obj['firstname'] = this.state.firstname;
            obj['lastname'] = this.state.lastname;
            obj['birthday'] = this.state.birthday;
            obj['nationality'] = this.state.nationality;
            obj['passport_number'] = this.state.passport_number;
            obj['passport_country'] = this.state.passport_country;
            obj['passport_expire'] = this.state.passport_expire;
            obj['phone'] = this.state.phone;
            obj['title'] = title;
            obj['email'] = this.state.email;

            obj['nationality_id'] = this.state.nationality_id;
            obj['nationality_phone_code'] = this.state.nationality_phone_code;

            obj['passport_country_id'] = this.state.passport_country_id;
            obj['passport_country_phone_code'] = this.state.passport_country_phone_code;

            obj['old'] = old;

        participant.push(obj)
        }
        AsyncStorage.setItem('setDataParticipant',JSON.stringify(participant));
        this.setState({listdata_participant:participant});

    }    

    convertDate(date){
        var d = new Date(date);
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        return days[d.getDay()]+", "+d.getDate()+" "+months[d.getMonth()]+" "+d.getFullYear();
    }
    render() {
        const { navigation } = this.props;
        let { paramOther,selectDataDeparture,selectDataReturn,param,dataPrice, packageItem, packageItemDetail,loading, loading_spinner } = this.state;
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
        var jumlahPenumpang=parseInt(param.Adults)+parseInt(param.Children)+parseInt(param.Infants);
        const { flights, refreshing, clampedScroll } = this.state;
        
        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >   
                {
                            loading_spinner ? 
                            <ActivityIndicator
                                    size="large"
                                    color={BaseColor.primaryColor}
                                    style={{position: 'absolute',
                                    left: 0,
                                    right: 0,
                                    top: 0,
                                    bottom: 0,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                    }}
                            /> 
                            :
                <View>
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
                
                                    
                    <View style={styles.contain}>
                        
                        <FlightPlan
                            round={this.state.param.IsReturn}
                            fromCode={this.state.param.Origin}
                            toCode={this.state.param.Destination}
                            from={this.state.paramOther.bandaraAsalLabel}
                            to={this.state.paramOther.bandaraTujuanLabel}
                        />
                        
                          
                      

                        <View style={styles.line} />
                        <Text title3 style={{ paddingVertical: 10 }}>
                        Customer
                        </Text>
                        <Animated.FlatList
                                            contentContainerStyle={{
                                            }}
                                            refreshControl={
                                                <RefreshControl
                                                    colors={[BaseColor.primaryColor]}
                                                    tintColor={BaseColor.primaryColor}
                                                    refreshing={refreshing}
                                                    onRefresh={() => {}}
                                                />
                                            }
                                            scrollEventThrottle={1}
                                            onScroll={Animated.event(
                                                [
                                                    {
                                                        nativeEvent: {
                                                            contentOffset: {
                                                                y: this.state.scrollAnim
                                                            }
                                                        }
                                                    }
                                                ],
                                                { useNativeDriver: true }
                                            )}
                                            data={this.state.listdata_customer}
                                            keyExtractor={(item, index) => item.id}
                                            renderItem={({ item, index }) => (
                                                <TouchableOpacity
                                                    onPress={() => this.props.navigation.navigate('DetailContact',{
                                                    key:item.key,
                                                    label:item.label,
                                                    fullname:item.fullname,
                                                    firstname:item.firstname,
                                                    lastname:item.lastname,
                                                    birthday:item.birthday,
                                                    nationality:item.nationality,
                                                    passport_number:item.passport_number,
                                                    passport_country:item.passport_country,
                                                    passport_expire:item.passport_expire,
                                                    phone:item.phone,
                                                    title:item.title,
                                                    email:item.email,

                                                    nationality_id:item.nationality_id,
                                                    nationality_phone_code:item.nationality_phone_code,
                                                    
                                                    passport_country_id:item.passport_country_id,
                                                    passport_country_phone_code:item.passport_country_phone_code,

                                                    updateParticipant: this.updateParticipant,
                                                    type:'customer',
                                                    old:item.old
                                  
                                                  })}
                                                >
                                                    <FormOptionEdit
                                                    style={{marginBottom:10}}
                                                    label={item.label}
                                                    text={item.fullname}
                                                    />
                                                 </TouchableOpacity>
                                                
                                            )}
                                        />

                        <View style={styles.line} />
                        <Text title3 style={{ paddingVertical: 10 }}>
                        Pax
                        </Text>
                        <Animated.FlatList
                                            contentContainerStyle={{
                                            }}
                                            refreshControl={
                                                <RefreshControl
                                                    colors={[BaseColor.primaryColor]}
                                                    tintColor={BaseColor.primaryColor}
                                                    refreshing={refreshing}
                                                    onRefresh={() => {}}
                                                />
                                            }
                                            scrollEventThrottle={1}
                                            onScroll={Animated.event(
                                                [
                                                    {
                                                        nativeEvent: {
                                                            contentOffset: {
                                                                y: this.state.scrollAnim
                                                            }
                                                        }
                                                    }
                                                ],
                                                { useNativeDriver: true }
                                            )}
                                            data={this.state.listdata_participant}
                                            keyExtractor={(item, index) => item.id}
                                            renderItem={({ item, index }) => (
                                                <TouchableOpacity
                                                    onPress={() => this.props.navigation.navigate('DetailContact',{
                                                    key:item.key,
                                                    label:item.label,
                                                    fullname:item.fullname,
                                                    firstname:item.firstname,
                                                    lastname:item.lastname,
                                                    birthday:item.birthday,
                                                    nationality:item.nationality,
                                                    passport_number:item.passport_number,
                                                    passport_country:item.passport_country,
                                                    passport_expire:item.passport_expire,
                                                    phone:item.phone,
                                                    title:item.title,
                                                    email:item.email,

                                                    nationality_id:item.nationality_id,
                                                    nationality_phone_code:item.nationality_phone_code,
                                                    
                                                    passport_country_id:item.passport_country_id,
                                                    passport_country_phone_code:item.passport_country_phone_code,

                                                    updateParticipant: this.updateParticipant,
                                                    type:'guest',
                                                    old:item.old

                                  
                                                  })}
                                                >
                                                    <FormOptionEdit
                                                    style={{marginBottom:10}}
                                                    label={item.label}
                                                    text={item.fullname}
                                                    />
                                                 </TouchableOpacity>
                                                
                                            )}
                                        />
                    </View>

                    <View>
                        {/* Package Component > Summarize */}
                        <ButtonOrder
                            packageName={'IDR '+priceSplitter(this.state.total_price)}
                            price={packageItem.price}
                            type={'Total Price for '+jumlahPenumpang+' Person(s)'}
                            description={'Include insurance'}
                            onPressIcon={() => {
                                navigation.navigate("PricingTable");
                            }}
                            style={{ marginBottom: 10 }}
                        />
                        
                    </View>
                    <View style={{ padding: 20,borderRadius: 8,width: "100%",marginBottom:50}}>
                  
                        <Button
                        loading={loading}
                        full
                        onPress={() => {  this.onSubmit();
                        }}
                        >
                        Add To Cart
                        </Button>
                    </View>
                </ScrollView>
                </View>
            }
            <DropdownAlert ref={ref => this.dropdown = ref} messageNumOfLines={10} closeInterval={10000} />
            </SafeAreaView>
        );
    }
}
