    import React, { useState, useEffect } from 'react'
    import axios from 'axios'

    const App = () => {

      const [title, settitle] = useState('');
      const [content, setcontent] = useState('');
      const [task, settask] = useState([])

       const API_URL = "http://localhost:5000/api/notes";

       const fetchNotes  =async ()=>{
       const res = await axios.get(API_URL);
       settask(res.data);
       }

       useEffect(()=>{
        fetchNotes()
       },[])

      const submitHandler = async(e)=>{
        e.preventDefault()
    console.log('submited');

    if (!title.trim() || !content.trim()) {
      alert("Please fill both fields");
      return;
    }

    const res = await axios.post(API_URL,{title,content})

       settask([res.data, ...task]); 

        
        settitle('');
        setcontent('');

      }

       const deleteNote = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      settask(task.filter((task) => task._id !== id));
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

      return (
        <div className='w-full min-h-screen bg-zinc-900 text-white p-3 lg:p-10'>

        <form onSubmit={(e)=>{
          submitHandler(e)
        }}>
          <h3 className='text-2xl'>Create Notes</h3>
          <input  value={title} onChange={(e)=>{
              settitle(e.target.value)
          }}  className='px-3 py-2 bg-transparent rounded-md border-2 block border-zinc-800 mt-2 w-full lg:w-1/3 outline-none'  type="text" name='title' placeholder='title' />
          <textarea value={content} onChange={(e)=>{
            setcontent(e.target.value);
          }} className='px-3 py-2 bg-transparent rounded-md border-2 block border-zinc-800 mt-2 w-full lg:w-1/3 outline-none resize-none' placeholder='What s Your Mind?'  ></textarea>
          <input className='px-3 py-2 bg-blue-500 rounded-md mt-3'  type="submit" name='submit' value="submit" />
        </form>

        <div className="notes mt-5 lg:mt-10">
          <div className="notes-container flex flex-wrap gap-3">
            
            {task.map(function(t,i){

              return  <div key={i} className="notes border-2 p-3 rounded-md border-zinc-800 w-full lg:w-1/3">
              <p className='text-blue-500'>@{t.title}</p>
              <p className='text-sm tracking-tight'>{t.content}</p>
               <button
                className='mt-2 text-red-500'
                onClick={() => deleteNote(t._id)}
              >
                Delete
              </button>
            </div>
            
            })}
          
        
          </div>
        </div>

        </div>
      )
    }

    export default App
