import { pdfjs } from 'react-pdf';

 const configurePdfWorker = () => {
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();
};

export default configurePdfWorker ;