import Head from "next/head";
import UploadDropZone from "../components/UploadDropZone";
import MainLayout from "../layouts/MainLayout";
import { useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import uploadedFileState from "../atoms/uploadedFile";
import motionPathDataState from "../atoms/motionPathData";
import sportPerMinuteState from "../atoms/sportPerMinute";
import { useRouter } from "next/router";
import fileNamesState from "../atoms/fileNames";

export default function Home() {
  const file = useRecoilValue(uploadedFileState);
  const [motionPathData, setMotionPathData] =
    useRecoilState(motionPathDataState);
  const [sportPerMinute, setSportPerMinute] =
    useRecoilState(sportPerMinuteState);
  const [fileNames, setFileNames] = useRecoilState(fileNamesState);

  const router = useRouter();

  useEffect(() => {
    if (file) {
      let reader = new FileReader();

      reader.readAsText(file);

      reader.onload = function () {
        const data = JSON.parse(reader.result);

        console.log(data);

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

        router.push("/dashboard");
      };

      reader.onerror = function () {
        console.log(reader.error);
      };
    }
  }, [file]);

  return (
    <div>
      <Head>
        <title>Huawei Health</title>
        <meta name="description" content="Huawei Health Web" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainLayout>
        <div className="flex flex-col justify-center items-center space-y-6">
          <div className="flex flex-col items-center">
            <h1 className="text-5xl font-semibold mb-3">Huawei Health</h1>
            <p className="text-lg text-gray-700">
              See your milestones, statistics, paths you ran, and much more.
            </p>
          </div>
          <div>
            <UploadDropZone />
          </div>
        </div>
      </MainLayout>
    </div>
  );
}
