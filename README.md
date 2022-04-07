# alt-text-slack-bot

`alt-text-slack-bot` aims to encourage accessible image sharing in Slack. When the configured Slack bot detects that an image file has been shared without alternative text, it will send a friendly reminder to the user who posted the image. The message will only be visible to the user.

## Requirements

### Slack permissions

- [messages:channels](https://api.slack.com/events/message.channels): Allows subscription to receive events of messages that are posted to the channel.
- [chat:write](https://api.slack.com/scopes/chat:write): Send messages as your configured Slack bot.
