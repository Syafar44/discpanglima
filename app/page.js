import Link from "next/link";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <>
    <Navbar />
      <div className="flex justify-center w-full mt-40 lg:mt-16 xl:mt-32 2xl:mt-52 2xl:mb-64 2xl:px-96">
        <div className="px-5">
          <h1 className="text-center text-6xl text-yellow-500 font-extrabold ">
            TES DISC
          </h1>
          <p className="py-3 font-semibold text-center lg:text-xl">
            Aplikasi akan menampilkan serangkaian pernyataan, masing-masing
            dengan empat pilihan jawaban. Baca setiap pertanyaan dengan cermat
            dan pilih satu nilai yang paling sesuai dengan diri Anda untuk
            setiap pilihan jawaban.
          </p>
          <div className="flex justify-center mb-2 2xl:mb-7">
            <Link href="/Disc">
              <button className="btn bg-yellow-500">Mulai Tes</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
