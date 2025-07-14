import {descs, helpText} from "./textwall.js"
const input = document.querySelector("input")
const output = document.getElementById('output');
if (!localStorage.getItem("points")) localStorage.setItem("points",0)
let points = parseFloat(localStorage.getItem("points"))
if (!localStorage.getItem("color")) localStorage.setItem("color","white")
output.style.color = localStorage.getItem("color")
if (!localStorage.getItem("daily")) localStorage.setItem("daily",0)
String.prototype.isColor = function() {
    const s = new Option().style;
    s.color = this;
    return s.color !== '';
};
function format(ms) {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    ms -= hours * 1000 * 60 * 60;
    const minutes = Math.floor(ms / (1000 * 60));
    ms -= minutes * 1000 * 60;
    const seconds = Math.floor(ms / 1000);
    ms -= seconds * 1000;
    const milliseconds = Math.floor(ms);
    return `${hours} hours, ${minutes} minutes, ${seconds} seconds, ${milliseconds} ms`;
}
let mining;
const commands = {
    help: (cmd) => {
        if (cmd){
            if (descs[cmd]){
                log(descs[cmd],true)
            }
            else {
                log("command not found",true)
            }
        }
        else {
            log(helpText,true,true)
        }
    },
    color: (str) => {
        if (str.isColor()){
            output.style.color = str
            input.style.color = str
            document.querySelector('span').style.color = str
            localStorage.setItem("color",str)
        }
        else {
            log("invalid color",true)
        }
    },
    clear: () => {
        output.textContent = ``
    },
    daily: () =>{
        if (Date.now() - localStorage.getItem("daily") < 86400000){
            const remaining = 86400000 - (Date.now() - localStorage.getItem("daily"))
            log(`Claim your daily in ${format(remaining)}`)
        }
        else {
            log(`claimed!`)
            points += 10
            updPoints()
            localStorage.setItem("daily",Date.now())
        } 
    },
    miner: (toggle) => {
        if (toggle == "start"){
            mining = setInterval(() => {
                points += parseFloat((Math.random() / 10).toFixed(4))
                updPoints()
            },500)
        }
        else if (toggle == "stop"){
            if (mining){
                clearInterval(mining)
                mining = false
            }
            else log("miner is inactive")
        }
        else {
            log("type either start or stop", true)
        }
    },
    coinflip: (bet) => {
        if (!bet || isNaN(bet)) log("enter a valid bet")
        else if (bet < 1) log("minimum bet is 1")
        else {
            if (points < bet){
                log("You don't have enough")
                return
            }
            points -= bet
            let result = Math.random()
            log(result)
            if (result > 0.5){
                points += bet * 2
                log("You win!")
            }
            else {
                log("You Lose :(")
            }
        }
        updPoints()
    }
}
const aliases = {}
let history = []
let hIndex = -1
window.oncontextmenu = null
document.body.addEventListener('keydown', (e) => {
    if (e.key == "Enter") handle()
    if (e.key == "ArrowUp"){
        if (history.length > 0 && hIndex > 0){
            hIndex--
            input.value = history[hIndex]
        } else if (hIndex == 0) {
            input.value = history[0]
        } else if (history.length > 0){
            hIndex = history.length - 1
            input.value = history[hIndex]
        }
    }
    if (e.key == "ArrowDown"){
        if (hIndex < history.length - 1){
            hIndex++
            input.value = history[hIndex]
        } else if (hIndex >= history.length - 1) {
            hIndex = history.length;
            input.value = "";
        }
    }
    if (document.activeElement !== input) input.focus();
});
function handle() {
    log("> " + input.value);
    if (input.value === "") return;
    history.push(input.value);
    hIndex = history.length;
    let rawArgs = input.value.match(/"[^"]*"|'[^']*'|\S+/g) || [];
    const commandName = rawArgs[0];
    const cmd = commands[commandName] || commands[aliases[commandName]];
    if (cmd) {
        const cmdArgs = rawArgs.slice(1).map(arg => {
            if ((arg.startsWith('"') && arg.endsWith('"')) ||
                (arg.startsWith("'") && arg.endsWith("'"))) {
                return arg.slice(1, -1);
            }
            return arg;
        });
        cmd(...cmdArgs);
    } else {
        log("command not found");
    }
    input.value = "";
}
function log(str,bottom = false, top = false){
    if (top) output.innerText += `\n`
    output.innerText += `${str}\n`
    if (bottom) output.innerText += `\n`
}
function updPoints(){
    document.getElementById('bar').textContent = `Terminal Points: ${points.toFixed(4)}`;
    localStorage.setItem("points",points)
}
updPoints()
log(`type help for commands`)