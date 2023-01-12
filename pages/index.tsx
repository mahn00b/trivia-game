import { useState, useEffect } from 'react';
import fetch from 'node-fetch';
import Head from 'next/head';
import { Header, Timer } from '../components';
import { ScoreBoard, StartDialog, Quiz } from '../container';
import { QUIZ_TIME_LIMIT } from '../constants';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [report, setReport] = useState<null | QuizReport>(null);
  const [initialQs, setInitialQs] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    if (!report) setupNewGame();
  }, []);

  const setupNewGame = async () => {
    try {
      const response = await fetch('/api/start');

      if (!response.ok) throw new Error();

      const { report, questions } = await response.json();

      setReport(report);
      setInitialQs(questions);
      setIsGameOver(false);

    } catch (err) {
      console.log('error', err);
      // in case there's a persisting session
      const res = await fetch('/api/end');

      const {
        report
      } = await res.json();

      console.log('error', report);

      await setupNewGame();
    }
  };

  const onNewReport = (report: QuizReport) => {
    setReport(report);
  };

  const onClickStart = () => {
    setIsPlaying(true);
  };

  const onEndGame = async () => {
    const response = await fetch('/api/end');

    const { report } = await response.json();
console.log('we tried', report);
    setReport(report);
    setIsPlaying(false);
    setIsGameOver(true);
  };

  return (
    <>
      <Head>
        <title>Trivially</title>
        <meta name="description" content="An app that tests your trivia knowledge." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header  />
      <main className={styles.main} style={{ padding: '10rem'}}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "3rem"}}>
          {!isGameOver && <Timer pause={!isPlaying || isGameOver} limit={QUIZ_TIME_LIMIT} onReachedLimit={onEndGame} />}
        </div>
        <div>
          {isPlaying && !isGameOver && <Quiz initialQuestions={initialQs} onNewReportGenerated={onNewReport} />}
        </div>
        <div>
          {!isPlaying && !isGameOver && <StartDialog onClickStart={onClickStart} />}
          {!isPlaying && isGameOver && report && <ScoreBoard report={report} onRestart={setupNewGame} />}
        </div>
      </main>
    </>
  );
}
