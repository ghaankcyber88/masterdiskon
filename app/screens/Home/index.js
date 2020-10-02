import React, { Component } from "react";
import {
    View,
    ScrollView,
    Animated,
    TouchableOpacity,
    FlatList,
    StatusBar,
    StyleSheet
} from "react-native";
import {
    Text,
    SafeAreaView,
    Header,
    Image,
    Icon,
    Tag,
    FormOption,
    QuantityPicker,
    Button
} from "@components";
import { BaseStyle, BaseColor, Images } from "@config";
import * as Utils from "@utils";
import styles from "./styles";
import {AsyncStorage} from 'react-native';

import {PostDataNew} from '../../services/PostDataNew';
import CardCustom from "../../components/CardCustom";
import FlightPlanCustom from "../../components/FlightPlanCustom";
import HotelPlanCustom from "../../components/HotelPlanCustom";
import CardCustomTitle from "../../components/CardCustomTitle";
import NotYetLogin from "../../components/NotYetLogin";
import SetDateLong from "../../components/SetDateLong";
import SetPenumpangLong from "../../components/SetPenumpangLong";



import {DataLoading,DataConfig,DataTrip,DataHotelPackage,DataIcon,DataHotelPackageCity} from "@data";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
  } from "react-native-responsive-screen";

export default class Home extends Component {
    
    constructor(props) {
        super(props);
        
        
        //Start Set Variabel Search
        var type='flight';
        
        var tglAwal=this.getDate(0);
        var tglAkhir=this.getDate(1);
        
        var round='';
        var title='';
        if(type=='flight'){
            round=false;
            title='Search Flight';
        }else if(type=='hotel'){
            round=true;
            title='Search Hotel Package';
        }else if(type=='trip'){
            round=true;
            title='Set Tour';
        }
        //End Set Variabel Search
        
        
        this.state = {
            login:false,
            icons: [{
                icon: "plane",
                name: "Flight",
                route: "FlightSearch",
                iconAnimation:"flight.json",
                type:'flight',
                image: Images.flight,
                checked: true
            },
            {
                icon: "calendar-alt",
                name: "Hotel",
                route: "Hotel",
                iconAnimation:"hotel.json",
                type:'hotel',
                image: Images.hotel
            },
            {
                icon: "map-marker-alt",
                name: "Trip",
                route: "Tour",
                iconAnimation:"tour.json",
                type:'trip',
                image: Images.trip
            }],
            heightHeader: Utils.heightHeader(),
            listdata_promo:DataLoading,
            listdata_musium:DataLoading,
            listdata_culture:DataLoading,
            listdata_product_trip_country:DataLoading,
            listdata_product_trip:DataTrip,
            listdata_product_hotel_package:DataHotelPackage,
            listdata_product_hotel_package_city:DataHotelPackageCity,
            listdata_product_flash:DataLoading,
            config:DataConfig,
            
            
            
            //Start Parameter Search-----------------------//
            //parameter flight//
            type:type,
            
            bandaraAsalCode:'CGK',
            bandaraAsalLabel:'Soekarno Hatta',
            bandaraTujuanCode:'DPS',
            bandaraTujuanLabel:'Denpasar',
            bandaraAsalIdCountry:'193',
            
            kelas:'Economy Class',
            kelasId:'E',

            listdata_kelas:[{
                value: "E",
                text: "Economy Class"
            },
            {
                value: "S",
                text: "Premium Economy"
            },
            {
                value: "B",
                text: "Business Class"
            },
            {
                value: "F",
                text: "First Class"
            }],
            
            //parameter hotel
            cityId:'5171',
            cityText:'Denpasar',
            cityProvince:'Bali',
            qty:1,
            
            round: round,
            dewasa:"1",
            anak:"0",
            bayi:"0",
            tglAwal:tglAwal,
            tglAkhir:tglAkhir,
            jumlahPerson:1
            //End Parameter Search-----------------------//
            
        };
        this._deltaY = new Animated.Value(0);
        this.getConfig();
        this.getSession();
        
        //Start Function Bind Search-----------------------//
        this.setBandaraAsal = this.setBandaraAsal.bind(this);
        this.setBandaraTujuan = this.setBandaraTujuan.bind(this);
        this.setKelasPesawat = this.setKelasPesawat.bind(this);
        this.setTglAwal = this.setTglAwal.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.setJumlahDewasa = this.setJumlahDewasa.bind(this);
        this.setJumlahAnak = this.setJumlahAnak.bind(this);
        this.setJumlahBayi = this.setJumlahBayi.bind(this);
        this.setJumlahPerson = this.setJumlahPerson.bind(this);
        this.setBookingTime = this.setBookingTime.bind(this);
        this.setCity = this.setCity.bind(this);
        this.setqty=this.setqty.bind(this);
        this.setCatHotel = this.setCatHotel.bind(this);
        this.setCityHotel = this.setCityHotel.bind(this);
        //End Function Bind Search-----------------------//

    }
    
    //memanggil config
    getConfig(){
            AsyncStorage.getItem('config', (error, result) => {
                if (result) {    
                    let config = JSON.parse(result);
                    this.setState({config:config});
                }
            });
    }

    //memanggil session
    getSession(){    
        AsyncStorage.getItem('userSession', (error, result) => {
            if (result) {    
                let userSession = JSON.parse(result);
                var id_user=userSession.id_user;
                this.setState({id_user:id_user});
                this.setState({userSession:userSession});
                this.setState({login:true});
            }
        });
    }
    
