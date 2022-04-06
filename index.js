const { createEventAdapter } = require('@slack/events-api')
const { WebClient } = require('@slack/web-api')
const web = new WebClient(process.env.SLACK_TOKEN)
const slackEvents = createEventAdapter(process.env.SLACK_SIGNING_SECRET)
const port = process.env.PORT || 3000

slackEvents.on('file_shared', (event) => {
  console.log(event);
  if (event.hasOwnProperty('file')) {
    (async () => {
      const data = await getFile(event.file.id);
      if (data.hasOwnProperty('file')) {
        const file = data.file;
        if (file.mimetype.includes('image') && file.alt_text === undefined) {
          web.chat.postEphemeral({
            channel: event.channel_id,
            user: event.user_id,
            text: 'Remember to add alt text to your image so that it is accessible to your blind and low-vision teammates ❤️. You can add alt text on the image you posted by activating the `More actions` menu and selecting `Edit file details`.'
          });
        }
      }
    })()
  }
});

slackEvents.on('error', console.error);

slackEvents.start(port).then(() => {
  console.log(`server listening on port ${port}`);
});

async function getFile(file_id) {
  let response = await web.files.info({ file: file_id });
  return response;
}