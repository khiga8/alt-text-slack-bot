# alt-text-slack-bot

`alt-text-slack-bot` aims to encourage accessible image sharing in a Slack workspace. When configured with your Slack bot, it detects when an image file has been shared in a channel without alternative text. Then, it will send a friendly reminder to the user who posted the image with instructions on how to add the alternative text. The message will only be visible to the user.

## Requirements

### Slack permissions

- [messages:channels](https://api.slack.com/events/message.channels): allows subscription to receive events of messages that are posted to the channel.
- [chat:write](https://api.slack.com/scopes/chat:write): send messages as your configured Slack bot.

### Environment variables

- `SLACK_TOKEN`
- `SLACK_SIGNING_SECRET`: available in the app admin panel under Basic Info.