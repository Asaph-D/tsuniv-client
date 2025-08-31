


const ResumeInfoParent = ({ formData}) => {
    return (
        <div>
            <h4 className="font-semibold text-blue-600 mb-2">Contact parental</h4>
            <div className="bg-blue-50 p-4 rounded border border-blue-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-800">
                    <div>
                        <strong>Nom :</strong> {formData.nomParent}
                    </div>
                    <div>
                        <strong>Lien :</strong> {formData.lienParente}
                    </div>
                    <div>
                        <strong>Téléphone :</strong> {formData.telephoneParent}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeInfoParent;