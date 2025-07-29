import html2canvas from "html2canvas";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { useState } from "react";

function DownloadButton({ type, outputElement }) {
  const [loading, setLoading] = useState(false);

  const downloadImage = () => {
    setLoading(true);
    html2canvas(outputElement).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "output.png";
      link.click();
      setLoading(false);
    });
  };

  const downloadVideo = async () => {
    setLoading(true);
    const ffmpeg = new FFmpeg();
    await ffmpeg.load();

    // Capture canvas stream
    const canvas = outputElement.tagName === "CANVAS" ? outputElement : document.createElement("canvas");
    const stream = canvas.captureStream(30); // 30 fps
    const recorder = new MediaRecorder(stream);
    const chunks = [];

    recorder.ondataavailable = (e) => chunks.push(e.data);
    recorder.onstop = async () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      const file = new File([blob], "output.webm");

      // Convert WebM to MP4 using FFmpeg
      await ffmpeg.writeFile("input.webm", await fetchFile(file));
      await ffmpeg.exec(["-i", "input.webm", "-c:v", "libx264", "-preset", "fast", "output.mp4"]);
      const data = await ffmpeg.readFile("output.mp4");

      const link = document.createElement("a");
      link.href = URL.createObjectURL(new Blob([data], { type: "video/mp4" }));
      link.download = "output.mp4";
      link.click();
      setLoading(false);
    };

    recorder.start();
    setTimeout(() => recorder.stop(), 5000); // Record for 5 seconds
  };

  return (
    <button onClick={type === "image" ? downloadImage : downloadVideo} disabled={loading}>
      {loading ? "Processing..." : `Download as ${type === "image" ? "Image" : "Video"}`}
    </button>
  );
}

export default DownloadButton;
