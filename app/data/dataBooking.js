import { Images } from "@config";

const DataBooking =[
    {
        "id_user": "258",
        "id_order": "4270",
        "order_code": "MD2009150017",
        "order_expired": "2020-09-15 15:11:00",
        "aero_status": null,
        "aero_orderid": null,
        "product": "Flight",
        "subtotal": "607100",
        "insurance": "0",
        "fee": "0",
        "ccy": "IDR",
        "total_price": "607100",
        "pax_people": "1",
        "product_name": "From CGK To DPS",
        "order_status": {
            "id_order_status": "1",
            "order_status_name": "New Order",
            "order_status_slug": "new",
            "order_status_desc": "Pesanan berhasil dibuat"
        },
        "order_payment_recent": {
            "id_order_payment": "2044",
            "id_order": "4270",
            "id_invoice": "MDPY200901107",
            "transaction_id": null,
            "snaptoken": "",
            "user_token_app": "eG658Mv0R4GkjEmWx_q-mC:APA91bG_Uk1h8nJFeprB1PFH8zH3vPyblsGLsJWCD_bbsIXfVHF1CArOvRKA8KCEHos06vGMjPsFKGsZrBwygMRIvjurm2wI-qOPmg4gcbW-_F0iYkZBSQYYVpijYPNBsjM21gkeR90Q",
            "midtrans_token_app": "",
            "contact_name": "arif pambudi",
            "contact_title": "Mr",
            "contact_first": "arif",
            "contact_last": "pambudi",
            "contact_email": "matadesaindotcom@gmail.com",
            "ccy": "IDR",
            "expired": "2020-09-15 15:11:00",
            "iv_amount": "607100",
            "iv_insurance": "0",
            "iv_tax": "0",
            "iv_fee": "0",
            "iv_discount": "0",
            "iv_total_amount": "607100",
            "iv_datetime": "2020-09-15 13:56:37",
            "pay_amount": null,
            "pay_file": null,
            "pay_status": null,
            "pay_datetime": null,
            "payment_type": "",
            "payment_type_label": "",
            "payment_sub": "",
            "payment_sub_label": ""
        },
        "order_payment": [
            {
                "id_order_payment": "2044",
                "id_order": "4270",
                "id_invoice": "MDPY200901107",
                "transaction_id": null,
                "snaptoken": "",
                "user_token_app": "eG658Mv0R4GkjEmWx_q-mC:APA91bG_Uk1h8nJFeprB1PFH8zH3vPyblsGLsJWCD_bbsIXfVHF1CArOvRKA8KCEHos06vGMjPsFKGsZrBwygMRIvjurm2wI-qOPmg4gcbW-_F0iYkZBSQYYVpijYPNBsjM21gkeR90Q",
                "midtrans_token_app": "",
                "contact_name": "arif pambudi",
                "contact_title": "Mr",
                "contact_first": "arif",
                "contact_last": "pambudi",
                "contact_email": "matadesaindotcom@gmail.com",
                "ccy": "IDR",
                "expired": "2020-09-15 15:11:00",
                "iv_amount": "607100",
                "iv_insurance": "0",
                "iv_tax": "0",
                "iv_fee": "0",
                "iv_discount": "0",
                "iv_total_amount": "607100",
                "iv_datetime": "2020-09-15 13:56:37",
                "pay_amount": null,
                "pay_file": null,
                "pay_status": null,
                "pay_datetime": null,
                "payment_type": "",
                "payment_type_label": "",
                "payment_sub": "",
                "payment_sub_label": ""
            }
        ],
        "order_payment_num": 1,
        "detail": [
            {
                "type": "One Way",
                "product_name": "From CGK To DPS",
                "order": {
                    "id_order_flight": "2706",
                    "id_order": "4270",
                    "id": "e55b1909-6932-4b39-8d38-e3c9cc502d8a",
                    "adult": "1",
                    "child": "0",
                    "infant": "0",
                    "nett_price": "603251",
                    "discount": "0",
                    "total_price": "607100",
                    "insurance_total": "0",
                    "transaction_fee": "0",
                    "time_limit": "2020-09-15T15:11:00",
                    "type": "OW",
                    "type_name": "One Way",
                    "departure_date": "2020-09-17",
                    "return_date": null
                },
                "order_detail": [
                    {
                        "id_order_flight": "2706",
                        "segment": "Departure",
                        "booking_code": "DDJCQG",
                        "airline_code": "SJ",
                        "airline_name": "SRIWIJAYA AIR",
                        "reference": "ec5ce7aa-ca51-4c1b-ae2b-6256acc91fde",
                        "departure_date": "2020-09-17",
                        "departure_time": "06:15:00",
                        "arrival_date": "2020-09-17",
                        "arrival_time": "09:05:00",
                        "cabin_name": "Economy",
                        "duration": "110",
                        "origin_id": "CGK",
                        "destination_id": "DPS",
                        "id_order_flight_detail": "3744",
                        "flight_schedule": [
                            {
                                "id_order_flight_detail": "3744",
                                "origin_id": "CGK",
                                "origin_terminal": "-",
                                "destination_id": "DPS",
                                "destination_terminal": "-",
                                "airline_code": "SJ",
                                "airline_name": "SRIWIJAYA AIR",
                                "airline_logo": "https://megaelectra-dev-new.oss-ap-southeast-5.aliyuncs.com/1d0e152d-3484-4271-9a4b-8309d45b7a34.logo",
                                "flight_code": "SJ 272",
                                "departure_date": "2020-09-17",
                                "departure_time": "06:15:00",
                                "arrival_date": "2020-09-17",
                                "arrival_time": "09:05:00",
                                "duration": "110"
                            }
                        ],
                        "origin_airport": {
                            "name": "Soekarno-Hatta International Airport",
                            "location": "Jakarta",
                            "countryName": "Indonesia"
                        },
                        "destination_airport": {
                            "name": "Ngurah Rai (Bali) International Airport",
                            "location": "Denpasar",
                            "countryName": "Indonesia"
                        }
                    }
                ],
                "pax": [
                    {
                        "id_order_flight": "2706",
                        "type": "ADT",
                        "title": "Mr",
                        "first_name": "arif",
                        "last_name": "pambudi",
                        "dob": "2007-09-15",
                        "nationality_code": "ID",
                        "nationality_name": "Indonesia",
                        "identity_type": null,
                        "identity_type_name": null,
                        "identity_number": null,
                        "identity_expired_date": null,
                        "identity_issuing_country_code": null,
                        "identity_issuing_country_name": null
                    }
                ]
            }
        ],
        "order_payment_info": {
            "transaction_fee": "5000",
            "norek": "1290080508050 (Mandiri) an. PT Master Diskon Internasional",
            "voucher_markup": "20000"
        },
        "contact": {
            "contact_title": "Mr",
            "contact_first": "arif",
            "contact_last": "pambudi",
            "contact_name": "arif pambudi",
            "contact_phone": "79879879879",
            "phone_code": "62",
            "contact_email": "matadesaindotcom@gmail.com"
        }
    }
];

export { DataBooking };
