import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  //Get all  notes
  const getNotes = async () => {
    //API call to fetch all notes
    const response = await fetch(`${host}/api/note/allnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "jwt-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFkZTdiNDMwNDYwZDY5Nzk3NDNiNzIzIn0sImlhdCI6MTY0MTk3MDUyMn0.QsnW4Bh0TE6PR1glniQI0rc0nk0LhNxbrj3qTOdcLbA",
      },
    });
    const json = await response.json();
    // console.log(json);
    setNotes(json);
  };

  //Adding a note
  const addNote = async (title, description) => {
    console.log(title)
    //API call
    const response = await fetch(`${host}/api/note/createnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "jwt-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFkZTdiNDMwNDYwZDY5Nzk3NDNiNzIzIn0sImlhdCI6MTY0MTk3MDUyMn0.QsnW4Bh0TE6PR1glniQI0rc0nk0LhNxbrj3qTOdcLbA",
      },
      body: JSON.stringify({ title, description}),
    });

    //client side
    // console.log("Adding new note");
    const note = {
      _id: "61dea096b6c209882d9917c32",
      user: "61de7b430460d6979743b723",
      title: title,
      description: description,
    };
    setNotes(notes.concat(note));
  };



  //Deleting a note
  const deleteNote = async (id) => {
    console.log(id)
    //API call
    const response = await fetch(`${host}/api/note/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "jwt-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFkZTdiNDMwNDYwZDY5Nzk3NDNiNzIzIn0sImlhdCI6MTY0MTk3MDUyMn0.QsnW4Bh0TE6PR1glniQI0rc0nk0LhNxbrj3qTOdcLbA",
      },
    });

    const json = await response.json();
    // console.log(json);

    console.log("deleting note", id);
    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
  };

  //Editing a note
  const editNote = async (id, title, description) => {
    //API call
    const response = await fetch(`${host}/api/note/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "jwt-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFkZTdiNDMwNDYwZDY5Nzk3NDNiNzIzIn0sImlhdCI6MTY0MTk3MDUyMn0.QsnW4Bh0TE6PR1glniQI0rc0nk0LhNxbrj3qTOdcLbA",
      },
      body: JSON.stringify({ title, description }),
    });

    let newNote = JSON.parse(JSON.stringify(notes))

    //client side editing
    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index];
      if (element._id === id) {
        newNote[index].title = title;
        newNote[index].description = description;
        break;
      }
    }

    setNotes(newNote)
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children};
    </NoteContext.Provider>
  );
};

export default NoteState;
