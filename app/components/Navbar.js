"use client";
import Link from "next/link";
import React from "react";


const Navbar = () => {
  return (
    <>
      <nav className="py-2 lg:px-8 lg:py-4 bg-yellow-500 sticky top-0 z-50">
        <div className="flex justify-center gap-20 font-bold">
          <div className="bg-white lg:scale-[2.4] lg:translate-y-10 border-2  rounded-lg">
            <Link href="/">
              <img
                className="w-20 rounded-md"
                src="https://raw.githubusercontent.com/Syafar44/assets/main/assets/image/Desain%20Kitalulus%20PRG%20(2).jpg"
              />
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
