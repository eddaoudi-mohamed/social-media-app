import { FC, useState } from "react";
import { useCallback } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";
import { Button } from "../ui/button";
interface Iprops {
  fielChange: (file: File[]) => void;
  mediaUrl: string;
}

const FileUploader: FC<Iprops> = ({ fielChange, mediaUrl }) => {
  const [fileUrl, setFileUrl] = useState(mediaUrl ?? "");
  const [file, setFile] = useState<File[]>([]);
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    // Do something with the files
    setFile(acceptedFiles);
    fielChange(acceptedFiles);
    setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    console.log("file change");
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpg", ".png", ".svg"],
    },
  });

  return (
    <>
      <div
        {...getRootProps()}
        className="flex flex-center felx-col bg-dark-3 rounded-md cursor-pointer"
      >
        <input {...getInputProps()} />
        {fileUrl ? (
          <>
            <div className="flex flex-1 flex-col gap-1 justify-center p-5 w-full lg:p-10">
              <img
                src={fileUrl}
                alt="imageUploded"
                className="file_uploader-img"
              />
              <p className="file_uploader-label h-3">
                Click or Drag to replace photo
              </p>
            </div>
          </>
        ) : (
          <div className="file_uploader-box">
            <img
              src="/assets/icons/file-upload.svg"
              alt="FileUpload"
              width={96}
              height={77}
            />
            <h3 className="base-medium text-light-2 mb-2 mt-6">
              Drap Photo Here
            </h3>
            <p className=" text-light-4 small-regular mb-6">SVG , PNG , JPG </p>
            <Button type="button" className="shad-button_dark_4">
              Select From Computer
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default FileUploader;
