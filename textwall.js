//this doesnt even have to be a js file at all
export const descs = {
    help:"displays information on commands",
    clear:"clears the terminal",
    color:"changes the color of the terminal, takes any valid css color, including rgb,hex, and certain color names",
    coinflip:"if the number is above 0.5, you win, if it is lower, you lose. ",
    daily:"daily points, only claimable 24 hours after each daily",
    miner:"Get between 0.01 and 0.0001 points every 0.25 seconds",
    roulette:"pick between red (5/11), black (5/11), or green (1/11) and spin a wheel, if it lands on your chosen color, it doubles your bet, but if you chose green, it 10x your bet"
}
export const helpText = `clear: clears the terminal
                color: changes the text color
                coinflip: 50/50 chance to double your bet
                daily: get daily points
                miner:mines for points every .25 seconds
                roulette: play roulette in the terminal
                help: provides this menu
                for more information type help (command)`