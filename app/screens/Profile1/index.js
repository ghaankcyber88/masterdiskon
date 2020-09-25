import React, { Component } from "react";
import { View, ScrollView, FlatList,AsyncStorage,TouchableOpacity} from "react-native";
import { BaseStyle, BaseColor } from "@config";
import {
    Image,
    Header,
    SafeAreaView,
    Icon,
    Text,
    HotelItem,
    Tag,
    ProfilePerformance,
    Card,
    Button
} from "@components";
import styles from "./styles";
import CardCustomProfile from "../../components/CardCustomProfile";
import NotYetLogin from "../../components/NotYetLogin";
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-community/google-signin';

// Load sample data
import { UserData, HotelData, TourData } from "@data";

export default class Profile1 extends Component {
    constructor(props) {
        super(props);

        // Temp data define
        this.state = {

            tours: TourData,
            hotels: HotelData,
            userData: UserData[0],
            listdata_customer:[{"key":1,"label":"Contact","old":"adult","fullname":"Mr arif pambudi","firstname":"arif","lastname":"pambudi","birthday":"","nationality":"Indonesia","passport_number":"","passport_country":"","passport_expire":"","phone":"79879879879","title":"Mr","email":"matadesaindotcom@gmail.com","nationality_id":"ID","nationality_phone_code":"62","passport_country_id":""}],
            login:false,
            userSession:{}
        };
        this.updateParticipant = this.updateParticipant.bind(this);
        this.updateParticipantPassword = this.updateParticipantPassword.bind(this);

    }


    getConfig(){    
        AsyncStorage.getItem('config', (error, result) => {
            if (result) {    
                let config = JSON.parse(result);
                console.log('getConfig',config);
                this.setState({config:config});
            }
        });
    }
    
    
    getSession(){    
        AsyncStorage.getItem('userSession', (error, result) => {
            if (result) {    
                let userSession = JSON.parse(result);
                console.log('getSession',userSession);
                var id_user=userSession.id_user;
                this.setState({id_user:id_user});
                this.setState({userSession:userSession});
                this.setState({login:true});
            }
        });
    }
    
    onLogOut() {
        var loginVia=this.state.userSession.loginVia;
        if(loginVia=='form'){

            AsyncStorage.removeItem('userSession');
            this.setState({ loading: true }, () => {
                this.setState({ loading: false });
                setTimeout(() => {
                    //this.authentication('Profile');
                    this.props.navigation.navigate("Loading",{redirect:'Profile'});
                }, 1000);

            });    
        }else if(loginVia=='google'){
            this._signOut();
            AsyncStorage.removeItem('userSession');
            this.setState({ loading: true }, () => {
                this.setState({ loading: false });
                setTimeout(() => {
                    //this.authentication('Profile');
                    this.props.navigation.navigate("Loading",{redirect:'Profile'});
                }, 1000);

            });        

        }
    }

    _signOut = async () => {
        try {
          //await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
          this.setState({ user: null }); // Remember to remove the user from your app's state as well
        } catch (error) {
          console.error(error);
        }
      };



