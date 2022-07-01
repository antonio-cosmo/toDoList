import styles from './styles.module.css';
import image from '../../assets/logo.svg'
export function Header(){
  return (
    <header className={styles.containerHeader}>
      <div className={styles.container}>
        <div className={styles.containerImage}>
          <img src={image} alt="Logo" />
        </div>
      </div>
    </header>
  );
}