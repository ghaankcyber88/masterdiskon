import React, { Component } from "react";
import { View, TouchableOpacity, FlatList, Animated,StyleSheet } from "react-native";
import { Image, Text, Icon, StarRating, Tag } from "@components";
import { BaseColor } from "@config";
import PropTypes from "prop-types";
// import styles from "./styles";
import * as Utils from "@utils";

import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade
} from "rn-placeholder";

const styles = StyleSheet.create({
    //block css
    blockImage: {
        height: Utils.scaleWithPixel(200),
        width: "100%"
    },
    blockContentAddress: {
        flexDirection: "row",
        marginTop: 3,
        alignItems: "center"
    },
    blockContentDetail: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginTop: 10
    },
    blockListContentIcon: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: 50,
        width: "100%",
        marginTop: 4
    },
    contentService: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginTop: 10,
        borderColor: BaseColor.fieldColor,
        borderBottomWidth: 1
    },
    serviceItemBlock: {
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
        width: 60
    },
    //list css
    listImage: {
        height: Utils.scaleWithPixel(140),
        width: Utils.scaleWithPixel(120),
        borderRadius: 0
    },
    listContent: {
        flexDirection: "row"
    },
    listContentRight: {
        paddingHorizontal: 10,
        paddingVertical: 2,
        flex: 1
    },
    listContentRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5
    },
    //gird css
    girdImage: {
        borderRadius: 0,
        height: Utils.scaleWithPixel(120),
        width: "100%"
    },
    girdImageInFrame: {
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        height: Utils.scaleWithPixel(120),
        width: "100%"
    },
    girdContent: {
        flex: 1,
    },
    girdContentInFrame: {
        flex: 1,
        borderColor: BaseColor.textSecondaryColor,
        borderWidth: 2,
        backgroundColor: "#fff",
        borderRadius: 5,
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                //elevation: 5,
    },
    girdContentLocation: {
        flexDirection: "row",
        justifyContent: "flex-start",
        marginTop: 5
    },
    girdContentRate: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10
    }
});

