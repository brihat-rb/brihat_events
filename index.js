var view = 2;

function arabic_number_to_nepali(number){
    number = number.toString();
    var nepali_number = "";
    for(var i = 0; i < number.length; i++) {
        nepali_number += NEPALI_DIGITS[parseInt(number.charAt(i))];
    }
    return nepali_number;
}

function add_public_holiday(query_year) {
    var public_holidays = JSON.parse("{}");
    var public_holiday_req = new XMLHttpRequest();
    var public_holiday_url = 'https://raw.githubusercontent.com/brihat-rb/brihat_calendar/main/data/public_holidays_in_nepal.json';
    
    public_holiday_req.open('GET', public_holiday_url, false);
    public_holiday_req.onload = function() {
        public_holidays = JSON.parse(this.response);
        if (public_holiday_req.status === 200) {
            var public_holidays_keys_list = Object.keys(public_holidays[query_year]).slice(1,-1).sort();
            var span_list = document.getElementsByClassName("lunar_event");
            for(var i = 0; i < span_list.length; i++) {
                if (public_holidays_keys_list.includes(span_list[i].id)) {
                    span_list[i].classList.add(public_holidays[query_year][span_list[i].id][1]);
                }
            }
        }
        else {
            console.warn('Cannot fetch Public Holiday Data for Lunar Events');
        }
    }
    public_holiday_req.send();
}

function show_national_event() {
    var nat_events = JSON.parse("{}");
    var nat_event_req = new XMLHttpRequest();
    var national_event_url = 'https://raw.githubusercontent.com/brihat-rb/brihat-rb.github.io/master/calendar/data/national_events.json';
    
    nat_event_req.open('GET', national_event_url, false);
    nat_event_req.onload = function() {
        nat_events = JSON.parse(this.response);
        if (nat_event_req.status === 200) {
            console.info('National Events Fetched');
            span_html = "";
            var nat_events_keys_list = Object.keys(nat_events["data"]).slice(1).sort();
            var index = 1;
            nat_events_keys_list.forEach(key => {
                key_list = key.split("-");
                nat_events["data"][key][1].split("/").forEach(event => {
                    span_html += "<span>&ensp;[" + arabic_number_to_nepali(index) + "] ";
                    span_html += BS_MONTHS_NEP[key_list[0] - 1] + " " + arabic_number_to_nepali(parseInt(key_list[1])) + " गते - ";
                    span_html += event;
                    span_html += "</span><br />";
                });

                nat_events["data"][key][0].split("/").forEach(event => {
                    span_html += "<span>&ensp;[" + index + "] ";
                    span_html += BS_MONTHS_ENG[key_list[0] - 1] + " " + parseInt(key_list[1]) + " - ";
                    span_html += event;
                    span_html += "</span><br />";
                });
                span_html += "<br />";
                index++;
            });
            document.getElementById("main_div").innerHTML = span_html;
        }
        else {
            console.warn('Cannot fetch National Events Data');
        }
    }
    nat_event_req.send();
}

var day_event_array = null;
var lunar_events = "";

function show_lunar_event() {
    var query_year = document.getElementById("year").value;
    
    lunar_events = JSON.parse("{}");
    var lunar_event_req = new XMLHttpRequest();
    var lunar_event_url = "https://raw.githubusercontent.com/brihat-rb/brihat-rb.github.io/master/calendar/data/" + query_year + "_detailed.json";
    
    lunar_event_req.open('GET', lunar_event_url, false);
    lunar_event_req.onload = function() {
        lunar_events = JSON.parse(this.response);
        if (lunar_event_req.status === 200) {
            console.info('Lunar Events Fetched');
            
            span_html = '&ensp;<span style="color:crimson">&#9724; - सार्वजनिक बिदा (Public Holiday)</span><br />';
            span_html += '&ensp;<span style="color:darkblue">&#9724; - विशेष बिदा (Special Holiday)</span><br /><br />';
            
            var index = 1;
            for(var month = 0; month < 12; month++) {
                for(var date = 0; date < BS_CALENDAR_DATA[query_year][month]; date++) {
                    day_event_array = lunar_events["data"][month][date];
                    var has_events = false;
                    if(day_event_array.lunar_event_one != "") {
                        span_html += "<span class='lunar_event' id=" + day_event_array.date.slice(5,10) +">&ensp;[" + arabic_number_to_nepali(index++) + "] ";
                        span_html += BS_MONTHS_NEP[month] + " " + arabic_number_to_nepali(parseInt(date + 1)) + " गते - ";
                        span_html += day_event_array.lunar_event_one;
                        has_events = true;
                    }
                    if(day_event_array.lunar_event_two != "") {
                        if(day_event_array.lunar_event_one == "") {
                            span_html += "<span class='lunar_event' id=" + day_event_array.date.slice(5,10) +">&ensp;[" + arabic_number_to_nepali(index++) + "] ";
                            span_html += BS_MONTHS_NEP[month] + " " + arabic_number_to_nepali(parseInt(date + 1)) + " गते - ";
                            span_html += day_event_array.lunar_event_two;
                        }
                        else {
                            span_html += ", " + day_event_array.lunar_event_two;
                        }
                        has_events = true;
                    }
                    if(day_event_array.lunar_event_three != "") {
                        if(day_event_array.lunar_event_one == "" && day_event_array.lunar_event_two == "") {
                            span_html += "<span class='lunar_event' id=" + day_event_array.date.slice(5,10) +">&ensp;[" + arabic_number_to_nepali(index++) + "] ";
                            span_html += BS_MONTHS_NEP[month] + " " + arabic_number_to_nepali(parseInt(date + 1)) + " गते - ";
                            span_html += day_event_array.lunar_event_three;
                        }
                        else {
                            span_html += ", " + day_event_array.lunar_event_three;
                        }
                        has_events = true;
                    }
                    if(has_events) {
                        span_html += "</span><br />";
                    }
                }
                span_html += "<br />";
            }
            
            document.getElementById("main_div").innerHTML = span_html;
            add_public_holiday(query_year);   
        }
        else {
            console.warn('Cannot fetch Lunar Events Data');
        }
    }
    lunar_event_req.send();

    
}

