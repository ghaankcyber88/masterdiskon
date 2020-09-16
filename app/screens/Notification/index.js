import React, { Component } from "react";
import { RefreshControl, FlatList,TouchableOpacity,AsyncStorage,ActivityIndicator,Image } from "react-native";
import { BaseStyle, BaseColor,Images } from "@config";
import { Header, SafeAreaView, Icon, ListThumbCircle, Text,Button,Tag} from "@components";
import styles from "./styles";
import {PostData} from '../../services/PostData';
// Load sample data
import { DataNotif } from "@data";
import { View } from "react-native-animatable";
import CardCustomNotif from "../../components/CardCustomNotif";

import NotYetLogin from "../../components/NotYetLogin";
import {PostDataNew} from '../../services/PostDataNew';
export default class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            login:false,
            notification:DataNotif,
            statuses: [
                { id: "0", name: "Belum Dilihat", checked: true },
                { id: "1", name: "Sudah Dilihat" },
            ],
            idParam:"0",
            status:"belum_dilihat"

        };
        this.getConfig();
        this.getSession();
    }
    
    getConfig(){    
        AsyncStorage.getItem('config', (error, result) => {
            if (result) {    
                let config = JSON.parse(result);
                this.setState({config:config});
            }
        });
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
    
    onSelectStatus(select) {
        this.setState({
            statuses: this.state.statuses.map(item => {
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
        //alert(select.id);
        this.setState({idParam:select.id});
        if(select.id=="0"){
            this.setState({status:"belum_dilihat"});
        }else{
            this.setState({status:"dilihat"});
        }
        setTimeout(() => {
            this.fetchs();
        }, 200);
        
        
    }
    

    
    fetchs(){
        const {config,login,idParam,id_user,status} =this.state;
        var url=config.baseUrl;
        var path=config.user_notif.dir;
        this.setState({ loading_spinner: true }, () => {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({"param":{"id_user":id_user,"seen":idParam}});
            console.log("paramnotif",raw);
            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };
            
            fetch(url+path, requestOptions)
                .then(response => response.json())
              .then(result => {
                console.log("getNotif",JSON.stringify(result));
                this.setState({loading_spinner: false });
                this.setState({notification:result});
              })
              .catch(error => console.log('error', error));
        });
    }
    

    componentDidMount() {
        let {} = this.state;
        const {navigation} = this.props;
            navigation.addListener ('willFocus', () =>{
                this.setState({ loading_spinner: true });
                setTimeout(() => {
                    this.fetchs();
                }, 200);
            });
        //}
    }

        
    render() {
        const { navigation } = this.props;
        let { notification,login,loading_spinner,statuses } = this.state;

        var content=<View></View>
        if (notification.length == 0) {
            content=<View
                        style={{
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100%',padding: 20
                            }}
                        >       
                        <Image
                            source={Images.empty}
                            style={{ width: "50%", height: "50%" }}
                            resizeMode="cover"
                        />
                        <View><Text>Data Kosong</Text></View>
                        </View>
        }else{
            content=<FlatList
                        refreshControl={
                            <RefreshControl
                                colors={[BaseColor.primaryColor]}
                                tintColor={BaseColor.primaryColor}
                                refreshing={this.state.refreshing}
                                onRefresh={() => { }}
                            />
                        }
                        data={notification}
                        keyExtractor={(item, index) => item.id_notification}
                        renderItem={({ item, index }) => (
                            <CardCustomNotif
                                image={item.image}
                                txtLeftTitle={item.title}
                                txtContent={item.content}
                                txtRight={item.id_user}
                                loading={this.state.loading_spinner}
                                onPress={() => {
                                    var param={
                                        url:item.tautan+'?access=app',
                                        title:'Order Detail',
                                        subTitle:''
                                    }
                                    
                                    this.props.navigation.navigate("WebViewPage",{param:param});
                                }}
                            />
                        )}
                    /> 
        }

        return (
            <SafeAreaView
            style={[BaseStyle.safeAreaView,{backgroundColor:BaseColor.bgColor}]}
                forceInset={{ top: "always" }}
            >
                <Header
                    title="Notification"
                    renderLeft={() => {
                        return (
                            <Icon
                                name="arrow-left"
                                size={20}
                                color={BaseColor.blackColor}
                            />
                        );
                    }}
                    onPressLeft={() => {
                        navigation.goBack();
                    }}
                />
                 {
                    login ? 
                    <View style={{}}>
                        <View style={[styles.contentList]}>
                            <View style={{marginLeft:20}}>
                            <FlatList
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                data={statuses}
                                keyExtractor={(item, index) => item.id}
                                renderItem={({ item, index }) => (
                                    <Tag
                                        primary={item.checked}
                                        style={{ marginRight: 10, width: 'auto' }}
                                        outline={!item.checked}
                                        onPress={() =>
                                            this.onSelectStatus(item)
                                        }
                                    >
                                        {item.name}
                                    </Tag>
                                )}
                            />
                            </View>
                        </View>
                        {content}
                        
                    </View>
                       
                         
                :
                    <NotYetLogin redirect={'Notification'} navigation={navigation} />
                }
                
            </SafeAreaView>
        );
    }
}
