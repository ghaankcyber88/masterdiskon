import React, { Component } from "react";
import { View, ScrollView, TextInput, TouchableOpacity } from "react-native";
import DatePicker from 'react-native-datepicker'
import { BaseStyle, BaseColor, Images } from "@config";
import { Image, Header, SafeAreaView, Icon, Text, Button } from "@components";
import { Form, TextValidator } from 'react-native-validator-form';
// import styles from "./styles";

// Load sample data
import { UserData } from "@data";

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    contentTitle: {
        alignItems: "flex-start",
        width: "100%",
        height: 32,
        justifyContent: "center"
    },
    contain: {
        // alignItems: "center",
        padding: 20,
        width: "100%"
    },
    textInput: {
        height: 46,
        backgroundColor: BaseColor.fieldColor,
        borderRadius: 5,
        padding: 10,
        width: "100%",
        color: BaseColor.grayColor
    },
    thumb: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20
    },

    contentProfile: {
        // marginTop: 15,
        flexDirection: "row",
        // backgroundColor: BaseColor.fieldColor,
        marginBottom: 15,
        width: '100%',
    },
    searchIcon: {
        flex: 0.4,
        borderRadius: 8,
        // backgroundColor: BaseColor.fieldColor,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight:10
    },
    searchIconSplit: {
        flex: 0.9,
        borderRadius: 8,
        backgroundColor: BaseColor.fieldColor,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight:10
    },
});


