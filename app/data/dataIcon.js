import { Images } from "@config";

const DataIcon =[
    // {
    //     icon: "calendar-alt",
    //     name: "Hotel",
    //     route: "Hotel"
    // },
    // {
    //     icon: "map-marker-alt",
    //     name: "Tour",
    //     route: "Tour"
    // },
    // {
    //     icon: "car-alt",
    //     name: "Car",
    //     route: "OverViewCar"
    // },
    // {
    //     icon: "plane",
    //     name: "Flight",
    //     route: "FlightSearch"
    // },
    // {
    //     icon: "ship",
    //     name: "Cruise",
    //     route: "CruiseSearch"
    // },
    // {
    //     icon: "bus",
    //     name: "Bus",
    //     route: "BusSearch"
    // },
    // {
    //     icon: "star",
    //     name: "Event",
    //     route: "DashboardEvent"
    // },
    // {
    //     icon: "ellipsis-h",
    //     name: "More",
    //     route: "More"
    // },
    {
        icon: "plane",
        name: "Flight",
        route: "FlightSearch",
        iconAnimation:"flight.json",
        type:'flight',
        image: Images.flight,
        checked: true
    },
    {
        icon: "calendar-alt",
        name: "Hotel",
        route: "Hotel",
        iconAnimation:"hotel.json",
        type:'hotel',
        image: Images.hotel
    },
    {
        icon: "map-marker-alt",
        name: "Trip",
        route: "Tour",
        iconAnimation:"tour.json",
        type:'trip',
        image: Images.trip
    },
    {
        icon: "map-marker-alt",
        name: "Activities",
        route: "Activities",
        iconAnimation:"tour.json",
        type:'activities',
        image: Images.trip
    },
    
    // {
    //     icon: "tag",
    //     name: "Voucher",
    //     route: "Voucher",
    //     iconAnimation:"flight.json",
    //     type:'voucher',
    //     image: Images.voucher
    // },
];

export { DataIcon };
