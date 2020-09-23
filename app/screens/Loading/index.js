import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthActions } from "@actions";
import { ActivityIndicator, View } from "react-native";
import { bindActionCreators } from "redux";
import { Images, BaseColor } from "@config";
import SplashScreen from "react-native-splash-screen";
import {Text } from "@components";
import {PostDataNew} from '../../services/PostDataNew';
import {DataMasterDiskon} from "@data";
import {AsyncStorage} from 'react-native';
import AnimatedLoader from "react-native-animated-loader";

class Loading extends Component {
    constructor(props) {
        super(props);
        this.state={
            DataMasterDiskon:DataMasterDiskon[0],
        }
        //this.getSession();
    }

    // isProduction(){
    //     const {DataMasterDiskon} =this.state;
    //     this.setState({ loading_production: true }, () => {
    //         var param={
    //             method: 'POST',
    //             headers: {
    //               Accept: 'application/json',
    //               'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(),
    //           }
           
    //          var url=this.state.DataMasterDiskon.baseUrl;
             
    //          PostDataNew(url,DataMasterDiskon.urlApiMd.common.config.path,param)
    //              .then((result) => {
    //                 var aeroStatus=result.aeroStatus;
    //                 var aeroUrl=result.aeroUrl;
    //                 if(aeroStatus==false){
    //                     var details=this.state.DataMasterDiskon.aeroStag;
    //                 }else{
    //                     var details=this.state.DataMasterDiskon.aeroProd;
    //                 }
    //                 var config=result;
    //                 this.getToken(details,aeroUrl,config);
    //              },
    //              (error) => {
    //                  this.setState({ error });
    //              }
    //         ); 
    //     });
    
    // }
    
    // getToken(details,url,config){
    //     const {DataMasterDiskon} =this.state;
    //     let { navigation, auth } = this.props;
    //     let status = auth.login.success;
    //     var formBody = [];
    //     for (var property in details) {
    //       var encodedKey = encodeURIComponent(property);
    //       var encodedValue = encodeURIComponent(details[property]);
    //       formBody.push(encodedKey + "=" + encodedValue);
    //     }
    //     formBody = formBody.join("&");
                
        
    //     var param={
    //         method: 'POST',
    //         headers: {
    //           'Accept': 'application/json',
    //           'Content-Type': 'application/x-www-form-urlencoded'
    //         },
    //         body: formBody
    //       }


    //     PostDataNew(url,DataMasterDiskon.urlApiAero.token.path,param)
    //              .then((result) => {
    //                 var access_token=result.access_token;
    //                 config.token=access_token;
    //                 AsyncStorage.setItem('config', JSON.stringify(config)); 
    //                 navigation.navigate("Home");
                    
    //              },
    //              (error) => {
    //                  this.setState({ error });
    //              }
    //     ); 
    // }
    
    getToken(config){
        let { navigation, auth } = this.props;
        const {DataMasterDiskon} =this.state;
        var url=DataMasterDiskon.baseUrl;
        var dir='front/api/common/tokenAgi';
        
        
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "ci_session=4hrpjgkhf3efeulhfaq825kf0rb0kf2k");
        
        var raw = JSON.stringify({"param":{
        "url":config.aeroUrl,
        "clientIdAero":config.aeroClientId,
        "clientSecretAero":config.aeroClientSecret,
        "usernameAero":config.aeroUsername,
        "passwordAero":config.aeroPassword,
        }});
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch(url+dir, requestOptions)
          .then(response => response.json())
          .then(result => {
          config.token=result.access_token;
                            console.log('getConfigNew',JSON.stringify(config));
                            AsyncStorage.setItem('config', JSON.stringify(config)); 
                            navigation.navigate("Home");
          })
          .catch(error => console.log('error', error));
        
    
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

    
    getConfig(){
        let { navigation, auth } = this.props;
        const {DataMasterDiskon} =this.state;
        var url=DataMasterDiskon.baseUrl;
        var dir='front/api/common/config';
        var params={"param":{"username":DataMasterDiskon.username,"password":DataMasterDiskon.password}};
        
        console.log('params',JSON.stringify(params));
        var param={
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
          }
       
       
         
         PostDataNew(url,dir,param)
             .then((result) => {
                    var config=result;
                  
                    this.getToken(config);
             },
             (error) => {
                 this.setState({ error });
             }
        ); 

    
    }

    //memanggil session
    getSession(){    
        AsyncStorage.getItem('userSession', (error, result) => {
            if (result) {    
                let userSession = JSON.parse(result);
                console.log("userSession",JSON.stringify(userSession));
                var id_user=userSession.id_user;
                this.setState({id_user:id_user});
                this.setState({userSession:userSession});
                this.setState({login:true});
            }
        });
    }

    onProcess() {
        
        if(this.props.navigation.state.params && this.props.navigation.state.params.redirect){
            var redirect=this.props.navigation.state.params.redirect;
        }else{
            var redirect='';
        }
        
        if(this.props.navigation.state.params && this.props.navigation.state.params.param){
            var param=this.props.navigation.state.params.param;
        }else{
            var param='';
        }
        
        
        SplashScreen.hide();
        let { navigation, auth } = this.props;
        let status = auth.login.success;
       

        if(redirect != ''){
            setTimeout(() => {
            console.log(JSON.stringify(param));
                navigation.navigate(redirect,{param:param});
            }, 500);
        }else{

            // AsyncStorage.getItem('userSession', (error, result) => {
            //     if (result) {    
            //         this.getConfig();
            //     }else{
            //         navigation.navigate("SignIn");
            //     }
            // });

            this.getConfig();
        }
    }
    
    

    componentWillMount() {
        this.props.actions.authentication(false, response => {});
    }

    componentDidMount() {
        this.onProcess();
    }

    render() {
        return (
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
                        source={require("app/assets/loader_paperline.json")}
                        animationStyle={{width: 300,height: 300}}
                        speed={1}
                      />
                    <Text>
                        Connecting.. to Masterdiskon
                    </Text>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(AuthActions, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Loading);