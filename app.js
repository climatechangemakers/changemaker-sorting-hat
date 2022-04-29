const { App, LogLevel } = require("@slack/bolt");
require("dotenv").config()
// initializes app with bot token and signing secret

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode: true,
    appToken: process.env.APP_TOKEN,
    logLevel: LogLevel.DEBUG,
// this app is by default listening for events/commands on the /slack/events & /slack/commands path
    endpoints: {
        events: '/slack/events',
        commands: '/slack/commands'
    }
});

// this app echoes any text sent with the /echo command
app.command('/echo', async ({ command, ack, say }) => {
    try {
        // Acknowledge command request
        await ack();

        await say(`${command.text}`)
    } catch (error) {
        // Check the details of the error
        console.log('err')
        console.error(error)
    }
}); 


const welcomeChannelId = 'C03DFG05KNF';

// When a user joins the team, send a message in a predefined channel asking them to introduce themselves
app.event('team_join', async ({ event, client, logger }) => {
    try {
    // Call chat.postMessage with the built-in client
        const result = await client.chat.postMessage({
        channel: welcomeChannelId,
        text: `Welcome to the team, <@${event.user.id}>! 🎉 You can introduce yourself in this channel.`
    });
    logger.info(result);
    }
    catch (error) {
        logger.error('user couldn\'t join');
    }
});


(async () => {
    const port = 3000
    // start the app
    await app.start(process.env.PORT || port);
    console.log(`Slack bot is running on port ${port}!`);
})();