import { ChartBarIcon, HomeIcon, UsersIcon } from "@heroicons/react/outline";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import fileNamesState from "../../atoms/fileNames";
import motionPathDataState from "../../atoms/motionPathData";
import sportPerMinuteState from "../../atoms/sportPerMinute";
import uploadedFileState from "../../atoms/uploadedFile";
import UploadDropZone from "../../components/UploadDropZone";
import DashboardLayout from "../../layouts/DashboardLayout";

export default function Dashboard() {
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

  const file = useRecoilValue(uploadedFileState);

  const [motionPathData, setMotionPathData] =
    useRecoilState(motionPathDataState);
  const [sportPerMinute, setSportPerMinute] =
    useRecoilState(sportPerMinuteState);
  const [fileNames, setFileNames] = useRecoilState(fileNamesState);

  useEffect(() => {
    if (file) {
      let reader = new FileReader();

      reader.readAsText(file);

      reader.onload = function () {
        const data = JSON.parse(reader.result);

        if (data[0]?.sportDataUserData) {
          setSportPerMinute(data);
          setFileNames({
            motionPath: fileNames.motionPath,
            sportPerMinute: file.name,
          });
        } else {
          setMotionPathData(data);
          setFileNames({
            sportPerMinute: fileNames.sportPerMinute,
            motionPath: file.name,
          });
        }
      };

      reader.onerror = function () {
        console.log(reader.error);
      };
    }
  }, [file]);

  return (
    <DashboardLayout navigation={navigation}>
      <div>
        <div className="max-w-7xl">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        </div>
        <div className="max-w-7xl">
          <div className="py-4 space-y-4">
            {motionPathData.length !== 0 && (
              <div className="flex shadow p-5">
                <div className="w-32 flex flex-col items-center justify-center text-center">
                  <img src="/json-file.svg" />
                  <p className="text-sm text-gray-800">
                    {fileNames.motionPath}
                  </p>
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-xl">Motion Path</h3>
                  <p className="text-gray-800">
                    You have uploaded file for motion paths
                  </p>
                </div>
              </div>
            )}
            {sportPerMinute.length !== 0 && (
              <div className="flex shadow-md p-5">
                <div className="w-32 flex flex-col items-center justify-center text-center">
                  <img src="/json-file.svg" />
                  <p className="text-sm text-gray-800">
                    {fileNames.sportPerMinute}
                  </p>
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-xl">Sport Per Minute</h3>
                  <p className="text-gray-800">
                    You have uploaded file for sport per minute
                  </p>
                </div>
              </div>
            )}
            {motionPathData.length === 0 && (
              <div className="space-y-4">
                <p>You have not uploaded file for motion paths</p>
                <div className="w-64 flex justify-start">
                  <UploadDropZone />
                </div>
              </div>
            )}
            {sportPerMinute.length === 0 && (
              <div className="space-y-4">
                <p>You have not uploaded file for sport per minute</p>
                <div className="w-64 flex justify-start">
                  <UploadDropZone />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
