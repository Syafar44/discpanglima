import Link from "next/link";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <>
    <Navbar />
      <div className="flex justify-center w-full mt-10 lg:mt-16 xl:mt-32 2xl:mt-52 2xl:mb-64 2xl:px-96">
        <div className="px-5">
          <h1 className="text-center text-6xl text-red-700 font-extrabold ">
            TES DISC
          </h1>
          <p className="py-3 font-semibold text-center lg:text-xl">
            Aplikasi akan menampilkan serangkaian pertanyaan, masing-masing
            dengan empat pilihan jawaban. Baca setiap pertanyaan dengan cermat
            dan pilih satu nilai yang paling sesuai dengan diri Anda untuk
            setiap pilihan jawaban.
          </p>
          <div className="flex justify-center mb-2 2xl:mb-7">
            <Link href="/Disc">
              <button className="btn bg-red-700 text-white">Mulai Tes</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
