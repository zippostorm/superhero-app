import { Package2Icon } from "lucide-react";
import React, { useState } from "react";

const AddSuperheroModal = () => {
  const [formData, setFormData] = useState({});
  return (
    <dialog id="add_product_modal" className="modal">
      <div className="modal-box">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => document.getElementById("add_product_modal").close()}
        >
          X
        </button>

        <h3 className="font-bold text-xl mb-8">Add New Superhero</h3>

        <form className="space-y-6">
          <div className="grid gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">
                  Superhero Name
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <Package2Icon className="size-5" />
                </div>
                <input
                  type="text"
                  placeholder="Enter superhero name"
                  className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, nickname: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default AddSuperheroModal;
