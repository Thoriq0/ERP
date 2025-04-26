import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { router } from "@inertiajs/react";
import { usePage } from '@inertiajs/react';

export function ButtonModalAttandanceOut() {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [captured, setCaptured] = useState(false);
  const [loading, setLoading] = useState(false);

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    setCaptured(true);
  };

  const retakePhoto = () => {
    setImage(null);
    setCaptured(false);
  };

  const { auth } = usePage().props;
  const userId = auth.user.id;
  const userName = auth.user.name;

  const submitAttendance = () => {
    setLoading(true);

    router.post(
      "/admin/attendance/take",
      {
        image,
        user_id: userId,
        name: userName,
        status: 'out'
      },
      {
        onSuccess: () => {
          alert("Absensi berhasil!");
        },
        onError: () => {
          alert("Gagal mengirim absensi.");
        },
        onFinish: () => {
          setLoading(false);
          setCaptured(false);
          setImage(null);
        },
      }
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-1/2 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl transition-all duration-300">
          Attandance In
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[600px] md:max-w-[600px] overflow-y-auto border border-gray-300 p-5 rounded-md custom-scrollbar">
        <DialogHeader>
          <DialogTitle>Attandace In</DialogTitle>
        </DialogHeader>
        <div className="text-center p-4 ml-5">
          {!captured ? (
            <>
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={480}
                videoConstraints={{
                  width: 480,
                  height: 360,
                  facingMode: "user",
                }}
                onUserMediaError={() => {
                  alert("Gagal akses kamera. Pastikan kamu buka lewat https.");
                }}
              />
              <div className="mt-4">
                <button
                  onClick={capturePhoto}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Capture
                </button>
              </div>
            </>
          ) : (
            <>
              <img
                src={image}
                alt="Captured"
                className="mx-auto rounded shadow"
              />
              <div className="mt-4 flex justify-center gap-4">
                <button
                  onClick={submitAttendance}
                  disabled={loading}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  {loading ? "Mengirim..." : "Submit Attendance"}
                </button>
                <button
                  onClick={retakePhoto}
                  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                  Retake
                </button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
