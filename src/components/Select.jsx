const Select = ({ handleChange, value, options, label }) => {
  return (
    <label>
      {label}
      <select onChange={handleChange} value={value}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};

export { Select };