export default class CardCustom extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loaded: false,
          imageOpacity: new Animated.Value(0.0),
          placeholderOpacity: new Animated.Value(1.0),
          placeholderScale: new Animated.Value(1.0),
        }
      
    }



       _onLoad = () => {
    const {
      placeholderScale,
      placeholderOpacity,
      imageOpacity
    } = this.state

    Animated.sequence([
      // Delay is just so here so it can be seen
      Animated.timing(placeholderOpacity, {
        delay: 1000,
        toValue: 1.0
      }),
      // Begin explode animation
      Animated.parallel([
        Animated.timing(placeholderScale, {
          toValue: 0.7,
          duration: 100,
          useNativeDriver: true
        }),
        Animated.timing(placeholderOpacity, {
          toValue: 0.66,
          duration: 100,
          useNativeDriver: true
        }),
      ]),
      Animated.parallel([
        Animated.parallel([
          Animated.timing(placeholderOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true
          }),
          Animated.timing(placeholderScale, {
            toValue: 1.2,
            duration: 200,
            useNativeDriver: true
          }),
        ]),
        Animated.timing(imageOpacity, {
          toValue: 1.0,
          delay: 200,
          duration: 300,
          useNativeDriver: true
        })
      ])
    ]).start(() => {
      this.setState(() => ({ loaded: true }))
    })
  }




    



    renderDefault() {
        const {
         
            style,
            item,
            propImage,
            propInframe,
            propTitle,
            propDesc,
            propPrice,
            propLeftRight,
            onPress,
            propOther,
            loading,
        } = this.props;


          const {
          placeholderColor,
          source
        } = this.props

        const {
          imageOpacity,
          placeholderOpacity,
          placeholderScale
        } = this.state
        
        var styleInnerText={};
        var color={}
        
        
        // if(this.props.property.innerText==true){
        //     styleInnerText={position: "absolute",bottom: -65,padding: 10};
        // }else{
        //     styleInnerText={padding: 10};
        //     color={}
        // }
        
        // var styleContent=styles.girdContent;
        // if(this.props.property.inFrame==true){
        //   styleContent=styles.girdContentInFrame;
        // }
        
        
        var content=<View></View>
        var contentImage=<View></View>
        var contentStar=<View></View>
        var contenInframe=<View></View>
        var contentText=<View></View>
        
        var contenInframeBottom=<View></View>
        var contenInframeTop=<View></View>
        
        var contentTextTitle=<View></View>
        var contentTextTitleDesc=<View></View>
        var contentTextTitlePrice=<View></View>
        var contentStartFrom=<View></View>
        var contentPrice=<View></View>
        
        var contentTextTitleLeftRight=<View></View>
        var contentLeft=<View></View>
        var contentRight=<View></View>
          
      //---------content untuk inframe---------//
      if(propInframe.top != ""){
        contenInframeTop=<View style={{margin:10,position: "absolute",top: 0,padding: 2,backgroundColor:'yellow',width:'auto',borderRadius:5}}
                                      
                                >
                                <Text
                                    body2
                                    bold
                                >
                              {propInframe.top}
                          </Text>
                        </View>
        }
        
        
        if(propInframe.bottom != ""){
          contenInframeBottom=<View style={{margin:10,position: "absolute",bottom: 0,padding: 2,backgroundColor:'yellow',width:'auto',borderRadius:5}}>
                                  <Text
                                      body2
                                      bold
                                  >
                                {propInframe.bottom}
                            </Text>
                          </View>
          }
          
        //---------content untuk inframe---------//
        
        
        //---------content untuk image-----------//
        if(loading==true){
          contentImage=<Placeholder
                  Animation={Fade}
                  style={{marginTop: 5}}
                >
                    <PlaceholderLine width={100} height={Utils.scaleWithPixel(propImage.height)} style={{marginTop: 2,marginBottom:0,borderRadius: 5}} />
                </Placeholder>
        }else{
          contentImage=<View style={{flex: 1}}><Image source={{uri :propImage.url}} 
                    style={{
                    borderRadius: 0,
                    height: Utils.scaleWithPixel(propImage.height),
                    width: "100%"
                    }}
                    onLoad={this._onLoad} 
              />
              {contenInframeTop}
              {contenInframeBottom}
              </View>
        
        }
        
        //---------content untuk image-----------//
        
        
        
        //---------content untuk text-----------//
        if(loading==true){
          contentText=<Placeholder
                        Animation={Fade}
                        style={{marginTop: 5}}
                      >
                          <PlaceholderLine width={50} style={{marginTop: 2,marginBottom:0,borderRadius: 0}} />
                          <PlaceholderLine width={100} style={{marginTop: 2,marginBottom:0}} />
                          <PlaceholderLine width={50} style={{marginTop: 2,marginBottom:0}} />
                      </Placeholder>
        }else{
          
          if(propTitle.text != ""){
            contentTextTitle=<View style={{marginTop: 10}}>
                            <Text
                                body2
                                bold
                                numberOfLines={1}
                            >
                                {propTitle.text}
                            </Text>
                          </View>
          }
          
          
          if(propDesc.text != ""){
            contentTextTitleDesc=<View style={{marginTop: 0}}>
                            <Text
                                caption2 grayColor
                                numberOfLines={2}
                            >
                                {propDesc.text}
                            </Text>
                          </View>
          }
          
         
          
          
         
          if(propPrice.startFrom == true){
            contentStartFrom=<Text
                                body2
                                style={{marginTop:2}}
                            >
                                Start From
                            </Text>
                          
          }
          
          
          if(propPrice.price != ""){
            contentPrice=<Text
                                body1
                                bold
                                style={{marginLeft:10,color:BaseColor.thirdColor}}
                            >
                                {propPrice.price}
                            </Text>
                          
          }
          
          
        contentTextTitlePrice=<View style={{flex: 1,flexDirection: "row"}}>{contentStartFrom}{contentPrice}</View>
          
          if(propLeftRight.left != ""){
            contentLeft=<View style={{flex: 5,
                                        alignItems: "flex-start",
                                        justifyContent: "center",}}
                                        
                                  >
                                  <Text
                                      body2
                                      bold
                                  >
                                {propLeftRight.left}
                            </Text>
                          </View>
          }
          
          
          if(propLeftRight.right != ""){
            contentRight=<View style={{flex: 5,
                                        alignItems: "flex-end",
                                        justifyContent: "center",}}
                                        
                                  >
                                  <Text
                                      body2
                                      bold
                                  >
                                {propLeftRight.right}
                            </Text>
                          </View>
          }
          
          
        contentTextTitleLeftRight=<View style={{flex: 1,flexDirection: "row"}}>{contentLeft}{contentRight}</View>
                          
                          
        contentText=<View style={{flex: 1}}>
                    {contentTextTitle}
                    {contentTextTitleDesc}
                    {contentTextTitlePrice}
                    {contentTextTitleLeftRight}
                    </View>
        
        }
        
        //---------content untuk text-----------//
        var marginBottom=0;
        var styleCustom={};
        if(propOther.horizontal==false){
          styleCustom.marginBottom=10;
        }else{
          styleCustom.marginLeft=20;
        }
        styleCustom.width=Utils.scaleWithPixel(propOther.width)
        return (
            <View style={[styleCustom,style]}>
                <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
                    {contentImage}
                    {contentText}
                </TouchableOpacity>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
            </View>
        );
    }
    

    render() {
        return this.renderDefault();
    }
}

CardCustom.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    item: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    propImage :PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    propInframe :PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    propTitle :PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    propDesc :PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    propPrice :PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    propLeftRight :PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    propOther:PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onPress : PropTypes.func,
    loading : PropTypes.bool,
};

CardCustom.defaultProps = {
    // style: {},
    // item: {},
    // img: "",
    // imgHeight:150,
    // titleIcon:{text:"xxx",icon:"home"},
    // title: "",
    // subtitle: "",
    // subtitle2: "",
    // star:"",
    // onPress: () => {},
    // onPressTag: () => {},
    //  loading: true,
    //  type:"default",
    //  property:{inFrame:true,innerText:false},
    //  subtitleLeftRight:{enable:false,textLeft:"",textRight:""}
     
     
     
    style: {},
    item: {},
    propImage :{},
    propInframe :{},
    propTitle :{},
    propDesc :{},
    propPrice :{},
    propLeftRight :{},
    propOther : {},
    onPress: () => {},
    loading : true,
};
