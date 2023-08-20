window.scrollTo(0, 0);

const tbody = document.getElementById("table_body");

const lunar_data = lunar_events.data;
const table_design = ["table-primary", "table-success", "table-danger", "table-warning", "table-info", "table-light", "table-danger", "table-primary", "table-warning", "table-success", "table-info", "table-danger"];
const today_date_id = today_bs_date[0] + "-" + today_bs_date[1].padStart(2, "0") + "-" + today_bs_date[2].padStart(2, "0");

var count = 1;
for(var i = 0; i < lunar_data.length; i++) {
    for(var j = 0; j < lunar_data[i].length; j++) {
        var table_row = document.createElement("tr");
        var date_data = lunar_data[i][j];
        table_row.classList.add(table_design[i]);
        table_row.setAttribute("id", date_data.date);

        // SNo
        var table_data_sn = document.createElement("td");
        table_data_sn.setAttribute("id", "row_" + count);
        table_data_sn.classList.add("text-nowrap", "text-center", "align-top");
        table_data_sn.innerHTML = count++;
        // table_data_sn.innerHTML = arabic_number_to_nepali(count++);
        table_row.appendChild(table_data_sn);

        var bs_date_split = date_data.date.split("-");
        var bs_ad_date = convert_bs_to_ad(bs_date_split[0], bs_date_split[1], bs_date_split[2]);
        var ad_date_split = bs_ad_date.split(" ");
        var ad_date = ad_date_split[0] + " " + AD_MONTHS_SHORT[ad_date_split[1] - 1] + " " + ad_date_split[2];
        var weekday = new Date(bs_ad_date).getDay();

        // // BS AD DATE
        // var table_data_bs_date = document.createElement("td");
        // table_data_bs_date.classList.add("text-nowrap", "text-center", "align-top");
        // table_data_bs_date.setAttribute("id", date_data.date + "_bsaddate");
        // table_data_bs_date.innerHTML = arabic_number_to_nepali(bs_date_split[0]) + " " + BS_MONTHS_NEP[bs_date_split[1] - 1] + " " + arabic_number_to_nepali(bs_date_split[2].replace(/^0+/, '')) + " (" + NEPALI_DAYS_SHORT[weekday] + ")<br />";
        // table_data_bs_date.innerHTML += ad_date + " (" + ENGLISH_DAYS_SHORT[weekday] + ")";
        // table_row.appendChild(table_data_bs_date);
        
        // // LUNAR INFO
        // var table_data_lunar_info = document.createElement("td");
        // table_data_lunar_info.classList.add("text-nowrap", "align-top");
        // table_data_lunar_info.setAttribute("id", date_data.date + "_lunardate");
        // table_data_lunar_info.innerHTML = arabic_number_to_nepali(date_data.ns_year) + "&nbsp;" + date_data.lunar_month + "&nbsp;" + date_data.tithi + "<br />";
        // table_data_lunar_info.innerHTML += "(" + date_data.pakshya + "&nbsp;" + date_data.tithi + ")";
        // table_row.appendChild(table_data_lunar_info);

        // BS AD NS DATE
        var table_data_date = document.createElement("td");
        table_data_date.classList.add("text-center", "align-top");
        table_data_date.setAttribute("id", date_data.date + "_date");
        table_data_date.innerHTML = arabic_number_to_nepali(bs_date_split[0]) + " " + BS_MONTHS_NEP[bs_date_split[1] - 1] + " " + arabic_number_to_nepali(bs_date_split[2].replace(/^0+/, '')) + " (" + NEPALI_DAYS_SHORT[weekday] + ")<br />";
        table_data_date.innerHTML += arabic_number_to_nepali(date_data.ns_year) + "&nbsp;" + date_data.lunar_month + "&nbsp;" + date_data.tithi + "<br />";
        table_data_date.innerHTML += ad_date + " (" + ENGLISH_DAYS_SHORT[weekday] + ")";
        table_data_date.setAttribute("title", arabic_number_to_nepali(date_data.ns_year) + " " + date_data.pakshya + " " + date_data.tithi);
        table_row.appendChild(table_data_date);
        
        // LUNAR EVENTS
        var table_data_lunar_events = document.createElement("td");
        table_data_lunar_events.classList.add("lunar_events", "align-top");
        table_data_lunar_events.setAttribute("id", date_data.date + "_lunar");
        table_data_lunar_events.innerHTML = "";
        if(date_data.lunar_event_one != "") {
           table_data_lunar_events.innerHTML += date_data.lunar_event_one.replaceAll("/","<br />");
        }
        if(date_data.lunar_event_two != "") {
            if(table_data_lunar_events.innerHTML != "") {
                table_data_lunar_events.innerHTML += "<br />";
            }
            table_data_lunar_events.innerHTML += date_data.lunar_event_two.replaceAll("/","<br />");
        }
        if(date_data.lunar_event_three != "") {
            if(table_data_lunar_events.innerHTML != "") {
                table_data_lunar_events.innerHTML += "<br />";
            }
            table_data_lunar_events.innerHTML += date_data.lunar_event_three.replaceAll("/","<br />");
        }
        table_row.appendChild(table_data_lunar_events);
        
        // NATIONAL EVENTS
        var table_data_nat_events = document.createElement("td");
        table_data_nat_events.classList.add("national_events", "align-top");
        table_data_nat_events.setAttribute("id", date_data.date + "_national");
        if (nevents.data.hasOwnProperty(date_data.date.slice(5,10))) {
            table_data_nat_events.innerHTML = nevents.data[date_data.date.slice(5,10)][1].replaceAll("/","<br />");
            table_data_nat_events.setAttribute("title", nevents.data[date_data.date.slice(5,10)][0].replaceAll("/","\n"));
        }
        table_row.appendChild(table_data_nat_events);
        
        // INTERNATIONAL EVENTS
        var ad_date_key = ad_date_split[1].padStart(2,"0") + "-" + ad_date_split[2].padStart(2, "0");
        var table_data_internat_events = document.createElement("td");
        table_data_internat_events.classList.add("international_events", "align-top");
        table_data_internat_events.setAttribute("id", date_data.date + "_international");
        if(ievents.data.hasOwnProperty(ad_date_key)) {
            table_data_internat_events.innerHTML = ievents.data[ad_date_key][0].replaceAll("/","<br />");
            // table_data_internat_events.innerHTML += "<br />" + ievents.data[ad_date_key][1].replaceAll("/","<br />");
            table_data_internat_events.setAttribute("title", ievents.data[ad_date_key][1].replaceAll("/","\n"));
        }
        table_row.appendChild(table_data_internat_events);

        // OTHER EVENTS
        var sns_date_split = convert_ad_to_ns(ad_date_split[0], ad_date_split[1], ad_date_split[2]).split(" ");
        var sns_date_key = sns_date_split[1].padStart(2,"0") + "-" + sns_date_split[2].padStart(2, "0");
        
        var table_data_other_events = document.createElement("td");
        table_data_other_events.classList.add("other_events", "align-top");
        table_data_other_events.setAttribute("id", date_data.date + "_other");
        if(snsevents.data.hasOwnProperty(sns_date_key)) {
            table_data_other_events.innerHTML = snsevents.data[sns_date_key][1].replaceAll("/","<br />");
            // table_data_other_events.innerHTML += "<br />" + snsevents.data[sns_date_key][0].replaceAll("/","<br />");
            table_data_other_events.setAttribute("title", snsevents.data[sns_date_key][0].replaceAll("/","\n"));
        }
        
        if(other_events.data.hasOwnProperty(ad_date_split[0])) {
            if(other_events.data[ad_date_split[0]].hasOwnProperty(ad_date_key)) {
                table_data_other_events.innerHTML = other_events.data[ad_date_split[0]][ad_date_key][1].replaceAll("/","<br />");
                // table_data_other_events.innerHTML += "<br />" + other_events.data[ad_date_split[0]][ad_date_key][0].replaceAll("/","<br />");
                table_data_other_events.setAttribute("title", other_events.data[ad_date_split[0]][ad_date_key][0].replaceAll("/","\n"));
            }
        }
        table_row.appendChild(table_data_other_events);

        // PUBLIC HOLIDAYS
        var table_data_holiday_remark = document.createElement("td");
        table_data_holiday_remark.classList.add("public_holiday_events", "align-top");
        table_data_holiday_remark.setAttribute("id", date_data.date + "_holiday");
        if(public_holiday_events.hasOwnProperty(bs_date_split[0])) {
            if(public_holiday_events[bs_date_split[0]].hasOwnProperty(date_data.date.slice(5,10))) {
                var public_holiday = public_holiday_events[bs_date_split[0]][date_data.date.slice(5,10)];
                table_data_holiday_remark.innerHTML = public_holiday[3].replaceAll("/","<br />") + "<br/>";
                // table_data_holiday_remark.innerHTML += " (" + public_holiday[0] + ")<br/>";
                table_data_holiday_remark.setAttribute("title", public_holiday[0].replaceAll("/","\n"));
                table_data_holiday_remark.innerHTML += public_holiday[2];
                table_row.classList.add(public_holiday[1]);
            }
        }

        table_row.appendChild(table_data_holiday_remark);
        tbody.appendChild(table_row);
    }
}

