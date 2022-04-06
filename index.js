const { createEventAdapter } = require('@slack/events-api')
const { WebClient } = require('@slack/web-api')
const web = new WebClient(process.env.SLACK_TOKEN)
const slackEvents = createEventAdapter(process.env.SLACK_SIGNING_SECRET)
const port = process.env.PORT || 3000

slackEvents.on('file_shared', (event) => {
  if (Object.prototype.hasOwnProperty.call(event, 'file')) {
    web.files.info({file: event.file.id}, null, (err, response) => {
      const file = response.file;
      if (file.mimetype.includes("image") && file.alt_text == file.name || file.alt_text == "") {
        (async () => {
          await web.chat.postEphemeral({
            channel: event.channel,
            user: event.user,
            text: 'It looks like your image is missing alt text. Please consider adding alt text to your image so that it is accessible to blind and low-vision teammates ❤️',
          });
        })();
      }
    });
  }
});

slackEvents.on('error', console.error);

slackEvents.start(port).then(() => {
  console.log(`server listening on port ${port}`);
});
