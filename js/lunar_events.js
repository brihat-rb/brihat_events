var event_req = new XMLHttpRequest();
var event_url = 'https://raw.githubusercontent.com/brihat-rb/brihat_events/master/data/events.json';
var events = JSON.parse("{}");

event_req.open('GET', event_url, false);
event_req.onload = function () {
  events = JSON.parse(this.response);
  count = 1;
  for (month in events) {
    var tr_elem = document.createElement('tr');

    var td_elem = document.createElement('td');
    td_elem.innerHTML = arabic_number_to_nepali(count++);
    td_elem.setAttribute("class", "text-center");
    tr_elem.appendChild(td_elem);

    var td_month = document.createElement('td');
    td_month.innerHTML = month;
    td_month.innerHTML += "<br />(" + events[month]["eq_names"][0] + ")";
    td_month.setAttribute("class", "text-center text-nowrap");
    tr_elem.appendChild(td_month);

    for (tithi in events[month]) {
      if (tithi == "eq_names") {
        continue;
      }

      // This case will be addressed in following next case, so can be skipped
      else if (tithi == "पूर्णिमा") {
        continue;
      }

      // To combine औंसी and पूर्णिमा events into one (also addressed above case of पूर्णिमा)
      else if (tithi == "औंसी" && events[month][tithi][0] == "xxxxx") {
        tithi = "पूर्णिमा";
      }

      // To address other special case in future, blank for now
      else {
        // continue as usual
      }

      var td_elems = document.createElement('td');
      td_elems.setAttribute("id", month + "_" + tithi);
      td_elems.setAttribute("class", "text-center text-nowrap");
      td_elems.setAttribute("title", month + " (" + events[month]["eq_names"][0] + ") " + tithi);
      var individual_events = events[month][tithi];

      td_elems.innerHTML = "";
      if (individual_events == "") {
        td_elems.innerHTML = "---";
      }
      else {
        for (e in individual_events) {
          td_elems.innerHTML += individual_events[e] + "</br>";
        }
      }
      tr_elem.appendChild(td_elems);
    }

    var td_month_right = document.createElement('td');
    td_month_right.innerHTML = month;
    td_month_right.innerHTML += "<br />(" + events[month]["eq_names"][0] + ")";
    td_month_right.setAttribute("class", "text-center text-nowrap");
    tr_elem.appendChild(td_month_right);

    document.getElementById("table_body").appendChild(tr_elem);
  }
}

event_req.onerror = function () {
  content.innerHTML = "Error Occured";
}

event_req.send();

var today_ad = new Date();
var today_bs = convert_ad_to_bs(today_ad.getFullYear(), today_ad.getMonth() + 1, today_ad.getDate()).split(" ");
var today_bs_detail = JSON.parse(get_bs_date_detail(today_bs[0], today_bs[1], today_bs[2]));
var today_id = today_bs_detail.lunar_month + "_" + today_bs_detail.tithi;
today_td = document.getElementById(today_id);
today_td.classList.add("cell-today");
scroll_to_today_element(today_td);