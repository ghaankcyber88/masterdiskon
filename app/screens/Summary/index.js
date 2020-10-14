import React, { Component } from "react";
import { View, ScrollView,Animated,RefreshControl,TouchableOpacity, ActivityIndicator,StyleSheet,Switch,Image } from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import {
    Header,
    SafeAreaView,
    Icon,
    FlightPlan,
    Text,
    Button,
    ProfileDetail,
    
} from "@components";
import {AsyncStorage} from 'react-native';
import { PackageData } from "@data";
import {PostData} from '../../services/PostData';
import {PostDataNew} from '../../services/PostDataNew';
import DropdownAlert from 'react-native-dropdownalert';
import { UserData } from "@data";
import AnimatedLoader from "react-native-animated-loader";

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
    },

    contentProfile: {
        flexDirection: "row",
        backgroundColor: BaseColor.fieldColor,
        marginBottom: 15,

        borderWidth: 1, 
       borderRadius: 10,
       borderColor: BaseColor.fieldColor,
       padding: 5,
    },
    searchIcon: {
        flex: 1,
        padding: 10,
    },
});

export default class Summary extends Component {
    constructor(props) {
        super(props);
        
        AsyncStorage.getItem('userSession', (error, result) => {
            if (result) {
                let userSession = JSON.parse(result);
                ////console.log("---------------data session user  ------------");
                ////console.log(JSON.stringify(userSession));
                this.setState({userSession:userSession});
                this.setState({login:true});

                var id_user=userSession.id_user;
                this.setState({id_user:id_user});
             }
            
        });
        
        AsyncStorage.getItem('tokenFirebase', (error, result) => {
            if (result) {
                ////console.log('Token Firebase',result);
                this.setState({
                    tokenFirebase: result
                });
            }
        });
        
        
        const scrollAnim = new Animated.Value(0);
        const offsetAnim = new Animated.Value(0);
        
        //------------------------parameter untuk flight------------------------//
        var selectDataDeparture=[];
        if(this.props.navigation.state.params.selectDataDeparture){
            selectDataDeparture=this.props.navigation.state.params.selectDataDeparture;
            ////console.log('selectDataDeparture',JSON.stringify(selectDataDeparture));

        }

        var selectDataReturn=[];
        if(this.props.navigation.state.params.selectDataReturn){
            selectDataReturn=this.props.navigation.state.params.selectDataReturn;
            ////console.log('selectDataReturn',JSON.stringify(selectDataReturn));
        }

        var departurePost=[];
        if(this.props.navigation.state.params.departurePost){
            departurePost=this.props.navigation.state.params.departurePost;
        }

        var returnPost=[];
        if(this.props.navigation.state.params.returnPost){
            returnPost=this.props.navigation.state.params.returnPost;
        }
        //------------------------parameter untuk flight------------------------//
        
        
        //------------------------parameter untuk non flight-------------------//
        
        var product=[];
        if(this.props.navigation.state.params.product){
            product=this.props.navigation.state.params.product;
            ////console.log('dataProduct',JSON.stringify(product));
        }
        
        var productPart=[];
        if(this.props.navigation.state.params.productPart){
            productPart=this.props.navigation.state.params.productPart;
            ////console.log('dataProductPart',JSON.stringify(productPart));
        }
        //------------------------parameter untuk non flight-------------------//
        
        //------------------------parameter inti------------------------//
        var param=this.props.navigation.state.params.param;
        var product=this.props.navigation.state.params.product;
        var productPart=this.props.navigation.state.params.productPart;
        
        
        
        var param=[];
        if(this.props.navigation.state.params.param){
            param=this.props.navigation.state.params.param;
        }
        
        ////console.log('params',JSON.stringify(param));
   
        //------------------------parameter inti------------------------//
        
        var jumlahPenumpang = param.Qty;
        var arrOldGuest=this.convertOld(param);

        this.state = {
            param:param,
            product:product,
            productPart:productPart,
            typeFlight:'',

            selectDataDeparture:selectDataDeparture,
            selectDataReturn:selectDataReturn,

            departurePost:departurePost,
            returnPost:returnPost,

            jumlahPenumpang:jumlahPenumpang,
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

            colorButton:BaseColor.greyColor,
              colorButtonText:BaseColor.whiteColor,
              disabledButton:true,
            
            
            reminders: false,
            remindersInsurance:false,

            otherUser:false,
            remindersOtherUser:false,
            
            dataPrice:{      
                      required_dob:true,
                      required_passport:false,
                      total_price:0,
                      nett_price:0,
                      insurance_total:0,
                      transaction_fee:0
                },
            insurance_included:false,
            total_all:0,
            dataCart:{
                id:"1",
                id_trip:"1",
                adult: 1,
                child: 0,
                infant: 0,
                nett_price: 596360,
                discount: 0,
                total_price: 606180,
                insurance_total: 0,
                transaction_fee: 1080,
                time_limit: "2020-06-17T13:37:00",
                contact: {
                    title: "Mr",
                    first_name: "arifinss",
                    last_name: "hendra",
                    country_id: "ID",
                    country_name: "Indonesia",
                    phone_code: "62",
                    phone_number: "6666666",
                    email: "matadesaindotcom@gmail.com"
                }
            },
            
            loading_spinner:true,
            loading_spinner_file:require("app/assets/hotel.json"),
            loading_spinner_title:'Connecting with masterdiskon',
            
            config:{"aeroStatus":false,"aeroUrl":"https://staging-api.megaelectra.co.id/","baseUrl":"https://masterdiskon.co.id/","banner":"https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=753&q=80","transaction_fee":"5000","norek":"1290080508050 (Mandiri) an. PT Master Diskon Internasional","voucher_markup":"20000","token":"EfVwMeH5HgFokJknYDYHto_DcxundKflSmevqUHTNNU"}
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
        let {param,product,productPart}=this.state;
        var total_price=0;
        if(param.type=='trip'){
            this.setState({ loading_spinner: true }, () => {
                this.setState({ loading_spinner: false });
                var dataPrice={      
                    required_dob:true,
                    required_passport:false,
                    total_price:total_price,
                    nett_price:0,
                    insurance_total:0,
                    transaction_fee:0
                };
                this.setState({dataPrice:dataPrice});
                this.setState({total_all:parseInt(param.totalPrice)+parseInt(dataPrice.transaction_fee)});
            });
        }else if(param.type=='hotelpackage'){
            this.setState({ loading_spinner: true }, () => {
                this.setState({ loading_spinner: false });
                var dataPrice={      
                    required_dob:true,
                    required_passport:false,
                    total_price:total_price,
                    nett_price:0,
                    insurance_total:0,
                    transaction_fee:0
                };
                this.setState({dataPrice:dataPrice});
                this.setState({total_all:parseInt(param.totalPrice)+parseInt(dataPrice.transaction_fee)});
            });
        }else if(param.type=='activities'){
            this.setState({ loading_spinner: true }, () => {
                this.setState({ loading_spinner: false });
                var dataPrice={      
                    required_dob:true,
                    required_passport:false,
                    total_price:total_price,
                    nett_price:0,
                    insurance_total:0,
                    transaction_fee:0
                };
                this.setState({dataPrice:dataPrice});
                this.setState({total_all:parseInt(param.totalPrice)+parseInt(dataPrice.transaction_fee)});
            });
        }else{
            var departurePost=this.removePrice(this.state.selectDataDeparture); 
            var returnPost=this.removePrice(this.state.selectDataReturn);   
            var paramGetPrice = {
                "Adults": param.Adults,
                "Children": param.Children,
                "Infants": param.Infants,
                "CabinClass": param.CabinClass[0],
                "CorporateCode": param.CorporateCode,
                "ReturnDate"   : param.ReturnDate,
                "DepartureDate": param.DepartureDate,
                "Destination": param.Destination,
                "Origin": param.Origin,
                "departure":departurePost,
                "return":returnPost
            };
            this.setState({ loading_spinner: true }, () => {
                    AsyncStorage.getItem('config', (error, result) => {
                        if (result) {    
                                    let config = JSON.parse(result);
                                    var access_token=config.token;
                                    var url=config.aeroUrl;
                            
                                   
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

                                    
                                    PostDataNew(url,'flight/Price/v3',requestOptions)
                                     .then((result) => {
                                        
                                        this.setState({ loading_spinner: false });
                                        this.setState({dataPrice:result.data});
                                        this.setState({total_all:result.data.total_price});
                                        this.setState({fee:config.transaction_fee});
                                     },
                                     (error) => {
                                         this.setState({ error });
                                     }
                                    ); 
                            
                            
                        }
                    });
                });    
        }
        
    }    


    typeFlight(){
        const data={  
            "fromCode": this.state.param.Origin,
            "toCode": this.state.param.Destination
        }
        const param={"param":data}
        
        ////console.log("------------------data param typeFlight--------------");
        ////console.log(JSON.stringify(param));

        AsyncStorage.getItem('config', (error, result) => {
            if (result) {   
                let config = JSON.parse(result);
                var access_token=config.token;
                var path=config.common_type_flight.dir;
                var url=config.baseUrl;

                PostDataNew(url,path,param)


                //PostData('get_type_flight',param)
                                .then((result) => {
                                    ////console.log(JSON.stringify(result));
                                    this.setState({typeFlight:result.typeFlight})
    
                                },
                                (error) => {
                                    this.setState({ error });
                                }
                                );
                }
            }); 
        
    }    


    setTitle(title){
        this.setState({title:title});
    }
    
    pay(cartToBeSaved,id_order){
        var dataPay=cartToBeSaved;
        const optionConnect = {
            clientKey: "SB-Mid-client-zxkvGZYYuXIidGRG",
            urlMerchant: "https://masterdiskon.com", // will hit https://domain.net/charge
            sandbox : true, // works on iOS only, change it to false on production
        }
 
        const transRequest = {
            transactionId: id_order,
            totalAmount: dataPay.total_price
        }
 
        const itemDetails = [
            {id: "001", price: 1000, qty: 4, name: "peanuts"}
        ];
 
        const creditCardOptions = {
            saveCard: false,
            saveToken: false,
            paymentMode: "Normal",
            secure: false
        };
 
        const userDetail = {
            fullName: "jhon",
            email: "jhon@payment.com",
            phoneNumber: "0850000000",
            userId: "U01",
            address: "street coffee",
            city: "yogyakarta",
            country: "IDN", 
            zipCode: "59382"
        };
 
        const optionColorTheme = {
            primary: '#c51f1f',
            primaryDark: '#1a4794',
            secondary: '#1fce38'
        }
 
        const optionFont = {
            // defaultText: "open_sans_regular.ttf",
            // semiBoldText: "open_sans_semibold.ttf",
            // boldText: "open_sans_bold.ttf"
        }
 
        const callback = (res) => {
            ////console.log(res)
        };
        
        var paramMidtrans={
            optionConnect,
            transRequest,
            itemDetails,
            creditCardOptions,
            userDetail,
            optionColorTheme,
            optionFont
        }
        ////console.log('paramMidtrans',JSON.stringify(paramMidtrans));
        // PaymentGateway.checkOut(
        //     optionConnect,
        //     transRequest,
        //     itemDetails,
        //     creditCardOptions,
        //     userDetail,
        //     optionColorTheme,
        //     optionFont,
        //     callback
        // );
    }
    submitOrder(){
        var param=this.state.param;
        if(param.type=='trip'){
            var customer=this.state.listdata_customer;
            var product= this.state.product;
            var guest=this.state.listdata_participant;
            var param=this.state.param;
            var dataPrice=this.state.dataPrice;
            var productPart=this.state.productPart;
                
            var participant = [];
            var a=1;
            guest.map(item => {
                var obj = {};
                            obj['key']= a,
                            obj['label']= 'Penumpang '+a+' = '+item['old'],
                            obj['old']= item['old'],
                            obj['fullname']= item['fullname'],
                            obj['firstname']= item['firstname'],
                            obj['lastname']= item['lastname'],
                            obj['birthday']= item['birthday'],
                            obj['nationality']= item['nationality'],
                            obj['passport_number']= item['passport_number'],
                            obj['passport_country']= item['passport_country'],
                            obj['passport_expire']= item['passport_expire'],
                            obj['phone']= item['phone'],
                            obj['title']= item['title'],
                            obj['email']= item['email'],
                            obj['nationality_id']= item['nationality_id'],
                            obj['nationality_phone_code']= item['nationality_phone_code'],
                            obj['passport_country_id']= item['passport_country_id']
                            
                participant.push(obj);
                a++;
            });
            
           
                var dataCart={
                    "departure_date": param.DepartureDate,
                    "product":product,
                    "product_part":productPart,
                    "pax": [
                        {
                            "departure_baggage": 0,
                            "return_baggage": 0,
                            "loyalty_number": [],
                            "type": "ADT",
                            "type_name": "Adult",
                            "title": customer[0].title,
                            "first_name": customer[0].firstname,
                            "last_name": customer[0].lastname,
                            "dob": customer[0].birthday,
                            "nationality_code": customer[0].nationality_id,
                            "nationality_name": customer[0].nationality,
                            "identity_type": "passport",
                            "identity_type_name": customer[0].nationality,
                            "identity_number": customer[0].passport_number,
                            "identity_expired_date": customer[0].passport_expire,
                            "identity_issuing_country_code": customer[0].passport_country_id,
                            "identity_issuing_country_name": customer[0].passport_country_id
                        }
                    ],
                    "international": false,
                    "detail_price": [
                        {
                            "total_tax": 0,
                            "type": "",
                            "segment": "",
                            "total_price": this.state.total_all,
                            "nett_price": 0,
                            "commission_percent": 0,
                            "commission_amount": 0,
                            "insurance_code": null,
                            "insurance_name": null,
                            "insurance_company": null,
                            "insurance_program": null,
                            "insurance_fee": 0,
                            "insurance_total": 0,
                            "transaction_fee": 0,
                        }
                    ],
                    "id": "",
                    "adult": param.Adults,
                    "child": param.Children,
                    "infant": param.Infants,
                    "nett_price": 0,
                    "discount": 0,
                    "total_price": this.state.total_all,
                    "insurance_total": 0,
                    "transaction_fee": 0,
                    "time_limit": "2020-09-01T11: 37: 27",
                    "contact": {
                        "title": customer[0].title,
                        "first_name": customer[0].firstname,
                        "last_name": customer[0].lastname,
                        "country_id": customer[0].nationality_id,
                        "country_name": customer[0].nationality,
                        "phone_code": customer[0].nationality_phone_code,
                        "phone_number": customer[0].phone,
                        "email": customer[0].email
                    },
                    "participant": participant,
                    "typeProduct": "trip"
                }
                var cartToBeSaved=dataCart;
                this.onSubmitOrder(cartToBeSaved);
        
        }else if(param.type=='hotelpackage'){
            var customer=this.state.listdata_customer;
            var product= this.state.product;
            var guest=this.state.listdata_participant;
            var param=this.state.param;
            var dataPrice=this.state.dataPrice;
            var productPart=this.state.productPart;
            
            var participant = [];
            var a=1;
            guest.map(item => {
                var obj = {};
                            obj['key']= a,
                            obj['label']= 'Penumpang '+a+' = '+item['old'],
                            obj['old']= item['old'],
                            obj['fullname']= item['fullname'],
                            obj['firstname']= item['firstname'],
                            obj['lastname']= item['lastname'],
                            obj['birthday']= item['birthday'],
                            obj['nationality']= item['nationality'],
                            obj['passport_number']= item['passport_number'],
                            obj['passport_country']= item['passport_country'],
                            obj['passport_expire']= item['passport_expire'],
                            obj['phone']= item['phone'],
                            obj['title']= item['title'],
                            obj['email']= item['email'],
                            obj['nationality_id']= item['nationality_id'],
                            obj['nationality_phone_code']= item['nationality_phone_code'],
                            obj['passport_country_id']= item['passport_country_id']
                            
                participant.push(obj);
                a++;
            });
                var dataCart={
                    "departure_date": param.DepartureDate,
                    "product":product,
                    "product_part":productPart,
                    "pax": [
                        {
                            "departure_baggage": 0,
                            "return_baggage": 0,
                            "loyalty_number": [],
                            "type": "ADT",
                            "type_name": "Adult",
                            "title": customer[0].title,
                            "first_name": customer[0].firstname,
                            "last_name": customer[0].lastname,
                            "dob": customer[0].birthday,
                            "nationality_code": customer[0].nationality_id,
                            "nationality_name": customer[0].nationality,
                            "identity_type": "passport",
                            "identity_type_name": customer[0].nationality,
                            "identity_number": customer[0].passport_number,
                            "identity_expired_date": customer[0].passport_expire,
                            "identity_issuing_country_code": customer[0].passport_country_id,
                            "identity_issuing_country_name": customer[0].passport_country_id
                        }
                    ],
                    "international": false,
                    "detail_price": [
                        {
                            "total_tax": 0,
                            "type": "",
                            "segment": "",
                            "total_price": this.state.total_all,
                            "nett_price": 0,
                            "commission_percent": 0,
                            "commission_amount": 0,
                            "insurance_code": null,
                            "insurance_name": null,
                            "insurance_company": null,
                            "insurance_program": null,
                            "insurance_fee": 0,
                            "insurance_total": 0,
                            "transaction_fee": 0,
                        }
                    ],
                    "id": "",
                    "adult": param.Adults,
                    "child": param.Children,
                    "infant": param.Infants,
                    "nett_price": 0,
                    "discount": 0,
                    "total_price": this.state.total_all,
                    "insurance_total": 0,
                    "transaction_fee": 0,
                    "time_limit": "2020-09-01T11: 37: 27",
                    "contact": {
                        "title": customer[0].title,
                        "first_name": customer[0].firstname,
                        "last_name": customer[0].lastname,
                        "country_id": customer[0].nationality_id,
                        "country_name": customer[0].nationality,
                        "phone_code": customer[0].nationality_phone_code,
                        "phone_number": customer[0].phone,
                        "email": customer[0].email
                    },
                    "participant": participant,
                    "typeProduct": "hotelpackage"
                }
                var cartToBeSaved=dataCart;
                this.onSubmitOrder(cartToBeSaved);
            }else if(param.type=='activities'){
                var customer=this.state.listdata_customer;
                var product= this.state.product;
                var guest=this.state.listdata_participant;
                var param=this.state.param;
                var dataPrice=this.state.dataPrice;
                var productPart=this.state.productPart;
                
                var participant = [];
                var a=1;
                guest.map(item => {
                    var obj = {};
                                obj['key']= a,
                                obj['label']= 'Penumpang '+a+' = '+item['old'],
                                obj['old']= item['old'],
                                obj['fullname']= item['fullname'],
                                obj['firstname']= item['firstname'],
                                obj['lastname']= item['lastname'],
                                obj['birthday']= item['birthday'],
                                obj['nationality']= item['nationality'],
                                obj['passport_number']= item['passport_number'],
                                obj['passport_country']= item['passport_country'],
                                obj['passport_expire']= item['passport_expire'],
                                obj['phone']= item['phone'],
                                obj['title']= item['title'],
                                obj['email']= item['email'],
                                obj['nationality_id']= item['nationality_id'],
                                obj['nationality_phone_code']= item['nationality_phone_code'],
                                obj['passport_country_id']= item['passport_country_id']
                                
                    participant.push(obj);
                    a++;
                });
                    var dataCart={
                        "departure_date": param.DepartureDate,
                        "product":product,
                        "product_part":productPart,
                        "pax": [
                            {
                                "departure_baggage": 0,
                                "return_baggage": 0,
                                "loyalty_number": [],
                                "type": "ADT",
                                "type_name": "Adult",
                                "title": customer[0].title,
                                "first_name": customer[0].firstname,
                                "last_name": customer[0].lastname,
                                "dob": customer[0].birthday,
                                "nationality_code": customer[0].nationality_id,
                                "nationality_name": customer[0].nationality,
                                "identity_type": "passport",
                                "identity_type_name": customer[0].nationality,
                                "identity_number": customer[0].passport_number,
                                "identity_expired_date": customer[0].passport_expire,
                                "identity_issuing_country_code": customer[0].passport_country_id,
                                "identity_issuing_country_name": customer[0].passport_country_id
                            }
                        ],
                        "international": false,
                        "detail_price": [
                            {
                                "total_tax": 0,
                                "type": "",
                                "segment": "",
                                "total_price": this.state.total_all,
                                "nett_price": 0,
                                "commission_percent": 0,
                                "commission_amount": 0,
                                "insurance_code": null,
                                "insurance_name": null,
                                "insurance_company": null,
                                "insurance_program": null,
                                "insurance_fee": 0,
                                "insurance_total": 0,
                                "transaction_fee": 0,
                            }
                        ],
                        "id": "",
                        "adult": param.Adults,
                        "child": param.Children,
                        "infant": param.Infants,
                        "nett_price": 0,
                        "discount": 0,
                        "total_price": this.state.total_all,
                        "insurance_total": 0,
                        "transaction_fee": 0,
                        "time_limit": "2020-09-01T11: 37: 27",
                        "contact": {
                            "title": customer[0].title,
                            "first_name": customer[0].firstname,
                            "last_name": customer[0].lastname,
                            "country_id": customer[0].nationality_id,
                            "country_name": customer[0].nationality,
                            "phone_code": customer[0].nationality_phone_code,
                            "phone_number": customer[0].phone,
                            "email": customer[0].email
                        },
                        "participant": participant,
                        "typeProduct": "activities"
                    }
                    var cartToBeSaved=dataCart;
                    //console.log('cartToBeSaved',JSON.stringify(cartToBeSaved));
                    this.onSubmitOrder(cartToBeSaved);
            
        }else{

            var param=this.state.param;
            var customer=this.state.listdata_customer;
            var guest=this.state.listdata_participant;
            var departurePost=this.state.departurePost;
            var returnPost=this.state.returnPost;
            var dataPrice=this.state.dataPrice;
            var departurePrice=dataPrice.detail_price[0];
            var returnPrice=dataPrice.detail_price[1];
            
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
                "insurance_included":this.state.insurance_included,

            };

            ////console.log('--parameter cartSSSSSS--');
            ////console.log(JSON.stringify(paramGetCart));
            ////console.log('------------------');

            
                this.setState({ loading_spinner: true }, () => {
                this.setState({loading_spinner_file:require("app/assets/loader_flight.json")});
                this.setState({loading_spinner_title:'Connecting to Maskapai'});
                
    
                AsyncStorage.getItem('config', (error, result) => {
                    if (result) {    
                        
                        
                        let config = JSON.parse(result);
                        var access_token=config.token;
                        var url=config.aeroUrl;
        
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
                        
                        ////console.log('paramcart',raw);
                        
                        PostDataNew(url,'flight/Cart',requestOptions)
                                     .then((result) => {
                                        // ////console.log("---------------cart  ------------");
                                        // ////console.log(JSON.stringify(result));
                                        //this.setState({ loading_spinner: false });

                                        if(result.errors){
                                            this.dropdown.alertWithType('error', 'Error', JSON.stringify(result.errors));
                                        }else if(result.status==="error"){
                                            this.dropdown.alertWithType('error', 'Error', JSON.stringify(result.message));
                                        }else if(result.status==="success"){
                                            var dataCartArray = [];
                                            var dataCart = {};
                                            var dataCart=result.data;
            
                                                var cartToBeSaved = dataCart;
                                                cartToBeSaved.participant=this.state.listdata_participant;
                                                cartToBeSaved.typeProduct=this.state.param.type;
                                                
                                                this.onSubmitOrder(cartToBeSaved);
                                        }
                                     },
                                     (error) => {
                                         this.setState({ error });
                                     }
                        ); 
        
                        
                        
                        
                    }
                });

            });


        }

    }

