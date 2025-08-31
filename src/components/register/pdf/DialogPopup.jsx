import { PDFDownloadLink, PDFViewer, BlobProvider } from '@react-pdf/renderer';
import DocumentPDF from '@hooks/usePDFPreview';
import { Printer } from 'lucide-react';

const DialogPopup = ( {setShowPreview, formData, handleDownload, closePreview} ) => {
    
    return <dialog open className="modal modal-middle modal-wide">
        <div className="modal-box w-11/12 max-w-5xl p-0 max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center border-b px-6 py-4">
                <h3 className="text-lg font-bold">Prévisualisation du PDF</h3>
                <button
                    onClick={() => setShowPreview(false)}
                    className="btn btn-sm btn-circle btn-ghost"
                >
                    ✕
                </button>
            </div>

            <div className="flex-1 p-6 bg-gray-50 overflow-y-auto flex justify-center">
                <PDFViewer style={{ width: '100%', height: '80vh' }} showToolbar={false}>
                    <DocumentPDF formData={formData} />
                </PDFViewer>
            </div>
            <div className="modal-action justify-center p-6 bg-base-100 border-t space-x-4">
                <PDFDownloadLink
                    document={<DocumentPDF formData={formData} />}
                    fileName="fiche_inscription_etudiant.pdf"
                >
                    {({ loading }) => (
                        <button
                            className="btn btn-primary btn-md px-6"
                            onClick={() => { if (!loading) handleDownload(); }}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="loading loading-spinner"></span> Génération...
                                </>
                            ) : 'Télécharger'}
                        </button>
                    )}
                </PDFDownloadLink>

                <BlobProvider document={<DocumentPDF formData={formData} />}>
                    {({ url, loading, error }) => (
                        <button
                            onClick={() => {
                                if (loading || error || !url) return;
                                const printWindow = window.open(url, '_blank');
                                if (printWindow) {
                                    printWindow.onload = () => printWindow.print();
                                }
                            }}
                            disabled={loading}
                            className="btn btn-outline btn-md gap-2"
                        >
                            <Printer className="h-4 w-4" />
                            {loading ? 'Génération...' : 'Imprimer'}
                        </button>
                    )}
                </BlobProvider>

                <button
                    className="btn btn-ghost btn-md px-6"
                    onClick={() => {
                        closePreview();
                    }} >
                    Annuler
                </button>
            </div>
        </div>
    </dialog>
}

export default DialogPopup;