import React, { useContext, useState } from "react";
import noteContest from "../../context/notes/noteContest";
import AddNotePage from "./AddNotePage";
import Spinner from "../Spinner"

export default function AddNote(props) {
  const { showAlert } = props;

  const context = useContext(noteContest);
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: ""});

  const handleClick = async (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag, note.loading);
    showAlert("Notes updated successfuly", "success");
    setNote({ title: "", description: "", tag: "" });
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  if(note.loading === "true") {
    return (
      <>
        <Spinner />
      </>
    )
  } else {
    return (
      <>
  
        <AddNotePage onChange={onChange} handleClick={handleClick} note={note} />
      </>
    )
  }
}
