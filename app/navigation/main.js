import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import { BaseColor, BaseStyle } from "@config";
import { Icon } from "@components";
import * as Utils from "@utils";

/* Bottom Screen */
import Home from "@screens/Home";
import Booking from "@screens/Booking";
import Messenger from "@screens/Messenger";
// import Post from "@screens/Post";
import Profile from "@screens/Profile";

/* Modal Screen only affect iOS */
import Filter from "@screens/Filter";
import FlightFilter from "@screens/FlightFilter";
import FlightDetail from "@screens/FlightDetail";
import BusFilter from "@screens/BusFilter";
import Search from "@screens/Search";
import SearchHistory from "@screens/SearchHistory";
import PreviewImage from "@screens/PreviewImage";
import SelectBus from "@screens/SelectBus";
import SelectCruise from "@screens/SelectCruise";
import CruiseFilter from "@screens/CruiseFilter";
import EventFilter from "@screens/EventFilter";
/* Stack Screen */
import Profile1 from "@screens/Profile1";
import Profile2 from "@screens/Profile2";
import Profile3 from "@screens/Profile3";
import Profile4 from "@screens/Profile4";
import Profile5 from "@screens/Profile5";
import Profile6 from "@screens/Profile6";
import Profile7 from "@screens/Profile7";
import Profile8 from "@screens/Profile8";
import ProfileSmart from "@screens/ProfileSmart";
import More from "@screens/More";
import Tour from "@screens/Tour";
import Car from "@screens/Car";
import OverViewCar from "@screens/OverViewCar";
import Hotel from "@screens/Hotel";
import Review from "@screens/Review";
import Feedback from "@screens/Feedback";
import Messages from "@screens/Messages";
import Notification from "@screens/Notification";
import Walkthrough from "@screens/Walkthrough";
import SignUp from "@screens/SignUp";
import SignIn from "@screens/SignIn";
import ResetPassword from "@screens/ResetPassword";
import ChangePassword from "@screens/ChangePassword";
import Static from "@screens/Static";
import ProfileEdit from "@screens/ProfileEdit";
import ProfileExample from "@screens/ProfileExample";
import ChangeLanguage from "@screens/ChangeLanguage";
import HotelInformation from "@screens/HotelInformation";
import CheckOut from "@screens/CheckOut";
import Currency from "@screens/Currency";
import Coupons from "@screens/Coupons";
import HotelDetail from "@screens/HotelDetail";
import ContactUs from "@screens/ContactUs";
import PreviewBooking from "@screens/PreviewBooking";
import TourOrderDetail from "@screens/TourOrderDetail";
import PricingTable from "@screens/PricingTable";
import PricingTableIcon from "@screens/PricingTableIcon";
import BookingDetail from "@screens/BookingDetail";
import PostDetail from "@screens/PostDetail";
import Musium from "@screens/Musium";
import Pembayaran from "@screens/Pembayaran";
// import WebViewPage from "@screens/WebViewPage";
import TourDetail from "@screens/TourDetail";
import TourDetailCustom from "@screens/TourDetailCustom";
import CarDetail from "@screens/CarDetail";
import AboutUs from "@screens/AboutUs";
import OurService from "@screens/OurService";
import FlightSearch from "@screens/FlightSearch";
import TourSet from "@screens/TourSet";
import SelectFlight from "@screens/SelectFlight";
import SelectTitle from "@screens/SelectTitle";
import SelectCountry from "@screens/SelectCountry";
import SelectPhoneCode from "@screens/SelectPhoneCode";

import SelectPayment from "@screens/SelectPayment";
import Cart from "@screens/Cart";
import CartTour from "@screens/CartTour";
import SubmitOrder from "@screens/SubmitOrder";
import VirtualAccount from "@screens/VirtualAccount";
import FlightResult from "@screens/FlightResult";
import FlightResultArrival from "@screens/FlightResultArrival";
import DetailContact from "@screens/DetailContact";
import DatePickerRange from "@screens/DatePickerRange";

