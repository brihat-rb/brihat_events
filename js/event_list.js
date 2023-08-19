var nevents = "";
var ievents = "";
var snsevents = "";
var other_events = "";
var lunar_events = "";

var today_date = new Date();
var today_bs_date = convert_ad_to_bs(today_date.getFullYear(), today_date.getMonth() + 1, today_date.getDate()).split(" ");
var today_year = today_bs_date[0];
document.getElementById("title_year").innerHTML = today_year;

// GET EVENTS JSON
var nat_event_url = 'https://raw.githubusercontent.com/brihat-rb/brihat-rb.github.io/master/calendar/data/national_events.json';
var int_event_url = 'https://raw.githubusercontent.com/brihat-rb/brihat-rb.github.io/master/calendar/data/international_events.json';
var solar_ns_event_url = 'https://raw.githubusercontent.com/brihat-rb/brihat-rb.github.io/master/calendar/data/solar_ns_events.json';
var other_calendar_event_url = 'https://raw.githubusercontent.com/brihat-rb/brihat-rb.github.io/master/calendar/data/other_calendar_events.json';
var lunar_event_url = "https://raw.githubusercontent.com/brihat-rb/brihat-rb.github.io/master/calendar/data/" + today_year + "_detailed.json";

var nat_event_req = new XMLHttpRequest();
var int_event_req = new XMLHttpRequest();
var solar_ns_event_req = new XMLHttpRequest();
var other_calendar_event_req = new XMLHttpRequest();
var lunar_event_req = new XMLHttpRequest();

int_event_req.open('GET', int_event_url, false);
int_event_req.onload = function() {
  ievents = JSON.parse(this.response);
  console.info("International Events Loaded!");
}

nat_event_req.open('GET', nat_event_url, false);
nat_event_req.onload = function() {
    nevents = JSON.parse(this.response);
    console.info("National Events Loaded!");
}

solar_ns_event_req.open('GET', solar_ns_event_url, false);
solar_ns_event_req.onload = function() {
    snsevents = JSON.parse(this.response);
    console.info("Solar Nepal Sambat Events Loaded!");
}

other_calendar_event_req.open('GET', other_calendar_event_url, false);
other_calendar_event_req.onload = function() {
    other_events = JSON.parse(this.response);
    console.info("Miscellaneous Events Loaded!");
}

lunar_event_req.open('GET', lunar_event_url, false);
lunar_event_req.onload = function() {
    lunar_events = JSON.parse(this.response);
    console.info("Lunar Events Loaded!");
}

nat_event_req.send();
int_event_req.send();
solar_ns_event_req.send();
other_calendar_event_req.send();
lunar_event_req.send();
