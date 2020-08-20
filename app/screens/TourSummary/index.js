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
        marginTop: 15,
        flexDirection: "row",
        // backgroundColor: BaseColor.fieldColor,
        marginBottom: 15
    },
    searchIcon: {
        flex: 1,
        borderRadius: 8,
        backgroundColor: BaseColor.fieldColor,
        padding: 10
    },
});

export default class TourSummary extends Component {
    constructor(props) {
        super(props);
        const scrollAnim = new Animated.Value(0);
        const offsetAnim = new Animated.Value(0);

        var param=this.props.navigation.state.params.param;
        var paramOther=this.props.navigation.state.params.paramOther;
        var product=this.props.navigation.state.params.product;
  

        // Here are the two dates to compare
        var date1 = param.DepartureDate;
        var date2 = param.ReturnDate;

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


        var amount = parseInt(param.Adults)+parseInt(param.Children)+parseInt(param.Infants);
        var biayaAdult=parseInt(param.Adults)*parseInt(product.harga);
        var biayaChildren=parseInt(param.Children)*parseInt(product.harga);
        var biayaInfants=parseInt(param.Infants)*(parseInt(product.harga)*0.2);
        var price=parseInt(biayaAdult)+parseInt(biayaChildren)+parseInt(biayaInfants);
        var total_price=parseInt(price)*parseInt(duration);

      
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


        this.state = {
            param:param,
            paramOther:paramOther,
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
            product:product,
            total_price:total_price,
            userData: UserData[0],

            colorButton:'grey',
            handlerButton:true,
            reminders: false,


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
                    //get payment
            }
        });
    
    }

    getPayment(cart_id){
        AsyncStorage.getItem('tokenAgi', (error, result) => {
            if (result) {    
                    
                    var access_token=result;
                    console.log("---------------token ------------");
                    console.log(access_token);
                    //get payment
                    var myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");
                    myHeaders.append("Authorization", "Bearer "+access_token);

                    
                    var raw = JSON.stringify({
                        "payment_name_id":"",
                        "payment_method_id":"",
                        "payment_channel_id":"",
                        "fee":0,"currency":"IDR",
                        "back_url":"http://dev.megaelectra.co.id/paymentconfirmation?token="+access_token,
                        "cart_id":[cart_id]});
                    console.log("---------------param payment ------------");
                    console.log(raw);
                    var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                    };

                    fetch("https://dev-api.megaelectra.co.id/payment/PaymentUniversal/switcherv3", requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        var dataPayment=result;
                        var paymentFlight=this.state.dataPayment.data.flight[0].data;
                        console.log(JSON.stringify(paymentFlight));
                        var orderId=paymentFlight.orderid;
                        console.log("---------------order id------------");
                        console.log(orderId);
                        //this.toPayment(orderId);
                        setTimeout(() => {
                            this.toPayment(orderId);
                        }, 500);
                    })
                    .catch(error => console.log('error', error));
                    //get payment
            }
        });

    }

    postOrder(dataCart,paramGetCart) {
        this.setState({ loading: true }, () => {
          var param=this.state.listdata_participant;
          var contact=this.state.listdata_customer[0];

    });
    
        
}


    onSubmit() {

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
                        obj['type'] = item.type;
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
                        obj['passport_country_phone_code'] = item.passport_country_phone_code;

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

                        PostData('api/submitbook_order_new',param)
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

  onSelect() {
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
                        console.log("---------------data price------------");
                        console.log(JSON.stringify(result));
                        this.setState({dataPrice:result});
                    })
                    .catch(error => console.log('error', error));
        }
    });

  

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
    componentDidMount() {
        let dt = new Date();
        dt = this.addDate(dt, -13, 'years');
        console.log(dt);
        var date = dt.getFullYear()+'-'+(dt.getMonth()+1)+'-'+dt.getDate();


        var customer = [];
        for (var i=1; i<=1; i++) {
        var obj = {};
            obj['key'] = i;
            obj['label'] = "Contact";
            obj['old'] = 'adult';

            obj['fullname'] = "";
            obj['firstname'] = "";
            obj['lastname'] = "";
            obj['birthday'] = date;
            obj['nationality'] = "";
            obj['passport_number'] = "";
            obj['passport_country'] = "";
            obj['passport_expire'] = "";
            obj['phone'] = "";
            obj['title'] = "";
            obj['email'] = "";

            obj['nationality_id'] = "";
            obj['nationality_phone_code'] = "";

            obj['passport_country_id'] = "";
            obj['passport_country_phone_code'] = "";

            customer.push(obj)
        }
        AsyncStorage.setItem('setDataCustomer',JSON.stringify(customer));
        this.setState({listdata_customer:customer});

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
            obj['passport_number'] = "";
            obj['passport_country'] = "";
            obj['passport_expire'] = "";
            obj['phone'] = "";
            obj['title'] = "";
            obj['email'] = "";

            obj['nationality_id'] = "";
            obj['nationality_phone_code'] = "";

            obj['passport_country_id'] = "";
            obj['passport_country_phone_code'] = "";

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
        var passport_country_phone_code=customer.passport_country_phone_code;
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
        passport_country_phone_code,
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
        var passport_country_phone_code='';
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
        passport_country_phone_code,
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
       

        const formCustomer = this.state.listdata_customer.map((item) => {
            return (
                <View style={styles.contentProfile}>
                <ProfileDetail
                    image={userData.image}
                    textFirst={item.label}
                    point={userData.point}
                    textSecond={item.fullname}
                    textThird={userData.id}
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
                    viewImage={false}
                    style={{ flex: 6, marginRight: 15 }}
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
        

        const formParticipant = this.state.listdata_participant.map((item) => {
            return (
                <View style={styles.contentProfile}>
                <ProfileDetail
                    image={userData.image}
                    textFirst={item.label}
                    point={userData.point}
                    textSecond={item.fullname}
                    textThird={userData.id}
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
                    viewImage={false}
                    style={{ flex: 6, marginRight: 15 }}
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
                    title="Trip Summary"
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
                 
                        <Text title3 style={{ paddingVertical: 10 }}>
                        Product Trip
                        </Text>
                        <Text body1 semibold>
                            {this.state.product['judul_trip']}
                        </Text>

                        <View style={styles.line} />
                        <Text title3 style={{ paddingVertical: 10 }}>
                            Detail Pemesan
                        </Text>
                        {formCustomer}
                        {/* <Animated.FlatList
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
                                                    type:'customer'
                                  
                                                  })}
                                                >
                                                    <FormOptionEdit
                                                    style={{marginBottom:10}}
                                                    label={item.label}
                                                    text={item.fullname}
                                                    />
                                                 </TouchableOpacity>
                                                
                                            )}
                                        /> */}

                        <View style={styles.line} />
                        <Text title3 style={{ paddingVertical: 10 }}>
                        Detail Penumpang
                        </Text>

                                            <View style={styles.profileItem}>
                                                <Text body1>Sama dengan pemesan</Text>
                                                <Switch
                                                    name="angle-right"
                                                    size={18}
                                                    onValueChange={this.toggleSwitch}
                                                    value={this.state.reminders}
                                                />
                                            </View>
                        {formParticipant}
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
                        <TouchableOpacity  disabled={this.state.handlerButton} onPress={() => 
                            {
                                this.onSubmit()
                            }} >
                        <View pointerEvents='none' style={styles.groupinput}>       
                        <Button
                        loading={loading}
                        full
                        style={{backgroundColor:this.state.colorButton}}
                        >
                        Add To Cart
                        </Button>
                        </View> 
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                </View>
            }
            <DropdownAlert ref={ref => this.dropdown = ref} messageNumOfLines={10} closeInterval={10000} />
            </SafeAreaView>
        );
    }
}
