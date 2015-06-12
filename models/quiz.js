// Definicion del modelo de Quiz

module.exports = function(sequlize, DataTypes) {
    return sequlize.define('Quiz',
        {   pregunta : DataTypes.STRING,
            respuesta : DataTypes.STRING
         });
}