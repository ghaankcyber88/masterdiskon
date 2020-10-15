import React, { Component } from "react";
import {
    View,
    ScrollView,
    FlatList,
    Animated,
    RefreshControl,
    InteractionManager,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Dimensions,
    Image,
    AsyncStorage
} from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import {
    Header,
    SafeAreaView,
    Icon,
    Text,
    Button,
    RateDetail,
    CommentItem,
    PostListItem,
    HelpBlock,
    StarRating,
    Tag,
    QuantityPicker,
} from "@components";
import { TabView, TabBar } from "react-native-tab-view";
import * as Utils from "@utils";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import SetDate from "../../components/SetDate";
import SetPenumpang from "../../components/SetPenumpang";

import FormOptionQty from "../../components/FormOptionQty";
import NotYetLogin from "../../components/NotYetLogin";

// import styles from "./styles";

// Load sample data
import { HelpBlockData, ReviewData } from "@data";
import HTML from "react-native-render-html";
import Modal from "react-native-modal";
import CalendarPicker from 'react-native-calendar-picker';

const styles = StyleSheet.create({
    imgBanner: {
        width: "100%",
        height: 250,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center"
    },
    contentButtonBottom: {
        borderTopColor: BaseColor.textSecondaryColor,
        borderTopWidth: 1,
        //paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    tabbar: {
        backgroundColor: "white",
        height: 40
    },
    tab: {
        width: 130
    },
    indicator: {
        backgroundColor: BaseColor.primaryColor,
        height: 1
    },
    label: {
        fontWeight: "400"
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    lineInfor: {
        flexDirection: "row",
        borderColor: BaseColor.textSecondaryColor,
        borderBottomWidth: 1,
        paddingVertical: 10
    },
    todoTitle: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 15,
        alignItems: "center"
    },
    itemReason: {
        paddingLeft: 10,
        marginTop: 10,
        flexDirection: "row"
    },

    itemPrice: {
        borderBottomWidth: 1,
        borderColor: BaseColor.textSecondaryColor,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    linePrice: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 5,
    },
    linePriceMinMax: {
        backgroundColor: BaseColor.whiteColor,
        borderRadius: 10
    },
    iconRight: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
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
    },
    contentService: {
        paddingVertical: 10,
        //borderBottomColor: BaseColor.textSecondaryColor,
        //borderBottomWidth: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between"
    },
});


export default class HotelDetail extends Component {
    constructor(props) {
        super(props);
        var product = this.props.navigation.state.params.product;
        //console.log('HotelDetail',JSON.stringify(product));
        var product_type='';
        if(this.props.navigation.state.params && this.props.navigation.state.params.product_type){
            product_type=this.props.navigation.state.params.product_type;
        }else{
            product_type='';
        }
        //console.log('product_type',product_type);

        var minDate = new Date(); // Today
        minDate.setDate(minDate.getDate() + 7);
        var tglAwal=this.convertDate(minDate);


        this.state = {
            heightHeader: Utils.heightHeader(),
            
            product_type:product_type,
            product: product,
            minPerson:1,
            minRoom:1,
            minVoucher:1,
            minPrice:0,
            maksPersonRoom:0,
            sisaPersonRoom:0,
            totalPrice:0,
            modalVisiblePerson: false,
            modalVisibleDate: false,
            dewasa:"2",
            anak:"0",
            bayi:"0",
            selectedStartDate: null,
            tglAwal:tglAwal,
            tglAkhir:'',
            tglAwalNumber:0,
            tglAkhirNumber:0,
            
            listdataPerson:[
                {
                value: 1,
                text: "1 Voucher"
                },
                {
                value: 2,
                text: "2 Voucher"
                },
                {
                value: 3,
                text: "3 Voucher"
                }
            ],
            listdataRoom:[
                {
                    value: 1,
                    text: "1 Room"
                },
                {
                    value: 2,
                    text: "2 Room"
                },
                {
                    value: 3,
                    text: "3 Room"
                },
                {
                    value: 4,
                    text: "4 Room"
                },
                {
                    value: 5,
                    text: "5 Room"
                }
            ],
            
            login:true

        };
        this._deltaY = new Animated.Value(0);
        this.setPrice = this.setPrice.bind(this);
        this.setJumlahDewasa = this.setJumlahDewasa.bind(this);
        this.setJumlahAnak = this.setJumlahAnak.bind(this);
        this.setJumlahBayi = this.setJumlahBayi.bind(this);
        this.setMinPerson = this.setMinPerson.bind(this);
        this.setVoucher = this.setVoucher.bind(this);
        this.setRoom = this.setRoom.bind(this);
        this.setTglAwal = this.setTglAwal.bind(this);
        this.setTglAkhir = this.setTglAkhir.bind(this);
        this.setBookingTime = this.setBookingTime.bind(this);
    }

