"use client";

import { useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useRouter } from "next/navigation";

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

const DISC = () => {
  const [responses, setResponses] = useState(
    Array(questions.length).fill([0, 0, 0, 0])
  );
  const [results, setResults] = useState(null);
  const [unansweredIndex, setUnansweredIndex] = useState(null);
  const questionRefs = useRef([]);
  const router = useRouter();

  const handleInputChange = (index, optionIndex, value) => {
    const newResponses = [...responses];
    const currentValue = newResponses[index][optionIndex];

    newResponses[index] = newResponses[index].map((val, i) =>
      val === parseInt(value) ? 0 : val
    );

    newResponses[index][optionIndex] = parseInt(value);
    setResponses(newResponses);
  };

  const calculateResults = () => {
    let dominance = 0,
      influence = 0,
      steadiness = 0,
      compliance = 0;

    responses.forEach((response) => {
      dominance += response[1];
      influence += response[0];
      steadiness += response[3];
      compliance += response[2];
    });

    return { dominance, influence, steadiness, compliance };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    for (let i = 0; i < responses.length; i++) {
      if (responses[i].includes(0)) {
        setUnansweredIndex(i);
        questionRefs.current[i].scrollIntoView({ behavior: "smooth" });
        return;
      }
    }

    const results = calculateResults();
    const sortedResults = Object.entries(results).sort((a, b) => b[1] - a[1]);
    const topTwo = sortedResults.slice(0, 2);
    router.push(
      `/detail?topTwo=${encodeURIComponent(
        JSON.stringify(topTwo)
      )}&allResults=${encodeURIComponent(JSON.stringify(results))}`
    );
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center p-5 lg:mt-12">
        <div className="text-wrap lg:px-52 2xl:px-96">
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
      </div>
      <div className="flex justify-center p-4">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-2 gap-5"
        >
          {questions.map((q, index) => (
            <div
              key={index}
              ref={(el) => (questionRefs.current[index] = el)}
              className={`${
                unansweredIndex === index ? "bg-red-400 rounded-xl" : ""
              }`}
            >
              <div className="flex gap-2 border-4 p-4 border-black rounded-xl">
                <p className="font-bold">{q.question}.</p>
                <div className="w-full">
                  {q.options.map((option, optionIndex) => (
                    <label
                      key={optionIndex}
                      className="flex justify-between items-center pb-3"
                    >
                      {option}
                      <select
                        value={responses[index][optionIndex]}
                        onChange={(e) =>
                          handleInputChange(index, optionIndex, e.target.value)
                        }
                        className="select select-bordered"
                      >
                        <option value="0">Pilih</option>
                        <option
                          value="4"
                          disabled={responses[index].includes(4)}
                        >
                          4
                        </option>
                        <option
                          value="3"
                          disabled={responses[index].includes(3)}
                        >
                          3
                        </option>
                        <option
                          value="2"
                          disabled={responses[index].includes(2)}
                        >
                          2
                        </option>
                        <option
                          value="1"
                          disabled={responses[index].includes(1)}
                        >
                          1
                        </option>
                      </select>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <div className="lg:col-span-2 justify-end flex px-4">
            <button type="submit" className="btn bg-yellow-500">
              Submit
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default DISC;
