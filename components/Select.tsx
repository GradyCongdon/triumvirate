"use client";
export const Select = ({ value, options, onChange }: any) => (
  <select value={value} onChange={(e) => onChange(e.target.value)}>
    {options.map((option: any) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
);
