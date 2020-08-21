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
        borderRadius: 8,
        borderWidth: 3,
        borderColor: BaseColor.fieldColor,
    },

    contentForm: {
        padding: 10,
        borderRadius: 8,
        width: "100%",
        //backgroundColor: BaseColor.fieldColor
        borderRadius: 8,
        borderWidth: 3,
        borderColor: BaseColor.fieldColor,
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



export default class SetDate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            selectedStartDate: props.tglAwalNumber,
            selectedEndDate: props.tglAkhirNumber,
            selectedStartDateBooking: props.tglAwalNumber,
            selectedEndDateBooking: props.tglAkhirNumber,
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

        var dates=MyDate.getFullYear()  + '/' +  tempoMonth  + '/' +  tempoDate;
        return dates;
      }
     
    onDateChange(date, type) {
        // console.log('onDateChange',date);
        const{modalVisible,round} =this.state;
        const {setTglAwal,setTglAkhir}=this.props;

        if(round==true){
            if(this.state.selectedStartDate != null && this.state.selectedEndDate != null){
                this.setState({
                    selectedStartDate: null,
                    selectedEndDate: null,
                });

                this.setState({
                    selectedStartDateBooking: null,
                    selectedEndDateBooking: null,
                });
            }
            
            setTimeout(() => {
                if (type === 'END_DATE') {

                    this.setState({
                        selectedEndDate: date,
                    });

                    this.setState({
                        selectedEndDateBooking: date,
                    });
                    

                    

                } else {

                    this.setState({
                        selectedStartDate: date,
                        selectedEndDate: null,
                    });

                    this.setState({
                        selectedStartDateBooking: date,
                        selectedEndDateBooking: null,
                    });

                
                }
            }, 500);
            
        }else{

            this.setState({
                selectedStartDate: date,
                selectedEndDate: null,
            });

            this.setState({
                selectedStartDateBooking: date,
                selectedEndDateBooking: null,
            });


            setTglAwal(this.convertDate(date),date);

        }
        
        
    }
     
    
    render() {
        const { style, label,onPress,round,tglAwal,tglAkhir} = this.props;
        const { value,modalVisible } = this.state;
        var minDate = new Date(); // Today
        minDate.setDate(minDate.getDate() + 7);
        var maxDate = new Date(2020, 10, 10);
        return (

            
                <View style={[styles.contentPicker, style]}>
                    <TouchableOpacity onPress={() => this.openModal()}>
                        <Icon
                            name="calendar-alt"
                            size={24}
                            color={BaseColor.primaryColor}
                        />
                    </TouchableOpacity>
                    <Text  style={{ marginBottom: 5 }}>
                        {tglAwal}
                    </Text>
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
                                            allowRangeSelection={this.state.round}
                                            minDate={minDate}
                                            maxDate={maxDate}
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

SetDate.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    labelTglAwal: PropTypes.string,
    labelTglAkhir: PropTypes.string,

    tglAwal:PropTypes.string,
    tglAkhir:PropTypes.string,
    tglAwalNumber:PropTypes.number,
    tglAwalNumber:PropTypes.number,

    setTglAwal:PropTypes.func,
    setTglAkhir:PropTypes.func,

    round:PropTypes.bool,
};

SetDate.defaultProps = {
    style: {},
    labelTglAwal: "Adults",
    labelTglAkhir: "Adults",

    tglAwal:'',
    tglAkhir:'',
    tglAwalNumber:0,
    tglAkhirNumber:0,

    setTglAwal: () => {},
    setTglAkhir: () => {},
    round:false
};
