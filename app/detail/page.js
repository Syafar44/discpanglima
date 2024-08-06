"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import domtoimage from "dom-to-image";
import { useRef, useState, useEffect } from "react";

const personalityDetails = {
  Dominance: {
    description:
      "Orang dengan tipe kepribadian Dominance cenderung percaya diri, tegas, dan berorientasi pada hasil. Mereka suka mengendalikan situasi dan mengambil keputusan dengan cepat. Mereka tidak ragu untuk menantang status quo dan seringkali berusaha mencapai tujuan mereka dengan cara yang agresif.",
    subDes1:
      "Pemimpin yang menentukan arah dan strategi, Pengambil keputusan yang cepat dan tegas, Inisiator proyek dan pembawa perubahan",
    subDes2:
      "Cenderung terlalu dominan dan kurang sensitif terhadap perasaan orang lain, Kurang sabar dan sering kali mengabaikan detail, Bisa terlihat arogan dan tidak fleksibel",
    subDes3:
      "Takut kehilangan kendali, Takut terlihat lemah atau tidak kompeten.",
    imageUrl: "1.png",
  },
  Influence: {
    description:
      "Orang dengan tipe kepribadian Influence adalah komunikator yang hebat dan senang berinteraksi dengan orang lain. Mereka optimis, antusias, dan mampu memotivasi serta menginspirasi orang di sekitar mereka. Mereka sangat baik dalam membangun hubungan dan menciptakan suasana yang positif.",
    subDes1:
      "Motivator yang menginspirasi dan menyemangati tim, Jaringan yang kuat dan pembangun hubungan, Penyebar ide-ide baru dan inovatif",
    subDes2:
      "Kurang terorganisir dan cenderung tidak konsisten, Bisa terlalu emosional dan mudah teralihkan, Terkadang menghindari konflik dan cenderung tidak konfrontatif",
    subDes3:
      "Takut ditolak atau tidak disukai, Takut diabaikan atau tidak didengarkan.",
    imageUrl: "2.png",
  },
  Steadiness: {
    description:
      "Orang dengan tipe kepribadian Steadiness adalah pendukung yang dapat diandalkan dan setia. Mereka sabar, tenang, dan cenderung menghindari konflik. Mereka menghargai hubungan yang stabil dan lingkungan kerja yang harmonis. Mereka juga cenderung sangat perhatian terhadap kebutuhan orang lain.",
    subDes1:
      "Pendukung yang setia dan bisa diandalkan, Penjaga harmoni dan mediator konflik, Pemberi nasihat yang sabar dan empatik",
    subDes2:
      "Bisa terlalu pasif dan cenderung menghindari perubahan, Kurang asertif dan sulit mengambil keputusan cepat, Cenderung terlalu memprioritaskan kebutuhan orang lain di atas kebutuhan sendiri",
    subDes3:
      "Takut pada perubahan dan ketidakstabilan, Takut mengecewakan orang lain atau tidak memenuhi harapan.",
    imageUrl: "3.png",
  },
  Compliance: {
    description:
      "Orang dengan tipe kepribadian Compliance adalah pemikir analitis yang sangat memperhatikan detail. Mereka berhati-hati, teliti, dan cenderung mematuhi aturan dan prosedur. Mereka suka bekerja dengan data dan fakta, serta mengambil keputusan berdasarkan analisis yang mendalam.",
    subDes1:
      "Analis yang mendalam dan akurat, Penjaga standar dan kepatuhan terhadap aturan, Pemberi saran yang berbasis data dan fakta",
    subDes2:
      "Bisa terlalu kritis dan perfeksionis, Cenderung kaku dan kurang fleksibel, Kadang-kadang terlalu lambat dalam mengambil keputusan karena terlalu banyak menganalisis",
    subDes3:
      "Takut membuat kesalahan atau terlihat tidak kompeten, Takut menghadapi kritik atau evaluasi negatif.",
    imageUrl: "4.png",
  },
};

