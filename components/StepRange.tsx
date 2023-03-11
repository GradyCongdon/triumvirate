type StepRangeProps = {
  stepSize: number;
  onChange: (stepSize: number) => void;
};
export const StepRange = ({ stepSize, onChange }: StepRangeProps) => (
  <div style={{ display: "flex", alignItems: "center" }}>
    <span>Step: {stepSize}%</span>
    <input
      type="range"
      min="1"
      max="20"
      value={stepSize}
      onChange={(e) => onChange(Number(e.target.value))}
    />
  </div>
);
