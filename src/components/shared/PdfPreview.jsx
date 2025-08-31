import { useState, useEffect, useRef } from 'react';
import { Document, Page } from 'react-pdf';

const PdfPreview = ({ file }) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [scale, setScale] = useState(1.2);
    const [loading, setLoading] = useState(true);
    const containerRef = useRef(null);
    const [containerWidth, setContainerWidth] = useState(0);

    const onLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
        setPageNumber(1);
        setLoading(false);
    };

    useEffect(() => {
        if (containerRef.current) {
            const resizeObserver = new ResizeObserver(([entry]) => {
                setContainerWidth(entry.contentRect.width);
            });
            resizeObserver.observe(containerRef.current);
            return () => resizeObserver.disconnect();
        }
    }, []);

    return (
        <div ref={containerRef} className="space-y-2 w-5/6 mx-auto flex flex-col items-center">
            {loading && (
                <div className="skeleton h-64 w-full max-w-3xl rounded-lg"></div>
            )}
            <Document file={file} onLoadSuccess={onLoadSuccess}>
                <Page pageNumber={pageNumber} scale={scale} width={containerWidth > 0 ? containerWidth : 350} />
            </Document>
            {!loading && (
                <>
                    <div className="flex justify-between items-center text-xs opacity-70 w-full max-w-3xl">
                        <button onClick={() => setPageNumber((p) => Math.max(p - 1, 1))} disabled={pageNumber <= 1}>←</button>
                        <span>Page {pageNumber} / {numPages}</span>
                        <button onClick={() => setPageNumber((p) => Math.min(p + 1, numPages))} disabled={pageNumber >= numPages}>→</button>
                    </div>
                    <div className="flex justify-center gap-2">
                        <button onClick={() => setScale((s) => Math.max(s - 0.2, 0.6))} className="btn btn-xs btn-outline">–</button>
                        <button onClick={() => setScale((s) => Math.min(s + 0.2, 2))} className="btn btn-xs btn-outline">+</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default PdfPreview;