export default class DetailContact extends Component {
    constructor(props) {
        super(props);

            var typeFlight="";
            if(this.props.navigation.state.params.typeFlight){
                typeFlight=this.props.navigation.state.params.typeFlight;
            }

            var typeProduct="";
            if(this.props.navigation.state.params.typeProduct){
                typeProduct=this.props.navigation.state.params.typeProduct;
            }

            var type="";
            if(this.props.navigation.state.params.type){
                type=this.props.navigation.state.params.type;
            }


            var fullname="";
            if(this.props.navigation.state.params.fullname){
              fullname=this.props.navigation.state.params.fullname;
            }  
    
            var firstname="";
            if(this.props.navigation.state.params.firstname){
              firstname=this.props.navigation.state.params.firstname;
            }
    
            var lastname="";
            if(this.props.navigation.state.params.lastname){
              lastname=this.props.navigation.state.params.lastname;
            }
    
            var birthday="";
            if(this.props.navigation.state.params.birthday){
                birthday=this.props.navigation.state.params.birthday;
            }
    
            var nationality="";
            if(this.props.navigation.state.params.nationality){
              nationality=this.props.navigation.state.params.nationality;
            }
    
            var passport_number="";
            if(this.props.navigation.state.params.passport_number){
              passport_number=this.props.navigation.state.params.passport_number;
            }
    
            var passport_country="";
            if(this.props.navigation.state.params.passport_country){
              passport_country=this.props.navigation.state.params.passport_country;
            }
    
            var passport_expire="";
            if(this.props.navigation.state.params.passport_expire){
              passport_expire=this.props.navigation.state.params.passport_expire;
            }
            
            var phone="";
            if(this.props.navigation.state.params.phone){
              phone=this.props.navigation.state.params.phone;
            }
    
            var title="";
            if(this.props.navigation.state.params.title){
              title=this.props.navigation.state.params.title;
            }
    
            var email="";
            if(this.props.navigation.state.params.email){
              email=this.props.navigation.state.params.email;
            }

            var nationality_id="";
            if(this.props.navigation.state.params.nationality_id){
                nationality_id=this.props.navigation.state.params.nationality_id;
            }

            var nationality_phone_code="";
            if(this.props.navigation.state.params.nationality_phone_code){
                nationality_phone_code=this.props.navigation.state.params.nationality_phone_code;
            }
            
            var passport_country_id="";
            if(this.props.navigation.state.params.passport_country_id){
                passport_country_id=this.props.navigation.state.params.passport_country_id;
            }

            var old="";
            if(this.props.navigation.state.params.old){
                old=this.props.navigation.state.params.old;
            }


            let maxDate = new Date();
            // maxDate = this.addDate(maxDate, -3, 'months');
            // maxDate = this.formatDateToString(maxDate);

            let minDate = new Date();
            // minDate = this.addDate(minDate, -80, 'years');
            // minDate = this.formatDateToString(minDate);
            

            if(old==='adult'){
                //maxDate=this.minmaxDate(157,'months');

                // let maxDate = new Date();
                maxDate = this.addDate(maxDate, -12, 'years');
                maxDate = this.formatDateToString(maxDate);

                // let minDate = new Date();
                minDate = this.addDate(minDate, -80, 'years');
                minDate = this.formatDateToString(minDate);
                //alert('adult');
            }else if(old==='children'){
                // maxDate=this.minmaxDate(25,'months');
                // minDate=this.minmaxDate(156,'months');

                // let maxDate = new Date();
                maxDate = this.addDate(maxDate, -2, 'years');
                maxDate = this.formatDateToString(maxDate);

                // let minDate = new Date();
                minDate = this.addDate(minDate, -11, 'years');
                minDate = this.formatDateToString(minDate);
               // alert('children');
                
            }else if(old==='baby'){
                // maxDate=this.minmaxDate(8,'days');
                // minDate=this.minmaxDate(24,'months');

                // let maxDate = new Date();
                maxDate = this.addDate(maxDate, -3, 'months');
                maxDate = this.formatDateToString(maxDate);

                // let minDate = new Date();
                minDate = this.addDate(minDate, -24, 'months');
                minDate = this.formatDateToString(minDate);
                //alert('baby');
            }else{

                // let maxDate = new Date();
                maxDate = this.addDate(maxDate, -3, 'months');
                maxDate = this.formatDateToString(maxDate);
    
                // let minDate = new Date();
                minDate = this.addDate(minDate, -80, 'years');
                minDate = this.formatDateToString(minDate);
                
    
            }



            // let dtmaxDatePassport = new Date();
            // dtmaxDatePassport = this.addDate(dtmaxDatePassport, +10, 'years');
            // var datemaxDatePassport = dtmaxDatePassport.getFullYear()+'-'+(dtmaxDatePassport.getMonth()+1)+'-'+dtmaxDatePassport.getDate();
            // maxDatePassport=datemaxDatePassport;

            let maxDatePassport = new Date();
            maxDatePassport = this.addDate(maxDatePassport, +10, 'years');
            maxDatePassport = this.formatDateToString(maxDatePassport);
            maxDatePassport=maxDatePassport;
            

            let minDatePassport = new Date();
            minDatePassport = this.formatDateToString(minDatePassport);
            minDatePassport=minDatePassport;

            var dataForm={
                fullname:title + " " + firstname + " " + lastname,
                firstname:firstname,
                lastname:lastname,
                birthday:birthday,
                nationality:nationality,
                passport_number:passport_number,
                passport_country:passport_country,
                passport_expire:passport_expire,
                phone:phone,
                title:title,
                email:email,
                nationality_id:nationality_id,
                passport_country_id:passport_country_id,
                nationality_phone_code:nationality_phone_code
                // passport_country_phone_code:passport_country_phone_code,
            }
    
            console.log(JSON.stringify(dataForm));
            
            
        this.state = {
          fullname:fullname,
          firstname:firstname,
          lastname:lastname,
          birthday:birthday,
          nationality:nationality,
          passport_number:passport_number,
          passport_country:passport_country,
          passport_expire:passport_expire,
          phone:phone,
          title:title,
          email:email,
          nationality_id:nationality_id,
          nationality_phone_code:nationality_phone_code,
          passport_country_id:passport_country_id,
        //   passport_country_phone_code:passport_country_phone_code,

          old:old,

          minDate:minDate,
          maxDate:maxDate,

          minDatePassport,
          maxDatePassport,

          typeFlight:typeFlight,
          typeProduct:typeProduct,

          colorButton:BaseColor.greyColor,
          colorButtonText:BaseColor.whiteColor,
          disabledButton:true


          };
          this.setCountry = this.setCountry.bind(this);  
          this.setNationality = this.setNationality.bind(this);  
          this.setPhoneCode = this.setPhoneCode.bind(this);  
          this.setTitle = this.setTitle.bind(this);  
         
      }


