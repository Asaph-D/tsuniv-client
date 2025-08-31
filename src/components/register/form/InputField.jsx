import  useInscriptionStore from "@stores/studentRegistrationStore"

 const InputField = ({ label, type = "text", field, placeholder, required = false }) => {
    const { formData, updateFormData, errors } = useInscriptionStore()
    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">{label} {required && "*"}</span>
            </label>
            <input
                type={type}
                value={formData[field]}
                onChange={(e) => updateFormData(field, e.target.value)}
                placeholder={placeholder}
                className={`input input-bordered ${errors[field] ? "input-error" : ""}`}
            />
            {errors[field] && (
                <label className="label">
                    <span className="label-text-alt text-error">{errors[field]}</span>
                </label>
            )}
        </div>
    )
}

export default InputField;