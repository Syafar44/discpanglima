"use client";
import { useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
      "Suka mengijinkan /memperbolehkan",
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [unansweredIndex, setUnansweredIndex] = useState(null);
  const questionRefs = useRef([]);

  const handleInputChange = (index, optionIndex, value) => {
    const newResponses = [...responses];
    const currentValue = newResponses[index][optionIndex];

    // Hapus nilai yang dipilih sebelumnya
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
    setResults(results);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setResponses(Array(questions.length).fill([0, 0, 0, 0]));
    setUnansweredIndex(null);
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center p-5">
        <div className="text-wrap p-5 lg:px-52">
          <h1 className="font-bold text-center text-xl">
            Beri nilai untuk setiap pilihan sesuai dengan tingkat kebenarannya
            bagi Anda
          </h1>
          <p className="text-center mb-4">
            SB (Sangat Benar), B(Benar), TB(Tidak Benar), STB(Sangat Tidak
            Benar)
          </p>
          <h1 className="font-bold text-center text-xl">
            Apa Itu SB, B, TB, STB?
          </h1>

          <ul className="list-disc font-semibold">
            <li>
              SB (Sangat Benar): Pernyataan sangat mencerminkan diri Anda.
            </li>
            <li>B (Benar): Pernyataan benar mencerminkan diri Anda.</li>
            <li>TB (Tidak Benar): Pernyataan tidak mencerminkan diri Anda.</li>
            <li>
              STB (Sangat Tidak Benar): Pernyataan sangat tidak mencerminkan
              diri Anda.
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-center p-4">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-2"
        >
          {questions.map((q, index) => (
            <div
              key={index}
              ref={(el) => (questionRefs.current[index] = el)}
              className={` p-5${unansweredIndex === index ? "bg-red-300" : ""}`}
            >
              <div className="flex gap-4 border-4 p-4 border-black rounded-xl">
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
                          SB
                        </option>
                        <option
                          value="3"
                          disabled={responses[index].includes(3)}
                        >
                          B
                        </option>
                        <option
                          value="2"
                          disabled={responses[index].includes(2)}
                        >
                          TB
                        </option>
                        <option
                          value="1"
                          disabled={responses[index].includes(1)}
                        >
                          STB
                        </option>
                      </select>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <div className="lg:col-span-2 justify-end flex px-4">
            <button type="submit" className="btn bg-red-700 text-white">
              Submit
            </button>
          </div>
        </form>

        {isModalOpen && (
          <div className="modal modal-open">
            <div className="modal-box lg:w-2/3 lg:max-w-2xl">
              <h3 className="font-bold text-lg text-center">
                Hasil Tes DISC Panglima Roqiiqu Group
              </h3>
              {results && (
                <div className="lg:stats shadow w-full">
                  <div className="stat text-red-700 border-b">
                    <div className="stat-title font-semibold text-red-600">Dominance</div>
                    <div className="stat-value">{results.dominance}</div>
                  </div>
                  <div className="stat text-yellow-500 border-b">
                    <div className="stat-title text-yellow-400">Influence</div>
                    <div className="stat-value">{results.influence}</div>
                  </div>
                  <div className="stat text-blue-700 border-b">
                    <div className="stat-title text-blue-800">Steadiness</div>
                    <div className="stat-value">{results.steadiness}</div>
                  </div>
                  <div className="stat text-green-700 border-b">
                    <div className="stat-title text-green-800">Compliance</div>
                    <div className="stat-value">{results.compliance}</div>
                  </div>
                </div>
              )}
              <div className="modal-action">
                <button onClick={handleCloseModal} className="btn">
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default DISC;
