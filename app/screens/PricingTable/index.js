import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, PackageItem,Text} from "@components";
import styles from "./styles";

// Load sample data
import { PackageData } from "@data";

export default class PricingTable extends Component {
    constructor(props) {
        super(props);

        // Temp data define
        this.state = {
            packageItem: PackageData[0],
            packageItemDetail: PackageData[1]
        };
    }
    render() {
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

        const { navigation } = this.props;
        const { packageItem, packageItemDetail } = this.state;
        
        var dataPrice=this.props.navigation.state.params.dataPrice;
        var detail_price=dataPrice.detail_price[0];
        
        var content_data_price='';
        
        // this.state.detail_price.map(item => {
           
        // });

        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <Header
                    title="Detail Harga"
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
                    <View style={styles.contain}>
                        <View style={{padding: 20,
                                    backgroundColor: BaseColor.fieldColor,
                                    borderRadius: 8,
                                    width: "100%"}}>
                            {/* <View style={{ flexDirection: "row",justifyContent: "space-between"}}>
                                <Text title2 semibold>
                                   Rp {priceSplitter(detail_price.total_price)}
                                </Text>
                            </View> */}
                            
                            <View style={{flexDirection:'row',paddingLeft:20,paddingRight:20,paddingTop:5,paddingBottom:5}} >
                                <View style={{flexDirection:'row',flex: 10,justifyContent: "flex-start",alignItems: "center"}}>
                                    <View style={{ flex: 5,flexDirection: "row",justifyContent: "flex-start",alignItems: "center"}}>
                                        <View>
                                            <Text footnote grayColor numberOfLines={1}>
                                                Total Harga
                                            </Text>
                                        
                                        </View>
                                    </View>
                                    <View style={{flex: 5,justifyContent: "center",alignItems: "flex-end"}}>
                                           
                                            <Text headline semibold numberOfLines={1}>
                                            Rp {priceSplitter(detail_price.total_price)}
                                            </Text>
                                    </View>
                                </View>
                            </View>
                        
                            {detail_price.detail_price.map((data, index) => (
                            <View style={{flexDirection:'row',paddingLeft:20,paddingRight:20,paddingTop:5,paddingBottom:5}} >
                                <View style={{flexDirection:'row',flex: 10,justifyContent: "flex-start",alignItems: "center"}}>
                                    <View style={{ flex: 5,flexDirection: "row",justifyContent: "flex-start",alignItems: "center"}}>
                                        <View>
                                            <Text footnote grayColor numberOfLines={1}>
                                                {data.pax_type} ({data.pax_count}x)
                                            </Text>
                                        
                                        </View>
                                    </View>
                                    <View style={{flex: 5,justifyContent: "center",alignItems: "flex-end"}}>
                                           
                                            <Text headline semibold numberOfLines={1}>
                                                Rp {priceSplitter(parseInt(data.total)*parseInt(data.pax_count))}
                                            </Text>
                                    </View>
                                </View>
                            </View>
                            ))}
                            
                        </View>
            
                        {/* Package Component > Summarize */}
                        {/* <PackageItem
                            packageName={packageItem.packageName}
                            price={packageItem.price}
                            type={packageItem.type}
                            description={packageItem.description}
                            onPressIcon={() => {
                                navigation.navigate("PricingTable");
                            }}
                            style={{ marginBottom: 10 }}
                        /> */}
                        {/* Package Component > Expand Detail */}
                        {/* <PackageItem
                            detail
                            packageName={packageItemDetail.packageName}
                            price={packageItemDetail.price}
                            type={packageItemDetail.type}
                            description={packageItemDetail.description}
                            services={packageItemDetail.services}
                        /> */}
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}