function show_public_holiday() {
    var query_year = document.getElementById("year").value;
    
    var public_holidays = JSON.parse("{}");
    var public_holiday_req = new XMLHttpRequest();
    var public_holiday_url = 'https://raw.githubusercontent.com/brihat-rb/brihat_calendar/main/data/public_holidays_in_nepal.json';
    
    public_holiday_req.open('GET', public_holiday_url, false);
    public_holiday_req.onload = function() {
        public_holidays = JSON.parse(this.response);
        if (public_holiday_req.status === 200) {
            console.info('Public Holiday Fetched');
            span_html = '&ensp;<span style="color:crimson">&#9724; - सार्वजनिक बिदा (Public Holiday)</span><br />';
            span_html += '&ensp;<span style="color:darkblue">&#9724; -  विशेष बिदा (Special Holiday)</span><br /><br />';
            var public_holidays_keys_list = Object.keys(public_holidays[query_year]).slice(1,-1).sort();
            var index = 1;
            public_holidays_keys_list.forEach(key => {
                key_list = key.split("-");
                span_html += "<span class=" + public_holidays[query_year][key][1] + ">";
                span_html += "&ensp;[" + arabic_number_to_nepali(index) + "] ";
                span_html += BS_MONTHS_NEP[key_list[0] - 1] + " " + arabic_number_to_nepali(parseInt(key_list[1])) + " गते - ";
                span_html += public_holidays[query_year][key][3];
                span_html += "</span><br />";

                span_html += "<span class=" + public_holidays[query_year][key][1] + ">";
                span_html += "&ensp;[" + index + "] ";
                span_html += BS_MONTHS_ENG[key_list[0] - 1] + " " + parseInt(key_list[1]) + " - ";
                span_html += public_holidays[query_year][key][0];
                span_html += "</span><br /><br />";

                index++;
            });
            document.getElementById("main_div").innerHTML = span_html;
        }
        else {
            console.warn('Cannot fetch Public Holiday Data');
        }
    }
    public_holiday_req.send();
}

function show_international_event() {
    var internat_events = JSON.parse("{}");
    var internat_event_req = new XMLHttpRequest();
    var international_event_url = 'https://raw.githubusercontent.com/brihat-rb/brihat-rb.github.io/master/calendar/data/international_events.json';
    
    internat_event_req.open('GET', international_event_url, false);
    internat_event_req.onload = function() {
        internat_events = JSON.parse(this.response);
        if (internat_event_req.status === 200) {
            console.info('International Events Fetched');
            span_html = "";
            var internat_events_keys_list = Object.keys(internat_events["data"]).slice(1).sort();
            var index = 1;
            internat_events_keys_list.forEach(key => {
                key_list = key.split("-");
                internat_events["data"][key][0].split("/").forEach(event => {
                    span_html += "<span>&ensp;[" + index + "] ";
                    span_html += AD_MONTHS_ENG[key_list[0] - 1] + " " + parseInt(key_list[1]) + " - ";
                    span_html += event;
                    span_html += "</span><br />";
                });

                internat_events["data"][key][1].split("/").forEach(event => {
                    span_html += "<span>&ensp;[" + arabic_number_to_nepali(index) + "] ";
                    span_html += AD_MONTHS_NEP[key_list[0] - 1] + " " + arabic_number_to_nepali(parseInt(key_list[1])) + " - ";
                    span_html += event;
                    span_html += "</span><br />";
                });
                span_html += "<br />";
                
                index++;
            });
            document.getElementById("main_div").innerHTML = span_html;
        }
        else {
            console.warn('Cannot fetch International Events Data');
        }
    }
    internat_event_req.send();
}

function show_content(option=view) {
    view = option;
    document.getElementById("national_events").classList.remove("selected");
    document.getElementById("lunar_events").classList.remove("selected");
    document.getElementById("holiday_events").classList.remove("selected");
    document.getElementById("international_events").classList.remove("selected");
    document.getElementById("national_events").classList.add("not_selected");
    document.getElementById("lunar_events").classList.add("not_selected");
    document.getElementById("holiday_events").classList.add("not_selected");
    document.getElementById("international_events").classList.add("not_selected");
    document.getElementById("year_select").style.display = "none";
    switch(option) {
        case 1:
            document.getElementById("national_events").classList.add("selected");
            document.getElementById("national_events").classList.remove("not_selected");
            show_national_event();
            break;
        case 2:
            document.getElementById("lunar_events").classList.add("selected");
            document.getElementById("lunar_events").classList.remove("not_selected");
            document.getElementById("year_select").style.display = "block";
            show_lunar_event();
            break;
        case 4:
            document.getElementById("international_events").classList.add("selected");
            document.getElementById("international_events").classList.remove("not_selected");
            show_international_event();
            break;
        case 3:
        default:
            document.getElementById("holiday_events").classList.add("selected");
            document.getElementById("holiday_events").classList.remove("not_selected");
            document.getElementById("year_select").style.display = "block";
            show_public_holiday();
    }
}

document.getElementById("year").value = DEFAULT_YEAR;
show_content(view);

