const { createEventAdapter } = require('@slack/events-api')
const { WebClient } = require('@slack/web-api')
const web = new WebClient(process.env.SLACK_TOKEN)
const slackEvents = createEventAdapter(process.env.SLACK_SIGNING_SECRET)
const port = process.env.PORT || 3000

slackEvents.on('message', (event) => {
  let filenames_missing_alt_text = [];
  if (event.hasOwnProperty('files')) {
    const files = event.files;
    files.forEach((file) => {
      if (file.mimetype.includes('image') && file.alt_txt === undefined) {
        filenames_missing_alt_text.push(`\`${file.name}\``);
      }
    });
    if (filenames_missing_alt_text.length > 0) {
      web.chat.postEphemeral({
        channel: event.channel,
        user: event.user,
        thread_ts: event.ts,
        text: responseText(filenames_missing_alt_text)
      });
    }
  }
});

slackEvents.on('error', console.error);

slackEvents.start(port).then(() => {
  console.log(`server listening on port ${port}`);
});

function responseText(filenames_missing_alt_text) {
  if (filenames_missing_alt_text == 1) {
    return 'Uh oh! The image you shared is missing alt text so your teammates who are blind or low-vision won\'t be able to access it. Simply activate the `More actions` menu on the image and select `Edit file details` to add alt text. ❤️'
  } else {
    return `Uh oh! The following images you shared are missing alt text: ${filenames_missing_alt_text.join(', ')}.\n Simply activate the \`More actions\` menu and select \`Edit file details\` to add an alt text for each image to ensure your image is accessible to teammates who are blind or low-vision ❤️`
  }
}