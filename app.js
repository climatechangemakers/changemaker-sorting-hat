const { App } = require("@slack/bolt");
require("dotenv").config()
// initializes app with bot token and signing secret

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode: true,
    appToken: process.env.APP_TOKEN,
    endpoints: {
        events: '/slack/events',
        commands: '/slack/commands'
    }
});

app.command('/echo', async ({ command, ack, say }) => {
    try {
        await ack();
        say(`${command.text}`)
    } catch (error) {
        console.log('err')
        console.error(error)
    }
}); 

(async () => {
    const port = 3000
    // start the app
    await app.start(process.env.PORT || port);
    console.log(`Slack bot is running on port ${port}!`);
})();