import FlightSummary from "@screens/FlightSummary";
import TourSummary from "@screens/TourSummary";
import Summary from "@screens/Summary";
import FlightTicket from "@screens/FlightTicket";
import CruiseSearch from "@screens/CruiseSearch";
import Cruise from "@screens/Cruise";
import CruiseDetail from "@screens/CruiseDetail";
import BusSearch from "@screens/BusSearch";
import BusList from "@screens/BusList";
import BusSelectSeat from "@screens/BusSelectSeat";
import PreviewBusBooking from "@screens/PreviewBusBooking";
import BusTicket from "@screens/BusTicket";
import Event from "@screens/Event";
import EventDetail from "@screens/EventDetail";
import EventPreviewBooking from "@screens/EventPreviewBooking";
import DashboardEvent from "@screens/DashboardEvent";
import EventTicket from "@screens/EventTicket";

import Redirect from "@screens/Redirect";
// Transition for navigation by screen name
const handleCustomTransition = ({ scenes }) => {
    const nextScene = scenes[scenes.length - 1].route.routeName;
    switch (nextScene) {
        case "PreviewImage":
            Utils.enableExperimental();
            return Utils.zoomIn();
        default:
            return false;
    }
};

// Config for bottom navigator
const bottomTabNavigatorConfig = {
    initialRouteName: "Home",
    tabBarOptions: {
        showIcon: true,
        showLabel: true,
        activeTintColor: BaseColor.primaryColor,
        inactiveTintColor: BaseColor.grayColor,
        style: BaseStyle.tabBar,
        labelStyle: {
            fontSize: 12
        }
    }
};

// Tab bar navigation
const routeConfigs = {
    Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => ({
            title: "Home",
            tabBarIcon: ({ focused, tintColor }) => {
                return <Icon color={tintColor} name="home" size={20} solid />;
            }
        })
    },
    Booking: {
        screen: Booking,
        navigationOptions: ({ navigation }) => ({
            title: "Booking",
            tabBarIcon: ({ focused, tintColor }) => {
                return (
                    <Icon color={tintColor} name="bookmark" size={20} solid />
                );
            }
        })
    },
    Messenger: {
        screen: Notification,
        navigationOptions: ({ navigation }) => ({
            title: "Notification",
            tabBarIcon: ({ focused, tintColor }) => {
                return (
                    <Icon
                        solid
                        color={tintColor}
                        name="envelope"
                        size={20}
                        solid
                    />
                );
            }
        })
    },
    Post: {
        screen: Booking,
        navigationOptions: ({ navigation }) => ({
            title: "News",
            tabBarIcon: ({ focused, tintColor }) => {
                return <Icon color={tintColor} name="copy" size={20} solid />;
            }
        })
    },
    Profile: {
        screen: Profile,
        navigationOptions: ({ navigation }) => ({
            title: "Account",
            tabBarIcon: ({ focused, tintColor }) => {
                return (
                    <Icon
                        solid
                        color={tintColor}
                        name="user-circle"
                        size={20}
                    />
                );
            }
        })
    }
};

// Define bottom navigator as a screen in stack
const BottomTabNavigator = createBottomTabNavigator(
    routeConfigs,
    bottomTabNavigatorConfig
);

