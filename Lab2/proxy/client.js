const axios = require('axios');
const conf = require('./service')

async function makeRequest(){
    try {
        const response = await axios.get(conf.get('url'));
        return response

      } catch (error) {
        console.error(error);
      }
}

module.exports = {makeRequest}