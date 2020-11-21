const mp3tag = require('node-id3')
const ftl = require('findthelyrics')
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("\nWelcome to AutoLyrics!\n")

rl.question("Enter path of mp3 file: ", function(filepath) {
    rl.question("Enter title of song: ", function(title) {
        rl.question("Enter artist of song: ", function(artist) {

            console.log("\nPlease wait a moment...")

            ftl.find(artist, title, function(err, resp) {

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
        
                    console.log("\nThank you for using AutoLyrics!\n");
                    process.exit(0);

                } else {
                    console.log("\nCouldn't find lyrics\n")
                    process.exit(0)
                }
            })     
        });
    });
});