const TDL = document.getElementById("ft_list");

function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
}

function getCookie(name) {
    const cname = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
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
    document.querySelectorAll(".TD").forEach(td => {
        TDs.push(td.innerText);
    });
    setCookie("TDList", JSON.stringify(TDs), 7);
}

function loadTDsFromCookie() {
    const TDs = getCookie("TDList");
    if (TDs) {
        const tdArray = JSON.parse(TDs);
        tdArray.forEach(tdText => {
            addTD(tdText);
        });
    }
}

function addTD(TDM) {
    if (TDM != null && TDM.trim() !== "") {
        const TD = document.createElement("div");
        TD.innerText = TDM;
        TD.classList.add("TD");
        TDL.insertBefore(TD, TDL.firstChild);
        saveTDsToCookie();
    }
}

document.getElementById("btn").addEventListener("click", function() {
    let TDM = prompt("Please enter your Todo");
    addTD(TDM);
});

document.addEventListener('click', function(e) {
    var target = e.target;
    if (target.nodeName === 'DIV' && target.classList.contains("TD")) {
        if (confirm("Remove This Todo?") === true) {
            target.remove();
            saveTDsToCookie(); 
        }
    }
}, false);

window.onload = function() {
    loadTDsFromCookie();
};