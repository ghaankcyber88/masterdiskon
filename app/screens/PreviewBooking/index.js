import React, { Component } from "react";
import { View, ScrollView,TouchableOpacity,Image,AsyncStorage,ActivityIndicator } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, Text, Button} from "@components";
import * as Utils from "@utils";
import styles from "./styles";
import PropTypes from "prop-types";
import { Images } from "@config";
import moment from 'moment';
import CountDown from 'react-native-countdown-component';
import ActionCart from "../../components/ActionCart";

export default class PreviewBooking extends Component {
    constructor(props) {
        super(props);
      
        // var id_order=this.props.navigation.state.params.id_order;
        var item=this.props.navigation.state.params.item;
        console.log('---------------Data booking---------------');
        console.log(JSON.stringify(item));
        //alert(JSON.stringify(item))
        this.state = {
            id_order:item.id_order,
            item:item,
            loadData:false,
            loading_spinner:false,
            payment_method:'013',
            payment_method_title:'Permata ATM',
            loading: false
        };
        this.paxFlight = this.paxFlight.bind(this);
        this.setPayment = this.setPayment.bind(this);

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
    
    }

    // componentDidMount() {
    //     var id_order=this.state.id_order;
    //     this.setState({ loading_spinner: true }, () => {

    //         AsyncStorage.getItem('userSession', (error, result) => {
    //         if (result) {
    //             let userSession = JSON.parse(result);
    //             console.log("---------------data session user  ------------");
    //             console.log(JSON.stringify(userSession));
    //             this.setState({userSession:userSession});
    //             this.setState({login:true});
                
    //             var id_user=userSession.id_user;
    //             var requestOptions = {
    //                 method: 'GET',
    //                 redirect: 'follow'
    //               };
                  
    //               fetch("https://masterdiskon.co.id/front/api/api/get_booking_history?id="+id_user+'&id_order='+id_order, requestOptions)
    //                 .then(response => response.json())
    //                 .then(result => {
    //                     this.setState({ loading_spinner: false });
    //                     this.setState({item:result});
    //                     this.setState({loadData:true});
    //                     //alert(JSON.stringify(result));

    //                 })
    //                 .catch(error => console.log('error', error));
    //          }
            
    //         });
    //     });
    // }

    paxFlight(pax){
        console.log(JSON.stringify(pax));
    }
      
    setPayment(payment_method,payment_method_title){
        this.setState({payment_method: payment_method});
        this.setState({payment_method_title: payment_method_title});
    }

    searhMinTimeLimit(){
        var timeLimits=[];
        this.state.dataCartArrayReal.map(item => {
            timeLimits.push(this.duration(item.time_limit));
        });
        return Math.min(...timeLimits);

    }

    onSubmit(){
        this.getVa();
    }


