import React, { Component } from "react";
import { View, ScrollView, TextInput, TouchableOpacity,StyleSheet } from "react-native";
import DatePicker from 'react-native-datepicker'
import { BaseStyle, BaseColor, Images } from "@config";
import { Image, Header, SafeAreaView, Icon, Text, Button } from "@components";
import CalendarPicker from 'react-native-calendar-picker';


// Load sample data
import { UserData } from "@data";
import Timeline from 'react-native-timeline-flatlist';


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
        padding:20
      },
      
      // container: {
      //   flex: 1,
      //   padding: 20,
      // paddingTop:65,
      //   backgroundColor:'white'
      // },
      list: {
        flex: 1,
        marginTop:20,
      },
      title:{
        fontSize:16,
        fontWeight: 'bold',
        marginTop:-10
      },
      descriptionContainer:{
        flexDirection: 'row',
        paddingRight: 50
      },
      image:{
        width: 50,
        height: 50,
        borderRadius: 25,
        
      },
      textDescription: {
        marginLeft: 10,
        color: 'black'
      },
      
      line: {
        width: 1,
        height: 14,
        backgroundColor: BaseColor.grayColor,
        marginLeft: 10
    },
    contentFilter: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 10
    },
    bottomModal: {
        justifyContent: "flex-end",
        margin: 0
    },
    contentFilterBottom: {
        width: "100%",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        paddingHorizontal: 20,
        backgroundColor: BaseColor.whiteColor
    },
    contentSwipeDown: {
        paddingTop: 10,
        alignItems: "center"
    },
    lineSwipeDown: {
        width: 30,
        height: 2.5,
        backgroundColor: BaseColor.dividerColor
    },
    contentActionModalBottom: {
        flexDirection: "row",
        paddingVertical: 10,
        marginBottom: 10,
        justifyContent: "space-between",
        borderBottomColor: BaseColor.textSecondaryColor,
        borderBottomWidth: 1
    }
});


export default class FlightDetail extends Component {
    constructor(props) {
        super(props);
        var select=this.props.navigation.state.params.select;
        var detailPrice=select.price.detail_price;
        var price=select.price;
        this.state = {
          select:select,
          detailPrice: detailPrice,
          price: price,
          data_timeline:[
              {
                time: select.flight_schedule[0].departure_time, 
                title: select.flight_schedule[0].from+' - '+select.flight_schedule[0].from_name, 
                operation:'Dioperasikan oleh '+select.flight_schedule[0].airline_name,
                description:'Departure at :'+select.flight_schedule[0].departure_date+' '+select.flight_schedule[0].departure_time,
                lineColor:'#009688', 
                icon: Images.dot,
                imageUrl: select.flight_schedule[0].airline_logo,
                entertainment:select.flight_schedule[0].inflight_entertainment,
                baggage:select.flight_schedule[0].baggage,
                meal:select.flight_schedule[0].meal,
                type:'from'
              },
              {
                time: select.flight_schedule[0].arrival_time, 
                title: select.flight_schedule[0].to+' - '+select.flight_schedule[0].to_name, 
                operation:'',
                description: 'Arrive at :'+select.flight_schedule[0].arrival_date+' '+select.flight_schedule[0].arrival_time, 
                icon: Images.dot,
                imageUrl: select.flight_schedule[0].airline_logo,
                entertainment:select.flight_schedule[0].inflight_entertainment,
                baggage:select.flight_schedule[0].baggage,
                meal:select.flight_schedule[0].meal,
                type:'to'
              },
             
            ]
        };
        
        // this.onEventPress = this.onEventPress.bind(this)
        // this.renderSelected = this.renderSelected.bind(this)
        this.renderDetail = this.renderDetail.bind(this)
      }
      
      
      renderDetail(rowData, sectionID, rowID) {
        let title = <Text style={[styles.title]}>{rowData.title}</Text>
        var desc = null;
        
        if(rowData.type=='from')
        {
          if(rowData.description && rowData.imageUrl)
            desc = (
              <View style={styles.descriptionContainer}>   
                <Image source={{uri: rowData.imageUrl}} style={styles.image} resizeMode="contain"/>
                <Text style={[styles.textDescription]}>{rowData.description}</Text>
                <Text style={[styles.textDescription]}>{rowData.operation}</Text>
              </View>
            )
        }else{
          desc = (
            <View style={styles.descriptionContainer}>   
              <Text style={{marginLeft: 0,color: 'black'}}>{rowData.description}</Text>
            </View>
          )
        }
        
     
        
        var baggage='0';
        if(rowData.type=='from')
        {
          baggage=rowData.baggage;
        }
        
        var meal='No';
        if(rowData.type=='from')
        {
          if(rowData.meal != '0'){
            meal='Yes';
          }
        }
        
           
        var entertainment='No';
        if(rowData.type=='from')
        {
          if(rowData.entertainment=='true'){
            entertainment='Yes';
          }
        }
        
        
        var facility=null;
        if(rowData.type=='from')
        {
          
        facility=<View style={{ flexDirection: "row", alignItems: "center" }}>
                      <View
                          style={styles.contentFilter}
                      >
                          <Icon
                              name="suitcase"
                              size={16}
                              color={BaseColor.grayColor}
                              solid
                          />
                          <Text headline grayColor style={{ marginLeft: 5 }}>
                              : {baggage} kg
                          </Text>
                          
                      </View>
                      
                      <View style={styles.line} />
                      
                      <View
                          style={styles.contentFilter}
                      >
                          <Icon
                              name="hamburger"
                              size={16}
                              color={BaseColor.grayColor}
                              solid
                          />
                          <Text headline grayColor style={{ marginLeft: 5 }}>
                            : {meal}
                          </Text>
                          
                      </View>
                      
                      <View style={styles.line} />
                      
                      <View
                          style={styles.contentFilter}
                      >
                          <Icon
                              name="film"
                              size={16}
                              color={BaseColor.grayColor}
                              solid
                          />
                          <Text headline grayColor style={{ marginLeft: 5 }}>
                            : {entertainment}
                          </Text>
                          
                      </View>
                  </View>
          }
        
        return (
          <View style={{flex:1}}>
            {title}
            {desc}
            {facility}
          </View>
        )
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
     
    render() {
        const { navigation } = this.props;
        const { selectedStartDate, selectedEndDate } = this.state;
        var information= [
          { title: "County", detail: 'asd' },
          { title: "Category", detail: 'asd' },
          { title: "Duration", detail: 'asdsad' },
      ]
      const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <Header
                    title="Detail"
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
         
                    <Timeline 
                        //style={styles.list}
                        data={this.state.data_timeline}
                        circleSize={20}
                        circleColor={BaseColor.primaryColor}
                        lineColor={BaseColor.primaryColor}
                        timeContainerStyle={{minWidth:52, marginTop: 0}}
                        timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13}}
                        descriptionStyle={{color:'gray'}}
                        options={{
                          style:{paddingTop:5}
                        }}
                        //innerCircle={'icon'}
                        onEventPress={this.onEventPress}
                        renderDetail={this.renderDetail}
                    />
                  
