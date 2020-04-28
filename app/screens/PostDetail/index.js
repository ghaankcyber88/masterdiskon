import React, { Component } from "react";
import { View, ScrollView, Animated,Dimensions } from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import {
    Header,
    SafeAreaView,
    Icon,
    Text,
    ProfileAuthor,
    ProfileGroup,
    Card,
    PostListItem
} from "@components";
import * as Utils from "@utils";
import styles from "./styles";
import { DataMasterDiskon } from "@data";
import HTML from 'react-native-render-html';
import { WebView } from 'react-native-webview';


export default class PostDetail extends Component {
    constructor(props) {
        var item=props.navigation.state.params.item;
        super(props);
        this.state = {
            item:item,
            DataMasterDiskon:DataMasterDiskon[0]

        };
        this._deltaY = new Animated.Value(0);
    }

    render() {
        const heightHeader = Utils.heightHeader();
        const heightImageBanner = Utils.scaleWithPixel(250);
        const marginTopBanner = heightImageBanner - heightHeader - 30;
        const { navigation } = this.props;
        const { item } = this.state;

        return (
            <View style={{ flex: 1 }}>
                <Animated.Image
                    //source={Images.room6}
                    source={{uri : this.state.DataMasterDiskon.site+'assets/upload/blog/post/'+item.featured_image}}
                    style={[
                        styles.imgBanner,
                        {
                            height: this._deltaY.interpolate({
                                inputRange: [
                                    0,
                                    Utils.scaleWithPixel(195),
                                    Utils.scaleWithPixel(195)
                                ],
                                outputRange: [
                                    heightImageBanner,
                                    heightHeader,
                                    heightHeader
                                ]
                            })
                        }
                    ]}
                />
                <SafeAreaView
                    style={BaseStyle.safeAreaView}
                    forceInset={{ top: "always" }}
                >
                    <Header
                        title=""
                        renderLeft={() => {
                            return (
                                <Icon
                                    name="arrow-left"
                                    size={20}
                                    color={BaseColor.whiteColor}
                                />
                            );
                        }}
                        renderRight={() => {
                            return (
                                <Icon
                                    name="bookmark"
                                    solid
                                    size={20}
                                    color={BaseColor.whiteColor}
                                />
                            );
                        }}
                        onPressLeft={() => {
                            navigation.goBack();
                        }}
                        onPressRight={() => { }}
                    />
                    <ScrollView
                        onScroll={Animated.event([
                            {
                                nativeEvent: {
                                    contentOffset: { y: this._deltaY }
                                }
                            }
                        ])}
                        scrollEventThrottle={8}
                    >
                        <View
                            style={{
                                paddingHorizontal: 20,
                                marginBottom: 20,
                                marginTop: marginTopBanner
                            }}
                        >
                            <Text
                                headline
                                semibold
                                whiteColor
                                numberOfLines={1}
                            >
                                {item.title}
                            </Text>
                            <ProfileAuthor
                                image={Images.profile2}
                                name={item.name_author}
                                description={item.date_added}
                                textRight={item.date_added}
                                style={{
                                    marginTop: 20
                                }}
                            />
                          
                            <HTML body2 html={item.content_blog} imagesMaxWidth={Dimensions.get('window').width} />
                           
                            {/* <Text
                                headline
                                semibold
                                style={{
                                    marginTop: 20
                                }}
                            >
                                User Following
                            </Text> */}
                            {/* <ProfileGroup
                                name="Steve, Lincoln, Harry"
                                detail="and 15 people like this"
                                users={[
                                    { image: Images.profile1 },
                                    { image: Images.profile3 },
                                    { image: Images.profile4 }
                                ]}
                            /> */}
                            {/* <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginTop: 20
                                }}
                            >
                                <Text headline semibold>
                                    Top experiences
                                </Text>
                                <Text footnote grayColor>
                                    Show more
                                </Text>
                            </View> */}
                            {/* Image gallery */}
                            {/* <View style={styles.contentImageFollowing}>
                                <View style={{ flex: 4, marginRight: 10 }}>
                                    <Card
                                        style={{ borderRadius: 8 }}
                                        image={Images.trip7}
                                    >
                                        <Text headline semibold whiteColor>
                                            Dallas
                                        </Text>
                                    </Card>
                                </View>
                                <View style={{ flex: 6 }}>
                                    <View style={{ flex: 1 }}>
                                        <Card
                                            style={{ borderRadius: 8 }}
                                            image={Images.trip3}
                                        >
                                            <Text headline semibold whiteColor>
                                                Warsaw
                                            </Text>
                                        </Card>
                                    </View>
                                    <View
                                        style={{
                                            flex: 1,
                                            flexDirection: "row",
                                            marginTop: 10
                                        }}
                                    >
                                        <View
                                            style={{ flex: 6, marginRight: 10 }}
                                        >
                                            <Card
                                                style={{
                                                    borderRadius: 8
                                                }}
                                                image={Images.trip4}
                                            >
                                                <Text
                                                    headline
                                                    semibold
                                                    whiteColor
                                                >
                                                    Yokohama
                                                </Text>
                                            </Card>
                                        </View>
                                        <View style={{ flex: 4 }}>
                                            <Card
                                                style={{ borderRadius: 8 }}
                                                image={Images.trip6}
                                            >
                                                <Text
                                                    headline
                                                    semibold
                                                    whiteColor
                                                >
                                                    10+
                                                </Text>
                                            </Card>
                                        </View>
                                    </View>
                                </View>
                            </View> */}
                            {/* Featured Posts */}
                            {/* <Text
                                headline
                                semibold
                                style={{
                                    marginTop: 20
                                }}
                            >
                                Featured Posts
                            </Text>
                            <PostListItem
                                title="See The Unmatched"
                                description="Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui Donec rutrum congue leo eget malesuada. Vivamus suscipit tortor eget felis porttitor volutpat. Sed porttitor lectus nibh. Nulla quis lorem ut libero malesuada feugiat. Quisque velit nisi, pretium ut lacinia in, elementum id enim."
                                style={{ marginTop: 10, width: '100%' }}
                                image={Images.trip9}
                                onPress={() => {
                                    navigation.navigate("Post");
                                }}
                            />
                            <PostListItem
                                description="Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui Donec rutrum congue leo eget malesuada. Vivamus suscipit tortor eget felis porttitor volutpat. Sed porttitor lectus nibh. Nulla quis lorem ut libero malesuada feugiat. Quisque velit nisi, pretium ut lacinia in, elementum id enim."
                                title="Top 15 Things Must To Do"
                                style={{ marginTop: 10, width: '100%' }}
                                image={Images.trip8}
                                onPress={() => {
                                    navigation.navigate("Post");
                                }}
                            /> */}
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View>
        );
    }
}
