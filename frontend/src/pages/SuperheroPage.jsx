import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSuperheroStore } from "../store/useSuperheroStore";
import { ArrowLeftIcon } from "lucide-react";

const SuperheroPage = () => {
  const { getSuperheroById, loading, currentSuperhero, error } =
    useSuperheroStore();

  const { id } = useParams();
  const navigate = useNavigate();

  console.log(currentSuperhero, "currentSuperhero");

  useEffect(() => {
    getSuperheroById(id);
  }, [id]);

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
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <button
        onClick={() => navigate("/")}
        className="btn btn-ghost mb-8 text-lg"
      >
        <ArrowLeftIcon className="size-4 mr-2" />
        Back to Superheroes
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-lg overflow-hidden shadow-lg bg-base-100">
          {currentSuperhero?.images?.map((img, index) => (
            <img
              key={index}
              src={img.secure_url || img}
              alt={`Image ${index + 1}`}
              className="w-full h-auto object-cover mb-4"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuperheroPage;
