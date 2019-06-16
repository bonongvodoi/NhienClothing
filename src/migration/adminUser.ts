import { Users } from "../models/schemas/userSchema";
import { default_ad_email, default_pwd } from "../config/config";

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

initAdmin();