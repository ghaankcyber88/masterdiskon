import React, { Component } from "react";
import { View, ScrollView,Text,TouchableOpacity,AsyncStorage } from "react-native";
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
import styles from "./styles";
import { Image } from "@components";

export default class FlightSearch extends Component {
    constructor(props) {
        super(props);
       


        const id_dari = '';
        const id_tujuan = '';
        var tglAwal=this.getDate(2);
        var tglAkhir=this.getDate(3);

        this.state = {
            login:true,
            round: false,
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
        "Airlines": []
        }

        var paramOther={
        "bandaraAsalLabel":this.state.bandaraAsalLabel,
        "bandaraTujuanLabel":this.state.bandaraTujuanLabel,
        "type":'flight'
        }

        this.props.navigation.navigate('FlightResult',
        {
        param:param,
        paramOther:paramOther,
        });


    }



    getProduct(param,paramOther) {
        console.log("-------param------");
        console.log(JSON.stringify(param));
        this.setState({ loading: true }, () => {
            AsyncStorage.getItem('tokenAgi', (error, result) => {
                if (result) {    

                            var access_token=result;
                            var myHeaders = new Headers();
                            myHeaders.append("Content-Type", "application/json");
                            myHeaders.append("Authorization", "Bearer "+access_token);

                            var raw = JSON.stringify(param);
                            var requestOptions = {
                            method: 'POST',
                            headers: myHeaders,
                            body: raw,
                            redirect: 'follow'
                            };

                            fetch("https://dev-api.megaelectra.co.id/flight/search/v2", requestOptions)
                            .then((response) => response.json())
                            .then((result) => {
                                this.setState({ loading: false });
                                var listdata_departure=this.rebuild(result.data.departure);
                                var listdata_return=this.rebuild(result.data.return);
                                this.props.navigation.navigate('FlightResult',
                                {
                                param:param,
                                paramOther:paramOther,
                                listdata_departure:listdata_departure,
                                listdata_return:listdata_return,
                                });
                            })
                            .catch(error => console.log('error', error));
                        }
                });

        });
    }

