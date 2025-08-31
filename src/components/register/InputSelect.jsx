import { registerStore } from '@stores/registerStore';

const FloatingSelect = ({ label, name, options = [], required = false, error }) => {
  const { formData, updateSelect } = registerStore();

  const value = formData[name] || '';

  return (
    <div className="w-full mb-4">
      <label className="floating-label w-full">
        <span>{label}</span>
        <select
          className={`select select-md w-full ${error ? 'select-error' : ''}`}
          value={value}
          onChange={(e) => updateSelect(name, e.target.value)}
        >
          <option value="">-- Sélectionner --</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </label>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default FloatingSelect;