    getVa(){
        const { navigation } = this.props;
        const { item,loadData,loading_spinner } = this.state;
        var id_order=item.id_order;
        var total_price=item.total_price;
        var remainingPay=parseInt(total_price)-parseInt(item.order_payment[0].amount)
        var pay=remainingPay;

        this.setState({ loading: true }, () => {

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          console.log("---------------URL GET VA------------");
          console.log("https://masterdiskon.co.id/front/order/bayar/fu_get_virtualaccount_app?id_order="+id_order+"&pay="+pay+"&payment_method="+this.state.payment_method);
          
          fetch("https://masterdiskon.co.id/front/order/bayar/fu_get_virtualaccount_app?id_order="+id_order+"&pay="+pay+"&payment_method="+this.state.payment_method, requestOptions)
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
        const { navigation } = this.props;
        const { item,loadData,loading_spinner } = this.state;

        console.log("---------------URL Confirmation VA ------------");
        console.log("https://masterdiskon.co.id/front/order/bayar/confirmation_va_app/"+id_order_payment);
        

        
        this.setState({ loading: true }, () => {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };
            
            fetch("https://masterdiskon.co.id/front/order/bayar/confirmation_va_app/"+id_order_payment, requestOptions)
            .then(response => response.json())
            .then((result) => {
                this.setState({ loading: false });
                console.log("---------------Virtual Account------------");
                console.log(JSON.stringify(result));

                var expirydate=result.va.expired;
                var expirydateNum=this.duration(expirydate);
                var countDown=expirydateNum;
                console.log(expirydate);
               
                setTimeout(() => {
                        this.props.navigation.navigate("VirtualAccount",{countDown:countDown,id_order:id_order});
                }, 500);
                                
                              
            },
            (error) => {
                this.setState({ error });
            }
            );
        });

    }

    render() {
        const { navigation } = this.props;
        const { item,loadData,loading_spinner,loading } = this.state;
        var contentFlight = [];
        var contentTrip='';
        var paxContent=[];
        var content=<View></View>;
        var itemData={}
        var expiredTime=0;
        var pax=[];
        var id_user='';
        var total_price=0;
        var id_order='';
        var current_payment={}
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

    
            id_order=item.id_order;
            total_price=item.total_price;
            expiredTime=this.duration(item.payment.expired);
            current_payment=item.current_payment;
            var countDownCurrentPayment=<View></View>;
                        if (this.duration(current_payment.expired) > 0){
                                if(item.product=='Trip'){
                                    if (item.status_payment=="belum_lunas"){
                                        countDownCurrentPayment=<View>
                                        <Text caption1 semibold grayColor>
                                            Status
                                        </Text>
                                        <Text title3 primaryColor semibold>
                                            Belum Lunas 
                                        </Text>
                                        </View>
                                    }else{
                                        countDownCurrentPayment=<View>
                                        <Text caption1 semibold grayColor>
                                            Status
                                        </Text>
                                        <Text title3 primaryColor semibold>
                                            Lunas
                                        </Text>
                                        </View>
                                    }
                                }else if(item.product=='Flight'){
                                    countDownCurrentPayment=<CountDown
                                    size={12}
                                    until={this.duration(current_payment.expired)}
                                    // onFinish={() => alert('Finished')}
                                    style={{float:'left'}}
                                    digitStyle={{backgroundColor: '#FFF', borderWidth: 2, borderColor: BaseColor.primaryColor}}
                                    digitTxtStyle={{color: BaseColor.primaryColor}}
                                    timeLabelStyle={{color: BaseColor.primaryColor, fontWeight: 'bold'}}
                                    separatorStyle={{color: BaseColor.primaryColor}}
                                    timeToShow={['H', 'M', 'S']}
                                    timeLabels={{m: null, s: null}}
                                    showSeparator
                                />
                                    
                                }
                            }else{

                                if (current_payment.status=="not_paid"){
                                countDownCurrentPayment=<View>
                                <Text caption1 semibold grayColor>
                                    Status
                                </Text>
                                <Text title3 primaryColor semibold>
                                    Cancel
                                </Text>
                                </View>
                                }else{
                                    countDownCurrentPayment=<View>
                                    <Text caption1 semibold grayColor>
                                        Status
                                    </Text>
                                    <Text title3 primaryColor semibold>
                                        Lunas
                                    </Text>
                                    </View>
                                }

                            }



            if(item.product=='Trip'){
                itemData=item;
                pax=item.detail[0].pax;
                pax.map(item => {
                    paxContent.push(
                        <View>
                            <Text body1 semibold style={{ marginBottom: 5 }}>
                            {item.title} {item.first_name} {item.last_name} - {item.type}
                            </Text>
                        </View>
                    );

                });
                var current_payment=item.current_payment;

                        var contentPayment = [];
                        
                        a=1;
                        if (item.order_payment.length==1)
                        {
                            
                            var remainingPay=parseInt(total_price)-parseInt(item.order_payment[0].amount)

                            if (item.order_payment[0].status=='paid'){
                            contentPayment.push(
                                    <View
                                    style={{ flexDirection: "row" }}
                                >
                                    <View style={{ flex: 1 }}>
                                        <Text caption1 semibold grayColor>
                                            Pembayaran {a}
                                        </Text>
                                        <Text title3 primaryColor semibold>
                                            {'IDR '+priceSplitter(item.order_payment[0].amount)} 
                                        </Text>
                                    </View>
                                    <View style><Text>Lunas</Text></View>
                                </View>
                                );
                            }else{
                                var countDown=<View></View>;

                                if (this.duration(current_payment.expired) > 0){
                                    countDown=<CountDown
                                    size={12}
                                    until={this.duration(item.order_payment[0].expired)}
                                    style={{float:'left'}}
                                    digitStyle={{backgroundColor: '#FFF', borderWidth: 2, borderColor: BaseColor.primaryColor}}
                                    digitTxtStyle={{color: BaseColor.primaryColor}}
                                    timeLabelStyle={{color: BaseColor.primaryColor, fontWeight: 'bold'}}
                                    separatorStyle={{color: BaseColor.primaryColor}}
                                    timeToShow={['H', 'M', 'S']}
                                    timeLabels={{m: null, s: null}}
                                    showSeparator
                                />
                                
                                }else{
                                    countDown=<View>
                                    <Text caption1 semibold grayColor>
                                        Status
                                    </Text>
                                    <Text  primaryColor semibold>
                                        Cancel
                                    </Text>
                                </View>
                                }

                                contentPayment.push(
                                    <View
                                    style={{ flexDirection: "row" }}
                                >
                                    <View style={{ flex: 1 }}>
                                        <Text caption1 semibold grayColor>
                                            Pembayaran {a}
                                        </Text>
                                        <Text title3 primaryColor semibold>
                                            {'IDR '+priceSplitter(item.order_payment[0].amount)} 
                                        </Text>
                                    </View>
                                   
                                    {countDown}
                                
                                </View>
                                );

                            }

                            if(item.order_payment[0].status=='paid'){
                                contentPayment.push(<View  style={styles.contentButtonBottomBank}><View>
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
                                </View>
                                    
                                <View style={styles.contentButtonBottom}>
                                    <View>
                                        <Text caption1 semibold>
                                            Total Price
                                        </Text>
                                        <Text title3 primaryColor semibold>
                                        {'IDR '+priceSplitter(remainingPay)} 
                                        </Text>
                                    </View>
                
                                    
                                    <Button
                                        style={{ height: 46 }}
                
                                        loading={loading}
                                        onPress={() => {  
                                            this.onSubmit();
                                        }}
                                    >
                                    Pay
                                    </Button>
                                </View></View>
                                );
                            }else{
                                contentPayment.push(
                                    <View
                                    style={{ flexDirection: "row" }}
                                >
                                    <View style={{ flex: 1 }}>
                                        <Text caption1 semibold grayColor>
                                            Sisa Pembayaran
                                        </Text>
                                        <Text title3 primaryColor semibold>
                                            {'IDR '+priceSplitter(remainingPay)} 
                                        </Text>
                                    </View>
                                </View>
                                );

                            }

                        }else{
                        
                            for (var i = 0; i < item.order_payment.length; i++) {

                                if(item.order_payment[i].status=='paid'){
                                    contentPayment.push(
                                        <View
                                        style={{ flexDirection: "row" }}
                                    >
                                        <View style={{ flex: 1 }}>
                                            <Text caption1 semibold grayColor>
                                                Pembayaran {a}
                                            </Text>
                                            <Text title3 primaryColor semibold>
                                                {'IDR '+priceSplitter(item.order_payment[i].amount)} 
                                            </Text>
                                        </View>
                                        <View>
                                            <Text caption1 semibold grayColor>
                                                Status
                                            </Text>
                                            <Text  primaryColor semibold>
                                                Lunas
                                            </Text>
                                        </View>
                                    </View>
                                    );
                                }else{
                                    var countDown=<View></View>;

                                    if (this.duration(item.order_payment[i].expired) > 0){
                                        countDown=<CountDown
                                        size={12}
                                        until={this.duration(item.order_payment[0].expired)}
                                        style={{float:'left'}}
                                        digitStyle={{backgroundColor: '#FFF', borderWidth: 2, borderColor: BaseColor.primaryColor}}
                                        digitTxtStyle={{color: BaseColor.primaryColor}}
                                        timeLabelStyle={{color: BaseColor.primaryColor, fontWeight: 'bold'}}
                                        separatorStyle={{color: BaseColor.primaryColor}}
                                        timeToShow={['H', 'M', 'S']}
                                        timeLabels={{m: null, s: null}}
                                        showSeparator
                                    />
                                    
                                    }else{
                                        countDown=<View>
                                        <Text caption1 semibold grayColor>
                                            Status
                                        </Text>
                                        <Text title3 primaryColor semibold>
                                            Cancel
                                        </Text>
                                    </View>
                                    }


                                    contentPayment.push(
                                        <View
                                        style={{ flexDirection: "row" }}
                                    >
                                        <View style={{ flex: 1 }}>
                                            <Text caption1 semibold grayColor>
                                                Pembayaran {a}
                                            </Text>
                                            <Text title3 primaryColor semibold>
                                                {'IDR '+priceSplitter(item.order_payment[i].amount)} 
                                            </Text>
                                        </View>
                                        {countDown}
                                    </View>
                                    );


                                }
                                a++;
                            }
                        }
                
                var contentTrip=<View style={{ paddingHorizontal: 20 }}>
                                    <View style={styles.blockView}>
                                        <Text body2 style={{ marginBottom: 10 }}>
                                            {itemData.product}
                                        </Text>
                                        <Text body1 semibold>
                                            {itemData.detail[0].product_name}
                                        </Text>
                                    </View>
                                    <View style={styles.blockView}>
                                        <View
                                            style={{ flexDirection: "row", marginTop: 10 }}
                                        >
                                            <View style={{ flex: 1 }}>
                                                <Text body2>Date</Text>
                                            </View>
                                            <View
                                                style={{ flex: 1, alignItems: "flex-end" }}
                                            >
                                                <Text body2 semibold>
                                                    {itemData.detail[0].order_product_trip[0].start_date}
                                                </Text>
                                            </View>
                                        </View>
                                        <View
                                            style={{ flexDirection: "row", marginTop: 10 }}
                                        >
                                            <View style={{ flex: 1 }}>
                                                <Text body2>Duration</Text>
                                            </View>
                                            <View
                                                style={{ flex: 1, alignItems: "flex-end" }}
                                            >
                                                <Text body2 semibold>
                                                    {itemData.detail[0].order_product_trip[0].duration} night(s)
                                                </Text>
                                            </View>
                                        </View>
                                    </View>


                                    <View style={styles.blockView}>
                                        <Text body2 style={{ marginBottom: 10 }}>
                                            Contact’s Name
                                        </Text>
                                        <Text body1 semibold style={{ marginBottom: 5 }}>
                                            {itemData.contact.contact_name}
                                        </Text>
                                        <View style={{marginBottom:10}}>
                                            <View
                                                style={{ flexDirection: "row" }}
                                            >
                                                <View style={{ flex: 1 }}>
                                                    <Text body2 grayColor>Phone</Text>
                                                </View>
                                                <View
                                                    style={{ flex: 1, alignItems: "flex-end" }}
                                                >
                                                    <Text body2 semibold grayColor>
                                                    {itemData.contact.contact_phone}
                                                    </Text>
                                                </View>
                                            </View>

                                            <View
                                                style={{ flexDirection: "row" }}
                                            >
                                                <View style={{ flex: 1 }}>
                                                    <Text body2 grayColor>Email</Text>
                                                </View>
                                                <View
                                                    style={{ flex: 1, alignItems: "flex-end" }}
                                                >
                                                    <Text body2 semibold grayColor>
                                                    {itemData.contact.contact_email}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>

                                    
                                    <View style={styles.blockView}>
                                        <Text body2 style={{ marginBottom: 10 }}>
                                            Participant ({itemData.pax_people})
                                        </Text>
                                    {paxContent}
                                    </View>

                                    <View style={styles.blockView}>
                                        <Text body2 style={{ marginBottom: 10 }}>
                                        To Do
                                        </Text>
                                        <Text body2 grayColor style={{ marginBottom: 5 }}>
                                        {itemData.detail[0].order_product_trip[0].to_do}
                                        </Text>
                                    </View> 

                                    <View style={styles.blockView}>
                                        <Text body2 style={{ marginBottom: 10 }}>
                                        Include
                                        </Text>
                                        <Text body2 grayColor style={{ marginBottom: 5 }}>
                                            {itemData.detail[0].order_product_trip[0].include}
                                        </Text>
                                    </View>

                                    <View style={styles.blockView}>
                                        <Text body2 style={{ marginBottom: 10 }}>
                                        Exclude
                                        </Text>
                                        <Text body2 grayColor style={{ marginBottom: 5 }}>
                                            {itemData.detail[0].order_product_trip[0].exvlude}
                                        </Text>
                                    </View>


                                    <View style={styles.blockView}>
                                        <Text body2 style={{ marginBottom: 10 }}>
                                            Other Information
                                        </Text>
                                        <InformationTrip data={itemData.detail[0].order_product_trip[0]} />
                                    </View>

                                    <View style={styles.blockView}>
                                        <Text body1 semibold style={{ marginBottom: 5 }}>
                                            History Payment  
                                        </Text>
                                        
                                        <View style={{marginBottom:10}}>
                                           {contentPayment}                                          
                                        </View>
                                    </View>
                                </View>;
                    content=contentTrip;
                }else{

                    current_payment=item.current_payment[0];
                    
                    var round=false;
                    var type_flight='';
                    item.detail.map(item => {
                    type_flight=item.order_flight[0].type;
                    if(type_flight=='OW'){
                        round=false;
                    }else{
                        round=true;
                    }

                   

                    contentFlight.push(
                        <View style={{ paddingHorizontal: 20,marginBottom:20 }}>
                        <View style={{  }}>
                                <FlightPlanCustom
                                    round={round}
                                    fromCode={item.order_flight_detail[0].origin_id}
                                    toCode={item.order_flight_detail[0].destination_id}
                                    from={item.order_flight_detail[0].origin_airport.name}
                                    to={item.order_flight_detail[0].destination_airport.name}
                                />
                                {this.paxFlight(item)}
                          
                                
                                <FlightItemCustom
                                    style={{ marginBottom: 10}}
                                    fromHour={item.order_flight_detail[0].flight_schedule[0]['departure_time']}
                                    toHour={item.order_flight_detail[0].flight_schedule[0]['arrival_time']}
                                    fromFlight={item.order_flight_detail[0].flight_schedule[0]['origin_id']}
                                    toFlight={item.order_flight_detail[0].flight_schedule[0]['destination_id']}
                                    totalHour={item.order_flight_detail[0].flight_schedule[0]['duration']}
                                    brand={item.order_flight_detail[0].flight_schedule[0]['airline_name']}
                                    image={item.order_flight_detail[0].flight_schedule[0]['airline_logo']}
                                    type={item.order_flight_detail[0].flight_schedule[0].cabin_name}
                                    price={'asd'}
                                    route={'asd'}
                                />
                                <InformationFlight
                                        dataFlightOrder={item.order_flight[0]}
                                />
                                
                            </View>
                            <View style={styles.line} />
                        </View>
                        
                    );

                });
                content=contentFlight;
            }
        

        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <Header
                    title="Order Detail"
                    subTitle={'Order ID'+id_order}
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
                <ScrollView>
                    {content}
{/*                         
                        {
                            loading_spinner ? 
                            <ActivityIndicator
                                    size="large"
                                    color={BaseColor.primaryColor}
                                    style={{position: 'absolute',
                                    left: 0,
                                    right: 0,
                                    top: 0,
                                    bottom: 0,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                    }}
                            /> 
                            :
                            content
                            }        */}

                    
                </ScrollView>
                <View style={styles.contentButtonBottom}>
                    <View>
                        <Text caption1 semibold grayColor>
                            Total Price
                        </Text>
                        <Text title3 primaryColor semibold>
                           {'IDR '+priceSplitter(total_price)} 
                        </Text>
                        <Text
                            caption1
                            semibold
                            grayColor
                            style={{ marginTop: 5 }}
                        >
                            2 Adults / 1 Children
                        </Text>
                    </View>
                    {countDownCurrentPayment}
                </View>
            </SafeAreaView>
        );
    }
}



