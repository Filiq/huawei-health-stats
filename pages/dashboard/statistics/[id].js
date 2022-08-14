import { ChartBarIcon, HomeIcon, UsersIcon } from "@heroicons/react/outline";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { useRecoilValue } from "recoil";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, getElementsAtEvent } from "react-chartjs-2";
import sportPerMinuteState from "../../../atoms/sportPerMinute";
import DayDetailsModal from "../../../components/DayDetailsModal";
import numberWithSpaces from "../../../lib/numberWithSpaces";

export default function MotionPath() {
  const router = useRouter();
  const sportPerMinute = useRecoilValue(sportPerMinuteState);
  const [day, setDay] = useState(null);
  const [deviceCodes, setDeviceCodes] = useState([]);
  const [versions, setVersions] = useState([]);
  const [chartData, setChartData] = useState({
    steps: [],
    distance: [],
    calories: [],
  });
  const [detailsData, setDetailsData] = useState([[]]);
  const [detailData, setDetailData] = useState([]);
  const [openDetails, setOpenDetails] = useState(false);
  const [stats, setStats] = useState([]);

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: HomeIcon, current: false },
    {
      name: "Motion Paths",
      href: "/dashboard/motion-paths",
      icon: UsersIcon,
      current: false,
    },
    {
      name: "Statistics",
      href: "/dashboard/statistics",
      icon: ChartBarIcon,
      current: true,
    },
  ];

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  useEffect(() => {
    if (sportPerMinute.length === 0) {
      router.push("/dashboard");
      return;
    }

    console.log(sportPerMinute);

    setDay({
      ...sportPerMinute[router.query.id],
      sportDataUserData: [
        ...sportPerMinute[router.query.id].sportDataUserData,
      ].sort((a, b) => a.startTime - b.startTime),
    });

    const steps = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];

    const distance = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];

    const calories = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];

    const deviceCodesArr = [];
    const versionsArr = [];
    const detailDataArr = [
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
    ];

    [...sportPerMinute[router.query.id].sportDataUserData]
      .sort((a, b) => a.startTime - b.startTime)
      .forEach((item) => {
        steps[new Date(item.startTime).getHours()] +=
          item.sportBasicInfos[0].steps;
        distance[new Date(item.startTime).getHours()] +=
          item.sportBasicInfos[0].distance / 1000;
        calories[new Date(item.startTime).getHours()] +=
          item.sportBasicInfos[0].calorie / 1000;

        detailDataArr[new Date(item.startTime).getHours()].push(item);

        if (deviceCodesArr.indexOf(item.deviceCode) === -1) {
          deviceCodesArr.push(item.deviceCode);
        }

        if (versionsArr.indexOf(item.version) === -1) {
          versionsArr.push(item.version);
        }
      });

    const statsArr = [];

    statsArr.push({
      name: "Total Steps",
      stat: numberWithSpaces(sportPerMinute[router.query.id].totalSteps),
      icon: "",
    });

    statsArr.push({
      name: "Total Distance",
      stat:
        numberWithSpaces(sportPerMinute[router.query.id].totalDistance / 1000) +
        " km",
      icon: "",
    });

    statsArr.push({
      name: "Total Calories",
      stat:
        numberWithSpaces(sportPerMinute[router.query.id].totalCalories / 1000) +
        " kcal",
      icon: "",
    });

    if (sportPerMinute[router.query.id].totalFloors > 0) {
      statsArr.push({
        name: "Total Floors",
        stat: numberWithSpaces(sportPerMinute[router.query.id].totalFloors),
        icon: "",
      });
    }

    setChartData({ steps, distance, calories });
    setDeviceCodes(deviceCodesArr);
    setVersions(versionsArr);
    setDetailsData(detailDataArr);
    setStats(statsArr);
  }, []);

  const labels = [
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
    "24:00",
  ];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const stepsChartRef = useRef(null);
  const distanceChartRef = useRef(null);
  const caloriesChartRef = useRef(null);

  function handleChart(e, type) {
    let index;

    if (type === "steps") {
      const elements = getElementsAtEvent(stepsChartRef.current, e);

      if (elements.length === 0) return;

      index = elements[0].index;
    }

    if (type === "distance") {
      const elements = getElementsAtEvent(distanceChartRef.current, e);

      if (elements.length === 0) return;

      index = elements[0].index;
    }

    if (type === "calories") {
      const elements = getElementsAtEvent(caloriesChartRef.current, e);

      if (elements.length === 0) return;

      index = elements[0].index;
    }

    setDetailData(detailsData[index]);
    setOpenDetails(true);
  }

  return (
    <DashboardLayout navigation={navigation}>
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold text-gray-900">Day Statistics</h1>
        <p className="px-4 py-3 bg-white shadow rounded-lg overflow-hidden flex justify-between">
          You started moving at{" "}
          {(new Date(day?.sportDataUserData?.[0]?.startTime).getHours() < 10
            ? "0"
            : "") + new Date(day?.sportDataUserData?.[0]?.startTime).getHours()}
          :
          {(new Date(day?.sportDataUserData?.[0]?.startTime).getMinutes() < 10
            ? "0"
            : "") +
            new Date(day?.sportDataUserData?.[0]?.startTime).getMinutes()}
          :
          {(new Date(day?.sportDataUserData?.[0]?.startTime).getSeconds() < 10
            ? "0"
            : "") +
            new Date(day?.sportDataUserData?.[0]?.startTime).getSeconds()}{" "}
          on {parseInt(day?.recordDay.toString().slice(6))}.{" "}
          {parseInt(day?.recordDay.toString().slice(4, 6))}.{" "}
          {day?.recordDay.toString().slice(0, 4)}
          <span className="text-gray-600">Timezone: {day?.timeZone}</span>
        </p>
        {/* stats */}
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {stats.map((item) => (
            <div
              key={item.name}
              className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6"
            >
              <dt className="text-sm font-medium text-gray-500 truncate">
                {item.name}
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {item.stat}
              </dd>
            </div>
          ))}
        </dl>
        {/* graph */}
        <h2 className="font-semibold text-2xl">Steps</h2>
        <Bar
          data={{
            labels,
            datasets: [
              {
                label: "Steps",
                data: chartData.steps,
                backgroundColor: "rgba(0, 109, 243, 0.8)",
              },
            ],
          }}
          options={options}
          ref={stepsChartRef}
          onClick={(e) => handleChart(e, "steps")}
        />
        <h2 className="font-semibold text-2xl">Distance (km)</h2>
        <Bar
          data={{
            labels,
            datasets: [
              {
                label: "Distance (km)",
                data: chartData.distance,
                backgroundColor: "rgba(243, 156, 18, 0.8)",
              },
            ],
          }}
          options={options}
          ref={distanceChartRef}
          onClick={(e) => handleChart(e, "distance")}
        />
        <h2 className="font-semibold text-2xl">Calories (kcal)</h2>
        <Bar
          data={{
            labels,
            datasets: [
              {
                label: "Calories (kcal)",
                data: chartData.calories,
                backgroundColor: "rgba(1, 152, 117, 0.8)",
              },
            ],
          }}
          options={options}
          ref={caloriesChartRef}
          onClick={(e) => handleChart(e, "calories")}
        />
        {/* list */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Additional Information
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Not so important information
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Device Code{deviceCodes.length > 1 ? "s" : ""}
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {deviceCodes.join(", ")}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Version{versions.length > 1 ? "s" : ""}
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {versions.join(", ")}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <DayDetailsModal
        details={detailData}
        open={openDetails}
        setOpen={setOpenDetails}
      />
    </DashboardLayout>
  );
}
