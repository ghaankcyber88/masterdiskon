import React, { Component } from "react";
import { View, ScrollView,Text,TouchableOpacity,StyleSheet } from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import {
    Header,
    SafeAreaView,
    Icon,
    BookingTime,
    Tag,
    FlightPlan,
    FormOption,
    QuantityPicker,
    Button
} from "@components";
//import styles from "./styles";

import {AsyncStorage} from 'react-native';


const styles = StyleSheet.create({
    contain: {
        paddingHorizontal: 20,
        paddingTop: 10,
        marginBottom: 10,
        width: "100%"
    },
    flightType: {
        flexDirection: "row",
        alignItems: "center"
    },
    contentRow: { flexDirection: "row", marginTop: 20 },
    centerView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    colCenter: { flex: 1, alignItems: "center" },

    contentPickDate: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 8,
        backgroundColor: BaseColor.fieldColor,
        padding: 10
    },
    itemPick: {
        flex: 1,
        justifyContent: "center"
    },
    linePick: {
        width: 1,
        backgroundColor: BaseColor.dividerColor,
        marginRight: 10
    },
    contentModal: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    contentCalendar: {
        borderRadius: 8,
        width: "100%",
        backgroundColor: "white"
    },
    contentActionCalendar: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 15
    }
});


export default class TourSet extends Component {
    constructor(props) {
        super(props);
        super(props);

        AsyncStorage.getItem('userSession', (error, result) => {
            if (result) {
                let userSession = JSON.parse(result);
                console.log("---------------data session user  ------------");
                console.log(JSON.stringify(userSession));
                this.setState({userSession:userSession});
                this.setState({login:true});
             }
            
        });


        var product=this.props.navigation.state.params.product;
        //alert(JSON.stringify(product));
       
        const id_dari = '';
        const id_tujuan = '';
        var tglAwal=this.getDate(2);
        var tglAkhir=this.getDate(3);

        this.state = {
            round: true,
            loading: false,
            from: {
                id: "2",
                name: "Indonesia",
                value: "SIN",
                image: Images.airline2
            },
            to: {
                id: "3",
                name: "Indonesia",
                value: "SYN",
                image: Images.airline3
            },

            //custom
            listdata:[],
            id_dari:id_dari,
            id_tujuan:id_tujuan,
            country_name:'',
            tokenTiket:'',
            listdata_bandara:[],
            
            bandaraAsalCode:'CGK',
            bandaraAsalLabel:'Soekarno Hatta',
            bandaraTujuanCode:'DPS',
            bandaraTujuanLabel:'Denpasar',
            bandaraAsalIdCountry:'193',
            jumlahPenumpang:'1',
            kelasPesawat:'EKONOMI',
            dewasa:'2',
            anak:'1',
            bayi:'1',
            tglAwal:tglAwal,
            tglAkhir:tglAkhir,
            pp:'0',
            kelas:'Economy Class',
            kelasId:'E',

            switchValue: true,
            access_token:'',
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

            product:product,
            login:false

         
        };

        this.setBandaraAsal = this.setBandaraAsal.bind(this);
        this.setBandaraTujuan = this.setBandaraTujuan.bind(this);
        this.setJumlahPenumpang = this.setJumlahPenumpang.bind(this);
        this.setKelasPesawat = this.setKelasPesawat.bind(this);
        this.setTglAwal = this.setTglAwal.bind(this);
        this.setPP = this.setPP.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.setJumlahDewasa = this.setJumlahDewasa.bind(this);
        this.setJumlahAnak = this.setJumlahAnak.bind(this);
        this.setJumlahBayi = this.setJumlahBayi.bind(this);
        this.setBookingTime = this.setBookingTime.bind(this);
        this.fetchData = this.fetchData.bind(this);

    }


    componentDidMount() {
        alert('asd');
       // this.fetchData();
    }