    setBookingTime(tglAwal, tglAkhir,round) {
        if (round ==true) {
            this.setState({tglAwal:tglAwal});
            this.setState({tglAkhir:tglAkhir});
          
        } else {
            this.setState({tglAwal:tglAwal});
            this.setState({tglAkhir:null});
        }
    }
    
    setTglAwal(dateConversion,dateNumber){
        this.setState({tglAwal:dateConversion});
        this.setState({tglAwalNumber:dateNumber});
    }

    setTglAkhir(dateConversion,dateNumber){
        this.setState({tglAkhir:dateConversion});
        this.setState({tglAkhirNumber:dateNumber});
    }

    setPrice(select){
        var minPerson=this.state.minPerson;
        var maksPersonRoom=parseInt(minPerson)*parseInt(select.guest_per_room);
        var jmlPerson=parseInt(this.state.dewasa)+parseInt(this.state.anak)+parseInt(this.state.bayi);
        var sisaPersonRoom=parseInt(maksPersonRoom)-parseInt(jmlPerson);

        this.setState({maksPersonRoom:maksPersonRoom});
        this.setState({sisaPersonRoom:sisaPersonRoom});

        this.setState({minPersonDef:minPerson});
        this.setState({minPerson:minPerson});
        this.setState({select:select});
    }

    setJumlahDewasa(jml){
            var maksPersonRoom=this.state.maksPersonRoom;
            var jmlPerson=parseInt(jml)+parseInt(this.state.anak)+parseInt(this.state.bayi);
            var sisaPersonRoom=parseInt(maksPersonRoom)-parseInt(jmlPerson);

            this.setState({maksPersonRoom:maksPersonRoom});
            this.setState({jmlPerson:jmlPerson});
            this.setState({sisaPersonRoom:sisaPersonRoom});
            this.setState({dewasa:jml});
    }

    setJumlahAnak(jml){
            var maksPersonRoom=this.state.maksPersonRoom;
            var jmlPerson=parseInt(this.state.dewasa)+parseInt(jml)+parseInt(this.state.bayi);
            var sisaPersonRoom=parseInt(maksPersonRoom)-parseInt(jmlPerson);

            this.setState({maksPersonRoom:maksPersonRoom});
            this.setState({jmlPerson:jmlPerson});
            this.setState({sisaPersonRoom:sisaPersonRoom});
            this.setState({anak:jml});
    }

    setJumlahBayi(jml){
        var maksPersonRoom=this.state.maksPersonRoom;
            var jmlPerson=parseInt(this.state.dewasa)+parseInt(this.state.anak)+parseInt(jml);
            var sisaPersonRoom=parseInt(maksPersonRoom)-parseInt(jmlPerson);
    
            this.setState({maksPersonRoom:maksPersonRoom});
            this.setState({jmlPerson:jmlPerson});
            this.setState({sisaPersonRoom:sisaPersonRoom});
            this.setState({bayi:jml});
    }

    setMinPerson(jml){
        this.setState({minPerson:jml});
    }

    setVoucher(jml){
        this.setState({minVoucher:jml});
        this.setState({dewasa:jml.toString()});
    }

    setRoom(jml){
        this.setState({dewasa:this.state.select.guest_per_room});
        this.setState({anak:"0"});
        this.setState({bayi:"0"});
        setTimeout(() => {
            var maksPersonRoom=parseInt(jml)*parseInt(this.state.select.guest_per_room);
            var jmlPerson=parseInt(this.state.dewasa)+parseInt(this.state.anak)+parseInt(this.state.bayi);
            var sisaPersonRoom=parseInt(maksPersonRoom)-parseInt(jmlPerson);

            this.setState({maksPersonRoom:maksPersonRoom});
            this.setState({sisaPersonRoom:sisaPersonRoom});

            this.setState({minRoom:jml});
            //this.setListdataPerson();
        }, 500);
    }
    
