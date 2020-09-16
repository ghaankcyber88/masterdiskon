import React, { Component } from "react";
import { View, ScrollView, FlatList } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import {
    Image,
    Header,
    SafeAreaView,
    Icon,
    Text,
    HotelItem,
    Tag,
    ProfilePerformance,
    Card,
    Button
} from "@components";
import styles from "./styles";
import CardCustomProfile from "../../components/CardCustomProfile";

// Load sample data
import { UserData, HotelData, TourData } from "@data";

export default class Profile1 extends Component {
    constructor(props) {
        super(props);

        // Temp data define
        this.state = {
            tours: TourData,
            hotels: HotelData,
            userData: UserData[0]
        };
    }

    render() {
        const { navigation } = this.props;
        let { tours, hotels, userData } = this.state;

        return (
            <SafeAreaView
            style={[BaseStyle.safeAreaView,{backgroundColor:BaseColor.bgColor}]}
            forceInset={{ top: "always" }}
            >
                <Header
                    title="Profile1"
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
                <ScrollView style={{ marginBottom: 20 }}>
                    {/* Profile Information */}
                    <View style={{ alignItems: "center" }}>
                        <Image source={userData.image} style={styles.image} />
                        <Text title1 semibold>
                            {userData.name}
                        </Text>
                        <Text subhead grayColor>
                            {userData.major}
                        </Text>
                        <Tag primary style={styles.tagFollow}>
                            + Follow
                        </Tag>
                        <View style={styles.location}>
                            <Icon
                                name="map-marker-alt"
                                size={10}
                                color={BaseColor.primaryColor}
                            />
                            <Text
                                caption1
                                primaryColor
                                style={{
                                    marginLeft: 3
                                }}
                            >
                                {userData.address}
                            </Text>
                        </View>
                    </View>
                    
                    
                    <View style={{ marginHorizontal: 20,marginTop:20}}>
                        <View style={{ width: "100%" }}>
                            <View style={{paddingBottom:50}}>
                                <CardCustomProfile 
                                    title={'QuickPick'}
                                    subtitle={'Pesenan lebih cepat, isi data penumpang, dengan satu klik'}
                                    icon={'home'}
                                    onPress={() => {
                                        this.props.navigation.navigate("ProfileSmart",{sourcePage:'profile'});
                                    }}
                                
                                />
                                <CardCustomProfile 
                                    title={'Ubah Kata Sandi'}
                                    subtitle={'Pesenan lebih cepat, isi data penumpang, dengan satu klik'}
                                    icon={'home'}
                                    onPress={() => {
                                        this.props.navigation.navigate("ProfileSmart",{sourcePage:'profile'});
                                    }}
                                
                                />

                            </View>
                        </View>
                    </View>
                    
                    <View style={{ marginHorizontal: 20}}>
                        <Button
                            full
                            onPress={() => this.onLogOut()}
                        >
                            Sign Out
                        </Button>
                    </View>
                    
                   
                </ScrollView>
            </SafeAreaView>
        );
    }
}
