import {
  Dialog,
  DialogTitle,
  Divider,
  DialogContent,
  useTheme,
  useMediaQuery,
  CardHeader,
  CardContent,
  Card,
  Button
} from '@mui/material';
import { DIFFICULTY_LEVELS } from '../../constants';
import styles from './ScoreBoard.module.scss';

const DIFFICULTY_SCORE_MODIFIERS = {
  easy: 1.25,
  medium: 1.5,
  hard: 1.75,
};

interface ScoreBoardProps {
  /** The final report passed when the game is ended. */
  report: QuizReport;
  /** Callback prop that runs once a clicks play again. */
  onRestart?: () => {};
}

export default function ScoreBoard({
  onRestart,
  report: {
    answers
  }
}: ScoreBoardProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  let score = 0;

  DIFFICULTY_LEVELS.forEach((level) => {
    const {
      correct,
      incorrect
    } = answers[level];

    score += Math.floor(correct * 10 * DIFFICULTY_SCORE_MODIFIERS[level]);

    score += incorrect * -2 * DIFFICULTY_SCORE_MODIFIERS[level];

    score = score < 0 ? 0 : score;
  });

  return (
    <>
    <Dialog
      open={true}
      disableEscapeKeyDown={true}
      fullScreen={isMobile}
      fullWidth
      maxWidth="md"
      className={styles.ScoreBoard}
    >
      <DialogTitle className={styles.title}>Game Over</DialogTitle>
      <Divider />
      <DialogContent>
        <div className={styles.score}>
          <h4>Score</h4>
          {score}
        </div>
        <div className={styles.scoreDetails}>
          {DIFFICULTY_LEVELS.map((level) => (<DifficultyResultCard key={level} answers={answers} level={level} />))}
        </div>
        <Divider />
        <div className={styles.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={onRestart}
          >
            Play Again
          </Button>
        </div>
      </DialogContent>
    </Dialog>
    </>
  );
}

interface DifficultyResultCardProps {
  answers: QuizReport['answers'];
  level: DifficultyLevel;
}

function DifficultyResultCard({
  answers,
  level
}: DifficultyResultCardProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card variant="outlined" className={`${styles.DifficultyResultCard} ${styles[level]}`}>
      <CardHeader title={level === 'medium' && isMobile ? 'med' : level} className={styles.cardTitle} />
      <CardContent className={styles.content}>
        <span className={styles.correct}>{answers[level].correct}</span>
        <span className={styles.total}>{`/${answers[level].correct + answers[level].incorrect}`}</span>
      </CardContent>
    </Card>
  );
}
