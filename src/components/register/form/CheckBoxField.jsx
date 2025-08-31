import  useInscriptionStore from "@stores/studentRegistrationStore"
const CheckboxField = ({ field, label, children }) => {
    const { formData, updateFormData } = useInscriptionStore()
    return (
        <label className="cursor-pointer label justify-start gap-3">
            <input
                type="checkbox"
                checked={formData[field]}
                onChange={(e) => updateFormData(field, e.target.checked)}
                className="checkbox checkbox-primary"
            />
            <div>
                <span className="label-text font-medium">{label}</span>
                {children}
            </div>
        </label>
    )
}

export default CheckboxField;