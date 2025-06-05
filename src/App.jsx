import React, { useState } from 'react';

// our Main App component
export default function App() {
  // i have Initialized tasks state with a hardcoded array like the instruction
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Buy groceries', completed: false },
    { id: 2, title: 'Read a book', completed: true },
  ]);

  // State to hold the new task title input
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // Function to add a new task
  const addTask = () => {
    // i have added basic validation so that task title cannot be empty
    if (newTaskTitle.trim() === '') {
      console.log("Task title cannot be empty."); // Using console.log for feedback instead of alert()
      return;
    }

    // Create a new task object
    const newTask = {
      id: tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1, // Generate unique ID
      title: newTaskTitle,
      completed: false,
    };

    // ro add the new task to the tasks array
    setTasks([...tasks, newTask]);
    // to clear the input field
    setNewTaskTitle('');
  };

  // function to toggle the completion status of a task
  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // this will delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-800 flex items-center justify-center p-4 font-sans antialiased">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md mx-auto transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center tracking-tight">
          My Task List
        </h1>

        {/* Add New Task Section */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            type="text"
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 placeholder-gray-400 text-lg"
            placeholder="Add a new task..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                addTask();
              }
            }}
          />
          <button
            onClick={addTask}
            className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 text-lg whitespace-nowrap"
          >
            Add Task
          </button>
        </div>

        {/* Task List Section */}
        {tasks.length === 0 ? (
          <p className="text-gray-500 text-center text-xl mt-10">No tasks yet! Add one above.</p>
        ) : (
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li
                key={task.id}
                className={`flex items-center justify-between p-4 rounded-lg shadow-sm transition-all duration-200 ${
                  task.completed
                    ? 'bg-green-100 border-l-4 border-green-500 text-gray-600 line-through'
                    : 'bg-gray-50 border-l-4 border-purple-500 text-gray-800'
                }`}
              >
                <div
                  className="flex-grow cursor-pointer flex items-center"
                  onClick={() => toggleTaskCompletion(task.id)}
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    readOnly
                    className="form-checkbox h-6 w-6 text-purple-600 rounded-full mr-4 flex-shrink-0"
                  />
                  <span className="text-xl font-medium break-words pr-2">
                    {task.title}
                  </span>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500 hover:text-red-700 p-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-300"
                  aria-label={`Delete task: ${task.title}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
