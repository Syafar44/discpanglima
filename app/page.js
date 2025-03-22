"use client"
import Link from "next/link";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import { Button } from "@material-tailwind/react";

export default function Home() {
  useEffect(() => {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");

    const style = document.createElement("style");
    style.innerHTML = `@media (prefers-color-scheme: dark) { 
      body { background-color: white !important; color: black !important; } 
    }`;
    document.head.appendChild(style);
  }, []);
  return (
    <>
    <Navbar />
      <div className="flex justify-center w-full mt-40 lg:mt-16 xl:mt-32 2xl:mt-52 2xl:px-96 h-screen">
        <div className="px-5">
          <h1 className="text-center text-6xl text-yellow-700 font-extrabold ">
            TES DISC
          </h1>
          <p className="py-3 font-semibold text-justify lg:text-xl">
            Aplikasi akan menampilkan serangkaian pernyataan, masing-masing
            dengan empat pilihan jawaban. Baca setiap pertanyaan dengan cermat
            dan pilih satu nilai yang paling sesuai dengan diri Anda untuk
            setiap pilihan jawaban.
          </p>
          <div className="flex justify-center mb-2 2xl:mb-7">
            <Link href="/Disc">
              <button className="btn bg-yellow-700 text-black">Mulai Tes</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
