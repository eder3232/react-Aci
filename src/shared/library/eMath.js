class EMath {
  constructor() {}

  static round(number, numberOfDecimals = 2) {
    return (
      Math.round(number * Math.pow(10, numberOfDecimals)) /
      Math.pow(10, numberOfDecimals)
    )
  }

  static interpolate(xi, yi, xj, yj, x) {
    return yi + ((x - xi) * (yj - yi)) / (xj - xi)
  }

  static roundFloor(number, multiple, numberOfDecimals = 2) {
    return Math.floor(number / multiple) * multiple //.toFixed(numberOfDecimals)
  }
  static roundCeil(number, multiple, numberOfDecimals = 2) {
    return Math.ceil(number / multiple) * multiple //.toFixed(numberOfDecimals)
  }
}

export { EMath }