                            <View style={{ paddingHorizontal: 0 }}>
                            <Text style={[styles.title]}>Tarif</Text>
                              {this.state.detailPrice.map((item, index) => {
                                  return (
                                      <View
                                          style={{
                                              flexDirection: "row",
                                              alignItems: "center",
                                              justifyContent: "space-between",
                                              paddingVertical: 5,
                                              // borderBottomColor:
                                              // BaseColor.textSecondaryColor,
                                              // borderBottomWidth: 1
                                          }}
                                          key={"information" + index}
                                      >
                                          <Text body2 grayColor>
                                              {item.pax_type} ({item.pax_count})
                                          </Text>
                                          <Text body2 semibold >
                                              Rp {priceSplitter(parseInt(item.total)*parseInt(item.pax_count))}
                                          </Text>
                                      </View>
                                  );
                              })}
                                      <View
                                          style={{
                                              flexDirection: "row",
                                              alignItems: "center",
                                              justifyContent: "space-between",
                                              paddingVertical: 5,
                                              borderBottomColor:
                                              BaseColor.textSecondaryColor,
                                              borderBottomWidth: 1
                                          }}
                                      >
                                          <Text body2 grayColor>
                                            Tax and other fee
                                          </Text>
                                          <Text body2 semibold >
                                              Include
                                          </Text>
                                      </View>
                                      
                                      <View
                                          style={{
                                              flexDirection: "row",
                                              alignItems: "center",
                                              justifyContent: "space-between",
                                              paddingVertical: 5,
                                              // borderBottomColor:
                                              // BaseColor.textSecondaryColor,
                                              // borderBottomWidth: 1
                                          }}
                                      >
                                          <Text body2 grayColor>
                                            Grand Total
                                          </Text>
                                          <Text body2 semibold >
                                            Rp {priceSplitter(this.state.price.total_price)}
                                          </Text>
                                      </View>
                                      
                                      
                                      <View
                                          style={{
                                              flexDirection: "row",
                                              alignItems: "center",
                                              justifyContent: "space-between",
                                              paddingVertical: 5,
                                              // borderBottomColor:
                                              // BaseColor.textSecondaryColor,
                                              // borderBottomWidth: 1
                                          }}
                                      >
                                          <Text body2 grayColor>
                                            Protection (CIU Insurance)
                                          </Text>
                                          <Text body2 semibold >
                                            Rp {priceSplitter(this.state.price.insurance_total)}
                                          </Text>
                                      </View>
                          </View>
                  </View>
                </ScrollView>
          
          </SafeAreaView>
        );
    }
}
