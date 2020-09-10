import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthActions } from "@actions";
import { ActivityIndicator, View } from "react-native";
import { bindActionCreators } from "redux";
import { Images, BaseColor } from "@config";
import SplashScreen from "react-native-splash-screen";
import { Image, Text } from "@components";
import styles from "./styles";

class Redirect extends Component {
    constructor(props) {
        super(props);
    }

    onProcess() {
        var redirect=this.props.navigation.state.params.redirect;
        //alert(redirect);
        SplashScreen.hide();
        let { navigation, auth } = this.props;
        let status = auth.login.success;
       
        switch (status) {
            case true:
                setTimeout(() => {
                    navigation.navigate(redirect);
                }, 500);
                break;
            case false:
                setTimeout(() => {
                    navigation.navigate(redirect);
                }, 500);
                break;
            default:
                break;
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
                <Image
                    source={Images.logo}
                    style={styles.logo}
                    resizeMode="contain"
                />
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
                    <Text title1 whiteColor semibold>
                        MasterDiskon
                    </Text>
                    <ActivityIndicator
                        size="large"
                        color={BaseColor.blackColor}
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
)(Redirect);
