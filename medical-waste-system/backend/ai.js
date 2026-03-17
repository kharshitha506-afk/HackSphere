exports.classify = async () => {
  const types = [
    { type: "Sharps", section: "Sharps Container" },
    { type: "Plastic", section: "Plastic Bin" },
    { type: "Chemical", section: "Chemical Waste Bin" },
    { type: "Expired Drugs", section: "Pharmaceutical Bin" }
  ];
  const selected = types[Math.floor(Math.random() * types.length)];
  console.log("AI classified waste as:", selected.type, "| Section:", selected.section);
  return selected;
};