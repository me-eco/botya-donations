const urlQuery = window.location.href.split("?")[1];
const urlSearchParams = new URLSearchParams("?" + urlQuery);
const payButton = document.getElementById("pay-button");
const nameInput = document.getElementById("name");
const sumInput = document.getElementById("sum-rub");
const themeToggleLabel = document.getElementById("toggle-theme-label");
const qiwiId = urlSearchParams.get("qiwi_id");

let name = "";
let sum = NaN;

let isLightTheme = true;

if(qiwiId === null || qiwiId.length !== 11)
{
    let nowQiwiScreen = document.querySelector(".no-qiwi-id-error");
    let mainWrapper = document.querySelector(".main-wrapper");

    nowQiwiScreen.style.zIndex = 1000000;
    nowQiwiScreen.style.opacity = 1;
    mainWrapper.style.display = "none";
}

function constructQiwiUrl() {
    const query = new URLSearchParams("?");
    query.append("extra['comment']", name);
    query.append("extra['account']", qiwiId);
    query.append("amountInteger", sum);
    query.append("amountFraction", "0");
    query.append("currency", "643");
    query.append("blocked[0]", "sum");
    query.append("blocked[1]", "account");
    query.append("blocked [2]", "comment");
    return `https://qiwi.com/payment/form/99?${query.toString()}`;
}

function updateInputsData() {
    name = nameInput.value;
    sum = Number.parseInt(sumInput.value);

    if(name !== "" && sum > 1) {
        payButton.removeAttribute("disabled");
    } else {
        payButton.setAttribute("disabled", "true");
    }
    console.log(name);
    console.log(sum)
}

function toggleThemeColor() {
    isLightTheme = !isLightTheme;

    document.documentElement.style.setProperty("--theme-color", isLightTheme ?
        "var(--light-theme-color)" : "var(--brand-theme-color)");
    document.documentElement.style.setProperty("--extra-txt-color", isLightTheme ?
        "var(--light-extra-txt-color)" : "var(--brand-extra-txt-color)");
}

themeToggleLabel.onclick = toggleThemeColor;
nameInput.onkeyup = updateInputsData;
sumInput.onkeyup = updateInputsData;

payButton.addEventListener("click", function () {
    const generatedUrl = constructQiwiUrl();

    window.location = generatedUrl;
});