document.getElementById(today_date_id).classList.add("text-success");

$(document).ready(function () {
    const event_dt = $('#event_table').DataTable({
        fixedHeader: true,
        // paging: false,
        responsive: true,
        pagingType: "full_numbers",
        scrollX: true,
        "processing": true,
        "info": true,
        "ordering": false,
        "lengthMenu": [[10, 15, 25, 50, 75, 100, -1], [10, 15, 25, 50, 75, 100, "All"]],
        "pageLength": 15,
        "dom": '<if>rt<lp>',
        "drawCallback": function( settings ) {
            var api = this.api();
            var event_start_index = 2;
            var column_index = event_start_index;
            
            api.column(event_start_index++).visible(true);
            api.column(event_start_index++).visible(true);
            api.column(event_start_index++).visible(true);
            api.column(event_start_index++).visible(true);
            api.column(event_start_index++).visible(true);
            var info_classes = ["lunar_events", "national_events", "international_events", "other_events", "public_holiday_events"];
            
            for(event_class of info_classes) {
                var all_column_events = document.getElementsByClassName(event_class);
                var hide_this_column = true;
                for (var i = 0; i < all_column_events.length; i++) {
                    if(all_column_events[i].innerText != "") {
                        hide_this_column = false;
                        break;
                    }
                }
                api.column(column_index++).visible(!hide_this_column);
            }
        }
    });

    const today_index = event_dt.row('#' + today_date_id)[0][0];
    const page_length = document.getElementsByName("event_table_length")[0].value;
    const page = Math.floor(today_index / page_length);
    event_dt.page(page).draw('page');

    var today_element = document.getElementById(today_date_id);
    var rect = today_element.getBoundingClientRect()
    var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    
    window.scroll({
        top:        rect.top + rect.height / 2 - viewHeight / 2,
        behavior:   'smooth' // smooth scroll
    });
});
