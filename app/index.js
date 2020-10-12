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
import {DataMasterDiskon} from "@data";
import NetInfo from '@react-native-community/netinfo';

export default function index() {
  const [config, setConfig]= useState({});
  const [dataMasterDiskon, setDataMasterDiskon]=useState(DataMasterDiskon[0]);

  useEffect(() => {
    console.disableYellowBox = true;
    I18n.fallbacks = true;
    I18n.translations = {
            en: require("./lang/en.json"),
            ko: require("./lang/ko.json"),
            vi: require("./lang/vi.json")
    };
    StatusBar.setBackgroundColor(BaseColor.whiteColor, false);
    StatusBar.setBackgroundColor("rgba(0,0,0,0)");
    
    StatusBar.setBackgroundColor("rgba(0,0,0,0)");
    StatusBar.setTranslucent(false);
    
    
    //notification START------------------------------------------------------//
    fcmService.registerAppWithFCM()
    fcmService.register(onRegister, onNotification, onOpenNotification)
    localNotificationService.configure(onOpenNotification)

    function onRegister(token) {
      //console.log("[App] onRegister: ", token);
      AsyncStorage.setItem('tokenFirebase', token);
    }

    function onNotification(notify) {
      //console.log("[App] onNotificationx: ", JSON.stringify(notify));
      
      // var body_msg=notify.body;
      // var body_array = body_msg.split("#");
      // var body_notif={
      //   transaction: body_array[0],
      //   type: body_array[1],
      //   order_id: body_array[2],
      //   gross_amount: body_array[3],
      //   transaction_id: body_array[4],
      //   fraud: body_array[5],
      //   bank: body_array[6]
      // }
  
      //console.log('body_notifonNotification',JSON.stringify(body_notif));
      //aeroPayment(body_notif);

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
      //console.log("[App] onOpenNotification: ", notify)
    }
    
    // function aeroPayment(body_notif){
    //         //console.log('body_notifaeroPayment',JSON.stringify(body_notif))
    //         var url=dataMasterDiskon.baseUrl;
    //         var dir='front/api/payment/notification';
    //         var paramPost={"param":body_notif}
    //         //console.log('aeroPaymentParam',JSON.stringify(paramPost));
            
    //         var param={
    //             method: 'POST',
    //             headers: {
    //               Accept: 'application/json',
    //               'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(paramPost),
    //           }
           

             
    //           return PostDataNew(url,dir,param)
    //              .then((result) => {
    //                   //console.log('aeroPaymentResult',JSON.stringify(result));
    //                 },
    //              (error) => {
    //                  this.setState({ error });
    //              }
    //           );  
       
    // }
     //notification END------------------------------------------------------//
 
    return () => {
      //console.log("[App] unRegister")
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

