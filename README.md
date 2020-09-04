# Parole Con Amici

[![Netlify Status](https://api.netlify.com/api/v1/badges/4f549f3f-15d8-422d-8ded-5012834b135a/deploy-status)](https://app.netlify.com/sites/clever-hawking-395d56/deploys)

A beautiful and unoriginal board game! Hop on a call with your friends to show off your vocabulary. Play your moves with real-time feedback. Or do it correspondence style and play at your own pace!

![](/markdown-assets/game.jpg)

Built to simulate the fun environment of playing with physical board and tiles - no silly ads, look words up for yourself, and argue over them!

Made with Typescript, React, Redux, Express, Socket.io, Express, Node, and Mongodb.

## Demo

https://clever-hawking-395d56.netlify.app/

Login with `user-1` through to `user-5`. Be patient for the dyno to wake up.

## Features

- Start and play multiple concurrent games with 2 to 4 players per game
- English and Italian tile sets
- Share your games with their short ids like `https://<url>/game/ww67A3qvz`
- Assign your profile an emoji to express your present mood
- Easy drag and drop interface, including drag & hover tiles on rack to rearrange
- Simple control buttons for shuffling tiles, returning tiles to board, and playing a move
- Move validation (without dictionary) and score addition
- Confetti to celebrate your linguistic exploits at the end of the game
- Everyone is friends with everyone else

## Known limitations

- The logo doesn't look great on Mac
- Error status codes sent by backend are incorrect (backend is also a bit messy)
- No security, proper login handling, or passwords
- No UI for user creation - do this directly on the DB

## Screenshots

![](/markdown-assets/new-game.jpg)
![](/markdown-assets/confetti.jpg)
