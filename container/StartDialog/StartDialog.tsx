import {
  Dialog,
  DialogTitle,
  Divider,
  DialogContent,
  useTheme,
  useMediaQuery,
  DialogActions,
  Button
} from '@mui/material';
import styles from './StartDialog.module.scss';

interface StartDialogProps {
  onClickStart?: () => void
}

export default function StartDialog({
  onClickStart = () => {}
}: StartDialogProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return(
    <Dialog
      id="StartDialog"
      open={true}
      disableEscapeKeyDown={true}
      fullScreen={isMobile}
      fullWidth
      maxWidth="md"
      className={styles.StartDialog}
    >
      <DialogTitle className={styles.title}>
        How to play
      </DialogTitle>
      <Divider />
      <DialogContent className={styles.instructions}>
        <p>
          The instructions are straight forward. Answer as many questions as you can in 5 minutes.
        </p>
        <p>
          The questions vary in difficulty so you can expect the difficulty to shift randomly.
          You will be scored based on the difficulty of the questions you answered correctly/incorrectly.
        </p>
        <p>
          When you are ready to start, click the button below.
        </p>
      </DialogContent>
      <Divider />
      <DialogActions className={styles.buttonContainer}>
          <Button variant="contained" onClick={onClickStart} size="large">Start</Button>
      </DialogActions>
    </Dialog>
  );
}
