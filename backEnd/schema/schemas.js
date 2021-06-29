const registerSchema = {
  type: "object",
  required: ["username", "fullname", "email", "cellphone_number", "delivery_address", "user_password", "is_admin"],
  properties: {
    username: { type: "string"},
    fullname: { type: "string"},
    email: { type: "string", pattern: "^[A-Za-z0-9._-]*@[a-z]*[.]com$"},
    cellphone_number: { type: "string"},
    delivery_address: { type: "string"},
    user_password: { type: "string", pattern: "^[A-Za-z0-9.!#$%&‘*+=?^_`{|}~-]{6,}$"},
    is_admin: { type: "string"},
  }
}
const loginSchema = {
  type: "object",
  required: ["email", "user_password"],
  properties: {
    email: { type: "string", pattern: "^[A-Za-z0-9._-]*@[a-z]*[.]com$"},
    user_password: { type: "string", pattern: "^[A-Za-z0-9.!#$%&‘*+=?^_`{|}~-]{4,}$"}
  }
}
const productSchema = {
  type: "object",
  required: ["product_name", "id_product_category", "product_price"],
  properties: {
    product_name: {type: "string"},
    id_product_category: {type: "number"},
    product_price: {type: "number"}
  }
}
const orderSchema = {
  type: "object",
  required: ["id_user", "id_paying_method","products"],
  properties: {
    id_user: {type: "number"},
    id_paying_method: {type: "number"},
    products: {type: "array"}
  }
}
// Exports:
module.exports = {
  registerSchema,
  loginSchema,
  productSchema,
  orderSchema
}