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
    }

    /**
     * @description Simple logout with Redux
     * @author Passion UI <passionui.com>
     * @date 2019-08-03
     */
    // onLogOut() {
    //     this.setState(
    //         {
    //             loading: true
    //         },
    //         () => {
    //             this.props.actions.authentication(false, response => {
    //                 if (response.success) {
    //                     this.props.navigation.navigate("Loading");
    //                 } else {
    //                     this.setState({ loading: false });
    //                 }
    //             });
    //         }
    //     );
    // }


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
          await GoogleSignin.revokeAccess();
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
       
        this.setState({ loading_spinner: true }, () => {

            AsyncStorage.getItem('userSession', (error, result) => {
                if (result) {
                

                    let userSession = JSON.parse(result);
                    this.setState({ userSession: userSession });
                    this.setState({ loading_spinner: false });
                    this.setState({ login: true });

                 }
                
            });

        });
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
                                color={BaseColor.primaryColor}
                            />
                        );
                    }}
                    renderRight={() => {
                        return (
                            <Icon
                                name="bell"
                                size={24}
                                color={BaseColor.primaryColor}
                            />
                        );
                    }}
                    renderRightSecond={() => {
                        return (
                            <Icon
                                name="envelope"
                                size={24}
                                color={BaseColor.primaryColor}
                            />
                        );
                    }}
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
                                    <View
                                    style={[
                                        // styles.contentBoxTop,
                                    ]}
                                >   
                                    <Icon
                                                name="pencil-alt"
                                                size={18}
                                                color={BaseColor.primaryColor}
                                                style={{position: 'absolute', right: 0}}
                                    />
                                    <Text
                                        title2
                                        semibold
                                        style={{ marginBottom: 7 }}
                                    >
                                         Hi, {this.state.userSession.first} {this.state.userSession.last} 
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
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate("ProfileSmart",{sourcePage:'profile'});
                                    }}
                                >   

                                <View style={styles.contain}>
                                    <Icon
                                                name="user-check"
                                                size={18}
                                                color={BaseColor.primaryColor}
                                            />
                                    
                                    <View style={styles.content}>
                                        <View style={styles.left}>
                                            <Text headline semibold>
                                               Detail Utama
                                            </Text>
                                            <Text
                                                note
                                                numberOfLines={2}
                                                footnote
                                                grayColor
                                                style={{
                                                    paddingTop: 5
                                                }}
                                            >
                                               Lengkapi data utama Anda untuk sebagai data pemesan
                                            </Text>
                                        </View>
                                        <View style={styles.right}>
                                            <Icon
                                            name="angle-right"
                                            size={18}
                                            color={BaseColor.primaryColor}
                                        />
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>


                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("ProfileSmart",{sourcePage:'profile'});
                                }}
                            >   

                                <View style={styles.contain}>
                                    <Icon
                                                name="user-check"
                                                size={18}
                                                color={BaseColor.primaryColor}
                                            />
                                    
                                    <View style={styles.content}>
                                        <View style={styles.left}>
                                            <Text headline semibold>
                                               Smart Profile
                                            </Text>
                                            <Text
                                                note
                                                numberOfLines={2}
                                                footnote
                                                grayColor
                                                style={{
                                                    paddingTop: 5
                                                }}
                                            >
                                               Pesenan lebih cepat, isi data penumpang, dengan satu klik
                                            </Text>
                                        </View>
                                        <View style={styles.right}>
                                            <Icon
                                            name="angle-right"
                                            size={18}
                                            color={BaseColor.primaryColor}
                                        />
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>


                        </View>
                            
                        <View style={{paddingBottom:50}}>
                            <View><Text style={{ marginLeft: 10 }}>Pengaturan</Text></View>
                            <TouchableOpacity
                                style={styles.profileItem}
                                onPress={() => {
                                    navigation.navigate("ChangePassword");
                                }}
                            >
                                <Text body1 style={{ marginLeft: 10 }}>Change Password</Text>
                                <Icon
                                    name="angle-right"
                                    size={18}
                                    color={BaseColor.primaryColor}
                                    style={{ marginRight: 10 }}
                                />
                            </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.profileItem}
                                            onPress={() => {
                                                navigation.navigate("ChangePassword");
                                            }}
                                        >
                                            <Text body1 style={{ marginLeft: 10 }}>Email dan Nomor Ponsel</Text>
                                            <Icon
                                                name="angle-right"
                                                size={18}
                                                color={BaseColor.primaryColor}
                                                 style={{ marginRight: 10 }}
                                            />
                                        </TouchableOpacity>


                                        
                            </View>

                             <View style={{paddingBottom:50}}>
                                <View><Text style={{ marginLeft: 10 }}>Lainnya</Text></View>
                                        <TouchableOpacity
                                            style={styles.profileItem}
                                            onPress={() => {
                                                navigation.navigate("ChangePassword");
                                            }}
                                        >
                                            <Text body1 style={{ marginLeft: 10 }}>Tentang Masterdiskon</Text>
                                            <Icon
                                                name="angle-right"
                                                size={18}
                                                color={BaseColor.primaryColor}
                                                 style={{ marginRight: 10 }}
                                            />
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={styles.profileItem}
                                            onPress={() => {
                                                navigation.navigate("ChangePassword");
                                            }}
                                        >
                                            <Text body1 style={{ marginLeft: 10 }}>Kebijakan Privasi</Text>
                                            <Icon
                                                name="angle-right"
                                                size={18}
                                                color={BaseColor.primaryColor}
                                                 style={{ marginRight: 10 }}
                                            />
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={styles.profileItem}
                                            onPress={() => {
                                                navigation.navigate("ChangePassword");
                                            }}
                                        >
                                            <Text body1 style={{ marginLeft: 10 }}>Syarat dan Ketentuan</Text>
                                            <Icon
                                                name="angle-right"
                                                size={18}
                                                color={BaseColor.primaryColor}
                                                style={{ marginRight: 10 }}
                                            />
                                        </TouchableOpacity>

                                       
                                            <View style={styles.profileItem}>
                                                <Text body1 style={{ marginLeft: 10 }}>Reminders</Text>
                                                <Switch
                                                    name="angle-right"
                                                    size={18}
                                                    onValueChange={this.toggleSwitch}
                                                    value={this.state.reminders}
                                                />
                                            </View>
                                            <View style={styles.profileItem}>
                                                <Text body1 style={{ marginLeft: 10 }}>App Version</Text>
                                                <Text body1 grayColor  style={{ marginRight: 10 }}>
                                                    {BaseSetting.appVersion}
                                                </Text>
                                            </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ padding: 20 }}>
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
                 <View>
                         <View style={{ padding: 20, alignItems: "center" }}>
                             <Icon
                                 name="lock"
                                 size={72}
                                 color={BaseColor.lightPrimaryColor}
                                 style={{ paddingTop: 50, paddingBottom: 20 }}
                             />
                             <Text title3 style={{ marginVertical: 0 }} semibold>
                                 Your Profile
                             </Text>
                             <Text body1 grayColor style={{ textAlign: "center" }}>
                                 Log in to start planning your next trip
                             </Text>
                             
                             <Button
                                 full
                                 style={{ marginTop: 20 }}
                                 loading={this.state.loading}
                                 onPress={() => navigation.navigate("SignIn",{redirect:'Profile'})}
                             >
                                 Sign In
                             </Button>
{/* 
                             <Button
                                 full
                                 style={{ marginTop: 20 }}
                                 loading={this.state.loading}
                                 onPress={this._signOut}
                             >
                                 Sign Out
                             </Button> */}

                             <View style={styles.contentActionBottom}>
                                 <TouchableOpacity
                                     onPress={() => navigation.navigate("SignUp")}
                                 >
                                     <Text body1 grayColor>
                                         Havenâ€™t registered yet?
                                     </Text>
                                 </TouchableOpacity>
 
                                 <TouchableOpacity
                                     onPress={() => navigation.navigate("SignUp")}
                                 >
                                     <Text body1 primaryColor>
                                         Join Now
                                     </Text>
                                 </TouchableOpacity>
                             </View>
                         </View>    
                     </View> 
      
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