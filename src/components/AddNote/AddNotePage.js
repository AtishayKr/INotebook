import React from "react";

export default function AddNotePage2(props) {
  const { onChange, note, handleClick } = props;
  return (
    <>
      <div
        className="vh-90 my-4"
        style={{ backgroundColor: "#2779e2", borderRadius: "15px" }}
      >
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-9">
              <h1 className="text-white mb-2 py-2">
                Add a Note{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  className="bi bi-vector-pen"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.646.646a.5.5 0 0 1 .708 0l4 4a.5.5 0 0 1 0 .708l-1.902 1.902-.829 3.313a1.5 1.5 0 0 1-1.024 1.073L1.254 14.746 4.358 4.4A1.5 1.5 0 0 1 5.43 3.377l3.313-.828L10.646.646zm-1.8 2.908-3.173.793a.5.5 0 0 0-.358.342l-2.57 8.565 8.567-2.57a.5.5 0 0 0 .34-.357l.794-3.174-3.6-3.6z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M2.832 13.228 8 9a1 1 0 1 0-1-1l-4.228 5.168-.026.086.086-.026z"
                  />
                </svg>
              </h1>

              <div className="card" style={{ borderRadius: "15px" }}>
                <div className="card-body">
                  <div className="row align-items-center pt-1 pb-1">
                    <div className="col-md-3 ps-5">
                      <h6 className="mb-0">Title</h6>
                    </div>
                    <div className="col-md-9 pe-5">
                      <input
                        type="text"
                        name="title"
                        value={note.title}
                        onChange={onChange}
                        required
                        className="form-control form-control-lg"
                      />
                    </div>
                  </div>

                  <hr className="mx-n3" />

                  <div className="row align-items-center py-1">
                    <div className="col-md-3 ps-5">
                      <h6 className="mb-0">Discription</h6>
                    </div>
                    <div className="col-md-9 pe-5">
                      <textarea
                        name="description"
                        onChange={onChange}
                        value={note.description}
                        required
                        className="form-control"
                        rows="3"
                        placeholder="Description of Your Note"
                      ></textarea>
                    </div>
                  </div>

                  <hr className="mx-n3" />

                  <div className="row align-items-center pt-1 pb-1">
                    <div className="col-md-3 ps-5">
                      <h6 className="mb-0">Tag</h6>
                    </div>
                    <div className="col-md-9 pe-5">
                      <input
                        type="text"
                        name="tag"
                        onChange={onChange}
                        value={note.tag}
                        className="form-control form-control-lg"
                      />
                    </div>
                  </div>

                  <hr className="mx-n3" />

                  <div className="px-5 py-1">
                    <button
                      disabled={
                        note.title.length < 5 || note.description.length < 5
                      }
                      type="submit"
                      onClick={handleClick}
                      className="btn btn-primary btn-lg"
                    >
                      Add Note
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
