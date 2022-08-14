import { ChartBarIcon, HomeIcon, UsersIcon } from "@heroicons/react/outline";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import fileNamesState from "../../atoms/fileNames";
import motionPathDataState from "../../atoms/motionPathData";
import sportPerMinuteState from "../../atoms/sportPerMinute";
import uploadedFileState from "../../atoms/uploadedFile";
import UploadDropZone from "../../components/UploadDropZone";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useRouter } from "next/router";

export default function Dashboard() {
  const router = useRouter();

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
          <h1 className="text-3xl font-semibold text-gray-900">Dashboard</h1>
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
                <p>
                  You have not uploaded file for motion paths,{" "}
                  <span className="font-semibold">
                    you cannot access the Motion Paths page
                  </span>
                </p>
                <div className="w-64 flex justify-start">
                  <UploadDropZone />
                </div>
              </div>
            )}
            {sportPerMinute.length === 0 && (
              <div className="space-y-4">
                <p>
                  You have not uploaded file for sport per minute,{" "}
                  <span className="font-semibold">
                    you cannot access the Statistics page
                  </span>
                </p>
                <div className="w-64 flex justify-start">
                  <UploadDropZone />
                </div>
              </div>
            )}
            <div
              className={`space-y-4 ${
                router.asPath.split("#")[1] === "how-to-get-these-2-files"
                  ? "border-2 border-red-500 p-5"
                  : ""
              }`}
            >
              <h2 className="font-semibold text-2xl text-gray-900">
                How to get these 2 files?
              </h2>
              <ul className="ml-4 list-disc text-gray-900">
                <li>On your phone, open the Huawei Health app</li>
                <li>
                  Tap the &apos;Me&apos; button in the lower right-hand corner
                  of the main screen
                </li>
                <li> Now tap on your account name on top of the screen</li>
                <li>
                  Tap on &apos;Privacy Center&apos;{" "}
                  <span className="italic">
                    (if there is no &apos;Privacy Center&apos;, you are probably
                    in &apos;Member Center &apos;, so again click on
                    &apos;Me&apos; button and then again tap on your account
                    name)
                  </span>
                </li>
                <li>Tap &apos;Request Your Data&apos;</li>
                <li>
                  Select &apos;Health&apos; from the list and confirm your
                  selection
                </li>
                <li>Follow any further in-app instructions</li>
                <li>
                  Wait for the mail from Huawei to arrive with a link to
                  download the data (ZIP file)
                </li>
              </ul>
              <p>
                Download data and upload{" "}
                <span className="font-semibold">motion path</span> and{" "}
                <span className="font-semibold">sport per minute</span> files
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
