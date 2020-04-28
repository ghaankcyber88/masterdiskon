import React, { Component } from "react";
import {
    View,
    FlatList,
    TextInput,
    ActivityIndicator,
    TouchableOpacity
} from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, Text, Image } from "@components";
import styles from "./styles";

// Load sample listdata_payment data list
import { paymentBrandData } from "@data";
import {PostData} from '../../services/PostData';

import {AsyncStorage} from 'react-native';

export default class SelectPayment extends Component {
    constructor(props) {
        super(props);
   
        
        
        // Temp data define
        this.state = {
            airplane: "",
            listdata_payment: [],
            loading: false,
        };
    }

    componentDidMount() {

        this.setState({ loading_spinner: true }, () => {

            AsyncStorage.getItem('bankPayment', (error, result) => {
                if (result) {
                this.setState({ loading_spinner: false });

                let resultParsed = JSON.parse(result)
                this.setState({listdata_payment:resultParsed.data});

                    const { navigation } = this.props;
                    const selected = navigation.getParam("selected");
        
                    if (selected) {
                        this.setState({
                            listdata_payment: this.state.listdata_payment.map(item => {
                                return {
                                    ...item,
                                    checked: item.bankCode == selected
                                };
                            })
                        });
                    }
                }
            });


            // PostData('airport_default',{"param":""})
            // .then((result) => {
            //         this.setState({ loading_spinner: false });
            //         this.setState({listdata_payment:result});
            //         const { navigation } = this.props;
            //         const selected = navigation.getParam("selected");
        
            //         if (selected) {
            //             this.setState({
            //                 listdata_payment: this.state.listdata_payment.map(item => {
            //                     return {
            //                         ...item,
            //                         checked: item.code == selected
            //                     };
            //                 })
            //             });
            //         }
            //     },
            //     (error) => {
            //         this.setState({ error });
            //     }
            // );
            


        });


        
        
    }
    /**
     * @description Called when setting listdata_payment is selected
     * @author Passion UI <passionui.com>
     * @date 2019-08-03
     * @param {object} select
     */
    onChange(select) {
        //alert(select.productName);
        this.setState({payment_method:select.bankCode});
        this.setState({
            listdata_payment: this.state.listdata_payment.map(item => {
                if (item.bankCode == select.bankCode) {
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

        const { navigation } = this.props;
        this.props.navigation.state.params.setPayment(
            select.bankCode,select.productName
        )
        navigation.goBack();

        // const selected = this.state.listdata_payment.filter(item => item.checked);
        // if (selected.length > 0) {
        //     setTimeout(() => {
        //         // this.props.navigation.state.params.setBandaraAsal(
        //         //     selected[0].code,selected[0].label
        //         //     )
        //         // navigation.goBack();
        //         alert('asd')
        //     }, 500);
        // }

        

    }
    


    onSave() {
        const { navigation } = this.props;
        var selectParent = navigation.getParam("selected");
        var type = navigation.getParam("type");
        const selected = this.state.listdata_payment.filter(item => item.checked);

        if (selected.length > 0) {
            if(type=='from'){
                this.setState(
                    {
                        loading: true
                    },
                    () => {
                        setTimeout(() => {
                            this.props.navigation.state.params.setBandaraAsal(
                                selected[0].code,selected[0].label
                                )
                            navigation.goBack();
                        }, 500);
                    }
                );

            }else if(type=='to'){
              
                this.setState(
                    {
                        loading: true
                    },
                    () => {
                        setTimeout(() => {
                            this.props.navigation.state.params.setBandaraTujuan(
                                selected[0].code,selected[0].label
                                )
                            navigation.goBack();
                        }, 500);
                    }
                );

            }
           
        }
    }

    
    onClick(code,label) {
        var type=this.props.navigation.state.params.type;
        if(type=='asal'){
            this.props.navigation.state.params.setBandaraAsal(code,label);
        }else if(type=='tujuan'){
            this.props.navigation.state.params.setBandaraTujuan(code,label);
        }
        this.props.navigation.navigate('PageSearchpayment');
    }

    render() {
        const { navigation } = this.props;
        let { listdata_payment, loading, airplane,loading_spinner } = this.state;
        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >

                  
                <Header
                    title="Payment Method"
                    renderLeft={() => {
                        return (
                            <Icon
                                name="arrow-left"
                                size={20}
                                color={BaseColor.primaryColor}
                            />
                        );
                    }}
                    // renderRight={() => {
                    //     if (loading) {
                    //         return (
                    //             <ActivityIndicator
                    //                 size="small"
                    //                 color={BaseColor.primaryColor}
                    //             />
                    //         );
                    //     } else {
                    //         return (
                    //             <Text headline primaryColor>
                    //                 Save
                    //             </Text>
                    //         );
                    //     }
                    // }}
                    onPressLeft={() => {
                        navigation.goBack();
                    }}
                    onPressRight={() => this.onSave()}
                />
                
                <View style={styles.contain}>
                  
                    <View style={{ width: "100%", height: "100%" }}>
                        {
                            loading_spinner ? 
                            <ActivityIndicator
                                    size="large"
                                    color={BaseColor.primaryColor}
                            /> 
                            :
                            <FlatList
                            data={this.state.listdata_payment}
                            keyExtractor={(item, index) => item.bankCode}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.item}
                                    onPress={() => this.onChange(item)}
                                >
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center"
                                        }}
                                    >
                                        {/* <Image
                                            style={styles.imageBrand}
                                            source={item.image}
                                            resizeMode="contain"
                                        /> */}
                                    
                                        <View style={styles.left}>
                                            <Text headline semibold>
                                            {item.productName}
                                            </Text>
                                            
                                        </View>
                                    </View>
                                    {item.checked && (
                                        <Icon
                                            name="check"
                                            size={14}
                                            color={BaseColor.primaryColor}
                                        />
                                    )}
                                </TouchableOpacity>
                            )}
                            />
                        }
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}