    fetchData() {
        AsyncStorage.getItem('userSession', (error, result) => {
            if (result) {
                let userSession = JSON.parse(result);
                console.log("---------------data session user  ------------");
                console.log(JSON.stringify(userSession));
                this.setState({userSession:userSession});
                this.setState({login:true});
                alert('asd');
             }
            
        });
     
    }



    setBookingTime(tglAwal, tglAkhir) {
        if (this.state.round ==true) {
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
      const { round, from, to, loading,login  } = this.state;
      var tgl_akhir='';
      if(this.state.round==true){
        tgl_akhir=this.state.tglAkhir;
      }

 
      var param = {
        "Origin":this.state.bandaraAsalCode,
        "Destination":this.state.bandaraTujuanCode,
        "DepartureDate":this.setDate(this.state.tglAwal),
        "Adults":this.state.dewasa,
        "Children":this.state.anak,
        "Infants":this.state.bayi,
        "ReturnDate":tgl_akhir,
        "IsReturn":this.state.round,
        "CabinClass":[this.state.kelasId],
        "CorporateCode":"",
        "Subclasses":false,
        "Airlines":[]
    
        }

        var paramOther={
        "bandaraAsalLabel":this.state.bandaraAsalLabel,
        "bandaraTujuanLabel":this.state.bandaraTujuanLabel,
        "type":'trip'
        }

        var product=this.state.product;
        
        if(login){
         this.getProduct(param,paramOther,product);
        }else{
            this.props.navigation.navigate('SignIn');
        }

        
    }

    getProduct(param,paramOther,product) {
        console.log("-------param------");
        console.log(JSON.stringify(param));
        this.setState({ loading: true }, () => {
            this.setState({ loading: false });
            this.props.navigation.navigate('Summary',
                                {
                                param:param,
                                paramOther:paramOther,
                                product:product,
                                });


            // AsyncStorage.getItem('tokenAgi', (error, result) => {
            //     if (result) {    

            //                 var access_token=result;
            //                 var myHeaders = new Headers();
            //                 myHeaders.append("Content-Type", "application/json");
            //                 myHeaders.append("Authorization", "Bearer "+access_token);

            //                 var raw = JSON.stringify(param);

            //                 var requestOptions = {
            //                 method: 'POST',
            //                 headers: myHeaders,
            //                 body: raw,
            //                 redirect: 'follow'
            //                 };

            //                 fetch("https://dev-api.megaelectra.co.id/flight/search/v2", requestOptions)
            //                 .then((response) => response.json())
            //                 .then((result) => {
            //                     this.setState({ loading: false });
            //                     var listdata_departure=result.data.departure;
            //                     var listdata_return=result.data.return;
            //                     this.props.navigation.navigate('FlightResult',
            //                     {
            //                     param:param,
            //                     paramOther:paramOther,
            //                     listdata_departure:listdata_departure,
            //                     listdata_return:listdata_return,
            //                     });
            //                 })
            //                 .catch(error => console.log('error', error));
            //             }
            //     });

        });
    }
    
    
    componentDidMount() {
        console.log("-------token------");
        AsyncStorage.getItem('tokenAgi', (error, result) => {
            if (result) {    
                console.log(result);
            }
        });
    }
    
    setBandaraAsal(code='',label='',id_country=''){
        this.setState({bandaraAsalCode: code});
        this.setState({bandaraAsalLabel: label});
        this.setState({bandaraAsalIdCountry:id_country});
        console.log(id_country);
    
    }
    
    setBandaraTujuan(code='',label=''){
        this.setState({bandaraTujuanCode: code});
        this.setState({bandaraTujuanLabel: label});
    }
    
    setJumlahPenumpang(jml,adult,child,infant){
      //alert(jml);
        this.setState({jumlahPenumpang:jml});
        this.setState({dewasa:adult});
        this.setState({anak:child});
        this.setState({bayi:infant});
    }

    setJumlahDewasa(jml){
        console.log(jml);
          this.setState({dewasa:jml});
    }

    setJumlahAnak(jml){
        console.log(jml);
        this.setState({anak:jml});
    }

    setJumlahBayi(jml){
        console.log(jml);
        this.setState({bayi:jml});
    }
  
    
    setKelasPesawat(kelas,kelasId){
        this.setState({kelas:kelas});
        this.setState({kelasId:kelasId});
    }
    
    setTglAwal(tgl){
        this.setState({tglAwal:tgl});
    }
    
    setTglAkhir(tgl){
       this.setState({tglAkhir:tgl});
    }
    
    setPP(pp){
        this.setState({pp:pp});
     }

    render() {
        const { round, from, to, loading,login  } = this.state;
        const { navigation } = this.props;
    
        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <Header
                    title="Set Date & Guest"
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
                <ScrollView style={styles.contain}>
                    {/* <View style={styles.flightType}>
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
                    </View> */}
                    {/* <FlightPlan
                        round={round}
                        fromCode={this.state.bandaraAsalCode}
                        toCode={this.state.bandaraTujuanCode}
                        from={this.state.bandaraAsalLabel}
                        to={this.state.bandaraTujuanLabel}
                        style={{ marginTop: 20 }}
                        onPressFrom={() => this.onSelectFlight("from")}
                        onPressTo={() => this.onSelectFlight("to")}
                    /> */}
                   
                                <View style={styles.contentPickDate}>
                                    <TouchableOpacity
                                        style={styles.itemPick}
                                        onPress={() => this.props.navigation.navigate('DatePickerRange',{setBookingTime:this.setBookingTime,round:this.state.round})}
                                    >
                                        <Text caption1 light style={{ marginBottom: 5 }}>
                                            Check In
                                        </Text>
                                        <Text headline semibold>
                                            {this.convertDate(this.state.tglAwal)}
                                        </Text>
                                    </TouchableOpacity>
                                    <View style={styles.linePick} />
                                    <TouchableOpacity
                                        style={styles.itemPick}
                                        onPress={() => this.props.navigation.navigate('DatePickerRange',{setBookingTime:this.setBookingTime,round:this.state.round})}
                                    >
                                        <Text caption1 light style={{ marginBottom: 5 }}>
                                            Check Out
                                        </Text>
                                        <Text headline semibold>
                                        {this.convertDate(this.state.tglAkhir)}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                   
                        
                    
{/*                     
                    <FormOption
                        style={{ marginTop: 20 }} 
                        listdata={this.state.listdata_kelas}
                        setKelasPesawat={this.setKelasPesawat}
                        selectedText={this.state.kelas}
                    /> */}
                    <View style={{ marginTop: 20, flexDirection: "row" }}>
                        <QuantityPicker
                            label="Adults"
                            detail=">= 12 years"
                            value={this.state.dewasa}
                            setJumlahDewasa={this.setJumlahDewasa}
                            typeOld="1"
                        />


                        <QuantityPicker
                            label="Children"
                            detail="2 - 12 years"
                            value={this.state.anak}
                            style={{ marginHorizontal: 15 }}
                            setJumlahAnak={this.setJumlahAnak}
                            typeOld="2"
                        />
                        <QuantityPicker
                            label="Infants"
                            detail="<= 2 years"
                            value={this.state.bayi}
                            setJumlahBayi={this.setJumlahBayi}
                            typeOld="3"
                        />
                    </View>
                </ScrollView>
                <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
              
                    
                    <Button
                        full
                        loading={loading}
                        onPress={() => {  
                            this.onSubmit();
                            // this.setState({ loading: true }, () => {
                            //     setTimeout(() => {
                            //         this.onSubmit();
                            //         //navigation.navigate("FlightResult");
                            //         this.setState({ loading: false });
                            //     }, 500);
                            // });
                        }}
                    >
                        Next
                    </Button>
                   
                </View>
            </SafeAreaView>
        );
    }
}
