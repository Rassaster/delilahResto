const registerSchema = {
  type: "object",
  required: ["username", "fullname", "email", "cellphone_number", "delivery_address", "user_password", "is_admin"],
  properties: {
    username: { type: "string"},
    fullname: { type: "string"},
    email: { type: "string"},
    cellphone_number: { type: "string"},
    delivery_address: { type: "string"},
    user_password: { type: "string"},
    is_admin: { type: "string"},
  }
}
// Exports:
module.exports = {
  registerSchema
}