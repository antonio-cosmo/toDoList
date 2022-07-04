import styles from './styles.module.css';
import { v4 as uuidv4 } from 'uuid';
import imgPlus from '../../assets/plus.svg';
import clipBoard from '../../assets/clipboard.svg';
import { useState } from 'react';
import { Task } from '../Task';

interface Task {
  id: string;
  title: string;
  isComplete: boolean;
};

export function TaskList() {

  const [tasks, setTasks] = useState<Task[]>(() => {
    const storage = localStorage.getItem('tasks');
    if(!storage) return [];

    return JSON.parse(storage);
  });
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [countTasks, setCountTasks] = useState(() => tasks.length);
  const [countTasksComplete, setCountTasksComplete] = useState(() => {
    if(!tasks.length) return 0;

    return tasks.reduce((acc, task) => {
      if(task.isComplete) return acc + 1;
      return acc
    }, 0);

  });

  const setLocalStorage = (key:string, value:any) => {
    const newValue = JSON.stringify(value);
    localStorage.setItem(key, newValue);
  }

  const handleCreateNewTask = () => {
    // Cria uma nova task, não permite criar caso o título seja vazio.
    if(!newTaskTitle) return;

    const newTask ={
      id:uuidv4(),
      title: newTaskTitle,
      isComplete:false
    };
    setTasks(tasks => [...tasks, newTask]);
    setNewTaskTitle('');

    setCountTasks(count => count + 1);

    setLocalStorage('tasks',[...tasks, newTask] )

  }

  const handleToggleTaskCompletion = (id: string) => {
    // Altera entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const updateTasks = tasks.map(task => task.id === id ? {...task, isComplete: !task.isComplete}:task );

    const tasksComplete = updateTasks.reduce((acc, task) => {
      if(task.isComplete) return acc + 1;
      return acc
    }, 0);

    setTasks(updateTasks);
    setCountTasksComplete(tasksComplete);

    setLocalStorage('tasks', updateTasks);
    

  }

  const handleRemoveTask = (id: string) => {
    // Remove uma task da listagem pelo ID
    const undeletedTasks = tasks.filter(task => task.id !== id);

    const tasksComplete = undeletedTasks.reduce((acc, task) => {
      if(task.isComplete) return acc + 1;
      return acc
    }, 0);

    setTasks(undeletedTasks);
    setCountTasks(count => count - 1)

    setCountTasksComplete(tasksComplete);

    setLocalStorage('tasks', undeletedTasks);
  }

  return(
    <main>
      <div className={styles.container}>
        <div className={styles.inputGroup}>
            <input 
              type="text" 
              placeholder="Adicione uma nova tarefa" 
              onChange={(e) => setNewTaskTitle(e.target.value)}
              value={newTaskTitle}
            />
            <button type="submit" onClick={handleCreateNewTask} >
              
                <span>Criar</span>
                <img src={imgPlus} alt="plus" />
              
            </button>
        </div>

        <div className={styles.containerTasks}>

          <header className={styles.headerTasks}>
            <p className={styles.countTasks}>
              Tarefas criadas
              <span>{countTasks}</span></p>
            <p className={styles.countCompleted}>
              Concluidas 
              <span>
                {countTasks ? `${countTasksComplete} de ${countTasks}` : 0}
              </span>
            </p>
          </header>

          <div className={styles.containertTasksList}>
            {!tasks.length ? (
              <div className={styles.containerMsg}>
                <div className={styles.msg}>
                  <img src={clipBoard} />
                  <p>
                    Você ainda não tem tarefas cadastradas</p>
                  <p>
                    Crie tarefas e organize seus itens a fazer
                  </p>
                </div>
              </div>
            ) : (
              <div className={styles.containertTasksList}>
                <ul>
                  { tasks.map(task => {
                    return (
                      <Task
                        key={task.id}
                        task={task}
                        onToggleTaskCompletion={handleToggleTaskCompletion}
                        onRemoveTask={handleRemoveTask}
                      />)
                  } )}
                </ul>
              </div>
            )}
          </div>

          

        </div>
      </div>
    </main>
  )
}

