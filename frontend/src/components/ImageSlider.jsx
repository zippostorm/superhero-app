import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSuperheroStore } from "../store/useSuperheroStore";

const ImageSlider = ({ images, superheroId }) => {
  const { deleteImage } = useSuperheroStore();

  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const hasMultipleImages = images.length > 1;

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const handleDelete = async () => {
    console.log(images[currentIndex].public_id, superheroId);
    if (images.length === 1) {
      toast.error(
        "Superhero must have at least one image. Please add another first."
      );
      return;
    }

    await deleteImage(images[currentIndex].public_id, superheroId);
  };

  return (
    <div className="relative w-full h-[550px] overflow-hidden rounded-lg shadow-lg bg-base-100">
      <img
        src={images[currentIndex]?.secure_url || images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className="w-full h-full object-cover"
      />

      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full z-10"
        title="Delete this image"
      >
        <Trash2 className="w-5 h-5" />
      </button>

      {hasMultipleImages && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black p-2 rounded-full shadow"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black p-2 rounded-full shadow"
          >
            <ChevronRight />
          </button>
        </>
      )}

      {hasMultipleImages && (
        <div className="absolute bottom-4 w-full flex justify-center items-center space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageSlider;
