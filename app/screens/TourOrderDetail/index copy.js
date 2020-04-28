import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, Text, Button } from "@components";
import * as Utils from "@utils";
import styles from "./styles";

export default class PreviewBooking extends Component {
    constructor(props) {
        super(props);
      
        var listdata_participant=this.props.navigation.state.params.listdata_participant;
        var listdata_customer=this.props.navigation.state.params.listdata_customer;

        this.state = {
      
            listdata_participant:listdata_participant,
            listdata_customer:listdata_customer,



        };

    }


    render() {
        const { navigation } = this.props;

        var content_participant = [];
        var a=1;
        this.state.listdata_participant.map(item => {
            content_participant.push(
                        <View>
                            <View style={styles.blockView}>
                                <Text body1 semibold>
                                    Guest {a}
                                </Text>
                            </View>
                            <View>
                                <View
                                    style={{ flexDirection: "row", marginTop: 10 }}
                                >
                                    <View style={{ flex: 1 }}>
                                        <Text body2>Fullname</Text>
                                    </View>
                                    <View
                                        style={{ flex: 1, alignItems: "flex-end" }}
                                    >
                                        <Text body2 semibold>
                                            {item.title}. {item.fullname}
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={{ flexDirection: "row", marginTop: 10 }}
                                >
                                    <View style={{ flex: 1 }}>
                                        <Text body2>Phone</Text>
                                    </View>
                                    <View
                                        style={{ flex: 1, alignItems: "flex-end" }}
                                    >
                                        <Text body2 semibold>
                                        (+{item.nationality_phone_code}) {item.phone}
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={{ flexDirection: "row", marginTop: 10 }}
                                >
                                    <View style={{ flex: 1 }}>
                                        <Text body2>Nationality</Text>
                                    </View>
                                    <View
                                        style={{ flex: 1, alignItems: "flex-end" }}
                                    >
                                        <Text body2 semibold>
                                            {item.nationality}
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={{ flexDirection: "row", marginTop: 10 }}
                                >
                                    <View style={{ flex: 1 }}>
                                        <Text body2>Age</Text>
                                    </View>
                                    <View
                                        style={{ flex: 1, alignItems: "flex-end" }}
                                    >
                                        <Text body2 semibold>
                                            Sun, 14:00
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={{ flexDirection: "row", marginTop: 10 }}
                                >
                                    <View style={{ flex: 1 }}>
                                        <Text body2>Passport</Text>
                                    </View>
                                    <View
                                        style={{ flex: 1, alignItems: "flex-end" }}
                                    >
                                        <Text body2 semibold>
                                            {item.passport_number}
                                        </Text>
                                        <Text caption1 grayColor>
                                            Expired {item.passport_expire}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>

            );
            a++;
        });



        var content_customer = [];
        var a=1;
        this.state.listdata_customer.map(item => {
            content_customer.push(
                        <View>
                            <View style={styles.blockView}>
                                <Text body1 semibold>
                                    Contact Person
                                </Text>
                            </View>
                            <View>
                                <View
                                    style={{ flexDirection: "row", marginTop: 10 }}
                                >
                                    <View style={{ flex: 1 }}>
                                        <Text body2>Fullname</Text>
                                    </View>
                                    <View
                                        style={{ flex: 1, alignItems: "flex-end" }}
                                    >
                                        <Text body2 semibold>
                                            {item.title}. {item.fullname}
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={{ flexDirection: "row", marginTop: 10 }}
                                >
                                    <View style={{ flex: 1 }}>
                                        <Text body2>Phone</Text>
                                    </View>
                                    <View
                                        style={{ flex: 1, alignItems: "flex-end" }}
                                    >
                                        <Text body2 semibold>
                                        (+{item.nationality_phone_code}) {item.phone}
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={{ flexDirection: "row", marginTop: 10 }}
                                >
                                    <View style={{ flex: 1 }}>
                                        <Text body2>Nationality</Text>
                                    </View>
                                    <View
                                        style={{ flex: 1, alignItems: "flex-end" }}
                                    >
                                        <Text body2 semibold>
                                            {item.nationality}
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={{ flexDirection: "row", marginTop: 10 }}
                                >
                                    <View style={{ flex: 1 }}>
                                        <Text body2>Age</Text>
                                    </View>
                                    <View
                                        style={{ flex: 1, alignItems: "flex-end" }}
                                    >
                                        <Text body2 semibold>
                                            Sun, 14:00
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={{ flexDirection: "row", marginTop: 10 }}
                                >
                                    <View style={{ flex: 1 }}>
                                        <Text body2>Passport</Text>
                                    </View>
                                    <View
                                        style={{ flex: 1, alignItems: "flex-end" }}
                                    >
                                        <Text body2 semibold>
                                            {item.passport_number}
                                        </Text>
                                        <Text caption1 grayColor>
                                            Expired {item.passport_expire}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>

            );
            a++;
        });
        
        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <Header
                    title="Preview Booking Person"
                    subTitle=""
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
                    <View style={{ paddingHorizontal: 20 }}>
                        
                        <View style={{marginTop: 30}}>
                            {content_customer}
                        </View>

                        <View style={{marginTop: 30}}>
                            {content_participant}
                        </View>




                        
                        {/* <View style={styles.blockView}>
                            <View
                                style={{ flexDirection: "row", marginTop: 10 }}
                            >
                                <View style={{ flex: 1 }}>
                                    <Text body2>Check-In</Text>
                                </View>
                                <View
                                    style={{ flex: 1, alignItems: "flex-end" }}
                                >
                                    <Text body2 semibold>
                                        Check-In
                                    </Text>
                                    <Text caption1 grayColor>
                                        Sun, 14:00
                                    </Text>
                                </View>
                            </View>
                            <View
                                style={{ flexDirection: "row", marginTop: 10 }}
                            >
                                <View style={{ flex: 1 }}>
                                    <Text body2>Check-Out</Text>
                                </View>
                                <View
                                    style={{ flex: 1, alignItems: "flex-end" }}
                                >
                                    <Text body2 semibold>
                                        Check-In
                                    </Text>
                                    <Text caption1 grayColor>
                                        Sun, 14:00
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
                                        1 night(s)
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.blockView}>
                            <Text body2 style={{ marginBottom: 10 }}>
                                Room
                            </Text>
                            <Text body1 semibold style={{ marginBottom: 5 }}>
                                Standard Twin Room (x1)
                            </Text>
                            <Text body2 style={{ marginBottom: 5 }}>
                                Lorem ipsum dolor sit amet,sed diam
                            </Text>
                            <Text body2 style={{ marginBottom: 5 }}>
                                Lorem ipsum dolor sit amet,sed diam
                            </Text>
                            <Text body2 style={{ marginBottom: 5 }}>
                                Lorem ipsum dolor sit amet,sed diam
                            </Text>
                        </View>
                        <View style={styles.blockView}>
                            <Text body2 style={{ marginBottom: 10 }}>
                                Contact’s Name
                            </Text>
                            <Text body1 semibold style={{ marginBottom: 5 }}>
                                Standard Twin Room (x1)
                            </Text>
                            <Text body2 grayColor style={{ marginBottom: 5 }}>
                                Lorem ipsum dolor sit amet,sed diam nonumy
                                eirmod tempor invidunt ut labore et dolore magna
                                aliquyam erat, At vero eos et accusam et justo
                                duo dolores et ea rebum.
                            </Text>
                        </View>
                        <View style={{ paddingVertical: 10 }}>
                            <Text body2 style={{ marginBottom: 10 }}>
                                Price Details
                            </Text>
                            <Text body1 semibold style={{ marginBottom: 5 }}>
                                Standard Twin Room (x1)
                            </Text>
                        </View> */}
                    </View>
                </ScrollView>
                <View style={styles.contentButtonBottom}>
                    {/* <View>
                        <Text caption1 semibold grayColor>
                            2 Days / 1 Night
                        </Text>
                        <Text title3 primaryColor semibold>
                            $399.99
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
                    <Button
                        style={{ height: 46 }}
                        onPress={() => navigation.navigate("CheckOut")}
                    >
                        Continue
                    </Button> */}
                </View>
            </SafeAreaView>
        );
    }
}
