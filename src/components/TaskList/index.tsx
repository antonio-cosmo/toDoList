import styles from './styles.module.css';
import { v4 as uuidv4 } from 'uuid';
import imgPlus from '../../assets/plus.svg';
import clipBoard from '../../assets/clipboard.svg';
export function TaskList() {
  return(
    <main>
      <div className={styles.container}>
        <div className={styles.inputGroup}>
            <input 
              type="text" 
              placeholder="Adicione uma nova tarefa" 
            />
            <button type="submit" data-testid="add-task-button" >
              
                <span>Criar</span>
                <img src={imgPlus} alt="plus" />
              
            </button>
        </div>

        <div className={styles.containerTask}>
          <header className={styles.headerTask}>
            <p className={styles.taskCreate}>Tarefas criadas <span>0</span></p>
            <p>Concluidas <span>0</span></p>
          </header>
          <div className={`${styles.containertTaskList} ${styles.border}`}>
              <div className={styles.msg}>
                <img src={clipBoard} />
                <p>
                  Você ainda não tem tarefas cadastradas</p>
                <p>
                  Crie tarefas e organize seus itens a fazer
                </p>
              </div>
          </div>
        </div>
      </div>
    </main>
  )
}

