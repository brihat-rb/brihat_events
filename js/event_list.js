var nevents = "";
var ievents = "";
var snsevents = "";
var other_events = "";
var lunar_events = "";
var lunar_data = "";
var public_holiday_events = "";

const today_date = new Date();
const today_bs_date = convert_ad_to_bs(today_date.getFullYear(), today_date.getMonth() + 1, today_date.getDate()).split(" ");
var today_date_id = today_bs_date[0] + "-" + today_bs_date[1].padStart(2, "0") + "-" + today_bs_date[2].padStart(2, "0");
const today_year = today_bs_date[0];
document.getElementById("event_year").value = today_year;

// GET EVENTS JSON
const nat_event_url = 'https://raw.githubusercontent.com/brihat-rb/brihat-rb.github.io/master/calendar/data/national_events.json';
const int_event_url = 'https://raw.githubusercontent.com/brihat-rb/brihat-rb.github.io/master/calendar/data/international_events.json';
const solar_ns_event_url = 'https://raw.githubusercontent.com/brihat-rb/brihat-rb.github.io/master/calendar/data/solar_ns_events.json';
const other_calendar_event_url = 'https://raw.githubusercontent.com/brihat-rb/brihat-rb.github.io/master/calendar/data/other_calendar_events.json';
const lunar_event_url = "https://raw.githubusercontent.com/brihat-rb/brihat-rb.github.io/master/calendar/data/" + today_year + "_detailed.json";
const public_holiday_event_url = 'https://raw.githubusercontent.com/brihat-rb/brihat_calendar/main/data/public_holidays_in_nepal.json';

const nat_event_req = new XMLHttpRequest();
const int_event_req = new XMLHttpRequest();
const solar_ns_event_req = new XMLHttpRequest();
const other_calendar_event_req = new XMLHttpRequest();
const lunar_event_req = new XMLHttpRequest();
const public_holiday_event_req = new XMLHttpRequest();

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
    lunar_data = lunar_events.data;
    console.info("Lunar Events Loaded!");
}

public_holiday_event_req.open('GET', public_holiday_event_url, false);
public_holiday_event_req.onload = function() {
    public_holiday_events = JSON.parse(this.response);
    console.info("Public Holiday Events Loaded!");
}

nat_event_req.send();
int_event_req.send();
solar_ns_event_req.send();
other_calendar_event_req.send();
lunar_event_req.send();
public_holiday_event_req.send();
