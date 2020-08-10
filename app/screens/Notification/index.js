import React, { Component } from "react";
import { RefreshControl, FlatList,TouchableOpacity,AsyncStorage,ActivityIndicator } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, ListThumbCircle, Text,Button} from "@components";
import styles from "./styles";
import {PostData} from '../../services/PostData';
// Load sample data
import { NotificationData,DataLoading } from "@data";
import { View } from "react-native-animatable";
import { Image } from "@components";
import { Images } from "@config";
import CardCustomNotif from "../../components/CardCustomNotif";

import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade
} from "rn-placeholder";
import NotYetLogin from "../../components/NotYetLogin";
import PTRView from 'react-native-pull-to-refresh';
import {PostDataNew} from '../../services/PostDataNew';
export default class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            login:true,
            notification:DataLoading,

        };
        this.getConfig();
        this.getSession();
    }
    
    getConfig(){    
        AsyncStorage.getItem('config', (error, result) => {
            if (result) {    
                let config = JSON.parse(result);
                console.log('getConfig',config);
                this.setState({config:config});
            }
        });
    }
    
    
    getSession(){    
        AsyncStorage.getItem('userSession', (error, result) => {
            if (result) {    
                let userSession = JSON.parse(result);
                var id_user=userSession.id_user;
                console.log('getSession',userSession);
                this.setState({id_user:id_user});
                this.setState({userSession:userSession});
                this.setState({login:true});
            }
        });
    }
    

    getNotif(){
        const {config} =this.state;
        var url=config.baseUrl;
        var path=config.url_md.common.notif;
        
        var id_user=this.state.id_user;
        var data={"id_user":id_user}
        var param={"param":data}

        var body=param;
        this.setState({ loading_spinner: true }, () => {
            var param={
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: body,
              }
             PostDataNew(url,path,param)
                 .then((result) => {
                    //console.log("getOrder",JSON.stringify(result));
                    this.setState({loading_spinner: false });
                    this.setState({notification:result});
                 },
                 (error) => {
                     this.setState({ error });
                 }
            ); 
        });
    }
    
    
    

    componentDidMount() {
        const {navigation} = this.props;
        navigation.addListener ('willFocus', () =>{
            this.setState({ loading_spinner: true });
            setTimeout(() => {
                this.getNotif();
            }, 200);
        });
    }
    _refresh() {
        return new Promise((resolve) => {
          setTimeout(()=>{resolve()}, 2000)
        });
    }
        
    render() {
        const { navigation } = this.props;
        let { notification,login,loading_spinner } = this.state;

        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <Header
                    title="Notification"
                    renderLeft={() => {
                        return (
                            <Icon
                                name="arrow-left"
                                size={20}
                                color={BaseColor.whiteColor}
                            />
                        );
                    }}
                    onPressLeft={() => {
                        navigation.goBack();
                    }}
                />
                 {
                    login ? 
                       
                        <FlatList
                            refreshControl={
                                <RefreshControl
                                    colors={[BaseColor.primaryColor]}
                                    tintColor={BaseColor.primaryColor}
                                    refreshing={this.state.refreshing}
                                    onRefresh={() => { }}
                                />
                            }
                            data={notification}
                            keyExtractor={(item, index) => item.id}
                            renderItem={({ item, index }) => (
                                <CardCustomNotif
                                    image={item.image}
                                    txtLeftTitle={item.title}
                                    txtContent={item.content}
                                    txtRight={item.date_added}
                                    loading={this.state.loading_spinner}
                                    onPress={() => {
                                        this.props.navigation.navigate("WebViewPage",{url:item.tautan+'?access=app',title:'Pembayaran'});
                                    }}
                                />
                            )}
                        /> 
                :
                    <NotYetLogin redirect={'Notification'} navigation={navigation} />
                }
                
            </SafeAreaView>
        );
    }
}
