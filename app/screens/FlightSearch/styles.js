import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
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
