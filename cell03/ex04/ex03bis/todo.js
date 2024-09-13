const TDL = $('#ft_list');

function setCookie(value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = "todolist=" + encodeURIComponent(value) + ";" + expires + ";path=/";
}

function getCookie() {
    const cname = "todolist=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(";");
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(cname) === 0) {
            return c.substring(cname.length, c.length);
        }
    }
    return "";
}

function saveTDsToCookie() {
    const TDs = [];
    $(".TD").each(function() {
        TDs.push($(this).text());
    });
    setCookie(JSON.stringify(TDs), 3);
}

function loadTDsFromCookie() {
    const TDs = getCookie();
    if (TDs) {
        const tdArray = JSON.parse(TDs);
        $.each(tdArray, function(index, tdText) {
            addTD(tdText);
        });
    }
}

function addTD(TDM) {
    if (TDM != null && TDM.trim() !== "") {
        const TD = $("<div></div>").text(TDM).addClass("TD");
        TDL.append(TD);
        saveTDsToCookie();
    }
}

$("#btn").on("click", function() {
    let TDM = prompt("Please enter your Todo");
    if (TDM.includes(";")) {
        alert("This ';' not allow. Please try again.");
    }
    else { 
        addTD(TDM);
    }
});

$(document).on('click', '.TD', function() {
    if (confirm("Remove This Todo?") === true) {
        $(this).remove();
        saveTDsToCookie(); 
    }
});

$(window).on("load", function() {
    loadTDsFromCookie();
});