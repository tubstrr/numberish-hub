import {
  ascii,
  asciiReverse,
  codex,
  codexReverse,
} from "@/composable/codex.js";

export const encrypt = (method, value) => {
  switch (method) {
    case "RJ":
      return value
        .toLowerCase()
        .split("")
        .map((letter) => codex[letter] || letter)
        .join("");
    case "ASCII":
      return value
        .split("")
        .map((letter) => ascii[letter] || letter)
        .join("");
    default:
      return value;
  }
};

export const decrypt = (method, value) => {
  // Split value into array by 2 characters
  if (method === "RJ") {
    const decodedArray = value.match(/\d{2}|.{1}/g) ?? [];
    return decodedArray
      .map((letter) => codexReverse[letter] || letter)
      .join("");
  }

  if (method === "ASCII") {
    const decodedArray = value.match(/\d{2}|.{2}/g) ?? [];
    return decodedArray
      .map((letter) => asciiReverse[letter] || letter)
      .join("");
  }

  return value;
};
