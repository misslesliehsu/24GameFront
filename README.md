Let's Get 24

DEMO: https://youtu.be/KHthoyjBJ14

DESCRIPTION: "Let's Get 24" is an online, live, multiplayer card game where the objective is to be the first player to use arithmetic operations with four preset numbers and get the result 24. Games have 10 rounds; each round awards points; the winner(s) is declared at the game's end.

This repository is the FRONT end. The BACK end can be found here: https://github.com/misslesliehsu/24gameBACK

FUNCTIONALITY: The following are the core functionality components of Let's Get 24:

- Create a Game, or Join a Game based on a game ID
- Choose unique player names
- Play live against any number of other players; all players will have the same experience at the same time
- Use mouse/keyboard to use given numbers and write arithmetic equations
- Receive immediate feedback on equation results
- Play 10 rounds with points accumulating across the rounds
- Page refreshes will not disrupt game play

DEVELOPMENT / FRAMEWORKS:

Front-end: The front end was developed using Javascript, using the React framework.
Back-end: The back end was built on Ruby on Rails, linking to a postgres database.
Outside gems include:
- Serializer, for cleaner data delivery to the front-end
- React Bootstrap Dialog, for good-looking alerts & prompts


ORGANIZATION:
Index.js loads the App.js, which loads either the Lobby or a Game if in play
Based on user choice, Lobby will load a new or existing Game
Games will render Cards, which manage most player/game interaction
A Game has a single Card which updates itself across the 10 rounds through the backend
The front and back ends are connected through RESTful routing, as well as ActionCable web sockets

TO RUN THE APPLICATION:

Front-end:
Ensure that the
Run npm install
Run npm start
Back-end:
Run bundle install
Run rails s -p 3001


Copyright 2018 Leslie Hsu

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
