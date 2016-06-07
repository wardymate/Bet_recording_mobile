var api = {
  getBookmakers() {
    var url = "http://localhost:3000/api/v1/bookmakers";
      return fetch(url).then(res => res.json())
  },

  getBookmakerData(bookmakerId) {
    var url = "http://localhost:3000/api/v1/bet_requests?bookmakerId=" + bookmakerId;
      return fetch(url).then(res => res.json())
  }

};

module.exports = api;
