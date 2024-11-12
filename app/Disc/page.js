"use client";
import { useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const DISC = () => {
  const questions = [
    {
      question: "1",
      options: [
        "Memberi semangat",
        "Petualang",
        "Teliti",
        "Mudah menyesuaikan diri",
      ],
    },
    {
      question: "2",
      options: [
        "Suka menggoda",
        "Berpendirian teguh",
        "Senang membujuk",
        "Suka kedamaian",
      ],
    },
    {
      question: "3",
      options: [
        "Pandai bergaul",
        "Berkemauan kuat",
        "Suka berkorban",
        "Suka mengalah",
      ],
    },
    {
      question: "4",
      options: [
        "Suka meyakinkan",
        "Suka bersaing",
        "Penuh pertimbangan",
        "Senang dibimbing",
      ],
    },
    {
      question: "5",
      options: [
        "Periang",
        "Dihormati/disegani",
        "Senang menangani problem",
        "Cenderung menahan diri",
      ],
    },
    {
      question: "6",
      options: ["Bersemangat", "Percaya diri", "Peka/perasa", "Cepat puas"],
    },
    {
      question: "7",
      options: [
        "Suka memuji/menyanjung",
        "Berpikir positif",
        "Perencana",
        "Sabar",
      ],
    },
    {
      question: "8",
      options: ["Spontan", "Praktis", "Ketat pada waktu", "Pemalu"],
    },
    {
      question: "9",
      options: [
        "Optimis",
        "Suka bicara, terus terang",
        "Rapi/teratur",
        "Sopan/hormat",
      ],
    },
    {
      question: "10",
      options: ["Suka senda gurau", "Tegar/kuat hati", "Jujur", "Ramah tamah"],
    },
    {
      question: "11",
      options: [
        "Menyukai kenikmatan",
        "Berani/tidak penakut",
        "Rinci/terperinci",
        "Diplomatis/berhati-hati",
      ],
    },
    {
      question: "12",
      options: [
        "Penggembira",
        "Percaya diri",
        "Berbudaya/terpelajar",
        "Konsisten/tidak mudah berubah",
      ],
    },
    {
      question: "13",
      options: [
        "Suka memberi ilham/inspirasi",
        "Mandiri",
        "Idealis",
        "Tidak suka menentang",
      ],
    },
    {
      question: "14",
      options: [
        "Lincah/suka membuka diri",
        "Mampu memutuskan",
        "Tekun/ulet",
        "Sedikit humor",
      ],
    },
    {
      question: "15",
      options: [
        "Mudah berbaur/bergaul",
        "Cepat bertindak",
        "Gemar musik, lembut",
        "Perantara/penengah",
      ],
    },
    {
      question: "16",
      options: [
        "Senang bicara",
        "Suka ngotot kuat bertahan",
        "Senang berfikir",
        "Bersikap toleran",
      ],
    },
    {
      question: "17",
      options: [
        "Lincah bersemangat",
        "Senang membimbing",
        "Pendengar yang baik",
        "Setia/tidak gampang berubah",
      ],
    },
    {
      question: "18",
      options: [
        "Lucu/humor",
        "Suka memimpin",
        "Berfikir matematis",
        "Mudah menerima saran",
      ],
    },
    {
      question: "19",
      options: [
        "Terkenal luas/populer",
        "Produktif/menghasilkan",
        "Perfeksionis",
        "Suka mengijinkan/memperbolehkan",
      ],
    },
    {
      question: "20",
      options: [
        "Bersemangat gembira",
        "Berani/tidak gampang takut",
        "Berkelakuan tenang/kalem",
        "Berpendirian tetap",
      ],
    },
  ];

  const [responses, setResponses] = useState(
    Array(questions.length).fill([0, 0, 0, 0])
  );
  const [unansweredIndex, setUnansweredIndex] = useState(null);
  const questionRefs = useRef([]);
  const router = useRouter();

  const handleInputChange = (index, optionIndex, value) => {
    const parsedValue = parseInt(value, 10);

    // Pastikan hanya menerima angka antara 1 dan 4
    if (isNaN(parsedValue) || parsedValue < 1 || parsedValue > 4) return;

    setResponses((prevResponses) => {
      const newResponses = prevResponses.map((response, i) => {
        if (i !== index) return response;

        // Perbarui nilai untuk pilihan yang diubah, set 0 jika sudah ada yang sama
        return response.map((val, idx) =>
          idx === optionIndex ? parsedValue : val === parsedValue ? 0 : val
        );
      });

      return newResponses;
    });
  };

  const calculateResults = () => {
    if (!Array.isArray(responses) || responses.length === 0) {
      console.error("Responses tidak valid atau kosong.");
      return null;
    }

    const totals = responses.reduce(
      (totals, response) => {
        if (
          Array.isArray(response) &&
          response.length === 4 &&
          response.every((item) => typeof item === "number")
        ) {
          totals.dominance += response[0];
          totals.influence += response[1];
          totals.steadiness += response[2];
          totals.compliance += response[3];
        } else {
          console.warn("Response tidak valid ditemukan:", response);
        }
        return totals;
      },
      { dominance: 0, influence: 0, steadiness: 0, compliance: 0 }
    );

    // Pastikan setidaknya ada nilai yang lebih dari 0
    return Object.values(totals).some((value) => value > 0) ? totals : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Cek jika responses kosong atau tidak valid
    if (!responses || responses.length === 0) {
      Swal.fire({
        title: "Error",
        text: "Tidak ada pertanyaan untuk dijawab.",
        icon: "error",
      });
      return;
    }

    // Temukan pertanyaan yang belum dijawab
    const unanswered = responses.findIndex((response) => response.includes(0));
    if (unanswered !== -1) {
      setUnansweredIndex(unanswered);
      questionRefs.current[unanswered]?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    try {
      const results = calculateResults();

      // Jika hasil kalkulasi null, berarti ada error
      if (!results) {
        Swal.fire({
          title: "Error",
          text: "Terjadi kesalahan dalam menghitung hasil. Silakan coba lagi.",
          icon: "error",
        });
        return;
      }
      // Pengalihan ke halaman hasil
      router.push(
        `/detail?allResults=${encodeURIComponent(JSON.stringify(results))}`
      );
    } catch (error) {
      console.error("Error dalam perhitungan hasil:", error);
      Swal.fire({
        title: "Error",
        text: "Terjadi kesalahan saat menghitung hasil. Silakan coba lagi.",
        icon: "error",
      });
    }
  };

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-5">
        <div className="py-5 px-5 md:py-20 md:px-10">
          <h1 className="font-bold text-xl">
            Aplikasi DISC ini akan menampilkan kolom yang berisi empat
            pernyataan. Anda diminta untuk memilih setiap pernyataan dengan
            memberikan angka dari 4 hingga 1, dengan penjelasan sebagai berikut:
          </h1>
          <ul className="list-disc font-semibold py-3 px-5">
            <li>Angka 4: Sangat sesuai dengan karakter diri Anda</li>
            <li>Angka 3: Sesuai dengan karakter diri Anda</li>
            <li>Angka 2: Tidak sesuai dengan karakter diri Anda</li>
            <li>Angka 1: Sangat tidak sesuai dengan karakter diri Anda</li>
          </ul>
          <p>
            Setiap pernyataan pada masing-masing kolom harus diisi dengan salah
            satu dari pilihan angka di atas.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {questions.map((q, index) => (
              <div
                key={index}
                ref={(el) => (questionRefs.current[index] = el)}
                className={`${
                  unansweredIndex === index ? "bg-red-400 rounded-xl" : ""
                }`}
              >
                <div className="border-4 p-4 rounded-xl shadow-xl">
                  <p className="font-bold">{q.question}.</p>
                  <div>
                    {q.options.map((option, optionIndex) => (
                      <label
                        key={optionIndex}
                        className="flex justify-between items-center pb-3"
                      >
                        {option}
                        <select
                          aria-label={`Pilih skor untuk opsi ${option} pada pertanyaan ${
                            index + 1
                          }`}
                          value={responses[index][optionIndex]}
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              optionIndex,
                              e.target.value
                            )
                          }
                          className="select select-bordered"
                        >
                          {[0, 4, 3, 2, 1].map((num) => (
                            <option
                              key={num}
                              value={num}
                              disabled={
                                num > 0 && responses[index].includes(num)
                              }
                            >
                              {num === 0 ? "Pilih" : num}
                            </option>
                          ))}
                        </select>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end pt-5 col-span-3">
            <button type="submit" className="btn bg-yellow-700 text-black">
              Selesaikan
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default DISC;
