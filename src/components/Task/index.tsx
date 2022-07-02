import styles from './styles.module.css';
import imgDelete from '../../assets/delete.svg';

interface Task {
  id: string;
  title: string;
  isComplete: boolean;
}
interface TaksProps {
  task: Task;
  onToggleTaskCompletion: (id:string) => void;
  onRemoveTask: (id: string) => void;
}
export function Task({task, onToggleTaskCompletion, onRemoveTask}: TaksProps){
  
  return(
    <li>
      <div className={task.isComplete ? styles.completed : ''} data-testid="task" >
        <label className={styles['checkbox-container']}>
          <input 
            type="checkbox"
            readOnly
            checked={task.isComplete}
            onClick={() => onToggleTaskCompletion(task.id)}
          />
          <span className={styles.checkmark}></span>
        </label>
        <p>{task.title}</p>
      </div>

      <button type="button" data-testid="remove-task-button" onClick={() => onRemoveTask(task.id)}>
        <img src={imgDelete} alt="excluir" />
      </button>
    </li>
  )
}