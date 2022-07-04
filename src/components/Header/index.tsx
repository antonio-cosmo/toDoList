import styles from './styles.module.css';
import image from '../../assets/logo.svg'
export function Header(){
  return (
    <header className={styles.containerHeader}>
      <div className={styles.container}>
        <div className={styles.image}>
          <img src={image} alt="lista de tarefas" />
        </div>
      </div>
    </header>
  );
}