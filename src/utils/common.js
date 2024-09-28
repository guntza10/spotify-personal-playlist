const formattedStringNumberWithComma = (number) => {
  return number.toLocaleString("en-US", {
    maximumFractionDigits: 0,
  });
};

export { formattedStringNumberWithComma };
