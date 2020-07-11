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


import React, {useEffect} from 'react'
import {View, StyleSheet, Text, Button} from 'react-native'
import {fcmService} from './src/FCMService'
import {localNotificationService} from './src/LocalNotificationService'
import App from "./navigation";
import { store, persistor } from "app/store";
import { StatusBar,AsyncStorage } from "react-native";
import { BaseColor } from "@config";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import I18n from "react-native-i18n";
export default function index() {
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
      //console.log("[App] onNotification: ", notify)
      alert("[App] onNotification: " + notify.body);
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
      alert("Open Notification: " + notify.body)
    }

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

