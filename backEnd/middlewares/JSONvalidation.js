const Ajv = require("ajv");
const ajv = new Ajv({allErrors: true});


const validateSchema = schema => {
  return function (req, res, next) {
    const validate = ajv.compile(schema);
    const incomingData = req.body;
    const valid = validate(incomingData);
    if (valid){
      console.log(valid);
      next();
    }
    if (!valid) {
      console.log(valid);
      console.log("jodido");
      console.log(schema)
      res.send(validate.errors);
    }
  }
}

module.exports = {
  validateSchema
}