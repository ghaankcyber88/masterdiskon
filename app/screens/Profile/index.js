import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity, Switch,Animated,AsyncStorage } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { AuthActions } from "@actions";
import { BaseStyle, BaseColor, BaseSetting,Images } from "@config";
import { Image } from "@components";
import {
    Header,
    SafeAreaView,
    Icon,
    Text,
    Button,
    ProfileDetail,
    ProfilePerformance
} from "@components";
import styles from "./styles";

import * as Utils from "@utils";
// Load sample data
import { UserData } from "@data";

import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-community/google-signin';
  import NotYetLogin from "../../components/NotYetLogin";
  import CardCustomProfile from "../../components/CardCustomProfile";

class Profile extends Component {
    constructor(props) {
        super();
        this.state = {
            reminders: false,
            loading: false,
            userData: UserData[0],

            heightHeader: Utils.heightHeader(),

            userSession:{},
            id_user:"",
            loading_spinner:false,
            login:false,
            loading: false,
        };
        this._deltaY = new Animated.Value(0);
        this.updateParticipant = this.updateParticipant.bind(this);
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
                console.log('getSessions',userSession);
                var id_user=userSession.id_user;
                this.setState({id_user:id_user});
                this.setState({userSession:userSession});
                this.setState({login:true});

                setTimeout(() => {
                    console.log("------DATA getSessions----");
                    console.log(JSON.stringify(this.state.userSession));
                }, 500);
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
            const { navigation } = this.props;
            var userSession={
                address:null,
                avatar:null,
                birthday:"",
                cart:"",
                city_name:null,
                email:"matadesaindotcom@gmail.com",
                firstname:"arif",
                fullname:"Mr arif pambudi",
                gender:"",
                id_city:null,
                id_user:"258",
                lastname:"pambudi",
                loginVia:"google",
                nationality:"Indonesia",
                nationality_id:"ID",
                nationality_phone_code:"62",
                passport_country:"",
                passport_country_id:"ID",
                passport_expire:"",
                passport_number:"",
                phone:"79879879879",
                postal_code:null,
                status:"customer",
                title:"Mr",
                un_nationality:null,
                username:"arifpambudi"
            };
            // this.setState({userSession:userSession});
            AsyncStorage.setItem('userSession', JSON.stringify(userSession));

            var redirect='Profile';
            var param={}
            navigation.navigate("Loading",{redirect:redirect,param:param});




  }



    onLogOut() {
        var loginVia=this.state.userSession.loginVia;
        if(loginVia=='form'){

            AsyncStorage.removeItem('userSession');
            this.setState({ loading: true }, () => {
                this.setState({ loading: false });
                setTimeout(() => {
                    this.authentication('Profile');
                }, 1000);

            });    
        }else if(loginVia=='google'){
            this._signOut();
            AsyncStorage.removeItem('userSession');
            this.setState({ loading: true }, () => {
                this.setState({ loading: false });
                setTimeout(() => {
                    this.authentication('Profile');
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


    /**
     * @description Call when reminder option switch on/off
     */
    toggleSwitch = value => {
        this.setState({ reminders: value });
    };

    componentDidMount() {
        this.getConfig();
        this.getSession();
        this.setUser();
    }

    render() {
        const { navigation } = this.props;
        const { userData, loading,login,loading_spinner,userSession,heightHeader } = this.state;

        const heightImageBanner = Utils.scaleWithPixel(140);
        const marginTopBanner = heightImageBanner - heightHeader-50;
        return (
            <View style={{ flex: 1 }}>
           <Animated.Image
                    // source={Images.trip3}
                    //source={{uri : 'https://images.unsplash.com/photo-1555980483-93e7b3529e1a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'}}
                    style={[
                        styles.imageBackground,
                        {
                            height: this._deltaY.interpolate({
                                inputRange: [
                                    0,
                                    Utils.scaleWithPixel(100),
                                    Utils.scaleWithPixel(100)
                                ],
                                outputRange: [
                                    heightImageBanner,
                                    heightHeader,
                                    0
                                ]
                            })
                        }
                    ]}
                />
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                { <Header
                    title="Profile"
                    renderLeft={() => {
                        return (
                            <Icon
                                name="arrow-left"
                                size={20}
                                color={BaseColor.blackColor}
                            />
                        );
                    }}
                    // renderRight={() => {
                    //     return (
                    //         <Icon
                    //             name="bell"
                    //             size={24}
                    //             color={BaseColor.primaryColor}
                    //         />
                    //     );
                    // }}
                    // renderRightSecond={() => {
                    //     return (
                    //         <Icon
                    //             name="envelope"
                    //             size={24}
                    //             color={BaseColor.primaryColor}
                    //         />
                    //     );
                    // }}
                    onPressLeft={() => {
                        navigation.goBack();
                    }}
                    onPressRight={() => {
                        navigation.navigate("Notification");
                    }}
                    onPressRightSecond={() => {
                        navigation.navigate("Messenger");
                    }}
                /> }

{   
                    login ? 
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
                <ScrollView 
                      onScroll={Animated.event([
                        {
                            nativeEvent: {
                                contentOffset: { y: this._deltaY }
                            }
                        }
                    ])}
                    onContentSizeChange={() =>
                        this.setState({
                            heightHeader: Utils.heightHeader()
                        })
                    }
                    scrollEventThrottle={8}
                
                >

                    <View style={{ alignItems: "center" }}>
                            <View style={[
                                    { marginTop: marginTopBanner }
                                ]}>
                                   
                            </View>
                            <View
                                    style={[
                                        styles.searchForm
                                    ]}
                                >
                                    <View>   
                                    {/* <Icon
                                                name="pencil-alt"
                                                size={18}
                                                color={BaseColor.primaryColor}
                                                style={{position: 'absolute', right: 0}}
                                    /> */}
                                    <Text
                                        title2
                                        semibold
                                        style={{ marginBottom: 7 }}
                                    >
                                         Hi, {this.state.userSession.firstname} {this.state.userSession.lastname} 
                                    </Text>
                                  
                                    <Text
                                        body2
                                        style={{
                                            marginTop: 7,
                                            textAlign: "center"
                                        }}
                                    >
                                        {this.state.userSession.email}
                                    </Text>
                                </View>
                            </View>

                        </View>
                       

                    <View style={styles.contain}>
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
                                    icon={'home'}
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
                                            // old:userSession.old,
                                            old:'',
                                            typeProduct:''
                                            
                                        
                                        });
                                    }}
                                
                                />

                            </View>
                        </View>
                    </View>
                    <View style={{ paddingLeft: 20,paddingRight:20 }}>
                        <Button
                            full
                            loading={loading}
                            onPress={() => this.onLogOut()}
                        >
                            Sign Out
                        </Button>
                    </View>
                </ScrollView>
          
                </View>
                 :
                  <NotYetLogin redirect={'Profile'} navigation={navigation} />
                 
      
     }

            </SafeAreaView>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(AuthActions, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);
