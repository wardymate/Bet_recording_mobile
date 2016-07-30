// var baseUrl = "http://localhost:3000";
var baseUrl = "http://192.168.1.66:3000";
// var baseUrl = "https://punting-staging.herokuapp.com";

var api = {
  getBookmakers() {
    var url = baseUrl + "/api/v1/bookmakers";
      return fetch(url).then(res => res.json())
  },

  getBets(token) {
    var url = baseUrl + "/api/v1/bets?token=" + token ;
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    return fetch(url)
      .then(res => res.json())
  },

  getBookmakerData(bookmakerId) {
    var url = baseUrl + "/api/v1/bet_requests?bookmakerId=" + bookmakerId;
      return fetch(url).then(res => res.json())
  },

  requestLogin(email, password) {
    var url = baseUrl + "/api/v1/sessions";
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    var payload = {
      email: email,
      password: password
    };
    var data = JSON.stringify( payload );
    return fetch(url, { method: "POST", headers: headers, body: data} )
      .then(res => res.json())
  },

  confirmBetRequest(betRequest, token, result, options) {
    var url = baseUrl + "/api/v1/bet_requests/confirm";
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    var payload = {
      betRequest: betRequest.id,
      token: token,
      result: result
    }
    payload = Object.assign(payload, options);
    var data = JSON.stringify( payload );
    return fetch(url, { method: "POST", headers: headers, body: data} ).then(res => res.json())
  }

};

module.exports = api;