    //Start Function  Search-----------------------//
    //-----function untuk hotel-----//
    setCity(id,city,province) {
        this.setState({cityId:id});
        this.setState({cityText:city});
        this.setState({cityProvince:province});
    }

    setqty(jml){
        //console.log(jml);
        this.setState({qty:jml});
    }
    //-----function untuk hotel-----//
    
    setBookingTime(tglAwal, tglAkhir,round) {
        if (round ==true) {
            this.setState({tglAwal:tglAwal});
            this.setState({tglAkhir:tglAkhir});
          
        } else {
            this.setState({tglAwal:tglAwal});
            this.setState({tglAkhir:null});
        }
    }
  
    getDate(num){
        var MyDate = new Date();
        var MyDateString = '';
        MyDate.setDate(MyDate.getDate());
        var tempoMonth = (MyDate.getMonth()+1);
        var tempoDate = (MyDate.getDate()+num);
        if (tempoMonth < 10) tempoMonth = '0' + tempoMonth;
        if (tempoDate < 10) tempoDate = '0' + tempoDate;

        return MyDate.getFullYear()  + '-' +  tempoMonth  + '-' +  tempoDate;

    }

    onSetFlightType(round) {
        this.setState({
            round: round
        });
    }

    convertDate(date){
        var d = new Date(date);
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        return days[d.getDay()]+", "+d.getDate()+" "+months[d.getMonth()]+" "+d.getFullYear();
    }

    onSelectFlight(type) {
        const { navigation } = this.props;
        const { from, to } = this.state;
        switch (type) {
            case "to":
                navigation.navigate("SelectFlight", {
                    selected: this.state.bandaraTujuanCode,
                    setBandaraTujuan: this.setBandaraTujuan,
                    type:type
                });
                break;
            case "from":
                navigation.navigate("SelectFlight", {
                    selected: this.state.bandaraAsalCode,
                    setBandaraAsal: this.setBandaraAsal,
                    type:type
                });
                break;
            default:
                break;
        }
    }

