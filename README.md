# Data Architecture

NoSQL.

```js
FIRESTORE_DB = {
  rooms: {
    OIWEOINDSJOSDFOJ: {
      players: [
        {name: "peter", userId: "oisdjfoijewf"}, // users not created through auth - uuid generated on client.
        ...
      ],
      teams: [ // always two teams // randomly generated
        [peteUID, jessUID, prageethUID, ...],  // always in order of who is up next // to add/remove players remove/add to end of list
        [christineUID, mikeUID, briarUID, ...] // always in order of who is up next
      ],
      teamNames: ["flaming mongooses", "sleeping mice"], // automatically randomly generated on create teams
      round: 1, // five rounds, 0-4
      roundActive: false,
      turnActive: false,
      currentTeam: 0, // set team who's turn it is.
      currentPlayers: [0,0], // set active player. when I finish my turn, it checks my index and sets the next index to be that +1 % team length
      points: [9, 12], // team points. assigned on click "DONE - NEXT!"
      phrases: ["bees", "the knife and fork had a fight", ...], // transform to uppercase - bigger, clearer and easier to read,
      phrasesLeftInRound: ["bees"], // a subset of phrases. Update and shuffle on player entry, shuffle on turn end.
      turnStartTime: 1097328973295 // set with Date.now() on turn start
    }
    ...
  },
};

function Fishbowl() {
  const userId = "lkjslijfds" // get from url?
  const userName = "Peter" // derivedState
  const myTeamIndex = 0 // derivedState, 0 or 1

}

const firstTeamWord = [
  "Flaming","Jumping","Technicolour","Dancing","Technological","Fluffy","Glittery","Dead","Slippery","Talkative","Fire-breathing","Famous","Illiterate","Hula-hooping","Green","Spiky"
  ]

const secondTeamWord = [
"Dragons","Bananas","Tourists","Rockstars","Worms","Armadillos","Sailors","Seagulls","Presidents","Djs","Pirates","Warriors","Peanuts","Psychics","Toddlers"
]

function Teams({ points, teams, teamNames, players, currentPlayers }) {
  // show list of players + "Make Teams" button, OR
  // lists of teams with names, points
}


const roundData = {
  1: {
    name: "Articulate",
    rules: "<><b>ONLY WORDS<b>no actions, sounds or gestures</>"
  },
  ...
}

function Rounds({room}) {

}

function Turns({room}) {

}

function MyTurn({room}) {

}

function MyTeamsTurn({room} {

})

function OtherTeamsTurn({room})

function TeamDisplay({teamPlayers, currentPlayer, points, teamName, teamIndex}) {

}

function Welcome({userName, teamName, teamIndex}) {

}

function EasyTimer({startTime, stopTurn}) {

}

function EditGame({room}) {

}

function ChangePlayer({room}) {

}

function EditTeams({}) {

}

function EditGame({}) {

}
```

# React Hooks and Firebase Demo - Live Grocery List

Tutorial link for the forked app here: https://blog.logrocket.com/react-hooks-with-firebase-firestore/ great to read!

The Live Grocery List app is a demonstration of using React Hooks to manage app state that is backed by a Firebase firestore backend. This app demonstrates using building in React hooks as well as custom hooks.

## Setup

This application uses Firebase services. Configuration required to connect to Firebase is defined in the [.env](.env) file (or .env.local) in the root of this repository.

Before building or running the app, you must add your Firebase project configuration. Configuration can be obtained from _Project Settings_ in your Firebase project at [https://console.firebase.google.com](https://console.firebase.google.com).

## Available Scripts

In the project directory, you can run:

`npm start` to run the app in development mode
`npm deploy` to bundle then deploy to firebase
`npm test` to launch the test runner in interactive watch mode
`npm run build` to bundle the app for production
`npm run eject` to eject React Scripts dependency

## Live Demo

Try a live version of this app at [https://fir-with-react-hooks.firebaseapp.com/](https://fir-with-react-hooks.firebaseapp.com/).
