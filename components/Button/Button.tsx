import { HTMLAttributes } from 'react';
import styles from './Button.module.scss';

export default function Button({
  children,
  ...rest
}: HTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={styles.Button} {...rest}>
      {children}
    </button>
  )
}
