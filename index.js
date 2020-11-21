const mp3tag = require('node-id3')
const ftl = require('findthelyrics')
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function exitapp() {
    console.log("\nThank you for using AutoLyrics!")
    process.stdout.write("Exiting in 3 seconds...");
    await delay(1000)
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write("Exiting in 2 seconds...");
    await delay(1000)
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write("Exiting in 1 second...");
    await delay(1000)
    rl.close()
}

console.log("\nWelcome to AutoLyrics!\n")

rl.question("Enter path of mp3 file: ", function(filepath) {
    rl.question("Enter title of song: ", function(title) {
        rl.question("Enter artist of song: ", function(artist) {

            console.log("\nPlease wait a moment...")

            ftl.find(artist, title, async function(err, resp) {

                if (!err) {

                    let lyrics = resp.toString()

                    const tags = {
                        USLT: {
                            language: "eng",
                            text: lyrics
                        }
                    }

                    try {
                        mp3tag.update(tags, filepath)
                        console.log("\nResult: Success")
                    } catch (error) {
                        console.log("\n" + error)
                    }
        
                    exitapp()

                } else {
                    console.log("\nCouldn't find lyrics.")
                    exitapp()
                }
            })     
        });
    });
});

rl.on("close", function() {
    process.exit(0)
})