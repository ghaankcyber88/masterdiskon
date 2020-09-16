import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { Text, Button, Icon } from "@components";
import styles from "./styles";
import Modal from "react-native-modal";
import { BaseColor } from "@config";

export default class FormOption extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            // option: props.option,
            // value: props.value,
            // text:props.text,
            // setKelasPesawat:props.setKelasPesawat,
            
            
            style: props.style,
            label:props.label,
            option:props.option,
            optionSet: props.optionSet,
            optionSelectText:props.optionSelectText,
            optionSelectValue:props.optionSelectValue,
        };
    }

    componentDidMount() {
        console.log(optionSelectValue);
        const { style, label,option,optionSet,optionSelectText,optionSelectValue } = this.state;
        this.setState({
            option: option.map(item => {
                return {
                    ...item,
                    checked: item.value == optionSelectValue
                };
            })
        });
    }

    openModal() {
    
        const { style, label,option,optionSet,optionSelectText,optionSelectValue } = this.state;
        console.log(optionSelectValue);
        
        this.setState({
            modalVisible: true,
            option: option.map(item => {
                return {
                    ...item,
                    checked: item.value == optionSelectValue
                };
            })
        });
    }

    onSelect(select) {
        const { option, value,setKelasPesawat } = this.state;
        this.setState({
            option: option.map(item => {
                return {
                    ...item,
                    checked: item.value == select.value
                };
            })
        });
        

        setKelasPesawat(select.text,select.value);
            this.setState(
                {
                    value: select.value,
                    modalVisible: false
                }
            );
    }



    render() {
        const { style, label, onCancel } = this.props;
        const { modalVisible, option, value } = this.state;
        return (
            <View>
                <Modal
                    isVisible={modalVisible}
                    onBackdropPress={() => {
                        this.setState({
                            modalVisible: false,
                            option: this.props.option
                        });
                        //onCancel();
                    }}
                    onSwipeComplete={() => {
                        this.setState({
                            modalVisible: false,
                            option: this.props.option
                        });
                        //onCancel();
                    }}
                    swipeDirection={["down"]}
                    style={styles.bottomModal}
                >
                    <View style={styles.contentFilterBottom}>
                        <View style={styles.contentSwipeDown}>
                            <View style={styles.lineSwipeDown} />
                        </View>
                        {option.map((item, index) => (
                            <TouchableOpacity
                                style={styles.contentActionModalBottom}
                                key={item.value}
                                onPress={() => this.onSelect(item)}
                            >
                                <Text
                                    body2
                                    semibold
                                    primaryColor={item.checked}
                                >
                                    {item.text}
                                </Text>
                                {item.checked && (
                                    <Icon
                                        name="check"
                                        size={14}
                                        color={BaseColor.primaryColor}
                                    />
                                )}
                            </TouchableOpacity>
                        ))}
                      
                    </View>
                </Modal>
                <TouchableOpacity
                    style={[styles.contentForm, style]}
                    onPress={() => this.openModal()}
                >
                    <Text caption2 light style={{ marginBottom: 5 }}>
                        {label}
                    </Text>
                    <Text body1 semibold>
                        {this.props.selectedText}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}



FormOption.propTypes = {
    // style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    // label: PropTypes.string,
    // value: PropTypes.string,
    // option: PropTypes.array,
    // onCancel: PropTypes.func,
    // onChange: PropTypes.func,
    // selectedText:PropTypes.string,
    // setKelasPesawat: PropTypes.func,
    
    
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    label:PropTypes.string,
    option: PropTypes.array,
    optionSet: PropTypes.func,
    optionSelectText: PropTypes.string,
    optionSelectValue: PropTypes.string,
};

FormOption.defaultProps = {
    // style: {},
    // label: "Seat Class",
    // value: "E",
    // selectedText:"",
    // option: [
    //     {
    //         value: "E",
    //         text: "Economy Class"
    //     },
    //     {
    //         value: "S",
    //         text: "Business Class"
    //     },
    //     {
    //         value: "B",
    //         text: "First Class"
    //     },
    //     {
    //         value: "F",
    //         text: "Normal Class"
    //     }
    // ],
    // onCancel: () => {},
    // onChange: () => {},
    // setKelasPesawat: () => {}
    
    
    style: {},
    label:"",
    option:[{}],
    optionSet: () => {},
    optionSelectText: "",
    optionSelectValue: ""
};