    componentDidMount(){
        const {product}=this.state;
        AsyncStorage.getItem('userSession', (error, result) => {
            if (result) {
                this.setState({login:true});
             }else{
                this.setState({login:false});

             }
        });
        
    }

    
    convertDate(date){

        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = date.getFullYear();

        date = yyyy + '-' + mm + '-' + dd;
        return date;
    }
    
    setDate(date) {
    
        var date = new Date(date);
        var tempoMonth = (date.getMonth()+1);
        var tempoDate = (date.getDate());
        var finaldate="";
        if (tempoMonth < 10) tempoMonth = '0' + tempoMonth;
        if (tempoDate < 10) tempoDate = '0' + tempoDate;
    
        return finaldate = date.getFullYear()  + '-' +  tempoMonth  + '-' +  tempoDate;
    };
    
    onSubmit() {
    
        const {type,product,select} =this.state;
        var tgl_akhir='';

 
          var param = {
            DepartureDate:this.state.tglAwal,
            ReturnDate:tgl_akhir,
            Adults:this.state.dewasa,
            Children:this.state.anak,
            Infants:this.state.bayi,
            }
        
        var productPart={}
        var link='';
        var qty='';
        if(product.detail_category=='pay_now_stay_later'){
            qty=this.state.minVoucher;
        }else{
            qty=this.state.minRoom;

        } 
            link='Summary';
            param.type=this.state.product_type;
            param.cityId=this.state.cityId;
            param.cityText=this.state.cityText;
            param.cityProvince=this.state.cityProvince;
            param.Qty=parseInt(qty);
            param.totalPrice=parseInt(qty)*parseInt(select.price);
            param.participant=false;
            
            this.props.navigation.navigate(link,
                {
                    param:param,
                    product:product,
                    productPart:select
                });
                
    }
    
    content_button(){
        const {product}=this.state;
        const { navigation } = this.props;
        var content=<View></View>
        
        if(product.detail_category=='pay_now_stay_later'){
        content=<View style={[styles.contentButtonBottom]}>
                        <FormOptionQty
                                title={'Quantity'}
                                titleSub={'Anda dapat mengambil 3 voucher dalam sekali transaksi'}
                                listdata={this.state.listdataPerson}
                                setMinPerson={this.setVoucher}
                                selectedText={this.state.minVoucher + ' Voucher'}
                                icon={'user'}
                        />
                        
                        <Button
                            style={{ height: 40,width:'80%'}}
                            onPress={() => {  
                                this.onSubmit();
                               
                            }}
                        >
                            Next
                        </Button>
                    </View>
        }else{
        
            content=<View style={styles.contentButtonBottom}>
                        <View>
                            <SetDate
                                labelTglAwal={this.state.tglAwal}
                                labelTglAkhir={this.state.tglAwal}
                                setBookingTime={this.setBookingTime}
                                tglAwal={this.state.tglAwal}
                                tglAkhir={this.state.tglAkhir}
                                round={false}
                            />
                        </View>
                        
                        <View>
                            <FormOptionQty
                                    title={'Room'}
                                    titleSub={'Maximum 2 tamu/room'}
                                    listdata={this.state.listdataRoom}
                                    setMinPerson={this.setRoom}
                                    selectedText={this.state.minRoom + ' Room'}
                                    icon={'bed'}
                            />
                        </View>

                        <View>
                            <SetPenumpang
                                label={parseInt(this.state.dewasa)+parseInt(this.state.anak)+parseInt(this.state.bayi)}
                                dewasa={this.state.dewasa}
                                anak={this.state.anak}
                                bayi={this.state.bayi}
                                setJumlahDewasa={this.setJumlahDewasa}
                                setJumlahAnak={this.setJumlahAnak}
                                setJumlahBayi={this.setJumlahBayi}
                                minPersonDef={this.state.minPersonDef}
                                minPerson={this.state.minPerson}
                                minPrice={this.state.minPrice}
                                totalPrice={this.state.totalPrice}
                                setMinPerson={this.setMinPerson}
                                maksPersonRoom={this.state.maksPersonRoom}
                                sisaPersonRoom={this.state.sisaPersonRoom}
                                includeBayi={false}
                                type={'hotel_package_room'}

                            />
                        </View>
                        
                        <Button
                            style={{ height: 40}}
                            onPress={() => {  
                                this.onSubmit();
                               
                            }}
                        >
                            Next
                        </Button>
                    </View>
        
        }
        return(
            <View>
                {content}
            </View>
            
        )
    }
   
