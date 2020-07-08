import React, { Component } from "react";
import { RefreshControl, FlatList,TouchableOpacity,AsyncStorage,ActivityIndicator } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, ListThumbCircle, Text,Button,CommentItem} from "@components";
import styles from "./styles";
import {PostData} from '../../services/PostData';
// Load sample data
import { NotificationData,DataLoading,DataBooking } from "@data";
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

export default class Booking extends Component {
    constructor(props) {
        super(props);

        AsyncStorage.getItem('userSession', (error, result) => {
            if (result) {
                let userSession = JSON.parse(result);
                console.log("---------------data session user  ------------");
                console.log(JSON.stringify(userSession));
                this.setState({userSession:userSession});
                this.setState({login:true});
             }
            
        });
        
        this.state = {
            refreshing: false,
            login:false,
            dataBooking:DataBooking,
            loading_spinner:false,

        };
    }
    
    fetch(){

        this.setState({ loading_spinner: true }, () => {

            AsyncStorage.getItem('userSession', (error, result) => {
            if (result) {
                let userSession = JSON.parse(result);
                console.log("---------------data session user  ------------");
                console.log(JSON.stringify(userSession));
                this.setState({userSession:userSession});
                this.setState({login:true});
                
                var id_user=userSession.id_user;
                    const data={"id":id_user,"id_order":"","order_status":"","product":""}
                    const param={"param":data}
                    console.log('-------------param booking-------------');
                    console.log(JSON.stringify(param));


                    PostData('get_booking_history',param)
                        .then((result) => {
                            console.log("---------------get_booking_history ------------");
                            console.log(JSON.stringify(result));
                            this.setState({ loading_spinner: false });
                            this.setState({dataBooking:result});
                        },
                        (error) => {
                            this.setState({ error });
                        }
                    ); 

             }else{
                this.setState({login:false});
             }
            
            });
        });

    }


    componentDidMount() {
        const {navigation} = this.props;
        navigation.addListener ('willFocus', () =>{
            this.fetch();
        });
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
                    renderLeft={() => {
                        return (
                            <Icon
                                name="arrow-left"
                                size={20}
                                color={BaseColor.primaryColor}
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
                            data={dataBooking}
                            keyExtractor={(item, index) => item.id}
                            renderItem={({ item, index }) => (
                           
                                <CommentItem
                                    style={{ marginTop: 10 }}
                                    item={item}
                                    loading={this.state.loading_spinner}
                                    navigation={navigation}
                                   
                                />
                            )}
                        /> 
                :
                    <NotYetLogin redirect={'Booking'} navigation={navigation} />
                }
                
            </SafeAreaView>
        );
    }
}