      formatDateToString(date){
        // 01, 02, 03, ... 29, 30, 31
        var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
        // 01, 02, 03, ... 10, 11, 12
        var MM = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
        // 1970, 1971, ... 2015, 2016, ...
        var yyyy = date.getFullYear();
     
        // create the format you want
        return (yyyy + "-" + MM + "-" + dd);
     }

     
      addDate(dt, amount, dateType) {
        switch (dateType) {
        case 'days':
            return dt.setDate(dt.getDate() + amount) && dt;
        case 'weeks':
            return dt.setDate(dt.getDate() + (7 * amount)) && dt;
        case 'months':
            return dt.setMonth(dt.getMonth() + amount) && dt;
        case 'years':
            return dt.setFullYear( dt.getFullYear() + amount) && dt;
        }
    }
    
    minmaxDate(value,dateType){
        let dt = new Date();
        dt = this.addDate(dt, -value, dateType);
        var date = dt.getFullYear()+'-'+(dt.getMonth()+1)+'-'+dt.getDate();
        return date;
    }
    


    
      handleSelectItem(item, index) {
        const {onDropdownClose} = this.props;
        onDropdownClose();
        console.log(item);
      }
    
      setCountry(id_country,country_name,phone_code){
        console.log('passport_country_ids',id_country);
        this.setState({passport_country_id:id_country});
        // this.setState({passport_country_phone_code:phone_code});
        this.setState({passport_country:country_name});
        setTimeout(() => {
            this.validation();
        }, 500);
      }

      setNationality(id_country,country_name,phone_code){
        //console.log('nationality_ids',id_country);
        this.setState({nationality_id:id_country});
        //this.setState({nationality_phone_code:phone_code});
        this.setState({nationality:country_name});
        setTimeout(() => {
            this.validation();
        }, 500);
      }
    

      setPhoneCode(phone_code){
        console.log('phonecodes',phone_code);
        this.setState({nationality_phone_code:phone_code});
        setTimeout(() => {
            this.validation();
        }, 500);
      }
   
    
      setTitle(title){
        this.setState({title:title});
        setTimeout(() => {
            this.validation();
        }, 500);
      }
     
      
      setDate(date) {
        
          var date = new Date(date);
          var tempoMonth = (date.getMonth()+1);
          var tempoDate = (date.getDate());
          var finaldate="";
          if (tempoMonth < 10) tempoMonth = '0' + tempoMonth;
          if (tempoDate < 10) tempoDate = '0' + tempoDate;
      
          return finaldate = date.getFullYear()  + '-' +  tempoMonth  + '-' +  tempoDate;
          //props.setTglAwal(finaldate);
          // document.querySelector('#'+props.nameInput).value=finaldate;
          // setSelectedDate(date);
      };
    
      setDateLocal(date) {
        
        if(date!=""){
        var date = new Date(date);
        var tempoMonth = (date.getMonth()+1);
        var tempoDate = (date.getDate());
        var finaldate="";
        // if (tempoMonth < 10) tempoMonth = '0' + tempoMonth;
        // if (tempoDate < 10) tempoDate = '0' + tempoDate;
    
        // return finaldate = date.getFullYear()  + '-' +  tempoMonth  + '-' +  tempoDate;
        return finaldate = tempoDate+'/'+tempoMonth+'/'+date.getFullYear();
        //props.setTglAwal(finaldate);
        // document.querySelector('#'+props.nameInput).value=finaldate;
        // setSelectedDate(date);
        }else{
          return "Set Tanggal"
        }
    };
      
      updateParticipant(){
        //alert(this.state.passport_expire);
        
        var key=this.props.navigation.state.params.key;
    
        var fullname=this.state.title + " " + this.state.firstname + " " + this.state.lastname;
        var firstname=this.state.firstname;
        var lastname=this.state.lastname;
        var birthday=this.state.birthday;
        var nationality=this.state.nationality;
        var passport_number=this.state.passport_number;
        var passport_country=this.state.passport_country;
        var passport_expire=this.state.passport_expire;
        var phone=this.state.phone;
        var title=this.state.title;
        var email=this.state.email;

        var nationality_id=this.state.nationality_id;
        var nationality_phone_code=this.state.nationality_phone_code;

        var passport_country_id=this.state.passport_country_id;
        // var passport_country_phone_code=this.state.passport_phone_code;
        var type=this.props.navigation.state.params.type;
        
    
    
    
        this.props.navigation.state.params.updateParticipant(
          key,
          fullname,
          firstname,
          lastname,
          birthday,
          nationality,
          passport_number,
          passport_country,
          passport_expire,
          phone,
          title,
          email,
          nationality_id,
          nationality_phone_code,
          passport_country_id,
        //   passport_country_phone_code,
          type
          );
        this.props.navigation.goBack();
      }

