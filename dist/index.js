"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const SLACK_TOKEN = process.env.SLACK_TOKEN;
const SLACK_SIGNING_SECRET = process.env.SLACK_SIGNING_SECRET;
const { createEventAdapter } = require('@slack/events-api');
const { WebClient } = require('@slack/web-api');
const web = new WebClient(SLACK_TOKEN);
const slackEvents = createEventAdapter(SLACK_SIGNING_SECRET);
const port = process.env.PORT || 3000;
slackEvents.on('message', (event) => {
    if (event.hasOwnProperty('files')) {
        const filesnamesMissingAltText = (0, utils_1.getImageNamesWithMissingAltText)(event.files);
        if (filesnamesMissingAltText.length > 0) {
            const parameters = {
                channel: event.channel,
                user: event.user,
                text: (0, utils_1.generateResponseText)(event.files.length, filesnamesMissingAltText)
            };
            if (event.hasOwnProperty('thread_ts')) {
                parameters.thread_ts = event.thread_ts;
            }
            web.chat.postEphemeral(parameters);
        }
    }
});
slackEvents.on('error', console.error);
slackEvents.start(port).then(() => {
    console.log(`server listening on port ${port}`);
});
//# sourceMappingURL=index.js.map