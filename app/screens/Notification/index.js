import React, { Component } from "react";
import { RefreshControl, FlatList,TouchableOpacity,AsyncStorage,ActivityIndicator } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, ListThumbCircle, Text,Button} from "@components";
import styles from "./styles";
import {PostData} from '../../services/PostData';
// Load sample data
import { NotificationData,DataLoading } from "@data";
import { View } from "react-native-animatable";

import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade
} from "rn-placeholder";

export default class Notification extends Component {
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
            login:true,
            notification:DataLoading,

        };
    }

    getNotif(){
     
        this.setState({ loading_spinner: true }, () => {

            AsyncStorage.getItem('userSession', (error, result) => {
            if (result) {
                let userSession = JSON.parse(result);
                console.log("---------------data session user  ------------");
                console.log(JSON.stringify(userSession));
                this.setState({userSession:userSession});
                this.setState({login:true});
                
                var id_user=userSession.id_user;
                const data={"id_user":id_user}
                const param={"param":data}
                console.log('-------------param notif-------------');
                console.log(JSON.stringify(param));

                    PostData('notif',param)
                                .then((result) => {
                                     console.log('-------------result notif-------------');
                                    console.log(JSON.stringify(result));
                                    this.setState({loading_spinner: false });
                                    this.setState({notification:result});
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
        this.getNotif();
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
                        loading_spinner ? 
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
                                <ListThumbCircle
                                    image={item.image}
                                    txtLeftTitle={item.title}
                                    txtContent={item.content}
                                    txtRight={item.date_added}
                                    loading={this.state.loading_spinner}
                                />
                            )}
                        /> 
                        :
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
                                <ListThumbCircle
                                    image={item.image}
                                    txtLeftTitle={item.title}
                                    txtContent={item.content}
                                    txtRight={item.date_added}
                                    loading={this.state.loading_spinner}
                                />
                            )}
                        />
                :
                <View>
                        <View style={{ padding: 20, alignItems: "center" }}>
                            <Icon
                                name="lock"
                                size={72}
                                color={BaseColor.lightPrimaryColor}
                                style={{ paddingTop: 50, paddingBottom: 20 }}
                            />
                            <Text title3 style={{ marginVertical: 0 }} semibold>
                                Your Profile
                            </Text>
                            <Text body1 grayColor style={{ textAlign: "center" }}>
                                Log in to start planning your next trip
                            </Text>
                            
                            <Button
                                full
                                style={{ marginTop: 20 }}
                                loading={this.state.loading}
                                onPress={() => navigation.navigate("SignIn",{redirect:'Booking'})}
                            >
                                Sign In
                            </Button>
                            <View style={styles.contentActionBottom}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate("SignUp")}
                                >
                                    <Text body1 grayColor>
                                        Haven’t registered yet?
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => navigation.navigate("SignUp")}
                                >
                                    <Text body1 primaryColor>
                                        Join Now
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>    
                    </View>    
                }
                
                  
            </SafeAreaView>
        );
    }
}
