import React from "react";
import { useNavigate } from "react-router-dom";

const SuperheroCard = ({ superhero }) => {
  const navigate = useNavigate();
  return (
    <div
      className="card w-[380px] bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
      onClick={() => {
        navigate(`/superhero/${superhero._id}`);
      }}
    >
      <figure className="relative h-[550px]">
        <img
          src={superhero?.images[0]?.secure_url}
          alt={superhero.nickname}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </figure>

      <div className="card-body">
        <h1 className="card-title text-5xl mx-auto text-center font-semibold">
          {superhero.nickname}
        </h1>
      </div>
    </div>
  );
};

export default SuperheroCard;
