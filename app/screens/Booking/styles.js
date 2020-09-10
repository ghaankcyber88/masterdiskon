import React from "react";
import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
    contain: {
        flex: 1
    },
    contentActionBottom: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 25
    },

    tabbar: {
        backgroundColor: "white",
        height: 40,
        // paddingHorizontal: '15%',
        // alignItems: "center",
        // justifyContent: 'center',
        //textAlign: 'center'
    },
    tab: {
        width: 100
    },
    indicator: {
        backgroundColor: BaseColor.primaryColor,
        height: 1
    },
    label: {
        fontWeight: "400"
    },
    // containProfileItem: {
    //     paddingLeft: 20,
    //     paddingRight: 20
    // },
    // profileItem: {
    //     flexDirection: "row",
    //     justifyContent: "space-between",
    //     alignItems: "center",
    //     borderBottomColor: BaseColor.textSecondaryColor,
    //     borderBottomWidth: 1,
    //     paddingBottom: 20,
    //     paddingTop: 20
    // },
    noLabel: {
        display: 'none',
        height: 0
    },
    
    
    
    contentRange: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,
        marginTop: 10
    },
    contentResultRange: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10
    },
    contentList: {
        flexDirection: "row",
        paddingTop: 10,
        paddingBottom: 20,
    },
    contentQuest: {
        height: 85,
        justifyContent: "space-between",
        marginTop: 10
    },
    lineRow: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    iconRight: {
        width: 100,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    interioItem: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginLeft: 20,
        alignItems: "center",
        justifyContent: "center"
    }
});