    convertDateDDMY(date){
        var d = new Date(date);
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var months = ["Jan","Feb","Mar","Ap","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        return days[d.getDay()]+", "+d.getDate()+" "+months[d.getMonth()]+" "+d.getFullYear();
    }

    convertDateDMY(date){
        var d = new Date(date);
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var months = ["Jan","Feb","Mar","Ap","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        return d.getDate()+" "+months[d.getMonth()]+" "+d.getFullYear();
    }

    convertDateDM(date){
        var d = new Date(date);
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var months = ["Jan","Feb","Mar","Ap","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        return d.getDate()+" "+months[d.getMonth()];
    }


    render() {
        const { navigation } = this.props;
        const { title, heightHeader, service, product,product_type,minPerson,minPrice,totalPrice,login} = this.state;
        const heightImageBanner = Utils.scaleWithPixel(250, 1);
        const marginTopBanner = heightImageBanner - heightHeader;
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

        const { modalVisiblePerson,modalVisibleDate} = this.state;

        var content=<View></View>
        if(product_type=='hotelpackage'){
            content=<View>
                        <View
                            style={[
                                {
                                    flexDirection: "row",
                                    paddingHorizontal: 20,
                                    marginBottom: 10,
                                    paddingTop: 10
                                },
                                { marginTop: marginTopBanner }
                            ]}
                        >
                            <Tag
                                primary
                                style={{ marginRight: 15 }}
                            >
                                 {/* {product.detail_category} */}
                                {(product.detail_category.replace(/_/gi, ' ')).toUpperCase()}
                            </Tag>
                        </View>

                        
                        <View
                            style={[
                                { paddingHorizontal: 20, paddingTop: 0 },
                            ]}
                        >
                            <Text
                                header
                                style={{ marginBottom: 10 }}
                            >
                                {product.product_name}
                            </Text>
                        </View>
                        

                        <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 20 }}>
                            <StarRating
                                    disabled={true}
                                    starSize={14}
                                    maxStars={5}
                                    rating={5}
                                    selectedStar={rating => {}}
                                    fullStarColor={BaseColor.yellowColor}
                                />
                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingBottom: 20 }}>
                            <Icon
                                name="map-marker-alt"
                                color={BaseColor.lightPrimaryColor}
                                size={10}
                            />
                            <Text
                                caption1
                                style={{ marginLeft: 10 }}
                                numberOfLines={1}
                            >
                                {product.product_detail.address}, {product.product_detail.capital}
                            </Text>
                        </View>

                        <Paket
                            product={this.state.product}
                            setMinPerson={this.setMinPerson}
                            setPrice={this.setPrice}
                            productType={this.state.product_type}
                        />
                        <Informasi
                            data={'Biaya penambahan orang dalam kamar mungkin berlaku dan berbeda-beda menurut kebijakan properti.Tanda pengenal berfoto yang dikeluarkan oleh pemerintah dan kartu kredit, kartu debit, dan deposit uang tunai diperlukan saat check-in untuk biaya tidak terduga.Pemenuhan permintaan khusus bergantung pada ketersediaan sewaktu check-in dan mungkin menimbulkan biaya tambahan. Permintaan khusus tidak dijamin akan terpenuhi.'}
                        />

                        <Informasi
                            data={this.state.product.product_detail.exclude}
                        />

                        <Informasi
                            data={this.state.product.product_detail.term}
                        />
                    </View>

        }else if(product_type=='activities'){
            content=<View>
                        <View
                            style={[
                                {
                                    flexDirection: "row",
                                    paddingHorizontal: 20,
                                    marginBottom: 10,
                                    paddingTop: 10
                                },
                                { marginTop: marginTopBanner }
                            ]}
                        >
                            <Tag
                                primary
                                style={{ marginRight: 15 }}
                            >
                                {(product.product_detail.term.replace(/_/gi, ' ')).toUpperCase()}

                            </Tag>
                        </View>

                        
                        <View
                            style={[
                                { paddingHorizontal: 20, paddingTop: 0 },
                            ]}
                        >
                            <Text
                                header
                                style={{ marginBottom: 10 }}
                            >
                                {product.product_name}
                            </Text>
                        </View>
                        

                        <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 20 }}>
                            <StarRating
                                    disabled={true}
                                    starSize={14}
                                    maxStars={5}
                                    rating={5}
                                    selectedStar={rating => {}}
                                    fullStarColor={BaseColor.yellowColor}
                                />
                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingBottom: 0 }}>
                            <Icon
                                name="map-marker-alt"
                                color={BaseColor.lightPrimaryColor}
                                size={10}
                            />
                            <Text
                                caption1
                                style={{ marginLeft: 10 }}
                                numberOfLines={1}
                            >
                                {product.product_detail.address}, {product.product_detail.capital}
                            </Text>
                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingBottom: 0 }}>
                            <Icon
                                name="clock"
                                color={BaseColor.lightPrimaryColor}
                                size={10}
                            />
                            <Text
                                caption1
                                style={{ marginLeft: 10 }}
                                numberOfLines={1}
                            >
                                Periode Pemesanan s/d {this.convertDateDMY(product.product_detail.end_date)}
                            </Text>
                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingBottom: 0 }}>
                            <Icon
                                name="clock"
                                color={BaseColor.lightPrimaryColor}
                                size={10}
                            />
                            <Text
                                caption1
                                style={{ marginLeft: 10 }}
                                numberOfLines={1}
                            >
                                Live {this.convertDateDMY(product.product_detail.valid_start)}
                            </Text>
                        </View>

                        <Paket
                            product={this.state.product}
                            setMinPerson={this.setMinPerson}
                            setPrice={this.setPrice}
                            productType={this.state.product_type}
                        />
                        
                    </View>

        }
        

        return (
            <View style={{ flex: 1 }}>
                <Animated.View
                    style={[
                        styles.imgBanner,
                        {
                            height: this._deltaY.interpolate({
                                inputRange: [
                                    0,
                                    Utils.scaleWithPixel(150),
                                    Utils.scaleWithPixel(150)
                                ],
                                outputRange: [
                                    heightImageBanner,
                                    heightHeader,
                                    heightHeader
                                ]
                            })
                        }
                    ]}
                >
                    <Image
                        source={{ uri: product.img_featured_url }}
                        style={{ width: "100%", height: "100%" }}
                        resizeMode="cover"
                    />
                  
                </Animated.View>
                <SafeAreaView
                    style={BaseStyle.safeAreaView}
                    forceInset={{ top: "always" }}
                >
                    <Header
                        title=""
                        transparent={true}
                        
                    />
                    {
                    login ?
                    <ScrollView
                        onScroll={Animated.event([
                            {
                                nativeEvent: {
                                    contentOffset: { y: this._deltaY }
                                }
                            }
                        ])}
                        onContentSizeChange={() =>
                            this.setState({
                                heightHeader: Utils.heightHeader()
                            })
                        }
                        scrollEventThrottle={8}
                    >
                        {content}


                    </ScrollView>
                    :
                    <NotYetLogin redirect={'Home'} param={this.state.product} navigation={navigation} />
                    
        }
                   {this.content_button()}
                    
                </SafeAreaView>
            </View>
        );
    }
}

