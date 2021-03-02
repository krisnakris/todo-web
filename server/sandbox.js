const axios = require('axios');

axios ({
  method : 'GET',
  url : ' https://stoicquotesapi.com/v1/api/quotes/random'
})
  .then(response => {
    console.log(response.data);
  })
  .catch(err => {
    console.log(err);
  })