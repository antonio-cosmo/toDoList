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
}
export function TaskList() {

  const [tasks, setTasks] = useState<Task[]>(() => {
    const storage = localStorage.getItem('tasks');
    if(!storage) return []
    return JSON.parse(storage)
  });
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [countTasks, setCountTasks] = useState(() => tasks.length)
  const [countTasksComplete, setCountTasksComplete] = useState(() => {
    if(tasks.length === 0 ) return 0

    return tasks.reduce((acc, task) => {
      if(task.isComplete) return acc + 1;
      return acc
    }, 0)
  })


  const handleCreateNewTask = () => {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if(!newTaskTitle) return;

    const newTask ={
      id:uuidv4(),
      title: newTaskTitle,
      isComplete:false
    }
    setTasks(tasks => [...tasks, newTask]);
    setNewTaskTitle('');
    setCountTasks(tasks.length + 1)
    const taskList = JSON.stringify([...tasks, newTask])
    localStorage.setItem('tasks', taskList)

  }

  const handleToggleTaskCompletion = (id: string) => {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const checktedTask = tasks.map(task => task.id === id ? {...task, isComplete: !task.isComplete}:task )
    const countComplete = checktedTask.reduce((acc, task) => {
      if(task.isComplete) return acc + 1;
      return acc
    }, 0)
    setTasks(checktedTask)
    setCountTasksComplete(countComplete)

    const taskList = JSON.stringify(checktedTask)
    localStorage.setItem('tasks', taskList)
    

  }

  const handleRemoveTask = (id: string) => {
    // Remova uma task da listagem pelo ID
    const filterTask = tasks.filter(valor => valor.id !== id)
    const countComplete = filterTask.reduce((acc, task) => {
      if(task.isComplete) return acc + 1;
      return acc
    }, 0)
    setTasks(filterTask)
    setCountTasks(tasks.length - 1)
    setCountTasksComplete(countComplete)
    const taskList = JSON.stringify(filterTask)
    localStorage.setItem('tasks', taskList)
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
            <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask} >
              
                <span>Criar</span>
                <img src={imgPlus} alt="plus" />
              
            </button>
        </div>

        <div className={styles.containerTask}>

          <header className={styles.headerTask}>
            <p className={styles.taskCreate}>Tarefas criadas<span>{countTasks}</span></p>
            <p className={styles.taskComplete}>Concluidas 
              <span>
                {countTasks ? `${countTasksComplete} de ${countTasks}` : 0}
              </span>
            </p>
          </header>

          {tasks.length <= 0 ? (
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
          ) : (
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
          )}
          

        </div>
      </div>
    </main>
  )
}

