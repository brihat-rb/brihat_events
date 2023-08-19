var tbody = document.getElementById("table_body");

var lunar_data = lunar_events.data;
var table_design = ["table-primary", "table-success", "table-danger", "table-warning", "table-info", "table-light", "table-danger", "table-primary", "table-warning", "table-success", "table-info", "table-danger"];

var count = 1;
for(var i = 0; i < lunar_data.length; i++) {
    for(var j = 0; j < lunar_data[i].length; j++) {
        var table_row = document.createElement("tr");
        var date_data = lunar_data[i][j];
        table_row.classList.add(table_design[i]);
        table_row.setAttribute("id", date_data.date);
        
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

        var table_data_bs_date = document.createElement("td");
        table_data_bs_date.classList.add("text-nowrap", "text-center");
        table_data_bs_date.setAttribute("id", date_data.date + "_bsaddate");
        table_data_bs_date.innerHTML = arabic_number_to_nepali(bs_date_split[0]) + " " + BS_MONTHS_NEP[bs_date_split[1] - 1] + " " + arabic_number_to_nepali(bs_date_split[2].replace(/^0+/, '')) + " (" + NEPALI_DAYS_SHORT[weekday] + ")<br />";
        table_data_bs_date.innerHTML += ad_date + " (" + ENGLISH_DAYS_SHORT[weekday] + ")";
        table_row.appendChild(table_data_bs_date);
        
        var table_data_lunar_info = document.createElement("td");
        table_data_lunar_info.classList.add("text-nowrap");
        table_data_lunar_info.setAttribute("id", date_data.date + "_lunardate");
        table_data_lunar_info.innerHTML = arabic_number_to_nepali(date_data.ns_year) + "&nbsp;" + date_data.lunar_month + "&nbsp;" + date_data.tithi + "<br />";
        table_data_lunar_info.innerHTML += "(" + date_data.pakshya + "&nbsp;" + date_data.tithi + ")";
        table_row.appendChild(table_data_lunar_info);
        
        var table_data_lunar_events = document.createElement("td");
        table_data_lunar_events.setAttribute("id", date_data.date + "_lunar");
        table_data_lunar_events.innerHTML = "";
        if(date_data.lunar_event_one != "") {
           table_data_lunar_events.innerHTML += date_data.lunar_event_one;
        }
        if(date_data.lunar_event_two != "") {
            if(table_data_lunar_events.innerHTML != "") {
                table_data_lunar_events.innerHTML += "<br />";
            }
            table_data_lunar_events.innerHTML += date_data.lunar_event_two;
        }
        if(date_data.lunar_event_three != "") {
            if(table_data_lunar_events.innerHTML != "") {
                table_data_lunar_events.innerHTML += "<br />";
            }
            table_data_lunar_events.innerHTML += date_data.lunar_event_three;
        }
        table_row.appendChild(table_data_lunar_events);
        
        var table_data_nat_events = document.createElement("td");
        table_data_nat_events.setAttribute("id", date_data.date + "_national");
        if (nevents.data.hasOwnProperty(date_data.date.slice(5,10))) {
            table_data_nat_events.innerHTML = nevents.data[date_data.date.slice(5,10)][1].replace("/","<br />");
        }
        table_row.appendChild(table_data_nat_events);
        
        var ad_date_key = ad_date_split[1].padStart(2,"0") + "-" + ad_date_split[2].padStart(2, "0");
        var table_data_internat_events = document.createElement("td");
        table_data_internat_events.setAttribute("id", date_data.date + "_international");
        if(ievents.data.hasOwnProperty(ad_date_key)) {
            table_data_internat_events.innerHTML = ievents.data[ad_date_key][1].replace("/","<br />");
            table_data_internat_events.innerHTML += "<br />" + ievents.data[ad_date_key][0].replace("/","<br />");
        }
        table_row.appendChild(table_data_internat_events);

        var sns_date_split = convert_ad_to_ns(ad_date_split[0], ad_date_split[1], ad_date_split[2]).split(" ");
        var sns_date_key = sns_date_split[1].padStart(2,"0") + "-" + sns_date_split[2].padStart(2, "0");
        
        var table_data_other_events = document.createElement("td");
        table_data_other_events.setAttribute("id", date_data.date + "_other");
        if(snsevents.data.hasOwnProperty(sns_date_key)) {
            table_data_other_events.innerHTML = snsevents.data[sns_date_key][1].replace("/","<br />");
            table_data_other_events.innerHTML += "<br />" + snsevents.data[sns_date_key][0].replace("/","<br />");
        }
        
        if(other_events.data.hasOwnProperty(ad_date_split[0])) {
            if(other_events.data[ad_date_split[0]].hasOwnProperty(ad_date_key)) {
                table_data_other_events.innerHTML = other_events.data[ad_date_split[0]][ad_date_key][1].replace("/","<br />");
                table_data_other_events.innerHTML += "<br />" + other_events.data[ad_date_split[0]][ad_date_key][0].replace("/","<br />");
            }
        }
        table_row.appendChild(table_data_other_events);
        tbody.appendChild(table_row);
    }
}

$(document).ready(function () {
    $('#event_table').DataTable({
        "processing": true,
        "info": true,
        "lengthMenu": [[10, 25, 50, 75, -1], [10, 25, 50, 75, "All"]],
        "pageLength": 25,
    });
});
