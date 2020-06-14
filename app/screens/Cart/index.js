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
import { cos } from "react-native-reanimated";



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
        var listdata_customer=this.props.navigation.state.params.listdata_customer;
        var listdata_participant=this.props.navigation.state.params.listdata_participant;
        var saveContact=this.props.navigation.state.params.saveContact;
        var otherUser=this.props.navigation.state.params.otherUser;
      
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
            payment_method_title:'Permata ATM',
            listdata_customer:listdata_customer,
            listdata_participant:listdata_participant,
            saveContact:saveContact,
            otherUser:otherUser

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

    convertOld(dateString){

        var age = parseInt(moment().diff(dateString,'years',true));
        var old="";
        if(age < 2){
            old="INF";
        }else if(age>=2 && age<=11){
            old="CHD";
        }else{
            old="ADT";
        }
        return old;
    }
    

    
    updatePerson(){

        AsyncStorage.getItem('userSession', (error, result) => {
            if (result) {
                let userSession = JSON.parse(result);
                console.log("---------------data session user  ------------");
                console.log(JSON.stringify(userSession));
                var id_user=userSession.id_user;

                var participant = [];
                this.state.listdata_participant.map(item => {
                    var obj = {};
                    obj['id_user'] = id_user;
                    obj['fullname'] = item.title+' '+item.firstname+' '+item.lastname;
                    obj['firstname'] = item.firstname;
                    obj['lastname'] = item.lastname;
                    obj['birthday'] = item.birthday;
                    obj['nationality'] = item.nationality;
                    obj['passport_number'] = item.passport_number;
                    obj['passport_country'] = item.passport_country;
                    obj['passport_expire'] = item.passport_expire;
                    obj['phone'] = item.phone;
                    obj['title'] = item.title;
                    obj['email'] = item.email;
                    obj['nationality_id'] = item.nationality_id;
                    obj['nationality_phone_code'] = item.nationality_phone_code;
                    obj['passport_country_id'] = item.passport_country_id;
                    obj['type'] = this.convertOld(item.birthday);
                    participant.push(obj);
                });


                var customer = [];
                this.state.listdata_customer.map(item => {
                    var obj = {};
                    obj['id_user'] = id_user;
                    obj['fullname'] = item.title+' '+item.firstname+' '+item.lastname;
                    obj['firstname'] = item.firstname;
                    obj['lastname'] = item.lastname;
                    obj['birthday'] = item.birthday;
                    obj['nationality'] = item.nationality;
                    obj['passport_number'] = item.passport_number;
                    obj['passport_country'] = item.passport_country;
                    obj['passport_expire'] = item.passport_expire;
                    obj['phone'] = item.phone;
                    obj['title'] = item.title;
                    obj['email'] = item.email;
                    obj['nationality_id'] = item.nationality_id;
                    obj['nationality_phone_code'] = item.nationality_phone_code;
                    obj['passport_country_id'] = item.passport_country_id;
                    obj['type'] = this.convertOld(item.birthday);
                    customer.push(obj);
                });



                const data={  
                    "participant": participant,
                    "customer":customer,
                    "saveContact":this.state.saveContact
                  
                }
                const param={"param":data}

                this.setState({dataPersonSave:data});
                console.log("------------------data param update person--------------");
                console.log(JSON.stringify(param));

                // PostData('update_participant_order',param)
                //     .then((result) => {
                //         console.log("------------------result update participant--------------");
                //         console.log(JSON.stringify(result));
                //         //this.redirect('ProfileSmart');
                //     },
                //     (error) => {
                //         this.setState({ error });
                //     }
                // );

            }
        });  

        
    }

  
    componentDidMount() {
        this.updatePerson();
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
                    "dataCart":this.state.dataCart,
                    "dataSavePerson":this.state.dataPersonSave
                    }
                    
                    console.log("---------------data cart array cart kirim  ------------");
                    console.log(JSON.stringify(dataCartArrayRealSend));

                    this.updateUserSession();
             
                    
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

                                var redirect='Pembayaran';
                                setTimeout(() => {
                                    var id_order=dataOrderSubmit.id_order;
                                    //this.props.navigation.navigate("Pembayaran",{dataOrderSubmit:dataOrderSubmit});
                                    this.props.navigation.navigate("Loading",{redirect:redirect,param:id_order});
                                }, 500);


                                //this.getVa(dataOrderSubmit);
                    });

                }
            });
        });

    }

    updateUserSession(){
        
        //alert(otherUser);

       
            AsyncStorage.getItem('userSession', (error, result) => {
                if (result) {  
                    let userSession = JSON.parse(result);
                    console.log('userSession',JSON.stringify(userSession));
                    
                    
                    var customer=this.state.listdata_customer[0];
                    console.log('data contact',JSON.stringify(customer));

                    var otherUser=this.state.otherUser;
                    if(otherUser){
                        var newUserSession={
                            id_user: userSession.id_user,
                            fullname: userSession.fullname,
                            firstname: userSession.firstname,
                            lastname: userSession.lastname,
                            birthday: userSession.birthday,
                            nationality: userSession.nationality,
                            passport_number: userSession.passport_number,
                            passport_country: userSession.passport_country,
                            passport_expire: userSession.passport_expire,
                            phone: userSession.phone,
                            title: userSession.title,
                            email: userSession.email,
                            nationality_id: userSession.nationality_id,
                            nationality_phone_code:userSession.nationality_phone_code,
                            passport_country_id: userSession.passport_country_id,
                            username: userSession.username,
                            gender:userSession.gender,
                            un_nationality: userSession.un_nationality,
                            id_city: userSession.id_city,
                            city_name: userSession.city_name,
                            address: userSession.address,
                            postal_code: userSession.postal_code,
                            avatar: userSession.avatar,
                            cart: userSession.cart,
                            status: userSession.status,
                            loginVia: userSession.loginVia,
                        }
                       
                    }else{
                        

                        var newUserSession={
                            id_user: userSession.id_user,
                            fullname: customer['fullname'],
                            firstname: customer['firstname'],
                            lastname: customer['lastname'],
                            birthday: customer['birthday'],
                            nationality: customer['nationality'],
                            passport_number: customer['passport_number'],
                            passport_country: customer['passport_country'],
                            passport_expire: customer['passport_expire'],
                            phone: customer['phone'],
                            title: customer['title'],
                            email: userSession.email,
                            nationality_id: customer['nationality_id'],
                            nationality_phone_code: customer['nationality_phone_code'],
                            passport_country_id: customer['passport_country_id'],
                            username: userSession.username,
                            gender:userSession.gender,
                            un_nationality: userSession.un_nationality,
                            id_city: userSession.id_city,
                            city_name: userSession.city_name,
                            address: userSession.address,
                            postal_code: userSession.postal_code,
                            avatar: userSession.avatar,
                            cart: userSession.cart,
                            status: userSession.status,
                            loginVia: userSession.loginVia,
                        }


                    }
                
                    
                    console.log('newUserSession',JSON.stringify(newUserSession))
                    AsyncStorage.setItem('userSession', JSON.stringify(newUserSession));

                }
            });
        
    }


    getVa(dataOrderSubmit){
        var id_order=dataOrderSubmit.id_order;
        var pay=dataOrderSubmit.pay;
        var payment_method='013';

        this.setState({ loading: true }, () => {

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          //console.log("---------------URL GET VA------------");
          //console.log("https://masterdiskon.com/front/order/bayar/fu_get_virtualaccount_app?id_order="+id_order+"&pay="+pay+"&payment_method="+this.state.payment_method);
          
          fetch("https://masterdiskon.com/front/order/bayar/fu_get_virtualaccount_app?id_order="+id_order+"&pay="+pay, requestOptions)
            .then(response => response.json())
            .then((result) => {
                this.setState({ loading: false });
                var id_order_payment=result.key;
                console.log('statusss',JSON.stringify(result));
                                var redirect='Pembayaran';
                                setTimeout(() => {
                                    var id_order=dataOrderSubmit.id_order;
                                    //this.props.navigation.navigate("Pembayaran",{dataOrderSubmit:dataOrderSubmit});
                                    this.props.navigation.navigate("Loading",{redirect:redirect,param:id_order});
                                }, 500);
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
