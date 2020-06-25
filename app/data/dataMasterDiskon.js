import { Images } from "@config";

const DataMasterDiskon = [
    {
        site: "https://masterdiskon.co.id/",
        banner:"https://images.unsplash.com/photo-1498307833015-e7b400441eb8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80",
        aeroStag:{
            grant_type:"password",
            client_id:"website.UVJ",
            client_secret:"Djlb5JDp",
            username:"vasubagent@gmail.com",
            password:"PU8FDHK0",
            timezone:"Asia/Jakarta",
            lang:"en_US",
            is_agent:"true",
        },
        aeroProd:{
            grant_type:"password",
            client_id:"website.MLE",
            client_secret:"UyXz0C1i",
            username:"master@diskon.com",
            password:"Ext3rn@IPMDP@ssword!23$",
            timezone:"Asia/Jakarta",
            lang:"en_US",
            is_agent:"true",
        },
        config:{
            aeroStatus: false,
            aeroUrl: "https://staging-api.megaelectra.co.id/",
            baseUrl: "https://masterdiskon.co.id/",
            banner: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=753&q=80"
        }
    },
   
];

export { DataMasterDiskon };
