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
};
const loginSchema = {
  type: "object",
  required: ["email", "user_password"],
  properties: {
    email: { type: "string", pattern: "^[A-Za-z0-9._-]*@[a-z]*[.]com$"},
    user_password: { type: "string", pattern: "^[A-Za-z0-9.!#$%&‘*+=?^_`{|}~-]{4,}$"}
  }
};
const userByUsernameSchema = {
  type: "object",
  required: ["username"],
  properties: { username: { type: "string" } }
};
const userByEmailSchema = {
  type: "object",
  required: ["email"],
  properties: { email: { type: "string", pattern: "^[A-Za-z0-9._-]*@[a-z]*[.]com$" } }
};
const updateUserSchema = {
  type: "object",
  required: ["upd_username", "fullname", "upd_email", "cellphone_number", "delivery_address", "user_password", "is_admin"],
  properties: {
    upd_username: { type: "string"},
    fullname: { type: "string"},
    upd_email: { type: "string", pattern: "^[A-Za-z0-9._-]*@[a-z]*[.]com$"},
    cellphone_number: { type: "string"},
    delivery_address: { type: "string"},
    user_password: { type: "string", pattern: "^[A-Za-z0-9.!#$%&‘*+=?^_`{|}~-]{6,}$"},
    is_admin: { type: "string"},
  }
};
const productSchema = {
  type: "object",
  required: ["product_name", "id_product_category", "product_price"],
  properties: {
    product_name: {type: "string"},
    id_product_category: {type: "number", minimum: 1, maximum: 4},
    product_price: {type: "number"}
  }
};
const orderSchema = {
  type: "object",
  required: ["id_paying_method","products"],
  properties: {
    id_paying_method: {type: "number", minimum: 1, maximum: 4},
    products: {type: "array"}
  }
};
const updateOrderStatusSchema = {
  type: "object",
  required: ["id_order_status"],
  properties: {
    id_order_status: { type: "number", minimum: 1, maximum: 6}
  }
};
// Exports:
module.exports = {
  registerSchema,
  loginSchema,
  userByUsernameSchema,
  userByEmailSchema,
  updateUserSchema,
  productSchema,
  orderSchema,
  updateOrderStatusSchema
};