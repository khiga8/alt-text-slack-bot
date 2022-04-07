import {ChatPostEphemeralArguments} from '@slack/web-api'

const SLACK_TOKEN = process.env.SLACK_TOKEN
const SLACK_SIGNING_SECRET = process.env.SLACK_SIGNING_SECRET

const { createEventAdapter } = require('@slack/events-api')
const { WebClient } = require('@slack/web-api')

const web = new WebClient(SLACK_TOKEN)
const slackEvents = createEventAdapter(SLACK_SIGNING_SECRET)
const port = process.env.PORT || 3000;

slackEvents.on('message', (event) => {
  if (event.hasOwnProperty('files')) {
    const filesnamesMissingAltText: string[] = []
    for (let file of event.files) {
      if (file.mimetype.includes('image') && file.alt_txt === undefined) {
        filesnamesMissingAltText.push(`\`${file.name}\``)
      }
    }
    if (filesnamesMissingAltText.length > 0) {
      const parameters: ChatPostEphemeralArguments = {
        channel: event.channel,
        user: event.user,
        text: responseText(filesnamesMissingAltText)
      }
      if (event.hasOwnProperty('thread_ts')) {
        parameters.thread_ts = event.thread_ts
      }
      web.chat.postEphemeral(parameters)
    }
  }
})

slackEvents.on('error', console.error)

slackEvents.start(port).then(() => {
  console.log(`server listening on port ${port}`)
})

function responseText(filesnamesMissingAltText: string[]): string {
  if (filesnamesMissingAltText.length === 1) {
    return `Uh oh! The image you shared is missing alt text so your teammates who may 
    be blind or low-vision won't be able to access it. \n\nSimply activate the *More actions* menu on the image, 
    choose *Edit file details*, and modify the *Description* field to add alt text. ❤️"`
  } else {
    return `Uh oh! The following images you shared are missing alt text: ${filesnamesMissingAltText.join(', ')}.\n 
    For each image, simply activate the *More actions* menu, choose *Edit file details*, and modify 
    the *Description* to add an alt text to ensure it is accessible to your teammates who may be blind or 
    low-vision ❤️`
  }
}
