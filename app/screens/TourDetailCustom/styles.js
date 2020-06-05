import { StyleSheet } from "react-native";
import { BaseColor } from "@config";
import * as Utils from "@utils";

export default StyleSheet.create({
    location: {
        flexDirection: "row",
        marginTop: 10
    },
    contentTag: {
        marginLeft: 20,
        marginTop: 10,
        width: 80,
        alignItems: "center",
        justifyContent: "center"
    },
    tabbar: {
        backgroundColor: "white",
        height: 40
    },
    tab: {
        width: 130
    },
    indicator: {
        backgroundColor: BaseColor.primaryColor,
        height: 1
    },
    label: {
        fontWeight: "400"
    },
    contentImageGird: {
        flexDirection: "row",
        height: Utils.scaleWithPixel(160),
        marginTop: 10
    },
    tourItem: {
        width: 160
    },
    contentButtonBottom: {
        borderTopColor: BaseColor.textSecondaryColor,
        borderTopWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },




    container: {
        alignSelf: 'center',
        marginTop: 100,
        width: 200,
        overflow: 'hidden', // for hide the not important parts from circle
        margin: 10,
        height: 100,
      },
      background: { // this shape is a circle 
        borderRadius: 400, // border borderRadius same as width and height
        width: 400,
        height: 400,
        marginLeft: -100, // reposition the circle inside parent view
        position: 'absolute',
        bottom: 0, // show the bottom part of circle
        overflow: 'hidden', // hide not important part of image
      },
      image: {
        height: 100, // same width and height for the container
        width: 200,
        position: 'absolute', // position it in circle
        bottom: 0, // position it in circle
        marginLeft: 100, // center it in main view same value as marginLeft for circle but positive
      }
});
