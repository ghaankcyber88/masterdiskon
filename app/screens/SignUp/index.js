import React, { Component } from "react";
import { View, ScrollView, TextInput,TouchableOpacity} from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, Button,Text } from "@components";
import styles from "./styles";
import DropdownAlert from 'react-native-dropdownalert';
import ValidationComponent from 'react-native-form-validator';
import InputText from "../../components/InputText";

export default class SignUp extends ValidationComponent {
    constructor(props) {
        super(props);
        this.state = {

            // name: "",
            firstname:"",
            lastname:"",
            username:"",
            password:"",
            passwordConfirm:"",
            email: "",
            // address: "",


            loading: false,
            success: {
                // name: true,
                firstname: true,
                lastname:true,
                username:true,
                password:true,
                passwordConfirm:true,
                email: true,
                // address: true
            },
            
            colorButton:BaseColor.greyColor,
            colorButtonText:BaseColor.whiteColor,
            disabledButton:true
        };
    }

    onSignUp() {
        const { navigation } = this.props;
        let { name,firstname,lastname,username,password,passwordConfirm, email, address, success } = this.state;

        if (firstname == "" || lastname == "" || username == "" || password == "" || passwordConfirm == "" || email == "") {
            this.setState({
                success: {
                    ...success,
                    firstname: firstname != "" ? true : false,
                    lastname: lastname != "" ? true : false,
                    username: username != "" ? true : false,
                    password: password != "" ? true : false,
                    passwordConfirm: passwordConfirm != "" ? true : false,
                    email: email != "" ? true : false,
                }
            });
        } else {
            this.setState({ loading: true }, () => {
                var data={"firstname":firstname,"lastname":lastname,"username":username,"password":password,"passwordConfirm":passwordConfirm,"email":email}
                const param={"param":data}

                console.log("------------------data param submit register--------------");
                console.log(JSON.stringify(param));
        
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                var raw = JSON.stringify(param);
                var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
                };

                fetch("https://masterdiskon.com/front/auth/register/registrasi_proses_app", requestOptions)
                .then(response => response.json())
                .then(result => {
                    this.setState({ loading: false });
                    console.log(JSON.stringify(result));
                    if(result.success==false){
                        this.dropdown.alertWithType('error', 'Error', JSON.stringify(result.message));
                        //this.setState({ loading: false });
                    }else if(result.success==true){
                        this.dropdown.alertWithType('success', 'Success', JSON.stringify(result.message));
                        setTimeout(() => {
                            navigation.navigate("SignIn");
                        }, 1000);
                   
                    }

                })
            });
              
        }
    }
    
    
    validationSubmit() {
        this.validate({
            passwordConfirm: {required: true},
            password: {required: true},
            email: {required: true,email:true},
            username: {required: true},
            firstname: {required: true},
            lastname: {required: true},
            
        });
        
        var errorMsg=this.getErrorMessages();
        return errorMsg;
    }
      

    validation(){
        var passwordConfirm=this.state.passwordConfirm;
        var password = this.state.password;
        var email=this.state.email;
        var username=this.state.username;
        var firstname=this.state.firstname;
        var lastname=this.state.lastname;
    
        var errorMsg=this.getErrorMessages();

        if(passwordConfirm != '' && password !='' && email !='' && username !='' && firstname !='' && lastname !='' ){
                if(errorMsg !=''){
                    console.log('not yet');
                    this.setState({colorButton:BaseColor.greyColor});
                    this.setState({colorButtonText:BaseColor.whiteColor});
                    this.setState({disabledButton:true});
                }else{
                    console.log('perfect');
                    this.setState({colorButton:BaseColor.secondColor});
                    this.setState({colorButtonText:BaseColor.primaryColor});
                    this.setState({disabledButton:false});
                }
        }else{
                console.log('not yet');
                this.setState({colorButton:BaseColor.greyColor});
                this.setState({colorButtonText:BaseColor.whiteColor});
                this.setState({disabledButton:true});
          
        }
    }
    
  
      
    handleChange = (key, val,validate) => {
        this.setState({ [key]: val});
        // if(val != '' ){
        //     this.validate(validate);
        // }
        
        setTimeout(() => {
            this.validation();
        }, 500);
    }
    
    
    render() {
        const { navigation } = this.props;
        let { loading,firstname,lastname,username,password,passwordConfirm,email, success } = this.state;
        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <Header
                    title="Sign Up"
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
                    
                        <InputText
                            name="firstname"
                            label="Firstname *"
                            placeholder="e.g.,John"
                            value={this.state.firstname}
                            icon="user"
                            onChangeText={(val)=> {
                                this.handleChange('firstname',val,
                                    {
                                        firstname: {required: true},
                                    }
                                );
                            }}
                            isFieldInError={this.isFieldInError('firstname')}
                            getErrorsInField={this.getErrorsInField('firstname')}
                        
                        />
                        
                        <InputText
                            name="lastname"
                            label="Lastname *"
                            placeholder="e.g.,Doe"
                            value={this.state.lastname}
                            icon="user"
                            onChangeText={(val)=> {
                                this.handleChange('lastname',val,
                                    {   
                                        firstname: {required: true},
                                        lastname: {required: true},
                                    }
                                );
                            }}
                            isFieldInError={this.isFieldInError('lastname')}
                            getErrorsInField={this.getErrorsInField('lastname')}
                        />
                        
                        
                        <InputText
                            name="username"
                            label="Username *"
                            placeholder="e.g.,Doe"
                            value={this.state.username}
                            icon="user"
                            onChangeText={(val)=> {
                                this.handleChange('username',val,
                                    {
                                        username: {required: true},
                                        firstname: {required: true},
                                        lastname: {required: true},
                                    }
                                );
                            }}
                            isFieldInError={this.isFieldInError('username')}
                            getErrorsInField={this.getErrorsInField('username')}
                        
                        />
                        
                        <InputText
                            name="email"
                            label="Email *"
                            placeholder="e.g.,Doe"
                            value={this.state.email}
                            icon="user"
                            onChangeText={(val)=> {
                                this.handleChange('email',val,
                                    {
                                        email: {required: true,email:true},
                                        username: {required: true},
                                        firstname: {required: true},
                                        lastname: {required: true},
                                    }
                                );
                            }}
                            isFieldInError={this.isFieldInError('email')}
                            getErrorsInField={this.getErrorsInField('email')}
                        
                        />
                        
                        
                        <InputText
                            name="password"
                            label="Password *"
                            placeholder="e.g.,Doe"
                            value={this.state.password}
                            icon="user"
                            onChangeText={(val)=> {
                                this.handleChange('password',val,
                                    {
                                        password: {required: true},
                                        email: {required: true,email:true},
                                        username: {required: true},
                                        firstname: {required: true},
                                        lastname: {required: true},
                                    }
                                );
                            }}
                            isFieldInError={this.isFieldInError('password')}
                            getErrorsInField={this.getErrorsInField('password')}
                        
                        />
                        
                        <InputText
                            name="passwordConfirm"
                            label="Password Konfirm *"
                            placeholder="e.g.,Doe"
                            value={this.state.passwordConfirm}
                            icon="user"
                            onChangeText={(val)=> {
                                this.handleChange('passwordConfirm',val,
                                    {
                                        passwordConfirm: {required: true},
                                        password: {required: true},
                                        email: {required: true,email:true},
                                        username: {required: true},
                                        firstname: {required: true},
                                        lastname: {required: true},
                                        
                                    }
                                );
                            }}
                            isFieldInError={this.isFieldInError('passwordConfirm')}
                            getErrorsInField={this.getErrorsInField('passwordConfirm')}
                        
                        />
                        
                        {/* <TextInput
                            style={[BaseStyle.textInput, { marginTop: 65 }]}
                            onChangeText={text => this.setState({ firstname: text })}
                            autoCorrect={false}
                            placeholder="Firstname"
                            placeholderTextColor={
                                success.firstname
                                    ? BaseColor.grayColor
                                    : BaseColor.primaryColor
                            }
                            value={firstname}
                        />

                        <TextInput
                            style={[BaseStyle.textInput, { marginTop: 10 }]}
                            onChangeText={text => this.setState({ lastname: text })}
                            autoCorrect={false}
                            placeholder="Lastname"
                            placeholderTextColor={
                                success.lastname
                                    ? BaseColor.grayColor
                                    : BaseColor.primaryColor
                            }
                            value={lastname}
                        />

                        <TextInput
                            style={[BaseStyle.textInput, { marginTop: 10 }]}
                            onChangeText={text => this.setState({ username: text })}
                            autoCorrect={false}
                            placeholder="Username"
                            placeholderTextColor={
                                success.username
                                    ? BaseColor.grayColor
                                    : BaseColor.primaryColor
                            }
                            value={username}
                        />


                        <TextInput
                            style={[BaseStyle.textInput, { marginTop: 10 }]}
                            onChangeText={text =>
                                this.setState({ email: text })
                            }
                            autoCorrect={false}
                            placeholder="Email"
                            keyboardType="email-address"
                            placeholderTextColor={
                                success.email
                                    ? BaseColor.grayColor
                                    : BaseColor.primaryColor
                            }
                            value={email}
                        />

                        <TextInput
                            secureTextEntry={true}
                            style={[BaseStyle.textInput, { marginTop: 10 }]}
                            onChangeText={text => this.setState({ password: text })}
                            autoCorrect={false}
                            placeholder="Password"
                            placeholderTextColor={
                                success.password
                                    ? BaseColor.grayColor
                                    : BaseColor.primaryColor
                            }
                            value={password}
                        />

                        <TextInput
                            secureTextEntry={true}
                            style={[BaseStyle.textInput, { marginTop: 10 }]}
                            onChangeText={text => this.setState({ passwordConfirm: text })}
                            autoCorrect={false}
                            placeholder="Password Confirmation"
                            placeholderTextColor={
                                success.passwordConfirm
                                    ? BaseColor.grayColor
                                    : BaseColor.primaryColor
                            }
                            value={passwordConfirm}
                        /> */}

                        <View>
                            <TouchableOpacity  disabled={this.state.disabledButton} onPress={() => this.onSubmit()} >
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
                        
                        
                    </View>
                </ScrollView>
                <DropdownAlert ref={ref => this.dropdown = ref} messageNumOfLines={10} closeInterval={10000} />

            </SafeAreaView>
        );
    }
}
