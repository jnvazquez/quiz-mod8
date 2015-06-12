var models = require('../models/models.js');

// Autoload - factoriza el código si ruta incluye :quizId
exports.load = function(req, res, next, quizId) {
  models.Quiz.find(quizId).then(
      function(quiz) {
        if (quiz) {
          req.quiz = quiz;
          next();
        } else { next(new Error('No existe quizId=' + quizId)); }
      }
    ).catch(function(error) {next(error);});
};

// GET /quizes
exports.index = function(req, res) {
  var searchStr = req.query.search;
  if (searchStr !== undefined) {
    models.Quiz.findAll({ 
        where : ['pregunta like ?', '%' + searchStr.replace(' ', '%') + '%'],
        order : [['pregunta', 'DESC']]
    })
      .then(function(quizes) {
        res.render('quizes/index.ejs', { quizes : quizes });
    })
  } else {
    models.Quiz.findAll().then(function(quizes) {
        res.render('quizes/index.ejs', { quizes : [] });
    })  
  }
};

// GET /quizes/:id
exports.show = function(req, res) {
  res.render('quizes/show', { quiz : req.quiz});
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
  var resultado = 'Incorrecto';
  if (req.query.respuesta.toLowerCase() === req.quiz.respuesta.toLowerCase()) {
    resultado = 'Correcto';
  }
  res.render('quizes/answer',
            { quiz : req.quiz, respuesta : resultado});
};

// GET /author
exports.author = function(req, res) {
    var data = [];
    var autor = new Object;
    autor['nombre'] = 'Jorge Navarro';
    autor['imagen'] = '/images/author_1.png';
    data.push(autor);
    res.render('author', {autores: data});
};