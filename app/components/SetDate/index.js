import React, { Component } from "react";
import { View, TouchableOpacity, StyleSheet} from "react-native";
import PropTypes from "prop-types";
import { Text, Icon } from "@components";
// import styles from "./styles";
import { BaseColor } from "@config";


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
    }
});



export default class SetDate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value
        };
    }
    

    onChange(type) {
        var value=0;
        if (type == "up") {
            this.setState({
                value: parseInt(this.state.value) + 1
            });
            value=parseInt(this.state.value) + 1;
        } else {
            this.setState({
                value: this.state.value - 1 > 0 ? parseInt(this.state.value) - 1 : 0
            });
            value=this.state.value - 1 > 0 ? parseInt(this.state.value) - 1 : 0
        }
        
        if(this.props.typeOld=='1'){
            this.props.setJumlahDewasa(value);

        }else if(this.props.typeOld=='2'){
            this.props.setJumlahAnak(value);

        }else if(this.props.typeOld=='3'){
            this.props.setJumlahBayi(value);

        }
    }

    render() {
        const { style, label, detail } = this.props;
        const { value } = this.state;
        return (
            <View style={[styles.contentPicker, style]}>
                
                <TouchableOpacity onPress={() => this.onChange("up")}>
                    <Icon
                        name="calendar-alt"
                        size={24}
                        color={BaseColor.primaryColor}
                    />
                </TouchableOpacity>
                <Text  style={{ marginBottom: 5 }}>
                    {/* {label} */}2020-08-15
                </Text>
            </View>
        );
    }
}

SetDate.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    label: PropTypes.string,
    detail: PropTypes.string,
    value: PropTypes.number,
    onChange: PropTypes.func
};

SetDate.defaultProps = {
    style: {},
    label: "Adults",
    detail: ">= 12 years",
    value: 1,
    onChange: () => {}
};