    rebuild(listdata){
        var listdata_new = [];
        var a=1;
        listdata.map(item => {
            var obj = {};
            obj['num'] = a.toString();
            obj['nums'] = a;
            obj["price"]=item.price;
            obj["international"]= item.international;
            obj["combinable"]= item.combinable;
            obj["match_id"]= item.match_id;
            obj["supplier_id"]= item.supplier_id;
            obj["airline_id"]= item.airline_id;
            obj["validating_carrier"]= item.validating_carrier;
            obj["from"]= item.from;
            obj["to"]= item.to;
            obj["adult"]= item.adult;
            obj["child"]= item.child;
            obj["infant"]= item.infant;
            obj["currency"]= item.currency;
            obj["price_type"]= item.price_type;
            obj["flight_schedule"]= item.flight_schedule;
            obj["supplier_code"]= item.supplier_code;
            obj["airline_code"]= item.airline_code;
            obj["reference"]= item.reference;
            obj["subclasses"]= item.subclasses;
            obj["airline_name"]= item.airline_name;
            obj["airline_logo"]= item.airline_logo;
            obj["departure_date"]= item.departure_date;
            obj["departure_time"]= item.departure_time;
            obj["departure_timezone"]= item.departure_timezone;
            obj["gmt_departure"]= item.gmt_departure;
            obj["arrival_date"]= item.arrival_date;
            obj["arrival_time"]= item.arrival_time;
            obj["arrival_timezone"]= item.arrival_timezone;
            obj["gmt_arrival"]= item.gmt_arrival;
            obj["duration"]= item.duration;
            obj["transit"]= item.transit;
            obj["from_name"]= item.from_name;
            obj["from_city"]= item.from_city;
            obj["from_country"]= item.from_country;
            obj["from_country_code"]= item.from_country_code;
            obj["to_name"]= item.to_name;
            obj["to_city"]= item.to_city;
            obj["to_country"]= item.to_country;
            obj["to_country_code"]= item.to_country_code;
            listdata_new.push(obj);
            a++;
        });

       return listdata_new;
    }
    
    
    componentDidMount() {

        AsyncStorage.getItem('userSession', (error, result) => {
            if (result) {
                this.setState({login:true});
             }else{
                this.setState({login:false});

             }
        });



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
                    title="Search Flight"
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
                {
                    login ?
                <ScrollView style={styles.contain}>
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
                    <FlightPlan
                        round={round}
                        fromCode={this.state.bandaraAsalCode}
                        toCode={this.state.bandaraTujuanCode}
                        from={this.state.bandaraAsalLabel}
                        to={this.state.bandaraTujuanLabel}
                        style={{ marginTop: 20 }}
                        onPressFrom={() => this.onSelectFlight("from")}
                        onPressTo={() => this.onSelectFlight("to")}
                    />
                   
                        
                    {
                            this.state.round ? 
                                <View  style={{ flexDirection: "row" }}>
                                    <View style={styles.contentPickDate}>
                                        <TouchableOpacity
                                            
                                            onPress={() => this.props.navigation.navigate('DatePickerRange',{setBookingTime:this.setBookingTime,round:this.state.round})}
                                        >
                                            <Text caption2 light style={{ marginBottom: 5 }}>
                                                Check In
                                            </Text>
                                            <Text body1 semibold>
                                                {this.convertDate(this.state.tglAwal)}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.contentPickDate}>   
                                        <TouchableOpacity
                                           
                                            onPress={() => this.props.navigation.navigate('DatePickerRange',{setBookingTime:this.setBookingTime,round:this.state.round})}
                                        >
                                            <Text caption2 light style={{ marginBottom: 5 }}>
                                                Check Out
                                            </Text>
                                            <Text body1 semibold>
                                            {this.convertDate(this.state.tglAkhir)}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            :
                               <View tyle={{ marginTop: 20, flexDirection: "row" }}>
                                    <View style={styles.contentPickDate}>
                                        <TouchableOpacity
                                            onPress={() => this.props.navigation.navigate('DatePickerRange',{setBookingTime:this.setBookingTime,round:this.state.round})}
                                        >
                                            <Text caption light style={{ marginBottom: 5 }}>
                                                Check In
                                            </Text>
                                            <Text body1 semibold>
                                                {this.convertDate(this.state.tglAwal)}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View>
                                        <TouchableOpacity
                                            style={{}} >
                                        </TouchableOpacity>
                                    </View>
                                </View>
                    } 
                    <FormOption
                        style={{ marginTop: 20 }} 
                        listdata={this.state.listdata_kelas}
                        setKelasPesawat={this.setKelasPesawat}
                        selectedText={this.state.kelas}
                    />
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

                    <Button
                        full
                        loading={loading}
                        style={{
                                borderRadius: 18,
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                elevation: 5,
                                marginTop:20
                            }}
                        onPress={() => {  
                            this.onSubmit();
                           
                        }}
                    >
                        Search
                    </Button>
                </ScrollView>

                :

                <View
                style={{flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',padding: 20}}
                >       
                <Image
                    source={Images.login}
                    style={{ width: "60%", height: "60%" }}
                    resizeMode="cover"
                />
                <View><Text>Anda Belum Login</Text></View>
                <Button
                            full
                            
                            loading={this.state.loading}
                            onPress={() => navigation.navigate("SignIn",{redirect:'FlightSearch'})}
                        >
                            Sign In
                        </Button>
                <View style={styles.contentActionBottom}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("SignUp")}
                            >
                                <Text body1 grayColor>
                                    Haven’t registered yet?
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => navigation.navigate("SignUp")}
                            >
                                <Text body1 primaryColor>
                                    Join Now
                                </Text>
                            </TouchableOpacity>
                        </View>
            </View>
    }

                {/* <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
                    <Button
                        full
                        loading={loading}
                        style={{
                                borderRadius: 18,
                                // backgroundColor: BaseColor.fieldColor,
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                elevation: 5}}
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
                        Search
                    </Button>
                </View> */}
            </SafeAreaView>
        );
    }
}
