import React, { Component } from "react";
import { View, TouchableOpacity, StyleSheet} from "react-native";
import PropTypes from "prop-types";
import { Text, Icon,QuantityPicker } from "@components";
// import styles from "./styles";
import { BaseColor } from "@config";
import Modal from "react-native-modal";

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



export default class SetPenumpang extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
        };
    }

    openModal() {
        const { option, value } = this.props;
        this.setState({
            modalVisible: true,
        });
    }
    

    render() {
        const { style, label,onPress,minPerson,minPrice,totalPrice } = this.props;
        const {modalVisible } = this.state;
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

        return (
            

            <View style={[styles.contentPicker, style]}>

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

                        <View style={{ marginTop: 20, flexDirection: "row" }}>
                            <View>
                                                    <View>
                                                        <Text primaryColor semibold style={{ paddingHorizontal: 10 }}>
                                                            {minPerson} x Rp {priceSplitter(minPrice)}
                                                        </Text>
                                                    </View>
                                                    <View style={styles.iconRight}>
                                                        <Text
                                                            style={{ paddingHorizontal: 10 }}
                                                        >
                                                            Rp {priceSplitter(totalPrice)}
                                                        </Text>
                                                    </View>
                            </View>
                        </View>
                        <View style={{ marginTop: 20, flexDirection: "row" }}>

                        
                                <QuantityPicker
                                    label="Adults"
                                    detail=">= 12 years"
                                    value={this.props.dewasa}
                                    setJumlahDewasa={this.props.setJumlahDewasa}
                                    typeOld="1"
                                    minPerson={this.props.minPerson}
                                    setMinPerson={this.props.setMinPerson}
                                />
                        
                        
                                <QuantityPicker
                                    label="Children"
                                    detail="2 - 12 years"
                                    value={this.props.anak}
                                    style={{ marginHorizontal: 15 }}
                                    setJumlahAnak={this.props.setJumlahAnak}
                                    typeOld="2"
                                    minPerson={this.props.minPerson}
                                    setMinPerson={this.props.setMinPerson}
                                />
                                <QuantityPicker
                                    label="Infants"
                                    detail="<= 2 years"
                                    value={this.props.bayi}
                                    setJumlahBayi={this.props.setJumlahBayi}
                                    typeOld="3"
                                    minPerson={this.props.minPerson}
                                    setMinPerson={this.props.setMinPerson}
                                />
                        </View>
                    </View>
                    </Modal>


                    <TouchableOpacity onPress={() => this.openModal()}>
                        <Icon
                            name="user"
                            size={24}
                            color={BaseColor.primaryColor}
                        />
                    </TouchableOpacity>
                    <Text  style={{ marginBottom: 5 }}>
                        {label} Orang
                    </Text>

                    </View>
        );
    }
}

SetPenumpang.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    label: PropTypes.string,
    minPrice: PropTypes.number,
    minPerson: PropTypes.number,
    totalPrice:PropTypes.number,
    onPress: PropTypes.func
};

SetPenumpang.defaultProps = {
    style: {},
    label: "",
    minPrice: 0,
    minPerson: 0,
    totalPrice:0,
    onPress: () => {}
};
