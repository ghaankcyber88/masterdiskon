import { Images } from "@config";

const DataPayment = {
    "id_order": "3173",
    "payment": {
      "title": "Bank Transfer",
      "payment_type": "bank_transfer",
      "subPayment": [
        {
          "title": "BCA",
          "name": "bca",
          "icon": "",
          "attribute": {
            "bank_transfer": {
              "bank": "bca"
            }
          }
        },
        {
          "title": "Permata",
          "name": "permata",
          "icon": "",
          "attribute": {
            "bank_transfer": {
              "bank": "permata"
            }
          }
        },
        {
          "title": "BNI",
          "name": "bni",
          "icon": "",
          "attribute": {
            "bank_transfer": {
              "bank": "bni"
            }
          }
        }
      ]
    },
    "subPayment": {
      "title": "BCA",
      "name": "bca",
      "icon": "",
      "attribute": {
        "bank_transfer": {
          "bank": "bca"
        }
      }
    },
    "dataBooking": [
      {
        "id_order": "3173",
        "order_code": "MD2007020019",
        "order_expired": "2020-07-02 16:27:02",
        "order_status": "new",
        "order_status_name": "New Order",
        "aero_status": "0",
        "product": "Flight",
        "total_price": "1481600",
        "pax_people": "0",
        "product_name": "From CGK To DPS",
        "status_payment": "belum_lunas",
        "current_payment": [],
        "order_payment": [],
        "detail": [
          {
            "type": "One Way",
            "product_name": "From CGK To DPS",
            "pax": [
              {
                "id_order_flight": "2197",
                "type": "ADT",
                "title": "Ms",
                "first_name": "qwe",
                "last_name": "qwe",
                "dob": "2008-07-02",
                "nationality_code": "ZM",
                "nationality_name": "Zambia",
                "identity_type": null,
                "identity_type_name": null,
                "identity_number": null,
                "identity_expired_date": null,
                "identity_issuing_country_code": null,
                "identity_issuing_country_name": null
              },
              {
                "id_order_flight": "2197",
                "type": "ADT",
                "title": "Ms",
                "first_name": "Mata",
                "last_name": "Desain",
                "dob": "2007-07-02",
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
                "id_order": "3173",
                "id": "8819c592-0225-439d-833b-e8d33bd034bd",
                "adult": "2",
                "child": "0",
                "infant": "0",
                "nett_price": "1481600",
                "discount": "0",
                "total_price": "1481600",
                "insurance_total": "0",
                "transaction_fee": "0",
                "time_limit": "2020-07-02T16:27:02",
                "type": "OW",
                "type_name": "One Way",
                "departure_date": "2020-07-04",
                "return_date": null
              }
            ],
            "order_flight_detail": [
              {
                "id_order_flight": "2197",
                "segment": "Departure",
                "booking_code": "YCKURZ",
                "airline_code": "QG",
                "airline_name": "CITILINK INDONESIA",
                "reference": "58d2c4f0-40e0-459c-a703-18dc1fde93cf",
                "departure_date": "2020-07-04",
                "departure_time": "04:55:00",
                "arrival_date": "2020-07-04",
                "arrival_time": "07:55:00",
                "cabin_name": "Economy",
                "duration": "120",
                "origin_id": "CGK",
                "destination_id": "DPS",
                "id_order_flight_detail": "3215",
                "flight_schedule": [
                  {
                    "id_order_flight_detail": "3215",
                    "origin_id": "CGK",
                    "origin_terminal": "-",
                    "destination_id": "DPS",
                    "destination_terminal": "-",
                    "airline_code": "QG",
                    "airline_name": "CITILINK INDONESIA",
                    "airline_logo": "https://megaelectra-dev.oss-ap-southeast-5.aliyuncs.com/83493b9f-84ee-4c46-9408-7ef9aca29442.logo",
                    "flight_code": "QG 680",
                    "departure_date": "2020-07-04",
                    "departure_time": "04:55:00",
                    "arrival_date": "2020-07-04",
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
                "id_order_flight": "2197",
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
        "payment": [],
        "contact": {
          "contact_name": "Mata Desain",
          "contact_phone": "234234",
          "contact_email": "matadesaindotcom@gmail.com"
        }
      }
    ]
  };

export { DataPayment };
