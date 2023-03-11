type WeightUnit = "kg" | "lb";
export type Weight = {
  amount: number;
  unit: WeightUnit;
};
export type OrmDecimalWeights = Record<number, Weight>;
