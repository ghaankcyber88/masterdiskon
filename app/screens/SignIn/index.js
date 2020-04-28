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

import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-community/google-signin';



class SignIn extends Component {
    constructor(props) {
        super(props);
        var redirect="";
        if(this.props.navigation.state.params && this.props.navigation.state.params.redirect){
            redirect=this.props.navigation.state.params.redirect;
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
        };
    }

    componentDidMount(){
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
            webClientId: '657580256409-dkhgqr5rhf37l629fk907ad2vrg82usa.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            //hostedDomain: '', // specifies a hosted domain restriction
            //loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
            forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
            //accountName: '', // [Android] specifies an account name on the device that should be used
            //iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
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
        const { redirect } = this.state;
        const { navigation } = this.props;
        var email = userInfo.user.email;
        var sp = email.split('@');
        var username=sp[0];


        this.setState({ loading: true }, () => {
            // var data={"email":email}
            // const param={"param":data}

            // "photo":"https://lh3.googleusercontent.com/a-/AOh14Gh8U83JP7mHjpzF1klP6J0AuWCOHRbna_BVgX6R=s96-c",
            // "email":"matadesaindotcom@gmail.com",
            // "familyName":"Desain",
            // "givenName":"Mata",
            // "name":"Mata Desain",

            var data={
                "firstname":userInfo.user.givenName,
                "lastname":userInfo.user.familyName,
                "username":username,
                "password":'123456',
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

            fetch("https://masterdiskon.co.id/front/auth/login/login_proses_app_google", requestOptions)
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
                    //alert(id_user);
                    //this.getProfile(id_user);
                   // this.getSmartProfile(id_user);
                    // this.getBookingHistory(id_user);
                    // this.getNotification(id_user);
                    setTimeout(() => {
                    this.authentication(redirect);
                    }, 500);
                   
               
                }

            })

            
        });
        
       
    
}

getProfile(id_user) {
 
    var id_user=id_user;           
    // alert(id_user);
    PostData('user',{"id_user":id_user})
        .then((result) => {
            console.log("-------------GET profile--------------")
            AsyncStorage.setItem('profile', JSON.stringify(result));
            this.getSmartProfile(id_user);
        },
        (error) => {
            this.setState({ error });
        }
    );

}



getSmartProfile(id_user){
    var id_user=id_user;

    
        var myHeaders = new Headers();

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch("https://masterdiskon.co.id/front/api/api/get_participant?id_user="+id_user, requestOptions)
        .then(response => response.text())
        .then(result => {
            
            console.log(result)
            this.getBookingHistory(id_user);
        }
            
            )
        .catch(error => console.log('error', error));
}


getBookingHistory(id_user) {
 
            
            var id_user=id_user;
                var myHeaders = new Headers();
        
                var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
                };
        
                fetch("https://masterdiskon.co.id/front/api/api/get_booking_history?id="+id_user, requestOptions)
                .then(response => response.text())
                .then(result => {
                    
                    console.log(result)
                    this.getNotification(id_user);
                }
                    )
                .catch(error => console.log('error', error));
}

getNotification(id_user) {
 
            
    var id_user=id_user;
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("https://masterdiskon.co.id/front/api/api/notif?id="+id_user, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log("-------------notif--------------")
            AsyncStorage.setItem('notification', JSON.stringify(result));
            setTimeout(() => {
                this.authentication(redirect);
                }, 500);

        })
        .catch(error => console.log('error', error));

}


   
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

    onLogin() {
        const { email, password, success,redirect } = this.state;
        const { navigation } = this.props;
        if (email == "" || password == "") {
            this.setState({
                success: {
                    ...success,
                    email: false,
                    password: false
                }
            });
        } else {

            this.setState({ loading: true }, () => {
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

                fetch("https://masterdiskon.co.id/front/auth/login/login_proses_app", requestOptions)
                .then(response => response.json())
                .then(result => {
                    var userSession=result.userSession;
                    userSession.loginVia = "form";
                    this.setState({ loading: false });
                    console.log(JSON.stringify(result));
                    if(result.success==false){
                        this.dropdown.alertWithType('error', 'Error', JSON.stringify(result.message));
                        //this.setState({ loading: false });
                    }else if(result.success==true){
                        this.dropdown.alertWithType('success', 'Success', JSON.stringify(result.message));
                        AsyncStorage.setItem('userSession', JSON.stringify(userSession));
                        AsyncStorage.setItem('id_user', JSON.stringify(userSession.id_user));
                        this.authentication(redirect);
                      
                    }

                })
            });
            
           
        }
    }



    


    render() {
        const { navigation } = this.props;
        let { loading} = this.state;

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
                        <TextInput
                            style={[BaseStyle.textInput, { marginTop: 65 }]}
                            onChangeText={text => this.setState({ email: text })}
                            onFocus={() => {
                                this.setState({
                                    success: {
                                        ...this.state.success,
                                        email: true
                                    }
                                });
                            }}
                            autoCorrect={false}
                            placeholder="Email"
                            placeholderTextColor={
                                this.state.success.email
                                    ? BaseColor.grayColor
                                    : BaseColor.primaryColor
                            }
                            value={this.state.email}
                            selectionColor={BaseColor.primaryColor}
                        />
                        <TextInput
                            style={[BaseStyle.textInput, { marginTop: 10 }]}
                            onChangeText={text =>
                                this.setState({ password: text })
                            }
                            onFocus={() => {
                                this.setState({
                                    success: {
                                        ...this.state.success,
                                        password: true
                                    }
                                });
                            }}
                            autoCorrect={false}
                            placeholder="Password"
                            secureTextEntry={true}
                            placeholderTextColor={
                                this.state.success.password
                                    ? BaseColor.grayColor
                                    : BaseColor.primaryColor
                            }
                            value={this.state.password}
                            selectionColor={BaseColor.primaryColor}
                        />
                        <View style={{ width: "100%" }}>
                            <Button
                                full
                                loading={loading}
                                style={{ marginTop: 20 }}
                                onPress={() => {
                                    this.onLogin();
                                }}
                            >
                                Sign In
                            </Button>
                            <GoogleSigninButton
                            style={{ width: "100%", height: 48 }}
                            size={GoogleSigninButton.Size.Wide}
                            color={GoogleSigninButton.Color.Dark}
                            onPress={this._signIn}
                            disabled={this.state.isSigninInProgress} />
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
