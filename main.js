
const screenLog = document.querySelector(".screen-log");


function logString(s = "") {
    console.log(s);

    const p = document.createElement('p');
    p.innerText = s
    screenLog.appendChild(p);
}


logString("Hello, world!")


