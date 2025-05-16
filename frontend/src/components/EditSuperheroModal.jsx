import React from "react";

const EditSuperheroModal = () => {
  return (
    <dialog id="edit_superhero_modal" className="modal">
      <div className="modal-box">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() =>
            document.getElementById("edit_superhero_modal").close()
          }
        >
          X
        </button>
      </div>
    </dialog>
  );
};

export default EditSuperheroModal;
