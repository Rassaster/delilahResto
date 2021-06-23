const Ajv = require("ajv");
const ajv = new Ajv({allErrors: true});
const { badRequesResponse400 } = require("../serverResponses")
// Check and validate the incoming JSON format:
const validateJSONSchema = schema => {
  return function (req, res, next) {
    const validate = ajv.compile(schema);
    const incomingData = req.body;
    const valid = validate(incomingData);
    if (valid){
      next();
    }
    if (!valid) {
      res.send(validate.errors);
    }
  }
}
// Module Exports:
module.exports = {
  validateJSONSchema
}

// TO DO: Check how errors are being handled, the error message send to the user. TryCatch is missing!