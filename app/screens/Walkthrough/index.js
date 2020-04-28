import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthActions } from "@actions";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { bindActionCreators } from "redux";
import { SafeAreaView, Text, Button, Image } from "@components";
import styles from "./styles";
import Swiper from "react-native-swiper";
import { BaseColor, BaseStyle, Images } from "@config";
import * as Utils from "@utils";

import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-community/google-signin';


class Walkthrough extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            scrollEnabled: true,
            slide: [
                { key: 1, image: Images.trip2,text:'Temukan dan pesanlah aktivitas seru dengan harga yang eksklusif' },
                { key: 2, image: Images.trip1,text:'Temukan perjalanan impian untukmu sendiri atau dengan yang lainnya' },
                { key: 3, image: Images.trip3,text:'Temukan dan pesanlah aktivitas seru dengan harga yang eksklusif' },
                { key: 4, image: Images.trip4,text:'Temukan dan pesanlah aktivitas seru dengan harga yang eksklusif' }
            ]
        };
    }

  


    /**
     * @description Simple authentication without call any APIs 
     * @author Passion UI <passionui.com>
     * @date 2019-08-03
     */
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

    authenticationCustom(){
      
        this.setState(
            {
                loading: true
            },
            () => {
                this.props.actions.authentication(true, response => {
                    if (response.success) {
                        this.props.navigation.navigate("Home");
                    } else {
                        this.setState({
                            loading: false
                        });
                    }
                });
            }
        );
                  
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
          this.authentication('Home');
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
            //alert(JSON.stringify(userInfo));
            console.log(userInfo);
            this.setState({ userInfo });
            this.authenticationCustom();
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



    render() {
        const { navigation } = this.props;
        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <ScrollView
                    style={styles.contain}
                    scrollEnabled={this.state.scrollEnabled}
                    onContentSizeChange={(contentWidth, contentHeight) =>
                        this.setState({
                            scrollEnabled: Utils.scrollEnabled(
                                contentWidth,
                                contentHeight
                            )
                        })
                    }
                >
                    <View style={styles.wrapper}>
                        <Swiper
                            dotStyle={{
                                backgroundColor: BaseColor.textSecondaryColor
                            }}
                            activeDotColor={BaseColor.primaryColor}
                            paginationStyle={styles.contentPage}
                            removeClippedSubviews={false}
                        >
                            {this.state.slide.map((item, index) => {
                                return (
                                    <View style={styles.slide} key={item.key}>
                                        <Image
                                            source={item.image}
                                            style={styles.img}
                                        />
                                        <Text body1 style={styles.textSlide}>
                                            {item.text}
                                        </Text>
                                    </View>
                                );
                            })}
                        </Swiper>
                    </View>


                    
                    <View style={{ width: "100%" }}>

                    {/* <GoogleSigninButton
    style={{ width: 48, height: 48 }}
    size={GoogleSigninButton.Size.Icon}
    color={GoogleSigninButton.Color.Dark}
    onPress={this._signIn}
    disabled={this.state.isSigninInProgress} /> */}

    
               
               {/* <Button
                            full
                            style={{
                                backgroundColor: BaseColor.navyBlue,
                                marginTop: 20
                            }}
                            onPress={this._signOut}
                        >
                            Logout Google
                        </Button> */}


                        {/* <Button
                            full
                            style={{
                                backgroundColor: BaseColor.navyBlue,
                                marginTop: 20
                            }}
                            onPress={() => {
                                this.authentication();
                            }}
                        >
                            Login with Facebooks
                        </Button> */}
                        <Button
                            full
                            style={{ marginTop: 20 }}
                            loading={this.state.loading}
                            onPress={() => navigation.navigate("SignIn",{redirect:'Home'})}
                        >
                            Sign In
                        </Button>
                        {/* <GoogleSigninButton
                        style={{ width: "100%", height: 48 }}
                        size={GoogleSigninButton.Size.Wide}
                        color={GoogleSigninButton.Color.Dark}
                        onPress={this._signIn}
                        disabled={this.state.isSigninInProgress} /> */}

                        
                        <View style={styles.contentActionBottom}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("SignUp")}
                            >
                                <Text body1 grayColor>
                                    Haven’t registered yet?
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => this.authentication()}
                            >
                                <Text body1 primaryColor>
                                    Join Now
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
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
)(Walkthrough);
