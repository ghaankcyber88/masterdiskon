// import React, { Component } from "react";
// import { store, persistor } from "app/store";
// import { StatusBar } from "react-native";
// import { BaseColor } from "@config";
// import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
// import I18n from "react-native-i18n";
// import App from "./navigation";

// console.disableYellowBox = true;

// export default class index extends Component {
//     constructor(props) {
//         super(props);

//         /**
//          * Define translation
//          * 
//          * @author Passion UI <passionui.com>
//          * @date 2019-08-03
//          */
//         I18n.fallbacks = true;
//         I18n.translations = {
//             en: require("./lang/en.json"),
//             ko: require("./lang/ko.json"),
//             vi: require("./lang/vi.json")
//         };
//     }

//     componentDidMount() {
//         StatusBar.setBackgroundColor(BaseColor.primaryColor, true);

//         StatusBar.setBackgroundColor("rgba(0,0,0,0)");
//         //StatusBar.setTranslucent(true);
//     }

//     render() {
//         return (
//             <Provider store={store}>
//                 <PersistGate loading={null} persistor={persistor}>
//                     <App />
//                 </PersistGate>
//             </Provider>
//         );
//     }
// }


import React, {useEffect,useState} from 'react'
import {View, StyleSheet, Text, Button} from 'react-native'
import {fcmService} from './src/FCMService';
import {localNotificationService} from './src/LocalNotificationService';
import App from "./navigation";
import { store, persistor } from "app/store";
import { StatusBar,AsyncStorage } from "react-native";
import { BaseColor } from "@config";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import I18n from "react-native-i18n";
import {PostDataNew} from './services/PostDataNew';

export default function index() {
  //const [config, setConfig]= useState({});

  useEffect(() => {
    console.disableYellowBox = true;
    I18n.fallbacks = true;
    I18n.translations = {
            en: require("./lang/en.json"),
            ko: require("./lang/ko.json"),
            vi: require("./lang/vi.json")
    };
    StatusBar.setBackgroundColor(BaseColor.primaryColor, true);
    StatusBar.setBackgroundColor("rgba(0,0,0,0)");
    
    
    


    fcmService.registerAppWithFCM()
    fcmService.register(onRegister, onNotification, onOpenNotification)
    localNotificationService.configure(onOpenNotification)
    

    function onRegister(token) {
      console.log("[App] onRegister: ", token);
      AsyncStorage.setItem('tokenFirebase', token);
    }

    function onNotification(notify) {
      console.log("[App] onNotificationx: ", JSON.stringify(notify));
      //alert("Open Notification: " + notify.body);
      var body_msg=notify.body;
      var body_array = body_msg.split("#");
      var body_notif={
        transaction: body_array[0],
        type: body_array[1],
        order_id: body_array[2],
        gross_amount: body_array[3],
        transaction_id: body_array[4],
        fraud: body_array[5],
        bank: body_array[6]
      }
  
      console.log('body_notif',JSON.stringify(body_notif));
      aeroPayment(body_notif);
      
      
      const options = {
        soundName: 'default',
        playSound: true //,
        // largeIcon: 'ic_launcher', // add icon large for Android (Link: app/src/main/mipmap)
        // smallIcon: 'ic_launcher' // add icon small for Android (Link: app/src/main/mipmap)
      }
      localNotificationService.showNotification(
        0,
        notify.title,
        notify.body,
        notify,
        options
      )
    }

    function onOpenNotification(notify) {
      console.log("[App] onOpenNotification: ", notify)
      //alert("Open Notification: " + notify.body)
    }
    
    
    
    
    function aeroPayment(body_notif){
    
      
      
      AsyncStorage.getItem('config', (error, result) => {
        if (result) {    
            let config = JSON.parse(result);
            body_notif.config=config;
            var paramPost={"param":body_notif}
            console.log('aeroPaymentParam',JSON.stringify(paramPost));
            
            var param={
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(paramPost),
              }
           
              var url=config.baseUrl;
              var dir=config.user_payment.dir;
             
              return PostDataNew(url,dir,param)
                 .then((result) => {
                      console.log('aeroPaymentResult',JSON.stringify(result));
                    },
                 (error) => {
                     this.setState({ error });
                 }
              );  
        }
    });
    
    
      
  
  }
  
    function getConfig(){
    
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
         
         return PostDataNew(url,dir,param)
           .then((result) => {
            //console.log('getConfigIndex',JSON.stringify(result));
            AsyncStorage.setItem('config', JSON.stringify(result)); 
            //setConfig(result);
              },
           (error) => {
               this.setState({ error });
           }
        );  
         
    
    }
  
    getConfig();
    return () => {
      console.log("[App] unRegister")
      fcmService.unRegister()
      localNotificationService.unregister()
    }

  }, [])

  return (
  
     <Provider store={store}>
                      <PersistGate loading={null} persistor={persistor}>
                          <App />
                     </PersistGate>
                  </Provider>
  )

}

