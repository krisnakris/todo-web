function errorHandler (err, req, res, next) {
  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    let errors = [];

    for (let i = 0; i < err.errors.length; i++) {
      errors.push(err.errors[i].message);
    }
    res.status(400).json({
      message: err.message,
      errors
    })
  } else if (err.code == 400) {
    res.status(400).json({errors : err.message});
  } else if (err.code == 401) {
    res.status(err.code).json({errors : err.message});
  } else if (err.code == 404) {
    res.status(err.code).json({errors : err.message});
  } else if (err.code == 500) {
    res.status(err.code).json({errors : err.message});
  } 

}

module.exports = errorHandler;