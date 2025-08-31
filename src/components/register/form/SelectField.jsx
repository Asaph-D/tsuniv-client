import  useInscriptionStore  from "@stores/studentRegistrationStore"
const SelectField = ({ label, field, options, required = false }) => {
    const { formData, updateFormData, errors } = useInscriptionStore()
    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">{label} {required && "*"}</span>
            </label>
            <select
                value={formData[field]}
                onChange={(e) => updateFormData(field, e.target.value)}
                className={`select select-bordered ${errors[field] ? "select-error" : ""}`}
            >
                {options.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
            {errors[field] && (
                <label className="label">
                    <span className="label-text-alt text-error">{errors[field]}</span>
                </label>
            )}
        </div>
    )
}

export default SelectField;