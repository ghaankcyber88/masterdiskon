import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity, Switch,Animated,AsyncStorage, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { AuthActions } from "@actions";
import { BaseStyle, BaseColor, BaseSetting,Images } from "@config";
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
import { UserData, DataMasterDiskon } from "@data";

import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-community/google-signin';
  import {PostData} from '../../services/PostData';

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
            DataMasterDiskon:DataMasterDiskon[0]
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
       this.getStatic();
        this.setState({ loading_spinner: true }, () => {

            AsyncStorage.getItem('userSession', (error, result) => {
                if (result) {

                    let userSession = JSON.parse(result);
                    console.log('-----------data user--------');
                    console.log(JSON.stringify(userSession));
                    this.setState({ userSession: userSession });
                    this.setState({ loading_spinner: false });
                    this.setState({ login: true });
                    var id_user=userSession.id_user;
                    this.getProfile(id_user);

                 }
                
            });

        });
    }


    getProfile(id_user) {
 
        var id_user=id_user;           

                    const data={"id":id_user}
                    const param={"param":data}
                    console.log('-------------param profile-------------');
                    console.log(JSON.stringify(param));
                    PostData('get_profile',param)
                        .then((result) => {
                                        console.log("---------------get profile ------------");
                                        console.log(JSON.stringify(result));
                                        AsyncStorage.setItem('profile', JSON.stringify(result)); 
                        },
                        (error) => {
                            this.setState({ error });
                        }
                    ); 
    }


    getStatic() {
 
                    PostData('get_static')
                        .then((result) => {
                                        console.log("---------------get static ------------");
                                        console.log(JSON.stringify(result));
                                        this.setState({dataStatic:result}); 
                        },
                        (error) => {
                            this.setState({ error });
                        }
                    ); 
    }


  

    render() {
        const { navigation } = this.props;
        const { userData, loading,login,loading_spinner,userSession,heightHeader } = this.state;

        const heightImageBanner = Utils.scaleWithPixel(140);
        const marginTopBanner = heightImageBanner - heightHeader-70;
        return (
            <View style={{ flex: 1 }}>
           <Animated.Image
                    // source={Images.trip3}
                    source={{uri : this.state.DataMasterDiskon.banner}}
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
                {/* <Header
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
                /> */}

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
                                // style={[
                                //     styles.searchForm
                                // ]}
                            >
                                <View
                                style={[
                                    styles.contentBoxTop,
                                    { marginTop: marginTopBanner }
                                ]}
                            >
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
                                {/* {this.renderIconService()} */}
                            </View>
                        </View>
                       

                    <View style={styles.contain}>
                        <ProfileDetail
                            image={userData.image}
                            textFirst={userData.name}
                            point={userData.point}
                            textSecond={userData.address}
                            textThird={userData.id}
                            onPress={() =>{
                                alert('asd');
                                 //navigation.navigate("ProfileExanple")

                            }
                            }
                            viewImage={false}
                        />
                        {/* <ProfilePerformance
                            data={userData.performance}
                            style={{ marginTop: 20, marginBottom: 20 }}
                        /> */}
                        <View style={{ width: "100%" }}>
                            <TouchableOpacity
                                style={styles.profileItem}
                                onPress={() => {
                                    navigation.navigate("ProfileSmart",{sourcePage:'profile'});
                                }}
                            >
                                <Text body1>Smart Profile</Text>
                                <Icon
                                    name="angle-right"
                                    size={18}
                                    color={BaseColor.primaryColor}
                                    style={{ marginLeft: 5 }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.profileItem}
                                onPress={() => {
                                    navigation.navigate("ChangePassword");
                                }}
                            >
                                <Text body1>Change Password</Text>
                                <Icon
                                    name="pencil-alt"
                                    size={18}
                                    color={BaseColor.primaryColor}
                                    style={{ marginLeft: 5 }}
                                />
                            </TouchableOpacity>
                                        {/* <TouchableOpacity
                                            style={styles.profileItem}
                                            onPress={() => {
                                                navigation.navigate("ChangePassword");
                                            }}
                                        >
                                            <Text body1>Email dan Nomor Ponsel</Text>
                                            <Icon
                                                name="angle-right"
                                                size={18}
                                                color={BaseColor.primaryColor}
                                                style={{ marginLeft: 5 }}
                                            />
                                        </TouchableOpacity> */}
                                        <TouchableOpacity
                                            style={styles.profileItem}
                                            onPress={() => {
                                                navigation.navigate("Static",{item:this.state.dataStatic,type:'tentang'});
                                            }}
                                        >
                                            <Text body1>Tentang Masterdiskon</Text>
                                            <Icon
                                                name="angle-right"
                                                size={18}
                                                color={BaseColor.primaryColor}
                                                style={{ marginLeft: 5 }}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.profileItem}
                                            onPress={() => {
                                                navigation.navigate("ChangePassword");
                                            }}
                                        >
                                            <Text body1>Kebijakan</Text>
                                            <Icon
                                                name="angle-right"
                                                size={18}
                                                color={BaseColor.primaryColor}
                                                style={{ marginLeft: 5 }}
                                            />
                                        </TouchableOpacity>
                                        {/* <TouchableOpacity
                                            style={styles.profileItem}
                                            onPress={() => {
                                                navigation.navigate("ChangePassword");
                                            }}
                                        >
                                            <Text body1>Syarat dan Ketentuan</Text>
                                            <Icon
                                                name="angle-right"
                                                size={18}
                                                color={BaseColor.primaryColor}
                                                style={{ marginLeft: 5 }}
                                            />
                                        </TouchableOpacity> */}
                                        {/* <TouchableOpacity
                                            style={styles.profileItem}
                                            onPress={() => {
                                                navigation.navigate("ChangePassword");
                                            }}
                                        >
                                            <Text body1>Version</Text>
                                            <Icon
                                                name="angle-right"
                                                size={18}
                                                color={BaseColor.primaryColor}
                                                style={{ marginLeft: 5 }}
                                            />
                                        </TouchableOpacity> */}
                                            <View style={styles.profileItem}>
                                                <Text body1>Reminders</Text>
                                                <Switch
                                                    name="angle-right"
                                                    size={18}
                                                    onValueChange={this.toggleSwitch}
                                                    value={this.state.reminders}
                                                />
                                            </View>
                                            <View style={styles.profileItem}>
                                                <Text body1>App Version</Text>
                                                <Text body1 grayColor>
                                                    {BaseSetting.appVersion}
                                                </Text>
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
