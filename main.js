const urlSearchParams = window.URLSearchParams;
let sum = -1
let comment = ""
const payButton = document.getElementById("pay-button");
const nameInput = document.getElementById("name");
const sumInput = document.getElementById("sum-rub");

let name = "";
let sum = -1;

if(!urlSearchParams["qiwi_id"] == null)
{
    let nowQiwiScreen = document.querySelector(".no-qiwi-id-error");
    let mainWrapper = document.querySelector(".main-wrapper");

    nowQiwiScreen.style.zIndex = 1000000;
    nowQiwiScreen.style.opacity = 1;
    mainWrapper.style.display = "none";
}

function constructQiwiUrl() {
    let commentEncoded = `extra['comment']=${encodeURI(comment)}`;
    let accountEncoded = `extra['account']=${urlSearchParams["qiwi_id"]}`;

    return `https://qiwi.com/99?ammountInteger=${sum}&${commentEncoded}&${accountEncoded}`;
}

function updateInputsData() {
    name = nameInput.value;
    sum = Number.parseInt(sum);

    if(name !== "" && sum > 1) {
        payButton.removeAttribute("disabled");
    } else {
        payButton.setAttribute("disabled", "true");
    }
}

console.log(payButton)

nameInput.onkeyup = updateInputsData;
sumInput.onkeyup = updateInputsData;

payButton.addEventListener("click", function () {

});