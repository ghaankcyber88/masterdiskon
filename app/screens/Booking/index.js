import React, { Component } from "react";
import { RefreshControl, FlatList,AsyncStorage,Image } from "react-native";
import { BaseStyle, BaseColor,Images } from "@config";
import { Header, SafeAreaView, Icon, Text,Tag} from "@components";
import styles from "./styles";
import { View } from "react-native-animatable";
import NotYetLogin from "../../components/NotYetLogin";
import CardCustomBooking from "../../components/CardCustomBooking";
import {DataBooking } from "@data";

export default class Booking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            login:false,
            dataBooking:DataBooking,
            loading_spinner:false,
            statuses: [
                { id: "1", name: "New Order", checked: true },
                { id: "3", name: "Processed" },
                { id: "5", name: "Paid" },
                { id: "7", name: "Booked" },
                { id: "9", name: "Complete" },
                { id: "11", name: "Canceled" },
                { id: "13", name: "Expired" },
                { id: "15", name: "Billed" },
                { id: "17", name: "Deny" },
                { id: "19", name: "Error" },
                { id: "21", name: "Dropped" },
                { id: "23", name: "Refunded" }
            ],
            idParam:"1"
        };
        this.getConfig();
        this.getSession();
    }
    
    getConfig(){    
        AsyncStorage.getItem('config', (error, result) => {
            if (result) {    
                let config = JSON.parse(result);
                //console.log('getConfig',config);
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
    
    
    fetch(){
            const {config,login,id_user,idParam} =this.state;
        
            var url=config.baseUrl;
            var path=config.user_order.dir;
            
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            
            var raw = JSON.stringify({"param":{"id":id_user,"id_order":"","id_order_status":idParam,"product":""}});
            
            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };
            
            fetch(url+path, requestOptions)
              .then(response => response.json())
              .then(result => {
                this.setState({loading_spinner: false });
                this.setState({dataBooking: result});
              })
              .catch(error => console.log('error', error));
    }
   

    componentDidMount() {
        let {} = this.state;
        const {navigation} = this.props;
            navigation.addListener ('didFocus', () =>{
                this.setState({ loading_spinner: true });
                setTimeout(() => {
                    this.fetch();
                }, 200);
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
        
        this.setState({idParam:select.id});
        setTimeout(() => {
            this.fetch();
        }, 200);
        
        
    }

    render() {
        const { navigation } = this.props;
        let { login,dataBooking,statuses} = this.state;

        var content=<View></View>
        if (dataBooking.length == 0) {
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
                        // horizontal={true}
                        // showsHorizontalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                colors={[BaseColor.primaryColor]}
                                tintColor={BaseColor.primaryColor}
                                refreshing={this.state.refreshing}
                                onRefresh={() => { }}
                            />
                        }
                        style={{}}
                        data={dataBooking}
                        keyExtractor={(item, index) => item.id}
                        renderItem={({ item, index }) => (
                    
                            <CardCustomBooking
                                style={{ marginTop: 10 }}
                                item={item}
                                loading={this.state.loading_spinner}
                                navigation={navigation}
                            
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
                    title="Booking"
                    subTitle={""}
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
                                name="sync-alt"
                                size={20}
                                color={BaseColor.primaryColor}
                            />
                            
                        );
                    }}
                    
                    onPressLeft={() => {
                        navigation.goBack();
                    }}
                    
                    onPressRight={() => {
                        var redirect='Booking';
                        var param={}
                        navigation.navigate("Loading",{redirect:redirect,param:param});
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
                                            style={{ marginRight: 10, width: 80 }}
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
                    <NotYetLogin redirect={'Booking'} navigation={navigation} />
                }
                
            </SafeAreaView>
        );
    }
}
