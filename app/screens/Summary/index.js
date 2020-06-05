import React, { Component } from "react";
import { View, ScrollView,Animated,RefreshControl,TouchableOpacity, ActivityIndicator,StyleSheet,Switch } from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import {
    Header,
    SafeAreaView,
    Icon,
    FlightPlan,
    Text,
    FlightItem,
    Button,
    ProfileDetail
    
} from "@components";
// import styles from "./styles";
import ButtonOrder from "../../components/ButtonOrder";
import FormOptionEdit from "../../components/FormOptionEdit";
import {AsyncStorage} from 'react-native';
import { PackageData } from "@data";
import {PostData} from '../../services/PostData';
import DropdownAlert from 'react-native-dropdownalert';
import { UserData } from "@data";

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
        // borderBottomColor: BaseColor.textSecondaryColor,
        // borderBottomWidth: 1,
        // paddingBottom: 20,
        // paddingTop: 20
    },

    contentProfile: {
        // marginTop: 15,
        flexDirection: "row",
        backgroundColor: BaseColor.fieldColor,
        marginBottom: 15,

        borderWidth: 1, 
       borderRadius: 10,
       borderColor: BaseColor.fieldColor,
       padding: 5,
       //backgroundColor: '#FFEB3B'
    },
    searchIcon: {
        flex: 1,
        // borderRadius: 40/2,
        // backgroundColor: BaseColor.fieldColor,
        padding: 10,
        // width:40,
        // height:40
    },
});

export default class Summary extends Component {
    constructor(props) {
        super(props);
        const scrollAnim = new Animated.Value(0);
        const offsetAnim = new Animated.Value(0);

        var param=this.props.navigation.state.params.param;
        var paramOther=this.props.navigation.state.params.paramOther;
        var product=this.props.navigation.state.params.product;

        var param=[];
        if(this.props.navigation.state.params.param){
            param=this.props.navigation.state.params.param;
        }

        var paramOther=[];
        if(this.props.navigation.state.params.paramOther){
            paramOther=this.props.navigation.state.params.paramOther;
        }

        var product=[];
        if(this.props.navigation.state.params.product){
            product=this.props.navigation.state.params.product;
        }


        var selectDataDeparture=[];
        if(this.props.navigation.state.params.selectDataDeparture){
            selectDataDeparture=this.props.navigation.state.params.selectDataDeparture;
        }

        var selectDataReturn=[];
        if(this.props.navigation.state.params.selectDataReturn){
            selectDataReturn=this.props.navigation.state.params.selectDataReturn;
        }

        var departurePost=[];
        if(this.props.navigation.state.params.departurePost){
            departurePost=this.props.navigation.state.params.departurePost;
        }

        var returnPost=[];
        if(this.props.navigation.state.params.returnPost){
            returnPost=this.props.navigation.state.params.returnPost;
        }

        var amount = parseInt(param.Adults)+parseInt(param.Children)+parseInt(param.Infants);
        var arrOldGuest=this.convertOld(param);

        this.state = {
            param:param,
            paramOther:paramOther,
            product:product,
            typeFlight:'',

            selectDataDeparture:selectDataDeparture,
            selectDataReturn:selectDataReturn,

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
            total_price:0,
            userData: UserData[0],

            colorButton:'grey',
            handlerButton:true,
            reminders: false,


        };

        this.updateParticipant = this.updateParticipant.bind(this);
        this.setTitle = this.setTitle.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        //this.midtrans = this.midtrans.bind(this);

    }
    convertDuration(date1,date2){
        
        // First we split the values to arrays date1[0] is the year, [1] the month and [2] the day
        date1 = date1.split('-');
        date2 = date2.split('-');

        // Now we convert the array to a Date object, which has several helpful methods
        date1 = new Date(date1[0], date1[1], date1[2]);
        date2 = new Date(date2[0], date2[1], date2[2]);

        // We use the getTime() method and get the unixtime (in milliseconds, but we want seconds, therefore we divide it through 1000)
        date1_unixtime = parseInt(date1.getTime() / 1000);
        date2_unixtime = parseInt(date2.getTime() / 1000);

        // This is the calculated difference in seconds
        var timeDifference = date2_unixtime - date1_unixtime;

        // in Hours
        var timeDifferenceInHours = timeDifference / 60 / 60;

        // and finaly, in days :)
        var timeDifferenceInDays = timeDifferenceInHours  / 24;
        var duration=timeDifferenceInDays;
        return duration;
    }

