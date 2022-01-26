import React, { useContext,useState } from 'react';
import NoteContext from '../context/notes/NoteContext';

const AddNote = () => {
    const context = useContext(NoteContext);
    const { addNote } = context;

    const [note, setNote] = useState({title:"", description:""});

    const clickHandle = (e)=>{
        e.preventDefault();
        addNote(note.title,note.description);
    }

    const onChange=(e)=>{
        setNote({...note, [e.target.name]: e.target.value}) 
    }

  return (
    <div>
      <div className="container my-3">
        <h1>Add a Note</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label row-4">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={onChange}
            />
          </div>
          <button type="submit" className="btn btn-primary" onClick={clickHandle}>
            Add Note
          </button>
        </form>
      </div>

      <div className="container my-4">
        
      </div>
    </div>
  );
};

export default AddNote;
