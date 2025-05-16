import React, { useRef, useState } from "react";
import { useSuperheroStore } from "../store/useSuperheroStore";
import {
  Cloud,
  MessageSquareMore,
  PlusCircleIcon,
  Siren,
  User,
  UserCheck,
  Image,
} from "lucide-react";

const EditSuperheroModal = () => {
  const { currentSuperhero, loading, editSuperhero } = useSuperheroStore();

  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    nickname: currentSuperhero?.nickname,
    real_name: currentSuperhero?.real_name,
    origin_description: currentSuperhero?.origin_description,
    superpowers: currentSuperhero?.superpowers,
    catch_phrase: currentSuperhero?.catch_phrase,
    images: [],
  });

  const resetFilePicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const readers = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result); // base64 string
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers)
      .then((base64Images) => {
        setFormData((prev) => ({
          ...prev,
          images: base64Images,
        }));
      })
      .catch((err) => {
        console.error("Error reading files", err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editSuperhero(currentSuperhero._id, formData);
    resetFilePicker();
  };

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

        <h3 className="font-bold text-xl mb-8">Edit Superhero</h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">
                  Superhero Name
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <User className="size-5" />
                </div>
                <input
                  type="text"
                  placeholder="Enter superhero name"
                  className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                  value={formData.nickname}
                  onChange={(e) =>
                    setFormData({ ...formData, nickname: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">
                  Superhero Real Name
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <UserCheck className="size-5" />
                </div>
                <input
                  type="text"
                  placeholder="Enter superhero real name"
                  className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                  value={formData.real_name}
                  onChange={(e) =>
                    setFormData({ ...formData, real_name: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">
                  Superhero Origin Description
                </span>
              </label>
              <div className="relative">
                <div className="absolute top-3 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <MessageSquareMore className="size-5" />
                </div>
                <textarea
                  placeholder="Enter superhero origin description"
                  className="textarea textarea-bordered w-full h-[100px] pl-10 focus:input-primary transition-colors duration-200"
                  value={formData.origin_description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      origin_description: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">
                  Superhero Superpowers
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <Siren className="size-5" />
                </div>
                <input
                  type="text"
                  placeholder="Enter superhero superpowers"
                  className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                  value={formData.superpowers}
                  onChange={(e) =>
                    setFormData({ ...formData, superpowers: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">
                  Superhero Catch Phrase
                </span>
              </label>
              <div className="relative">
                <div className="absolute top-3 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <Cloud className="size-5" />
                </div>
                <textarea
                  placeholder="Enter superhero catch phrase"
                  className="textarea textarea-bordered w-full h-[70px] pl-10 focus:input-primary transition-colors duration-200"
                  value={formData.catch_phrase}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      catch_phrase: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">
                  Superhero Images
                </span>
              </label>
              <div className="relative">
                <div className="absolute top-3 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <Image className="size-5" />
                </div>
                <input
                  type="file"
                  multiple
                  className="file-input file-input-bordered w-full pl-10 focus:input-primary transition-colors duration-200"
                  accept="image/*"
                  onChange={handleImagesChange}
                  ref={fileInputRef}
                />
              </div>
            </div>
          </div>

          <div className="modal-action flex justify-between">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                document.getElementById("edit_superhero_modal").close();
                resetFilePicker();
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary min-w-[120px]"
              disabled={
                !formData.nickname ||
                !formData.real_name ||
                !formData.origin_description ||
                !formData.superpowers ||
                !formData.catch_phrase ||
                loading
              }
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <>
                  <PlusCircleIcon className="size-5 mr-2" />
                  Edit
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default EditSuperheroModal;
