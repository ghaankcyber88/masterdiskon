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
    }

    isProduction(){
        const {DataMasterDiskon} =this.state;
        this.setState({ loading_production: true }, () => {
            var param={
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(),
              }
           
             var url=this.state.DataMasterDiskon.baseUrl;
             
             PostDataNew(url,DataMasterDiskon.urlApiMd.common.config.path,param)
                 .then((result) => {
                    var aeroStatus=result.aeroStatus;
                    var aeroUrl=result.aeroUrl;
                    if(aeroStatus==false){
                        var details=this.state.DataMasterDiskon.aeroStag;
                    }else{
                        var details=this.state.DataMasterDiskon.aeroProd;
                    }
                    var config=result;
                    this.getToken(details,aeroUrl,config);
                 },
                 (error) => {
                     this.setState({ error });
                 }
            ); 
        });
    
    }
    
    getToken(details,url,config){
        const {DataMasterDiskon} =this.state;
        let { navigation, auth } = this.props;
        let status = auth.login.success;
        var formBody = [];
        for (var property in details) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
                
        
        var param={
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
          }


        PostDataNew(url,DataMasterDiskon.urlApiAero.token.path,param)
                 .then((result) => {
                    var access_token=result.access_token;
                    config.token=access_token;
                    AsyncStorage.setItem('config', JSON.stringify(config)); 
                    navigation.navigate("Home");
                    
                 },
                 (error) => {
                     this.setState({ error });
                 }
        ); 
    }
    
    getConfig(){
        let { navigation, auth } = this.props;
    
        var param={
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(),
          }
       
         var url='https://masterdiskon.com/';
         var dir='front/api/common/config';
         
         PostDataNew(url,dir,param)
             .then((result) => {
                    var config=result;
                    console.log('getConfig',JSON.stringify(config));
                    AsyncStorage.setItem('config', JSON.stringify(config)); 
                    navigation.navigate("Home");
             },
             (error) => {
                 this.setState({ error });
             }
        ); 
    
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
            //navigation.navigate("Home");
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