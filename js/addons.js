function scroll_to_today() {
    window.scrollTo(0, 0);

    var today = new Date();
    var today_date_list = convert_ad_to_bs(today.getFullYear(), today.getMonth() + 1, today.getDate()).split(" ");
    
    if (view == 2 || view == 3) {
        if(document.getElementById("year").value != today_date_list[0]) {
            return;
        }
    }

    var today_mm_dd = today_date_list[1].padStart(2, "0") + "-" + today_date_list[2].padStart(2, "0");
    var today_mm_dd_2 = today_mm_dd;
    var today_element = document.getElementById(today_mm_dd);

    if(view == 4) { // INTERNATIONAL EVENTS CASE
        today_mm_dd = (today.getMonth() + 1).toString().padStart(2, "0") + "-" + today.getDate().toString().padStart(2, "0") + "_EN";
        today_mm_dd_2 = today_mm_dd.replace("_EN", "_NP");
    }
    else if (view != 2 ) { // NATIONAL EVENTS AND PUBLIC HOLIDAY EVENTS CASE
        today_mm_dd += "_NP";
        today_mm_dd_2 = today_mm_dd.replace("_NP", "_EN");
    }
    else { // LUNAR EVENTS CASE AND OTHER ...
        
    }

    today_element = document.getElementById(today_mm_dd);
    today_element_2 = document.getElementById(today_mm_dd_2);

    if(today_element != null) {
        var rect = today_element.getBoundingClientRect()
        var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        
        window.scroll({
            top:        rect.top + rect.height / 2 - viewHeight / 2,
            behavior:   'smooth' // smooth scroll
        });

        console.info("Scrolling to Today's Events:");
        while (today_element.id == today_mm_dd) {
            console.info("  ", today_element.innerText);
            today_element.style.color = "teal";
            today_element.style.fontWeight = "bolder";
            if(today_element.classList.contains("national")) {
              today_element.style.backgroundColor = "pink";
            }
            else if(today_element.classList.contains("specific")) {
              today_element.style.backgroundColor = "lightseagreen";
            }
            else {
              today_element.style.backgroundColor = "lightgray";
            }
            today_element = today_element.nextElementSibling;
        } 
        
        if (view != 2) {
            while (today_element_2.id == today_mm_dd_2) {
                console.info("  ", today_element_2.innerText);
                today_element_2.style.color = "teal";
                today_element_2.style.fontWeight = "bolder";
                if(today_element_2.classList.contains("national")) {
                  today_element_2.style.backgroundColor = "pink";
                }
                else if(today_element_2.classList.contains("specific")) {
                  today_element_2.style.backgroundColor = "lightseagreen";
                }
                else {
                  today_element_2.style.backgroundColor = "lightgray";
                }
                today_element_2 = today_element_2.nextElementSibling;
            } 
        }
    }
    else {
        var all_spans = document.getElementById("main_div").getElementsByTagName("span");
        var i = 0;
        if(view == 2) {
            while(all_spans[i].id.length != 5) i++;
            while(all_spans[i].id < today_mm_dd) i++;
        }
        else {
            while(all_spans[i].id.length != 8) i++;
            while(all_spans[i].id < today_mm_dd) i++;
        }
        nearest_element = all_spans[i];
        
        var rect = nearest_element.getBoundingClientRect()
        var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        
        window.scroll({
            top:        rect.top + rect.height / 2 - viewHeight / 2,
            behavior:   'smooth' // smooth scroll
        });
    }
}


function scroll_to_today_element(today_element) {
  window.scrollTo(0, 0);

  if (today_element != null) {
    var rect = today_element.getBoundingClientRect()
    var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    var viewWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

    window.scroll({
      top: rect.top + rect.height / 2 - viewHeight / 2,
      left: rect.left + rect.width / 2 - viewWidth / 2,
      behavior: 'smooth' // smooth scroll
    });
  }
}

function get_bs_date_detail(bs_year, bs_month, bs_date) {
  var json_url = "";
  var date_detail = '{}';

  if (bs_year >= 2076 && bs_year <= 2080) {
    json_url = 'https://raw.githubusercontent.com/brihat-rb/brihat-rb.github.io/master/calendar/data/' + bs_year + '_detailed.json';
  }
  else if (bs_year >= 2070 && bs_year <= 2075) {
    json_url = 'https://raw.githubusercontent.com/brihat-rb/brihat-rb.github.io/master/calendar/data/' + bs_year + '.json';
  }
  else {
    return '{}';
  }

  var nepal_event_req = new XMLHttpRequest();
  nepal_event_req.open('GET', json_url, false);
  nepal_event_req.onload = function () {
    var events = JSON.parse(this.response);
    date_detail = JSON.stringify(events.data[parseInt(bs_month) - 1][parseInt(bs_date) - 1]);
  }
  nepal_event_req.send();

  return date_detail;
}

function set_saturday_color() {
    var all_saturday_spans = document.getElementsByClassName("saturday");
    for(var i = 0; i < all_saturday_spans.length; i++) {
        var parent_span = all_saturday_spans[i].parentNode;
        parent_span.style.color = "crimson";
    }
}
