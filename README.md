# Trivia App
###### *Powered by the trivia API*

#### [Click here to check out the live version](https://trivia-game-pied.vercel.app/)

## Description
This app is a trivia game that allows a user to answer trivia questions and tallies a final score based on the results.

## Usage

### Pre-Requisites
This app was built using next.js. It requires that you have Node.js installed as well as one of the various npm package manager

**System Requirements**:
- Node.js 14.6.0 or newer
- MacOS, Windows (including WSL), and Linux are supported
- Install `npm`, `yarn`, or `pnpm`

### Installation

After cloning the repo, you need to install the dependencies using a terminal.

using npm:
```bash
$ npm install
```
using yarn:
```bash
$ yarn install
```

### Development
You can run it in dev mode so next automatically updates the DOM using hot reloading. You can do this simply by running one of the following lines.

using npm:
```bash
$ npm run dev
```
using yarn:
```bash
$ yarn dev
```

Visit at `localhost:3000`

##### production
If you want to run a production instance of this webapp locally, you need to build it first. Once it's built, then you can use the start script to run it.

using npm:
```bash
$ npm run build

# Build output here

$ npm run start
```
using yarn:
```bash
$ yarn build

# Build output here

$ yarn start
```

Visit at `localhost:3000`

#### Test
There are unit tests built into this suite. They aren't as robust as I'd like, but it was more important for me to demonstrate my experience through a variety of test cases rather than a large quantity.

I did my best to use diverse concepts such as: test structure, mock callbacks, api mocks, Timer mocking, React rendering, and DOM queries.

| Script        | Description
|---------------|------------------------------------------------------------------------------------------|
| test          | Runs all the test suites.                                                                |
| test:coverage | Generates coverage reports under the /coverage directory.                                |
| test:watch    | Runs Jest's 'watch' mode. Which will automatically run any tests affected by new changes.|


using npm:
```bash
$ npm run test:watch
```
using yarn:
```bash
$ yarn test:coverage
```
## Design

### API
The original trivia api is pretty lean, assumedly, because it can't afford to cache too much data. However, it does provide some caching functionality in order to serve different questions every time. This is implemented in the form of sessions. We're going to expand on that API to store report data based on information based back from the client.

##### Data
In order to do this, we need to create a data model for what a report looks like.

Report
```json
{
  /** The sessionId that pertains to this report */
  "sessionId": "exampleId",
  /** Count of the total generated questions for this session. */
  "totalQuestions": 30,
  /** Keeps track of the amount questions that were answered.  */
  "answeredQuestions": 25,
  /** An object that contains question/answer stats by difficulty. */
  "answers": {
    "easy": {
      "correct": 9,
      "incorrect": 4,
      "unanswered": 2,
      "total": 15
    },
    "medium": {
      "correct": 5,
      "incorrect": 4,
      "unanswered": 1,
      "total": 10
    },
    "hard": {
      "correct": 1,
      "incorrect": 2,
      "unanswered": 2,
      "total": 5
    }
  }
  /** The UTC timestamp of the last time this report was updated. */
  "updatedAt": 1232124124,
  /** The UTC timestamp of the last time this report was updated. */
  "createdAt": 1232124124
}
```

##### Persistence
For persistence we will simply store the reports in the cookies to be passed in the browser requests.

##### New APIs
In order to keep the report up-to-date, our API needs to support the following functionality:

- Generate a new report when a quiz is started.
- Submit an answer for a question.
- Delete reports for sessions that have ended.
- Tally questions in the report as they are generated.

##### **GET** `/api/start`: Start new Quiz.
Description: Initializes a new quiz and generates a new report.

Response 200 (application/json) - Returns a new report and an array initial questions.

##### **GET** `/api/questions`: Sends new questions.
Description: Generates new questions for the current quiz session and updates the report according

Response 200 (application/json) - Sends the new questions and updated report

##### **POST** `/answer`: Submits an answer.
Description: Accepts a question and an answer, and updates the quiz report based on answer validity.

Response 200 (application/json) - Sends the updated report

##### **GET** `/reset`: Deletes report and ends quiz session. Returns the final report.
Description: Resets the trivia API session and deletes the report in the cookies.

Response 200 (application/json) - Sends the updated report

### UI/UX

Tools Used:
- React
- Nextjs
- SASS
- jest
- eslint

I tried to leverage Material UI as much as possible. The quiz dialogs, Timer, and the main page use MaterialUI as much as possible. However, the rest of the application very much uses vanilla HTML Elements.

I used sass modules to keep styling scoped to each component. Each component has it's on `.module.scss` file.

## Additional Notes:

There are a variety of things I wanted to do to expand on this project. Due to time constraints it's not possible at the time of this writing. However, if I have time in the future, it's very likely I'd pick up one or more of these `TO-DOs`. These enhancements include (but are not limited to):

- Creating more parameters around jest testing. Such as coverageThresholds and global mocks.
- Leverage MUI Theming tools better. Though since the design was hacked together and I don't know how to create a design system from scratch (not a designer), I opted to focus on other areas.
- Taking the time to record more detailed question data.
- Add a settings screen to allow the user to toggle the time/difficulty
- Add many more unit tests. I believe every individual component should have some kind of test suite that covers their props. As well as creating tests for the utility functions.
- Add an e2e test to validate the entire user experience
- Add a way for users to contact me with issues

## Acknowledgements

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

This application is powered by the [Trivia API](https://opentdb.com/api_config.php).
