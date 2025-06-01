import { useState } from 'react';
import axios from 'axios';
import './App.css';

function Home() {
  const [buttonText, setButtonText] = useState("Generate");
  const [responseText, setResponseText] = useState("Hii  Lagan Mehta I am your Muskan AI Assistant. I am here to help you with your tasks and generate content based on your prompts. You can also add, edit, and delete tasks as needed. Let's get started!");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const [showTaskInput, setShowTaskInput] = useState(false);
  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedTask, setEditedTask] = useState("");

  const generateData = async () => {
    if (prompt.trim() === "") {
      alert("Please enter a prompt to generate data.");
      return;
    }

    setLoading(true);
    setButtonText("Generating...");
    setResponseText("");

    try {
      const res = await axios.post(
        '',
        {
          contents: [{ parts: [{ text: prompt }] }]
        }
      );

      const generatedText = res.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
      setResponseText(generatedText);
    } catch (error) {
      console.error("There was an error generating the data!", error);
      alert("There was an error generating the data!");
    } finally {
      setPrompt("");
      setButtonText("Generate");
      setLoading(false);
    }
  };

  const addTask = () => {
    if (taskText.trim() === "") return;
    setTasks([...tasks, taskText]);
    setTaskText("");
    setShowTaskInput(false);
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditedTask(tasks[index]);
  };

  const saveEditedTask = (index) => {
    if (editedTask.trim() === "") return;
    const updated = [...tasks];
    updated[index] = editedTask;
    setTasks(updated);
    setEditingIndex(null);
    setEditedTask("");
  };

  return (
    <>
      <div className='p-6 w-full overflow-auto'>
        {/* Tasks List */}
        {tasks.length > 0 && (
          <div className='mb-4'>
            <h2 className='text-lg font-bold text-gray-700 mb-2'>Tasks:</h2>
            <ul className='space-y-2 text-slate-600'>
              {tasks.map((task, index) => (
                <li key={index} className='flex items-center gap-2'>
                  {editingIndex === index ? (
                    <>
                      <input
                        type="text"
                        value={editedTask}
                        onChange={(e) => setEditedTask(e.target.value)}
                        className='flex-grow p-1 border border-gray-400 rounded'
                      />
                      <button
                        onClick={() => saveEditedTask(index)}
                        className='bg-green-500 text-white px-3 py-1 rounded'
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <>
                      <span className='flex-grow'>{task}</span>
                      <button
                        onClick={() => startEditing(index)}
                        className='bg-yellow-500 text-white px-2 py-1 rounded'
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTask(index)}
                        className='bg-red-500 text-white px-2 py-1 rounded'
                      >
                        Delete
                      </button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
        <pre className='w-full h-full text-xl text-slate-400 whitespace-pre-wrap'>{responseText}</pre>
      </div>

      {/* Footer Section */}
      <div className='fixed bottom-0 left-0 w-full px-6 py-4 bg-white flex flex-col gap-2 border-t border-gray-300'>
        {/* Prompt Generator */}
        <div className='flex items-center'>
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            type="text"
            placeholder='Enter your prompt...'
            className='flex-grow mr-4 p-2 border border-red-500 rounded'
            disabled={loading}
          />
          <button
            onClick={generateData}
            className='bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-60'
            disabled={loading}
          >
            {buttonText}
          </button>
        </div>

        {/* Add Task Input */}
        <div className='flex items-center gap-4'>
          <button
            onClick={() => {
              setShowTaskInput(!showTaskInput);
              setTaskText("");
            }}
            className='bg-green-600 text-white px-4 py-2 rounded'
          >
            {showTaskInput ? "Cancel" : "Add Task"}
          </button>

          {showTaskInput && (
            <>
              <input
                type="text"
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                placeholder="Enter your task..."
                className='flex-grow p-2 border border-gray-400 rounded'
              />
              <button
                onClick={addTask}
                className='bg-purple-500 text-white px-4 py-2 rounded'
              >
                Add
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
