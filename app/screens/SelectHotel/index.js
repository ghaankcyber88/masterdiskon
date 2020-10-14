import React, { Component } from "react";
import {
    View,
    FlatList,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, Text, Image } from "@components";
// import styles from "./styles";

// Load sample flight data list
import {PostDataNew} from '../../services/PostDataNew';
import {AsyncStorage} from 'react-native';
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
  } from "rn-placeholder";



  const styles = StyleSheet.create({
    textInput: {
        height: 46,
        backgroundColor: BaseColor.fieldColor,
        borderRadius: 5,
        padding: 10,
        width: "100%"
    },
    contain: {
        alignItems: "center",
        padding: 20,
        width: "100%"
    },
    item: {
        paddingTop: 15,
        paddingBottom: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: BaseColor.fieldColor
    },
    imageBrand: {
        width: 32,
        height: 32,
        marginRight: 10
    }
  });


export default class SelectHotel extends Component {
    constructor(props) {
        super(props);
        // Temp data define
        this.state = {
            airplane: "",
            flight: [],
            loading: false,
        };
    }

    componentDidMount() {

        // this.setState({ loading_spinner: true }, () => {
        //     AsyncStorage.getItem('config', (error, result) => {
        //         if (result) {   
        //             let config = JSON.parse(result);
        //             var access_token=config.token;
        //             var path=config.common_airport_default.dir;
        //             var url=config.baseUrl;

        //             PostDataNew(url,path,{"param":""})
        //             .then((result) => {
        //                     this.setState({ loading_spinner: false });
        //                     this.setState({flight:result});
        //                     const { navigation } = this.props;
        //                     const selected = navigation.getParam("selected");
                
        //                     if (selected) {
        //                         this.setState({
        //                             flight: this.state.flight.map(item => {
        //                                 return {
        //                                     ...item,
        //                                     checked: item.code == selected
        //                                 };
        //                             })
        //                         });
        //                     }
        //                 },
        //                 (error) => {
        //                     this.setState({ error });
        //                 }
        //             );
            
        //         }
        //     });             

        // });
    }

    onChange(select) {
        const { navigation } = this.props;
        navigation.navigate("HotelDetail",{product:select})
        // this.setState({
        //     flight: this.state.flight.map(item => {
        //         if (item.code == select.code) {
        //             return {
        //                 ...item,
        //                 checked: true
        //             };
        //         } else {
        //             return {
        //                 ...item,
        //                 checked: false
        //             };
        //         }
               
        //     })
        // });

        // const { navigation } = this.props;
        // var type = navigation.getParam("type");
        //     if(type=='from'){
        //                     this.props.navigation.state.params.setBandaraAsal(
        //                         select.code,select.label
        //                         )
        //                     navigation.goBack();
        //     }else if(type=='to'){
           
        //                     this.props.navigation.state.params.setBandaraTujuan(
        //                         select.code,select.label
        //                         )
        //                     navigation.goBack();
        //     }
    }