      renderPicker() {
        if (this.state.picker) {
          return (
            <DatePicker
        style={{width: 200}}
        date={this.state.date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2016-05-01"
        maxDate="2016-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />
          );
        }
      }

    
    

    validation(){
        var firstname=this.state.firstname;
        var lastname=this.state.lastname;
        var birthday=this.state.birthday;
        var nationality=this.state.nationality;
        var passport_number=this.state.passport_number;
        var passport_country=this.state.passport_country;
        var passport_expire=this.state.passport_expire;
        var phone=this.state.phone;
        var title=this.state.title;
        var email=this.state.email;
        var nationality_id=this.state.nationality_id;
        var nationality_phone_code=this.state.nationality_phone_code;
        var passport_country_id=this.state.passport_country_id;

        let {typeProduct,typeFlight,params}=this.state;
        var type=this.props.navigation.state.params.type;

        
        
        var dataForm={
            fullname:title + " " + firstname + " " + lastname,
            firstname:firstname,
            lastname:lastname,
            birthday:birthday,
            nationality:nationality,
            passport_number:passport_number,
            passport_country:passport_country,
            passport_expire:passport_expire,
            phone:phone,
            title:title,
            email:email,
            nationality_id:nationality_id,
            passport_country_id:passport_country_id,
            nationality_phone_code:nationality_phone_code
        }

        console.log(JSON.stringify(dataForm));


        if(type=='customer'){

            if( 
                firstname != '' && 
                lastname !='' &&
                title !='' &&
                email !='' &&
                phone !='' &&
                nationality !='' &&
                nationality_phone_code !=''
            ){
                    console.log('perfect');
                    this.setState({colorButton:BaseColor.secondColor});
                    this.setState({colorButtonText:BaseColor.primaryColor});
                    this.setState({disabledButton:false});
            }else{
                console.log('not yet');
                this.setState({colorButton:BaseColor.greyColor});
                this.setState({colorButtonText:BaseColor.whiteColor});
                this.setState({disabledButton:true});
            }
        }else if(type=='guest'){
            if(typeFlight=='domestic' || typeProduct=='trip'){
                if( 
                    firstname != '' && 
                    lastname !='' &&
                    title !='' &&
                    birthday !='' &&
                    nationality !=''

                ){
                    console.log('perfect');
                    this.setState({colorButton:BaseColor.secondColor});
                    this.setState({colorButtonText:BaseColor.primaryColor});
                    this.setState({disabledButton:false});
                }else{
                    console.log('not yet');
                this.setState({colorButton:BaseColor.greyColor});
                this.setState({colorButtonText:BaseColor.whiteColor});
                this.setState({disabledButton:true});
                }
            }else{
                if( 
                    firstname != '' && 
                    lastname !='' &&
                    title !='' &&
                    birthday !='' &&
                    email !='' &&
                    phone !='' &&
                    nationality !='' &&
                    passport_number !='' &&
                    passport_expire !='' &&
                    passport_country !=''
                ){
                    console.log('perfect');
                    this.setState({colorButton:BaseColor.secondColor});
                    this.setState({colorButtonText:BaseColor.primaryColor});
                    this.setState({disabledButton:false});
                }else{
                    console.log('not yet');
                this.setState({colorButton:BaseColor.greyColor});
                this.setState({colorButtonText:BaseColor.whiteColor});
                this.setState({disabledButton:true});
                  
                }
            }
        }else{
            if( 
                firstname != '' && 
                lastname !='' &&
                title !='' &&
                birthday !='' &&
                email !='' &&
                phone !='' &&
                nationality !='' &&
                passport_number !='' &&
                passport_expire !='' &&
                passport_country !=''
            ){
                console.log('perfect');
                    this.setState({colorButton:BaseColor.secondColor});
                    this.setState({colorButtonText:BaseColor.primaryColor});
                    this.setState({disabledButton:false});
            }else{
                console.log('not yet');
                this.setState({colorButton:BaseColor.greyColor});
                this.setState({colorButtonText:BaseColor.whiteColor});
                this.setState({disabledButton:true});
              
            }
        }

        
    }

    componentDidMount(){
        this.validation();

    }






    render() {
        const { navigation } = this.props;
        let {typeFlight,typeProduct} = this.state;

        var type=this.props.navigation.state.params.type;


        var formFullName=<View style={{marginBottom: 10}}>
                            <View style={{flexDirection: "row"}}>
                                <View style={{flex: 6,marginRight: 15}}>
                                    <TouchableOpacity 
                                    style={{width:'100%',flexDirection: "row"}}
                                    >
                                        <View style={styles.contentProfile}>
                                            <View style={{ flex: 6 }}>
                                            <TextValidator
                                                            name="firstname"
                                                            label="lastname"
                                                            validators={['required']}
                                                            errorMessages={['This field is required']}
                                                            placeholder="e.g., firstname"
                                                            type="text"
                                                            // keyboardType="email-address"
                                                            value={this.state.firstname}
                                                            onChangeText={(firstname)=> {
                                                                this.setState({firstname : firstname})
                                                                setTimeout(() => {
                                                                        this.validation();
                                                                }, 500);
                                                                
                                                            }} 
                                                        />
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    <Text body2 style={{marginTop:-20,color:BaseColor.primaryColor}}>
                                        Firstname
                                    </Text>
                                </View>                    
                                        
                                <View style={{flex: 6}}>

                                                    <TouchableOpacity 
                                                    style={{width:'100%',flexDirection: "row"}}
                                                >
                                                        <View style={styles.contentProfile}>
                                                            <View style={{ flex: 6 }}>
                                                                <TextValidator
                                                                    name="lastname"
                                                                    label="lastname"
                                                                    validators={['required']}
                                                                    errorMessages={['This field is required']}
                                                                    placeholder="e.g., lastname"
                                                                    type="text"
                                                                    value={this.state.lastname}
                                                                    onChangeText={(lastname)=> {
                                                                        this.setState({lastname : lastname})
                                                                        setTimeout(() => {
                                                                                this.validation();
                                                                        }, 500);
                                                                        
                                                                    }} 
                                                                />
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                    <Text body2 style={{marginTop:-20,color:BaseColor.primaryColor}}>
                                                        Lastname
                                                    </Text>
                                </View>
                            </View>
                            
                       </View>



        var formPhoneSplit=<View style={{marginBottom: 10}}>
        <View style={{flexDirection: "row"}}>
            <View style={{flex: 4,marginRight: 15}}>
            <View style={styles.contentTitle}>
                            <Text headline semibold>
                            Phone Code
                            </Text>
                        </View>
                        <TouchableOpacity 
                        style={{width:'100%'}}
                        onPress={() => this.props.navigation.navigate('SelectCountry',
                        {
                            setNationality: this.setNationality,
                            pageReturn:'DetailContact',
                            selected: this.state.nationality_id,
                            type:'nationality'
                        })}>


                            <View style={styles.contentProfile} pointerEvents='none'>
                                <View style={{ flex: 6, marginRight: 15 }}>
                                <TextInput
                                    style={BaseStyle.textInput}
                                    onChangeText={text => this.setState({ id: text })}
                                    autoCorrect={false}
                                    placeholder={this.state.nationality}
                                    placeholderTextColor={BaseColor.grayColor}
                                    value={this.state.nationality}
                                    selectionColor={BaseColor.primaryColor}
                                />
                                </View>
                                <View style={styles.searchIconSplit} onPress={()=>
                                    {navigation.navigate("ProfileSmart");} } >
                                    <Icon name="chevron-down" size={18} color={BaseColor.primaryColor} />
                                </View>
                            </View>
                        </TouchableOpacity>
            </View>                    

            <View style={{flex: 6}}>
                <View style={styles.contentTitle}>
                                <Text headline semibold>
                                    Phone
                                </Text>
                            </View>
                            <TouchableOpacity 
                            style={{width:'100%'}}
                        >

                                <View style={styles.contentProfile}>
                                    <View style={{ flex: 6, marginRight: 15 }}>
                                    <TextInput
                                        style={BaseStyle.textInput}
                                        onChangeText={(phone)=> {
                                            this.setState({phone : phone})
                                            setTimeout(() => {
                                                this.validation();
                                            }, 500);
                                        }}
                                        value={this.state.phone}
                                        autoCorrect={false}
                                        placeholderTextColor={BaseColor.grayColor}
                                        selectionColor={BaseColor.primaryColor}
                                    />
                                    </View>
                                  
                                </View>
                            </TouchableOpacity>
            </View>
        </View>
        <Text body2 style={{marginTop:-15,color:BaseColor.primaryColor}}>
        Sekumpulan tempat menginap pilihan yang telah
        </Text>
        </View>




        var formTitle=<View style={{marginBottom: 10}}>
                                            <TouchableOpacity 
                                            style={{width:'100%'}}
                                            onPress={() => this.props.navigation.navigate('SelectTitle',
                                            {
                                                setTitle: this.setTitle,
                                                pageReturn:'DetailContact',
                                                selected: this.state.title,
                                                old: this.state.old
                                            })}>

                                                <View style={styles.contentProfile} pointerEvents='none'>
                                                    <View style={{ flex: 6 }}>
                                                        <TextValidator
                                                            name="email"
                                                            label="email"
                                                            validators={['required']}
                                                            errorMessages={['This field is required']}
                                                            placeholder="e.g., MR"
                                                            type="text"
                                                            keyboardType="email-address"
                                                            value={this.state.title}
                                                        />
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                            <Text body2 style={{marginTop:-15,color:BaseColor.primaryColor}}>
                                                Title
                                            </Text>
                        </View>                    

            var formBirthday=<View style={{marginBottom: 10}}>
                        <TouchableOpacity 
                        style={{width:'100%'}}
                        onPress={() => {this.datePickerRef.onPressDate()}}
                       >

                            <View style={styles.contentProfile} pointerEvents='none'>
                                <View style={{ flex: 6}}>
                                            <TextValidator
                                                name="email"
                                                label="email"
                                                validators={['required']}
                                                errorMessages={['This field is required']}
                                                placeholder="e.g., 1987-09-18"
                                                type="text"
                                                keyboardType="email-address"
                                                value={this.state.birthday}
                                            />
                                </View>
                            </View>
                            <DatePicker
                            style={{display:'none'}}
                            date={this.state.birthday}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            minDate={this.state.minDate}
                            maxDate={this.state.maxDate}
                            confirmBtnText="Confirm"
                            animationType={"fade"}
                            androidMode={"spinner"}
                            cancelBtnText="Cancel"
                            showIcon={false}
                            hideText={true}
                            ref={(ref)=>this.datePickerRef=ref}
                            customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                display:'none',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36,
                            }
                            }}
                            onDateChange={(date) => {
                                this.setState({birthday: date});
                                setTimeout(() => {
                                    this.validation();
                                }, 500);
                            
                            }}
                            />
                        </TouchableOpacity>
                            <Text body2 style={{marginTop:-15,color:BaseColor.primaryColor}}>
                                Date of birth
                            </Text>
                        </View>  

            var formEmail=<View style={{marginBottom: 10}}>
                                        <TouchableOpacity 
                                        style={{width:'100%'}}
                                    >
                                            <View style={styles.contentProfile}>
                                                <View style={{ flex: 6}}>
                                                <TextValidator
                                                name="email"
                                                label="email"
                                                validators={['required', 'isEmail']}
                                                errorMessages={['This field is required', 'Email invalid']}
                                                placeholder="e.g., example@email.com"
                                                type="text"
                                                keyboardType="email-address"
                                                value={this.state.email}
                                                onChangeText={(email)=> {
                                                    this.setState({email : email})
                                                    setTimeout(() => {
                                                        this.validation();
                                                    }, 500);
                                                }}
                                                
                                               
                                            />
                                                </View>
                                               
                                            </View>
                                        </TouchableOpacity>
                                        
                                        <Text body2 style={{marginTop:-15,color:BaseColor.primaryColor}}>
                                             Email
                                            </Text>
                                        
            </View>

            var formPhone=<View style={{marginBottom: 10}}>
                            <View style={{flexDirection: "row"}}>
                                <View style={{flex: 4,marginRight: 15}}>
                                    <TouchableOpacity 
                                    style={{width:'100%',flexDirection: "row"}}
                                    onPress={() => this.props.navigation.navigate('SelectPhoneCode',
                                    {
                                        setPhoneCode: this.setPhoneCode,
                                        pageReturn:'DetailContact',
                                        selected: this.state.nationality_phone_code,
                                        // type:'nationality'
                                    })}>
                                        <View style={styles.contentProfile} pointerEvents='none'>
                                            <View style={{ flex: 6}}>
                                                                <TextValidator
                                                                    name="nationality_phone_code"
                                                                    label="nationality_phone_code"
                                                                    validators={['required']}
                                                                    errorMessages={['This field is required']}
                                                                    placeholder="e.g., 021"
                                                                    type="text"
                                                                    keyboardType="email-address"
                                                                    value={this.state.nationality_phone_code}
                                                                    onChangeText={(nationality_phone_code)=> {
                                                                        this.setState({nationality_phone_code : nationality_phone_code})
                                                                        setTimeout(() => {
                                                                            this.validation();
                                                                        }, 500);
                                                                    }}
                                                                />
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    <Text body2 style={{marginTop:-15,color:BaseColor.primaryColor}}>
                                        Phone Code
                                    </Text>
                                </View>                    
                                        
                                <View style={{flex: 8}}>

                                                    <TouchableOpacity 
                                                    style={{width:'100%',flexDirection: "row"}}
                                                >
                                                        <View style={styles.contentProfile}>
                                                                <View style={{ flex: 6 }}>
                                                                        <TextValidator
                                                                            name="phone"
                                                                            label="phone"
                                                                            validators={['required', 'isNumber']}
                                                                            errorMessages={['This field is required', 'Number invalid']}
                                                                            placeholder="e.g., 80808080"
                                                                            type="text"
                                                                            keyboardType="email-address"
                                                                            value={this.state.phone}
                                                                            onChangeText={(phone)=> {
                                                                                this.setState({phone : phone})
                                                                                setTimeout(() => {
                                                                                    this.validation();
                                                                                }, 500);
                                                                            }}
                                                                        
                                                                        />
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                    <Text body2 style={{marginTop:-15,color:BaseColor.primaryColor}}>
                                                        Phone Number
                                                    </Text>
                                </View>
                            </View>
                            
                       </View>


            var formNationality=<View style={{marginBottom: 10}}>
                        <TouchableOpacity 
                        style={{width:'100%'}}
                        onPress={() => this.props.navigation.navigate('SelectCountry',
                        {
                            setNationality: this.setNationality,
                            pageReturn:'DetailContact',
                            selected: this.state.nationality_id,
                            type:'nationality'
                        })}>


                            <View style={styles.contentProfile} pointerEvents='none'>
                                <View style={{ flex: 6}}>
                                                    <TextValidator
                                                        name="nationality"
                                                        label="nationality"
                                                        validators={['required']}
                                                        errorMessages={['This field is required']}
                                                        placeholder="e.g., Indonesia"
                                                        type="text"
                                                        keyboardType="email-address"
                                                        value={this.state.nationality}
                                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                        <Text body2 style={{marginTop:-15,color:BaseColor.primaryColor}}>
                                            Nationality
                                            </Text>
            </View>

            var formPassportNumber=<View style={{marginBottom: 10}}>
         
                        <TouchableOpacity 
                        style={{width:'100%'}}
                       >

                            <View style={styles.contentProfile}>
                                <View style={{ flex: 6}}>
                               
                                  <TextValidator
                                                name="passport_number"
                                                label="passport_number"
                                                validators={['required', 'isNumber']}
                                                errorMessages={['This field is required', 'Number invalid']}
                                                placeholder="e.g.,80808080"
                                                type="text"
                                                keyboardType="email-address"
                                                value={this.state.passport_number}
                                                onChangeText={(passport_number)=> {
                                                    this.setState({passport_number : passport_number})
                                                    setTimeout(() => {
                                                        this.validation();
                                                    }, 500);
                                                }}
                                               
                                            />
                                </View>

                           
                            </View>
                        </TouchableOpacity>
                        <Text body2 style={{marginTop:-15,color:BaseColor.primaryColor}}>
                                             Passport Number
                                            </Text>
            </View>

            var formPassportExpired=<View  style={{marginBottom: 10}}>
                        <TouchableOpacity 
                        style={{width:'100%'}}
                        onPress={() => {this.datePickerRef2.onPressDate()}}
                       >

                            <View style={styles.contentProfile} pointerEvents='none'>
                                <View style={{ flex: 6 }}>
                                <TextValidator
                                                name="Passport Expired"
                                                label="passport_expire"
                                                validators={['required']}
                                                errorMessages={['This field is required']}
                                                placeholder="e.g.,1987-09-18"
                                                type="text"
                                                keyboardType="email-address"
                                                value={this.state.passport_expire}
                                            />
                                </View>
                            </View>
                            <DatePicker
                            style={{display:'none'}}
                            date={this.state.passport_expire}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            minDate={this.state.minDatePassport}
                            maxDate={this.state.maxDatePassport}
                            confirmBtnText="Confirm"
                            animationType={"fade"}
                            androidMode={"spinner"}
                            cancelBtnText="Cancel"
                            showIcon={false}
                            hideText={true}
                            ref={(ref)=>this.datePickerRef2=ref}
                            customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                display:'none',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36,
                            }
                            }}
                            onDateChange={(date) => {
                                this.setState({passport_expire: date});
                                setTimeout(() => {
                                    this.validation();
                                }, 500);
                            
                            }}
                            />
                        </TouchableOpacity>
                        <Text body2 style={{marginTop:-15,color:BaseColor.primaryColor}}>
                                            Passport Expired
                                            </Text>
            </View>

            var formPassportCountry=<View style={{marginBottom: 10}}>
                       
                        <TouchableOpacity 
                        style={{width:'100%'}}
                        onPress={() => this.props.navigation.navigate('SelectCountry',
                        {
                            setCountry: this.setCountry,
                            pageReturn:'DetailContact',
                            selected: this.state.passport_country_id,
                            type:'passportCountry'
                        })}>



                            <View style={styles.contentProfile} pointerEvents='none'>
                                <View style={{ flex: 6 }}>
                           

                                    <TextValidator
                                                        name="passport_country"
                                                        label="passport_country"
                                                        validators={['required']}
                                                        errorMessages={['This field is required']}
                                                        placeholder="e.g., Indonesia"
                                                        type="text"
                                                        keyboardType="email-address"
                                                        value={this.state.passport_country}
                                                    />
                                </View>
                               
                            </View>
                        </TouchableOpacity>
                            <Text body2 style={{marginTop:-15,color:BaseColor.primaryColor}}>
                                Passport Country
                            </Text>
                        </View>
            

       
        var contentFormComplete=<View style={{width:'100%'}}>
                                {formFullName}
                                {formTitle}
                                {formBirthday}
                                {formEmail}
                                {formPhone}
                                {formNationality}
                                {formPassportNumber}
                                {formPassportExpired}
                                {formPassportCountry}
                                </View>

        var contentFormCustomer=<View style={{width:'100%'}}>
                {formFullName}
                {formTitle}
                {formEmail}
                {formPhone}
                {formNationality}
        </View>

        var contentFormGuestDomestic=<View style={{width:'100%'}}>
                {formFullName}
                {formTitle}
                {formBirthday}
                {formNationality}
              
        </View>

        var contentFormGuestInternational=<View style={{width:'100%'}}>
                {formTitle}
                {formFullName}
                {formBirthday}
                {formEmail}
                {formPhone}
                {formNationality}
                {formPassportNumber}
                {formPassportExpired}
                {formPassportCountry}
        </View>

        var contentForm=<View></View>
        
        if(type=='customer'){
            contentForm=contentFormCustomer;
        }else if(type=='guest'){
            if(typeFlight=='domestic' || typeProduct=='trip'){
                contentForm=contentFormGuestDomestic;
            }else{
                contentForm=contentFormGuestInternational;
            }
        }else{
            contentForm=contentFormComplete;
        }


        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
               
                <Header
                    title="Edit Profile"
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
                    onPressRight={() => {}}
                />
                <ScrollView>
                
                    <View style={styles.contain}>
                    <Form
                            ref="form"
                            onSubmit={this.submit}
                        >
                        {contentForm}
                        </Form>
                    </View>
                    
                </ScrollView>
                <View style={{ padding: 20 }}>
                    <TouchableOpacity  disabled={this.state.disabledButton} onPress={() => this.updateParticipant()} >
                    <View pointerEvents='none' style={styles.groupinput}>
                    <Button
                        loading={this.state.loading}
                        style={{backgroundColor:this.state.colorButton}}
                        full
                    >
                        <Text style={{color:this.state.colorButtonText}}>Sign In</Text>
                    </Button>
                    </View>
                    </TouchableOpacity>
                </View>
               
            </SafeAreaView>
        );
    }
}
