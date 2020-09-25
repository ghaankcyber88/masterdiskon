import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthActions } from "@actions";
import { bindActionCreators } from "redux";
import { View, ScrollView, TouchableOpacity, TextInput,AsyncStorage } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, Text, Button } from "@components";
import styles from "./styles";
import DropdownAlert from 'react-native-dropdownalert';
import {PostData} from '../../services/PostData';
import ValidationComponent from 'react-native-form-validator';
import InputText from "../../components/InputText";
import { Form, TextValidator } from 'react-native-validator-form';

import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-community/google-signin';

  import { LoginButton, AccessToken } from 'react-native-fbsdk';


class SignIn extends ValidationComponent {
    constructor(props) {
        super(props);
        var redirect="";
        if(this.props.navigation.state.params && this.props.navigation.state.params.redirect){
            redirect=this.props.navigation.state.params.redirect;
        }

        
        if(this.props.navigation.state.params && this.props.navigation.state.params.param){
            var param=this.props.navigation.state.params.param;
        }else{
            var param='';
        }
        
        
        
        this.state = {
            email: "",
            password: "",
            loading: false,
            success: {
                email: true,
                password: true
            },
            redirect:redirect,
            
            
            colorButton:BaseColor.greyColor,
            colorButtonText:BaseColor.whiteColor,
            disabledButton:true,
            param:param
        };
        //this.handleChange = this.handleChange.bind(this);
        this.getConfig();
        this.getSession();
    }
    
    getConfig(){    
        AsyncStorage.getItem('config', (error, result) => {
            if (result) {    
                let config = JSON.parse(result);
                //console.log('getConfig',config);
                this.setState({config:config});
            }
        });
    }
    getSession(){    
        AsyncStorage.getItem('userSession', (error, result) => {
            if (result) {    
                let userSession = JSON.parse(result);
                var id_user=userSession.id_user;
                this.setState({id_user:id_user});
                this.setState({userSession:userSession});
                this.setState({login:true});
            }
        });
    }

    componentDidMount(){

        GoogleSignin.configure({
          scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
          webClientId: '280725445152-ulhq6j2enufgiedabbph68i2tg6clilm.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
          offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
          hostedDomain: '', // specifies a hosted domain restriction
          loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
          forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
          accountName: '', // [Android] specifies an account name on the device that should be used
          iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
        });
    
    
     this.getCurrentUserInfo();
    }

    getCurrentUserInfo = async () => {
        try {
          const userInfo = await GoogleSignin.signInSilently();
          this.setState({ userInfo });
          //this.props.navigation.navigate("Loading");
          this.authenticationCustom();
        } catch (error) {
           // alert('Belum Login');
          if (error.code === statusCodes.SIGN_IN_REQUIRED) {
            // user has not signed in yet
          } else {
            // some other error
          }
        }
    };

    
    _signIn= async ()=>{

        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            var email=userInfo.user.email;
            //alert(email);
            this.onLoginGoogle(userInfo);
            //alert(JSON.stringify(userInfo));
            //alert(userInfo.user);
            console.log(JSON.stringify(userInfo));
            //this.setState({ userInfo });
            //this.authenticationCustom();
          } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
              // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
              // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
              // play services not available or outdated
            } else {
              // some other error happened
            }
            //alert(JSON.stringify(error));
          }

    }


    onLoginGoogle(userInfo) {
        const { redirect,config } = this.state;
        const { navigation } = this.props;
        var email = userInfo.user.email;
        var sp = email.split('@');
        var username=sp[0];
        var url=config.baseUrl+"front/api/AuthLogin/login_proses_app_google";
        console.log('onLoginGoogle',url);
        
        this.setState({ loading: true }, () => {
            var data={
                "firstname":userInfo.user.givenName,
                "lastname":userInfo.user.familyName,
                "username":username,
                "password": "123456",
                "email":userInfo.user.email
                }

            const param={"param":data}

            console.log("------------------data param submit login--------------");
            console.log(JSON.stringify(param));
    
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify(param);
            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };

            fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                var userSession=result.userSession;
                userSession.loginVia = "google";
                this.setState({ loading: false });
                if(result.success==false){
                    this.dropdown.alertWithType('error', 'Error', JSON.stringify(result.message));
                }else if(result.success==true){
                    this.dropdown.alertWithType('success', 'Success', JSON.stringify(result.message));
                    AsyncStorage.setItem('userSession', JSON.stringify(userSession));
                    AsyncStorage.setItem('id_user', JSON.stringify(userSession.id_user));
                    var id_user=userSession.id_user;
                    setTimeout(() => {
                    this.authentication(redirect);
                    }, 500);
                   
               
                }

            })

            
        });
        
       
    
}



