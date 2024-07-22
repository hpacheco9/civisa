function backGround(value) {
  let n = value;
  if (n && n.includes("/")) {
    n = n.split("/")[1];
  }
  switch (n) {
    case "II":
      return "#BFCCFF";
    case "III":
      return "#9B9BFF";
    case "IV":
      return "#88DCDC";
    case "V":
      return "#7EF895";
    case "VI":
      return "#E9DC01";
    case "VII":
      return "#FDBE01";
    case "VIII":
      return "#FF711F";
    case "IX":
      return "#FF0302";
    case "X":
      return "#DC0C0C";
    case "XI":
      return "#880201";
    case "XII":
      return "#440203";
    default:
      return "#FFFFFF";
  }
}

export default backGround;