class Paket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product_option:props.product.product_option,
            product_type:props.productType
        };
    }

    componentDidMount() {
        const { navigation, product } = this.props;
        const { product_option } =this.state;
        
        
                if (product_option.length != 0) {
                    var select=product.product_option[0];
                    this.props.setPrice(select);
                    const selected = select.id_product_option;
                    if (selected) {
                        this.setState({
                            product_option: this.state.product_option.map(item => {
                                return {
                                    ...item,
                                    checked: item.id_product_option == selected
                                };
                            })
                        });
                    }
                }
    }
    
    onChange(select) {
        const { navigation, product,setMinPerson,setListdataPerson} = this.props;
        this.setState({
            product_option: this.state.product_option.map(item => {
                if (item.id_product_option == select.id_product_option) {
                    return {
                        ...item,
                        checked: true
                    };
                } else {
                    return {
                        ...item,
                        checked: false
                    };
                }
               
            })
        });
        
        this.props.setPrice(select);
    }


    render() {
        const { renderMapView, todo, helpBlock,product_option,product_type} = this.state;
        const { navigation} = this.props;
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

        var content=<View></View>
        if (product_option.length == 0) {
            content=<View
                        style={{
                                // flexDirection: 'column',
                                // justifyContent: 'center',
                                alignItems: 'center',
                                height: '100%',padding: 20
                            }}
                        >       
                        <Image
                            source={Images.empty}
                            style={{ width: "40%", height: "40%" }}
                            resizeMode="cover"
                        />
                        </View>
        }else{
            if(product_type=='hotelpackage'){
                content=<FlatList
                data={product_option}
                keyExtractor={(item, index) => item.id_product_option}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        // style={styles.item}
                        onPress={() => 
                        {
                        this.onChange(item)
                        }
                        
                        }
                    >
                        <View style={[styles.itemPrice, { backgroundColor: BaseColor.secondColor == BaseColor.whiteColor ? item.checked : null}]}>
                                <View style={styles.linePrice}>
                                    <Text headline semibold>
                                        {item.detail_name}
                                    </Text>
                                    
                                    {item.checked && (
                                        <View style={styles.iconRight}>
                                        <Icon
                                            name="check"
                                            size={24}
                                            color={'green'}
                                            />
                                        </View>
                                    )}
                                    
                                </View>
            
                                <View style={styles.linePriceMinMax}>
                                    <View style={styles.contentService}>
                                        {[
                                            { key: "1", name: "clock",label:item.duration+ 'night' },
                                            { key: "2", name: "user",label:item.guest_per_room+' guest' },
                                            { key: "3", name: "crop",label:item.room_size+' m2' },
                                            { key: "4", name: "bed",label:item.bed_type},
                                            { key: "5", name: "bath",label:'shower' }
                                        ].map((item, index) => (
                                            <View
                                                style={{ alignItems: "center" }}
                                                key={"service" + index}
                                            >
                                                <Icon
                                                    name={item.name}
                                                    size={24}
                                                    color={BaseColor.primaryColor}
                                                />
                                                <Text
                                                    overline
                                                    grayColor
                                                    style={{ marginTop: 4 }}
                                                >
                                                    {item.label}
                                                </Text>
                                            </View>
                                        ))}
                                    </View>
                                    <View style={styles.linePrice}>
                                        {/* <Text primaryColor semibold>
                                            Minimum: 2
                                        </Text> */}
                                        <View style={styles.iconRight}>
                                            <Text title2 style={{color:BaseColor.primaryColor}}>
                                                Rp {priceSplitter(item.price)}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                    </TouchableOpacity>
                )}
            />

            }else{

                content=<FlatList
                data={product_option}
                keyExtractor={(item, index) => item.id_product_option}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        // style={styles.item}
                        onPress={() => 
                        {
                        this.onChange(item)
                        }
                        
                        }
                    >
                        <View style={[styles.itemPrice, { backgroundColor: BaseColor.secondColor == BaseColor.whiteColor ? item.checked : null}]}>
                                <View style={styles.linePrice}>
                                    <Text headline semibold>
                                        {item.detail_name}
                                    </Text>
                                    
                                    {item.checked && (
                                        <View style={styles.iconRight}>
                                        <Icon
                                            name="check"
                                            size={24}
                                            color={'green'}
                                            />
                                        </View>
                                    )}
                                    
                                </View>
                                <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
                                    <HTML
                                    html={item.description}
                                    imagesMaxWidth={Dimensions.get("window").width}
                                    />
                                </View>
                                
                            </View>
                    </TouchableOpacity>
                )}
            />


            }



        }

        return (
            <View style={{}}>
                {content}
            </View>
        );
    }
}

class Informasi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:props.data  
        };
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({ renderMapView: true });
        });
    }

    render() {
        const {data} = this.state;
        const { navigation,product } = this.props;
        // var informasi='Biaya penambahan orang dalam kamar mungkin berlaku dan berbeda-beda menurut kebijakan properti.Tanda pengenal berfoto yang dikeluarkan oleh pemerintah dan kartu kredit, kartu debit, dan deposit uang tunai diperlukan saat check-in untuk biaya tidak terduga.Pemenuhan permintaan khusus bergantung pada ketersediaan sewaktu check-in dan mungkin menimbulkan biaya tambahan. Permintaan khusus tidak dijamin akan terpenuhi.';
        
        return (
            <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
                <HTML
                  html={data}
                  imagesMaxWidth={Dimensions.get("window").width}
                />
            </View>
        );
    }
}



