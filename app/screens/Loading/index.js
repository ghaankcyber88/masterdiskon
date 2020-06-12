import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthActions } from "@actions";
import { ActivityIndicator, View } from "react-native";
import { bindActionCreators } from "redux";
import { Images, BaseColor } from "@config";
import SplashScreen from "react-native-splash-screen";
import { Image, Text } from "@components";
import styles from "./styles";

class Loading extends Component {
    constructor(props) {
        super(props);
    }



    onProcess() {
        
        if(this.props.navigation.state.params && this.props.navigation.state.params.redirect){
            var redirect=this.props.navigation.state.params.redirect;
        }else{
            var redirect='';
        }
        
        if(this.props.navigation.state.params && this.props.navigation.state.params.param){
            var param=this.props.navigation.state.params.param;
        }else{
            var param='';
        }
        
        
        SplashScreen.hide();
        let { navigation, auth } = this.props;
        let status = auth.login.success;
       

        if(redirect != ''){
            setTimeout(() => {
                navigation.navigate(redirect,{param:param});
            }, 500);

        }else{
            switch (status) {
                case true:
                    setTimeout(() => {
                        navigation.navigate("Main");
                    }, 500);
                    break;
                case false:
                    setTimeout(() => {
                        navigation.navigate("Walkthrough");
                    }, 500);
                    break;
                default:
                    break;
            }
        }
    }

    componentWillMount() {
        this.props.actions.authentication(false, response => {});
    }

    componentDidMount() {
        this.onProcess();
    }

    render() {
        return (
            <View style={styles.container}>
                {/* <Image
                    source={Images.logo}
                    style={styles.logo}
                    resizeMode="contain"
                /> */}
                <View
                    style={{
                        position: "absolute",
                        top: 220,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    {/* <Text title1 whiteColor semibold>
                        MasterDiskon
                    </Text> */}
                    <ActivityIndicator
                        size="large"
                        // color={BaseColor.whiteColor}
                        style={{
                            marginTop: 20
                        }}
                    />
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(AuthActions, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Loading);
