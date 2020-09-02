import React, { Component } from "react";
import { View, TouchableOpacity,StyleSheet } from "react-native";
import PropTypes, { func } from "prop-types";
import { Text, Icon } from "@components";
//import styles from "./styles";
import { BaseColor } from "@config";


const styles = StyleSheet.create({
    contentRange: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,
        marginTop: 10
    },
    contentResultRange: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10
    },
    contentList: {
        flexDirection: "row",
        paddingTop: 10,
        paddingBottom: 10
    },
    contentQuest: {
        //height: 85,
        justifyContent: "space-between",
        //marginTop: 10
    },
    lineRow: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    iconRight: {
        width: 100,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    interioItem: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginLeft: 20,
        alignItems: "center",
        justifyContent: "center"
    }
});


export default class QuantityPickerHorizontal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
            minPerson:props.minPerson

        };
    }
    

    onChange(type) {
        const{setMinPerson}=this.props;
        var value=0;
        var minPerson=0;
        if (type == "up") {
            this.setState({
                value: parseInt(this.state.value) + 1
            });
            value=parseInt(this.state.value) + 1;


            this.setState({
                minPerson: parseInt(this.state.minPerson) + 1
            });
            minPerson=parseInt(this.state.minPerson) + 1;
        } else {
            this.setState({
                value: this.state.value - 1 > 0 ? parseInt(this.state.value) - 1 : 0
            });
            value=this.state.value - 1 > 0 ? parseInt(this.state.value) - 1 : 0



            this.setState({
                minPerson: this.state.minPerson - 1 > 0 ? parseInt(this.state.minPerson) - 1 : 0
            });
            minPerson=this.state.minPerson - 1 > 0 ? parseInt(this.state.minPerson) - 1 : 0
        }

        setMinPerson(minPerson);
        
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
            // <View style={{flexDirection:'row'}}>
            //     <View style={{flex: 5,flexDirection: "row",justifyContent: "flex-start",alignItems: "center"}}>
            //         <Text body1 style={{ marginBottom: 5 }}>
            //             {label}
            //         </Text>
            //         <Text caption1 light style={{ marginBottom: 5 }}>
            //             {detail}
            //         </Text>
            //     </View>
                
            //     <View style={{flex: 5,flexDirection: "row",justifyContent: "flex-end",alignItems: "flex-end"}}>
            //         <TouchableOpacity onPress={() => this.onChange("up")}>
            //             <Icon
            //                 name="plus-circle"
            //                 size={24}
            //                 color={BaseColor.primaryColor}
            //             />
            //         </TouchableOpacity>
            //         <Text title1>{value}</Text>
            //         <TouchableOpacity onPress={() => this.onChange("down")}>
            //             <Icon
            //                 name="minus-circle"
            //                 size={24}
            //                 color={BaseColor.grayColor}
            //             />
            //         </TouchableOpacity>
            //     </View>
                
                
            // </View>
            
            <View style={{ padding: 20 }}>
                        
                        <View style={styles.contentQuest}>
                            <View style={styles.lineRow}>
                                <View>
                                    <Text body1>{label}</Text>
                                    <Text caption1 grayColor>
                                    {detail}
                                    </Text>
                                </View>
                                <View style={styles.iconRight}>
                                    <TouchableOpacity
                                        onPress={() => this.onChange("down")}
                                    >
                                        <Icon
                                            name="minus-circle"
                                            size={24}
                                            color={BaseColor.grayColor}
                                        />
                                    </TouchableOpacity>
                                    <Text title1>{value}</Text>
                                    <TouchableOpacity
                                        
                                        onPress={() => this.onChange("up")}
                                    >
                                        <Icon
                                            name="plus-circle"
                                            size={24}
                                            color={BaseColor.primaryColor}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            
                        </View>
                    </View>
        );
    }
}

QuantityPickerHorizontal.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    label: PropTypes.string,
    detail: PropTypes.string,
    value: PropTypes.number,
    onChange: PropTypes.func,
    setMinPerson:PropTypes.func,
    minPerson:PropTypes.number
};

QuantityPickerHorizontal.defaultProps = {
    style: {},
    label: "Adults",
    detail: ">= 12 years",
    value: 1,
    onChange: () => {},
    setMinPerson: () => {},
    minPerson:2
};
