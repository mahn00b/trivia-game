This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Trivia App
###### *Powered by the trivia API*

## Description
This web app is a trivia game that allows a user to answer trivia questions and tally a score based on the results. This application is powered by the [Trivia API](https://opentdb.com/api_config.php).

## Usage

### Pre-Requisites
This app was built using next.js so it requires that you have that installed as well as one of the various npm package manager

**System Requirements**:
- Node.js 14.6.0 or newer
- MacOS, Windows (including WSL), and Linux are supported

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

### Run
The fastest way to get it running is to run it in dev mode. You can do this simply by running one of the following lines.

using npm:
```bash
$ npm run dev
```
using yarn:
```bash
$ yarn dev
```

##### production
If you want to run a production instance of this webapp, you need to build it first. Once it's built, then you can use the start script to run it.

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

This endpoints could look like this:

- **GET** `/start`: Creates a new quiz session and quiz report.
- **GET** `/questions`: Sends new questions.
- **POST** `/answer`: Submits an answer.
- **GET** `/reset`: Deletes report and ends quiz session. Returns the final report.
