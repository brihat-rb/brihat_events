var event_req = new XMLHttpRequest();
var event_url = 'https://raw.githubusercontent.com/brihat-rb/brihat-rb.github.io/master/calendar/data/international_events.json';
var events = JSON.parse("{}");

event_req.open('GET', event_url, false);
event_req.onload = function () {
  events = JSON.parse(this.response)["data"];
  count = 1;
  for (var date = 1; date <= 31; date++) {
    var tr_elem = document.createElement('tr');
    var td_date = document.createElement('td');
    td_date.innerHTML = date;
    td_date.setAttribute("class", "text-center");
    tr_elem.appendChild(td_date);

    for (var month = 1; month <= 12; month++) {
      event_key = month.toString().padStart(2, "0") + "-" + date.toString().padStart(2, "0");
      var td_elem = document.createElement('td');
      if (events.hasOwnProperty(event_key)) {
        td_elem.innerHTML = events[event_key][0].replaceAll(" / ", "<br />");
        td_elem.setAttribute("class", "text-center text-nowrap");
        td_elem.addEventListener("mouseover", handle_cell_hover, false);
        td_elem.addEventListener("mouseout", handle_cell_hoverout, false);
        td_elem.setAttribute("title", AD_MONTHS[month - 1] + " " + date + " | " + AD_MONTHS_NEP[month - 1] + " " + arabic_number_to_nepali(date) + "\n" + events[event_key][1].replaceAll(" / ", "\n"))
        tr_elem.appendChild(td_elem);
      }
      else {
        td_elem.innerHTML = "---";
        td_elem.setAttribute("class", "text-center text-nowrap");
        td_elem.addEventListener("mouseover", handle_cell_hover, false);
        td_elem.addEventListener("mouseout", handle_cell_hoverout, false);
        tr_elem.appendChild(td_elem);
      }
    }

    var td_date_right = document.createElement('td');
    td_date_right.innerHTML = date;
    td_date_right.setAttribute("class", "text-center");
    tr_elem.appendChild(td_date_right);
    document.getElementById("table_body").appendChild(tr_elem);
  }
}

event_req.onerror = function () {
  content.innerHTML = "Error Occured";
}

event_req.send();

var today = new Date();
var today_row = today.getDate() - 1;
var today_column = today.getMonth() + 1;
today_td = document.getElementById('table_body').rows[today_row].cells[today_column];
today_td.classList.add("cell-today");
scroll_to_today_element(today_td);