    onSubmit() {
        
        this.saveParticipant();
        this.submitOrder();
       
      
        
    }
    
    
    
    
    onSubmitOrder(cartToBeSaved){
        var item=cartToBeSaved;
        this.setState({loading_spinner_file:require("app/assets/loader_wait.json")});
        this.setState({loading_spinner_title:'Create Order'});
        //this.setState({ loading: true }, () => {
            AsyncStorage.getItem('config', (error, result) => {
                if (result) {    
                    let config = JSON.parse(result);
                    var access_token=config.token;
                    var midtransMethod=config.midtransMethod;
                    var path=config.user_order_submit.dir;
                    var url=config.baseUrl;
                    
                    var dataCartArrayRealSend={
                    "token":access_token,
                    "id_user":this.state.id_user,
                    "dataCart":item,
                    "type":this.state.param.type,
                    "tokenFirebase":this.state.tokenFirebase,
                    "fee":0,
                    "insurance":this.state.insurance_included,
                    "param":this.state.param,
                    "otherUser":this.state.otherUser
                    }
                    
                    console.log("---------------data cart array cart kirim  ------------");
                    console.log(JSON.stringify(dataCartArrayRealSend));
                    console.log(url,path,JSON.stringify(dataCartArrayRealSend));

             
                    
                    var myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");


                    var raw = JSON.stringify(dataCartArrayRealSend);
                    var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                    };
                    PostDataNew(url,path,requestOptions)
                    .then((result) => {
                        this.setState({ loading_spinner: false });
                        this.updateUserSession();
                        var dataOrderSubmit=result;
                                
                                id_order=result.id_order;
                                pay=result.pay;
    
                                var redirect='Pembayaran';
                                var id_order=dataOrderSubmit.id_order;
                                
                                var param={
                                    id_order:id_order,
                                    dataPayment:{},
                                }
                                this.props.navigation.navigate("Loading",{redirect:redirect,param:param});
                                
                                // var param={
                                //     url:'https://masterdiskon.com/front/user/purchase/detail/'+id_order+'?access=app',
                                //     title:'Order Detail',
                                //     subTitle:id_order
                                // }
                                
                                // this.props.navigation.navigate("WebViewPage",{param:param});
                    });

                }
            });
        //});

    }

    
    
    
    updateUserSession(){
        
        //alert(otherUser);

       
            AsyncStorage.getItem('userSession', (error, result) => {
                if (result) {  
                    let userSession = JSON.parse(result);
                    ////console.log('userSession',JSON.stringify(userSession));
                    
                    
                    var customer=this.state.listdata_customer[0];
                    ////console.log('data contact',JSON.stringify(customer));

                    var otherUser=this.state.otherUser;
                    if(otherUser){
                        var newUserSession={
                            id_user: userSession.id_user,
                            fullname: userSession.fullname,
                            firstname: userSession.firstname,
                            lastname: userSession.lastname,
                            birthday: userSession.birthday,
                            nationality: userSession.nationality,
                            passport_number: userSession.passport_number,
                            passport_country: userSession.passport_country,
                            passport_expire: userSession.passport_expire,
                            phone: userSession.phone,
                            title: userSession.title,
                            email: userSession.email,
                            nationality_id: userSession.nationality_id,
                            nationality_phone_code:userSession.nationality_phone_code,
                            passport_country_id: userSession.passport_country_id,
                            username: userSession.username,
                            gender:userSession.gender,
                            un_nationality: userSession.un_nationality,
                            id_city: userSession.id_city,
                            city_name: userSession.city_name,
                            address: userSession.address,
                            postal_code: userSession.postal_code,
                            avatar: userSession.avatar,
                            cart: userSession.cart,
                            status: userSession.status,
                            loginVia: userSession.loginVia,
                        }
                       
                    }else{
                        

                        var newUserSession={
                            id_user: userSession.id_user,
                            fullname: customer['fullname'],
                            firstname: customer['firstname'],
                            lastname: customer['lastname'],
                            birthday: customer['birthday'],
                            nationality: customer['nationality'],
                            passport_number: customer['passport_number'],
                            passport_country: customer['passport_country'],
                            passport_expire: customer['passport_expire'],
                            phone: customer['phone'],
                            title: customer['title'],
                            email: userSession.email,
                            nationality_id: customer['nationality_id'],
                            nationality_phone_code: customer['nationality_phone_code'],
                            passport_country_id: customer['passport_country_id'],
                            username: userSession.username,
                            gender:userSession.gender,
                            un_nationality: userSession.un_nationality,
                            id_city: userSession.id_city,
                            city_name: userSession.city_name,
                            address: userSession.address,
                            postal_code: userSession.postal_code,
                            avatar: userSession.avatar,
                            cart: userSession.cart,
                            status: userSession.status,
                            loginVia: userSession.loginVia,
                        }


                    }
                
                    
                    ////console.log('newUserSession',JSON.stringify(newUserSession))
                    AsyncStorage.setItem('userSession', JSON.stringify(newUserSession));

                }
            });
        
    }



    saveParticipant(){
        AsyncStorage.getItem('userSession', (error, result) => {
            if (result) {
                let userSession = JSON.parse(result);
                ////console.log("---------------data session user  ------------");
                ////console.log(JSON.stringify(userSession));
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
                           
                var customers = [];
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

                    customers.push(obj);
                    a++;
                });    


                const data={  
                    "id_user": id_user,
                    "participant":participant,
                    "customer":customers
                }
                 const param={"param":data}



             
                        PostData('user/participant_save',param)
                            .then((result) => {
                                ////console.log("------------------result save profle-------------");

                            ////console.log(JSON.stringify(result));

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
        ////console.log("----------------validation participant------------------------------------");
        ////console.log(JSON.stringify(filtered));
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
        ////console.log("----------------validation participant------------------------------------");
        ////console.log(JSON.stringify(filtered));
        return jml;
    }

    validation(){
        var jml_empty_participant=this.validaton_participant();
        var jml_empty_customer=this.validaton_customer();

        ////console.log("----------------jml kosong participant------------------------------------");
        ////console.log(jml_empty_participant);

        ////console.log("----------------jml kosong customer------------------------------------");
        ////console.log(jml_empty_customer);

        if(jml_empty_participant == 0 && jml_empty_customer == 0 ){
                    ////console.log('perfect');
                    this.setState({colorButton:BaseColor.secondColor});
                    this.setState({colorButtonText:BaseColor.primaryColor});
                    this.setState({disabledButton:false});
        }else{
            ////console.log('not yet');
                this.setState({colorButton:BaseColor.greyColor});
                this.setState({colorButtonText:BaseColor.whiteColor});
                this.setState({disabledButton:true});
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
        type,
        old,
        old_select
        ){
    
            //console.log('old',old);
            //console.log('old_select',old_select);

    if(type=='guest'){
        if(old != old_select){
            //this.dropdown.alertWithType('error', 'Error', 'Data tamu harus sesuai berdasarkan umur');
            alert('Data tamu harus sesuai berdasarkan umur');
        }else{
            AsyncStorage.getItem('setDataParticipant', (error, result) => {
            if (result) {
                let resultParsed = JSON.parse(result);
                let persons=resultParsed;

                if(persons.some(person => person.fullname === fullname)){

                    //this.dropdown.alertWithType('error', 'Error', 'Data penumpang tidak boleh double');
                    alert('Data penumpang tidak boleh double');
                } else{
            
                    // alert("Object not found.");
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
                            }
                        : p
                    );
    
                    AsyncStorage.setItem('setDataParticipant',JSON.stringify(newProjects));
                    this.setState({listdata_participant:newProjects});
                    
                    setTimeout(() => {
                        //console.log('listdata_participantss',JSON.stringify(this.state.listdata_participant));
                    }, 500);
            
                }

                
                
            }
            });

        }
    
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
                        }
                    : p
                );
    
                AsyncStorage.setItem('setDataCustomer',JSON.stringify(newProjects));
                this.setState({listdata_customer:newProjects});
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
    
    //  getConfig(){
    //     this.setState({ loading_config: true }, () => {
    //         AsyncStorage.getItem('config', (error, result) => {
    //             if (result) {    
    //                 this.setState({loading_config: false });
    //                 let config = JSON.parse(result);
    //                 ////console.log('dataConfig',JSON.stringify(config));
    //                 this.setState({config:config});
    //             }
    //         });
    //     });
    // }



    componentDidMount() {

        var param=this.state.param;
        var typeProduct=param.type;
        var typeFlight=this.state.typeFlight;
        this.totalPrice();

        if(param.type=='flight'){
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


        AsyncStorage.getItem('userSession', (error, result) => {
            if (result) {  
            let userSession = JSON.parse(result);
            ////console.log('dataCustomer',JSON.stringify(userSession));
            var customer = [];
            for (var i=1; i<=1; i++) {
            var obj = {};
                obj['key'] = i;
                obj['label'] = "Contact";
                obj['old'] = 'adult';

                obj['fullname'] = userSession.fullname;
                obj['firstname'] = userSession.firstname;
                obj['lastname'] = userSession.lastname;
                obj['birthday'] = def_date_adult;
                obj['nationality'] = userSession.nationality;
                obj['passport_number'] = def_passport_number;
                obj['passport_country'] = def_passport_country;
                obj['passport_expire'] = def_passport_expire;
                obj['phone'] = userSession.phone;
                obj['title'] = userSession.title;
                obj['email'] = userSession.email;

                obj['nationality_id'] = userSession.nationality_id;
                obj['nationality_phone_code'] = userSession.nationality_phone_code;

                obj['passport_country_id'] = def_passport_country_id;


                customer.push(obj)
            }
            AsyncStorage.setItem('setDataCustomer',JSON.stringify(customer));
            this.setState({listdata_customer:customer});
            }
        });



        if(typeFlight=='domestic' || typeProduct=='trip')
        {
            def_passport_number=def_passport_number;
            def_passport_country=def_passport_country;
            def_passport_expire=def_passport_expire;
            def_phone=def_phone;
            def_email=def_email;
            def_passport_country_id=def_passport_country_id;
        }
        
        
        
        var participant = [];
        for (var i=1; i<=this.state.jumlahPenumpang; i++) {
            
            if(param.participant==true){
                if(this.state.arr_old[i]=='ADT'){
                    old='adult';
                }else if(this.state.arr_old[i]=='CHD'){
                    old='children';
                }else if(this.state.arr_old[i]=='INF'){
                    old='baby';
                }
            
            }else{
                old='adult';
            }
            
        var labeldetail='Penumpang ';
            if (param.type !='flight'){
                labeldetail='Treveller ';
            }
            
        var obj = {};
            obj['key'] = i;
            obj['label'] = labeldetail+i+" : "+old;
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

        participant.push(obj)
        }
        AsyncStorage.setItem('setDataParticipant',JSON.stringify(participant));
        this.setState({listdata_participant:participant});

    }    

 

    toggleSwitch = value => {
        
        
        
        this.setState({ reminders: value });
        var customer=this.state.listdata_customer[0];
        ////console.log('datacustomerswtich',JSON.stringify(customer));

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
        var type='guest';
        
        
        var paraVal={
            firstname:firstname,
            lastname:lastname,
            title:title,
            email:email,
            phone:phone,
            nationality:nationality,
            nationality_phone_code:nationality_phone_code,
            
            
        }
        ////console.log('paraVal',JSON.stringify(paraVal));
        
        if( 
            firstname == "" || 
            lastname =="" ||
            title == null ||
            email =="" ||
            phone =="" ||
            nationality == null ||
            nationality_phone_code == null
        ){
        
            alert('Pastikan Detail Pemesan Terisi Semua');
            this.setState({ reminders: false });
        }else{
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
                type
            );
        }
        
        

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


    toggleSwitchInsurance = value => {
        this.setState({ remindersInsurance: value });
        if(value==true){
            //alert(value);
            var total_all=parseInt(this.state.dataPrice.total_price)+parseInt(this.state.dataPrice.insurance_total);
            this.setState({total_all:total_all});
            this.setState({insurance_included:true});
        }else{
            //alert(value);
            var total_all=parseInt(this.state.dataPrice.total_price);
            this.setState({total_all:total_all});
            this.setState({insurance_included:false});
        }
    };

   

    toggleSwitchOtherUser = value => {
        this.setState({ remindersOtherUser: value });
        ////console.log('status pengguna lain',value);
        if(value==true){
            this.setState({otherUser:true});
        }else{
            this.setState({otherUser:false});
        }
    };


    render() {
        const { navigation } = this.props;
        let { param,product,productPart,selectDataDeparture,selectDataReturn,dataPrice, packageItem, packageItemDetail,loading, loading_spinner,userData,loading_spinner_file,loading_spinner_title } = this.state;
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
        const { flights, refreshing, clampedScroll } = this.state;
       

        const contentFormCustomer = this.state.listdata_customer.map((item) => {
            return (
                <View style={styles.contentProfile}>
                <ProfileDetail
                    textFirst={item.label}
                    textSecond={item.fullname}
                    icon={'pencil-alt'}
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
                        typeProduct:this.state.param.type
      
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
                            old:item.old,
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
                    icon={'pencil-alt'}
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
                        typeProduct:this.state.param.type
      
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
                            old:item.old,
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
        if(this.state.param.type=='trip')
        {
            contentProduct=<View style={{flexDirection:'row',flex: 10,justifyContent: "flex-start",alignItems: "center"}}>
                            <View style={{ flex: 3,flexDirection: "row",justifyContent: "flex-start",alignItems: "center"}}>
                                <View>
                                    <Image
                                        style={{width: 70, height: 70, marginRight: 10, borderRadius: 16}}
                                        resizeMode="contain"
                                        source={{uri: this.state.product.img_featured_url}}
                                    />
                                </View>
                            </View>
                            <View style={{flex: 9}}>
                                   
                                <View>
                                    <View>
                                        <Text>
                                            {this.state.product.product_name}
                                        </Text>
                                        <Text body3 style={{color:BaseColor.prima}}>
                                            {this.state.product.product_detail.country_name}
                                        </Text>
                                        <Text body3 style={{color:BaseColor.prima}}>
                                            {param.DepartureDate}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
        }else if(this.state.param.type=='hotelpackage'){
            contentProduct=<View style={{flexDirection:'row',flex: 10,justifyContent: "flex-start",alignItems: "center"}}>
                            <View style={{ flex: 3,flexDirection: "row",justifyContent: "flex-start",alignItems: "center"}}>
                                <View>
                                    <Image
                                        style={{width: 70, height: 70, marginRight: 10, borderRadius: 16}}
                                        resizeMode="contain"
                                        source={{uri: this.state.product.img_featured_url}}
                                    />
                                </View>
                            </View>
                            <View style={{flex: 9}}>
                                   
                                <View>
                                    <View>
                                        <Text>
                                            {this.state.product.product_name}
                                        </Text>
                                        <Text body3 style={{color:BaseColor.prima}}>
                                            {this.state.productPart.detail_name}
                                        </Text>
                                        <Text body3 style={{color:BaseColor.prima}}>
                                            {param.DepartureDate}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
        }else if(this.state.param.type=='activities'){
            contentProduct=<View style={{flexDirection:'row',flex: 10,justifyContent: "flex-start",alignItems: "center"}}>
                            <View style={{ flex: 3,flexDirection: "row",justifyContent: "flex-start",alignItems: "center"}}>
                                <View>
                                    <Image
                                        style={{width: 70, height: 70, marginRight: 10, borderRadius: 16}}
                                        resizeMode="contain"
                                        source={{uri: this.state.product.img_featured_url}}
                                    />
                                </View>
                            </View>
                            <View style={{flex: 9}}>
                                   
                                <View>
                                    <View>
                                        <Text>
                                            {this.state.product.product_name}
                                        </Text>
                                        <Text body3 style={{color:BaseColor.prima}}>
                                            {this.state.productPart.detail_name}
                                        </Text>
                                        <Text body3 style={{color:BaseColor.prima}}>
                                            {param.DepartureDate}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>

        }else{
        
            var dataDeparture=<View style={{flexDirection: "row",marginTop: 10,justifyContent: "space-between"}}>
                                <View style={{flexDirection: "row", alignItems: "center"}}>
                                    <Image
                                        style={{width: 32, height: 32, marginRight: 10, borderRadius: 16}}
                                        resizeMode="contain"
                                        source={{uri: this.state.selectDataDeparture.flight_schedule[0].airline_logo}}
                                    />
                                    <View>
                                        <Text body1>
                                            {this.state.selectDataDeparture.flight_schedule[0].airline_name}
                                        </Text>
                                        <Text body3>
                                            {this.state.selectDataDeparture.flight_schedule[0].from} - 
                                            {this.state.selectDataDeparture.flight_schedule[0].to} | 
                                            {this.state.selectDataDeparture.flight_schedule[0].departure_date} 
                                            {this.state.selectDataDeparture.flight_schedule[0].departure_time}
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={{ flexDirection: "row", alignItems: "flex-end" }}
                                >
                                    <Text title3 semibold primaryColor>
                                        Departure
                                    </Text>
                                </View>
                            </View>
            
    
            var dataReturn=null;
            if(this.props.navigation.state.params.selectDataReturn){
                dataReturn=<View style={{flexDirection: "row",marginTop: 10,justifyContent: "space-between"}}>
                            <View style={{flexDirection: "row", alignItems: "center"}}>
                                <Image
                                    style={{width: 32, height: 32, marginRight: 10, borderRadius: 16}}
                                    resizeMode="contain"
                                    source={{uri: this.state.selectDataReturn.flight_schedule[0].airline_logo}}
                                />
                                <View>
                                    <Text body1>
                                        {this.state.selectDataReturn.flight_schedule[0].airline_name}
                                    </Text>
                                    <Text body3>
                                        {this.state.selectDataReturn.flight_schedule[0].from} - 
                                        {this.state.selectDataReturn.flight_schedule[0].to} | 
                                        {this.state.selectDataReturn.flight_schedule[0].departure_date} 
                                        {this.state.selectDataReturn.flight_schedule[0].departure_time}
                                    </Text>
                                </View>
                            </View>
                            <View
                                style={{ flexDirection: "row", alignItems: "flex-end" }}
                            >
                                <Text title3 semibold primaryColor>
                                    Return
                                </Text>
                            </View>
                        </View>
            }
            
            contentProduct=<View><FlightPlan
                            round={this.state.param.IsReturn}
                            fromCode={this.state.param.Origin}
                            toCode={this.state.param.Destination}
                            from={this.state.param.bandaraAsalLabel}
                            to={this.state.param.bandaraTujuanLabel}
                        />
                        
                            
                            {dataDeparture}
                            {dataReturn}
                            
                        </View>
                        
                        
        }


        var contentPrice=<View></View>
        var contentCicil=<View></View>
        if(this.state.param.type=='trip')
        {   
            contentCicil=<View style={{paddingVertical:10,paddingHorizontal:10,}}>
                            <View style={{
                                borderColor: BaseColor.greyColor,
                                borderStyle: "dashed",
                                borderRadius: 8,
                                borderWidth: 1}}>
                            <View style={{flexDirection:'row',paddingLeft:20,paddingRight:20,paddingTop:5,paddingBottom:5}} >
                                <View style={{flexDirection:'row',flex: 10,justifyContent: "flex-start",alignItems: "center"}}>
                                    <View style={{ flex: 5,flexDirection: "row",justifyContent: "flex-start",alignItems: "center"}}>
                                        <View>
                                            <Text footnote grayColor numberOfLines={1}>
                                                Pembayaran 1
                                            </Text>
                                        
                                        </View>
                                    </View>
                                    <View style={{flex: 5,justifyContent: "center",alignItems: "flex-end"}}>
                                            <Text headline semibold numberOfLines={1}>
                                            {'IDR '+priceSplitter(parseInt(this.state.total_all)/2)}
                                            </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{flexDirection:'row',paddingLeft:20,paddingRight:20,paddingTop:5,paddingBottom:5}} >
                                <View style={{flexDirection:'row',flex: 10,justifyContent: "flex-start",alignItems: "center"}}>
                                    <View style={{ flex: 5,flexDirection: "row",justifyContent: "flex-start",alignItems: "center"}}>
                                        <View>
                                            <Text footnote grayColor numberOfLines={1}>
                                                Pembayaran 2
                                            </Text>
                                        
                                        </View>
                                    </View>
                                    <View style={{flex: 5,justifyContent: "center",alignItems: "flex-end"}}>
                                            <Text headline semibold numberOfLines={1}>
                                            {'IDR '+priceSplitter(parseInt(this.state.total_all)/2)}
                                            </Text>
                                    </View>
                                </View>
                            </View>
            
                            </View>
                        </View>
            contentPrice=<View>
                <View style={{flexDirection:'row',paddingLeft:20,paddingRight:20,paddingTop:5,paddingBottom:5}} >
                    <View style={{flexDirection:'row',flex: 10,justifyContent: "flex-start",alignItems: "center"}}>
                        <View style={{ flex: 6,flexDirection: "row",justifyContent: "flex-start",alignItems: "center"}}>
                            <View>
                                <Text footnote grayColor numberOfLines={1}>
                                    Subtotal
                                </Text>
                            </View>
                        </View>
                        <View style={{flex: 6,justifyContent: "center",alignItems: "flex-end"}}>
                               
                                <Text headline semibold numberOfLines={1}>
                                {'IDR '+priceSplitter(this.state.param.totalPrice)}
                                </Text>
                        </View>
                    </View>
                </View>


                <View style={{flexDirection:'row',paddingLeft:20,paddingRight:20,paddingTop:5,paddingBottom:5}} >
                    <View style={{flexDirection:'row',flex: 10,justifyContent: "flex-start",alignItems: "center"}}>
                        <View style={{ flex: 5,flexDirection: "row",justifyContent: "flex-start",alignItems: "center"}}>
                            <View>
                                <Text footnote grayColor numberOfLines={1}>
                                    Total
                                </Text>
                            
                            </View>
                        </View>
                        <View style={{flex: 5,justifyContent: "center",alignItems: "flex-end"}}>
                                <Text headline semibold numberOfLines={1}>
                                {'IDR '+priceSplitter(this.state.total_all)}
                                </Text>
                        </View>
                    </View>
                </View>
                {contentCicil}
            </View>
        }else if(this.state.param.type=='hotelpackage'){   
           
            contentPrice=<View>
                <View style={{flexDirection:'row',paddingLeft:20,paddingRight:20,paddingTop:5,paddingBottom:5}} >
                    <View style={{flexDirection:'row',flex: 10,justifyContent: "flex-start",alignItems: "center"}}>
                        <View style={{ flex: 6,flexDirection: "row",justifyContent: "flex-start",alignItems: "center"}}>
                            <View>
                                <Text footnote grayColor numberOfLines={1}>
                                    Subtotal
                                </Text>
                            </View>
                        </View>
                        <View style={{flex: 6,justifyContent: "center",alignItems: "flex-end"}}>
                               
                                <Text headline semibold numberOfLines={1}>
                                {'IDR '+priceSplitter(this.state.param.totalPrice)}
                                </Text>
                        </View>
                    </View>
                </View>


                <View style={{flexDirection:'row',paddingLeft:20,paddingRight:20,paddingTop:5,paddingBottom:5}} >
                    <View style={{flexDirection:'row',flex: 10,justifyContent: "flex-start",alignItems: "center"}}>
                        <View style={{ flex: 5,flexDirection: "row",justifyContent: "flex-start",alignItems: "center"}}>
                            <View>
                                <Text footnote grayColor numberOfLines={1}>
                                    Total
                                </Text>
                            
                            </View>
                        </View>
                        <View style={{flex: 5,justifyContent: "center",alignItems: "flex-end"}}>
                                <Text headline semibold numberOfLines={1}>
                                {'IDR '+priceSplitter(this.state.total_all)}
                                </Text>
                        </View>
                    </View>
                </View>
                
            </View>
        }else if(this.state.param.type=='activities'){   
           
            contentPrice=<View>
                <View style={{flexDirection:'row',paddingLeft:20,paddingRight:20,paddingTop:5,paddingBottom:5}} >
                    <View style={{flexDirection:'row',flex: 10,justifyContent: "flex-start",alignItems: "center"}}>
                        <View style={{ flex: 6,flexDirection: "row",justifyContent: "flex-start",alignItems: "center"}}>
                            <View>
                                <Text footnote grayColor numberOfLines={1}>
                                    Subtotal
                                </Text>
                            </View>
                        </View>
                        <View style={{flex: 6,justifyContent: "center",alignItems: "flex-end"}}>
                               
                                <Text headline semibold numberOfLines={1}>
                                {'IDR '+priceSplitter(this.state.param.totalPrice)}
                                </Text>
                        </View>
                    </View>
                </View>


                <View style={{flexDirection:'row',paddingLeft:20,paddingRight:20,paddingTop:5,paddingBottom:5}} >
                    <View style={{flexDirection:'row',flex: 10,justifyContent: "flex-start",alignItems: "center"}}>
                        <View style={{ flex: 5,flexDirection: "row",justifyContent: "flex-start",alignItems: "center"}}>
                            <View>
                                <Text footnote grayColor numberOfLines={1}>
                                    Total
                                </Text>
                            
                            </View>
                        </View>
                        <View style={{flex: 5,justifyContent: "center",alignItems: "flex-end"}}>
                                <Text headline semibold numberOfLines={1}>
                                {'IDR '+priceSplitter(this.state.total_all)}
                                </Text>
                        </View>
                    </View>
                </View>
                
            </View>
        }else{
            contentPrice=<View>
                <View style={{flexDirection:'row',paddingLeft:20,paddingRight:20,paddingTop:5,paddingBottom:5}} >
                    <View style={{flexDirection:'row',flex: 10,justifyContent: "flex-start",alignItems: "center"}}>
                        <View style={{ flex: 5,flexDirection: "row",justifyContent: "flex-start",alignItems: "center"}}>
                            <View>
                                <Text footnote grayColor numberOfLines={1}>
                                    Subtotal
                                </Text>
                            </View>
                        </View>
                        <View style={{flex: 5,justifyContent: "center",alignItems: "flex-end"}}>
                               
                                <Text headline semibold numberOfLines={1}>
                                {'IDR '+priceSplitter(this.state.dataPrice.total_price)}
                                </Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={{flex: 2}}
                        onPress={() => {
                            navigation.navigate("PricingTable",{
                                dataPrice:this.state.dataPrice
                            });
                            }
                        }
                    >
                                     <Icon
                                        name="angle-down"
                                        size={18}
                                        color={BaseColor.primaryColor}
                                        style={{ textAlign: "center"}}
                                    />
                    </TouchableOpacity>
                </View>



                <View style={{flexDirection:'row',paddingLeft:20,paddingRight:20,paddingTop:5,paddingBottom:5}} >
                    <View style={{flexDirection:'row',flex: 10,justifyContent: "flex-start",alignItems: "center"}}>
                        <View style={{ flex: 5,flexDirection: "row",justifyContent: "flex-start",alignItems: "center"}}>
                            <View>
                                <Text footnote grayColor numberOfLines={1}>
                                    Insurance
                                </Text>
                            
                            </View>
                        </View>
                        <View style={{flex: 5,justifyContent: "center",alignItems: "flex-end"}}>
                               
                                <Text headline semibold numberOfLines={1}>
                                {'IDR '+priceSplitter(this.state.dataPrice.insurance_total)}
                                </Text>
                        </View>
                    </View>
                    <View
                        style={{flex: 2,justifyContent: "center",alignItems: "flex-end"}}
                    >
                                <Switch name="angle-right" 
                                    size={18} 
                                    onValueChange={this.toggleSwitchInsurance}
                                    value={this.state.remindersInsurance}
                                />
                    </View>
                </View>


                {/* <View style={{flexDirection:'row',paddingLeft:20,paddingRight:20,paddingTop:5,paddingBottom:5}} >
                    <View style={{flexDirection:'row',flex: 10,justifyContent: "flex-start",alignItems: "center"}}>
                        <View style={{ flex: 5,flexDirection: "row",justifyContent: "flex-start",alignItems: "center"}}>
                            <View>
                                <Text footnote grayColor numberOfLines={1}>
                                    Fee
                                </Text>
                            
                            </View>
                        </View>
                        <View style={{flex: 5,justifyContent: "center",alignItems: "flex-end"}}>
                               
                                <Text headline semibold numberOfLines={1}>
                                {'IDR '+priceSplitter(this.state.fee)}
                                </Text>
                        </View>
                    </View>
                </View> */}
                
                
                <View style={{flexDirection:'row',paddingLeft:20,paddingRight:20,paddingTop:5,paddingBottom:5}} >
                    <View style={{flexDirection:'row',flex: 10,justifyContent: "flex-start",alignItems: "center"}}>
                        <View style={{ flex: 5,flexDirection: "row",justifyContent: "flex-start",alignItems: "center"}}>
                            <View>
                                <Text footnote grayColor numberOfLines={1}>
                                    Total
                                </Text>
                            
                            </View>
                        </View>
                        <View style={{flex: 5,justifyContent: "center",alignItems: "flex-end"}}>
                               
                                <Text headline semibold numberOfLines={1}>
                                {'IDR '+priceSplitter(this.state.total_all)}
                                </Text>
                        </View>
                    </View>
                </View>
            </View>

        }


        var contentButton=<View style={{ padding: 20,borderRadius: 8,width: "100%",marginBottom:50}}>
                <TouchableOpacity  disabled={this.state.disabledButton} onPress={() => 
                    {
                        this.onSubmit()
                    }} >
                <View pointerEvents='none' style={styles.groupinput}>       
                    <Button
                            loading={this.state.loading}
                            style={{backgroundColor:this.state.colorButton}}
                            full
                        >
                            <Text style={{color:this.state.colorButtonText}}>Book Now</Text>
                    </Button>
                </View> 
                </TouchableOpacity>
            </View>

    
        var labeldetail='Detail Penumpang';
            if (param.type !='flight'){
                labeldetail='Detail Treveller';
            }
          
        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >   
               
                <Header
                    title="Booking"
                    renderLeft={() => {
                        return (
                            <Icon
                                name="arrow-left"
                                size={20}
                                color={BaseColor.blackColor}
                            />
                        );
                    }}
                    onPressLeft={() => {
                        navigation.goBack();
                    }}
                />
                 {
                            loading_spinner ? 
                            
                            <View style={{flex: 1,backgroundColor:  "#FFFFFF",justifyContent: "center",alignItems: "center"}}>
                                <View
                                    style={{
                                        position: "absolute",
                                        top: 220,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}
                                >
                                    
                                    <AnimatedLoader
                                        visible={true}
                                        overlayColor="rgba(255,255,255,0.1)"
                                        //source={require("app/assets/loader_paperline.json")}
                                        source={loading_spinner_file}
                                        animationStyle={{width: 250,height: 250}}
                                        speed={1}
                                      />
                                    <Text>
                                        {loading_spinner_title}
                                    </Text>
                                </View>
                            </View>
                            :
                <ScrollView>
                    <View style={styles.contain}>
                        {contentProduct}
                        <View style={styles.line} />
                        {/* --------------------------------- */}

                        <Text title3 style={{ paddingVertical: 10,fontSize: 12 }}>
                            Detail Pemesan
                        </Text>
                        {contentFormCustomer}
                        <View style={{flexDirection:'row',marginTop:-10}} >
                            <View style={{flexDirection:'row',flex: 10,justifyContent: "flex-start",alignItems: "center"}}>
                                    <View>
                                        <Text footnote grayColor numberOfLines={1}>
                                            Order Sebagai Pengguna Lain
                                        </Text>
                                    
                                    </View>
                            </View>
                            <View
                                style={{flex: 2,justifyContent: "center",alignItems: "flex-end"}}
                            >
                                        <Switch name="angle-right" 
                                            size={18} 
                                            onValueChange={this.toggleSwitchOtherUser}
                                            value={this.state.remindersOtherUser}
                                        />
                            </View>
                        </View>
                        <View style={styles.line} />
                       

                        {/* --------------------------------- */}

                        <Text title3 style={{ paddingVertical: 10,fontSize: 12 }}>
                            {labeldetail}
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
            }
            <DropdownAlert ref={ref => this.dropdown = ref} messageNumOfLines={10} closeInterval={10000} />
            </SafeAreaView>
        );
    }
}
