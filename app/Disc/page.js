"use client";
import { useRef, useState } from "react";

const questions = [
  {
    question: "1",
    options: ["Memberi semangat", "Petualang", "Teliti", "Mudah menyesuaikan diri"]
  },
  {
    question: "2",
    options: ["Suka menggoda", "Berpendirian teguh", "Senang membujuk", "Suka kedamaian"]
  },
  {
    question: "3",
    options: ["Pandai bergaul", "Berkemauan kuat", "Suka berkorban", "Suka mengalah"]
  },
  {
    question: "4",
    options: ["Suka meyakinkan", "Suka bersaing", "Penuh pertimbangan", "Senang dibimbing"]
  },
  {
    question: "5",
    options: ["Periang", "Dihormati/disegani", "Senang menangani problem", "Cenderung menahan diri"]
  },
  {
    question: "6",
    options: ["Bersemangat", "Percaya diri", "Peka/perasa", "Cepat puas"]
  },
  {
    question: "7",
    options: ["Suka memuji/menyanjung", "Berpikir positif", "Perencana", "Sabar"]
  },
  {
    question: "8",
    options: ["Spontan", "Praktis", "Ketat pada waktu", "Pemalu"]
  },
  {
    question: "9",
    options: ["Optimis", "Suka bicara, terus terang", "Rapi/teratur", "Sopan/hormat"]
  },
  {
    question: "10",
    options: ["Suka senda gurau", "Tegar/kuat hati", "Jujur", "Ramah tamah"]
  },
  {
    question: "11",
    options: ["Menyukai kenikmatan", "Berani/tidak penakut", "Rinci/terperinci", "Diplomatis/berhati-hati"]
  },
  {
    question: "12",
    options: ["Penggembira", "Percaya diri", "Berbudaya/terpelajar", "Konsisten/tidak mudah berubah"]
  },
  {
    question: "13",
    options: ["Suka memberi ilham/inspirasi", "Mandiri", "Idealis", "Tidak suka menentang"]
  },
  {
    question: "14",
    options: ["Lincah/suka membuka diri", "Mampu memutuskan", "Tekun/ulet", "Sedikit humor"]
  },
  {
    question: "15",
    options: ["Mudah berbaur/bergaul", "Cepat bertindak", "Gemar musik, lembut", "Perantara/penengah"]
  },
  {
    question: "16",
    options: ["Senang bicara", "Suka ngotot kuat bertahan", "Senang berfikir", "Bersikap toleran"]
  },
  {
    question: "17",
    options: ["Lincah bersemangat", "Senang membimbing", "Pendengar yang baik", "Setia/tidak gampang berubah"]
  },
  {
    question: "18",
    options: ["Lucu/humor", "Suka memimpin", "Berfikir matematis", "Mudah menerima saran"]
  },
  {
    question: "19",
    options: ["Terkenal luas/populer", "Produktif/menghasilkan", "Perfeksionis", "Suka mengijinkan/memperbolehkan"]
  },
  {
    question: "20",
    options: ["Bersemangat gembira", "Berani/tidak gampang takut", "Berkelakuan tenang/kalem", "Berpendirian tetap"]
  }
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
      submission = 0,
      compliance = 0;

    responses.forEach((response) => {
      dominance += response[1];
      influence += response[0];
      submission += response[3];
      compliance += response[2];
    });

    return { dominance, influence, submission, compliance };
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
    <div className="flex justify-center p-4">
      <form onSubmit={handleSubmit}>
        {questions.map((q, index) => (
          <div
            key={index}
            ref={(el) => (questionRefs.current[index] = el)}
            className={`mb-4 p-5 ${unansweredIndex === index ? "bg-red-300" : ""}`}
          >
            <p className="font-bold">{q.question} isi sesuai dengan format 4(sangat benar), 3(benar), 2(salah) dan 1(sangat salah)</p>
            {q.options.map((option, optionIndex) => (
              <label key={optionIndex} className="flex justify-between items-center pb-3">
                {option}
                <select
                  value={responses[index][optionIndex]}
                  onChange={(e) =>
                    handleInputChange(index, optionIndex, e.target.value)
                  }
                  className="select select-bordered"
                >
                  <option value="0">Pilih</option>
                  {[1, 2, 3, 4].map((num) => (
                    <option
                      key={num}
                      value={num}
                      disabled={responses[index].includes(num)}
                    >
                      {num}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>
        ))}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Hasil Tes DISC</h3>
            {results && (
              <div>
                <p>Dominance: {results.dominance}</p>
                <p>Influence: {results.influence}</p>
                <p>Submission: {results.submission}</p>
                <p>Compliance: {results.compliance}</p>
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
  );
};

export default DISC;
