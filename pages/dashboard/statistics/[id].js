import { ChartBarIcon, HomeIcon, UsersIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
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
import { Bar } from "react-chartjs-2";
import sportPerMinuteState from "../../../atoms/sportPerMinute";

export default function MotionPath() {
  const router = useRouter();
  const sportPerMinute = useRecoilValue(sportPerMinuteState);
  const [day, setDay] = useState(null);
  const [stepsArr, setStepsArr] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);

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
    setDay({
      ...sportPerMinute[router.query.id],
      sportDataUserData: [
        ...sportPerMinute[router.query.id].sportDataUserData,
      ].sort((a, b) => a.startTime - b.startTime),
    });

    const steps = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];

    [...sportPerMinute[router.query.id].sportDataUserData]
      .sort((a, b) => a.startTime - b.startTime)
      .forEach((item) => {
        steps[new Date(item.startTime).getHours()] +=
          item.sportBasicInfos[0].steps;
      });

    setStepsArr(steps);
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
        position: "top",
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Steps",
        data: stepsArr,
        backgroundColor: "rgba(0, 109, 243, 0.8)",
      },
    ],
  };

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
        {/* graph */}
        <Bar data={data} options={options} />
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
                  Device Code
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {day?.sportDataUserData[0].deviceCode}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Version</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {day?.version}
                </dd>
              </div>
              {/* <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Abnormal Track
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {path?.abnormalTrack === 0
                    ? "Valid track"
                    : path?.abnormalTrack === 1
                    ? "Track with abnormal pace"
                    : path?.abnormalTrack === 2
                    ? "Track with abnormal distance"
                    : path?.abnormalTrack === 3
                    ? "Track with abnormal time"
                    : path?.abnormalTrack === 4
                    ? "Track with abnormal steps"
                    : path?.abnormalTrack === 100
                    ? "Other abnormal tracks"
                    : "Unknown"}{" "}
                  ({path?.abnormalTrack})
                </dd>
              </div> */}
            </dl>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
