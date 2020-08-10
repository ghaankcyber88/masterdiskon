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
        borderRadius: 8
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
        borderRadius: 8,
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
        borderBottomColor: BaseColor.textSecondaryColor,
        borderBottomWidth: 1,
        backgroundColor: "#fff",
        borderRadius: 8,
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                elevation: 5,
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




    



     /**
     * Display hotel item as grid
     */
    renderDefault() {
        const {
            style,
            img,
            title,
            subtitle,
            subtitle2,
            onPress,
            loading,
            item,
            imgHeight
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
        if(this.props.property.innerText==true){
            styleInnerText={position: "absolute",bottom: 0,padding: 10};
            color={color:BaseColor.whiteColor}
        }else{
            styleInnerText={padding: 10};
            color={}
        }
        
        var styleContent=styles.girdContent;
        if(this.props.property.inFrame==true){
          styleContent=styles.girdContentInFrame;
        }
        return (
            <View style={[styleContent, style]}>
                <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
                    {/* <Image source={{uri :img}} 
                      style={{
                            borderRadius: 8,
                            height: Utils.scaleWithPixel(imgHeight),
                            width: "100%"
                            }}
                      onLoad={this._onLoad} /> */}
                     {/* {!this.state.loaded &&
                        <Animated.View
                          style={[
                            //styles.girdImage,
                            {
                              borderRadius: 8,
                              height: Utils.scaleWithPixel(imgHeight),
                              width: "100%",
                              backgroundColor: placeholderColor || BaseColor.fieldColor,
                              opacity: placeholderOpacity,
                              position: 'absolute',
                              transform: [{ scale: placeholderScale }]
                            }
                          ]} />
                        
                      } */}
                      {
                    loading ?
                    <Placeholder
                                      Animation={Fade}
                                      style={{marginTop: 5}}
                                    >
                                        <PlaceholderLine width={100} height={Utils.scaleWithPixel(imgHeight)} style={{marginTop: 2,marginBottom:0,borderRadius: 5}} />
                                    </Placeholder>
                    :
                    <Image source={{uri :img}} 
                    style={{
                          borderRadius: 8,
                          height: Utils.scaleWithPixel(imgHeight),
                          width: "100%"
                          }}
                    onLoad={this._onLoad} />
                        }
                    
                    
                </TouchableOpacity>

                {
                    loading ?
                    <View style={styleInnerText}>
                    <Placeholder
                                      Animation={Fade}
                                      style={{marginTop: 5}}
                                    >
                                        <PlaceholderLine width={50} style={{marginTop: 2,marginBottom:0,borderRadius: 5}} />
                                        <PlaceholderLine width={100} style={{marginTop: 2,marginBottom:0}} />
                                        <PlaceholderLine width={50} style={{marginTop: 2,marginBottom:0}} />
                                    </Placeholder>
                    </View>
 

                :             
                <View style={styleInnerText}>
                    {this.props.titleIcon.text != "" ?
                    <View style={{flexDirection: "row",marginTop: 3,alignItems: "center"}}>
                        <Icon
                            name="map-marker-alt"
                            color={BaseColor.lightPrimaryColor}
                            size={10}
                        />
                        <Text
                            caption1
                            grayColor
                            style={color}
                            numberOfLines={1}
                        >
                            {this.props.titleIcon.text}
                        </Text>
                    </View>
                    :
                    <View></View>
                    }
                    <View style={{marginTop: 0}}>
                      <Text
                          body2
                          semibold
                          numberOfLines={2}
                          style={[color,{height:40}]}
                      >
                          {title}
                      </Text>
                    </View>
                    {subtitle != "" ?
                    <View style={{marginTop: 0}}>
                        <Text caption2 grayColor>
                            {subtitle}
                        </Text>
                    </View>
                    :
                    <View></View>
                    }
                    {subtitle2 != "" ?
                    <Text
                        title3
                        primaryColor
                        semibold
                        style={{
                            marginTop: 0
                        }}
                    >
                        {subtitle2}
                    </Text>
                    :
                    <View></View>
                    }
               
                   
                </View>
                 }
            </View>
        );
    }
    

    render() {
        return this.renderDefault();
        // if(this.props.property.inFrame==false){
        //     return this.renderDefault();
        // }else{
        //     return this.renderInFrame();
        // }
    }
}

CardCustom.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    item: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    img: PropTypes.node.isRequired,
    imgHeight: PropTypes.node.number,
    titleIcon: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    title: PropTypes.string,
    subtitle: PropTypes.string,
    subtitle2: PropTypes.string,
    type: PropTypes.string,
    loading:PropTypes.bool,
    property: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    subtitleLeftRight: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

CardCustom.defaultProps = {
    style: {},
    item: {},
    img: "",
    imgHeight:150,
    titleIcon:{text:"xxx",icon:"home"},
    title: "",
    subtitle: "",
    subtitle2: "",
    onPress: () => {},
    onPressTag: () => {},
     loading: true,
     type:"default",
     property:{inFrame:true,innerText:false},
     subtitleLeftRight:{enable:false,textLeft:"",textRight:""}
};
