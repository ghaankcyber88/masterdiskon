// import React, { Component } from 'react';
// import {
//   StyleSheet,
//   View,
//   ScrollView
// } from 'react-native';
// import CalendarPicker from 'react-native-calendar-picker';
// import { BaseStyle, BaseColor, Images } from "@config";
// import { Image, Header, SafeAreaView, Icon, Text, Button } from "@components";

import React, { Component } from "react";
import { View, ScrollView, TextInput, TouchableOpacity,StyleSheet } from "react-native";
import DatePicker from 'react-native-datepicker'
import { BaseStyle, BaseColor, Images } from "@config";
import { Image, Header, SafeAreaView, Icon, Text, Button } from "@components";
import CalendarPicker from 'react-native-calendar-picker';


// Load sample data
import { UserData } from "@data";


const styles = StyleSheet.create({
    contentTitle: {
        alignItems: "flex-start",
        width: "100%",
        height: 32,
        justifyContent: "center"
    },
    contain: {
        alignItems: "center",
        padding: 20,
        width: "100%"
    },
    textInput: {
        height: 46,
        backgroundColor: BaseColor.fieldColor,
        borderRadius: 5,
        padding: 10,
        width: "100%",
        color: BaseColor.grayColor
    },
    thumb: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20
    },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
      },
});


export default class DatePickerRange extends Component {
    constructor(props) {
        super(props);
        var round=this.props.navigation.state.params.round;
        this.state = {
          selectedStartDate: null,
          selectedEndDate: null,
          selectedStartDateBooking: null,
          selectedEndDateBooking: null,
          round:round
        };
        this.onDateChange = this.onDateChange.bind(this);
      }

      convertDate(date){
        var dateString=date.toString();

        var MyDate = new Date(dateString);
        var MyDateString = '';
        MyDate.setDate(MyDate.getDate());
        var tempoMonth = (MyDate.getMonth()+1);
        var tempoDate = (MyDate.getDate());
        if (tempoMonth < 10) tempoMonth = '0' + tempoMonth;
        if (tempoDate < 10) tempoDate = '0' + tempoDate;

        var dates=MyDate.getFullYear()  + '-' +  tempoMonth  + '-' +  tempoDate;
        return dates;
      }
     
      onDateChange(date, type) {
        if (type === 'END_DATE') {

          this.setState({
            selectedEndDate: date,
          });

          this.setState({
            selectedEndDateBooking: this.convertDate(date),
          });
          
        } else {

          this.setState({
            selectedStartDate: date,
            selectedEndDate: null,
          });

          this.setState({
            selectedStartDateBooking: this.convertDate(date),
            selectedEndDateBooking: null,
          });
        }
        
        // alert(this.convertDate(date));
        
      }
     
      onSubmit(){
        const { navigation } = this.props;
      
        //console.log(this.state.selectedEndDateBooking);
    
        this.props.navigation.state.params.setBookingTime(this.state.selectedStartDateBooking,this.state.selectedEndDateBooking);
        navigation.goBack();
      }

    render() {
        const { navigation } = this.props;
        const { selectedStartDate, selectedEndDate } = this.state;
        const minDate = new Date(); // Today
        const maxDate = new Date(2020, 10, 10);
        const startDate  =  selectedStartDate ? selectedStartDate.toString() : '';
        const endDate = selectedEndDate ? selectedEndDate.toString() : '';
        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <Header
                    title="Set Date"
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
                    onPressRight={() => {}}
                />
                <ScrollView>
                <View style={styles.container}>
        <CalendarPicker
          startFromMonday={true}
          allowRangeSelection={this.state.round}
          minDate={minDate}
          maxDate={maxDate}
          todayBackgroundColor="#f2e6ff"
          selectedDayColor={BaseColor.primaryColor}
          selectedDayTextColor="#FFFFFF"
          onDateChange={this.onDateChange}
        />
 
        {/* <View>
          <Text>SELECTED START DATE:{ startDate }</Text>
          <Text>SELECTED END DATE:{ endDate }</Text>
        </View> */}
      </View>
            </ScrollView>
                <View style={{ padding: 20 }}>
                    <Button
                        loading={this.state.loading}
                        full
                        // onPress={() => {
                        //     this.setState(
                        //         {
                        //             loading: true
                        //         },
                        //         () => {
                        //             setTimeout(() => {
                        //                 navigation.goBack();
                        //             }, 500);
                        //         }
                        //     );
                        // }}
                        onPress={() => this.onSubmit()}
                    >
                        Save
                    </Button>
                </View>
            </SafeAreaView>
        );
    }
}
