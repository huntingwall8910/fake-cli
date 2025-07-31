import {descs, helpText} from "./textwall.js"
const input = document.querySelector("input")
const output = document.getElementById('output');
if (!localStorage.getItem("points")) localStorage.setItem("points",0)
let points = parseFloat(localStorage.getItem("points"))
if (!localStorage.getItem("color")) localStorage.setItem("color","white")
output.style.color = localStorage.getItem("color")
input.style.color = localStorage.getItem("color")
document.querySelector('span').style.color = localStorage.getItem("color")
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
let prompting
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
                if (!document.hidden) points += parseFloat((Math.random() / 10).toFixed(4))
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
        if (bet == "all") bet = points
        if (bet == "half") bet = points / 2
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
    },
    roulette: (choice, bet) => {
        let options = ["red","black","green","red","black","red","black","red","black","red","black"]
        if (!options.includes(choice.toLowerCase())){
            log("invalid choice")
            return
        }
        if (points < bet){
            log("You don't have enough")
            return
        }
                if (bet < 1){
            log("minimum bet is 1")
            return
        }
        if (isNaN(bet)){
            log("enter a number")
            return
        }
        if (bet == "all") bet = points
        if (bet == "half") bet = points / 2
        points -= bet
        updPoints()
        let spins = Math.floor(Math.random() * 30) + 25
        let index = 0
        let delay = 10
        function spin(){
            function a(i){
                return options[(i + options.length) % options.length]
            }
            if (spins > 0){
                index++
                spins--
                delay += 10
                if (index > options.length) index = 0
                output.innerHTML = `<br>&nbsp;${a(index - 2)}<br>&nbsp;${a(index - 1)}<br>>${a(index)}<<br>&nbsp;${a(index+1)}<br>&nbsp;${a(index+2)}<br><br>`
                setTimeout(spin,delay)
            }
            else {
                log(options[index],true)
                if (choice == options[index]){
                    if (choice == "green") points += bet * 10
                    else points += bet * 2
                    log("You won!")
                }
                else {
                    log("you lose :(")
                }
                updPoints()
            }
        }
        spin()
    },
    rpg: () => {
        window.location.href = "https://www.youtube.com/embed/TLj0-e6J5Yk?autoplay=1"
    },
    blackjack: (bet) => {
        if (points < bet){
            log("You don't have enough")
            return
        }
        if (bet < 1){
            log("minimum bet is 1")
            return
        }
        if (isNaN(bet)){
            log("enter a number")
            return
        }
        if (bet == "all") bet = points
        if (bet == "half") bet = points / 2
        points -= bet
        updPoints()
        let amount = Math.ceil(Math.random() * 10);
        let dealer = Math.ceil(Math.random() * 10)
        const dealerTurn = () => {
            if (dealer === 21) {
                log("Dealer has blackjack! You lose.");
                return;
            }
            if (dealer > 21) {
                log("Dealer busted! You win!");
                points += bet * 2
                return;
            }
            if (dealer >= 17) {
                if (dealer > amount) {
                    log(`Dealer stood with ${dealer}, You Lose`);
                } else if (dealer < amount) {
                    log(`Dealer stood with ${dealer}, You Win!`);
                    points += bet * 2
                } else {
                    log("Push!");
                    points += bet
                }
                return;
            }
            dealer += Math.ceil(Math.random() * 10);
            log(`Dealer now has ${dealer}`)
            setTimeout(dealerTurn, 1000);
        };
        const play = () => {
            log(`Dealer has: ${dealer}`)
            log(`Your total is: ${amount}`);
            if (amount == 21){
                log(`Blackjack!`)
                points += bet * 2
                return
            }
            if (amount > 21) {
                log("Bust! You lose.");
                return;
            }
            setTimeout(() => {
                prompt("Hit or stand?", ["h", "s"], {
                    h: () => {
                        amount += Math.ceil(Math.random() * 10);
                        play();
                    },
                    s: () => {
                        log(`You stood with ${amount}.`);
                        setTimeout(() => {
                            dealerTurn()
                        }, 1000);
                    }
                });
            }, 50);
        }
        play();
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
    if (prompting) {
        const inputStr = input.value.trim().toLowerCase();
        if (prompting.options.includes(inputStr)) {
            const action = prompting.handlers[inputStr];
            if (action) action();
        } else {
            log(`Please choose one of: ${prompting.options.join(', ')}`);
            input.value = "";
            return;
        }
        prompting = null;
        input.value = "";
        return;
    }
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
    window.scrollTo(0, document.body.scrollHeight);
}
function prompt(message, options, handlers) {
    const optionStr = options.join('/');
    log(`${message} (${optionStr})`);
    prompting = {
        options,
        handlers
    };
}
function updPoints(){
    document.getElementById('bar').textContent = `Terminal Points: ${points.toFixed(4)}`;
    localStorage.setItem("points",points)
}
updPoints()
log(`type help for commands`)