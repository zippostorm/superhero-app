import React from "react";

const SuperheroCard = ({ superhero }) => {
  return (
    <div
      className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
      onClick={() => console.log(superhero)}
    >
      <figure className="relative h-[550px] w-[450px]">
        <img
          src={superhero.images[0].secure_url}
          alt={superhero.nickname}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </figure>

      <div className="card-body">
        <h1 className="card-title text-5xl mx-auto font-semibold">
          {superhero.nickname}
        </h1>
      </div>
    </div>
  );
};

export default SuperheroCard;
