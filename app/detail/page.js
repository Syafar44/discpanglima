"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import domtoimage from "dom-to-image";
import { Card, CardBody, CardHeader } from "@material-tailwind/react";
import dynamic from "next/dynamic";
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

  useEffect(() => {
    if (searchParams) {
      try {
        const allResults = JSON.parse(
          decodeURIComponent(searchParams.get("allResults"))
        );
        setResults(allResults);
      } catch (e) {
        console.error("Error parsing query parameters", e);
      }
    }
  }, [searchParams]);

  const handleDownload = async () => {
    if (typeof window !== "undefined" && pageRef.current) {
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

  const chartConfig = {
    type: "bar",
    height: 400,
    series: [
      {
        name: "Nilai",
        data: [
          {
            x: "D",
            y: results.dominance,
            fillColor: "#b91c1c", // Merah
          },
          {
            x: "I",
            y: results.influence,
            fillColor: "#eab308", // Kuning
          },
          {
            x: "S",
            y: results.steadiness,
            fillColor: "#1d4ed8", // Biru
          },
          {
            x: "C",
            y: results.compliance,
            fillColor: "#15803d", // Hijau
          },
        ],
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        bar: {
          columnWidth: "40%",
          borderRadius: 2,
        },
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
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
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 40,
        },
      },
      fill: {
        opacity: 0.9,
      },
      tooltip: {
        theme: "dark",
      },
    },
  };

  return (
    <>
      <div ref={pageRef} className="bg-white">
        <Navbar />
        <div className="pt-5 text-center  2xl:mt-24 2xl:-mb-20 lg:flex justify-between lg:px-20 xl:px-32 2xl:block">
          <h1 className="font-bold sm:text-xl lg:text-2xl text-black">
            Detail Hasil Tes DISC
          </h1>
          <h1 className="font-extrabold text-xl lg:text-2xl pb-16 lg:pb-4 text-black">
            Panglima Roqiiqu Group
          </h1>
        </div>
        <div className="flex justify-center">
          <Card className="scale-[0.6] sm:scale-[1] lg:scale-[0.6] xl:scale-[0.8] 2xl:scale-100 -mt-20 lg:-mt-24 lg:-mb-32 xl:-mt-9 xl:mb-0 2xl:mt-20">
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
            ></CardHeader>
            <CardBody className="px-2 pb-0">
              <div className="flex justify-center">
                <div className="stats shadow bg-white mx-auto">
                  <div className="stat text-red-700 border-b">
                    <div className="stat-title font-semibold text-red-600">
                      Dominance
                    </div>
                    <div className="flex justify-center">
                      <div className="stat-value">{results.dominance}</div>
                    </div>
                  </div>
                  <div className="stat text-yellow-700 border-b">
                    <div className="stat-title text-yellow-800">Influence</div>
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
              <Chart {...chartConfig} />
            </CardBody>
          </Card>
        </div>
        <Footer />
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
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DetailPageContent />
    </Suspense>
  );
}