// Main Stack View App
const StackNavigator = createStackNavigator(
    {
        BottomTabNavigator: {
            screen: BottomTabNavigator
        },
        ProfileExample: {
            screen: ProfileExample
        },
        Profile1: {
            screen: Profile1
        },
        Profile2: {
            screen: Profile2
        },
        Profile3: {
            screen: Profile3
        },
        Profile4: {
            screen: Profile4
        },
        Profile5: {
            screen: Profile5
        },
        Profile6: {
            screen: Profile6
        },
        Profile7: {
            screen: Profile7
        },
        Profile8: {
            screen: Profile8
        },
        ProfileSmart: {
            screen: ProfileSmart
        },
        Review: {
            screen: Review
        },
        Feedback: {
            screen: Feedback
        },
        Messages: {
            screen: Messages
        },
        Notification: {
            screen: Notification
        },
        Walkthrough: {
            screen: Walkthrough
        },
        SignUp: {
            screen: SignUp
        },
        SignIn: {
            screen: SignIn
        },
        ResetPassword: {
            screen: ResetPassword
        },
        ChangePassword: {
            screen: ChangePassword
        },
        Static: {
            screen: Static
        },
        ProfileEdit: {
            screen: ProfileEdit
        },
        ChangeLanguage: {
            screen: ChangeLanguage
        },
        HotelInformation: {
            screen: HotelInformation
        },
        CheckOut: {
            screen: CheckOut
        },
        Currency: {
            screen: Currency
        },
        Coupons: {
            screen: Coupons
        },
        HotelDetail: {
            screen: HotelDetail
        },
        ContactUs: {
            screen: ContactUs
        },
        PreviewBooking: {
            screen: PreviewBooking
        },
        TourOrderDetail: {
            screen: TourOrderDetail
        },
        PricingTable: {
            screen: PricingTable
        },
        PricingTableIcon: {
            screen: PricingTableIcon
        },
        BookingDetail: {
            screen: BookingDetail
        },
        PostDetail: {
            screen: PostDetail
        },
        Musium: {
            screen: Musium
        },
        Pembayaran: {
            screen: Pembayaran
        },
        // WebViewPage: {
        //     screen: WebViewPage
        // },
        TourDetail: {
            screen: TourDetail
        },
        TourDetailCustom: {
            screen: TourDetailCustom
        },
        Car: {
            screen: Car
        },
        OverViewCar: {
            screen: OverViewCar
        },
        CarDetail: {
            screen: CarDetail
        },
        AboutUs: {
            screen: AboutUs
        },
        OurService: {
            screen: OurService
        },
        FlightSearch: {
            screen: FlightSearch
        },
        TourSet: {
            screen: TourSet
        },
        VirtualAccount: {
            screen: VirtualAccount
        },
        SelectFlight: {
            screen: SelectFlight
        },
        SelectCountry: {
            screen: SelectCountry
        },
        SelectPhoneCode: {
            screen: SelectPhoneCode
        },
        SelectPayment: {
            screen: SelectPayment
        },
        Cart: {
            screen: Cart
        },
        CartTour: {
            screen: CartTour
        },
        SubmitOrder: {
            screen: SubmitOrder
        },
        SelectTitle: {
            screen: SelectTitle
        },
        FlightResult: {
            screen: FlightResult
        },
        FlightResultArrival: {
            screen: FlightResultArrival
        },
        FlightSummary: {
            screen: FlightSummary
        },
        Redirect: {
            screen: Redirect
        },
        TourSummary: {
            screen: TourSummary
        },
        Summary: {
            screen: Summary
        },
        FlightTicket: {
            screen: FlightTicket
        },
        CruiseSearch: {
            screen: CruiseSearch
        },
        Cruise: {
            screen: Cruise
        },
        CruiseDetail: {
            screen: CruiseDetail
        },
        BusSearch: {
            screen: BusSearch
        },
        BusList: {
            screen: BusList
        },
        BusSelectSeat: {
            screen: BusSelectSeat
        },
        PreviewBusBooking: {
            screen: PreviewBusBooking
        },
        BusTicket: {
            screen: BusTicket
        },
        Event: {
            screen: Event
        },
        EventDetail: {
            screen: EventDetail
        },
        EventPreviewBooking: {
            screen: EventPreviewBooking
        },
        EventTicket: {
            screen: EventTicket
        },
        More: {
            screen: More
        },
        Tour: {
            screen: Tour
        },
        Car: {
            screen: Car
        },
        Hotel: {
            screen: Hotel
        },
        DashboardEvent: {
            screen: DashboardEvent
        },
        DetailContact: {
            screen: DetailContact
        },
        DatePickerRange: {
            screen: DatePickerRange
        }
    },
    {
        headerMode: "none",
        initialRouteName: "BottomTabNavigator"
    }
);

// Define Root Stack support Modal Screen
const RootStack = createStackNavigator(
    {
        Filter: {
            screen: Filter
        },
        FlightFilter: {
            screen: FlightFilter
        },
        FlightDetail: {
            screen: FlightDetail
        },
        BusFilter: {
            screen: BusFilter
        },
        CruiseFilter: {
            screen: CruiseFilter
        },
        EventFilter: {
            screen: EventFilter
        },
        Search: {
            screen: Search
        },
        SearchHistory: {
            screen: SearchHistory
        },

        SelectBus: {
            screen: SelectBus
        },
        SelectCruise: {
            screen: SelectCruise
        },
        PreviewImage: {
            screen: PreviewImage
        },
        StackNavigator: {
            screen: StackNavigator
        }
    },
    {
        mode: "modal",
        headerMode: "none",
        initialRouteName: "StackNavigator",
        transitionConfig: screen => {
            return handleCustomTransition(screen);
        }
    }
);

export default RootStack;
