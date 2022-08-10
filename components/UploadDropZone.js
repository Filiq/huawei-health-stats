import { Dropzone } from "@mantine/dropzone";
import { useRecoilState } from "recoil";
import uploadedFileState from "../atoms/uploadedFile";

export default function UploadDropZone(props) {
  const [uploadedFile, setUploadedFile] = useRecoilState(uploadedFileState);

  return (
    <Dropzone
      onDrop={(files) => {
        setUploadedFile(files[0]);
      }}
      onReject={(files) => console.log("rejected files", files)}
      //maxSize={3 * 1024 ** 2}
      accept={["application/json"]}
      maxFiles={1}
      {...props}
    >
      <div>
        <div>
          <p className="px-2">Upload JSON file</p>
        </div>
      </div>
    </Dropzone>
  );
}
