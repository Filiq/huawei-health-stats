import { ChartBarIcon, HomeIcon, UsersIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { useRecoilValue } from "recoil";
import motionPathDataState from "../../../atoms/motionPathData";
import convertMsToTime from "../../../lib/convertMsToTime";
import calculatePace from "../../../lib/calculatePace";
import MotionPathMap from "../../../components/MotionPathMap";

export default function MotionPath() {
  const router = useRouter();
  const motionPathData = useRecoilValue(motionPathDataState);
  const [path, setPath] = useState(null);
  const [pathCoords, setPathCoords] = useState([]);
  const [stats, setStats] = useState([
    {
      name: "Total Steps",
      stat: "",
      icon: "",
    },
    {
      name: "Total Distance",
      stat: "",
      icon: "",
    },
    {
      name: "Total Calories",
      stat: "",
      icon: "",
    },
  ]);

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: HomeIcon, current: true },
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
      current: false,
    },
  ];

  function numberWithSpaces(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(".");
  }

  useEffect(() => {
    // console.log(router.query.id);

    let mapPoints =
      motionPathData[router.query.id].attribute.split("\ntp=lbs;");

    mapPoints[0] = mapPoints[0].replace("HW_EXT_TRACK_DETAIL@istp=lbs;", "");
    mapPoints[mapPoints.length - 1] = mapPoints[mapPoints.length - 1]
      .split(";")
      .map((item, index) => (index < 5 ? item + ";" : ""))
      .join("");

    mapPoints = mapPoints.map((item) =>
      item
        .split(";")
        .map((subItem) => {
          const [key, value] = subItem.split("=");

          return { [key]: value };
        })
        .filter((item) => (Object.keys(item) == "" ? false : true))
    );

    mapPoints = mapPoints.map((item) => {
      return {
        k: item[0].k,
        lat: item[1].lat,
        lon: item[2].lon,
        alt: item[3].alt,
        t: item[4].t,
      };
    });

    mapPoints[0].k === undefined && mapPoints.shift();

    Math.abs(
      mapPoints[mapPoints.length - 1].lat - mapPoints[mapPoints.length - 2].lat
    ) > 1 && mapPoints.pop();

    mapPoints = mapPoints.filter((item) => item.lon !== "-80.0");

    console.log(mapPoints);
    setPathCoords(mapPoints);
    setPath(motionPathData[router.query.id]);

    const statsArr = [];

    statsArr.push({
      name: "Total Steps",
      stat: numberWithSpaces(motionPathData[router.query.id].totalSteps),
      icon: "",
    });

    statsArr.push({
      name: "Total Distance",
      stat:
        numberWithSpaces(motionPathData[router.query.id].totalDistance / 1000) +
        " km",
      icon: "",
    });

    statsArr.push({
      name: "Total Calories",
      stat:
        numberWithSpaces(motionPathData[router.query.id].totalCalories / 1000) +
        " kcal",
      icon: "",
    });

    if (motionPathData[router.query.id].totalStoreys > 0) {
      statsArr.push({
        name: "Total Storeys",
        stat: numberWithSpaces(motionPathData[router.query.id].totalStoreys),
        icon: "",
      });
    }

    if (motionPathData[router.query.id].realSteps > 0) {
      statsArr.push({
        name: "Real Steps",
        stat: numberWithSpaces(motionPathData[router.query.id].realSteps),
        icon: "",
      });
    }

    if (motionPathData[router.query.id].realStoreys > 0) {
      statsArr.push({
        name: "Real Storeys",
        stat: numberWithSpaces(motionPathData[router.query.id].realStoreys),
        icon: "",
      });
    }

    statsArr.push({
      name: "Average Pace",
      stat:
        calculatePace(
          motionPathData[router.query.id].totalDistance / 1000,
          motionPathData[router.query.id].totalTime / 60000
        ).minutes +
        "'" +
        calculatePace(
          motionPathData[router.query.id].totalDistance / 1000,
          motionPathData[router.query.id].totalTime / 60000
        ).seconds +
        '"',
      icon: "",
    });

    setStats(statsArr);
  }, []);

  return (
    <DashboardLayout navigation={navigation}>
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold text-gray-900">Motion Path</h1>
        <p className="px-4 py-3 bg-white shadow rounded-lg overflow-hidden flex justify-between">
          Your{" "}
          {path?.sportType === 4
            ? "run"
            : path?.sportType === 5
            ? "walk"
            : "unknown (cycling probably)"}{" "}
          started at{" "}
          {(new Date(path?.startTime).getHours() < 10 ? "0" : "") +
            new Date(path?.startTime).getHours()}
          :
          {(new Date(path?.startTime).getMinutes() < 10 ? "0" : "") +
            new Date(path?.startTime).getMinutes()}
          :
          {(new Date(path?.startTime).getSeconds() < 10 ? "0" : "") +
            new Date(path?.startTime).getSeconds()}{" "}
          on {new Date(path?.startTime).getDate()}.{" "}
          {new Date(path?.startTime).getMonth() + 1}.{" "}
          {new Date(path?.startTime).getFullYear()} and ended at{" "}
          {(new Date(path?.endTime).getHours() < 10 ? "0" : "") +
            new Date(path?.endTime).getHours()}
          :
          {(new Date(path?.endTime).getMinutes() < 10 ? "0" : "") +
            new Date(path?.endTime).getMinutes()}
          :
          {(new Date(path?.endTime).getSeconds() < 10 ? "0" : "") +
            new Date(path?.endTime).getSeconds()}{" "}
          on {new Date(path?.endTime).getDate()}.{" "}
          {new Date(path?.endTime).getMonth() + 1}.{" "}
          {new Date(path?.endTime).getFullYear()}
          <span className="text-gray-600">Timezone: {path?.timeZone}</span>
        </p>
        <p className="px-4 py-3 bg-white shadow rounded-lg overflow-hidden">
          You{" "}
          {path?.sportType === 4
            ? "ran"
            : path?.sportType === 5
            ? "walked"
            : "unknown (cycled probably)"}{" "}
          for {convertMsToTime(path?.totalTime)}
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
                  {path?.deviceCode}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Record ID</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {path?.recordId}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Vendor</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {path?.vendor}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Version</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {path?.version}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
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
              </div>
            </dl>
          </div>
        </div>
        {/* motion map */}
        <MotionPathMap pathCoords={pathCoords} />
      </div>
    </DashboardLayout>
  );
}
