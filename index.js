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
      const api_parameters = {
        channel: event.channel,
        user: event.user,
        text: responseText(filenames_missing_alt_text)
      };
      if (event.hasOwnProperty('thread_ts')) {
        api_parameters.thread_ts = event.thread_ts;
      }
      web.chat.postEphemeral(api_parameters);
    }
  }
});

slackEvents.on('error', console.error);

slackEvents.start(port).then(() => {
  console.log(`server listening on port ${port}`);
});

function responseText(filenames_missing_alt_text) {
  if (filenames_missing_alt_text.length === 1) {
    return 'Uh oh! The image you shared is missing alt text so your teammates who may be blind or low-vision won\'t be able to access it. \n\nSimply activate the *More actions* menu on the image, choose *Edit file details*, and modify the *Description* field to add alt text. ❤️'
  } else {
    return `Uh oh! The following images you shared are missing alt text: ${filenames_missing_alt_text.join(', ')}.\n For each image, simply activate the *More actions* menu, choose *Edit file details*, and modify the *Description* to add an alt text to ensure it is accessible to your teammates who may be blind or low-vision ❤️`
  }
}