onSubmit() {
    const { email, password, success,redirect,config } = this.state;
    const { navigation } = this.props;
    errorMsg='';
    if(errorMsg==''){

        this.setState({ loading: true }, () => {
            var url=config.baseUrl;
            var url=config.baseUrl+"front/api/AuthLogin/login_proses_app";
            console.log('onLoginAppUrl',url);
            
    
            var data={"email":email,"password":password}
            const param={"param":data}

            console.log("------------------data param submit login--------------");
            console.log(JSON.stringify(param));
    
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify(param);
            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };

            fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                this.setState({ loading: false });
                console.log(JSON.stringify(result));
                if(result.success==false){
                    this.dropdown.alertWithType('error', 'Error', JSON.stringify(result.message));
                    //this.setState({ loading: false });
                }else if(result.success==true){
                    var userSession=result.userSession;
                    userSession.loginVia = "form";
                    this.dropdown.alertWithType('success', 'Success', JSON.stringify(result.message));
                    AsyncStorage.setItem('userSession', JSON.stringify(userSession));
                    AsyncStorage.setItem('id_user', JSON.stringify(userSession.id_user));
                    this.authentication(redirect);
                  
                }

            })
        });
        
       
    }
}


// getProfile(id_user) {
 
//     var id_user=id_user;           
//     // alert(id_user);
//     PostData('api/user',{"id_user":id_user})
//         .then((result) => {
//             console.log("-------------GET profile--------------")
//             AsyncStorage.setItem('profile', JSON.stringify(result));
//             this.getSmartProfile(id_user);
//         },
//         (error) => {
//             this.setState({ error });
//         }
//     );

// }



// getSmartProfile(id_user){
//     var id_user=id_user;

    
//         var myHeaders = new Headers();

//         var requestOptions = {
//         method: 'GET',
//         headers: myHeaders,
//         redirect: 'follow'
//         };

//         fetch("https://masterdiskon.com/front/api/api/get_participant?id_user="+id_user, requestOptions)
//         .then(response => response.text())
//         .then(result => {
            
//             console.log(result)
//             this.getBookingHistory(id_user);
//         }
            
//             )
//         .catch(error => console.log('error', error));
// }


// getBookingHistory(id_user) {
 
            
//             var id_user=id_user;
//                 var myHeaders = new Headers();
        
//                 var requestOptions = {
//                 method: 'GET',
//                 headers: myHeaders,
//                 redirect: 'follow'
//                 };
        
//                 fetch("https://masterdiskon.com/front/api/api/get_booking_history?id="+id_user, requestOptions)
//                 .then(response => response.text())
//                 .then(result => {
                    
//                     console.log(result)
//                     this.getNotification(id_user);
//                 }
//                     )
//                 .catch(error => console.log('error', error));
// }

// getNotification(id_user) {
//     var id_user=id_user;
//     var requestOptions = {
//         method: 'GET',
//         redirect: 'follow'
//       };
      
//       fetch("https://masterdiskon.com/front/api/api/notif?id="+id_user, requestOptions)
//         .then(response => response.json())
//         .then(result => {
//             console.log("-------------notif--------------")
//             AsyncStorage.setItem('notification', JSON.stringify(result));
//             setTimeout(() => {
//                 this.authentication(redirect);
//                 }, 500);

//         })
//         .catch(error => console.log('error', error));