// Komponen DetailPage
const DetailPageContent = () => {
  const searchParams = useSearchParams();
  const pageRef = useRef(null);
  const [results, setResults] = useState({
    Dominance: 0,
    Influence: 0,
    Steadiness: 0,
    Compliance: 0,
  });

  useEffect(() => {
    if (searchParams) {
      try {
        const topTwo = JSON.parse(
          decodeURIComponent(searchParams.get("topTwo"))
        );
        const allResults = JSON.parse(
          decodeURIComponent(searchParams.get("allResults"))
        );
        setResults(allResults);
      } catch (e) {
        console.error("Error parsing query parameters", e);
      }
    }
  }, [searchParams]);

  const sortedResults = Object.entries(results).sort((a, b) => b[1] - a[1]);
  const topResults = sortedResults.slice(0, 2);

  const handleDownload = async () => {
    if (pageRef.current) {
      try {
        const dataUrl = await domtoimage.toPng(pageRef.current);
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "tes-disc.png";
        link.click();
      } catch (error) {
        console.error("Error generating screenshot", error);
      }
    }
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <>
      <div ref={pageRef} className="bg-white">
        <Navbar />
        <div className="lg:flex justify-between fixed -mt-2 lg:-right-10 lg:left-10 2xl:px-72 h-36 lg:h-32">
          <div className="hero-overlay blur-sm bg-white opacity-90 absolute -z-50"></div>
          <div className="pt-5 text-center lg:text-start -translate-x-16 lg:translate-x-0">
            <h1 className="font-bold lg:text-2xl text-black">
              Detail Hasil Tes DISC
            </h1>
            <h1 className="font-extrabold text-xl lg:text-3xl pb-16 lg:pb-4 text-black">
              Panglima Roqiiqu Group
            </h1>
          </div>
          <div className="stats scale-[0.5] lg:scale-[0.6] -translate-x-16 -translate-y-20 lg:translate-x-0 lg:translate-y-0 2xl:scale-75 shadow lg:mb-2 bg-white">
            <div className="stat text-red-700 border-b">
              <div className="stat-title font-semibold text-red-600">
                Dominance
              </div>
              <div className="flex justify-center">
                <div className="stat-value">{results.dominance}</div>
              </div>
            </div>
            <div className="stat text-yellow-500 border-b">
              <div className="stat-title text-yellow-400">Influence</div>
              <div className="flex justify-center">
                <div className="stat-value">{results.influence}</div>
              </div>
            </div>
            <div className="stat text-blue-700 border-b">
              <div className="stat-title text-blue-800">Steadiness</div>
              <div className="flex justify-center">
                <div className="stat-value">{results.steadiness}</div>
              </div>
            </div>
            <div className="stat text-green-700 border-b">
              <div className="stat-title text-green-800">Compliance</div>
              <div className="flex justify-center">
                <div className="stat-value">{results.compliance}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:px-10 pt-5 px-5 2xl:px-80 mt-28">
          {topResults.length > 0 ? (
            <ul>
              {topResults.map(([key]) => {
                const capitalizedKey = capitalizeFirstLetter(key);
                const detail = personalityDetails[capitalizedKey];
                return (
                  <li
                    key={key}
                    className="py-4 lg:flex border-4 border-yellow-500 p-2 mb-2 rounded-xl"
                  >
                    <img
                      src={detail.imageUrl}
                      alt={key}
                      className="w-full lg:w-1/4 mt-2"
                    />
                    <div className="text-hitam">
                      <h2 className="font-bold text-xl pl-2 lg:text-4xl py-5">
                        {capitalizedKey}
                      </h2>
                      <p className="pb-2">
                        <span className="font-bold">
                          Deskripsi Kepribadian :
                        </span>{" "}
                        {detail.description}
                      </p>
                      <p className="pb-2">
                        <span className="font-bold">
                          Peran dalam Kelompok:{" "}
                        </span>
                        {detail.subDes1}
                      </p>
                      <p className="pb-2">
                        <span className="font-bold">Kekurangan: </span>{" "}
                        {detail.subDes2}
                      </p>
                      <p>
                        <span className="font-bold">Ketakutan Terbesar: </span>
                        {detail.subDes3}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>Tidak ada data detail yang tersedia.</p>
          )}
        </div>
        <Footer />
      </div>
      <div className="fixed bottom-10 right-10">
        <button
          onClick={handleDownload}
          className="p-2 bg-yellow-500 font-bold rounded-xl mt-4 border-4 border-black text-black"
        >
          Download as image
        </button>
      </div>
    </>
  );
};

// Komponen DetailPage yang dibungkus dalam Suspense Boundary
export default function DetailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DetailPageContent />
    </Suspense>
  );
}
