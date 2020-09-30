import React, { Component } from "react";
import { View, TouchableOpacity, StyleSheet} from "react-native";
import PropTypes, { func } from "prop-types";
import { Text, Icon } from "@components";
// import styles from "./styles";
import { BaseColor } from "@config";
import Modal from "react-native-modal";
import CalendarPicker from 'react-native-calendar-picker';


const styles = StyleSheet.create({
    contentPicker: {
        paddingHorizontal: 5,
        paddingVertical:5,
        borderRadius: 8,
        flex: 1,
        //backgroundColor: BaseColor.fieldColor,
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 8,
        borderWidth: 0,
        borderColor: BaseColor.fieldColor,
    },

    contentForm: {
        // paddingHorizontal: 10,
        // paddingVertical: 5,
        // borderRadius: 8,
        // width: "100%",
        // //backgroundColor: BaseColor.fieldColor
        // borderRadius: 8,
        // borderWidth: 3,
        // borderColor: BaseColor.fieldColor,
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: "100%",
        borderBottomColor: BaseColor.fieldColor,
        borderBottomWidth: 2,

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
    },
    contentPickDate: {
        // flexDirection: "row",
        // justifyContent: "space-between",
        borderRadius: 8,
        borderWidth: 3,
        borderColor: BaseColor.fieldColor,
        // backgroundColor: BaseColor.fieldColor,
        flex: 6,
        paddingHorizontal:10,
        paddingVertical:5
    },
});



export default class SetDateLong extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            selectedStartDate: null,
            selectedEndDate: null,
            selectedStartDateBooking: null,
            selectedEndDateBooking: null,
            round:props.round
        };
        this.onDateChange = this.onDateChange.bind(this);
    }

    openModal() {
        const { option, value } = this.state;
        this.setState({
            modalVisible: true,
        });
    }

    componentDidMount() {
        this.setState({
            selectedStartDate: null,
            selectedEndDate: null,
        });
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
        const { navigation } = this.props;
        const {setBookingTime}=this.props;
        
        if(this.props.round==true){
          if (type === 'END_DATE') {

            this.setState({
              selectedEndDate: date,
            });
  
            this.setState({
              selectedEndDateBooking: this.convertDate(date),
            });
            
            setTimeout(() => {
                setBookingTime(this.state.selectedStartDateBooking,this.state.selectedEndDateBooking,this.props.round);
                this.setState({modalVisible:false});
             }, 100);
                        
             
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
        }else{
        
          this.setState({
            selectedStartDate: date,
            selectedEndDate: null,
          });

          this.setState({
            selectedStartDateBooking: this.convertDate(date),
            selectedEndDateBooking: null,
          });
   

           setTimeout(() => {
            setBookingTime(this.state.selectedStartDateBooking,this.state.selectedEndDateBooking,this.props.round);
            this.setState({modalVisible:false});
         }, 200);
          
        }
        
        
        
      }

     
  
    render() {
        const { style, label,onPress,round,tglAwal,tglAkhir,icon} = this.props;
        const { value,modalVisible } = this.state;
        var minDate = new Date(); // Today
        minDate.setDate(minDate.getDate() + 0);
        var maxDate = new Date(2020, 10, 10);
        return (
            <View>
               
                    <TouchableOpacity
                    style={[styles.contentForm, style]}
                    onPress={() => this.openModal()}
                >
                    <View style={{flex: 1,flexDirection: "row"}}>
                            <View style={{flex: 1,
                                            alignItems: "flex-start",
                                            justifyContent: "center",}}
                                            
                                      >
                                <Icon
                                            name={icon}
                                            size={14}
                                            color={BaseColor.primaryColor}
                                />
                            </View>
                            <View style={{flex: 11,
                                            //alignItems: "flex-end",
                                            justifyContent: "center",
                                        }}
                                            
                                      >
                            <Text caption2 light style={{ marginBottom: 0 }}>
                                Atur Tanggal
                            </Text>
                            <Text body2 semibold>
                            {
                            round ?
                            tglAwal+' s/d '+tglAkhir
                            :
                            tglAwal
                            }
                            </Text>
                            </View>
                    </View>
                    
                </TouchableOpacity>
            

                <Modal
                    isVisible={modalVisible}
                    onBackdropPress={() => {
                        this.setState({
                            modalVisible: false,
                            option: this.props.option
                        });
                    }}
                    onSwipeComplete={() => {
                        this.setState({
                            modalVisible: false,
                            option: this.props.option
                        });
                    }}
                    swipeDirection={["down"]}
                    style={styles.bottomModal}
                >
                    <View style={styles.contentFilterBottom}>
                        <View style={styles.contentSwipeDown}>
                            <View style={styles.lineSwipeDown} />
                        </View>

                        <View style={{flexDirection: "row",marginLeft:-20}}>
                          

                            <CalendarPicker
                                            startFromMonday={true}
                                            allowRangeSelection={round}
                                            minDate={tglAwal}
                                            //maxDate={maxDate}
                                            todayBackgroundColor="#f2e6ff"
                                            selectedDayColor={BaseColor.primaryColor}
                                            selectedDayTextColor="#FFFFFF"
                                            onDateChange={this.onDateChange}
                                            />
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

SetDateLong.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    labelTglAwal: PropTypes.string,
    labelTglAkhir: PropTypes.string,

    tglAwal:PropTypes.string,
    tglAkhir:PropTypes.string,

    setBookingTime:PropTypes.func,
    round:PropTypes.bool,
    icon:PropTypes.string,

};

SetDateLong.defaultProps = {
    style: {},
    labelTglAwal: "Adults",
    labelTglAkhir: "Adults",

    tglAwal:'',
    tglAkhir:'',
    setBookingTime: () => {},
    round:false,
    icon:"check",
};