// }


   
    _signOut = async () => {
        try {
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
          this.setState({ user: null }); // Remember to remove the user from your app's state as well
          alert('berhasil logout');
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
                        //alert(redirect);
                        this.props.navigation.navigate("Loading",{redirect:redirect,param:this.state.param});
                    } else {
                        this.setState({
                            loading: false
                        });
                    }
                });
            }
        );
    }



    
    // validationSubmit() {
    //     this.validate({
    //       email: {email: true,required: true},
    //     });
        
    //     var errorMsg=this.getErrorMessages();
    //     return errorMsg;
    // }
      

    validation(){
    var email=this.state.email;
    var password=this.state.password;
    //var errorMsg=this.getErrorMessages();

        if(email != '' && password !='' ){
                // if(errorMsg !=''){
                //     console.log('not yet');
                //     this.setState({colorButton:BaseColor.greyColor});
                //     this.setState({colorButtonText:BaseColor.whiteColor});
                //     this.setState({disabledButton:true});
                // }else{
                    console.log('perfect');
                    this.setState({colorButton:BaseColor.secondColor});
                    this.setState({colorButtonText:BaseColor.primaryColor});
                    this.setState({disabledButton:false});
                //}
        }else{
                console.log('not yet');
                this.setState({colorButton:BaseColor.greyColor});
                this.setState({colorButtonText:BaseColor.whiteColor});
                this.setState({disabledButton:true});
          
        }
    }
    
  
      
    // handleChange = (key, val,validate) => {
    //     this.setState({ [key]: val});
        
    //     setTimeout(() => {
    //         this.validation();
    //     }, 500);
    // }
      
    render() {
        const { navigation } = this.props;
        let { loading} = this.state;
        
        
        
                
                var formEmail=<View style={{marginBottom: 10}}>
                                        <TouchableOpacity 
                                        style={{width:'100%'}}
                                    >
                                            <Text body2 style={{marginTop:-15,color:BaseColor.primaryColor}}>
                                                 Email
                                            </Text>
                                            <View style={styles.contentProfile}>
                                                <View style={{ flex: 6}}>
                                                <TextValidator
                                                name="email"
                                                label="email"
                                                validators={['required', 'isEmail']}
                                                errorMessages={['This field is required', 'Email invalid']}
                                                placeholder="e.g., example@email.com"
                                                type="text"
                                                keyboardType="email-address"
                                                value={this.state.email}
                                                onChangeText={(email)=> {
                                                    this.setState({email : email})
                                                    setTimeout(() => {
                                                        this.validation();
                                                    }, 500);
                                                }}
                                                errorStyle={{underlineValidColor: BaseColor.textPrimaryColor,text: { color: BaseColor.thirdColor }, underlineInvalidColor: BaseColor.thirdColor }}
                                                
                                               
                                            />
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                </View>
            
            
            var formPassword=<View style={{marginBottom: 10}}>
                                        <TouchableOpacity 
                                        style={{width:'100%'}}
                                    >
                                            <Text body2 style={{marginTop:-15,color:BaseColor.primaryColor}}>
                                                 Password
                                            </Text>
                                            <View style={styles.contentProfile}>
                                                <View style={{ flex: 6}}>
                                                <TextValidator
                                                name="password"
                                                label="text"
                                                placeholder="e.g., ******"
                                                secureTextEntry
                                                type="text"
                                                value={this.state.password}
                                                onChangeText={(password)=> {
                                                    this.setState({password : password})
                                                    setTimeout(() => {
                                                        this.validation();
                                                    }, 500);
                                                }}
                                                errorStyle={{underlineValidColor: BaseColor.textPrimaryColor,text: { color: BaseColor.thirdColor }, underlineInvalidColor: BaseColor.thirdColor }}
                                                
                                               
                                            />
                                                </View>
                                               
                                            </View>
                                        </TouchableOpacity>
                                        
                                        
                                        
            </View>

        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <Header
                    title="Sign In"
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
                <ScrollView>
                    <View style={styles.contain}>
                        <Form
                            ref="form"
                            //onSubmit={this.onSubmit}
                        >
                        {formEmail}
                        {formPassword}
                            <TouchableOpacity  disabled={this.state.disabledButton} onPress={() => this.onSubmit()} >
                                <View pointerEvents='none' style={styles.groupinput}>
                                <Button
                                    loading={this.state.loading}
                                    style={{backgroundColor:this.state.colorButton}}
                                    full
                                >
                                    <Text style={{color:this.state.colorButtonText}}>Sign In</Text>
                                </Button>
                                </View>
                            </TouchableOpacity>
                        </Form>

                      
                      
                        <View style={{ width: "100%" }}>
                            <GoogleSigninButton
                            style={{ width: "100%", height: 48 }}
                            size={GoogleSigninButton.Size.Wide}
                            color={GoogleSigninButton.Color.Dark}
                            onPress={this._signIn}
                            disabled={this.state.isSigninInProgress} />
                            
                            {/* <LoginButton
                              onLoginFinished={
                                (error, result) => {
                                  if (error) {
                                    console.log("login has error: " + result.error);
                                  } else if (result.isCancelled) {
                                    console.log("login is cancelled.");
                                  } else {
                                    AccessToken.getCurrentAccessToken().then(
                                      (data) => {
                                        console.log(data.accessToken.toString())
                                      }
                                    )
                                  }
                                }
                              }
                              onLogoutFinished={() => console.log("logout.")}
                              /> 
                          
                             */}
                            
                        </View>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("ResetPassword")}
                        >
                            <Text body1 grayColor style={{ marginTop: 25 }}>
                                Forgot your password?
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <DropdownAlert ref={ref => this.dropdown = ref} messageNumOfLines={10} closeInterval={10000} />

            </SafeAreaView>
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
)(SignIn);

