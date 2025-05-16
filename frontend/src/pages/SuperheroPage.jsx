import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSuperheroStore } from "../store/useSuperheroStore";
import { ArrowLeftIcon, Pencil, Trash2 } from "lucide-react";

import ImageSlider from "../components/ImageSlider";
import EditSuperheroModal from "../components/EditSuperheroModal";

const SuperheroPage = () => {
  const {
    getSuperheroById,
    loading,
    currentSuperhero,
    error,
    deleteSuperhero,
  } = useSuperheroStore();

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getSuperheroById(id);
  }, [id, getSuperheroById]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-error">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <button
        onClick={() => navigate("/")}
        className="btn btn-ghost mb-8 text-lg"
      >
        <ArrowLeftIcon className="size-4 mr-2" />
        Back to Superheroes
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-lg overflow-hidden shadow-lg bg-base-100">
          <ImageSlider
            images={currentSuperhero?.images || []}
            superheroId={currentSuperhero?._id}
          />
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">Details:</h2>

            <div className="flex flex-col h-full justify-between text-xl">
              <div className="flex flex-col gap-9 mb-8">
                <span className="font-medium">
                  <span className="text-primary">Nickname: </span>
                  <span className="font-bold">
                    {currentSuperhero?.nickname}
                  </span>
                </span>
                <span className="font-medium">
                  <span className="text-primary">Real name: </span>
                  <span className="font-bold">
                    {currentSuperhero?.real_name}
                  </span>
                </span>
                <span className="font-medium">
                  <span className="text-primary">Origin description: </span>
                  <span className="font-bold">
                    {currentSuperhero?.origin_description}
                  </span>
                </span>
                <span className="font-medium">
                  <span className="text-primary">Superpowers: </span>
                  <span className="font-bold">
                    {currentSuperhero?.superpowers}
                  </span>
                </span>
                <span className="font-medium">
                  <span className="text-primary">Catch phrase: </span>
                  <span className="font-bold">
                    {currentSuperhero?.catch_phrase}
                  </span>
                </span>
              </div>

              <div className="flex flex-col gap-5 justify-between">
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    document.getElementById("edit_superhero_modal").showModal()
                  }
                >
                  <Pencil />
                  Edit
                </button>
                <EditSuperheroModal />
                <button
                  className="btn btn-error"
                  onClick={() =>
                    document.getElementById("confirm_delete_modal").showModal()
                  }
                >
                  <Trash2 />
                  Delete
                </button>

                <dialog id="confirm_delete_modal" className="modal">
                  <div className="modal-box">
                    <h3 className="font-bold text-lg">Are you sure?</h3>
                    <p className="py-4">
                      Do you really want to delete this superhero?
                    </p>
                    <div className="modal-action">
                      <form method="dialog" className="flex gap-4">
                        <button
                          className="btn"
                          onClick={() =>
                            document
                              .getElementById("confirm_delete_modal")
                              .close()
                          }
                        >
                          Cancel
                        </button>
                        <button
                          className="btn btn-error"
                          onClick={() => {
                            deleteSuperhero(currentSuperhero._id);
                            setTimeout(() => navigate("/"), 1000);
                          }}
                        >
                          Yes, delete
                        </button>
                      </form>
                    </div>
                  </div>

                  <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                  </form>
                </dialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperheroPage;
