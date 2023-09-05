var event_dt = null;
var new_data = [];
var new_data_title = [];
const table_design = ["table-primary", "table-success", "table-danger", "table-warning", "table-info", "table-light", "table-danger", "table-primary", "table-warning", "table-success", "table-info", "table-danger"];
const info_class = ["text-nowrap text-center align-top", "text-nowrap text-center align-top",  "lunar_events text-nowrap align-top", "national_events align-top", "international_events align-top", "other_events align-top", "public_holiday_events align-top"];

function create_table(year = "") {
    window.scrollTo(0, 0);

    new_data = [];
    new_data_title = [];
    
    today_date_id = today_bs_date[0] + "-" + today_bs_date[1].padStart(2, "0") + "-" + today_bs_date[2].padStart(2, "0");
    lunar_data = lunar_events.data;

    if(year != "") {
        var lunar_event_url_2 = "https://raw.githubusercontent.com/brihat-rb/brihat-rb.github.io/master/calendar/data/" + year.toString() + "_detailed.json";
        var lunar_event_req_2 = new XMLHttpRequest();
        lunar_event_req_2.open('GET', lunar_event_url_2, false);
        lunar_event_req_2.onload = function() {
            lunar_events = JSON.parse(this.response);
            console.info("Lunar Events Loaded for:", year, "BS");
        }
        lunar_event_req_2.send();
        lunar_data = lunar_events.data;
    }

    var count = 1;
    for(var i = 0; i < lunar_data.length; i++) {
        for(var j = 0; j < lunar_data[i].length; j++) {
            var new_data_title_raw = [];
            var date_data = lunar_data[i][j];

            // SNo
            var table_data_sn = count++;
            // table_data_sn.innerHTML = arabic_number_to_nepali(count++);
            new_data_title_raw.push("");

            var bs_date_split = date_data.date.split("-");
            var bs_ad_date = convert_bs_to_ad(bs_date_split[0], bs_date_split[1], bs_date_split[2]);
            var ad_date_split = bs_ad_date.split(" ");
            var ad_date = ad_date_split[0] + " " + AD_MONTHS_SHORT[ad_date_split[1] - 1] + " " + ad_date_split[2];
            var weekday = new Date(bs_ad_date).getDay();

            // BS AD NS DATE
            var table_data_date = arabic_number_to_nepali(bs_date_split[0]) + " " + BS_MONTHS_NEP[bs_date_split[1] - 1] + " " + arabic_number_to_nepali(bs_date_split[2].replace(/^0+/, '')) + " (" + NEPALI_DAYS_SHORT[weekday] + ")<br />";
            table_data_date += arabic_number_to_nepali(date_data.ns_year) + "&nbsp;" + date_data.lunar_month + "&nbsp;" + date_data.tithi + "<br />";
            table_data_date += ad_date + " (" + ENGLISH_DAYS_SHORT[weekday] + ")";
            new_data_title_raw.push(arabic_number_to_nepali(date_data.ns_year) + " " + date_data.pakshya + " " + date_data.tithi);
            
            // LUNAR EVENTS
            var table_data_lunar_events = "";
            if(date_data.lunar_event_one != "") {
                table_data_lunar_events += date_data.lunar_event_one.replaceAll("/","<br />");
            }
            if(date_data.lunar_event_two != "") {
                if(table_data_lunar_events != "") {
                    table_data_lunar_events += "<br />";
                }
                table_data_lunar_events += date_data.lunar_event_two.replaceAll("/","<br />");
            }
            if(date_data.lunar_event_three != "") {
                if(table_data_lunar_events != "") {
                    table_data_lunar_events += "<br />";
                }
                table_data_lunar_events += date_data.lunar_event_three.replaceAll("/","<br />");
            }
            new_data_title_raw.push("");
           
            // NATIONAL EVENTS
            var table_data_nat_events = "";
            if (nevents.data.hasOwnProperty(date_data.date.slice(5,10))) {
                table_data_nat_events += nevents.data[date_data.date.slice(5,10)][1].replaceAll("/","<br />");
                new_data_title_raw.push(nevents.data[date_data.date.slice(5,10)][0].replaceAll("/","\n"));
            }
            else {
                new_data_title_raw.push("");
            }
            
            // INTERNATIONAL EVENTS
            var ad_date_key = ad_date_split[1].padStart(2,"0") + "-" + ad_date_split[2].padStart(2, "0");
            var table_data_internat_events = "";
            if(ievents.data.hasOwnProperty(ad_date_key)) {
                table_data_internat_events += ievents.data[ad_date_key][0].replaceAll("/","<br />");
                // table_data_internat_events += "<br />" + ievents.data[ad_date_key][1].replaceAll("/","<br />");
                new_data_title_raw.push(ievents.data[ad_date_key][1].replaceAll("/","\n"));
            }
            else {
                new_data_title_raw.push("");
            }
            
            // OTHER EVENTS
            var sns_date_split = convert_ad_to_ns(ad_date_split[0], ad_date_split[1], ad_date_split[2]).split(" ");
            var sns_date_key = sns_date_split[1].padStart(2,"0") + "-" + sns_date_split[2].padStart(2, "0");
            
            var table_data_other_events = "";
            var title_all = "";
            if(snsevents.data.hasOwnProperty(sns_date_key)) {
                table_data_other_events += snsevents.data[sns_date_key][1].replaceAll("/","<br />");
                // table_data_other_events.innerHTML += "<br />" + snsevents.data[sns_date_key][0].replaceAll("/","<br />");
                title_all += snsevents.data[sns_date_key][0].replaceAll("/","\n");
            }
            
            if(other_events.data.hasOwnProperty(ad_date_split[0])) {
                if(other_events.data[ad_date_split[0]].hasOwnProperty(ad_date_key)) {
                    table_data_other_events += other_events.data[ad_date_split[0]][ad_date_key][1].replaceAll("/","<br />");
                    // table_data_other_events.innerHTML += "<br />" + other_events.data[ad_date_split[0]][ad_date_key][0].replaceAll("/","<br />");
                    title_all += other_events.data[ad_date_split[0]][ad_date_key][0].replaceAll("/","\n");
                }
            }
            if(title_all != "") {
                new_data_title_raw.push(title_all);
            }
            else {
                new_data_title_raw.push("");
            }
            
            // PUBLIC HOLIDAYS
            var table_data_holiday_remark = "";
            if(public_holiday_events.hasOwnProperty(bs_date_split[0])) {
                if(public_holiday_events[bs_date_split[0]].hasOwnProperty(date_data.date.slice(5,10))) {
                    var public_holiday = public_holiday_events[bs_date_split[0]][date_data.date.slice(5,10)];
                    table_data_holiday_remark = public_holiday[3].replaceAll("/","<br />") + "<br/>";
                    new_data_title_raw.push(public_holiday[0].replaceAll("/","\n"));
                    table_data_holiday_remark += public_holiday[2].replaceAll("/","<br />");
                }
                else {
                    new_data_title_raw.push("");
                }
            }

            new_data.push({
                "DT_RowId": date_data.date,
                "sno": table_data_sn,
                "date": table_data_date,
                "lunar": table_data_lunar_events,
                "national": table_data_nat_events,
                "international": table_data_internat_events,
                "other": table_data_other_events,
                "holiday": table_data_holiday_remark
            });

            new_data_title.push(new_data_title_raw);
        }
    } 
}

