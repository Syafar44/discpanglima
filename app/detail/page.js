"use client";
import {
  Suspense,
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import domtoimage from "dom-to-image";
import { Card, CardBody } from "@material-tailwind/react";
import Swal from "sweetalert2";

const Navbar = dynamic(() => import("../components/Navbar"), { ssr: false });
const Footer = dynamic(() => import("../components/Footer"), { ssr: false });
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const DetailPageContent = () => {
  const searchParams = useSearchParams();
  const pageRef = useRef(null);

  const [results, setResults] = useState({
    dominance: 0,
    influence: 0,
    steadiness: 0,
    compliance: 0,
  });

  const validateResults = (parsedResults) => ({
    dominance: isNaN(Number(parsedResults.dominance))
      ? 0
      : Math.min(Math.max(Number(parsedResults.dominance), 0), 100),
    influence: isNaN(Number(parsedResults.influence))
      ? 0
      : Math.min(Math.max(Number(parsedResults.influence), 0), 100),
    steadiness: isNaN(Number(parsedResults.steadiness))
      ? 0
      : Math.min(Math.max(Number(parsedResults.steadiness), 0), 100),
    compliance: isNaN(Number(parsedResults.compliance))
      ? 0
      : Math.min(Math.max(Number(parsedResults.compliance), 0), 100),
  });

  useEffect(() => {
    if (searchParams) {
      const allResults = searchParams.get("allResults");
      if (allResults) {
        try {
          const parsedResults = JSON.parse(decodeURIComponent(allResults));
          setResults(validateResults(parsedResults));
        } catch (e) {
          console.error("Error parsing query parameters", e);
          Swal.fire({
            icon: "error",
            title: "Parsing Error",
            text: "Terdapat kesalahan dalam parsing parameter URL.",
          });
        }
      } else {
        Swal.fire({
          icon: "warning",
          title: "Missing Parameters",
          text: 'Parameter "allResults" tidak ditemukan dalam URL.',
        });
      }
    }
  }, [searchParams]);

  const handleDownload = useCallback(async () => {
    if (pageRef.current) {
      try {
        Swal.fire({
          icon: "success",
          title: "Download Sukses",
          text: "Gambar telah diunduh.",
        });
        const dataUrl = await domtoimage.toPng(pageRef.current);
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "tes-disc.png";
        link.click();
      } catch (error) {
        console.error("Error generating screenshot", error);
        Swal.fire({
          icon: "error",
          title: "Download Error",
          text: "Terjadi kesalahan saat mencoba mengunduh gambar.",
        });
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "No Content",
        text: "Tidak ada konten untuk diunduh.",
      });
    }
  }, []);

  const chartConfig = useMemo(
    () => ({
      type: "bar",
      height: 400,
      series: [
        {
          name: "Nilai",
          data: [
            { x: "D", y: results.dominance, fillColor: "#b91c1c" },
            { x: "I", y: results.influence, fillColor: "#eab308" },
            { x: "S", y: results.steadiness, fillColor: "#1d4ed8" },
            { x: "C", y: results.compliance, fillColor: "#15803d" },
          ],
        },
      ],
      options: {
        chart: { toolbar: { show: false } },
        title: { show: false },
        dataLabels: { enabled: false },
        plotOptions: {
          bar: { columnWidth: "40%", borderRadius: 2 },
        },
        xaxis: {
          axisTicks: { show: false },
          axisBorder: { show: false },
          labels: {
            style: {
              colors: "#616161",
              fontSize: "15px",
              fontFamily: "inherit",
              fontWeight: 800,
            },
          },
        },
        yaxis: {
          labels: {
            style: {
              colors: "#616161",
              fontSize: "12px",
              fontFamily: "inherit",
              fontWeight: 400,
            },
          },
        },
        grid: {
          show: true,
          borderColor: "#dddddd",
          strokeDashArray: 5,
          xaxis: { lines: { show: true } },
          padding: { top: 5, right: 40 },
        },
        fill: { opacity: 0.9 },
        tooltip: { theme: "dark" },
      },
    }),
    [results]
  );

  const colorMap = {
    dominance: { text: "text-red-700", title: "text-red-800" },
    influence: { text: "text-yellow-700", title: "text-yellow-800" },
    steadiness: { text: "text-blue-700", title: "text-blue-800" },
    compliance: { text: "text-green-700", title: "text-green-800" },
  };

  return (
    <>
      <div ref={pageRef} className="bg-white">
        <div className="pt-5 text-center 2xl:mt-24 2xl:-mb-20 lg:flex justify-between lg:px-20 xl:px-32 2xl:block">
          <h1 className="font-bold sm:text-xl lg:text-2xl text-black">
            Detail Hasil Tes DISC
          </h1>
          <h1 className="font-extrabold text-xl lg:text-2xl pb-16 lg:pb-4 text-black">
            Panglima Roqiiqu Group
          </h1>
        </div>
        <div className="flex justify-center">
          <Card className="scale-[0.6] sm:scale-[1] lg:scale-[0.6] xl:scale-[0.8] 2xl:scale-100 -mt-20 lg:-mt-24 lg:-mb-32 xl:-mt-9 xl:mb-0 2xl:mt-20">
            <CardBody className="px-2 pb-0">
              <div className="flex justify-center">
                <div className="stats shadow bg-white mx-auto">
                  {/* Pengulangan untuk menghindari duplikasi */}
                  {Object.entries(results).map(([key, value], idx) => (
                    <div
                      key={idx}
                      className={`stat ${
                        colorMap[key]?.text || "text-gray-700"
                      } border-b`}
                    >
                      <div
                        className={`stat-title ${
                          colorMap[key]?.title || "text-gray-800"
                        }`}
                      >
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </div>
                      <div className="flex justify-center">
                        <div className="stat-value">{value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Chart {...chartConfig} />
            </CardBody>
          </Card>
        </div>
      </div>
      <div className="fixed bottom-10 right-10">
        <button
          onClick={handleDownload}
          className="p-2 bg-yellow-700 font-bold rounded-xl mt-4 border-4 border-black text-black dark:text-black"
        >
          Download as image
        </button>
      </div>
    </>
  );
};

export default function DetailPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mengatur loading selesai setelah DetailPageContent sepenuhnya dimuat
    const handleLoad = () => setIsLoading(false);

    // Simulasi waktu loading atau tunggu render sepenuhnya
    const timeout = setTimeout(handleLoad, 1000); // Sesuaikan waktu delay jika perlu

    return () => clearTimeout(timeout); // Bersihkan jika komponen di-unmount
  }, []);

  return (
    <>
      <Navbar />
      {isLoading ? (
        <div className="flex flex-col justify-center items-center h-svh">
          <img src="loading.gif" alt="Loading..." />
          <p>Tunggu sebentar...</p>
          <p>Data sedang di muat</p>
        </div> // Tampilkan loading indikator jika isLoading masih true
      ) : (
        <Suspense fallback={<div>Loading.....</div>}>
          <DetailPageContent />
        </Suspense>
      )}
      <Footer />
    </>
  );
}
