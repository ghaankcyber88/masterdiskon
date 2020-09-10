import React, { Component } from "react";
import { RefreshControl, FlatList,TouchableOpacity,AsyncStorage,ActivityIndicator,Image } from "react-native";
import { BaseStyle, BaseColor,Images } from "@config";
import { Header, SafeAreaView, Icon, ListThumbCircle, Text,Button,CommentItem,Tag} from "@components";
import styles from "./styles";
import {PostData} from '../../services/PostData';
// Load sample data
// import { NotificationData,DataLoading,DataBooking } from "@data";
import { View } from "react-native-animatable";
import NotYetLogin from "../../components/NotYetLogin";
import PTRView from 'react-native-pull-to-refresh';
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade
} from "rn-placeholder";
import CardCustomBooking from "../../components/CardCustomBooking";
import {DataLoading,DataConfig,DataBooking } from "@data";
import {PostDataNew} from '../../services/PostDataNew';

export default class Booking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            login:true,
            dataBooking:DataBooking,
            loading_spinner:false,
            
            statusTagihan:false,
            statusComplete:true,
            statusArsip:true,
            status:'tagihan',
            
            facilities: [
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
            id:"1"
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
    
    
    fetch(id){
        const {config,login} =this.state;
        if(login==true){
        var url=config.baseUrl;
        var path=config.user_order.dir;
        
        var id_user=this.state.id_user;
        // var data={"id":id_user,"id_order":"","order_status":this.state.status,"product":""}
        var data={"id":id_user,"id_order":"","id_order_status":id,"product":""}
        //console.log("param_order",JSON.stringify(data));

        var parameter={"param":data}

        var body=parameter;
        //console.log('bodyparamter',JSON.stringify(body));
        this.setState({ loading_spinner: true }, () => {
            var param={
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
              }
             PostDataNew(url,path,param)
                 .then((result) => {
                    console.log("fetch",JSON.stringify(result));
                    this.setState({loading_spinner: false });
                    this.setState({dataBooking: result});
                 },
                 (error) => {
                     this.setState({ error });
                 }
            ); 
        });
        }
    }
   

    componentDidMount() {
        let { login} = this.state;
        const {navigation} = this.props;
        
        
            navigation.addListener ('didFocus', () =>{
                this.setState({ loading_spinner: true });
                this.setStatus('tagihan');
                //setTimeout(() => {
                    this.fetch(this.state.id);
                //}, 200);
            });
    }
    
    setStatus(status){
        this.setState({status:status});
        if(status=='tagihan'){
            this.setState({statusTagihan:false});
            this.setState({statusComplete:true});
            this.setState({statusArsip:true});
        }else if(status=='complete'){
            this.setState({statusTagihan:true});
            this.setState({statusComplete:false});
            this.setState({statusArsip:true});
        
        }else if(status=='arsip'){
            this.setState({statusTagihan:true});
            this.setState({statusComplete:true});
            this.setState({statusArsip:false});
        }
        //this.fetch();
        setTimeout(() => {
            this.fetch();
        }, 200);
    }
    
    // onSelectFacilities(select) {
    //     this.setState({
    //         facilities: this.state.facilities.map(item => {
    //             if (item.id == select.id) {
    //                 return {
    //                     ...item,
    //                     checked: true
    //                 };
    //             } else {
    //                 return {
    //                     ...item,
    //                     checked: false
    //                 };
    //             }
    //         })
    //     });
    //     this.fetch(select.id);
    // }

    render() {
        const { navigation } = this.props;
        let { login,loading_spinner,dataBooking,facilities} = this.state;

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
                        style={{marginTop:10}}
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
                style={[BaseStyle.safeAreaView,{backgroundColor:'#f5f6fa'}]}
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
                            {/* <View style={{flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: 'center',
                                        alignItems: "center",textAlignVertical: "center",textAlign: "center"}}>
                                    <Tag
                                        outline={this.state.statusTagihan}
                                        primary={true}
                                        //round
                                        onPress={() => this.setStatus('tagihan')}
                                        style={{ marginRight: 20 }}
                                    >
                                        Tagihan
                                    </Tag>
                                    <Tag
                                        outline={this.state.statusComplete}
                                        primary={true}
                                        //round
                                        onPress={() => this.setStatus('complete')}
                                        style={{ marginRight: 20 }}
                                    >
                                        Complete
                                    </Tag>
                                    <Tag
                                        outline={this.state.statusArsip}
                                        primary={true}
                                        //round
                                        onPress={() => this.setStatus('arsip')}
                                    >
                                        Arsip
                                    </Tag>
                            </View> */}
                            
                            <View style={[styles.contentList,{backgroundColor:BaseColor.whiteColor,borderBottomLeftRadius: 20,borderBottomRightRadius: 20}]}>
                                <View style={{marginLeft:20,marginRight:20}}>
                                <FlatList
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    data={facilities}
                                    keyExtractor={(item, index) => item.id}
                                    renderItem={({ item, index }) => (
                                        <Tag
                                            primary={item.checked}
                                            style={{ marginRight: 10, width: 80 }}
                                            outline={!item.checked}
                                            onPress={() =>
                                                this.onSelectFacilities(item)
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
