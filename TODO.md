# ParoleConAmici TODO

## General

- [x] Constants.js for starting state of game
- [x] Read scrabble rules
- [x] ES-lint
- [ ] Find a suitable dictionary
- [ ] Read on patterns for serving different languages
- [ ] Encourage longer words by giving word length bonus
- [x] Socket.io

## Validation

- [x] Board validation logic
- [x] Adding new word validation logic
- [x] Score validation logic
- [x] How to prevent spamming of new game api?

## Front-end

- [x] Create React app w/ typescript, jest, react-testing-library, react-router
- [x] Setup basic route
- [x] Add proxy and setup test api
- [x] Rough board outline
- [x] Move board state to redux and render tile positions based on that state
- [x] Tile styling
- [x] Move tiles back to list
- [x] Reset tiles moving
- [x] Bug: dropping on existing tiles on rack - make them reorder
- [x] Login and user session (js-cookie)
- [ ] Error handling on async thunk
- [x] Think about tile id and how to populate it, probably on load from endpoint
- [x] Populate board with mock data
- [x] Figma prototype
- [x] Setup routes (/, /game/:gameId)
- [x] Wipe redux state on logout/on login page
- [ ] 404 page for game not found
- [x] Drag-n-drop (e.g. rxjs, react-motion, react-spring)
- [x] Score-keeping
- [x] Populate opponents card
- [x] Create new game
- [x] Decouple tile defaults from language
- [x] Make player icons dynamic
- [x] Italian language settings (do this next)
- [ ] Use image as board background
- [x] Resizing issues
- [x] Date started - time ago
- [ ] Indicator of invalid move
- [x] Game preview - highlight players turn

## Back-end

- [x] Setup express server
- [x] Design properly basic types - to be extended later
- [x] Add mock game data
- [x] Generate id for tiles
- [x] Possible tech debt - just make endpoint return table instead of list of tiles
- [x] GET /game/:gameId - to be extended later
- [x] POST /new-game
- [ ] Schema Validation
- [x] Remove movable from db, store multiple players' hands

## Finally

- [ ] Check mobile & ontouch compatability

## Future extensions

- Full screen mode
- Allow opponent to validate word and add to personal dictionary
- Dictionary validation (choose apprpriate ds)
- Board theme
