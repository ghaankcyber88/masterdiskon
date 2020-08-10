import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity, Switch,Animated,TextInput,AsyncStorage,ActivityIndicator,FlatList,RefreshControl} from "react-native";
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
import { UserData } from "@data";
import {PostData} from '../../services/PostData';
import moment from "moment";

class ProfileSmart extends Component {
    constructor(props) {
        super(props);

        
        var sourcePage="";
        if(this.props.navigation.state.params.sourcePage){
            sourcePage=this.props.navigation.state.params.sourcePage;
        }

        //alert(sourcePage);

        var item=[];
        if(this.props.navigation.state.params.item){
            item=this.props.navigation.state.params.item;
        }

        var type="";
        if(this.props.navigation.state.params.type){
            type=this.props.navigation.state.params.type;
        }


        this.state = {
            reminders: false,
            loading: false,
            userData: UserData[0],
            participant: [],
            heightHeader: Utils.heightHeader(),
            sourcePage:sourcePage,
            item:item,
            type:type
        };
        this._deltaY = new Animated.Value(0);
        this.updateParticipant = this.updateParticipant.bind(this);
    }

    

    redirect(redirect='') {
      
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

            if(key=='0'){
                  this.fetch();
            

            }else{
                
            
            AsyncStorage.getItem('smartProfile', (error, result) => {
                if (result) {
                    let resultParsed = JSON.parse(result);
                    console.log("------DATA GUEST asli----");    
                    console.log(JSON.stringify(resultParsed));
                    const newProjects = resultParsed.map(p =>
                        p.id === key
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
        
                    AsyncStorage.setItem('smartProfile',JSON.stringify(newProjects));
                    this.setState({participant:newProjects});
                     console.log("------DATA GUEST update----");
                     console.log(JSON.stringify(newProjects));
        
                }
                });
            
            
            }
                
            this.saveParticipant( key,fullname,
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
                  passport_country_id);
             
                //     const data={  
                //         "id": key,
                //         "id_user": "137",
                //         "fullname": fullname,
                //         "firstname": firstname,
                //         "lastname": lastname,
                //         "birthday": birthday,
                //         "nationality": nationality,
                //         "passport_number": passport_number,
                //         "passport_country": passport_country,
                //         "passport_expire": passport_expire,
                //         "phone": phone,
                //         "title": title,
                //         "email": email,
                //         "nationality_id": nationality_id,
                //         "nationality_phone_code": nationality_phone_code,
                //         "passport_country_id": passport_country_id,
                //     }
                // const param={"param":data}
                
                
        
                // console.log("------------------data param submit participant--------------");
                // console.log(JSON.stringify(param));

                // PostData('update_participant',param)
                //     .then((result) => {
                //         console.log("------------------result update participant--------------");
                //         console.log(JSON.stringify(result));
                //         //this.redirect('ProfileSmart');
                //     },
                //     (error) => {
                //         this.setState({ error });
                //     }
                //     );



  }


    saveParticipant(
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
        passport_country_id){
        AsyncStorage.getItem('userSession', (error, result) => {
            if (result) {
                let userSession = JSON.parse(result);
                console.log("---------------data session user  ------------");
                console.log(JSON.stringify(userSession));
                this.setState({userSession:userSession});
                this.setState({login:true});


                var id_user=userSession.id_user;
                const data={  
                    "id": key,
                    "id_user": id_user,
                    "fullname": fullname,
                    "firstname": firstname,
                    "lastname": lastname,
                    "birthday": birthday,
                    "nationality": nationality,
                    "passport_number": passport_number,
                    "passport_country": passport_country,
                    "passport_expire": passport_expire,
                    "phone": phone,
                    "title": title,
                    "email": email,
                    "nationality_id": nationality_id,
                    "nationality_phone_code": nationality_phone_code,
                    "passport_country_id": passport_country_id,
                    "type":this.convertOld(birthday)
                }
                const param={"param":data}
                console.log("------------------data param submit participant--------------");
                console.log(JSON.stringify(param));

                PostData('update_participant',param)
                    .then((result) => {
                        console.log("------------------result update participant--------------");
                        console.log(JSON.stringify(result));
                        //this.redirect('ProfileSmart');
                    },
                    (error) => {
                        this.setState({ error });
                    }
                );

                }
            });    

    }

    componentDidMount() {

        // var age = parseInt(moment().diff('1987-03-27','years',true));
        // console.log("---------------age------------");
        // console.log(age);
        this.fetch();

    }

    fetch(){
        
        this.setState({ loading_spinner: true }, () => {
            AsyncStorage.getItem('userSession', (error, result) => {
                if (result) {
                    let userSession = JSON.parse(result);
                    console.log("---------------data session user  ------------");
                    console.log(JSON.stringify(userSession));
                    this.setState({userSession:userSession});
                    this.setState({login:true});
    
    
                    var id_user=userSession.id_user;


                    const data={"id":"","id_user":id_user}
                    const param={"param":data}
                    console.log('-------------param profile-------------');
                    console.log(JSON.stringify(param));
                    PostData('get_participant',param)
                        .then((result) => {
                            console.log('-------------------------data participant-----------------------')
                            console.log(JSON.stringify(result));
                            this.setState({ loading_spinner: false });
                            this.setState({participant:result});
                            AsyncStorage.setItem('smartProfile', JSON.stringify(result));
                        },
                        (error) => {
                            this.setState({ error });
                        }
                    ); 



                    // var requestOptions = {
                    //     method: 'GET',
                    //     redirect: 'follow'
                    //   };
                      
                    //   fetch("https://masterdiskon.co.id/front/api/api/get_participant?id_user="+id_user, requestOptions)
                    //     .then(response => response.json())
                    //     .then(result => {
                    //         console.log('-------------------------data participant-----------------------')
                    //         console.log(JSON.stringify(result));
                    //         this.setState({ loading_spinner: false });
                    //         this.setState({participant:result});
                    //         AsyncStorage.setItem('smartProfile', JSON.stringify(result));
    
                    //     })
                    //     .catch(error => console.log('error', error));
    
                 }
                
            });
        });
    }


    

    onChange(select) {

        this.setState({
            participant: this.state.participant.map(item => {
                if (item.id == select.id) {
                    return {
                        ...item,
                        checked: true
                    };
                    
              
                } else {
                    return {
                        ...item,
                        checked: false
                    };
                }
               
            })
        });

        var sourcePage=this.state.sourcePage;
        
        //alert(sourcePage);

        if(sourcePage=='summary'){
            var key=this.state.item.key;
            var fullname=select.fullname;
            var firstname=select.firstname;
            var lastname=select.lastname;
            var birthday=select.birthday;
            var nationality=select.nationality;
            var passport_number=select.passport_number;
            var passport_country=select.passport_country;
            var passport_expire=select.passport_expire;
            var phone=select.phone;
            var title=select.title;
            var email=select.email;
            var nationality_id=select.nationality_id;
            var nationality_phone_code=select.nationality_phone_code;
            var passport_country_id=select.passport_country_id;

            var type=this.state.type;

            this.props.navigation.state.params.updateParticipant(
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
          this.props.navigation.goBack();
        }else if(sourcePage=='profile'){
            this.props.navigation.navigate('DetailContact',{
                key:select.id,
                label:'xx',
                fullname:select.fullname,
                firstname:select.firstname,
                lastname:select.lastname,
                birthday:select.birthday,
                nationality:select.nationality,
                passport_number:select.passport_number,
                passport_country:select.passport_country,
                passport_expire:select.passport_expire,
                phone:select.phone,
                title:select.title,
                email:select.email,
                nationality_id:select.nationality_id,
                nationality_phone_code:select.nationality_phone_code,
                passport_country_id:select.passport_country_id,
                updateParticipant: this.updateParticipant,
                type:'guest',
                old:select.old
              });    

        }

      

    }

    addProfile() {
     
        this.props.navigation.navigate('DetailContact',{
            key:'0',
            label:'',
            fullname:'',
            firstname:'',
            lastname:'',
            birthday:'',
            nationality:'',
            passport_number:'',
            passport_country:'',
            passport_expire:'',
            phone:'',
            title:'',
            email:'',

            nationality_id:'',
            nationality_phone_code:'',
            
            passport_country_id:'',

            
            updateParticipant: this.updateParticipant,
            type:'guest',
            old:''
          });    

    }

    search(value){
        this.setState({ loading_spinner: true }, () => {
            PostData('airport',{"param":value})
            .then((result) => {
                    this.setState({ loading_spinner: false });
                    this.setState({flight:result});
                    const { navigation } = this.props;
                    const selected = navigation.getParam("selected");
        
                    if (selected) {
                        this.setState({
                            flight: this.state.flight.map(item => {
                                return {
                                    ...item,
                                    checked: item.code == selected
                                };
                            })
                        });
                    }
                },
                (error) => {
                    this.setState({ error });
                }
            );
        });

     }

     getAge(dateString) {
        var today = new Date();
        var DOB = new Date(dateString);
        var totalMonths = (today.getFullYear() - DOB.getFullYear()) * 12 + today.getMonth() - DOB.getMonth();
        totalMonths += today.getDay() < DOB.getDay() ? -1 : 0;
        var years = today.getFullYear() - DOB.getFullYear();
        if (DOB.getMonth() > today.getMonth())
            years = years - 1;
        else if (DOB.getMonth() === today.getMonth())
            if (DOB.getDate() > today.getDate())
                years = years - 1;
    
        var days;
        var months;
    
        if (DOB.getDate() > today.getDate()) {
            months = (totalMonths % 12);
            if (months == 0)
                months = 11;
            var x = today.getMonth();
            switch (x) {
                case 1:
                case 3:
                case 5:
                case 7:
                case 8:
                case 10:
                case 12: {
                    var a = DOB.getDate() - today.getDate();
                    days = 31 - a;
                    break;
                }
                default: {
                    var a = DOB.getDate() - today.getDate();
                    days = 30 - a;
                    break;
                }
            }
    
        }
        else {
            days = today.getDate() - DOB.getDate();
            if (DOB.getMonth() === today.getMonth())
                months = (totalMonths % 12);
            else
                months = (totalMonths % 12) + 1;
        }
        var age = years + 'y-' + months + 'm-' + days + 'd';
        return age;

     

      
    }

    convertOld(dateString){

        var age = parseInt(moment().diff(dateString,'years',true));
        var old="";
        if(age < 2){
            old="INF";
        }else if(age>=2 && age<=11){
            old="CHD";
        }else{
            old="ADT";
        }
        return old;
    }
    
    

    render() {
        const { navigation } = this.props;
        const { userData, loading,heightHeader,participant,loading_spinner,sourcePage } = this.state;
        const heightImageBanner = Utils.scaleWithPixel(140);
        const marginTopBanner = heightImageBanner - heightHeader-70;

        var buttonAdd=<View></View>
        if(sourcePage=='profile')
        {
            buttonAdd=<View style={{ padding: 20 }}>
                    <Button
                        full
                        loading={loading}
                        onPress={() => this.addProfile()}
                    >
                        Add Profile
                    </Button>
                </View>
        }


        return (
            <View style={{ flex: 1 }}>
              
                
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <Header
                    title="ProfileSmart"
                    renderLeft={() => {
                        return (
                            <Icon
                                name="arrow-left"
                                size={20}
                                color={BaseColor.whiteColor}
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
                /> 
                    <View style={{marginHorizontal: 20}}>
                        <TextInput
                            style={[BaseStyle.textInput,{marginTop:10}]}
                            onChangeText={text => this.search(text)}
                            autoCorrect={false}
                            placeholder="Search"
                            placeholderTextColor={BaseColor.grayColor}
                            // value={airplane}
                            selectionColor={BaseColor.primaryColor}
                        />
                    </View>
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

                 

                    <View style={styles.contain}>
                        <View style={{ width: "100%" }}>
                    
                        {
                            loading_spinner ? 
                            <ActivityIndicator
                                    size="large"
                                    color={BaseColor.primaryColor}
                            /> 
                            :
                            <FlatList
                                contentContainerStyle={{
                                    marginHorizontal: 20
                                }}
                                refreshControl={
                                    <RefreshControl
                                        colors={[BaseColor.primaryColor]}
                                        tintColor={BaseColor.primaryColor}
                                        refreshing={this.state.refreshing}
                                        onRefresh={() => {}}
                                    />
                                }
                                data={participant}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index }) => (
                                    <View style={styles.item}>
                                        <ProfileDetail
                                        textFirst={this.convertOld(item.birthday)}
                                        //textFirst={this.convertOld(item.birthday)+" ("+this.getAge(item.birthday)+")"}
                                        textSecond={item.fullname}
                                        textThird={item.fullname}
                                        onPress={() =>{
                                            this.onChange(item)
                                        }}
                                        viewImage={false}
                                        />
                                    </View>
                                )}
                            />
                        }
                        </View>
                    </View>
                </ScrollView>
                    {buttonAdd}
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
)(ProfileSmart);
