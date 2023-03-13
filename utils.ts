import { Weight } from "@/types/Weight";

export const formatDecimalPercentage = (num: number) => {
  const _diffPercent = (num * 100).toFixed(1);
  const diffPercent = parseFloat(_diffPercent);
  return diffPercent;
};

type Sign = "+" | "-" | "";
type Diff = {
  amount: number;
  percent: number;
  sign: Sign;
};
export const getWeightDiff = (a: Weight, b: Weight): Diff => {
  const diff = a.amount - b.amount;
  const diffDecimal = diff / a.amount;
  const diffPercent = formatDecimalPercentage(diffDecimal);
  let sign;
  if (diff === 0) {
    sign = "";
  } else if (diff > 0) {
    sign = "+";
  } else {
    sign = "-";
  }

  return {
    amount: diff,
    percent: diffPercent,
    sign: sign as Sign,
  };
};

export const getDiffColor = (diff: Diff) => {
  switch (diff.sign) {
    case "+":
      return "var(--green)";
    case "-":
      return "var(--red)";
    default:
      return "var(--blue)";
  }
};

type WeightFormatted = {
  rounded: string;
  withUnit: string;
  ones: string;
  decimal: string;
  unit: Weight["unit"];
};
export const formatWeight = (weight: Weight): WeightFormatted => {
  const rounded = roundDecimal(weight.amount);
  const [ones, decimal] = rounded.split(".");
  return {
    rounded,
    ones,
    decimal,
    unit: weight.unit,
    withUnit: `${rounded} ${weight.unit}`,
  };
};

export const getOrmDecimalWeight = (
  ormWeight: Weight,
  ormDecimal: number
): Weight => ({
  amount: ormWeight.amount * ormDecimal,
  unit: ormWeight.unit,
});

export const roundDecimal = (num: number) => {
  const rounded = Math.round(num * 10) / 10;
  const precision = rounded > 100 ? 1 : 1;
  return rounded.toFixed(precision);
};

export const findClosest = (num: number, arr: number[]) => {
  let curr = arr[0];
  let diff = Math.abs(num - curr);
  for (let val = 0; val < arr.length; val++) {
    const newdiff = Math.abs(num - arr[val]);
    if (newdiff < diff) {
      diff = newdiff;
      curr = arr[val];
    }
  }
  return curr;
};
//  an array of numbers from 5 to 32.5
export const dumbellWeights = [
  5, 7.5, 10, 12.5, 15, 17.5, 20, 22.5, 25, 27.5, 30, 32.5,
];
export const getClosestDumbell = (weight: Weight): Weight => {
  const closestAmount = findClosest(weight.amount, dumbellWeights);
  return {
    amount: closestAmount,
    unit: weight.unit,
  };
};
