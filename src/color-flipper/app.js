const   $generate = document.getElementById('generate'),
        $reset = document.getElementById('reset'),
        $showColor = document.querySelector('span');

let hex = [1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F"];

document.addEventListener('click', e => {
    if (e.target === $generate) {
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += hex[randomNumber()];
        }
        $showColor.innerHTML = color;
        document.body.style.background = color
    }
    if(e.target === $reset) {
        $showColor.innerHTML= "#4BC3CB";
        document.body.style.background = "#4BC3CB";
    }
});

function randomNumber() {
    return Math.floor(Math.random() *hex.length)
}