import React, { Component } from "react";
import { View, ScrollView, TextInput } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, Button } from "@components";
import styles from "./styles";
import DropdownAlert from 'react-native-dropdownalert';

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {

            // name: "",
            firstname:"",
            lastname:"",
            username:"",
            password:"",
            passwordKonfirm:"",
            email: "",
            // address: "",


            loading: false,
            success: {
                // name: true,
                firstname: true,
                lastname:true,
                username:true,
                password:true,
                passwordKonfirm:true,
                email: true,
                // address: true
            }
        };
    }

    onSignUp() {
        const { navigation } = this.props;
        let { name,firstname,lastname,username,password,passwordKonfirm, email, address, success } = this.state;

        if (firstname == "" || lastname == "" || username == "" || password == "" || passwordKonfirm == "" || email == "") {
            this.setState({
                success: {
                    ...success,
                    firstname: firstname != "" ? true : false,
                    lastname: lastname != "" ? true : false,
                    username: username != "" ? true : false,
                    password: password != "" ? true : false,
                    passwordKonfirm: passwordKonfirm != "" ? true : false,
                    email: email != "" ? true : false,
                }
            });
        } else {
            this.setState({ loading: true }, () => {
                var data={"firstname":firstname,"lastname":lastname,"username":username,"password":password,"passwordKonfirm":passwordKonfirm,"email":email}
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

    render() {
        const { navigation } = this.props;
        let { loading,firstname,lastname,username,password,passwordKonfirm,email, success } = this.state;
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
                        <TextInput
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
                            style={[BaseStyle.textInput, { marginTop: 10 }]}
                            onChangeText={text => this.setState({ passwordKonfirm: text })}
                            autoCorrect={false}
                            placeholder="Password Confirmation"
                            placeholderTextColor={
                                success.passwordKonfirm
                                    ? BaseColor.grayColor
                                    : BaseColor.primaryColor
                            }
                            value={passwordKonfirm}
                        />


                        {/* <TextInput
                            style={[BaseStyle.textInput, { marginTop: 10 }]}
                            onChangeText={text =>
                                this.setState({ address: text })
                            }
                            autoCorrect={false}
                            placeholder="Address"
                            placeholderTextColor={
                                success.address
                                    ? BaseColor.grayColor
                                    : BaseColor.primaryColor
                            }
                            value={address}
                        /> */}
                        <View style={{ width: "100%" }}>
                            <Button
                                full
                                style={{ marginTop: 20 }}
                                loading={loading}
                                onPress={() => this.onSignUp()}
                            >
                                Sign Up
                            </Button>
                        </View>
                    </View>
                </ScrollView>
                <DropdownAlert ref={ref => this.dropdown = ref} messageNumOfLines={10} closeInterval={10000} />

            </SafeAreaView>
        );
    }
}
