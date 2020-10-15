import React, { Component } from "react";
import { View, TouchableOpacity, FlatList, Animated,StyleSheet } from "react-native";
import { Image, Text, Icon, StarRating, Tag } from "@components";
import { BaseColor } from "@config";
import PropTypes from "prop-types";
// import styles from "./styles";
import * as Utils from "@utils";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";

import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade
} from "rn-placeholder";

const styles = StyleSheet.create({
    
});

export default class CardCustom extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
      
    }



    renderDefault() {
        const {
         
            style,
            propImage,
            propInframe,
            propTitle,
            propDesc,
            propPrice,
            propStar,
            propLeftRight,
            onPress,
            propOther,
            loading,
        } = this.props;


        
        var contentImage=<View></View>
        var contentStar=<View></View>
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
        var contentStar=<View></View>
          
      //---------content untuk inframe---------//
      if(propInframe.top != ""){
        contenInframeTop=<View style={{margin:10,position: "absolute",top: 0}}
                                      
                                >
                                <Text
                                    body2
                                    bold
                                    style={{color:BaseColor.whiteColor}}
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
                                {(propInframe.bottom.replace(/_/gi, ' ')).toUpperCase()}
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
          var styleCustomImage={
                              borderRadius: 0,
                              height: Utils.scaleWithPixel(propImage.height),
                              width: "100%"
          }
        if(propOther.inFrame==true){
          styleCustomImage.borderTopRightRadius=8;
          styleCustomImage.borderTopLeftRadius=8;
        }else{
          styleCustomImage.borderRadius=8;
        } 
          contentImage=<View style={{flex: 1}}>
              <Image source={{uri :propImage.url}} 
                    style={styleCustomImage}
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
            var styles={}
            if(propPrice.startFrom == true){
              styles={marginLeft:10,color:BaseColor.thirdColor}
            }else{
              styles={marginLeft:0,color:BaseColor.thirdColor}
            }
            
            if(propOther.horizontal==false){
              contentPrice=<Text
                                body2
                                bold
                                style={styles}
                            >
                                {propPrice.price}
                            </Text>
            }else{
              contentPrice=<Text
                                body1
                                bold
                                style={styles}
                            >
                                {propPrice.price}
                            </Text>
            
            }
            
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
        
        if(propStar.enabled==true){
        contentStar=<View style={{flexDirection: "row",
                                justifyContent: "space-between"}}>
                      <StarRating
                          disabled={true}
                          starSize={12}
                          maxStars={5}
                          rating={propStar.rating}
                          //selectedStar={rating => {}}
                          fullStarColor={BaseColor.yellowColor}
                      />
                      {/* <Text caption2 grayColor>
                          {10} reviews
                      </Text> */}
                  </View>
        }
        
        var styleCustomText={flex:1}
        if(propOther.inFrame==true){
          styleCustomText.paddingHorizontal=10;
          styleCustomText.borderBottomRightRadius=8;
          styleCustomText.borderBottomLeftRadius=8;
          styleCustomText.borderWidth= 1;
          styleCustomText.borderColor= BaseColor.dividerColor;
          styleCustomText.borderStyle="solid";
          styleCustomText.paddingBottom=20;
          styleCustomText.backgroundColor=BaseColor.whiteColor;
          //styleCustomText.elevation=5;
          styleCustomText.shadowColor="#000";
          styleCustomText.shadowOpacity=0.25;
          styleCustomText.shadowRadius=3.84;
                                
                                
        } 
        contentText=<View style={styleCustomText}>
                    {contentTextTitle}
                    {contentTextTitleDesc}
                    {contentTextTitlePrice}
                    {contentStar}
                    {contentTextTitleLeftRight}
                    </View>
        
        }
        
        //---------content untuk text-----------//
        var marginBottom=0;
        var styleCustom={};
        if(propOther.horizontal==false){
          //styleCustom.marginBottom=10;
          styleCustom.width=propOther.width;
        }else{
          styleCustom.marginLeft=20;
          styleCustom.borderRadius=5;
          styleCustom.width=propOther.width;
          styleCustom.marginLeft=20;
        }
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
    propImage :PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    propInframe :PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    propTitle :PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    propDesc :PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    propPrice :PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    propLeftRight :PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    propStar :PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    propOther:PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onPress : PropTypes.func,
    loading : PropTypes.bool,
    grid: PropTypes.bool,
};

CardCustom.defaultProps = {
    style: {},
    propImage :{},
    propInframe :{},
    propTitle :{},
    propDesc :{},
    propPrice :{},
    propLeftRight :{},
    propStar : {},
    propOther : {},
    onPress: () => {},
    loading : true,
    grid: false,
};
