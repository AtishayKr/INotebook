import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import NoteState from "./context/notes/NoteState";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/SignUp/Signup";
import Login from "./components/Login/Login";
import Alert from "./components/Alert";
import { useState } from "react";
import AddNote from "./components/AddNote/AddNote";
import Notes from "./components/Notes";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar showAlert={showAlert}/>
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route
                exact
                path="/"
                element={
                  !localStorage.getItem("token") ? (
                    <Login showAlert={showAlert} />
                  ) : (
                    <Notes showAlert={showAlert} />
                  )
                }
              />
              <Route
                exact
                path="/addNote"
                element={<AddNote showAlert={showAlert} />}
              />
              <Route
                exact
                path="/showNote"
                element={<Notes showAlert={showAlert} />}
              />
              <Route
                exact
                path="/login"
                element={<Login showAlert={showAlert} />}
              />
              <Route
                exact
                path="/signup"
                element={<Signup showAlert={showAlert} />}
              />
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