    convertOld(param){

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

            return arrOldGuest;


    }
    
    



    totalPrice(){
        let {param,paramOther,product}=this.state;
        var total_price=0;
        if(paramOther.type=='trip'){
            var date1 = param.DepartureDate;
            var date2 = param.ReturnDate;
            var duration=this.convertDuration(date1,date2);

            var biayaAdult=(parseInt(param.Adults)*parseInt(product.harga))*parseInt(duration);
            var biayaChildren=(parseInt(param.Children)*parseInt(product.harga))*parseInt(duration);
            var biayaInfants=(parseInt(param.Infants)*(parseInt(product.harga)*0.2))*parseInt(duration);
            total_price=parseInt(biayaAdult)+parseInt(biayaChildren)+parseInt(biayaInfants);
            this.setState({total_price:total_price});
        }else{
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
        }
        
    }    


    typeFlight(){
        // let {param}=this.state;
        // fromCode=param.Origin;
        // toCode=param.OriginDestination;


        const data={  
            "fromCode": this.state.param.Origin,
            "toCode": this.state.param.Destination
        }
        const param={"param":data}
        
        console.log("------------------data param typeFlight--------------");
        console.log(JSON.stringify(param));

        PostData('get_type_flight',param)
                                .then((result) => {
                                    console.log(JSON.stringify(result));
                                    this.setState({typeFlight:result.typeFlight})
    
                                },
                                (error) => {
                                    this.setState({ error });
                                }
                                );
        
    }    


    setTitle(title){
        this.setState({title:title});
    }

    onSubmitTrip(){
        
    }
    
    
    


