import React, { Component } from "react";
import {
    FlatList,
    RefreshControl,
    View,
    Animated,
    Platform,
    ActivityIndicator,
    ScrollView,
    Alert,
    TouchableOpacity
} from "react-native";
import NotYetLogin from "../../components/NotYetLogin";

import { BaseStyle, BaseColor } from "@config";
import {
    Header,
    SafeAreaView,
    Icon,
    FilterSort,Text,Button
} from "@components";
import styles from "./styles";
import { FlightData } from "@data";
import {PostData} from '../../services/PostData';
import {AsyncStorage} from 'react-native';
import CartCard from "../../components/CartCard";
import ActionCart from "../../components/ActionCart";
import DropdownAlert from 'react-native-dropdownalert';
import ButtonOrder from "../../components/ButtonOrder";

import moment from 'moment';
//import { cos } from "react-native-reanimated";



export default class Cart extends Component {
    constructor(props) {
        super(props);

        

        AsyncStorage.getItem('userSession', (error, result) => {
            if (result) {
                let userSession = JSON.parse(result);
                console.log("---------------data session user  ------------");
                console.log(JSON.stringify(userSession));
                this.setState({userSession:userSession});
                this.setState({login:true});

                var id_user=userSession.id_user;
                this.setState({id_user:id_user});
               
             }
            
        });


        const scrollAnim = new Animated.Value(0);
        const offsetAnim = new Animated.Value(0);
      
        this.state = {
            refreshing: false,
            flights: FlightData,
            scrollAnim,
            offsetAnim,
            clampedScroll: Animated.diffClamp(
                Animated.add(
                    scrollAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                        extrapolateLeft: "clamp"
                    }),
                    offsetAnim
                ),
                0,
                40
            ),
            loading: false,
            
