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
    
});

export default class CardCustomTitle extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
      
    }


    render() {

      const {
            title,
            desc
    } = this.props;
    var contentDesc=<View></View>
    if(desc != ""){
      contentDesc= <Text caption2 grayColor>
      {desc}
      </Text>
      }

        return (
          <View>
                                <View style={{marginTop: 20,marginLeft: 20,marginBottom: 10}}>
                                <Text body2 bold>
                                        {title}
                                    </Text>
                                   {contentDesc}
                                </View>
                                </View>
        )
    }
}

CardCustomTitle.propTypes = {
    title:PropTypes.string,
    desc:PropTypes.string
};

CardCustomTitle.defaultProps = {
    title:"",
    desc:""
};
