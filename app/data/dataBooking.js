import { Images } from "@config";

const DataBooking = [
    {
        "id_order": "3241",
        "order_code": "MD2007060020",
        "order_expired": "2020-07-06 14:15:57",
        "aero_status": null,
        "aero_orderid": null,
        "product": "Flight",
        "total_price": "761300",
        "pax_people": "0",
        "product_name": "From CGK To DPS",
        "order_status": {
            "id_order_status": "1",
            "order_status_name": "New Order",
            "order_status_slug": "new",
            "order_status_desc": "Pesanan berhasil dibuat"
        },
        "order_payment_recent": {
            "id_order_payment": "1155",
            "id_order": "3241",
            "id_invoice": "MD003241INV1",
            "contact_name": "Mata Desain",
            "contact_email": "matadesaindotcom@gmail.com",
            "ccy": "IDR",
            "expired": null,
            "iv_amount": "761300",
            "iv_insurance": "0",
            "iv_tax": "0",
            "iv_fee": "5000",
            "iv_total_amount": "766300",
            "iv_datetime": "2020-07-06 13:13:28",
            "pay_amount": null,
            "pay_status": null,
            "pay_file": null,
            "pay_datetime": null
        },
        "order_payment": [
            {
                "id_order_payment": "1155",
                "id_order": "3241",
                "id_invoice": "MD003241INV1",
                "contact_name": "Mata Desain",
                "contact_email": "matadesaindotcom@gmail.com",
                "ccy": "IDR",
                "expired": null,
                "iv_amount": "761300",
                "iv_insurance": "0",
                "iv_tax": "0",
                "iv_fee": "5000",
                "iv_total_amount": "766300",
                "iv_datetime": "2020-07-06 13:13:28",
                "pay_amount": null,
                "pay_status": null,
                "pay_file": null,
                "pay_datetime": null
            }
        ],
        "order_payment_num": 1,
        "detail": [
            {
                "type": "One Way",
                "product_name": "From CGK To DPS",
                "pax": [
                    {
                        "id_order_flight": "2239",
                        "type": "ADT",
                        "title": "Mr",
                        "first_name": "Mata",
                        "last_name": "Desain",
                        "dob": "2007-07-06",
                        "nationality_code": "ZM",
                        "nationality_name": "Zambia",
                        "identity_type": null,
                        "identity_type_name": null,
                        "identity_number": null,
                        "identity_expired_date": null,
                        "identity_issuing_country_code": null,
                        "identity_issuing_country_name": null
                    }
                ],
                "order_flight": [
                    {
                        "id_order": "3241",
                        "id": "4d80d0cb-4f21-4860-b6ea-1172168354a5",
                        "adult": "1",
                        "child": "0",
                        "infant": "0",
                        "nett_price": "740800",
                        "discount": "0",
                        "total_price": "761300",
                        "insurance_total": "20500",
                        "transaction_fee": "0",
                        "time_limit": "2020-07-06T14:15:57",
                        "type": "OW",
                        "type_name": "One Way",
                        "departure_date": "2020-07-08",
                        "return_date": null
                    }
                ],
                "order_flight_detail": [
                    {
                        "id_order_flight": "2239",
                        "segment": "Departure",
                        "booking_code": "Y95B7S",
                        "airline_code": "QG",
                        "airline_name": "CITILINK INDONESIA",
                        "reference": "541bcd73-c6a9-4867-bc65-0a59e3065520",
                        "departure_date": "2020-07-08",
                        "departure_time": "04:55:00",
                        "arrival_date": "2020-07-08",
                        "arrival_time": "07:55:00",
                        "cabin_name": "Economy",
                        "duration": "120",
                        "origin_id": "CGK",
                        "destination_id": "DPS",
                        "id_order_flight_detail": "3257",
                        "flight_schedule": [
                            {
                                "id_order_flight_detail": "3257",
                                "origin_id": "CGK",
                                "origin_terminal": "-",
                                "destination_id": "DPS",
                                "destination_terminal": "-",
                                "airline_code": "QG",
                                "airline_name": "CITILINK INDONESIA",
                                "airline_logo": "https://megaelectra-dev.oss-ap-southeast-5.aliyuncs.com/83493b9f-84ee-4c46-9408-7ef9aca29442.logo",
                                "flight_code": "QG 680",
                                "departure_date": "2020-07-08",
                                "departure_time": "04:55:00",
                                "arrival_date": "2020-07-08",
                                "arrival_time": "07:55:00",
                                "duration": "120"
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
                "db_order_flight_price": [
                    {
                        "id_order_flight": "2239",
                        "commission": "0",
                        "nett": "740800",
                        "markup": "0",
                        "markdown": "0",
                        "insurance_fee": "20500",
                        "transaction_fee": "ADT",
                        "pax_count": "610000",
                        "total_tax": "130800",
                        "total": "761300"
                    }
                ]
            }
        ],
        "order_payment_info": {
            "transaction_fee": "5000",
            "norek": "1290080508050 (Mandiri) an. PT Master Diskon Internasional",
            "voucher_markup": "20000"
        },
        "fee": "5000",
        "contact": {
            "contact_first": "Mata",
            "contact_last": "Desain",
            "contact_name": "Mata Desain",
            "contact_phone": "345435",
            "contact_email": "matadesaindotcom@gmail.com"
        }
    },
    {
        "id_order": "3239",
        "order_code": "MD2007060019",
        "order_expired": "2020-07-06 14:11:43",
        "aero_status": null,
        "aero_orderid": null,
        "product": "Flight",
        "total_price": "740800",
        "pax_people": "0",
        "product_name": "From CGK To DPS",
        "order_status": {
            "id_order_status": "1",
            "order_status_name": "New Order",
            "order_status_slug": "new",
            "order_status_desc": "Pesanan berhasil dibuat"
        },
        "order_payment_recent": null,
        "order_payment": [],
        "order_payment_num": 0,
        "detail": [
            {
                "type": "One Way",
                "product_name": "From CGK To DPS",
                "pax": [
                    {
                        "id_order_flight": "2237",
                        "type": "ADT",
                        "title": "Mr",
                        "first_name": "Mata",
                        "last_name": "Desain",
                        "dob": "2007-07-06",
                        "nationality_code": "ZM",
                        "nationality_name": "Zambia",
                        "identity_type": null,
                        "identity_type_name": null,
                        "identity_number": null,
                        "identity_expired_date": null,
                        "identity_issuing_country_code": null,
                        "identity_issuing_country_name": null
                    }
                ],
                "order_flight": [
                    {
                        "id_order": "3239",
                        "id": "2914ae93-ce82-4a0d-91d9-db057f978037",
                        "adult": "1",
                        "child": "0",
                        "infant": "0",
                        "nett_price": "740800",
                        "discount": "0",
                        "total_price": "740800",
                        "insurance_total": "0",
                        "transaction_fee": "0",
                        "time_limit": "2020-07-06T14:11:43",
                        "type": "OW",
                        "type_name": "One Way",
                        "departure_date": "2020-07-08",
                        "return_date": null
                    }
                ],
                "order_flight_detail": [
                    {
                        "id_order_flight": "2237",
                        "segment": "Departure",
                        "booking_code": "WCUZ2G",
                        "airline_code": "QG",
                        "airline_name": "CITILINK INDONESIA",
                        "reference": "541bcd73-c6a9-4867-bc65-0a59e3065520",
                        "departure_date": "2020-07-08",
                        "departure_time": "04:55:00",
                        "arrival_date": "2020-07-08",
                        "arrival_time": "07:55:00",
                        "cabin_name": "Economy",
                        "duration": "120",
                        "origin_id": "CGK",
                        "destination_id": "DPS",
                        "id_order_flight_detail": "3255",
                        "flight_schedule": [
                            {
                                "id_order_flight_detail": "3255",
                                "origin_id": "CGK",
                                "origin_terminal": "-",
                                "destination_id": "DPS",
                                "destination_terminal": "-",
                                "airline_code": "QG",
                                "airline_name": "CITILINK INDONESIA",
                                "airline_logo": "https://megaelectra-dev.oss-ap-southeast-5.aliyuncs.com/83493b9f-84ee-4c46-9408-7ef9aca29442.logo",
                                "flight_code": "QG 680",
                                "departure_date": "2020-07-08",
                                "departure_time": "04:55:00",
                                "arrival_date": "2020-07-08",
                                "arrival_time": "07:55:00",
                                "duration": "120"
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
                "db_order_flight_price": [
                    {
                        "id_order_flight": "2237",
                        "commission": "0",
                        "nett": "740800",
                        "markup": "0",
                        "markdown": "0",
                        "insurance_fee": "0",
                        "transaction_fee": "ADT",
                        "pax_count": "610000",
                        "total_tax": "130800",
                        "total": "740800"
                    }
                ]
            }
        ],
        "order_payment_info": {
            "transaction_fee": "5000",
            "norek": "1290080508050 (Mandiri) an. PT Master Diskon Internasional",
            "voucher_markup": "20000"
        },
        "fee": "5000",
        "contact": {
            "contact_first": "Mata",
            "contact_last": "Desain",
            "contact_name": "Mata Desain",
            "contact_phone": "345",
            "contact_email": "matadesaindotcom@gmail.com"
        }
    },
    {
        "id_order": "3237",
        "order_code": "MD2007060018",
        "order_expired": "2020-07-06 14:11:43",
        "aero_status": null,
        "aero_orderid": null,
        "product": "Flight",
        "total_price": "740800",
        "pax_people": "0",
        "product_name": "From CGK To DPS",
        "order_status": {
            "id_order_status": "1",
            "order_status_name": "New Order",
            "order_status_slug": "new",
            "order_status_desc": "Pesanan berhasil dibuat"
        },
        "order_payment_recent": null,
        "order_payment": [],
        "order_payment_num": 0,
        "detail": [
            {
                "type": "One Way",
                "product_name": "From CGK To DPS",
                "pax": [
                    {
                        "id_order_flight": "2235",
                        "type": "ADT",
                        "title": "Mr",
                        "first_name": "Mata",
                        "last_name": "Desain",
                        "dob": "2007-07-06",
                        "nationality_code": "ZM",
                        "nationality_name": "Zambia",
                        "identity_type": null,
                        "identity_type_name": null,
                        "identity_number": null,
                        "identity_expired_date": null,
                        "identity_issuing_country_code": null,
                        "identity_issuing_country_name": null
                    }
                ],
                "order_flight": [
                    {
                        "id_order": "3237",
                        "id": "2914ae93-ce82-4a0d-91d9-db057f978037",
                        "adult": "1",
                        "child": "0",
                        "infant": "0",
                        "nett_price": "740800",
                        "discount": "0",
                        "total_price": "740800",
                        "insurance_total": "0",
                        "transaction_fee": "0",
                        "time_limit": "2020-07-06T14:11:43",
                        "type": "OW",
                        "type_name": "One Way",
                        "departure_date": "2020-07-08",
                        "return_date": null
                    }
                ],
                "order_flight_detail": [
                    {
                        "id_order_flight": "2235",
                        "segment": "Departure",
                        "booking_code": "WCUZ2G",
                        "airline_code": "QG",
                        "airline_name": "CITILINK INDONESIA",
                        "reference": "541bcd73-c6a9-4867-bc65-0a59e3065520",
                        "departure_date": "2020-07-08",
                        "departure_time": "04:55:00",
                        "arrival_date": "2020-07-08",
                        "arrival_time": "07:55:00",
                        "cabin_name": "Economy",
                        "duration": "120",
                        "origin_id": "CGK",
                        "destination_id": "DPS",
                        "id_order_flight_detail": "3253",
                        "flight_schedule": [
                            {
                                "id_order_flight_detail": "3253",
                                "origin_id": "CGK",
                                "origin_terminal": "-",
                                "destination_id": "DPS",
                                "destination_terminal": "-",
                                "airline_code": "QG",
                                "airline_name": "CITILINK INDONESIA",
                                "airline_logo": "https://megaelectra-dev.oss-ap-southeast-5.aliyuncs.com/83493b9f-84ee-4c46-9408-7ef9aca29442.logo",
                                "flight_code": "QG 680",
                                "departure_date": "2020-07-08",
                                "departure_time": "04:55:00",
                                "arrival_date": "2020-07-08",
                                "arrival_time": "07:55:00",
                                "duration": "120"
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
                "db_order_flight_price": [
                    {
                        "id_order_flight": "2235",
                        "commission": "0",
                        "nett": "740800",
                        "markup": "0",
                        "markdown": "0",
                        "insurance_fee": "0",
                        "transaction_fee": "ADT",
                        "pax_count": "610000",
                        "total_tax": "130800",
                        "total": "740800"
                    }
                ]
            }
        ],
        "order_payment_info": {
            "transaction_fee": "5000",
            "norek": "1290080508050 (Mandiri) an. PT Master Diskon Internasional",
            "voucher_markup": "20000"
        },
        "fee": "5000",
        "contact": {
            "contact_first": "Mata",
            "contact_last": "Desain",
            "contact_name": "Mata Desain",
            "contact_phone": "345",
            "contact_email": "matadesaindotcom@gmail.com"
        }
    },
    {
        "id_order": "3235",
        "order_code": "MD2007060017",
        "order_expired": "2020-07-06 14:11:43",
        "aero_status": null,
        "aero_orderid": null,
        "product": "Flight",
        "total_price": "740800",
        "pax_people": "0",
        "product_name": "From CGK To DPS",
        "order_status": {
            "id_order_status": "1",
            "order_status_name": "New Order",
            "order_status_slug": "new",
            "order_status_desc": "Pesanan berhasil dibuat"
        },
        "order_payment_recent": null,
        "order_payment": [],
        "order_payment_num": 0,
        "detail": [
            {
                "type": "One Way",
                "product_name": "From CGK To DPS",
                "pax": [
                    {
                        "id_order_flight": "2233",
                        "type": "ADT",
                        "title": "Mr",
                        "first_name": "Mata",
                        "last_name": "Desain",
                        "dob": "2007-07-06",
                        "nationality_code": "ZM",
                        "nationality_name": "Zambia",
                        "identity_type": null,
                        "identity_type_name": null,
                        "identity_number": null,
                        "identity_expired_date": null,
                        "identity_issuing_country_code": null,
                        "identity_issuing_country_name": null
                    }
                ],
                "order_flight": [
                    {
                        "id_order": "3235",
                        "id": "2914ae93-ce82-4a0d-91d9-db057f978037",
                        "adult": "1",
                        "child": "0",
                        "infant": "0",
                        "nett_price": "740800",
                        "discount": "0",
                        "total_price": "740800",
                        "insurance_total": "0",
                        "transaction_fee": "0",
                        "time_limit": "2020-07-06T14:11:43",
                        "type": "OW",
                        "type_name": "One Way",
                        "departure_date": "2020-07-08",
                        "return_date": null
                    }
                ],
                "order_flight_detail": [
                    {
                        "id_order_flight": "2233",
                        "segment": "Departure",
                        "booking_code": "WCUZ2G",
                        "airline_code": "QG",
                        "airline_name": "CITILINK INDONESIA",
                        "reference": "541bcd73-c6a9-4867-bc65-0a59e3065520",
                        "departure_date": "2020-07-08",
                        "departure_time": "04:55:00",
                        "arrival_date": "2020-07-08",
                        "arrival_time": "07:55:00",
                        "cabin_name": "Economy",
                        "duration": "120",
                        "origin_id": "CGK",
                        "destination_id": "DPS",
                        "id_order_flight_detail": "3251",
                        "flight_schedule": [
                            {
                                "id_order_flight_detail": "3251",
                                "origin_id": "CGK",
                                "origin_terminal": "-",
                                "destination_id": "DPS",
                                "destination_terminal": "-",
                                "airline_code": "QG",
                                "airline_name": "CITILINK INDONESIA",
                                "airline_logo": "https://megaelectra-dev.oss-ap-southeast-5.aliyuncs.com/83493b9f-84ee-4c46-9408-7ef9aca29442.logo",
                                "flight_code": "QG 680",
                                "departure_date": "2020-07-08",
                                "departure_time": "04:55:00",
                                "arrival_date": "2020-07-08",
                                "arrival_time": "07:55:00",
                                "duration": "120"
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
                "db_order_flight_price": [
                    {
                        "id_order_flight": "2233",
                        "commission": "0",
                        "nett": "740800",
                        "markup": "0",
                        "markdown": "0",
                        "insurance_fee": "0",
                        "transaction_fee": "ADT",
                        "pax_count": "610000",
                        "total_tax": "130800",
                        "total": "740800"
                    }
                ]
            }
        ],
        "order_payment_info": {
            "transaction_fee": "5000",
            "norek": "1290080508050 (Mandiri) an. PT Master Diskon Internasional",
            "voucher_markup": "20000"
        },
        "fee": "5000",
        "contact": {
            "contact_first": "Mata",
            "contact_last": "Desain",
            "contact_name": "Mata Desain",
            "contact_phone": "345",
            "contact_email": "matadesaindotcom@gmail.com"
        }
    },
    {
        "id_order": "3201",
        "order_code": "MD2007050002",
        "order_expired": "2020-07-05 17:28:41",
        "aero_status": null,
        "aero_orderid": null,
        "product": "Flight",
        "total_price": "740800",
        "pax_people": "0",
        "product_name": "From CGK To DPS",
        "order_status": {
            "id_order_status": "1",
            "order_status_name": "New Order",
            "order_status_slug": "new",
            "order_status_desc": "Pesanan berhasil dibuat"
        },
        "order_payment_recent": null,
        "order_payment": [],
        "order_payment_num": 0,
        "detail": [
            {
                "type": "One Way",
                "product_name": "From CGK To DPS",
                "pax": [
                    {
                        "id_order_flight": "2219",
                        "type": "ADT",
                        "title": "Ms",
                        "first_name": "Mata",
                        "last_name": "Desain",
                        "dob": "2007-07-05",
                        "nationality_code": "ZW",
                        "nationality_name": "Zimbabwe",
                        "identity_type": null,
                        "identity_type_name": null,
                        "identity_number": null,
                        "identity_expired_date": null,
                        "identity_issuing_country_code": null,
                        "identity_issuing_country_name": null
                    }
                ],
                "order_flight": [
                    {
                        "id_order": "3201",
                        "id": "e8364269-2f65-47ce-9b51-ed5b76129da8",
                        "adult": "1",
                        "child": "0",
                        "infant": "0",
                        "nett_price": "740800",
                        "discount": "0",
                        "total_price": "740800",
                        "insurance_total": "0",
                        "transaction_fee": "0",
                        "time_limit": "2020-07-05T17:28:41",
                        "type": "OW",
                        "type_name": "One Way",
                        "departure_date": "2020-07-07",
                        "return_date": null
                    }
                ],
                "order_flight_detail": [
                    {
                        "id_order_flight": "2219",
                        "segment": "Departure",
                        "booking_code": "JF1LSA",
                        "airline_code": "QG",
                        "airline_name": "CITILINK INDONESIA",
                        "reference": "694afd9a-8152-4e19-981b-1e9f3da13546",
                        "departure_date": "2020-07-07",
                        "departure_time": "04:55:00",
                        "arrival_date": "2020-07-07",
                        "arrival_time": "07:55:00",
                        "cabin_name": "Economy",
                        "duration": "120",
                        "origin_id": "CGK",
                        "destination_id": "DPS",
                        "id_order_flight_detail": "3237",
                        "flight_schedule": [
                            {
                                "id_order_flight_detail": "3237",
                                "origin_id": "CGK",
                                "origin_terminal": "-",
                                "destination_id": "DPS",
                                "destination_terminal": "-",
                                "airline_code": "QG",
                                "airline_name": "CITILINK INDONESIA",
                                "airline_logo": "https://megaelectra-dev.oss-ap-southeast-5.aliyuncs.com/83493b9f-84ee-4c46-9408-7ef9aca29442.logo",
                                "flight_code": "QG 680",
                                "departure_date": "2020-07-07",
                                "departure_time": "04:55:00",
                                "arrival_date": "2020-07-07",
                                "arrival_time": "07:55:00",
                                "duration": "120"
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
                "db_order_flight_price": [
                    {
                        "id_order_flight": "2219",
                        "commission": "0",
                        "nett": "740800",
                        "markup": "0",
                        "markdown": "0",
                        "insurance_fee": "0",
                        "transaction_fee": "ADT",
                        "pax_count": "610000",
                        "total_tax": "130800",
                        "total": "740800"
                    }
                ]
            }
        ],
        "order_payment_info": {
            "transaction_fee": "5000",
            "norek": "1290080508050 (Mandiri) an. PT Master Diskon Internasional",
            "voucher_markup": "20000"
        },
        "fee": "5000",
        "contact": {
            "contact_first": "Mata",
            "contact_last": "Desain",
            "contact_name": "Mata Desain",
            "contact_phone": "234",
            "contact_email": "matadesaindotcom@gmail.com"
        }
    }
];

export { DataBooking };
