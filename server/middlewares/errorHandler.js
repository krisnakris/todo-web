function errorHandler (err, req, res, next) {

  if (err.name === 'SequelizeValidationError') {
    let errors = [];

    for (let i = 0; i < err.errors.length; i++) {
      errors.push(err.errors[i].message);
    }

    res.status(400).json({
      message: err.message,
      ListErrors : errors
    })
  } else if (err.code == 401) {
    res.status(err.code).json( {message : err.message});
  } else if (err.code == 500) {
    res.status(err.code).json( {message : err.message});
  }

}

module.exports = errorHandler;