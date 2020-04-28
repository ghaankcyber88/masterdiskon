import React from "react";
import { StyleSheet } from "react-native";
import { BaseColor, BaseStyle } from "@config";

export default StyleSheet.create({
    contentButtonBottom: {
        borderTopColor: BaseColor.textSecondaryColor,
        borderTopWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    blockView: {
        paddingVertical: 10,
        borderBottomColor: BaseColor.textSecondaryColor,
        borderBottomWidth: 1
    },



    //FlightItemCustom
    content: {
        padding: 10,
        borderRadius: 8,
        backgroundColor: BaseColor.fieldColor,
    },
    contentTop: {
        flexDirection: "row",
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderColor: BaseColor.textSecondaryColor
    },
    line: {
        width: "100%",
        height: 1,
        borderWidth: 0.5,
        borderColor: BaseColor.dividerColor,
        borderStyle: "dashed"
    },
    contentLine: {
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    dot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: BaseColor.primaryColor,
        position: "absolute"
    },
    contentBottom: {
        flexDirection: "row",
        marginTop: 10,
        justifyContent: "space-between"
    },
    bottomLeft: { flexDirection: "row", alignItems: "center" },
    image: { width: 32, height: 32, marginRight: 10, borderRadius: 16 },


    //flightplan
    contentRow: { flexDirection: "row" },
    centerView: {
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 10
    },
    colCenter: { flex: 1, alignItems: "center" },



    line: {
        width: "100%",
        height: 2,
        borderWidth: 1,
        borderColor: BaseColor.dividerColor,
        borderStyle: "dotted",
    },


    

});
