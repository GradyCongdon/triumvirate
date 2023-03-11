import { Weight } from "./types";

export const formatDecimalPercentage = (num: number) => {
  const _diffPercent = (num * 100).toFixed(1);
  const diffPercent = parseFloat(_diffPercent);
  return diffPercent;
};

type WeightDiff = {
  amount: number;
  percent: number;
  sign: "+" | "-";
};
export const getWeightDiff = (a: Weight, b: Weight): WeightDiff => {
  const diff = a.amount - b.amount;
  const diffDecimal = diff / a.amount;
  const diffPercent = formatDecimalPercentage(diffDecimal);

  return {
    amount: diff,
    percent: diffPercent,
    sign: diff >= 0 ? "+" : "-",
  };
};

type WeightFormatted = {
  rounded: string;
  withUnit: string;
};
export const formatWeight = (weight: Weight): WeightFormatted => {
  const rounded = roundDecimal(weight.amount);
  return {
    rounded,
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

export const roundDecimal = (num: number) =>
  (Math.round(num * 10) / 10).toFixed(1);

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
