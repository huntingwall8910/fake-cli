//this doesnt even have to be a js file at all
export const descs = {
    "?":"alias for help",
    cls:"alias for clear, clears the screen",
    td:"alias for techdesc",
    help:"provides help for commands",
    techdesc:"provides a programming explanation for each command",
    echo:"outputs a string",
    clear:"clears the terminal",
    color:"changes the text color of the terminal, accepts rgb,hex, or any valid css colors",
    aliases:"lists aliases for commands, alternatives to normal commands",
    fetch: "Lists device data including browser and OS data",
    ip:"Lists IP data including ISP and locational data",
    unix:"outputs the current unix time, or the seconds since 1/1/1970 12:00AM",
    date:"outputs the current date",
    history:"outputs the command history inputted by the user, ignoring blank commands",
    clearhistory:"clears the command history."
}
export const technical = {
    "?":"alias for help",
    cls:"alias for clear, clears the screen",
    td:"alias for techdesc",
    help:"Takes an argument and matches it with a dictionary, if no argument then it simply logs the default text",
    techdesc:"Outputs prepreared techinical descriptions of commands",
    echo:"Takes a string argument and uses the log function to output it onto the div output",
    clear:"sets the output div's textcontent to nothing",
    color:"Identifies colors through a custom string prototype and sets both the output div and the input text to that color",
    aliases:"uses the log function to log the aliases",
    fetch: "Uses a function from navigator.js to read the useragent data and parses it into a nice output",
    ip:"Calls to an external API and reads the IP data that is used to make the request (aka your ip) which is then parsed into a nice output",
    unix:"Uses the JS date API that outputs unix time by default",
    date:"outputs the current date formatted by the JS Date API",
    history:"commands are stored in an array and is outputted by this command",
    clearhistory:"sets the command history array to nothing"
}
export const helpText = `echo: logs a string
                clear: clears the terminal
                color: changes the text color
                aliases: lists valid aliases for commands
                fetch: lists device data
                ip: lists ip data
                unix: outputs current unix time
                date: outputs current date
                history: outputs command history
                clearhistory: clears the history
                open: opens a url in a new tab
                redirect: redirects the page to a url
                help: provides this menu
                for more information type help (command)
                for even more information type techdesc (command)`