function change_list(year = "") {
    if(event_dt != null) {
        event_dt.clear().destroy();
    }

    create_table(year);
    
    event_dt = $('#event_table').DataTable({
        fixedHeader: true,
        // paging: false,
        // responsive: true,
        pagingType: "full_numbers",
        scrollX: true,
        data: new_data,
        columns: [
            { data: "sno" },
            { data: "date" },
            { data: "lunar" },
            { data: "national" },
            { data: "international" },
            { data: "other" },
            { data: "holiday" },
        ],
        createdRow: function (row, data, rowIndex) {
            if (data.holiday.includes("Public Holiday")) {
                $(row).addClass("national");
            }
            else if(data.holiday != "") {
                $(row).addClass("specific");
            }
            else {
                // some other case
            }
            
            $(row).addClass(table_design[parseInt(row.id.slice(5,7)) - 1]);
            
            $.each($('td', row), function (colIndex) {
                $(this).attr('title', new_data_title[rowIndex][colIndex]);
                $(this).addClass(info_class[colIndex]);
            });
        },
        "processing": true,
        "info": true,
        "destroy": true,
        "ordering": false,
        "lengthMenu": [[10, 15, 25, 50, 75, 100, -1], [10, 15, 25, 50, 75, 100, "All"]],
        "iDisplayLength": 15,
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
                    if(hide_this_column) {
                        console.info(event_class.replaceAll("_", " "), "column hidden");
                    }
                api.column(column_index++).visible(!hide_this_column);
            }
        }
    }).page(0).draw();
    
    if(year == today_bs_date[0]) {
        const today_index = event_dt.row('#' + today_date_id)[0][0];
        const page_length = document.getElementsByName("event_table_length")[0].value;
        const page = Math.floor(today_index / page_length);

        event_dt.page(page).draw('page');
    
        var today_element = document.getElementById(today_date_id);
        today_element.classList.add("text-success");
        var rect = today_element.getBoundingClientRect()
        var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        
        window.scroll({
            top:        rect.top + rect.height / 2 - viewHeight / 2,
            behavior:   'smooth' // smooth scroll
        });
    }

    document.getElementById("title_year").innerText = year;
    document.getElementById("year").value = year;
}

change_list(today_bs_date[0]);
