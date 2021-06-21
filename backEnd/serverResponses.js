// *************************************** RESPONSE MESSAGES ******************************************
const okReponse200 = {
  Status: 200,
  Message: "",
  Result: []
}
const createdResponse201 = {
  Status: 201,
  Message: "User created successfully.",
  Result : []
}
const forbiddenResponse401 = {
  Status: 401,
  Message: "",
  Result: "Forbidden access"
}
const notAuthorizedResponse403 = {
  Status: 403,
  Message: "The user's cretendials doesn't allow them to complete this request. Only an Administrator has the authorization.",
  Result: "Unaouthorized"
};
const conflictResponse409 = {
  Status: 409,
  Message: " ",
  Result: "Conflict."
}
// Exports:
module.exports = {
  okReponse200,
  createdResponse201,
  forbiddenResponse401,
  notAuthorizedResponse403,
  conflictResponse409
}