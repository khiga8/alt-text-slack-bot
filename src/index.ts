import {ChatPostEphemeralArguments} from '@slack/web-api'
import {generateResponseText, getImageNamesWithMissingAltText} from "./utils";

const SLACK_TOKEN = process.env.SLACK_TOKEN
const SLACK_SIGNING_SECRET = process.env.SLACK_SIGNING_SECRET

const { createEventAdapter } = require('@slack/events-api')
const { WebClient } = require('@slack/web-api')

const web = new WebClient(SLACK_TOKEN)
const slackEvents = createEventAdapter(SLACK_SIGNING_SECRET)
const port = process.env.PORT || 3000;

slackEvents.on('message', (event) => {
  if (event.hasOwnProperty('files')) {
    const filesnamesMissingAltText: string[] = getImageNamesWithMissingAltText(event.files)
    if (filesnamesMissingAltText.length > 0) {
      const parameters: ChatPostEphemeralArguments = {
        channel: event.channel,
        user: event.user,
        text: generateResponseText(filesnamesMissingAltText)
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
