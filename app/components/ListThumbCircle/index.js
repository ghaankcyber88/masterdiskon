import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { Image, Text,Icon } from "@components";
import styles from "./styles";
import { BaseStyle, BaseColor } from "@config";
import PropTypes from "prop-types";
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade
} from "rn-placeholder";


export default class ListThumbCircle extends Component {
    render() {
        const {
            style,
            imageStyle,
            image,
            txtLeftTitle,
            txtContent,
            txtRight,
            onPress,
            loading
        } = this.props;
        return (
            <TouchableOpacity
                style={[styles.item, style]}
                onPress={onPress}
                activeOpacity={0.9}
            >
            {

                loading ?
                <Placeholder
                    Animation={Fade}
                    Left={PlaceholderMedia}
                    Right={PlaceholderMedia}
                  >
                    <PlaceholderLine width={80} />
                    <PlaceholderLine />
                    <PlaceholderLine width={30} />
                  </Placeholder>
                :
                <View style={styles.contain}>
                    {/* <Image source={image} style={[styles.thumb, imageStyle]} /> */}
                                <Icon
                                    name={'paper-plane'}
                                    color={BaseColor.primaryColor}
                                    size={18}
                                    solid
                                    style={{ marginRight: 10,marginTop:10 }}
                                />
                    <View style={styles.content}>
                        <View style={styles.left}>
                            <Text headline semibold>
                                {txtLeftTitle}
                            </Text>
                            <Text
                                note
                                numberOfLines={2}
                                // footnote
                                grayColor
                                style={{
                                    paddingTop: 5
                                }}
                            >
                                {txtContent}
                            </Text>
                        </View>
                        <View style={styles.right}>
                            <Text caption2 grayColor>
                                {txtRight}
                            </Text>
                        </View>
                    </View>
                </View>
            }
            </TouchableOpacity>
        );
    }
}

ListThumbCircle.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    imageStyle: PropTypes.object,
    image: PropTypes.node.isRequired,
    txtLeftTitle: PropTypes.string,
    txtContent: PropTypes.string,
    txtRight: PropTypes.string,
    onPress: PropTypes.func,
    loading: PropTypes.bool
};

ListThumbCircle.defaultProps = {
    style: {},
    imageStyle: {},
    image: "",
    txtLeftTitle: "",
    txtContent: "",
    txtRight: "",
    onPress: () => {},
    loading: true,
};
