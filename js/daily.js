function get_event(bs_year, bs_month, bs_date) {
    if (current_year != bs_year) {
        var nepal_event_req = new XMLHttpRequest();
        if (bs_year >= 2076 && bs_year <= 2081) {
            json_url = 'https://raw.githubusercontent.com/brihat-rb/brihat-rb.github.io/master/calendar/data/' + bs_year + '_detailed.json';

            nepal_event_req.open('GET', json_url, false);
            nepal_event_req.onload = function () {
                events = JSON.parse(this.response);
                lunar_json_loaded = true;
                console.info("Lunar Events (for", bs_year, "BS): Loaded.");
            }
            nepal_event_req.onerror = function (err) {
                lunar_json_loaded = false;
                console.error("Lunar Events (for", bs_year, "BS): Loading Failed.");
            }
            try {
                nepal_event_req.send();
            }
            catch (error) {
                lunar_json_loaded = false;
            }
        }
        else if (bs_year >= 2070 && bs_year <= 2075) {
            json_url = 'https://raw.githubusercontent.com/brihat-rb/brihat-rb.github.io/master/calendar/data/' + bs_year + '.json';

            nepal_event_req.open('GET', json_url, false);
            nepal_event_req.onload = function () {
                events = JSON.parse(this.response);
                lunar_json_loaded = true;
                console.info("Lunar Events (for", bs_year, "BS): Loaded.");
            }
            nepal_event_req.send();
        }
        else {
            console.warn("No Lunar Data Available for Year:", bs_year, "BS");
            lunar_json_loaded = false;
        }
    }

    current_year = parseInt(bs_year);
    current_month = parseInt(bs_month);
    current_date = parseInt(bs_date);

    ad_date_current = convert_bs_to_ad(current_year, current_month, current_date).split(" ");
    ad_year = ad_date_current[0];
    ad_month = ad_date_current[1];
    ad_date = ad_date_current[2];
    ad_day = (new Date(ad_year, ad_month - 1, ad_date)).getDay();

    if (ad_year < 2017 || ad_year > 2024) {
        other_event_json_loaded = false;
    }

    if (current_ad_year != ad_year) {
        sunrisesunset_json_loaded = false;
        if (ad_year < 2019 || ad_year > 2025) {
            console.warn("No Sunrise/Sunset Data for", ad_year, "AD");
        }
        else {
            sunrise_url = 'https://raw.githubusercontent.com/brihat-rb/brihat_calendar/main/data/sunrise_sunset_json/sunrise_' + ad_year + '.json';
            sunset_url = 'https://raw.githubusercontent.com/brihat-rb/brihat_calendar/main/data/sunrise_sunset_json/sunset_' + ad_year + '.json';

            sunrise_req.open('GET', sunrise_url, false);
            sunrise_req.onload = function () {
                sunrises = JSON.parse(this.response);
                sunrise_json = true;
                console.info("Sunrise Times (for", ad_year, "AD): Loaded.");
            }
            sunrise_req.send();

            sunset_req.open('GET', sunset_url, false);
            sunset_req.onload = function () {
                sunsets = JSON.parse(this.response);
                sunset_json = true;
                console.info("Sunset Times (for", ad_year, "AD): Loaded.");
            }
            sunset_req.send();
            if (sunrise_json && sunset_json)
                sunrisesunset_json_loaded = true;
        }
    }

    current_ad_year = ad_year;

    ns_date_current = convert_ad_to_ns(ad_year, ad_month, ad_date).split(" ");
    ns_month = ns_date_current[1].padStart(2, '0');
    ns_date = ns_date_current[2].padStart(2, '0');

    int_events_key = ad_month.toString().padStart(2, '0') + "-" + ad_date.toString().padStart(2, '0');
    nat_events_key = bs_month.toString().padStart(2, '0') + "-" + bs_date.toString().padStart(2, '0');
    sns_events_key = ns_month.toString().padStart(2, '0') + "-" + ns_date.toString().padStart(2, '0');

    if (bs_year < 2070 || bs_year > 2081) {
        console.warn("No Lunar Data Available for Year:", bs_year, "BS");
    }

    var date_id = bs_year.toString() + "-" + bs_month.toString() + "-" + bs_date.toString();

    let nepali_date = '<div id="date" class="';
    nepali_date += ad_day == 6 ? 'bg-danger ' : public_holidays[bs_year] ? public_holidays[bs_year][nat_events_key] ? public_holidays[bs_year][nat_events_key][1] == 'national' ? 'bg-danger ' : 'bg-primary ' : 'bg-dark ' : 'bg-dark ';
    nepali_date += '"><span id="past_date_ref"></span><span id="' + date_id + '"><mark class="bg-white rounded';
    nepali_date += ad_day == 6 ? ' text-danger ' : public_holidays[bs_year] ? public_holidays[bs_year][nat_events_key] ? public_holidays[bs_year][nat_events_key][1] == "national" ? ' text-danger ' : ' text-primary ' : ' text-dark ' : ' text-dark ';
    nepali_date += 'display-6">' + arabic_number_to_nepali(bs_year) + " " + BS_MONTHS_NEP[bs_month - 1];
    nepali_date += " " + arabic_number_to_nepali(bs_date) + ", " + NEPALI_DAYS[ad_day] + '</mark></span><span id="future_date_ref"></span></div>';

    let info_content = nepali_date;
    info_content += '<div id="scroll_up_element" class="bounce_up"><i class="fa fa-angle-double-up" aria-hidden="true"></i></div>';
    info_content += '<div id="all_events"><div><br /></div><div id="date_info">';

    var has_lunar_events = false;

    let solar_ns_date_list = convert_bs_to_ns(bs_year, bs_month, bs_date).split(" ");
    let solar_ns_date = "सौ. ने. सं. " + arabic_number_to_nepali(solar_ns_date_list[0]) + " " + NS_NEP[solar_ns_date_list[1] - 1] + " " + arabic_number_to_nepali(solar_ns_date_list[2]);
    let ad_full_date = "<span id='ad_data'>" + ad_year + " " + AD_MONTHS[ad_month - 1] + " " + ad_date + "</span><br /></div>";

    var lunar_month = "";
    var lunar_tithi = "";
    if (lunar_json_loaded) {
        info_content += '<span id="solar_nepal_sambat">' + solar_ns_date + "</span><br /><span id='tithi'>";
        if (events.data[bs_month - 1][bs_date - 1].hasOwnProperty("ns_year")) {
            info_content += "ने. सं. " + arabic_number_to_nepali(events.data[bs_month - 1][bs_date - 1].ns_year) + " ";
        }
        if (events.data[bs_month - 1][bs_date - 1].hasOwnProperty("lunar_month")) {
            lunar_month = events.data[bs_month - 1][bs_date - 1].lunar_month;
            info_content += lunar_month;
        }
        if (events.data[bs_month - 1][bs_date - 1].hasOwnProperty("pakshya")) {
            info_content += " (" + events.data[bs_month - 1][bs_date - 1].pakshya + ") ";
        }
        lunar_tithi = events.data[bs_month - 1][bs_date - 1].tithi;
        info_content += lunar_tithi + '</span><br />' + ad_full_date + "<div>&nbsp;</div>";

        has_lunar_events = false;
        if (events.data[bs_month - 1][bs_date - 1].lunar_event_one || events.data[bs_month - 1][bs_date - 1].lunar_event_two || events.data[bs_month - 1][bs_date - 1].lunar_event_three) {
            info_content += '<div id="lunar_events"><div id="ltopic" class="p-1"><mark id="lunar_mark" class="rounded text-white">Lunar Event(s)</mark></div><div id="flex_lunar">';
            has_lunar_events = true;
        }
        if (events.data[bs_month - 1][bs_date - 1].lunar_event_one)
            info_content += '<div>' + events.data[bs_month - 1][bs_date - 1].lunar_event_one.replaceAll(" / ", "</div><div>") + '</div>';
        if (events.data[bs_month - 1][bs_date - 1].lunar_event_two)
            info_content += '<div>' + events.data[bs_month - 1][bs_date - 1].lunar_event_two.replaceAll(" / ", "</div><div>") + '</div>';
        if (events.data[bs_month - 1][bs_date - 1].lunar_event_three)
            info_content += '<div>' + events.data[bs_month - 1][bs_date - 1].lunar_event_three.replaceAll(" / ", "</div><div>") + '</div>';
        if (events.data[bs_month - 1][bs_date - 1].lunar_event_one || events.data[bs_month - 1][bs_date - 1].lunar_event_two || events.data[bs_month - 1][bs_date - 1].lunar_event_three)
            info_content += '</div></div>';

        if (pakshya_events_json_loaded && (lunar_month != "" && lunar_tithi != "")) {
            var pakshya_events_list = pakshya_events[lunar_month][lunar_tithi];
            if (pakshya_events_list.length > 0) {
                info_content += "<div id='pakshya_events'>";

                if (!info_content.includes("Lunar Event(s)"))
                    info_content += '<div id="ptopic" class="p-1"><mark id="pakshya_mark" class="rounded text-dark">Pakshya Event(s)</mark></div>';

                info_content += "<div id='flex_pakshya'>";

                pakshya_events_list.forEach(event => {
                    if (!info_content.includes(event))
                        info_content += "<div>" + event + "</div>";
                });

                info_content += "</div></div>";
                has_lunar_events = true;
            }
        }
        else {
            console.warn("No Pakshya Event found for (Lunar Month:Tithi): ", lunar_month, ":", lunar_tithi);
        }
    }
    else {
        info_content += "<span id='solar_nepal_sambat'>" + solar_ns_date + "</span><br />" + ad_full_date;
        has_lunar_events = true;
    }
    if (has_lunar_events)
        info_content += "<div>&nbsp;</div>";

    var has_national_events = false;
    if (national_json_loaded && nevents.data[nat_events_key]) {
        has_national_events = true;
        var nevents_list_en = nevents.data[nat_events_key][0].split(" / ");
        var nevents_list_np = nevents.data[nat_events_key][1].split(" / ");
        var count = nevents_list_en.length;

        info_content += "<div id='national_event'><div id='ntopic' class='p-1'><mark class='rounded bg-success text-white'>National Event(s)</mark></div><div id='flex_national'>";

        for (var i = 0; i < count; i++) {
            info_content += "<div>" + nevents_list_np[i] + "<br />(" + nevents_list_en[i] + ")</div>";
            info_content += i == count - 1 ? "" : "<br />";
        }
        info_content += "</div></div>";
    }

    if (has_national_events)
        info_content += "<div>&nbsp;</div>";

    var has_international_events = false;
    if (international_json_loaded && ievents.data[int_events_key]) {
        has_international_events = true;
        var ievents_list_en = ievents.data[int_events_key][0].split(" / ");
        var ievents_list_np = ievents.data[int_events_key][1].split(" / ");
        var count = ievents_list_en.length;

        info_content += "<div id='international_event'><div id='itopic' class='p-1'><mark class='rounded bg-info text-white'>International Event(s)</mark></div><div id='flex_international'>";

        for (var i = 0; i < count; i++) {
            info_content += "<div>" + ievents_list_np[i] + "<br />(" + ievents_list_en[i] + ")</div>";
            info_content += i == count - 1 ? "" : "<br />";
        }
        info_content += "</div></div>";
    }

    if (has_international_events)
        info_content += "<div>&nbsp;</div>";

    var has_other_events = false;
    if (other_event_json_loaded && oevents.data[ad_year][int_events_key]) {
        has_other_events = true;
        var oevents_list_en = oevents.data[ad_year][int_events_key][0].split(" / ");
        var oevents_list_np = oevents.data[ad_year][int_events_key][1].split(" / ");
        var count = oevents_list_en.length;

        info_content += "<div id='other_event'><div id='otopic' class='p-1'><mark class='rounded bg-dark text-white'>Other Event(s)</mark></div>";

        for (var i = 0; i < count; i++) {
            info_content += oevents_list_np[i] + "<br />(" + oevents_list_en[i] + ")";
            info_content += i == count - 1 ? "<br />" : "<br /><br />";
        }
        info_content += "</div>";
    }

    if (has_other_events)
        info_content += "<div>&nbsp;</div>";

    var has_solar_events = false;
    if (solar_event_json_loaded && snsevents.data[sns_events_key]) {
        has_solar_events = true;
        var sns_events_list_en = snsevents.data[sns_events_key][0].split(" / ");
        var sns_events_list_np = snsevents.data[sns_events_key][1].split(" / ");
        var count = sns_events_list_en.length;

        info_content += "<div id='solar_ns_event'><div id='snstopic' class='p-1'><mark class='rounded bg-secondary text-white'>Solar Nepal Sambat Event(s)</mark></div>";

        for (var i = 0; i < count; i++) {
            info_content += sns_events_list_np[i] + "<br />(" + sns_events_list_en[i] + ")";
            info_content += i == count - 1 ? "<br />" : "<br /><br />";
        }
        info_content += "</div>";
    }

    if (has_solar_events)
        info_content += "<div>&nbsp;</div>";

    var has_holiday_events = false;
    if (public_holidays_json_loaded) {
        if (public_holidays[bs_year] && public_holidays[bs_year][nat_events_key]) {
            has_holiday_events = true;
            var public_holidays_list_en = public_holidays[bs_year][nat_events_key][0].split(" / ");
            var public_holidays_list_info = public_holidays[bs_year][nat_events_key][2].split(" / ");
            var public_holidays_list_np = public_holidays[bs_year][nat_events_key][3].split(" / ");
            var count = public_holidays_list_en.length;

            info_content += "<div id='holiday_event' class='" + public_holidays[bs_year][nat_events_key][1];
            info_content += "'><div id='phtopic' class='p-1'><mark class='rounded";
            info_content += public_holidays[bs_year][nat_events_key][1] == "national" ? " bg-danger " : " bg-primary ";
            info_content += "text-white'>Holiday Info(s)</mark></div><div id='flex_ph'>";

            for (var i = 0; i < count; i++) {
                if (public_holidays_list_np[i] && public_holidays_list_en[i] && public_holidays_list_info[i]) {
                    info_content += "<div>" + public_holidays_list_np[i] + "<br />(" + public_holidays_list_en[i] + ")<br />" + public_holidays_list_info[i] + "</div>";
                    if (public_holidays_list_np[i + 1] && public_holidays_list_en[i + 1] && public_holidays_list_info[i + 1])
                        info_content += "<br />";
                }
            }
            info_content += "</div></div>";
        }

        if (has_holiday_events)
            info_content += "<div>&nbsp;</div>";
        info_content += "</div>";
    }

    info_content += "<div id='scroll_element' class='bounce'><i class='fa fa-angle-double-down' aria-hidden='true'></i></div>";
    info_content += "</div><div id='sunrise_sunset_info' class='";
    info_content += has_holiday_events ? public_holidays[bs_year] ? public_holidays[bs_year][nat_events_key][1] == "national" ? "bg-danger" : "bg-primary" : "bg-dark" : "bg-dark";
    info_content += "'>";

    if (sunrisesunset_json_loaded) {
        var sr = sunrises[ad_month - 1][ad_date - 1];
        var ss = sunsets[ad_month - 1][ad_date - 1];
        if (sr != "") {
            sr = arabic_number_to_nepali(sr.split(":")[0]) + " : " + arabic_number_to_nepali(sr.split(":")[1]);
            ss = arabic_number_to_nepali(ss.split(":")[0]) + " : " + arabic_number_to_nepali(ss.split(":")[1]);
        }

        info_content += "<div></div><div id='sunrise' class='fs-5 fw-bold text-white'><i class='fa fa-sun-o' aria-hidden='true'></i>&ensp;" + sr + "</div><div class='fs-6 lh-lg fw-bold text-white'>";
        info_content += "Brihat";
        info_content += "</div><div id='sunset' class='fs-5 fw-bold text-white'><i class='fa fa-moon-o' aria-hidden='true'></i>&ensp;" + ss + "</div><div></div>";
    }
    else {
        info_content += "<div class='fs-6 lh-lg fw-bold text-white'>Brihat</div>";
    }
    // info_content += "</div><div><br /><br /></div>";
    document.getElementById("event_here").innerHTML = info_content;

    var scroll_element = document.getElementById("scroll_element");
    var scroll_up_element = document.getElementById("scroll_up_element");

    scroll_element.style.display = isScrollable() ? "block" : "none";
    scroll_up_element.style.display = isScrollableUp() ? "block" : "none";

    var all_events_div = document.getElementById("all_events");
    all_events_div.addEventListener("scroll", (event) => {
        const { scrollHeight, scrollTop, clientHeight } = event.target;
        if (Math.abs(scrollHeight - clientHeight - scrollTop) <= 35)
            scroll_element.style.display = "none";
        else
            scroll_element.style.display = "block";

        if (Math.abs(scrollTop) < 30)
            scroll_up_element.style.display = "none";
        else
            scroll_up_element.style.display = "block";
    });

    document.getElementById("title").innerHTML = arabic_number_to_nepali(current_year) + " " + BS_MONTHS_NEP[current_month - 1] + " " + arabic_number_to_nepali(current_date) + " (" + NEPALI_DAYS[ad_day] + ") | Brihat Events";

    var date_diff = new Date(new Date(ad_date_current).setHours(0, 0, 0, 0)) - new Date(new Date(ad_date_today).setHours(0, 0, 0, 0));
    date_diff = Math.floor(date_diff / (1000 * 60 * 60 * 24));

    var future_ref = document.getElementById("future_date_ref");
    var past_ref = document.getElementById("past_date_ref");

    if (date_diff != 0) {
        if (date_diff > 0) {
            if (date_diff == 1) {
                future_ref.innerHTML = "भोली";
            }
            else if (date_diff == 2) {
                future_ref.innerHTML = "पर्सि";
            }
            else if (date_diff % 7 == 0) {
                future_ref.innerHTML = arabic_number_to_nepali(date_diff / 7) + " हप्ता पछि";
            }
            else {
                future_ref.innerHTML = arabic_number_to_nepali(date_diff) + " दिन पछि";
            }
        }
        if (date_diff < 0) {
            if (date_diff == -1) {
                past_ref.innerHTML = "हिजो";
            }
            else if (date_diff == -2) {
                past_ref.innerHTML = "अस्ति";
            }
            else if (date_diff % 7 == 0) {
                past_ref.innerHTML = arabic_number_to_nepali(Math.abs(date_diff / 7)) + " हप्ता अघि";
            }
            else {
                past_ref.innerHTML = arabic_number_to_nepali(Math.abs(date_diff)) + " दिन अघि";
            }
        }
    }
}

get_event(bs_year, bs_month, bs_date);
