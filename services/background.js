function backGround(value) {
  const colorMap = {
    "II": "#BFCCFF",
    "III": "#9B9BFF",
    "IV": "#88DCDC",
    "V": "#7EF895",
    "VI": "#E9DC01",
    "VII": "#FDBE01",
    "VIII": "#FF711F",
    "IX": "#FF0302",
    "X": "#DC0C0C",
    "XI": "#880201",
    "XII": "#440203"
  };

  let n = value;
  if (n && n.includes("/")) {
    n = n.split("/")[1];
  }

  return colorMap[n] || "#FFFFFF";
}

export default backGround;
