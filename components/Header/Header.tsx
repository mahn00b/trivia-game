import Logo from '../Logo';
import styles from './Header.module.scss';


export default function Header() {
  return (
    <header className={styles.Header}>
      <span className={styles.logo}>
        <Logo />
      </span>
    </header>
  )
}
