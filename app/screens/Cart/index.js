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

                // var id_user='9';
                var id_user=userSession.id_user;
                this.setState({id_user:id_user});
               
             }
            
        });


        const scrollAnim = new Animated.Value(0);
        const offsetAnim = new Animated.Value(0);
        var dataCart=this.props.navigation.state.params.dataCart;
      
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
            dataCart:dataCart,
            payment_method:'013',
            payment_method_title:'Permata ATM'

        };
        this.onChangeView = this.onChangeView.bind(this);
        this.onFilter = this.onFilter.bind(this);
        this.onChangeSort = this.onChangeSort.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.updatePrice=this.updatePrice.bind(this);
        this.deleteCart=this.deleteCart.bind(this);
        this.setPayment = this.setPayment.bind(this);
        //this.midtrans = this.midtrans.bind(this);
    }

    onChangeSort() {}

    /**
     * @description Open modal when filterring mode is applied
     * @author Passion UI <passionui.com>
     * @date 2019-08-03
     */
    onFilter() {
        const { navigation } = this.props;
        navigation.navigate("FlightFilter");
    }

    /**
     * @description Open modal when view mode is pressed
     * @author Passion UI <passionui.com>
     * @date 2019-08-03
     */
    onChangeView() {}

    /**
     * @description Render container view
     * @author Passion UI <passionui.com>
     * @date 2019-08-03
     * @returns
     */

    removePrice(dataObj)
    {
        var array = {};
        for (var key in dataObj) {
            var obj = {};
            if(key!='price'){
                array[key] = dataObj[key];
            }
        }
        return array;
        
    }

    onSelect(select) {
        

    }


    fetchData() {
        AsyncStorage.getItem('dataCartArrayReal', (error, result) => {
            if (result) {
                let dataCartArrayReal = JSON.parse(result);
                console.log("---------------data cart array cart page  ------------");
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
                console.log("---------------data cart array cart page  ------------");
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

    // updatePrice(dataCartArrayReal,totalReal=0,countReal=0){
    //             this.setState({totalCartPriceReal:totalReal});

    // }

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

   
    alert() {
        Alert.alert(
            'Remove Cart',
            'Yakin ingin mau di hapus ?',
            [
              {text: 'NO', onPress: () => console.warn('NO Pressed'), style: 'cancel'},
              {text: 'YES', onPress: () => console.warn('YES Pressed')},
            ]
          );
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
      
        return (
            <View style={{ flex: 1 }}>
                <Animated.FlatList
                    contentContainerStyle={{
                        paddingTop: 10,
                        paddingBottom: 20
                    }}
                    // refreshControl={
                    //     <RefreshControl
                    //         colors={[BaseColor.primaryColor]}
                    //         tintColor={BaseColor.primaryColor}
                    //         refreshing={refreshing}
                    //         onRefresh={() => {}}
                    //     />
                    // }
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
                            //timeLimit={100}
                            dataCartArrayReal={this.state.dataCartArrayReal}
                            timeLimit={item.time_limit}
                            fromFlight={item.origin.id}
                            toFlight={item.destination.id}
                            from={item.origin.name}
                            to={item.destination.name}
                            type={'aa'}
                            adult={item.adult+' person'}
                            children={item.child+' person'}
                            infant={item.infant+' person'}
                            contactName={item.contact.title+item.contact.first_name+item.contact.last_name}
                            contactPhone={'('+item.contact.phone_code+')'+item.contact.phone_number}
                            total={item.total_price}
                            idCart={item.id}
                            departure={item.id}
                            returns={'aa'}
                            type={item.type_name}
                            deleteCart={this.deleteCart}
                            updatePrice={this.updatePrice}
                            onPress={() => this.onSelect(item)}
                        />
                            {/* <Button
                                style={{ height: 46 }}
                                full
                                onPress={() => {  
                                   //this.deleteCart(item.id,this.state.dataCartArrayReal);
                                   Alert.alert(
                                    'Remove Cart',
                                    'Yakin ingin mau di hapus ?',
                                    [
                                      {text: 'NO', onPress: () => console.warn('NO Pressed'), style: 'cancel'},
                                      {text: 'YES', onPress: () => this.deleteCart(item.id)},
                                    ]
                                  );
                                }}
                            >
                                Delete
                            </Button> */}
                        </View>
                    )}
                />
                <Animated.View
                    style={[
                        styles.navbar,
                        { transform: [{ translateY: navbarTranslate }] }
                    ]}
                >
                    {/* <FilterSort
                        labelCustom="204 results"
                        onChangeSort={this.onChangeSort}
                        onFilter={this.onFilter}
                    /> */}
                </Animated.View>
            </View>
        );
    }

  
    componentDidMount() {
        this.fetchData();
        
        // AsyncStorage.getItem('dataCartArrayReal', (error, result) => {
        //     if (result) {
        //         let dataCartArrayReal = JSON.parse(result);
        //         console.log("---------------data cart array cart page  ------------");
        //         console.log(JSON.stringify(dataCartArrayReal));

        //         var totalCartPriceReal=0;
        //         dataCartArrayReal.map(item => {
        //             totalCartPriceReal=totalCartPriceReal+item.total_price;
        //         });
        //         this.setState({totalCartPriceReal:totalCartPriceReal});
        //         this.setState({dataCartArrayReal:dataCartArrayReal});
        //         this.setState({countCart:dataCartArrayReal.length});
        //      }
            
        // });
      

 }

    duration(expirydate)
    {
        
        var date = moment()
        var diffr = moment.duration(moment(expirydate).diff(moment(date)));
        var hours = parseInt(diffr.asHours());
        var minutes = parseInt(diffr.minutes());
        var seconds = parseInt(diffr.seconds());
        var d = hours * 60 * 60 + minutes * 60 + seconds;
        return d;
        //this.setState({ totalDuration: d });
    
    }

    searhMinTimeLimit(){
        var timeLimits=[];
        this.state.dataCartArrayReal.map(item => {
            //item.time_limit;
            timeLimits.push(this.duration(item.time_limit));
        });
        return Math.min(...timeLimits);

    }


    onSubmit(){
        // var minTimeLimit=this.searhMinTimeLimit();
        // this.setState({minTimeLimit:minTimeLimit});

        this.setState({ loading: true }, () => {
            AsyncStorage.getItem('tokenAgi', (error, result) => {
                if (result) {    
                    var access_token=result;
                    var dataCartArrayRealSend={
                    "cart_select":this.state.dataCartArrayReal,
                    "token":access_token,
                    "id_user":this.state.id_user,
                    "dataCart":this.state.dataCart
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

                    fetch("https://masterdiskon.com/front/product/flightapp/fu_submit_flight", requestOptions)
                    .then(response => response.json())
                    .then((result) => {
                        var dataOrderSubmit=result;
                        console.log("---------------status carts-------------");
                        console.log(JSON.stringify(dataOrderSubmit));
                            this.setState({ loading: false });
                                id_order=result.id_order;
                                pay=result.pay;
                                setTimeout(() => {
                                    const data={  
                                        "dataOrderSubmit": dataOrderSubmit,
                                    }
                                    const param={"param":data}
                                    //this.props.navigation.navigate("Pembayaran",{dataOrderSubmit:dataOrderSubmit});
                                    this.props.navigation.navigate("Loading",{redirect:redirect,param:param});
                                }, 500);
                            

                                
                                //alert('id_order :'+id_order);
                                //this.midtrans(id_order,pay)
                                // this.setState({id_order:id_order});
                                // this.setState({pay:pay});
                                // this.getVa(dataOrderSubmit);
                                
                                

                    });

                }
            });
        });

    }


    // midtrans(id_order,pay){
    // console.log(id_order+','+pay);
    // alert(id_order);
    //     const midtransClient = require('midtrans-client');
    //     let snap = new midtransClient.Snap({
    //             isProduction : false,
    //             serverKey : 'SB-Mid-server-kaH7VW-jCiV028kVrbfn6HLf',
    //             clientKey : 'SB-Mid-client-zxkvGZYYuXIidGRG'
    //         });
         
    //     let parameter = {
    //         "transaction_details": {
    //             "order_id": id_order,
    //             "gross_amount": pay
    //         }, "credit_card":{
    //             "secure" : true
    //         }
    //     };

    //     console.log('param midtrans',JSON.stringify(parameter));
         
    //         snap.createTransaction(parameter)
    //         .then((transaction)=>{
    //             let transactionToken = transaction.token;

    //             alert(transactionToken);
    //             //  this.props.navigation.navigate("OrderPembayaran",
    //             //     {
    //             //         transactionToken:transactionToken,
    //             //         id_order:id_order
    //             //     })

    //         })
    //         .catch((e)=>{
    //             console.log('Error occured:',e.message);
    //         });
            


            
    // }

    

    


    getVa(dataOrderSubmit){
        var id_order=dataOrderSubmit.id_order;
        var pay=dataOrderSubmit.pay;
        var payment_method='013';

        this.setState({ loading: true }, () => {

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          console.log("---------------URL GET VA------------");
          console.log("https://masterdiskon.com/front/order/bayar/fu_get_virtualaccount_app?id_order="+id_order+"&pay="+pay+"&payment_method="+this.state.payment_method);
          
          fetch("https://masterdiskon.com/front/order/bayar/fu_get_virtualaccount_app?id_order="+id_order+"&pay="+pay+"&payment_method="+this.state.payment_method, requestOptions)
            .then(response => response.json())
            .then((result) => {
                this.setState({ loading: false });
            var id_order_payment=result.key;
            console.log("---------------ID ORDER PAYMENT------------");
            console.log(id_order_payment);
            this.confirm_wa(id_order_payment,id_order);
            },
            (error) => {
                this.setState({ error });
            }
            );
        });

    }

    confirm_wa(id_order_payment,id_order){
        var minTimeLimit=this.searhMinTimeLimit();
        
        this.setState({ loading: true }, () => {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };
            
            fetch("https://masterdiskon.com/front/order/bayar/confirmation_va_app/"+id_order_payment, requestOptions)
            .then(response => response.json())
            .then((result) => {
                this.setState({ loading: false });
                console.log("---------------Virtual Account------------");
                console.log(JSON.stringify(result));
                var expirydate=result.va.expired;
                var expirydateNum=this.duration(expirydate);
                var countDown=0;
                if (expirydateNum < minTimeLimit)
                {
                    countDown=expirydateNum;
                }else if (expirydateNum > minTimeLimit){
                    countDown=minTimeLimit;
                }else if (expirydateNum == minTimeLimit){
                    countDown=expirydateNum;
                }
                console.log(expirydate);
                // this.setState({dataVa:result.va});
               
                setTimeout(() => {
                        AsyncStorage.removeItem('dataCartArray');
                        AsyncStorage.removeItem('dataCartArrayReal');
                        this.props.navigation.navigate("VirtualAccount",{countDown:countDown,id_order:id_order});
                    //this.setState({ loading: false });
                }, 500);
                                
                                
                                //this.duration(expirydate);
            },
            (error) => {
                this.setState({ error });
            }
            );
        });

    }

    setPayment(payment_method,payment_method_title){
        //alert(payment_method_title);
        this.setState({payment_method: payment_method});
        this.setState({payment_method_title: payment_method_title});
    }

    render() {
        const { navigation} = this.props;
        let { loading_spinner,loading } = this.state;
        var title='Cart';
        var subTitle='asd';
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));


        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                {/* <Header
                    title="Cart"
                    subTitle={this.state.countCartReal+' Cart'}
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
                /> */}

                <Header
                    title="Cart"
                    subTitle={this.state.countCartReal+' Cart'}
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
                    // renderRightSecond={() => {
                    //     return (
                    //         <Icon
                    //             name="envelope"
                    //             size={24}
                    //             color={BaseColor.primaryColor}
                    //         />
                    //     );
                    // }}
                    onPressLeft={() => {
                        navigation.goBack();
                    }}
                    onPressRight={() => {
                        navigation.navigate("Home");
                    }}
                    // onPressRightSecond={() => {
                    //     navigation.navigate("Messenger");
                    // }}
                />


                <ScrollView>
                    <View style={styles.contain}>
                       {this.renderContent(this.state.dataCartArrayReal)}
                    </View>
                </ScrollView>
                
                {/* <View style={styles.contentButtonBottomBank}>
                    <TouchableOpacity
                    style={styles.itemPick}
                    onPress={() => this.props.navigation.navigate('SelectPayment',
                        {
                        selected: this.state.payment_method,
                        setPayment: this.setPayment
                        }
                    )}
                    >
                    <ActionCart
                        labelCustom={this.state.payment_method_title}
                        onChangeSort={this.onChangeSort}
                        onFilter={this.onFilter}
                    /> 
                    </TouchableOpacity>
                </View> */}
                    
                <View style={styles.contentButtonBottom}>
                    <View>
                        <Text caption1 semibold>
                            Total Price
                        </Text>
                        <Text title3 primaryColor semibold>
                            IDR {priceSplitter(this.state.totalCartPriceReal)}
                        </Text>
                        {/* <Text caption1 semibold style={{ marginTop: 5 }}>
                            All Charged Included
                        </Text> */}
                    </View>

                    
                    <Button
                        style={{ height: 46 }}

                        loading={loading}
                        onPress={() => {  
                            this.onSubmit();
                            // this.setState({ loading: true }, () => {
                            //     setTimeout(() => {
                            //         this.onSubmit();
                            //         //navigation.navigate("FlightResult");
                            //         this.setState({ loading: false });
                            //     }, 500);
                            // });
                        }}
                    >
                       Pesan Sekarang
                    </Button>
                    {/* <Button
                        style={{ height: 46 }}

                        loading={loading}
                        onPress={() => {  
                            this.onSubmit();
                            // this.setState({ loading: true }, () => {
                            //     setTimeout(() => {
                            //         this.onSubmit();
                            //         //navigation.navigate("FlightResult");
                            //         this.setState({ loading: false });
                            //     }, 500);
                            // });
                        }}
                    >
                        Search Product
                    </Button> */}
                </View>
                <DropdownAlert ref={ref => this.dropdown = ref} messageNumOfLines={10} closeInterval={10000} />

            </SafeAreaView>
        );
    }
}
