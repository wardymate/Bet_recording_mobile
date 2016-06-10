var api = {
  getBookmakers() {
    var url = "http://localhost:3000/api/v1/bookmakers";
      return fetch(url).then(res => res.json())
  },

  getBookmakerData(bookmakerId) {
    var url = "http://localhost:3000/api/v1/bet_requests?bookmakerId=" + bookmakerId;
      return fetch(url).then(res => res.json())
  },

  requestLogin(email, password) {
    var url = "http://localhost:3000/api/v1/sessions";
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    var payload = {
      email: email,
      password: password
    };
    var data = JSON.stringify( payload );
    return fetch(url, { method: "POST", headers: headers, body: data} ).then(res => res.json())
  },

  confirmBetRequest(betRequest) {
 
  }

};

module.exports = api;
