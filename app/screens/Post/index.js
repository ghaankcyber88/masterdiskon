import React, { Component } from "react";
import { RefreshControl, FlatList } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import {
    Header,
    SafeAreaView,
    PostItem,
    ProfileAuthor,
    Icon
} from "@components";
import styles from "./styles";

// Load sample data
import { DataMasterDiskon } from "@data";
import {PostData} from '../../services/PostData';

export default class Post extends Component {
    constructor(props) {
        super(props);

        this.state = {
            refreshing: false,
            posts: [],
            DataMasterDiskon:DataMasterDiskon[0]
        };
    }

    getBlog(){
        PostData('common/get_blog_new_page')
            .then((result) => {
                this.setState({posts: result});
            },
            (error) => {
                this.setState({ error });
            }
        );   
    }


    componentDidMount() {
        this.getBlog();
    }
    render() {
        const { navigation } = this.props;
        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <Header title="Post" />
                <FlatList
                    refreshControl={
                        <RefreshControl
                            colors={[BaseColor.primaryColor]}
                            tintColor={BaseColor.primaryColor}
                            refreshing={this.state.refreshing}
                            onRefresh={() => {}}
                        />
                    }
                    data={this.state.posts}
                    keyExtractor={(item, index) => item.id}
                    renderItem={({ item, index }) => (
                        <PostItem
                            image={item.featured_image}
                            url={this.state.DataMasterDiskon.site+'assets/upload/blog/post/'}
                            // image={item.image}
                            title={item.title}
                            description={item.description}
                            onPress={() => navigation.navigate("PostDetail",{item:item})}
                        >
                            <ProfileAuthor
                                image={item.authorImage}
                                name={item.name}
                                description={item.detail}
                                style={{ paddingHorizontal: 20 }}
                            />
                        </PostItem>
                    )}
                />
            </SafeAreaView>
        );
    }
}
