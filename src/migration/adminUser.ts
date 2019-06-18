import { Users } from "../models/schemas/userSchema";
import { default_ad_email, default_pwd, default_sale_email, default_sale_pwd } from "../config/config";

function initAdmin() {
  let admin;
  Users.findOne({email: default_ad_email}).then(function(_admin) {
    if (!_admin) {
      admin = new Users();
      admin.email = default_ad_email;
      admin.firstName = 'Nhiên';
      admin.lastName = 'Admin';
      admin.password = default_pwd;
      admin.role = 'admin';
      admin.save();    
    }
  })
}

function initSale() {
  let sale;
  Users.findOne({email: default_sale_email}).then(function(_sale) {
    if (!_sale) {
      sale = new Users();
      sale.email = default_sale_email;
      sale.firstName = 'Nhiên';
      sale.lastName = 'Admin';
      sale.password = default_sale_pwd;
      sale.role = 'salesman';
      sale.save();    
    }
  })
}

initAdmin();
initSale();