    authentication(redirect='') {
        
        this.setState(
            {
                loading: true
            },
            () => {
                this.props.actions.authentication(true, response => {
                    if (response.success) {
                        this.props.navigation.navigate("Loading",{redirect:redirect});
                    } else {
                        this.setState({
                            loading: false
                        });
                    }
                });
            }
        );
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

     setUser(){
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
            var customer = [];
            for (var i=1; i<=1; i++) {
            var obj = {};
                obj['key'] = i;
                obj['label'] = "Contact";
                obj['old'] = 'adult';

                obj['fullname'] = userSession.fullname;
                obj['firstname'] = userSession.firstname;
                obj['lastname'] = userSession.lastname;
                obj['birthday'] = '';
                obj['nationality'] = userSession.nationality;
                obj['passport_number'] = '';
                obj['passport_country'] = '';
                obj['passport_expire'] = '';
                obj['phone'] = userSession.phone;
                obj['title'] = userSession.title;
                obj['email'] = userSession.email;

                obj['nationality_id'] = userSession.nationality_id;
                obj['nationality_phone_code'] = userSession.nationality_phone_code;

                obj['passport_country_id'] = '';


                customer.push(obj)
            }
            AsyncStorage.setItem('setDataCustomer',JSON.stringify(customer));
            this.setState({listdata_customer:customer});
            setTimeout(() => {
                console.log("------DATA CUSTOMER----");
                console.log(JSON.stringify(this.state.listdata_customer));
            }, 500);

            
            }
        });


     }
    componentDidMount(){
        // let {} = this.state;
        // const {navigation} = this.props;
        //     navigation.addListener ('didFocus', () =>{
        //         setTimeout(() => {
        //             this.setUser();
        //         }, 200);
        //     });
        this.getConfig();
        this.getSession();
        this.setUser();
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
        AsyncStorage.getItem('userSession', (error, result) => {
            if (result) {    
                let userSession = JSON.parse(result);
                console.log('getSession',userSession);
                var id_user=userSession.id_user;

                var userSessionUpdate={
                    address: userSession.address,
                    avatar: userSession.avatar,
                    birthday: birthday,
                    cart: userSession.cart,
                    city_name: userSession.city_name,
                    email: userSession.email,
                    firstname: firstname,
                    fullname: fullname,
                    gender: userSession.gender,
                    id_city: userSession.id_city,
                    id_user: userSession.id_user,
                    lastname: lastname,
                    loginVia: userSession.loginVia,
                    nationality: nationality,
                    nationality_id: nationality_id,
                    nationality_phone_code: nationality_phone_code,
                    passport_country: passport_country,
                    passport_country_id: passport_country_id,
                    passport_expire: passport_expire,
                    passport_number: passport_number,
                    phone: phone,
                    postal_code: userSession.postal_code,
                    status: userSession.status,
                    title: title,
                    un_nationality: userSession.un_nationality,
                    username: userSession.username,
                }
                AsyncStorage.setItem('userSession', JSON.stringify(userSessionUpdate));
                this.getSession();
            }
        });
  }

  updateParticipantPassword(
   passwordOld,passwordNew,passwordConfirm
    ){
        var data={
            passwordOld:passwordOld,
            passwordNew:passwordNew,
            passwordConfirm:passwordConfirm,

        }
        const param={"param":data}
        console.log('updateParticipantPassword',JSON.stringify(param));
    }


    render() {
        const { navigation } = this.props;
        let { tours, hotels, userData,userSession,login } = this.state;

        return (
            <SafeAreaView
            style={[BaseStyle.safeAreaView,{backgroundColor:BaseColor.bgColor}]}
            forceInset={{ top: "always" }}
            >
                <Header
                    title="Profile"
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
                 {
                    login ? 
                <ScrollView style={{ marginBottom: 20 }}>
                    {/* Profile Information */}
                    <View style={{ alignItems: "center" }}>
                        <Image source={userData.image} style={styles.image} />
                        <Text title1 semibold>
                            {userSession.fullname}
                        </Text>
                        <Text subhead grayColor>
                            {userSession.email}
                        </Text>
                        
                        {/* <View style={styles.location}>
                            <Icon
                                name="map-marker-alt"
                                size={10}
                                color={BaseColor.primaryColor}
                            />
                            <Text
                                caption1
                                primaryColor
                                style={{
                                    marginLeft: 3
                                }}
                            >
                                {userData.address}
                            </Text>
                        </View> */}
                        <Tag primary style={styles.tagFollow}
                        onPress={() => {
                            this.props.navigation.navigate("ProfileEdit",{
                                sourcePage:'profile',
                                key:1,
                                label:'',
                                fullname:userSession.fullname,
                                firstname:userSession.firstname,
                                lastname:userSession.lastname,
                                birthday:userSession.birthday,
                                nationality:userSession.nationality,
                                passport_number:userSession.passport_number,
                                passport_country:userSession.passport_country,
                                passport_expire:userSession.passport_expire,
                                phone:userSession.phone,
                                title:userSession.title,
                                email:userSession.email,

                                nationality_id:userSession.nationality_id,
                                nationality_phone_code:userSession.nationality_phone_code,
                                
                                passport_country_id:userSession.passport_country_id,

                                updateParticipant: this.updateParticipant,
                                type:'guest',
                                old:'',
                                typeProduct:''
                                
                            
                            });
                        }}
                        >
                            Edit
                        </Tag>
                    </View>
                    
                    
                    <View style={{ marginHorizontal: 20,marginTop:20}}>
                        <View style={{ width: "100%" }}>
                            <View style={{paddingBottom:50}}>
                                <CardCustomProfile 
                                    title={'QuickPick'}
                                    subtitle={'Pesenan lebih cepat, isi data penumpang, dengan satu klik'}
                                    icon={'home'}
                                    onPress={() => {
                                        this.props.navigation.navigate("ProfileSmart",{sourcePage:'profile'});
                                    }}
                                
                                />
                                <CardCustomProfile 
                                    title={'Ubah Kata Sandi'}
                                    subtitle={'Pesenan lebih cepat, isi data penumpang, dengan satu klik'}
                                    icon={'lock'}
                                    onPress={() => {
                                        this.props.navigation.navigate("ProfileEditPassword",{
                                            updateParticipantPassword: this.updateParticipantPassword,
                                        });
                                    }}
                                
                                />

                            </View>
                        </View>
                    </View>
                    
                    <View style={{ marginHorizontal: 20}}>
                        <Button
                            full
                            onPress={() => this.onLogOut()}
                        >
                            Sign Out
                        </Button>
                    </View>
                    
                   
                </ScrollView>
                :
                <NotYetLogin redirect={'Profile1'} navigation={navigation} />
            }
            </SafeAreaView>
        );
    }
}