    onSubmit() {

        var paramOther=this.state.paramOther;
        this.saveParticipant();
        if(paramOther.type=='trip'){

            

            AsyncStorage.getItem('userSession', (error, result) => {
                if (result) {
                    let userSession = JSON.parse(result);
    
                        var participant = [];
                        var customer=this.state.listdata_customer;
                        var product= this.state.product;
                        var guest=this.state.listdata_participant;
                           
                        var participant = [];
                        var a=1;
                        guest.map(item => {
                            var obj = {};
                            obj['type'] = item.old;
                            obj['fullname'] = item.fullname;
                            obj['firstname'] = item.firstname;
                            obj['lastname'] = item.lastname;
                            obj['birthday'] = item.birthday;
                            obj['nationality'] = item.nationality;
                            obj['passport_number'] = item.passport_number;
                            obj['passport_country'] = item.passport_country;
                            obj['passport_expire'] = item.passport_expire;
                            obj['phone'] = item.phone;
                            obj['title'] = item.title;
                            obj['email'] = item.email;
                            obj['nationality_id'] = item.nationality_id;
                            obj['nationality_phone_code'] = item.nationality_phone_code;
                            obj['passport_country_id'] = item.passport_country_id;
                            participant.push(obj);
                            a++;
                        });
    
                            var contact= {
                            "title": customer[0].title,
                            "first_name": customer[0].firstname,
                            "last_name": customer[0].lastname,
                            "country": customer[0].nationality_id,
                            "area_phone_code": customer[0].nationality_phone_code,
                            "phone_number": customer[0].phone,
                            "email": customer[0].email
                            };
    
                                const data={  
                                    "type": this.state.paramOther.type,
                                    "order_code": "",
                                    "payment_code": "",
                                    "promo_code": "",
                                    "id_user": userSession.id_user,
                                    "user_token": "",
                                    "pax": this.state.jumlahPenumpang,
                                    "adult": this.state.param.Adults,
                                    "children": this.state.param.Children,
                                    "baby": this.state.param.Infants,
                                    "payment_method": "",
                                    "payment_expired": "",
                                    "subtotal": this.state.total_price,
                                    "start_date": this.state.param.DepartureDate,
                                    "ret_date": this.state.param.ReturnDate,
                                    "a": "",
                                    "d": "",
                                    "insurance": "",
                                    "pp": "",
                                    "total_price":this.state.total_price,
                                    "tax":"",
                                    "contact":contact,
                                    "product":product,
                                    "participant":participant
                                }
                            const param={"param":data}
                            
                            console.log("------------------data param submit order trip--------------");
                            console.log(JSON.stringify(param));
    
                            PostData('submitbook_order_new',param)
                                .then((result) => {
                                    id_order=result.id_order;
                                    pay=result.pay;
                                    this.props.navigation.navigate('CartTour',
                                    {
                                        dataOrderSubmit:result,
                                        dataOrder:data
                                    }
                                    );
    
                                },
                                (error) => {
                                    this.setState({ error });
                                }
                                );
    
                    }
                
                });
            
        }else{

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
      
        
    }


    saveParticipant(){
        AsyncStorage.getItem('userSession', (error, result) => {
            if (result) {
                let userSession = JSON.parse(result);
                console.log("---------------data session user  ------------");
                console.log(JSON.stringify(userSession));
                this.setState({userSession:userSession});
                this.setState({login:true});
    
    
                var id_user=userSession.id_user;
                var guest=this.state.listdata_participant;
                           
                        var participant = [];
                        var a=1;
                        guest.map(item => {
                            var obj = {};
                            obj['id_user'] = id_user;
                            obj['fullname'] = item.fullname;
                            obj['firstname'] = item.firstname;
                            obj['lastname'] = item.lastname;
                            obj['birthday'] = item.birthday;
                            obj['nationality'] = item.nationality;
                            obj['passport_number'] = item.passport_number;
                            obj['passport_country'] = item.passport_country;
                            obj['passport_expire'] = item.passport_expire;
                            obj['phone'] = item.phone;
                            obj['title'] = item.title;
                            obj['email'] = item.email;
                            obj['nationality_id'] = item.nationality_id;
                            obj['nationality_phone_code'] = item.nationality_phone_code;
                            obj['passport_country_id'] = item.passport_country_id;

                            participant.push(obj);
                            a++;
                        });

                    
                var customer=this.state.listdata_customer;
                           
                var customer = [];
                var a=1;
                customer.map(item => {
                    var obj = {};
                    obj['id_user'] = id_user;
                    obj['fullname'] = item.fullname;
                    obj['firstname'] = item.firstname;
                    obj['lastname'] = item.lastname;
                    obj['birthday'] = item.birthday;
                    obj['nationality'] = item.nationality;
                    obj['passport_number'] = item.passport_number;
                    obj['passport_country'] = item.passport_country;
                    obj['passport_expire'] = item.passport_expire;
                    obj['phone'] = item.phone;
                    obj['title'] = item.title;
                    obj['email'] = item.email;
                    obj['nationality_id'] = item.nationality_id;
                    obj['nationality_phone_code'] = item.nationality_phone_code;
                    obj['passport_country_id'] = item.passport_country_id;

                    customer.push(obj);
                    a++;
                });    


                const data={  
                    "id_user": id_user,
                    "participant":participant,
                    "customer":customer
                }
                 const param={"param":data}

                 console.log("------------------data param submit profie--------------");
                 console.log(JSON.stringify(param));

                 PostData('save_participant',param)
                     .then((result) => {
                        console.log("------------------result save profle-------------");

                       console.log(JSON.stringify(result));

                     },
                     (error) => {
                         this.setState({ error });
                     }
                     );


                    }      
                    
            });        
                        
    }
    
    filterArray(array, filters) {
        const filterKeys = Object.keys(filters);
        return array.filter(item => {
          // validates all filter criteria
          return filterKeys.every(key => {
            // ignores non-function predicates
            if (typeof filters[key] !== 'function') return true;
            return filters[key](item[key]);
          });
        });
    }


    validaton_participant(){
        var hasil = false;
        const products=this.state.listdata_participant;


           const filters = {
            title: title => title == "",
            fullname: fullname => fullname == "",
          };

        const  filtered = this.filterArray(products, filters);
        var jml=filtered.length;
        console.log("----------------validation participant------------------------------------");
        console.log(JSON.stringify(filtered));
        return jml;
    }
    


    validaton_customer(){
        var hasil = false;
        const products=this.state.listdata_customer;


           const filters = {
            title: title => title == "",
            fullname: fullname => fullname == "",
          };

        const  filtered = this.filterArray(products, filters);
        var jml=filtered.length;
        console.log("----------------validation participant------------------------------------");
        console.log(JSON.stringify(filtered));
        return jml;
    }

    validation(){
        var jml_empty_participant=this.validaton_participant();
        var jml_empty_customer=this.validaton_customer();

        console.log("----------------jml kosong participant------------------------------------");
        console.log(jml_empty_participant);

        console.log("----------------jml kosong customer------------------------------------");
        console.log(jml_empty_customer);

        if(jml_empty_participant == 0 && jml_empty_customer == 0 ){
            console.log('perfect');
            this.setState({colorButton:'red'});
            this.setState({handlerButton:false});
        }else{
            console.log('not yet');
            this.setState({colorButton:'grey'});
            this.setState({handlerButton:true});
        }

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
                    // passport_country_phone_code:passport_country_phone_code,
                    }
                : p
            );

