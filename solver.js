var request = require('request');

module.exports.solver = (url)=>{
  return new Promise((resolve, reject)=>{
    var options = {
      'method': 'POST',
      'url': 'https://engageub.pythonanywhere.com',
      'headers': {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      form: {
        'input': url,
        'lang': 'en'
      }
    };
    request(options, function (error, response) {
      if (error) {throw new Error(error); reject(error)}
      if(response.body == 0){
        reject(response.body)
      }else{
        resolve(response.body);
      }
    });  
  })
}