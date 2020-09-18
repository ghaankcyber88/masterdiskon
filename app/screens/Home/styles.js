import {
  StyleSheet,
  Dimensions
} from "react-native";
import {
  BaseColor
} from "@config";
import * as Utils from "@utils";

const sWidth = Dimensions.get('window').width;
const sHeight = Dimensions.get('window').height;
const ratio = sWidth / sHeight; //sWidth = ratio * sHeight

const {
  width
} = Dimensions.get('window');
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";

export default StyleSheet.create({

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
  btnPromotion2: {
    height: 40,
    borderRadius: 3,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  contentHiking: {
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 10
  },
  contentHiking2: {
    marginTop: 40,
    marginLeft: 20,
    // marginBottom: 10
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
    width: 70,
    height: 70,
    borderRadius: 18,
    backgroundColor: BaseColor.secondColor,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    //elevation: 5,
    marginBottom: 5
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
    height: Utils.scaleWithPixel(135)
  },



  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',

    //backgroundColor: BaseColor.primaryColor,
    zIndex: 1,
    flex: 1,

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
  },



  blockView: {
    paddingVertical: 10,
    // borderBottomWidth: 0.5,
  },
  //   titleAbout: {
  //     position: "absolute",
  //     top: 0,
  //     left: 0,
  //     right: 0,
  //     bottom: 0,
  //     justifyContent: "center",
  //     alignItems: "center"
  //   }




  containerSwipper: {
    width: sWidth,
    //height: sHeight,
    height: wp("50%"),
    backgroundColor: '#fff'
  },
  top_background: {
    width: sHeight * 2,
    //height: sHeight * 2,
    height: sHeight * 6,
    borderRadius: sHeight * 1,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    backgroundColor: BaseColor.primaryColor,
    alignItems: 'center',
    marginLeft: ((ratio * sHeight) * 0.5) - (sHeight),
    marginTop: -sHeight * 1.7,
    paddingTop: sHeight * 1.7,
  },
  top_content: {
    paddingTop: sHeight * 0.002,
    width: sWidth,
    height: sHeight * 0.3,
    alignItems: 'center',
  },
  text1: {
    fontSize: 14,
    color: '#fff'
  },
  text2: {
    marginTop: sHeight * 0.1,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff'
  },

  imgProfile: {
    width: 35,
    height: 35,
    //borderRadius: 60,
    //marginBottom: 10
  },

  carouselContainer: {
    height: 200
  },
  carousel: {
    flex: 1
  },


  imgBanner: {
    width: "100%",
    height: 250,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center"
  },
});
