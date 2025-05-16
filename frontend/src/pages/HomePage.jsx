import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSuperheroStore } from "../store/useSuperheroStore";
import { BadgeAlert } from "lucide-react";
import SuperheroCard from "../components/SuperheroCard";

const HomePage = () => {
  const { getAllSuperheroes, superheroes, loading, error, showMore } =
    useSuperheroStore();

  const location = useLocation();

  const handleShowMore = async () => {
    const urlParams = new URLSearchParams(location.search);
    const startIndex = parseInt(urlParams.get("startIndex")) || 0;
    const limit = parseInt(urlParams.get("limit")) || 5;
    urlParams.set("startIndex", startIndex + limit);
    const searchQuery = urlParams.toString();
    getAllSuperheroes(searchQuery, true);
  };

  useEffect(() => {
    getAllSuperheroes();
  }, [getAllSuperheroes]);
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {error && <div className="alert alert-error mb-8">{error}</div>}

      {superheroes.length === 0 && !loading && (
        <div className="flex flex-col justify-center items-center h-96 space-y-4">
          <div className="bg-base-100 rounded-full p-6">
            <BadgeAlert className="size-12" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-semibold ">No superheroes found</h3>
            <p className="text-gray-500 max-w-sm">
              Get started by adding your first superhero to the database
            </p>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loading loading-spinner loading-lg" />
        </div>
      ) : (
        <>
          <div className="flex flex-wrap justify-center gap-8">
            {superheroes.map((superhero) => (
              <SuperheroCard key={superhero._id} superhero={superhero} />
            ))}
          </div>
          {showMore && (
            <div className="flex justify-center mt-8">
              <button
                className="btn btn-primary w-[700px]"
                onClick={handleShowMore}
              >
                Load more
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default HomePage;
