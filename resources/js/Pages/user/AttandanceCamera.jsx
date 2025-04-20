import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

const AttendanceCamera = () => {
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

  const submitAttendance = async () => {
    try {
      setLoading(true);
      await axios.post('/attendance', {
        image: image, // base64 image
      });
      alert('Absensi berhasil!');
    } catch (error) {
      console.error(error);
      alert('Gagal mengirim absensi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center p-4">
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
          <img src={image} alt="Captured" className="mx-auto rounded shadow" />
          <div className="mt-4 flex justify-center gap-4">
            <button
              onClick={submitAttendance}
              disabled={loading}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              {loading ? 'Mengirim...' : 'Kirim Absensi'}
            </button>
            <button
              onClick={retakePhoto}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Ulangi
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AttendanceCamera;
