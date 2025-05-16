import React from "react";
import { Link } from "react-router-dom";
import { ShieldIcon } from "lucide-react";

const Navbar = () => {
  return (
    <div className="bg-white/70 backdrop-blur-md shadow-md text-gray-900 rounded-b-lg">
      <div className="max-w-7xl mx-auto">
        <div className="p-3 min-h-[4rem]">
          {/* LOGO */}
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <div className="flex items-center gap-2">
              <ShieldIcon className="size-8" />
              <span className="font-semibold font-mono tracking-widest text-2xl bg-clip-text text-transparent bg-gradient-to-r">
                HEROBASE
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