class InformationFlight extends Component {
    constructor(props) {
        super(props);
       
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
        var data=props.dataFlightOrder;

        this.state = {
          
            information: [
                { title: "Adult", detail: data.adult },
                { title: "Child", detail: data.child },
                { title: "Infant", detail: data.infant },
                { title: "Discount", detail: data.discount},
                { title: "Insurance", detail: 'IDR '+priceSplitter(data.insurance_total)},
                { title: "Transaction Fee", detail: 'IDR '+priceSplitter(data.transaction_fee)},
                { title: "Total Price", detail: 'IDR '+priceSplitter(data.total_price)},
            ]
        };
    }

    render() {
        let { information, dayTour, tours } = this.state;
        return (
            <ScrollView>
                <View style={{ paddingHorizontal: 0 }}>
                    {information.map((item, index) => {
                        return (
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    paddingVertical: 10,
                                    borderBottomColor:
                                        BaseColor.textSecondaryColor,
                                    borderBottomWidth: 1
                                }}
                                key={"information" + index}
                            >
                                <Text body2 grayColor>
                                    {item.title}
                                </Text>
                                <Text body2 semibold accentColor>
                                    {item.detail}
                                </Text>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        );
    }
}


class InformationTrip extends Component {
    constructor(props) {
        super(props);
       
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
        var data=props.data;

        this.state = {
          
            information: [
                { title: "Category", detail: data.category },
                { title: "Country", detail: data.country },
                { title: "Price / pax", detail: 'IDR '+priceSplitter(data.price) },
                { title: "Minimum", detail: data.minimum},
                { title: "Price for Adult / Children", detail: 'IDR '+priceSplitter(data.price)},
                { title: "Price for baby", detail: 'IDR '+priceSplitter(data.price*0.2)},
            ]
        };
    }

    render() {
        let { information, dayTour, tours } = this.state;
        return (
            <ScrollView>
                <View style={{ paddingHorizontal: 0 }}>
                    {information.map((item, index) => {
                        return (
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    paddingVertical: 10,
                                    borderBottomColor:
                                        BaseColor.textSecondaryColor,
                                    borderBottomWidth: 1
                                }}
                                key={"information" + index}
                            >
                                <Text body2 grayColor>
                                    {item.title}
                                </Text>
                                <Text body2 semibold accentColor>
                                    {item.detail}
                                </Text>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        );
    }
}


class FlightItemCustom extends Component {
    timeConvert(n) {
        var num = n;
        var hours = (num / 60);
        var rhours = Math.floor(hours);
        var minutes = (hours - rhours) * 60;
        var rminutes = Math.round(minutes);

        if(rhours<10){
            if(rhours==1){
                rhours='00';
            }else{
                rhours='0'+rhours;
            }
        }else{
            rhours=rhours;
        }

        if(rminutes==0){
            rminutes='00';
        }else if(rminutes<=10){
            rminutes='0'+rminutes;
        }
        return rhours + ":"+rminutes;
        }
    render() {
        const {
            style,
            from,
            to,
            fromHour,
            toHour,
            fromFlight,
            toFlight,
            totalHour,
            route,
            image,
            brand,
            type,
            price,
            onPress
        } = this.props;

        var routeKet='';
        if(route==0){
            routeKet='Direct';
        }else if(route>=0){
            routeKet=route+ "transit";
        }

        var kelas='';
        if(type=='E'){
            kelas="Economy Class";
        }else if(type=='S'){
            kelas="Premium Economy";
        }else if(type=='B'){
            kelas="Business Class";
        }else if(type=='F'){
            kelas="First Class";
        }

        return (
            <TouchableOpacity style={[styles.content, style]} onPress={onPress}>
                <View style={styles.contentTop}>
                    <View style={{ flex: 1 }}>
                        <Text title2>{fromHour}</Text>
                        <Text footnote light>
                            {fromFlight}
                        </Text>
                    </View>
                    <View style={{ flex: 1.5, alignItems: "center" }}>
                        <Text caption1 light>
                            {this.timeConvert(totalHour)}
                        </Text>
                        <View style={styles.contentLine}>
                            <View style={styles.line} />
                            <Icon
                                name="plane"
                                color={BaseColor.dividerColor}
                                size={24}
                                solid
                            />
                            <View style={styles.dot} />
                        </View>
                        <Text caption1 light>
                            {routeKet}
                        </Text>
                    </View>
                    <View style={{ flex: 1, alignItems: "flex-end" }}>
                        <Text title2>{toHour}</Text>
                        <Text footnote light>
                            {toFlight}
                        </Text>
                    </View>
                </View>
                <View style={styles.contentBottom}>
                    <View style={styles.bottomLeft}>
                        <Image
                            style={styles.image}
                            resizeMode="contain"
                            source={{uri: image}}
                            // source={image}
                        />
                        <View>
                            <Text caption1 semibold accentColor>
                                {brand}
                            </Text>
                            <Text caption2 light>
                                {type}
                            </Text>
                        </View>
                    </View>
                    {/* <View
                        style={{ flexDirection: "row", alignItems: "flex-end" }}
                    >
                        <Text title3 semibold primaryColor>
                            {price}
                        </Text>
                        <Text caption1 light style={{ marginLeft: 5 }}>
                            Pax
                        </Text>
                    </View> */}
                </View>
            </TouchableOpacity>
        );
    }
}

FlightItemCustom.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    from: PropTypes.object,
    to: PropTypes.object,
    fromHour: PropTypes.object,
    toHour: PropTypes.object,
    fromFlight: PropTypes.object,
    toFlight: PropTypes.object,
    totalHour: PropTypes.number,
    brand: PropTypes.string,
    image: PropTypes.node.isRequired,
    type: PropTypes.string,
    price: PropTypes.string,
    flight_code: PropTypes.string,
    route: PropTypes.string,
    onPress: PropTypes.func
};

FlightItemCustom.defaultProps = {
    style: {},
    from: {
        name: "United State",
        value: "USA",
        image: Images.airline1,
        hour: "05:00"
    },
    to: {
        name: "Singapore",
        value: "SIN",
        image: Images.airline2,
        hour: "18:00"
    },
    totalHour: 13.5,
    brand: "Vietjet",
    image: Images.airline2,
    type: "Economy",
    price: "$499,99",
    route: "Non Stop",
    fromHour: "xx",
    toHour: "yy",
    fromFlight: "xx",
    toFlight: "yy",
    onPress: () => { }
};





class FlightPlanCustom extends Component {
    render() {
        const {
            style,
            from,
            fromCode,
            to,
            toCode,
            round,
            onPressFrom,
            onPressTo
        } = this.props;
        return (
            <View style={[styles.contentRow, style]}>
                <TouchableOpacity
                    style={styles.colCenter}
                    onPress={onPressFrom}
                    activeOpacity={0.9}
                >
                    <Text body1 light>
                        From
                    </Text>
                    <Text header semibold>
                        {fromCode}
                    </Text>
                    <Text body1>{from}</Text>
                </TouchableOpacity>
                <View style={styles.centerView}>
                    <Icon
                        name="plane"
                        color={BaseColor.primaryColor}
                        size={24}
                        solid
                    />
                    {round && (
                        <Icon
                            name="plane"
                            color={BaseColor.primaryColor}
                            size={24}
                            solid
                            style={{
                                transform: [{ rotate: "180deg" }],
                                marginTop: 5
                            }}
                        />
                    )}
                </View>
                <TouchableOpacity
                    style={styles.colCenter}
                    onPress={onPressTo}
                    activeOpacity={0.9}
                >
                    <Text body1 light>
                        To
                    </Text>
                    <Text header semibold>
                        {toCode}
                    </Text>
                    <Text body1>{to}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

FlightPlanCustom.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    round: PropTypes.bool,
    fromCode: PropTypes.string,
    toCode: PropTypes.string,
    from: PropTypes.string,
    to: PropTypes.string,
    onPressFrom: PropTypes.func,
    onPressTo: PropTypes.func
};

FlightPlanCustom.defaultProps = {
    style: {},
    round: true,
    fromCode: "SIN",
    toCode: "SYD",
    from: "Singapore",
    to: "Sydney",
    onPressFrom: () => {},
    onPressTo: () => {}
};
