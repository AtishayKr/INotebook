import React, { useContext, useEffect, useState, useRef } from "react";
import noteContest from "../context/notes/noteContest";
import Noteitem from "./Noteitem";
import Modal from "./Modal";

export default function Notes(props) {

  const { showAlert } = props;

  const context = useContext(noteContest);
  const { notes, getNotes, editNote } = context;

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);

  const refrance = useRef(null);
  const refClose = useRef(null);

  const updateNote = (currentNote) => {
    refrance.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };
  const handleClick = (e) => {
    // console.log("updating the done", note);
    // console.log(note.id, note.etitle, note.edescription, note.etag);
    editNote(note.etitle, note.edescription, note.etag, note.id);
    refClose.current.click();
    showAlert("Notes updated successfuly", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Modal
        refrance={refrance}
        refClose={refClose}
        note={note}
        onChange={onChange}
        handleClick={handleClick}
      />

      <div>
        <div className="container my-4">
          <h2> Your Notes</h2>

          <div className="container mx-2">
            {notes.length === 0 && "No notes to display"}
          </div>
          <div className="row">
            {notes.map((note) => {
              return (
                <div className="col-lg-3 col-md-4 col-sm-6">
                  {" "}
                  <Noteitem
                    key={note._id}
                    updateNote={updateNote}
                    showAlert={showAlert}
                    note={note}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
