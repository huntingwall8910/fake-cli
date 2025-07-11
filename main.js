import { navigatorInfo } from "./navigator.js";
import {descs, technical, helpText} from "./textwall.js"
const user = navigatorInfo()
const input = document.querySelector("input")
const output = document.getElementById('output');
String.prototype.isColor = function() {
    const s = new Option().style;
    s.color = this;
    return s.color !== '';
};
let ipInfo = {};
fetch('https://ipinfo.io/json')
  .then(response => response.json())
  .then(data => {
    ipInfo = {
      ip: data.ip,
      city: data.city,
      region: data.region,
      country: data.country,
      loc:data.loc,
      org:data.org,
      hostname:data.hostname,
      postal:data.postal,
      timezone:data.timezone,
    };
})
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
    techdesc: (cmd) => {
        if (technical[cmd]){
            log(technical[cmd],true)
        }
        else {
            log("command not found",true)
        }
        
    },
    echo: (str) => {
        log(str,true)
    },
    clear: () => {
        output.innerHTML = ""
    },
    color: (str) => {
        if (str.isColor()){
            input.style.color = str
            output.style.color = str
            document.querySelector('span').style.color = str
        }
        else {
            log("invalid color",true)
        }
    },
    aliases: () => {
        log(`help: ?
            techdesc:td
            clear: cls`)
    },
    fetch: () => {
        log(`
            Browser:${user.browser},
            Version: ${user.browserVersion},
            OS: ${user.os},
            OS Version: ${user.osVersion},
            Device: ${user.deviceType},
            User Agent: ${user.userAgent},
            Platform: ${user.platform},
            Language: ${user.language},
            `,true,true)
    },
    ip: () => {
        log(`
            IP: ${ipInfo.ip}
            ISP: ${ipInfo.org}
            Hostname: ${ipInfo.hostname}
            City: ${ipInfo.city}
            Region: ${ipInfo.region}
            Country: ${ipInfo.country}
            Approx. Location: ${ipInfo.loc}
            Approx. Postal Code: ${ipInfo.postal}
            Timezone: ${ipInfo.timezone}
            `,true,true)
    },
    unix: () => {
        log(Date.now())
    },
    date: () =>{
        log(new Date())
    },
    history: () => {
        log(history)
    },
    clearHistory: () => {
        history = []
    },
    open: (url) => {
        if (!/^https?:\/\//i.test(url)) {
            window.open(`https://${url}`)
        }
        else {
            window.open(url)
        }
    },
    redirect: (url) => {
        if (!/^https?:\/\//i.test(url)) {
            window.location.href = `https://${url}`
        }
        else {
            window.location.href = url
        }
    }
}
const aliases = {
    "?":"help",
    cls:"clear",
    td:"techdesc"
}
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
function handle(){
    log("> " + input.value)
    if (input.value == "") return
    history.push(input.value)
    hIndex = history.length
    let args = input.value.split(" ")
    let i = args[0]
    let cmd = commands[i] || commands[aliases[i]]
    if (cmd) {
        if (args[1]) cmd(args[1])
        else cmd()
    }
    else {
        log("command not found")
    }
    input.value = ""
}
function log(str,bottom = false, top = false){
    if (top) output.innerText += `\n`
    output.innerText += `${str}\n`
    if (bottom) output.innerText += `\n`
}
log(`terminal thing
    type help for commands`)