            payment_method:'013',
            payment_method_title:'Permata ATM',

        };
        
        this.onSubmit = this.onSubmit.bind(this);
        this.updatePrice=this.updatePrice.bind(this);
        this.deleteCart=this.deleteCart.bind(this);
        this.checkout=this.checkout.bind(this);
        
    }

    



    fetchData() {
    
        AsyncStorage.getItem('dataCartArrayReal', (error, result) => {
            if (result) {
                let dataCartArrayReal = JSON.parse(result);
                console.log("---------------dataCartArrayReal pagez  ------------");
                console.log(JSON.stringify(dataCartArrayReal));

                var totalCartPriceReal=0;
                dataCartArrayReal.map(item => {
                    totalCartPriceReal=totalCartPriceReal+item.total_price;
                });
                this.setState({totalCartPriceReal:totalCartPriceReal});
                this.setState({dataCartArrayReal:dataCartArrayReal});
                this.setState({countCartReal:dataCartArrayReal.length});
             }
            
        });


        AsyncStorage.getItem('dataCartArray', (error, result) => {
            if (result) {
                let dataCartArray = JSON.parse(result);
                console.log("---------------dataCartArray page  ------------");
                console.log(JSON.stringify(dataCartArray));
        
                var totalCartPrice=0;
                dataCartArray.map(item => {
                    totalCartPrice=totalCartPrice+item.total_price;
                });
                this.setState({totalCartPrice:totalCartPrice});
                this.setState({dataCartArray:dataCartArray});
                this.setState({countCart:dataCartArray.length});
             }
            
        });

    }

    updatePrice(idCart){
        setTimeout(() => {
            var dataCartArrayReal=this.state.dataCartArrayReal;
            dataCartArrayReal = dataCartArrayReal.filter(item => item.id != idCart);
    
            this.setState({dataCartArrayReal:dataCartArrayReal});
            AsyncStorage.setItem('dataCartArrayReal', JSON.stringify(dataCartArrayReal));
            this.dropdown.alertWithType('error', 'Time Limit Zero', 'Time Limit Cart Zero');
            this.fetchData();
        }, 500);
    }
    
    checkout(item){
        const { navigation } = this.props;
        console.log('checkout',JSON.stringify(item));
        navigation.navigate("CheckOut",{item:item}); 
    }

  

    deleteCart(idCart){
        setTimeout(() => {
            var dataCartArray=this.state.dataCartArray;
            dataCartArray = dataCartArray.filter(item => item.id != idCart);
    
            this.setState({dataCartArray:dataCartArray});
            AsyncStorage.setItem('dataCartArray', JSON.stringify(dataCartArray));
            AsyncStorage.setItem('dataCartArrayReal', JSON.stringify(dataCartArray));
            this.dropdown.alertWithType('success', 'Success', 'Success Remove Cart');
            this.fetchData();
        }, 500);
    }

   
    


    renderContent() {
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

        const { flights, refreshing, clampedScroll } = this.state;
        const { navigation } = this.props;
        const navbarTranslate = clampedScroll.interpolate({
            inputRange: [0, 40],
            outputRange: [0, -40],
            extrapolate: "clamp"
        }); 
        
        var content='';
            content=<Animated.FlatList
            contentContainerStyle={{
                paddingTop: 10,
                paddingBottom: 20
            }}
            
            scrollEventThrottle={1}
            onScroll={Animated.event(
                [
                    {
                        nativeEvent: {
                            contentOffset: {
                                y: this.state.scrollAnim
                            }
                        }
                    }
                ],
                { useNativeDriver: true }
            )}
            data={this.state.dataCartArray}
            keyExtractor={(item, index) => item.id}
            renderItem={({ item, index }) => (
                <View style={{marginBottom:20}}> 
                <CartCard
                    item={item}
                    deleteCart={this.deleteCart}
                    updatePrice={this.updatePrice}
                    checkout={this.checkout}
                    onPress={() => this.onSelect(item)}
                    detail={false}
                />  
                    
                    
                </View>
            )}
        />
        
       
      
        return (
            <View style={{ flex: 1 }}>
                {content}
                <Animated.View
                    style={[
                        styles.navbar,
                        { transform: [{ translateY: navbarTranslate }] }
                    ]}
                >
                </Animated.View>
            </View>
        );
    }



  
    componentDidMount() {
        const {navigation} = this.props;
        navigation.addListener ('willFocus', () =>{
            this.fetchData();
        });
       
    }


    onSubmit(){
        this.setState({ loading: true }, () => {
            AsyncStorage.getItem('tokenAgi', (error, result) => {
                if (result) {    
                    var access_token=result;
                    var dataCartArrayRealSend={
                    "cart_select":this.state.dataCartArrayReal,
                    "token":access_token,
                    "id_user":this.state.id_user,
                    "dataCart":this.state.dataCart,
                    "dataSavePerson":this.state.dataPersonSave,
                    "paramOther":this.state.paramOther,
                    }
                    
                    console.log("---------------data cart array cart kirim  ------------");
                    console.log(JSON.stringify(dataCartArrayRealSend));

             
                    
                    var myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");


                    var raw = JSON.stringify(dataCartArrayRealSend);
                    var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                    };

                    // fetch("https://masterdiskon.com/front/api/apiOrder/submit", requestOptions)
                    // .then(response => response.json())
                    // .then((result) => {
                    //     var dataOrderSubmit=result;
                    //     console.log("---------------status carts-------------");
                    //     console.log(JSON.stringify(dataOrderSubmit));
                    //         this.setState({ loading: false });
                            

                    //             id_order=result.id_order;
                    //             pay=result.pay;

                    //             var redirect='Pembayaran';
                    //             setTimeout(() => {
                    //                 var id_order=dataOrderSubmit.id_order;
                    //                 //this.props.navigation.navigate("Pembayaran",{dataOrderSubmit:dataOrderSubmit});
                    //                 this.props.navigation.navigate("Loading",{redirect:redirect,param:id_order});
                    //             }, 500);
                    //             //this.getVa(dataOrderSubmit);
                    // });

                }
            });
        });

    }





    setPayment(payment_method,payment_method_title){
        this.setState({payment_method: payment_method});
        this.setState({payment_method_title: payment_method_title});
    }

    render() {
        const { navigation} = this.props;
        let { loading_spinner,loading,login } = this.state;
        var title='Cart';
        var subTitle='asd';
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));


        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
               

                <Header
                    title="Booking"
                    //subTitle={this.state.countCartReal+' Cart'}
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
                                name="home"
                                size={24}
                                color={BaseColor.primaryColor}
                            />
                        );
                    }}
                
                    onPressLeft={() => {
                        navigation.goBack();
                    }}
                    onPressRight={() => {
                        navigation.navigate("Home");
                    }}
                />

                
                <ScrollView>
                    <View style={styles.contain}>
                       {this.renderContent(this.state.dataCartArrayReal)}
                    </View>
                </ScrollView>
                
            
                    
                <View style={styles.contentButtonBottom}>
                    <View>
                        <Text caption1 semibold>
                            Total Price
                        </Text>
                        <Text title3 primaryColor semibold>
                            IDR {priceSplitter(this.state.totalCartPriceReal)}
                        </Text>
                    </View>
                </View>
                <DropdownAlert ref={ref => this.dropdown = ref} messageNumOfLines={10} closeInterval={10000} />
            </SafeAreaView>
        );
    }
}
