import { StyleSheet,Dimensions } from "react-native";
import { BaseColor } from "@config";
import * as Utils from "@utils";

const { width } = Dimensions.get('window')

export default StyleSheet.create({
    imageBackground: {
        height: 140,
        width: "100%",
        position: "absolute"
    },
    searchForm: {
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: BaseColor.fieldColor,
        backgroundColor: BaseColor.whiteColor,
        width: "90%",
        shadowColor: "black",
        shadowOffset: { width: 1.5, height: 1.5 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
        elevation: 1
    },
    contentServiceIcon: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-around"
    },
    contentCartPromotion: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "flex-start"
    },
    btnPromotion: {
        height: 25,
        borderRadius: 3,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    contentHiking: {
        marginTop: 20,
        marginLeft: 20,
        marginBottom: 10
    },
    promotionBanner: {
        height: Utils.scaleWithPixel(100),
        width: "100%",
        marginTop: 10
    },
    line: {
        height: 1,
        backgroundColor: BaseColor.textSecondaryColor,
        marginTop: 10,
        marginBottom: 20
    },
    iconContent: {
        justifyContent: "center",
        alignItems: "center",
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: BaseColor.fieldColor
    },
    itemService: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        paddingTop: 10
    },
    promotionItem: {
        borderRadius: 8,
        width: Utils.scaleWithPixel(200),
        height: Utils.scaleWithPixel(250)
    },
    tourItem: {
        borderRadius: 8,
        width: Utils.scaleWithPixel(135),
        height: Utils.scaleWithPixel(160)
    },




    wrapper: {},
     slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  image: {
    flex: 1,
    borderRadius: 10,
     width: "100%",
     height: "100%"
  },
  paginationStyle: {
    position: 'absolute',
    bottom: -25,
    right: 10
  },
  paginationText: {
    color: BaseColor.default,
    fontSize: 20
  }
});