    search(value){
        if(value.length >= 3){

            AsyncStorage.getItem('config', (error, result) => {
                if (result) {   
                    let config = JSON.parse(result);
                    // // var access_token=config.token;
                    // // var path=config.common_airport.dir;
                    // var url=config.product_hotel_package_by_name.url;

                    // var myHeaders = new Headers();
                    // var raw = "";

                    // var requestOptions = {
                    // method: 'GET',
                    // headers: myHeaders,
                    // body: raw,
                    // redirect: 'follow'
                    // };

                    // fetch(url+value, requestOptions)
                    // .then(response => response.json())
                    // .then(result => {

                    //     //console.log('search',JSON.stringify(result));
                    //     this.setState({flight:result});
                    // })
                    // .catch(error => console.log('error', error));
                    
                    var url=config.baseUrl;
                    var path=config.product_hotel_package.dir;
                    var paramUrl={"param":{
                                "id_country":"",
                                "id_city":"",
                                "id_hotelpackage":"",
                                "detail_category":"",
                                "search":value,
                                "limit":""
                                }}
                            
                    
                    
                    var param={
                        method: 'POST',
                        headers: {
                          Accept: 'application/json',
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(paramUrl),
                      }
                     PostDataNew(url,path,param)
                         .then((result) => {
                            console.log('gethotel',url,path,JSON.stringify(result));
                            this.setState({flight:result});
                         },
                         (error) => {
                             this.setState({ error });
                         }
                    ); 
                }
            }); 
        }else{

            this.setState({flight:[]});
        }
     }

    
    
    

    render() {
        const { navigation } = this.props;
        let { flight, loading, airplane,loading_spinner } = this.state;
        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                {/* <Header
                    title="Airplane"
                    renderLeft={() => {
                        return (
                            <Icon
                                name="arrow-left"
                                size={20}
                                color={BaseColor.blackColor}
                            />
                        );
                    }}
                    // renderRight={() => {
                    //     if (loading) {
                    //         return (
                    //             <ActivityIndicator
                    //                 size="small"
                    //                 color={BaseColor.primaryColor}
                    //             />
                    //         );
                    //     } else {
                    //         return (
                    //             <Text headline primaryColor>
                    //                 Save
                    //             </Text>
                    //         );
                    //     }
                    // }}
                    onPressLeft={() => {
                        navigation.goBack();
                    }}
                    onPressRight={() => this.onSave()}
                /> */}
                <View style={styles.contain}>
                    <TextInput
                        style={BaseStyle.textInput}
                        onChangeText={text => this.search(text)}
                        autoCorrect={false}
                        placeholder="Search Hotel"
                        placeholderTextColor={BaseColor.grayColor}
                        selectionColor={BaseColor.primaryColor}
                        autoFocus
                    />
                    <View style={{ width: "100%", height: "100%" }}>
                        {
                            loading_spinner ? 
                            <Placeholder
                                Animation={Fade}
                                
                            >
                                <View style={{ 
                                            paddingTop: 15,
                                            paddingBottom: 15,
                                            borderBottomWidth: 1,
                                            borderBottomColor: BaseColor.fieldColor}}>
                                    <PlaceholderLine width={100} height={30} style={{marginBottom:0}} />
                                    <PlaceholderLine width={100} height={15} style={{marginTop: 5,marginBottom:0}} />
                                </View>

                                <View style={{ 
                                            paddingTop: 15,
                                            paddingBottom: 15,
                                            borderBottomWidth: 1,
                                            borderBottomColor: BaseColor.fieldColor}}>
                                    <PlaceholderLine width={100} height={30} style={{marginBottom:0}} />
                                    <PlaceholderLine width={100} height={15} style={{marginTop: 5,marginBottom:0}} />
                                </View>

                                <View style={{ 
                                            paddingTop: 15,
                                            paddingBottom: 15,
                                            borderBottomWidth: 1,
                                            borderBottomColor: BaseColor.fieldColor}}>
                                    <PlaceholderLine width={100} height={30} style={{marginBottom:0}} />
                                    <PlaceholderLine width={100} height={15} style={{marginTop: 5,marginBottom:0}} />
                                </View>

                                <View style={{ 
                                            paddingTop: 15,
                                            paddingBottom: 15,
                                            borderBottomWidth: 1,
                                            borderBottomColor: BaseColor.fieldColor}}>
                                    <PlaceholderLine width={100} height={30} style={{marginBottom:0}} />
                                    <PlaceholderLine width={100} height={15} style={{marginTop: 5,marginBottom:0}} />
                                </View>
                            </Placeholder>
                            :
                            <FlatList
                            data={flight}
                            keyExtractor={(item, index) => item.code}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.item}
                                    onPress={() => this.onChange(item)}
                                >
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center"
                                        }}
                                    >
                                        <View style={styles.left}>
                                            <Text headline semibold>
                                            {item.product_name}
                                            </Text>
                                            <Text
                                                note
                                                numberOfLines={1}
                                                footnote
                                                grayColor
                                                style={{
                                                    paddingTop: 5
                                                }}
                                            >
                                                {item.detail_category.replace(/_/gi, ' ')} - {item.city_name}
                                            </Text>
                                        </View>
                                    </View>
                                    {item.checked && 'kanjut' (
                                        <Icon
                                            name="check"
                                            size={14}
                                            color={BaseColor.primaryColor}
                                        />
                                    )}
                                </TouchableOpacity>
                            )}
                            />
                        }
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}