            AsyncStorage.setItem('setDataParticipant',JSON.stringify(newProjects));
            this.setState({listdata_participant:newProjects});
            console.log("------DATA GUEST----");
            console.log(JSON.stringify(newProjects));

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
                        // passport_country_phone_code:passport_country_phone_code,
                        }
                    : p
                );
    
                AsyncStorage.setItem('setDataCustomer',JSON.stringify(newProjects));
                this.setState({listdata_customer:newProjects});
                console.log("------DATA CUSTOMER----");
                console.log(JSON.stringify(newProjects));
            }
            });


    }

    setTimeout(() => {
        this.validation();
    }, 500);


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

  

    addDate(dt, amount, dateType) {
        switch (dateType) {
        case 'days':
            return dt.setDate(dt.getDate() + amount) && dt;
        case 'weeks':
            return dt.setDate(dt.getDate() + (7 * amount)) && dt;
        case 'months':
            return dt.setMonth(dt.getMonth() + amount) && dt;
        case 'years':
            return dt.setFullYear( dt.getFullYear() + amount) && dt;
        }
    }


    formatDateToString(date){
        // 01, 02, 03, ... 29, 30, 31
        var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
        // 01, 02, 03, ... 10, 11, 12
        var MM = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
        // 1970, 1971, ... 2015, 2016, ...
        var yyyy = date.getFullYear();
     
        // create the format you want
        return (yyyy + "-" + MM + "-" + dd);
     }

    componentDidMount() {

        var paramOther=this.state.paramOther;
        var typeProduct=paramOther.type;
        var typeFlight=this.state.typeFlight;
        this.totalPrice();

        if(paramOther.type=='flight'){
            this.typeFlight();
        }


        let minDatePassport = new Date();
        minDatePassport = this.formatDateToString(minDatePassport);
        minDatePassport=minDatePassport;

        let dtDefAdult = new Date();
        dtDefAdult = this.addDate(dtDefAdult, -13, 'years');
        var def_date_adult =this.formatDateToString(dtDefAdult);

        var def_passport_number="12345678";
        var def_passport_country="Indonesia";
        var def_passport_expire=minDatePassport;
        var def_passport_country_id="ID";
        var def_phone="12345678";
        var def_email="email@gmail.com";

        //yang kurang customer
        // "passport_number":"",
        // "passport_country":"",
        // "passport_expire":"",
        // "passport_country_id":""
        //birthday



        var customer = [];
        for (var i=1; i<=1; i++) {
        var obj = {};
            obj['key'] = i;
            obj['label'] = "Contact";
            obj['old'] = 'adult';

            obj['fullname'] = "";
            obj['firstname'] = "";
            obj['lastname'] = "";
            obj['birthday'] = def_date_adult;
            obj['nationality'] = "";
            obj['passport_number'] = def_passport_number;
            obj['passport_country'] = def_passport_country;
            obj['passport_expire'] = def_passport_expire;
            obj['phone'] = "";
            obj['title'] = "";
            obj['email'] = "";

            obj['nationality_id'] = "";
            obj['nationality_phone_code'] = "";

            obj['passport_country_id'] = def_passport_country_id;
            // obj['passport_country_phone_code'] = "";

            customer.push(obj)
        }
        AsyncStorage.setItem('setDataCustomer',JSON.stringify(customer));
        this.setState({listdata_customer:customer});



        if(typeFlight=='domestic' || typeProduct=='trip'){

            //yang kurang guest
            def_passport_number=def_passport_number;
            def_passport_country=def_passport_country;
            def_passport_expire=def_passport_expire;
            def_phone=def_phone;
            def_email=def_email;
            def_passport_country_id=def_passport_country_id;
        }

        var participant = [];
        for (var i=1; i<=this.state.jumlahPenumpang; i++) {
        if(this.state.arr_old[i]=='ADT'){
            old='adult';
        }else if(this.state.arr_old[i]=='CHD'){
            old='children';
        }else if(this.state.arr_old[i]=='INF'){
            old='baby';
        }
        
        var obj = {};
            obj['key'] = i;
            obj['label'] = "Penumpang "+i+" : "+old;
            obj['old'] = old;

            obj['fullname'] = "";
            obj['firstname'] = "";
            obj['lastname'] = "";
            obj['birthday'] = "";
            obj['nationality'] = "";
            obj['passport_number'] = def_passport_number;
            obj['passport_country'] = def_passport_country;
            obj['passport_expire'] = def_passport_expire;
            obj['phone'] = def_phone;
            obj['title'] = "";
            obj['email'] = def_email;

            obj['nationality_id'] = "";
            obj['nationality_phone_code'] = "";

            obj['passport_country_id'] = def_passport_country_id;
            // obj['passport_country_phone_code'] = "";

        participant.push(obj)
        }
        AsyncStorage.setItem('setDataParticipant',JSON.stringify(participant));
        this.setState({listdata_participant:participant});

    }    

 

    toggleSwitch = value => {
        this.setState({ reminders: value });
        var customer=this.state.listdata_customer[0];
        console.log(JSON.stringify(customer));

        if(value==true){
        var key=1;
        var fullname=customer.fullname;
        var firstname=customer.firstname;
        var lastname=customer.lastname;
        var birthday=customer.birthday;
        var nationality=customer.nationality;
        var passport_number=customer.passport_number;
        var passport_country=customer.passport_country;
        var passport_expire=customer.passport_expire;
        var phone=customer.phone;
        var title=customer.title;
        var email=customer.email;
        var nationality_id=customer.nationality_id;
        var nationality_phone_code=customer.nationality_phone_code;
        var passport_country_id=customer.passport_country_id;
        // var passport_country_phone_code=customer.passport_country_phone_code;
        var type='guest';

        this.updateParticipant(
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
        // passport_country_phone_code,
        type
        );

        }else{

        var key=1;
        var fullname='';
        var firstname='';
        var lastname='';
        var birthday='';
        var nationality='';
        var passport_number='';
        var passport_country='';
        var passport_expire='';
        var phone='';
        var title='';
        var email='';
        var nationality_id='';
        var nationality_phone_code='';
        var passport_country_id='';
        // var passport_country_phone_code='';
        var type='guest';

        this.updateParticipant(
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
        // passport_country_phone_code,
        type
        );


        }
    };

    render() {
        const { navigation } = this.props;
        let { paramOther,selectDataDeparture,selectDataReturn,param,dataPrice, packageItem, packageItemDetail,loading, loading_spinner,userData } = this.state;
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
        var jumlahPenumpang=parseInt(param.Adults)+parseInt(param.Children)+parseInt(param.Infants);
        const { flights, refreshing, clampedScroll } = this.state;
       

        const contentFormCustomer = this.state.listdata_customer.map((item) => {
            return (
                <View style={styles.contentProfile}>
                <ProfileDetail
                    textFirst={item.label}
                    textSecond={item.fullname}
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

                        updateParticipant: this.updateParticipant,
                        type:'customer',
                        old:item.old,
                        typeProduct:this.state.paramOther.type
      
                      })}
                    viewImage={false}
                    style={{ flex: 10, marginRight: 10 }}
                />
                <TouchableOpacity
                    style={styles.searchIcon}
                    onPress={() =>
                        {navigation.navigate("ProfileSmart",
                        {
                            sourcePage:'summary',
                            item:item,
                            type:'customer',
                            updateParticipant: this.updateParticipant,
                        }
                        );}
                    }
                >
                                 <Icon
                                    name="search"
                                    size={18}
                                    color={BaseColor.primaryColor}
                                    style={{ textAlign: "center"}}
                                />
                </TouchableOpacity>
            </View>
            )
        })
        

        const contentformParticipant = this.state.listdata_participant.map((item) => {
            return (
                <View style={styles.contentProfile}>
                <ProfileDetail
                    textFirst={item.label}
                    textSecond={item.fullname}
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
                        // passport_country_phone_code:item.passport_country_phone_code,

                        updateParticipant: this.updateParticipant,
                        type:'guest',
                        old:item.old,
                        typeFlight:this.state.typeFlight,
                        typeProduct:this.state.paramOther.type
      
                      })}
                    viewImage={false}
                    style={{ flex: 10, marginRight: 10 }}
                />
                <TouchableOpacity
                    style={styles.searchIcon}
                    onPress={() =>
                        {navigation.navigate("ProfileSmart",
                         {
                            sourcePage:'summary',
                            item:item,
                            type:'guest',
                            updateParticipant: this.updateParticipant,
                         }
                        );}
                    }
                >
                                 <Icon
                                    name="search"
                                    size={18}
                                    color={BaseColor.primaryColor}
                                    style={{ textAlign: "center"}}
                                />
                </TouchableOpacity>
            </View>
            )
        })
        

        var contentProduct=<View></View>
        if(this.state.paramOther.type=='trip')
        {
            contentProduct=<View><Text title3 style={{ paddingVertical: 10 }}>
            Product Trip
            </Text>
                <Text body1 semibold>
                    {this.state.product['judul_trip']}
                </Text>
            </View>

        }else{

            contentProduct=<FlightPlan
                            round={this.state.param.IsReturn}
                            fromCode={this.state.param.Origin}
                            toCode={this.state.param.Destination}
                            from={this.state.paramOther.bandaraAsalLabel}
                            to={this.state.paramOther.bandaraTujuanLabel}
                        />
                        
        }


        var contentPrice=<View></View>
        if(this.state.paramOther.type=='trip')
        {
            contentPrice= <View>
            <ButtonOrder
                packageName={'IDR '+priceSplitter(this.state.total_price)}
                price={packageItem.price}
                type={'Total Price for '+this.state.jumlahPenumpang+' Person(s)'}
                description={'Include insurance'}
                onPressIcon={() => {
                    navigation.navigate("PricingTable");
                }}
                style={{ marginBottom: 10 }}
            />
            
            </View>

        }else{
            contentPrice= <View>
            <ButtonOrder
                packageName={'IDR '+priceSplitter(this.state.total_price)}
                price={packageItem.price}
                type={'Total Price for '+this.state.jumlahPenumpang+' Person(s)'}
                description={'Include insurance'}
                onPressIcon={() => {
                    navigation.navigate("PricingTable");
                }}
                style={{ marginBottom: 10 }}
            />
            
            </View>

        }


        var contentButton=<View style={{ padding: 20,borderRadius: 8,width: "100%",marginBottom:50}}>
                <TouchableOpacity  disabled={this.state.handlerButton} onPress={() => 
                    {
                        this.onSubmit()
                        //alert('go`');
                    }} >
                <View pointerEvents='none' style={styles.groupinput}>       
                <Button
                loading={loading}
                full
                // style={{backgroundColor:this.state.colorButton}}
                 style={{
                                borderRadius: 18,
                                // backgroundColor: BaseColor.fieldColor,
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                elevation: 5,
                                backgroundColor:this.state.colorButton
                            }}
                >
                Add To Cart
                </Button>
                </View> 
                </TouchableOpacity>


            </View>

    

          
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
                    title="Summary"
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
                 
                        
                        {contentProduct}
                        <View style={styles.line} />
                        {/* --------------------------------- */}

                        <Text title3 style={{ paddingVertical: 10,fontSize: 12 }}>
                            Detail Pemesan
                        </Text>
                        {contentFormCustomer}
                        <View style={styles.line} />
                        {/* --------------------------------- */}

                        <Text title3 style={{ paddingVertical: 10,fontSize: 12 }}>
                        Detail Penumpang
                        </Text>
                        <View style={styles.profileItem}>
                            <Text body1>Sama dengan pemesan</Text>
                            <Switch name="angle-right" 
                                size={18} 
                                onValueChange={this.toggleSwitch}
                                value={this.state.reminders}
                             />
                        </View>
                        {contentformParticipant}
                        {/* --------------------------------- */}

                    </View>

                    {contentPrice}
                    {contentButton}
                   
                   


                </ScrollView>
                </View>
            }
            <DropdownAlert ref={ref => this.dropdown = ref} messageNumOfLines={10} closeInterval={10000} />
            </SafeAreaView>
        );
    }
}
