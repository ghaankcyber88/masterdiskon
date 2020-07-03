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
import NotYetLogin from "../../components/NotYetLogin";
export default class FlightSearch extends Component {
    constructor(props) {
        super(props);
       
        
        
        var product=[];
        if(this.props.navigation.state.params.product){
            product=this.props.navigation.state.params.product;
        }
       
        var type=this.props.navigation.state.params.type;
        var tglAwal=this.getDate(2);
        var tglAkhir=this.getDate(3);
        
        var round='';
        var title='';
        if(type=='flight'){
            round=false;
            title='Search Flight';
            
        }else if(type=='hotel'){
            round=true;
            title='Search Hotel';
        }else if(type=='trip'){
            round=true;
            title='Set Tour';
        }

        this.state = {
            //item:item,
            title:title,
            product:product,
            type:type,
            login:true,
            loading: false,
            
            //parameter flight//
            round: round,
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
            
            
            dewasa:"2",
            anak:"1",
            bayi:"0",
            tglAwal:tglAwal,
            tglAkhir:tglAkhir,
         
        };

        this.setBandaraAsal = this.setBandaraAsal.bind(this);
        this.setBandaraTujuan = this.setBandaraTujuan.bind(this);
        this.setKelasPesawat = this.setKelasPesawat.bind(this);
        this.setTglAwal = this.setTglAwal.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.setJumlahDewasa = this.setJumlahDewasa.bind(this);
        this.setJumlahAnak = this.setJumlahAnak.bind(this);
        this.setJumlahBayi = this.setJumlahBayi.bind(this);
        this.setBookingTime = this.setBookingTime.bind(this);
        
        this.setCity = this.setCity.bind(this);
        this.setqty=this.setqty.bind(this);
    }
    
    
    //-----function untuk hotel-----//
    setCity(id,city,province) {
        this.setState({cityId:id});
        this.setState({cityText:city});
        this.setState({cityProvince:province});
    }

    setqty(jml){
        console.log(jml);
        this.setState({qty:jml});
    }
    //-----function untuk hotel-----//
    
    
    
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
    
            const {type,product} =this.state;
          var tgl_akhir='';
          if(this.state.round==true){
            tgl_akhir=this.state.tglAkhir;
          }
    
     
          var param = {
            DepartureDate:this.setDate(this.state.tglAwal),
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
                
                
                this.props.navigation.navigate(link,
{
                    param:param,
                });
                
            }else if(type=='hotel'){
                link='Hotel';
                param.type='hotel';
                param.cityId=this.state.cityId;
                param.cityText=this.state.cityText;
                param.cityProvince=this.state.cityProvince;
                param.Qty=this.state.qty;
                
                this.props.navigation.navigate(link,
                    {
                                        param:param,
                    });
            }else if(type=='trip'){
                link='Summary';
                param.type='trip';
                param.cityId=this.state.cityId;
                param.cityText=this.state.cityText;
                param.cityProvince=this.state.cityProvince;
                param.Qty=this.state.qty;
                
                this.props.navigation.navigate(link,
                    {
                                        param:param,product:product
                    });
            }
            //console.log('param',JSON.stringify(param));
            


    }


    
    
    componentDidMount() {

        AsyncStorage.getItem('userSession', (error, result) => {
            if (result) {
                this.setState({login:true});
             }else{
                this.setState({login:false});

             }
        });

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
    }

    setJumlahAnak(jml){
        this.setState({anak:jml});
    }

    setJumlahBayi(jml){
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
    
    renderContent() {
        var type=this.state.type;
        
        var content=<View></View>
        if(type=="flight"){
            content=this.renderContentFlight();
        }else if(type=="hotel"){
            content=this.renderContentHotel();
        }else if(type=="trip"){
            content=this.renderContentTour();
        }
        return (
            <View style={{ flex: 1 }}>
                {content}
            </View>
        );
    }
    
    
    renderContentHotel(){
        const { round, from, to, loading,login  } = this.state;
        const { navigation } = this.props;
        var content=<View>
                                <View  style={{ flexDirection: "row",paddingBottom:20}}>
                                    <View style={styles.contentPickDate}>
                                        <TouchableOpacity
                                            
                                            onPress={() => this.props.navigation.navigate('SelectCity',{setCity:this.setCity,selected:this.state.cityId})}
                                        >
                                            <Text caption2 light style={{ marginBottom: 5 }}>
                                                Destination
                                            </Text>
                                            <Text body1 semibold>
                                                {this.state.cityText} - {this.state.cityProvince} 
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                
                                
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
                                        label="Rooms"
                                        detail=""
                                        value={this.state.qty}
                                        setJumlahBayi={this.setqty}
                                        typeOld="3"
                                    />
                                </View>
        </View>
        
        return (
            <View style={{ flex: 1 }}>
                {content}
            </View>
        );
        
    }
    
    
    renderContentFlight(){
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
        </View>
        
        return (
            <View style={{ flex: 1 }}>
                {content}
            </View>
        );
        
    }
    
    
    
    renderContentTour(){
        const { round, from, to, loading,login  } = this.state;
        const { navigation } = this.props;
        var content=<View>
            
       
            
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
        </View>
        
        return (
            <View style={{ flex: 1 }}>
                {content}
            </View>
        );
        
    }

    render() {
        const { round, from, to, loading,login,type  } = this.state;
        const { navigation } = this.props;
        
    
        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <Header
                    title={this.state.title}
                    renderLeft={() => {
                        return (
                            <Icon
                                name="arrow-left"
                                size={20}
                                color={BaseColor.whiteColor}
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
                    
                    {this.renderContent()}
                    <Button
                        full
                        loading={loading}
                        onPress={() => {  
                            this.onSubmit();
                           
                        }}
                    >
                        Search
                    </Button>
                </ScrollView>

                :
                <NotYetLogin redirect={'FlightSearch'} navigation={navigation} />
                
    }

            </SafeAreaView>
        );
    }
}
