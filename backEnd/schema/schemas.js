const registerSchema = {
  type: "object",
  required: ["usuario", "nombre_apellido", "email", "numero_celular", "direccion", "clave", "es_admin"],
  properties: {
    usuario: { type: "string"},
    nombre_apellido: { type: "string"},
    email: { type: "string"},
    numero_celular: { type: "string"},
    direccion: { type: "string"},
    clave: { type: "string"},
    es_admin: { type: "number"},
  }
}

// Exports:
module.exports = {
  registerSchema
}