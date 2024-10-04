import React, { useState, useEffect } from 'react';

function ToDo() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 10;

  useEffect(() => {
    const fetchTasks = async () => {
      const accessToken = localStorage.getItem('access-token');

      try {
        const response = await fetch('http://127.0.0.1:4000/todo/listing', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }

        const data = await response.json();
        setTasks(data.data.data); 
      } catch (error) {
        console.error('Error fetching tasks:', error.message);
        setErrorMessage('There was an issue fetching tasks. Please try again.');
      }
    };

    fetchTasks();
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleAddTask = () => {
    if (title.trim() && description.trim()) {
      const newTask = { title, description };
      const accessToken = localStorage.getItem('access-token');

      setErrorMessage('');

      fetch('http://127.0.0.1:4000/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(newTask),
      })
        .then(response => response.json())
        .then(data => {
          setTasks(prevTasks => [...prevTasks, data.data]); // Add the new task to the list
          setTitle('');  // Reset title
          setDescription('');  // Reset description
          setIsModalOpen(false); // Close the modal after adding the task
        })
        .catch(error => {
          console.error('Error adding task:', error.message);
          setErrorMessage('There was an issue saving your task. Please try again.');
        });
    } else {
      setErrorMessage('Title and description cannot be empty.');
    }
  };

  const handleEditTask = () => {
    if (title.trim() && description.trim() && editingTaskId) {
      const updatedTask = { title, description };
      const accessToken = localStorage.getItem('access-token');
      console.log('accessToken',accessToken);

      setErrorMessage('');

      fetch(`http://127.0.0.1:4000/todo/${editingTaskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(updatedTask),
      })
        .then(response => response.json())
        .then(data => {
          setTasks(prevTasks => 
            prevTasks.map(task =>
              task.id === editingTaskId ? data.data : task
            )
          );
          setTitle('');  // Reset title
          setDescription('');  // Reset description
          setEditingTaskId(null);
          setIsModalOpen(false); // Close the modal after updating the task
        })
        .catch((error) => {
          console.error('Error updating task:', error.message);
          setErrorMessage('There was an issue updating your task. Please try again.');
        });
    } else {
      setErrorMessage('Title and description cannot be empty.');
    }
  };

  const handleEditClick = (task) => {
    setTitle(task.title || ''); // Ensure title is set or empty string
    setDescription(task.description || ''); // Ensure description is set or empty string
    setEditingTaskId(task.id);
    setIsModalOpen(true); // Open the modal when editing a task
  };

  const handleDeleteTask = (taskId) => {
    const accessToken = localStorage.getItem('access-token');

    fetch(`http://127.0.0.1:4000/todo/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete task');
        }

        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
      })
      .catch((error) => {
        console.error('Error deleting task:', error.message);
        setErrorMessage('There was an issue deleting the task. Please try again.');
      });
  };

  const logout = () => {
    localStorage.removeItem('access-token');
    localStorage.clear();
    window.location.href = '/login';
  };

  // Pagination logic
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  return (
    <div>
      <h1 className='text-3xl text-color'>All Todo's List</h1>

      <button 
        className='text-2xl bg-cyan-700 ml-80' 
        onClick={() => {
          setTitle(''); // Clear title before opening modal
          setDescription(''); // Clear description before opening modal
          setIsModalOpen(true);
        }}
      >
        Add Task
      </button>
      
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <ul className=''>
        {currentTasks.map((task, index) => (
          <li key={index} className='flex justify-between items-center rounded-lg bg-gray-100 shadow-md space-x-4 mb-2'>
            <strong className='block text-left'>{task.title}</strong>
            <div className='text-bold'>
              {task.description}
            </div>
            <div className='space-x-5'>
              <button className='text-1xl text-color-white bg-blue-500 py-2 px-6 shadow rounded-lg' onClick={() => handleEditClick(task)}>Edit</button>
              <button className='text-red-700 text-left ml-left border-primary border-2 rounded-lg py-2 px-4 hover:bg-red-600 shadow focus:outline-none focus:ring-red-300' onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

     
      <div className="flex items-center justify-between mt-4">
  <button
    onClick={handlePrevPage}
    disabled={currentPage === 1}
    className={`px-4 py-2 text-sm font-medium rounded-lg border ${
      currentPage === 1
        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
        : "bg-blue-500 text-white hover:bg-blue-600"
    }`}
  >
    Previous
  </button>
  <span className="text-sm text-gray-700">
    {`Showing ${indexOfFirstTask + 1} to ${
      indexOfLastTask > tasks.length ? tasks.length : indexOfLastTask
    } of ${tasks.length}`}
  </span>
  <button
    onClick={handleNextPage}
    disabled={currentPage === totalPages}
    className={`px-4 py-2 text-sm font-medium rounded-lg border ${
      currentPage === totalPages
        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
        : "bg-blue-500 text-white hover:bg-blue-600"
    }`}
  >
    Next
  </button>
</div>


       {(isModalOpen &&
        <div className="fixed inset-0 items-center justify-center flex">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl mb-4 ">{editingTaskId ? 'Edit Task' : 'Add New Task'}</h2>

            <input 
              type="text" 
              placeholder="Title" 
              value={title} 
              onChange={handleTitleChange} 
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />

            <textarea 
              placeholder="Description" 
              value={description} 
              onChange={handleDescriptionChange} 
              className="w-full p-2 border border-gray-300 rounded mb-4" 
            />

            <div className="flex justify-between">
            <button 
                onClick={() => setIsModalOpen(false)} 
                className="rounded-lg bg-red-700 text-color-red py-2 px-4"
              >
                Cancel
              </button>
              <button 
                onClick={editingTaskId ? handleEditTask : handleAddTask} 
                className=" rounded-lg text-color-white bg-blue-500 py-2 px-4 "
              >
                {editingTaskId ? 'Update Task' : 'Yes, I am Sure'}
              </button>
           
            </div>
          </div>
        </div>
        )}
      

      <button 
        type="button" 
        onClick={logout} 
        className="bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg px-6 py-3 mt-8 mx-auto block focus:outline-none focus:ring-2 focus:ring-red-300"
      >
        Log Out
      </button>
    </div>
  );
}

export default ToDo
