export const isProduction = process.env.NODE_ENV == 'production';
export const DATABASE = isProduction ? 'mongodb+srv://huanndt:thaihuan2266@cluster0-80u3z.mongodb.net/test?retryWrites=true&w=majority' : 'mongodb://localhost/nhienshop';
export const secret = "RbBQqA6uF#msRF8s7h*?@=95HUm&DgMDd6zLFn4XzWQ6dtwXSJwBX#?gL2JWf!";
export const default_pwd = "nhienclothingdn";
export const default_ad_email = 'admin@nhienclothing.com';
export const default_sale_pwd = "nhien!";
export const default_sale_email = 'sale@nhienclothing.com';