    onSelectHotel(type) {
        const { navigation } = this.props;
        const { from, to } = this.state;

        navigation.navigate("SelectHotel", {});
        
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
    
    setDateLocal(date) {
        if(date!=""){
            var date = new Date(date);
            var tempoMonth = (date.getMonth()+1);
            var tempoDate = (date.getDate());
            return finaldate = tempoDate+'/'+tempoMonth+'/'+date.getFullYear();
        }else{
            return "Set Tanggal"
        }
    };
    
    
    onSubmit() {
            const {type,product,productPart} =this.state;
          var tgl_akhir='';
          if(this.state.round==true){
            tgl_akhir=this.state.tglAkhir;
          }
    
     
          var param = {
            DepartureDate:this.state.tglAwal,
            ReturnDate:tgl_akhir,
            Adults:this.state.dewasa,
            Children:this.state.anak,
            Infants:this.state.bayi,
            }
            
            var link='';
            
            if(type=='flight'){
                link='FlightResult';
                param.Origin=this.state.bandaraAsalCode;
                param.Destination=this.state.bandaraTujuanCode;
                param.IsReturn=this.state.round;
                param.CabinClass=[this.state.kelasId];
                param.CorporateCode="";
                param.Subclasses=false;
                param.Airlines= [];
                param.type='flight';
                param.bandaraAsalLabel=this.state.bandaraAsalLabel;
                param.bandaraTujuanLabel=this.state.bandaraTujuanLabel;
                param.Qty=parseInt(param.Adults)+parseInt(param.Children)+parseInt(param.Infants);
                param.participant=true;

                //console.log('typeFlight',JSON.stringify(param));
                
                this.props.navigation.navigate(link,
                {
                    param:param,
                });
                
            }else if(type=='hotelpackage'){
                link='Summary';
                param.type='hotelpackage';
                param.cityId=this.state.cityId;
                param.cityText=this.state.cityText;
                param.cityProvince=this.state.cityProvince;
                param.Qty=this.state.qty;
                param.totalPrice=parseInt(this.state.qty)*parseInt(productPart.price);
                param.participant=true;
                
                //console.log('paramHotel',JSON.stringify(param));
                //console.log('productHotel',JSON.stringify(product));
                //console.log('productPartHotel',JSON.stringify(productPart));
            
            
                this.props.navigation.navigate(link,
                    {
                        param:param,
                        product:product,
                        productPart:productPart
                    });
            }else if(type=='trip'){
                link='Summary';
                param.type='trip';
                param.cityId=this.state.cityId;
                param.cityText=this.state.cityText;
                param.cityProvince=this.state.cityProvince;
                param.Qty=this.state.qty;
                param.participant=true;
                
                this.props.navigation.navigate(link,
                    {
                                        param:param,product:product
                    });
            }
    }
    
    setBandaraAsal(code='',label='',id_country=''){
        this.setState({bandaraAsalCode: code});
        this.setState({bandaraAsalLabel: label});
        this.setState({bandaraAsalIdCountry:id_country});
    
    }
    
    setBandaraTujuan(code='',label=''){
        this.setState({bandaraTujuanCode: code});
        this.setState({bandaraTujuanLabel: label});
    }
    

    setJumlahDewasa(jml){
          this.setState({dewasa:jml});
            setTimeout(() => {
                    this.setJumlahPerson();
            }, 200);
    }

    setJumlahAnak(jml){
        this.setState({anak:jml});
        setTimeout(() => {
            this.setJumlahPerson();
    }, 200);
    }

    setJumlahBayi(jml){
        this.setState({bayi:jml});
        setTimeout(() => {
            this.setJumlahPerson();
    }, 200);
    }
    
    setJumlahPerson(){
        var jumlahPerson=parseInt(this.state.dewasa)+parseInt(this.state.anak)+parseInt(this.state.bayi);
        this.setState({jumlahPerson:jumlahPerson});
    }
  
    
    setKelasPesawat(kelas,kelasId){
        this.setState({kelas:kelas});
        this.setState({kelasId:kelasId});
    }

    setCatHotel(text,value){
        const { navigation } = this.props;
        this.setState({catHotel:text });
        this.setState({catHotelId:value});
        navigation.navigate("Hotel",{detail_category:value});
    }

    setCityHotel(text,value){
        const { navigation } = this.props;
        this.setState({hotel_package_city:text });
        this.setState({hotel_package_city_id:value});
        navigation.navigate("Hotel",{id_city:value});
    }
    
    setTglAwal(tgl){
        this.setState({tglAwal:tgl});
    }
    
    setTglAkhir(tgl){
       this.setState({tglAkhir:tgl});
    }
    
    renderContentSearch() {
        var type=this.state.type;
        var title='';
        var content=<View></View>
        var contentTitle=<View></View>
        var contentButton=<Button
                            full
                            style={{height:40}}
                            onPress={() => {  
                                this.onSubmit();
                            
                            }}
                        >
                            Search
                        </Button>
        if(type=="flight"){
            content=this.renderContentSearchFlight();
            title='Pencarian Tiket Pesawat';
        }else if(type=="hotel"){
            content=this.renderContentSearchHotel();
            contentButton=<View></View>
            title='Pencarian Hotel';
        }else if(type=="trip"){
            content=this.renderContentSearchTour();
            contentButton=<View></View>
            title='Pencarian Trip';
        }

        contentTitle=<View><Text body2 bold>{title}</Text></View>
        return (
            <View style={{ flex: 1 }}>
                {contentTitle}
                {content}
                {contentButton}
            </View>
        );
    }
    
    renderContentSearchFlight(){
        const { round, from, to, loading,login  } = this.state;
        const { navigation } = this.props;
        var content=<View>
            <View style={styles.flightType}>
                <Tag
                    outline={!round}
                    primary={round}
                    round
                    onPress={() => this.onSetFlightType(true)}
                    style={{ marginRight: 20 }}
                >
                    Round Trip
                </Tag>
                <Tag
                    outline={round}
                    primary={!round}
                    round
                    onPress={() => this.onSetFlightType(false)}
                >
                    One Way
                </Tag>
            </View>
            <FlightPlanCustom
                round={round}
                fromCode={this.state.bandaraAsalCode}
                toCode={this.state.bandaraTujuanCode}
                from={this.state.bandaraAsalLabel}
                to={this.state.bandaraTujuanLabel}
                style={{}}
                onPressFrom={() => this.onSelectFlight("from")}
                onPressTo={() => this.onSelectFlight("to")}
            />

            <SetDateLong
                    labelTglAwal={'asd'}
                    labelTglAkhir={'asdds'}
                    setBookingTime={this.setBookingTime}
                    tglAwal={this.state.tglAwal}
                    tglAkhir={this.state.tglAkhir}
                    round={this.state.round}
                    icon={'calendar'}
            />

            <FormOption
                style={{}} 
                label={'Seat Class'}
                option={this.state.listdata_kelas}
                optionSet={this.setKelasPesawat}
                optionSelectText={this.state.kelas}
                optionSelectValue={this.state.kelasId}
                icon={'crown'}
            />
            
            <SetPenumpangLong
                    label={this.state.jumlahPerson}
                    dewasa={this.state.dewasa}
                    anak={this.state.anak}
                    bayi={this.state.bayi}
                    setJumlahDewasa={this.setJumlahDewasa}
                    setJumlahAnak={this.setJumlahAnak}
                    setJumlahBayi={this.setJumlahBayi}
                    // setMinPerson={}
                    minPersonDef={1}
                    minPerson={1}
                    // minPrice={this.state.minPrice}
                    // totalPrice={this.state.totalPrice}
                />
        </View>
        
        return (
            <View style={{ flex: 1 }}>
                {content}
            </View>
        );
        
    }

    renderContentSearchHotel(){
        const { round, from, to, loading,login  } = this.state;
        const { navigation } = this.props;
        var content=<View>
            <FormOption
                style={{}} 
                label={'Berdasarkan Kategori'}
                option={this.state.listdata_category_hotel_package}
                optionSet={this.setCatHotel}
                optionSelectText={'Pilih Kategori'}
                optionSelectValue={''}
                icon={'crown'}
            />

            <FormOption
                style={{}} 
                label={'Berdasarkan Kota'}
                option={this.state.listdata_product_hotel_package_city}
                optionSet={this.setCityHotel}
                optionSelectText={'Pilih Kota'}
                optionSelectValue={''}
                icon={'map-marker-alt'}
            />

            <HotelPlanCustom
                to={'Klik disini untuk mencari hotel'}
                onPressTo={() => this.onSelectHotel("to")}
            />


        </View>
        
        return (
            <View style={{ flex: 1 }}>
                {content}
            </View>
        );
        
    }

    renderContentSearchTour(){
        const { round, from, to, loading,login  } = this.state;
        const { navigation } = this.props;
        var content=<View>
            <View style={styles.flightType}>
                <Tag
                    outline={!round}
                    primary={round}
                    round
                    onPress={() => this.onSetFlightType(true)}
                    style={{ marginRight: 20 }}
                >
                    Round Trip
                </Tag>
                <Tag
                    outline={round}
                    primary={!round}
                    round
                    onPress={() => this.onSetFlightType(false)}
                >
                    One Way
                </Tag>
            </View>
            <FlightPlanCustom
                round={round}
                fromCode={this.state.bandaraAsalCode}
                toCode={this.state.bandaraTujuanCode}
                from={this.state.bandaraAsalLabel}
                to={this.state.bandaraTujuanLabel}
                style={{}}
                onPressFrom={() => this.onSelectFlight("from")}
                onPressTo={() => this.onSelectFlight("to")}
            />

            <SetDateLong
                    labelTglAwal={'asd'}
                    labelTglAkhir={'asdds'}
                    setBookingTime={this.setBookingTime}
                    tglAwal={this.state.tglAwal}
                    tglAkhir={this.state.tglAkhir}
                    round={this.state.round}
                    icon={'calendar'}
            />

            <FormOption
                style={{}} 
                label={'Seat Class'}
                option={this.state.listdata_kelas}
                optionSet={this.setKelasPesawat}
                optionSelectText={this.state.kelas}
                optionSelectValue={this.state.kelasId}
                icon={'crown'}
            />
            
            <SetPenumpangLong
                    label={this.state.jumlahPerson}
                    dewasa={this.state.dewasa}
                    anak={this.state.anak}
                    bayi={this.state.bayi}
                    setJumlahDewasa={this.setJumlahDewasa}
                    setJumlahAnak={this.setJumlahAnak}
                    setJumlahBayi={this.setJumlahBayi}
                    // setMinPerson={}
                    minPersonDef={1}
                    minPerson={1}
                    // minPrice={this.state.minPrice}
                    // totalPrice={this.state.totalPrice}
                />
        </View>
        
        return (
            <View style={{ flex: 1 }}>
                {content}
            </View>
        );
        
    }

    onSelectProduct(select) {
        
        this.setState({
            icons: this.state.icons.map(item => {
                if (item.name == select.name) {
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
        
        this.setState({type:select.type});
        // setTimeout(() => {
        //     this.fetch();
        // }, 200);
        
    }
   
    //End Function Search-----------------------//
    getProductTripCountry(){
        const {config} =this.state;
        var url=config.baseUrl;
        var path=config.common_country.dir;
        this.setState({ loading_product_trip_country: true }, () => {
            var param={
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(),
              }
             PostDataNew(url,path,param)
                 .then((result) => {
                    this.setState({loading_product_trip_country: false });
                    this.setState({listdata_product_trip_country: result});
                 },
                 (error) => {
                     this.setState({ error });
                 }
            ); 
        });
    }
    
    getProductTrip(){
        const {config} =this.state;
        var url=config.baseUrl;
        var path=config.product_trip.dir;
        this.setState({ loading_product_trip: true }, () => {
            var param={
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(),
              }
             PostDataNew(url,path,param)
                 .then((result) => {
                    //console.log('listdata_product_trip',JSON.stringify(result));
                    this.setState({loading_product_trip: false });
                    this.setState({listdata_product_trip: result});
                 },
                 (error) => {
                     this.setState({ error });
                 }
            ); 
        });
    }
    
    getProductVoucher(){
        const {config} =this.state;
        var url=config.baseUrl;
        var path=config.url_md.product.product_voucher;
        this.setState({ loading_product_voucher: true }, () => {
            var param={
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(),
              }
             PostDataNew(url,path,param)
                 .then((result) => {
                    this.setState({loading_product_voucher: false });
                    this.setState({listdata_product_voucher: result});
                 },
                 (error) => {
                     this.setState({ error });
                 }
            ); 
        });
    }
    
    getProductHotelPackage(){
        const {config} =this.state;
        
            
        this.setState({ loading_product_hotel_package: true }, () => {
            var url=config.baseUrl;
            var path=config.product_hotel_package.dir;
            var paramUrl={"param":{
                "id_country":"",
                "id_city":"",
                "id_hotelpackage":"",
                "detail_category":"",
                "search":"",
                "limit":"12"
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
                    //console.log('listdata_product_hotel_package',JSON.stringify(result));
                    this.setState({loading_product_hotel_package: false });
                    this.setState({listdata_product_hotel_package: result});
                 },
                 (error) => {
                     this.setState({ error });
                 }
            ); 
        });
    }

    getProductHotelPackageCity(){
        const {config} =this.state;
        var url=config.baseUrl;
        var path=config.common_city_hotel_package.dir;
        this.setState({ loading_product_hotel_package_city: true }, () => {
            var param={
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(),
              }
             PostDataNew(url,path,param)
                 .then((result) => {
                    //console.log('getProductHotelPackageCity',JSON.stringify(result));
                    this.setState({loading_product_hotel_package_city: false });
                    this.setState({listdata_product_hotel_package_city: result});
                    this.setState({hotel_package_city:result[0].text});
                    this.setState({hotel_package_city_id:result[0].value});

                 },
                 (error) => {
                     this.setState({ error });
                 }
            ); 
        });
    }
    
    getProductHotelPackageCategory(){
        const {config} =this.state;
        var url=config.baseUrl;
        var path=config.common_category_hotel_package.dir;
        this.setState({ loading_category_hotel_package: true }, () => {
            var param={
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(),
              }
             PostDataNew(url,path,param)
                 .then((result) => {
                    //console.log('category_hotel_package',JSON.stringify(result));
                    this.setState({loading_category_hotel_package: false });
                    this.setState({listdata_category_hotel_package: result});
                    this.setState({catHotel:result[0].text});
                    this.setState({catHotelId:result[0].value});
                },
                 (error) => {
                     this.setState({ error });
                 }
            ); 
        });
    }

    getProductFlash(){
        const {config} =this.state;
        var url=config.baseUrl;
        var path=config.product_flash.dir;
        this.setState({ loading_product_flash: true }, () => {
            var param={
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(),
              }
             PostDataNew(url,path,param)
                 .then((result) => {
                    ////console.log('getProductFlash',JSON.stringify(result));
                    this.setState({loading_product_flash: false });
                    this.setState({listdata_product_flash: result.daftar});
                 },
                 (error) => {
                     this.setState({ error });
                 }
            ); 
        });
    }
    
    getMusium(){
        const {config} =this.state;
        var url=config.baseUrl;
        var path=config.common_musium.dir;
        this.setState({ loading_musium: true }, () => {
            var param={
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(),
              }
           
             PostDataNew(url,path,param)
                 .then((result) => {
                    this.setState({loading_musium: false });
                    this.setState({listdata_musium: result});
                 },
                 (error) => {
                     this.setState({ error });
                 }
            ); 
        });
    }
    
    getBlog(){
        const {config} =this.state;
        var url=config.baseUrl;
        var path=config.url_md.common.blog;
        this.setState({ loading_blog: true }, () => {
            var param={
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(),
              }
           
             PostDataNew(url,path,param)
                 .then((result) => {
                    config.log('blog',JSON.stringify(result));
                    this.setState({loading_blog: false });
                    this.setState({listdata_blog: result});
                 },
                 (error) => {
                     this.setState({ error });
                 }
            ); 
        });
    }

    getculture(){
        const {config} =this.state;
        var url=config.baseUrl;
        var path=config.common_culture.dir;
        this.setState({ loading_culture: true }, () => {
            var param={
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(),
              }
           
             PostDataNew(url,path,param)
                 .then((result) => {
                    this.setState({loading_culture: false });
                    this.setState({listdata_culture: result});
                 },
                 (error) => {
                     this.setState({ error });
                 }
            ); 
        });
    }
    
    componentDidMount() {
        //membuat bar transparant
        // StatusBar.setBackgroundColor("rgba(0,0,0,0)");
        // StatusBar.setTranslucent(true);
        
        setTimeout(() => {
            // this.getMusium();
            // this.getculture();
            this.getProductTripCountry();
            this.getProductTrip();
            this.getProductHotelPackage();
            this.getProductHotelPackageCity();
            this.getProductHotelPackageCategory();
            this.getProductFlash();
            //this.getBlog();
        }, 500);

     }
     
    //fungsi untuk menampilkan icon
    renderIconService() {
        const { navigation } = this.props;
        const { icons} = this.state;
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));


        return (
            <FlatList
                data={icons}
                numColumns={4}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            style={styles.itemService}
                            activeOpacity={0.9}
                            onPress={() => {
                                
                                if(item.type != 'trip'){
                                    this.onSelectProduct(item);
                                }else{
                                    navigation.navigate(item.route,{type:item.type});
                                }
                                
                            }}
                        >   
                            { item.checked ? 
                            
                            <View>
                                <View style={styles.iconContentColor}>
                                    {/* <Icon
                                        name={item.icon}
                                        size={40}
                                        color={BaseColor.blackColor}
                                        solid
                                    /> */}
                                    <Image
                                        source={item.image}
                                        style={styles.imgProfile}
                                    />
                                </View>
                                <Text overline style={{textAlign:"center"}}>
                                    {item.name}
                                </Text>
                            </View>
                            :
                            <View>
                                <View style={styles.iconContent}>
                                    {/* <Icon
                                        name={item.icon}
                                        size={40}
                                        color={BaseColor.blackColor}
                                        solid
                                    /> */}
                                    <Image
                                        source={item.image}
                                        style={styles.imgProfile}
                                    />
                                </View>
                                <Text overline style={{textAlign:"center"}}>
                                    {item.name}
                                </Text>
                            </View>
                            }
                        </TouchableOpacity>
                    );
                }}
            />
        );
    }


    render() {

        const { navigation } = this.props;
        const { heightHeader,login } = this.state;
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
        
        const heightImageBanner = Utils.scaleWithPixel(300, 1);
        const marginTopBanner = heightImageBanner - heightHeader;

        
   
        return (
            login ? 
            <View style={{ flex: 1 }}>
                {/* <Animated.View
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
                        source={{ uri: 'https://masterdiskon.com/assets/front/img/homebanner/shutterstock_1298526841-min.jpg' }}
                        style={{ width: "100%", height: "100%" }}
                        resizeMode="cover"
                    />
                </Animated.View> */}

                
                <SafeAreaView
                style={[BaseStyle.safeAreaView,{backgroundColor:BaseColor.bgColor}]}
                forceInset={{ top: "always" }}
                >
                
                
                <Header
                        title=""
                        renderRight={() => {
                            return (
                                <Icon
                                    name="ellipsis-v"
                                    size={20}
                                    color={BaseColor.primaryColor}
                                />
                                
                            );
                        }}
                    />
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
                        style={{marginBottom:0}}
                    >
                        <View style={{marginTop:0}}>
                                {/* <View style={{marginHorizontal:20}}>
                                    <Text header bold style={{color:BaseColor.whiteColor}}>
                                    VIVRE ET AIMER
                                    </Text>
                                    
                                    <Text headline style={{color:BaseColor.whiteColor}}>
                                    Temukan dan pesanlah destinasi paket tur dan travel dengan harga yang kompetitif
                                    </Text>
                                </View> */}
                                
                            <View 
                                style={{ 
                                marginTop:0,
                                //backgroundColor:'#fff',
                                width:'90%',
                                alignSelf: 'center',
                                // borderRadius: 18,
                                // shadowColor: "#000",
                                // shadowOffset: {
                                //     width: 0,
                                //     height: 2,
                                // },
                                // shadowOpacity: 0.25,
                                // shadowRadius: 3.84,
                                // elevation: 5,
                                // padding:10
                                }}
                                >
                                <View>
                                    <Text body2 bold>
                                    Hey Kamu Mau Kemana ?
                                    </Text>
                                </View>
                                <View>
                                
                                    {this.renderIconService()}
                                </View>
                            </View>
                            
                            
                             <View 
                                style={{ 
                                marginTop:10,
                                backgroundColor:'#fff',
                                width:'90%',
                                alignSelf: 'center',
                                borderRadius: 18,
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                elevation: 3,
                                padding:10
                                }}
                                >
                                {this.renderContentSearch()}
                                
                            </View> 
                            
                           
                            {   
                            this.state.listdata_product_hotel_package_city.length != 0 ?
                            <View>
                                <CardCustomTitle style={{marginLeft:20}} title={'Featured Destination'} desc={'Sekumpulan tempat menginap pilihan yang telah terverifikasi kualitas dan desainnya'} />
                                <FlatList
                                        contentContainerStyle={{
                                            paddingRight: 20
                                        }}
                                        horizontal={true}
                                        data={this.state.listdata_product_hotel_package_city}
                                        showsHorizontalScrollIndicator={false}
                                        keyExtractor={(item, index) => item.id}
                                        renderItem={({ item, index }) => (
                                        
                                            <CardCustom
                                                propImage={{height:wp("40%"),url:item.img_featured_url}}
                                                propInframe={{top:'',bottom:item.city_name}}
                                                propTitle={{text:''}}
                                                propDesc={{text:''}}
                                                propPrice={{price:'',startFrom:false}}
                                                propStar={{rating:''.stars,enabled:false}}
                                                propLeftRight={{left:'',right:''}}
                                                onPress={() =>
                                                    navigation.navigate("Hotel",{id_city:item.id_city})
                                                }
                                                loading={this.state.loading_product_hotel_package_city}
                                                propOther={{inFrame:false,horizontal:true,width:wp("60%")}}
                                            />
                                        
                                        )}
                                    />
                            </View>
                            :
                            <View></View>
                            }
                                    

                            {   
                            this.state.listdata_product_hotel_package.length != 0 ?
                            <View>
                                <CardCustomTitle style={{marginLeft:20}} title={'Hotel'} desc={''} />
                                <FlatList
                                        contentContainerStyle={{
                                            paddingRight: 20
                                        }}
                                        horizontal={true}
                                        data={this.state.listdata_product_hotel_package}
                                        showsHorizontalScrollIndicator={false}
                                        keyExtractor={(item, index) => item.id}
                                        renderItem={({ item, index }) => (
                                        
                                            <CardCustom
                                                propImage={{height:wp("50%"),url:item.img_featured_url}}
                                                propInframe={{top:item.product_detail.area,bottom:item.product_detail.detail_category}}
                                                propTitle={{text:item.product_name}}
                                                propDesc={{text:item.product_detail.address}}
                                                propPrice={{price:'Rp '+priceSplitter(item.product_detail.price),startFrom:true}}
                                                propStar={{rating:item.product_detail.stars,enabled:true}}
                                                propLeftRight={{left:'',right:''}}
                                                onPress={() =>
                                                    navigation.navigate("HotelDetail",{product:item})
                                                }
                                                loading={this.state.loading_product_hotel_package}
                                                propOther={{inFrame:true,horizontal:true,width:wp("50%")}}
                                            />
                                        
                                        )}
                                    />
                            </View>
                            :
                            <View></View>
                            }


                            
                            
                            
                            
                            {   
                            this.state.listdata_product_trip.length != 0 ?
                            <View>
                                <CardCustomTitle style={{marginLeft:20}} title={'Trip'} desc={''} />
                                <FlatList
                                        contentContainerStyle={{
                                            paddingRight: 20
                                        }}
                                        horizontal={true}
                                        data={this.state.listdata_product_trip}
                                        showsHorizontalScrollIndicator={false}
                                        keyExtractor={(item, index) => item.id}
                                        renderItem={({ item, index }) => (
                                        
                                            <CardCustom
                                                propImage={{height:hp("20%"),url:item.img_featured_url}}
                                                propInframe={{top:item.product_place,bottom:item.product_duration}}
                                                propTitle={{text:item.product_name}}
                                                propDesc={{text:item.product_detail.description}}
                                                propPrice={{price:'Rp '+priceSplitter(item.product_detail.price),startFrom:false}}
                                                propStar={{rating:10,enabled:false}}
                                                propLeftRight={{left:'',right:''}}
                                                onPress={() =>
                                                    navigation.navigate("TourDetailCustom",{product:item})
                                                }
                                                loading={this.state.loading_product_trip}
                                                propOther={{inFrame:true,horizontal:true,width:wp("60%")}}
                                            />
                                        
                                        )}
                                    />
                            </View>
                            :
                            <View></View>
                            }
                            
                            
                            
                            {/* <View>
                                    <View style={{marginTop: 20,marginLeft: 20,marginBottom: 10}}>
                                    <Text title1 bold>
                                        Hotel Deals
                                        </Text>
                                        <Text body1 style={{color:BaseColor.greyColor}}>
                                        Jelajahi sekarang
                                        </Text>
                                    </View>
                                <View>
                                <FlatList
                                        contentContainerStyle={{
                                            paddingRight: 20
                                        }}
                                        //untuk horizontal false
                                        // columnWrapperStyle={{ marginBottom: 10 }}
                                        // numColumns={2}
                                        
                                        //untuk horizontal false
                                        horizontal={true}
                                        
                                        data={this.state.listdata_product_hotel_package}
                                        showsHorizontalScrollIndicator={false}
                                        keyExtractor={(item, index) => item.id}
                                        renderItem={({ item, index }) => (
                                        
                                            <CardCustom
                                                item={item}
                                                img={item.img_featured_url}
                                                imgHeight={150}
                                                titleIcon={{text:item.product_detail.detail_category.replace(/_/g, " "),icon:"home"}}
                                                title={item.product_name}
                                                subtitle={'Start from'}
                                                subtitle2={'Rp '+priceSplitter(item.product_detail.start_price)}
                                                subtitleLeftRight={{enable:false,textLeft:"",textRight:""}}
                                                style={
                                                    //style untuk horizontal true
                                                    { borderRadius: 5,width: Utils.scaleWithPixel(200),marginLeft:20}
                                                    
                                                    //style untuk horizontal false
                                                    // index % 2 ? { marginLeft: 20 } : {marginLeft:20,marginBottom:20}
                                                }
                                                onPress={() =>
                                                    navigation.navigate("HotelDetail",{product:item})
                                                }
                                                loading={this.state.loading_product_hotel_package}
                                                property={{inFrame:true,innerText:false}}
                                                type={''}
                                            />
                                        
                                        )}
                                    />
                                    
                                    
                                </View>
                            </View> */}
                            
                            
                            
                            
                            
                            
                            
                            {/* <View>
                                <View style={{marginTop: 20,marginLeft: 20,marginBottom: 10}}>
                                    <Text title3 semibold>
                                    Voucher Hotel Domestik
                                    </Text>
                                    <Text body2>
                                    Pay Now Stay Later
                                    </Text>
                                </View>
                                <View>
                                    <FlatList
                                        contentContainerStyle={{
                                            paddingRight: 20
                                        }}
                                        //untuk coloumn
                                        // columnWrapperStyle={{ marginBottom: 10 }}
                                        // numColumns={2}
                                        
                                        //data memanjang horizontal
                                        horizontal={true}
                                        
                                        data={this.state.listdata_product_voucher}
                                        showsHorizontalScrollIndicator={false}
                                        keyExtractor={(item, index) => item.id}
                                        renderItem={({ item, index }) => (
                                            <CardCustom
                                                item={item}
                                                img={config.baseUrl+'assets/upload/product/voucher/2020/'+item.img_featured}
                                                imgHeight={150}
                                                titleIcon={{text:"home",icon:"home"}}
                                                title={item.product_name}
                                                subtitle={''}
                                                subtitle2={''}
                                                subtitleLeftRight={{enable:false,textLeft:"",textRight:""}}
                                                style={
                                                    //style untuk horizontal true
                                                    { borderRadius: 5,width: Utils.scaleWithPixel(250),marginLeft:20}
                                                    
                                                    //style untuk horizontal false
                                                    // index % 2 ? { marginLeft: 20 } : {marginLeft:20,marginBottom:20}
                                                }
                                                onPress={() =>
                                                    navigation.navigate("WebViewPage",{url:'https://masterdiskon.com/blog/detail/'+item.slug_blog_category+'/'+item.title_slug+'?access=app',title:item.title})
                                                }
                                                loading={this.state.loading_product_voucher}
                                                property={{inFrame:false,innerText:false}}
                                                type={''}
                                            />
                                            
                                        )}
                                    />
                                </View>
                            </View> */}
                            
                            
                            

                            {/* <View>
                                <View style={{marginTop: 20,marginLeft: 20,marginBottom: 10}}>
                                    <Text title3 semibold>
                                    National Musium Collection
                                    </Text>
                                    <Text body2>
                                    Sekumpulan tempat menginap pilihan yang telah terverifikasi kualitas dan desainnya
                                    </Text>
                                </View>
                                <View>
                                    <FlatList
                                        contentContainerStyle={{
                                            paddingRight: 20
                                        }}
                                        //untuk coloumn
                                        // columnWrapperStyle={{ marginBottom: 10 }}
                                        // numColumns={2}
                                        
                                        //data memanjang horizontal
                                        horizontal={true}
                                        
                                        data={this.state.listdata_musium}
                                        showsHorizontalScrollIndicator={false}
                                        keyExtractor={(item, index) => item.id}
                                        renderItem={({ item, index }) => (
                                            <CardCustom
                                                item={item}
                                                img={'https:'+item[2]}
                                                imgHeight={200}
                                                titleIcon={{text:item[0],icon:"home"}}
                                                title={item[0]}
                                                subtitle={''}
                                                subtitle2={''}
                                                subtitleLeftRight={{enable:false,textLeft:"",textRight:""}}
                                                style={
                                                    //style untuk horizontal true
                                                    { borderRadius: 5,width: Utils.scaleWithPixel(200),marginLeft:20}
                                                    
                                                    //style untuk horizontal false
                                                    // index % 2 ? { marginLeft: 20 } : {marginLeft:20,marginBottom:20}
                                                }
                                                onPress={() =>
                                                    navigation.navigate("Musium",{url:item[3]})
                                                }
                                                loading={this.state.loading_musium}
                                                property={{inFrame:false,innerText:true}}
                                                type={''}
                                            />
                                        )}
                                    />
                                </View>
                            </View> */}
                            
                            
                            
                            {/* <View>
                                <View style={{marginTop: 20,marginLeft: 20,marginBottom: 10}}>
                                    <Text title3 semibold>
                                        Art & Culture Stories
                                    </Text>
                                    <Text body2>
                                    Jelajahi Sekarang
                                    </Text>
                                </View>
                                <View>
                                    <FlatList
                                        contentContainerStyle={{
                                            paddingRight: 20
                                        }}
                                        //untuk coloumn
                                        // columnWrapperStyle={{ marginBottom: 10 }}
                                        // numColumns={2}
                                        
                                        //data memanjang horizontal
                                        horizontal={true}
                                        
                                        data={this.state.listdata_culture}
                                        showsHorizontalScrollIndicator={false}
                                        keyExtractor={(item, index) => item.id}
                                        renderItem={({ item, index }) => (
                                            <CardCustom
                                                item={item}
                                                img={'https:'+item[2]}
                                                imgHeight={150}
                                                titleIcon={{text:"",icon:"home"}}
                                                title={item[0]}
                                                subtitle={item[1]}
                                                subtitle2={''}
                                                subtitleLeftRight={{enable:false,textLeft:"",textRight:""}}
                                                style={
                                                    //style untuk horizontal true
                                                    { borderRadius: 5,width: Utils.scaleWithPixel(250),marginLeft:20}
                                                    
                                                    //style untuk horizontal false
                                                    // index % 2 ? { marginLeft: 20 } : {marginLeft:20,marginBottom:20}
                                                }
                                                onPress={() =>
                                                    navigation.navigate("Musium",{url:item[3]})
                                                }
                                                loading={this.state.loading_culture}
                                                property={{inFrame:true,innerText:false}}
                                                type={''}
                                            />
                                        )}
                                    />
                                </View>
                            </View> */}
                            
                            
                            
                            
                            
                            
                            {/* <View>
                                <View style={{marginTop: 20,marginLeft: 20,marginBottom: 10}}>
                                    <Text title3 semibold>
                                        BLOG
                                    </Text>
                                    <Text body2>
                                    Dapatkan Informasi Seputar Dunia Wisata
                                    </Text>
                                </View>
                                <View>
                                    <FlatList
                                        contentContainerStyle={{
                                            paddingRight: 20
                                        }}
                                        //untuk horizontal false
                                        columnWrapperStyle={{ marginBottom: 10 }}
                                        numColumns={2}
                                        
                                        //untuk horizontal false
                                        //horizontal={true}
                                        
                                        data={this.state.listdata_blog}
                                        showsHorizontalScrollIndicator={false}
                                        keyExtractor={(item, index) => item.id}
                                        renderItem={({ item, index }) => (
                                        
                                            <CardCustom
                                                item={item}
                                                img={config.baseUrl+'assets/upload/blog/post/'+item.featured_image}
                                                imgHeight={150}
                                                titleIcon={{text:"",icon:""}}
                                                title={item.title}
                                                subtitle={item.name_blog_category}
                                                subtitle2={''}
                                                subtitleLeftRight={{enable:false,textLeft:"",textRight:""}}
                                                style={
                                                    //style untuk horizontal true
                                                    // { borderRadius: 5,width: Utils.scaleWithPixel(200),marginLeft:20}
                                                    
                                                    //style untuk horizontal false
                                                    index % 2 ? { marginLeft: 20 } : {marginLeft:20,marginBottom:20}
                                                }
                                                onPress={() =>
                                                    //navigation.navigate("TourDetailCustom",{product:item})
                                                    navigation.navigate("WebViewPage",{url:config.baseUrl+'blog/detail/'+item.slug_blog_category+'/'+item.title_slug+'?access=app',title:item.title})
                                                }
                                                loading={this.state.loading_blog}
                                                property={{inFrame:false,innerText:false}}
                                                type={''}
                                            />
                                        
                                        )}
                                    />
                                </View>
                            </View> */}
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View>
            :
            <NotYetLogin redirect={'Home'} navigation={navigation} />
        

        );
    }
}
