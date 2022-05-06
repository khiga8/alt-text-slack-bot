# alt-text-slack-bot

`alt-text-slack-bot` aims to encourage accessible image sharing in a Slack workspace. When configured and added to a workspace, this Slack bot will detect when an image file has been shared in a channel without alternative text. It will send a friendly reminder that can only be seen by the user who posted the image along with instructions on how to add the alternative text.

<img width="500" alt="Screenshot of a message on Slack from a bot that says `Uh oh! The image you shared is missing alt text` along with how to add alt text, in response to an image I sent. The bot message has a note, `Only visible to you`." src="https://user-images.githubusercontent.com/16447748/167228612-b0caa58e-6741-4f93-acd5-51b73a0cfbb7.png">


This repo contains the code for the bot setup and should be customized to fit your workspace needs. For a comprehensive guide on the process of setting up a Slack app and installing it in a workspace, check out a fantastic tutorial by `@lukeocodes` at [DEV: Guy's Bot - Inclusive Language in Slack](https://dev.to/lukeocodes/who-s-a-good-bot-a-slack-bot-for-inclusive-language-2fkh).

## Motivation

The alt text feature in Slack is relatively new and hidden so a lot of people don't know about it or forget to use it. This bot was created to ensure that images are accessible to everyone, including channel members who are blind or have low-vision. This bot eliminates the potential burden of individual members having to remind people to add alt text.

## Requirements

### Slack permissions

- [messages:channels](https://api.slack.com/events/message.channels): allows subscription to receive events of messages that are posted to the channel.
- [chat:write](https://api.slack.com/scopes/chat:write): send messages as your configured Slack bot.

### Environment variables

Fetch the following tokens on the admin panel of your newly created Slack app page:

- `SLACK_TOKEN`: fetch `Bot User OAuth Token` in the **OAuth and Permissions** tab.
- `SLACK_SIGNING_SECRET`: fetch `Signing secret` in the **Basic Information** tab.

## Tips

- If you prefer not to experiment with a Slack app in an active workspace, you can create a free test workspace.
- Customize the bot message by updating `utils.ts`.
