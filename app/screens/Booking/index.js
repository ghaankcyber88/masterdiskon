import React, { Component } from "react";
import { RefreshControl, FlatList,TouchableOpacity,AsyncStorage,ActivityIndicator } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, ListThumbCircle, Text,Button,CommentItem,Tag} from "@components";
import styles from "./styles";
import {PostData} from '../../services/PostData';
// Load sample data
// import { NotificationData,DataLoading,DataBooking } from "@data";
import { View } from "react-native-animatable";
import { Image } from "@components";
import { Images } from "@config";
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
            login:false,
            dataBooking:DataBooking,
            loading_spinner:false,
            
            statusTagihan:false,
            statusComplete:true,
            statusArsip:true,
            status:'tagihan'
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
    
    
    fetch(){
        const {config} =this.state;
        var url=config.baseUrl;
        var path=config.user_order.dir;
        
        var id_user=this.state.id_user;
        var data={"id":id_user,"id_order":"","order_status":this.state.status,"product":""}
        var parameter={"param":data}

        var body=parameter;
        console.log('bodyparamter',JSON.stringify(body));
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
   

    componentDidMount() {
        const {navigation} = this.props;
        navigation.addListener ('willFocus', () =>{
            this.setState({ loading_spinner: true });
            setTimeout(() => {
                this.fetch();
            }, 200);
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

    render() {
        const { navigation } = this.props;
        let { login,loading_spinner,dataBooking} = this.state;
    
        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <Header
                    title="Booking"
                    subTitle={"Menampilkan riwayat  90 hari terakhir"}
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
                        <View style={{paddingTop: 10}}>
                            <View style={{flexDirection: "row",
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
                            </View>
                            <FlatList
                                refreshControl={
                                    <RefreshControl
                                        colors={[BaseColor.primaryColor]}
                                        tintColor={BaseColor.primaryColor}
                                        refreshing={this.state.refreshing}
                                        onRefresh={() => { }}
                                    />
                                }
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
                        </View>
                :
                    <NotYetLogin redirect={'Booking'} navigation={navigation} />
                }
                
            </SafeAreaView>
        );
    }
}
