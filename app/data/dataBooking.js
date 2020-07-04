import { Images } from "@config";

const DataBooking = [
  {
      "id_order": "3183",
      "order_code": "MD2007030005",
      "order_expired": "2020-07-04 14:08:15",
      "order_status": "new",
      "order_status_name": "New Order",
      "aero_status": "0",
      "product": "Trip",
      "total_price": "6915000",
      "pax_people": "2",
      "product_name": "Trip",
      "status_payment": "belum_lunas",
      "status_order": {
          "id_order_status": "1",
          "order_status_name": "New Order",
          "order_status_slug": "new",
          "order_status_desc": "Pesanan berhasil dibuat"
      },
      "current_payment": {
          "expired": "2020-07-04 14:08:15",
          "amount": "6910000",
          "datetime": "2020-07-03 14:08:15",
          "status": "not_paid"
      },
      "order_payment": [
          {
              "expired": "2020-07-04 14:08:15",
              "amount": "6910000",
              "datetime": "2020-07-03 14:08:15",
              "status": "not_paid"
          }
      ],
      "detail": [
          {
              "type": "Trip",
              "product_name": "EXPLORE SILANGIT – TOBA – BRASTAGI – MEDAN 3HARI 2MALAM",
              "pax": [
                  {
                      "title": "Mr",
                      "first_name": "sdf",
                      "last_name": "ghdfghdfg"
                  },
                  {
                      "title": "Mr",
                      "first_name": "sdf",
                      "last_name": "dfghdfgh"
                  }
              ],
              "order_product": [
                  {
                      "product_name": "EXPLORE SILANGIT – TOBA – BRASTAGI – MEDAN 3HARI 2MALAM",
                      "qty": "2",
                      "price": "3455000",
                      "product_total": "5600000"
                  }
              ],
              "order_product_trip": []
          }
      ],
      "payment": {
          "expired": "2020-07-04 14:08:15",
          "bank_name": "",
          "total_amount": "6915000",
          "pay_amount": null,
          "payment_datetime": null
      },
      "contact": {
          "contact_first": "Ndaru",
          "contact_last": "Kurniawan",
          "contact_name": "Mr. Ndaru Kurniawan",
          "contact_phone": "6289678777247",
          "contact_email": "kurniandaru@gmail.com"
      }
  },
];

export { DataBooking };
