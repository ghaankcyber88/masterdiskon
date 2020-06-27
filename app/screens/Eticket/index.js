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
//import styles from "./styles";
import { FlightData } from "@data";
import {PostData} from '../../services/PostData';
import {AsyncStorage} from 'react-native';
import CartCard from "../../components/CartCard";
import ActionCart from "../../components/ActionCart";
import DropdownAlert from 'react-native-dropdownalert';
import ButtonOrder from "../../components/ButtonOrder";

import moment from 'moment';
import { cos } from "react-native-reanimated";
import { StyleSheet } from "react-native";



const styles = StyleSheet.create({
   
});


export default class Eticket extends Component {
    constructor(props) {
        super(props);
        param=this.props.navigation.state.params.param;
        
        
      

        this.state = {
            param:param
        };
        
       
        
    }

  
    componentDidMount() {
        
    }
    
    


   

    render() {
        const { navigation} = this.props;
        //let { loading_spinner,loading } = this.state;
        var title='Cart';
        var subTitle='asd';
        //const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));


        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
               

                <Header
                    title="Checkout"
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
                    <View style={{ flex: 1 }}>
                      <View style={{ padding: "3%" }}>
                        {/* <TouchableOpacity style={{ height: 24, width: 24, marginLeft: "2%" }}>
                          <Image source={require('../../../Icon/icon-search.png')} style={{ width: undefined, height: undefined, resizeMode: 'contain', flex: 1, tintColor: 'white' }} />
            
                        </TouchableOpacity> */}
                        <Text style={{ color: "white", alignSelf: 'center', marginTop: "2%", fontSize: 16, textAlign: 'center' }}>Lorem ipsum{'\n'}LOREM IPSUM MANTAPANJING</Text>
            
                        <View style={{ marginVertical: "5%", marginHorizontal: "12%", backgroundColor: 'white', borderTopStartRadius: 16, borderTopEndRadius: 16, elevation: 10, }}>
            
                          {/* Barcode */}
                          <View style={{ backgroundColor: 'white', paddingTop: "2%", paddingBottom: "2%", borderTopStartRadius: 16, borderTopEndRadius: 16 }}>
                            <View style={{ height: 150, width: 150, alignSelf: 'center', }}>
                              {/* <Image source={require('../../../Image/barcode.png')} style={{ width: undefined, height: undefined, resizeMode: 'contain', flex: 1 }} /> */}
                            </View>
                          </View>
            
                          {/* Code */}
                          <View style={{ height: 45, justifyContent: 'center' }}>
                            <Text style={{ color: 'green', alignSelf: 'center', backgroundColor: 'white', paddingHorizontal: "13%", paddingVertical: "3%", borderWidth: 2, borderColor: 'green', fontWeight: 'bold' }}>PNR NO - 789624108</Text>
                            <View style={{ height: 30, width: 30, borderRadius: 200, backgroundColor: 'blue', position: 'absolute', top: 8, bottom: 0, left: -20, alignSelf: 'center', justifyContent: 'center' }}></View>
                            <View style={{ height: 30, width: 30, borderRadius: 200, backgroundColor: 'blue', position: 'absolute', top: 8, bottom: 0, right: -20, alignSelf: 'center', justifyContent: 'center' }}></View>
                          </View>
            
                          {/* DATE */}
                          <View style={{ paddingHorizontal: "8%", marginTop: '5%' }}>
                            <Text style={{ fontSize: 12 }}>11057</Text>
                            <Text style={{ fontSize: 17, fontWeight: 'bold', }}>CSMT ASR EXPRESS</Text>
                            <Text style={{ fontSize: 13, fontWeight: 'bold' }}>SAT, 30 MARCH</Text>
            
                          </View>
            
                          {/* timeline */}
                          <View style={{ height: '20%', backgroundColor: 'pink', marginTop: '3%' }}>
                          </View>
            
                          <View style={{ marginTop: '3%', flexDirection: 'row', alignItems: 'stretch', justifyContent: 'space-between', paddingHorizontal: '10%' }}>
                            <Text style={{ fontWeight: 'bold' }}>Seats</Text>
                            <Text style={{ color: 'blue' }}>D3 45,D3 46</Text>
                          </View>
            
                        </View>
                      </View>
                    </View>
                </ScrollView>
           </SafeAreaView>
        );
    }
}
