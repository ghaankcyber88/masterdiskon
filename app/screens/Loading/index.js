import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthActions } from "@actions";
import { ActivityIndicator, View } from "react-native";
import { bindActionCreators } from "redux";
import { Images, BaseColor } from "@config";
import SplashScreen from "react-native-splash-screen";
import { Image, Text } from "@components";
import styles from "./styles";
import {PostData} from '../../services/PostData';
import {PostDataNew} from '../../services/PostDataNew';
import { PromotionData, TourData, HotelData,FeaturedDestination,DataMasterDiskon, DataLoading } from "@data";
import {AsyncStorage} from 'react-native';
class Loading extends Component {
    constructor(props) {
        super(props);
        this.state={
            DataMasterDiskon:DataMasterDiskon[0],
            // isProduction:{
            //     status:false,
            //     url:''
            // }
        }
    }

    isProduction(){
    
        this.setState({ loading_production: true }, () => {
            var param={
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(),
              }
            // PostData('isProduction')
            //      .then((result) => {
            //         var status=result.status;
            //         var url=result.url;
            //         if(status==false){
            //             var details=this.state.DataMasterDiskon.aeroStag;
            //         }else{
            //             var details=this.state.DataMasterDiskon.aeroProd;
            //         }
            //         console.log('detailsparam',JSON.stringify(details));
            //         this.getToken(details,url);
                    
            //         console.log('isProduction',JSON.stringify(result));
            //         AsyncStorage.setItem('isProduction',JSON.stringify(result));
            //         this.setState({isProduction:result});
                   
            //      },
            //      (error) => {
            //          this.setState({ error });
            //      }
            //  ); 
             
             
             var url=this.state.DataMasterDiskon.site;
             console.log('baseUrl',url);
             
             PostDataNew(url,'front/api/api/config',param)
                 .then((result) => {
                    console.log('config',JSON.stringify(result));

                    var aeroStatus=result.aeroStatus;
                    var aeroUrl=result.aeroUrl;
                    if(aeroStatus==false){
                        var details=this.state.DataMasterDiskon.aeroStag;
                    }else{
                        var details=this.state.DataMasterDiskon.aeroProd;
                    }
                    console.log('detailsparam',JSON.stringify(details));
                    this.getToken(details,aeroUrl);
                    
                    AsyncStorage.setItem('config',JSON.stringify(result));
                    this.setState({config:result});
                    
                    
                 },
                 (error) => {
                     this.setState({ error });
                 }
            ); 
        
        
        });
    
    }
    
    getToken(details,url){
        let { navigation, auth } = this.props;
        let status = auth.login.success;
        var formBody = [];
        for (var property in details) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        
       
        // fetch(url+'connect/token', {
        //   method: 'POST',
        //   headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/x-www-form-urlencoded'
        //   },
        //   body: formBody
        // })
        // .then(response => response.json())
        // .then(result => {
        //     var access_token=result.access_token;
        //     console.log("-------token agi loading------");
        //     console.log(access_token);
        //     AsyncStorage.setItem('tokenAgi', access_token); 
            
        //     navigation.navigate("Home");
        // })
        // .catch(error => console.log('error', error));
        
        
        var param={
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
          }


        PostDataNew(url,'connect/token',param)
                 .then((result) => {
                    var access_token=result.access_token;
                    console.log('token agi loading',access_token);
                    AsyncStorage.setItem('tokenAgi', access_token); 
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
                navigation.navigate(redirect,{param:param});
            }, 500);
        }else{
            this.isProduction();
            // switch (status) {
            //     case true:
            //         setTimeout(() => {
            //             navigation.navigate("Home");
            //         }, 500);
            //         break;
            //     case false:
            //         setTimeout(() => {
            //             navigation.navigate("Home");
            //         }, 500);
            //         break;
            //     default:
            //         break;
            // }
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
            <View style={styles.container}>
                {/* <Image
                    source={Images.logo}
                    style={styles.logo}
                    resizeMode="contain"
                /> */}
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
                    {/* <Text title1 whiteColor semibold>
                        MasterDiskon
                    </Text> */}
                    <ActivityIndicator
                        size="large"
                        // color={BaseColor.whiteColor}
                        style={{
                            marginTop: 20
                        }}
                    />
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
