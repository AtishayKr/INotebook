import React, { useContext } from "react";
import noteContest from "../context/notes/noteContest";

export default function Noteitem(props) {
  const context = useContext(noteContest);
  const { deleteNote } = context;
  const { note, updateNote, showAlert } = props;

  const onClick = () => {
    deleteNote(note._id);
    showAlert("Notes deleted successfuly", "success");
  };

  return (
    <>
      <div className="card text-dark bg-light my-2">
        <div className="card-header">
          {note.tag}
          <i className="fa-solid fa-trash-can mx-4" onClick={onClick}></i>
          <i
            className="fa-solid fa-pen-to-square"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={() => {
              updateNote(note);
            }}
          ></i>
        </div>
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </>
  );
}
