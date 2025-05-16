import React from "react";
import { Link } from "react-router-dom";
import { PlusCircleIcon, ShieldIcon } from "lucide-react";
import AddSuperheroModal from "./AddSuperheroModal";

const Navbar = () => {
  return (
    <div className="bg-base-100/80 backdrop-blur-lg border-b border-base-content/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="navbar px-4 min-h-[4rem] justify-between">
          {/* LOGO */}
          <div className="flex-1 lg:flex-none">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <div className="flex items-center gap-2">
                <ShieldIcon className="size-8 text-primary" />
                <span
                  className="font-semibold font-mono tracking-widest text-2xl 
                bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
                >
                  HEROBASE
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <button
              className="btn btn-primary"
              onClick={() =>
                document.getElementById("add_product_modal").showModal()
              }
            >
              <PlusCircleIcon className="size-5 mr-2" />
              Add Superhero
            </button>
            <AddSuperheroModal />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
