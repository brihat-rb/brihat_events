function scroll_to_today() {
    var today = new Date();
    var today_date_list = convert_ad_to_bs(today.getFullYear(), today.getMonth() + 1, today.getDate()).split(" ");
    var today_mm_dd = today_date_list[1].padStart(2, "0") + "-" + today_date_list[2].padStart(2, "0");
    var today_element = document.getElementById(today_mm_dd);

    if(today_element != null) {
        var rect = today_element.getBoundingClientRect()
        var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        
        window.scroll({
            top:        rect.top + rect.height / 2 - viewHeight / 2,
            behavior:   'smooth' // smooth scroll
        });

        today_element.style.color = "teal";
    }
}