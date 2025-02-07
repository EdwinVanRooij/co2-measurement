import {
  __async
} from "./chunk-WDMUDEB6.js";

// node_modules/@tgwf/co2/dist/esm/1byte.js
var CO2_PER_KWH_IN_DC_GREY = 519;
var CO2_PER_KWH_NETWORK_GREY = 475;
var CO2_PER_KWH_IN_DC_GREEN = 0;
var KWH_PER_BYTE_IN_DC = 72e-12;
var FIXED_NETWORK_WIRED = 429e-12;
var FIXED_NETWORK_WIFI = 152e-12;
var FOUR_G_MOBILE = 884e-12;
var KWH_PER_BYTE_FOR_NETWORK = (FIXED_NETWORK_WIRED + FIXED_NETWORK_WIFI + FOUR_G_MOBILE) / 3;
var OneByte = class {
  constructor(options) {
    this.allowRatings = false;
    this.options = options;
    this.KWH_PER_BYTE_FOR_NETWORK = KWH_PER_BYTE_FOR_NETWORK;
  }
  perByte(bytes, green) {
    if (bytes < 1) {
      return 0;
    }
    if (green) {
      const Co2ForDC = bytes * KWH_PER_BYTE_IN_DC * CO2_PER_KWH_IN_DC_GREEN;
      const Co2forNetwork = bytes * KWH_PER_BYTE_FOR_NETWORK * CO2_PER_KWH_NETWORK_GREY;
      return Co2ForDC + Co2forNetwork;
    }
    const KwHPerByte = KWH_PER_BYTE_IN_DC + KWH_PER_BYTE_FOR_NETWORK;
    return bytes * KwHPerByte * CO2_PER_KWH_IN_DC_GREY;
  }
};
var byte_default = OneByte;

// node_modules/@tgwf/co2/dist/esm/constants/file-size.js
var GIGABYTE = 1e3 * 1e3 * 1e3;
var file_size_default = {
  GIGABYTE
};

// node_modules/@tgwf/co2/dist/esm/data/average-intensities.min.js
var data = {
  "AFG": 132.53,
  "AFRICA": 547.83,
  "ALB": 24.29,
  "DZA": 634.61,
  "ASM": 611.11,
  "AGO": 174.73,
  "ATG": 611.11,
  "ARG": 353.96,
  "ARM": 264.54,
  "ABW": 561.22,
  "ASEAN": 570.41,
  "ASIA": 591.13,
  "AUS": 556.3,
  "AUT": 110.78,
  "AZE": 671.39,
  "BHS": 660.1,
  "BHR": 904.62,
  "BGD": 691.41,
  "BRB": 605.51,
  "BLR": 441.74,
  "BEL": 138.11,
  "BLZ": 225.81,
  "BEN": 584.07,
  "BTN": 23.33,
  "BOL": 531.69,
  "BIH": 600.94,
  "BWA": 847.91,
  "BRA": 96.4,
  "BRN": 893.91,
  "BGR": 335.33,
  "BFA": 467.53,
  "BDI": 250,
  "CPV": 558.14,
  "KHM": 417.71,
  "CMR": 305.42,
  "CAN": 165.15,
  "CYM": 642.86,
  "CAF": 0,
  "TCD": 628.57,
  "CHL": 291.11,
  "CHN": 583.61,
  "COL": 259.51,
  "COM": 642.86,
  "COG": 700,
  "COD": 24.46,
  "COK": 250,
  "CRI": 53.38,
  "CIV": 393.89,
  "HRV": 204.96,
  "CUB": 637.61,
  "CYP": 526.02,
  "CZE": 449.72,
  "DNK": 151.65,
  "DJI": 692.31,
  "DMA": 529.41,
  "DOM": 580.78,
  "ECU": 166.91,
  "EGY": 574.04,
  "SLV": 224.76,
  "GNQ": 591.84,
  "ERI": 631.58,
  "EST": 416.67,
  "SWZ": 172.41,
  "ETH": 24.64,
  "EU": 243.89,
  "EUROPE": 302.27,
  "FLK": 500,
  "FRO": 404.76,
  "FJI": 288.46,
  "FIN": 79.12,
  "FRA": 56.02,
  "GUF": 217.82,
  "PYF": 442.86,
  "G20": 477.87,
  "G7": 341.49,
  "GAB": 491.6,
  "GMB": 666.67,
  "GEO": 167.59,
  "DEU": 381.41,
  "GHA": 484,
  "GRC": 336.57,
  "GRL": 178.57,
  "GRD": 640,
  "GLP": 500,
  "GUM": 622.86,
  "GTM": 328.27,
  "GIN": 236.84,
  "GNB": 625,
  "GUY": 640.35,
  "HTI": 567.31,
  "HND": 282.27,
  "HKG": 699.5,
  "HUN": 204.01,
  "ISL": 27.68,
  "IND": 713.01,
  "IDN": 682.43,
  "IRN": 641.73,
  "IRQ": 688.81,
  "IRL": 282.98,
  "ISR": 582.93,
  "ITA": 330.72,
  "JAM": 555.56,
  "JPN": 493.59,
  "JOR": 540.92,
  "KAZ": 821.9,
  "KEN": 71.2,
  "KIR": 666.67,
  "XKX": 894.65,
  "KWT": 649.16,
  "KGZ": 147.29,
  "LAO": 265.51,
  "LATIN AMERICA AND CARIBBEAN": 256.03,
  "LVA": 123.99,
  "LBN": 599.01,
  "LSO": 20,
  "LBR": 227.85,
  "LBY": 818.69,
  "LTU": 160.07,
  "LUX": 105.26,
  "MAC": 448.98,
  "MDG": 436.44,
  "MWI": 66.67,
  "MYS": 607.88,
  "MDV": 611.77,
  "MLI": 408,
  "MLT": 444.03,
  "MTQ": 523.18,
  "MRT": 464.71,
  "MUS": 632.48,
  "MEX": 492.34,
  "MIDDLE EAST": 643.04,
  "MDA": 643.46,
  "MNG": 775.31,
  "MNE": 418.09,
  "MSR": 1e3,
  "MAR": 624.45,
  "MOZ": 135.65,
  "MMR": 436.92,
  "NAM": 59.26,
  "NRU": 750,
  "NPL": 24.44,
  "NLD": 268.48,
  "NCL": 660.58,
  "NZL": 112.76,
  "NIC": 265.12,
  "NER": 670.89,
  "NGA": 523.25,
  "NORTH AMERICA": 343.03,
  "PRK": 389.59,
  "MKD": 539.55,
  "NOR": 30.05,
  "OCEANIA": 495.74,
  "OECD": 341.31,
  "OMN": 564.55,
  "PAK": 440.61,
  "PSE": 516.13,
  "PAN": 161.68,
  "PNG": 507.25,
  "PRY": 24.31,
  "PER": 266.48,
  "POL": 661.93,
  "PRT": 165.55,
  "PRI": 677.96,
  "QAT": 602.5,
  "REU": 572.82,
  "ROU": 240.58,
  "RUS": 445.02,
  "RWA": 316.33,
  "KNA": 636.36,
  "LCA": 666.67,
  "SPM": 600,
  "VCT": 529.41,
  "WSM": 473.68,
  "STP": 642.86,
  "SAU": 696.31,
  "SEN": 511.6,
  "SRB": 648.2,
  "SYC": 564.52,
  "SLE": 50,
  "SGP": 470.78,
  "SVK": 116.77,
  "SVN": 231.28,
  "SLB": 700,
  "SOM": 578.95,
  "ZAF": 709.69,
  "KOR": 432.11,
  "SSD": 629.03,
  "ESP": 174.05,
  "LKA": 509.78,
  "SDN": 263.16,
  "SUR": 349.28,
  "SWE": 40.7,
  "CHE": 34.7,
  "SYR": 701.66,
  "TWN": 644.36,
  "TJK": 116.86,
  "TZA": 339.25,
  "THA": 549.85,
  "PHL": 610.74,
  "TGO": 443.18,
  "TON": 625,
  "TTO": 681.53,
  "TUN": 563.96,
  "TUR": 464.59,
  "TKM": 1306.03,
  "TCA": 653.85,
  "UGA": 44.53,
  "UKR": 256.21,
  "ARE": 492.7,
  "GBR": 228.25,
  "USA": 369.53,
  "URY": 128.79,
  "UZB": 1167.6,
  "VUT": 571.43,
  "VEN": 185.8,
  "VNM": 472.47,
  "VGB": 647.06,
  "VIR": 632.35,
  "WORLD": 481.63,
  "YEM": 566.1,
  "ZMB": 111.97,
  "ZWE": 297.87
};
var type = "average";
var average_intensities_min_default = {
  data,
  type
};

// node_modules/@tgwf/co2/dist/esm/constants/index.js
var KWH_PER_GB = 0.81;
var END_USER_DEVICE_ENERGY = 0.52;
var NETWORK_ENERGY = 0.14;
var DATACENTER_ENERGY = 0.15;
var PRODUCTION_ENERGY = 0.19;
var GLOBAL_GRID_INTENSITY = average_intensities_min_default.data["WORLD"];
var RENEWABLES_GRID_INTENSITY = 50;
var FIRST_TIME_VIEWING_PERCENTAGE = 0.75;
var RETURNING_VISITOR_PERCENTAGE = 0.25;
var PERCENTAGE_OF_DATA_LOADED_ON_SUBSEQUENT_LOAD = 0.02;
var SWDV4 = {
  OPERATIONAL_KWH_PER_GB_DATACENTER: 0.055,
  OPERATIONAL_KWH_PER_GB_NETWORK: 0.059,
  OPERATIONAL_KWH_PER_GB_DEVICE: 0.08,
  EMBODIED_KWH_PER_GB_DATACENTER: 0.012,
  EMBODIED_KWH_PER_GB_NETWORK: 0.013,
  EMBODIED_KWH_PER_GB_DEVICE: 0.081,
  GLOBAL_GRID_INTENSITY: 494
};
var SWDMV3_RATINGS = {
  FIFTH_PERCENTILE: 0.095,
  TENTH_PERCENTILE: 0.186,
  TWENTIETH_PERCENTILE: 0.341,
  THIRTIETH_PERCENTILE: 0.493,
  FORTIETH_PERCENTILE: 0.656,
  FIFTIETH_PERCENTILE: 0.846
};
var SWDMV4_RATINGS = {
  FIFTH_PERCENTILE: 0.04,
  TENTH_PERCENTILE: 0.079,
  TWENTIETH_PERCENTILE: 0.145,
  THIRTIETH_PERCENTILE: 0.209,
  FORTIETH_PERCENTILE: 0.278,
  FIFTIETH_PERCENTILE: 0.359
};

// node_modules/@tgwf/co2/dist/esm/helpers/index.js
var SWDM4_GLOBAL_GRID_INTENSITY = SWDV4.GLOBAL_GRID_INTENSITY;
var formatNumber = (num) => parseFloat(num.toFixed(2));
var lessThanEqualTo = (num, limit) => num <= limit;
function parseOptions(options = {}, version = 3, green = false) {
  const globalGridIntensity = version === 4 ? SWDM4_GLOBAL_GRID_INTENSITY : GLOBAL_GRID_INTENSITY;
  if (typeof options !== "object") {
    throw new Error("Options must be an object");
  }
  const adjustments = {};
  function setIntensity(segment, segmentIntensity) {
    var _a, _b;
    if (segmentIntensity || segmentIntensity === 0) {
      if (typeof segmentIntensity === "object") {
        if (!average_intensities_min_default.data[(_a = segmentIntensity.country) == null ? void 0 : _a.toUpperCase()]) {
          console.warn(`"${segmentIntensity.country}" is not a valid country. Please use a valid 3 digit ISO 3166 country code. 
See https://developers.thegreenwebfoundation.org/co2js/data/ for more information. 
Falling back to global average grid intensity.`);
          adjustments.gridIntensity[segment] = {
            value: globalGridIntensity
          };
        }
        adjustments.gridIntensity[segment] = {
          country: segmentIntensity.country,
          value: parseFloat(average_intensities_min_default.data[(_b = segmentIntensity.country) == null ? void 0 : _b.toUpperCase()])
        };
      } else if (typeof segmentIntensity === "number") {
        adjustments.gridIntensity[segment] = {
          value: segmentIntensity
        };
      } else {
        adjustments.gridIntensity[segment] = {
          value: globalGridIntensity
        };
        console.warn(`The ${segment} grid intensity must be a number or an object. You passed in a ${typeof segmentIntensity}. 
Falling back to global average grid intensity.`);
      }
    } else {
      adjustments.gridIntensity[segment] = {
        value: globalGridIntensity
      };
    }
  }
  if (options == null ? void 0 : options.gridIntensity) {
    adjustments.gridIntensity = {};
    const {
      device,
      dataCenter,
      network
    } = options.gridIntensity;
    setIntensity("device", device);
    setIntensity("dataCenter", dataCenter);
    setIntensity("network", network);
  } else {
    adjustments.gridIntensity = {
      device: {
        value: globalGridIntensity
      },
      dataCenter: {
        value: globalGridIntensity
      },
      network: {
        value: globalGridIntensity
      }
    };
  }
  if ((options == null ? void 0 : options.dataReloadRatio) || options.dataReloadRatio === 0) {
    if (typeof options.dataReloadRatio === "number") {
      if (options.dataReloadRatio >= 0 && options.dataReloadRatio <= 1) {
        adjustments.dataReloadRatio = options.dataReloadRatio;
      } else {
        adjustments.dataReloadRatio = version === 3 ? PERCENTAGE_OF_DATA_LOADED_ON_SUBSEQUENT_LOAD : 0;
        console.warn(`The dataReloadRatio option must be a number between 0 and 1. You passed in ${options.dataReloadRatio}. 
Falling back to default value.`);
      }
    } else {
      adjustments.dataReloadRatio = version === 3 ? PERCENTAGE_OF_DATA_LOADED_ON_SUBSEQUENT_LOAD : 0;
      console.warn(`The dataReloadRatio option must be a number. You passed in a ${typeof options.dataReloadRatio}. 
Falling back to default value.`);
    }
  } else {
    adjustments.dataReloadRatio = version === 3 ? PERCENTAGE_OF_DATA_LOADED_ON_SUBSEQUENT_LOAD : 0;
    console.warn(`The dataReloadRatio option must be a number. You passed in a ${typeof options.dataReloadRatio}. 
Falling back to default value.`);
  }
  if ((options == null ? void 0 : options.firstVisitPercentage) || options.firstVisitPercentage === 0) {
    if (typeof options.firstVisitPercentage === "number") {
      if (options.firstVisitPercentage >= 0 && options.firstVisitPercentage <= 1) {
        adjustments.firstVisitPercentage = options.firstVisitPercentage;
      } else {
        adjustments.firstVisitPercentage = version === 3 ? FIRST_TIME_VIEWING_PERCENTAGE : 1;
        console.warn(`The firstVisitPercentage option must be a number between 0 and 1. You passed in ${options.firstVisitPercentage}. 
Falling back to default value.`);
      }
    } else {
      adjustments.firstVisitPercentage = version === 3 ? FIRST_TIME_VIEWING_PERCENTAGE : 1;
      console.warn(`The firstVisitPercentage option must be a number. You passed in a ${typeof options.firstVisitPercentage}. 
Falling back to default value.`);
    }
  } else {
    adjustments.firstVisitPercentage = version === 3 ? FIRST_TIME_VIEWING_PERCENTAGE : 1;
    console.warn(`The firstVisitPercentage option must be a number. You passed in a ${typeof options.firstVisitPercentage}. 
Falling back to default value.`);
  }
  if ((options == null ? void 0 : options.returnVisitPercentage) || options.returnVisitPercentage === 0) {
    if (typeof options.returnVisitPercentage === "number") {
      if (options.returnVisitPercentage >= 0 && options.returnVisitPercentage <= 1) {
        adjustments.returnVisitPercentage = options.returnVisitPercentage;
      } else {
        adjustments.returnVisitPercentage = version === 3 ? RETURNING_VISITOR_PERCENTAGE : 0;
        console.warn(`The returnVisitPercentage option must be a number between 0 and 1. You passed in ${options.returnVisitPercentage}. 
Falling back to default value.`);
      }
    } else {
      adjustments.returnVisitPercentage = version === 3 ? RETURNING_VISITOR_PERCENTAGE : 0;
      console.warn(`The returnVisitPercentage option must be a number. You passed in a ${typeof options.returnVisitPercentage}. 
Falling back to default value.`);
    }
  } else {
    adjustments.returnVisitPercentage = version === 3 ? RETURNING_VISITOR_PERCENTAGE : 0;
    console.warn(`The returnVisitPercentage option must be a number. You passed in a ${typeof options.returnVisitPercentage}. 
Falling back to default value.`);
  }
  if ((options == null ? void 0 : options.greenHostingFactor) || options.greenHostingFactor === 0 && version === 4) {
    if (typeof options.greenHostingFactor === "number") {
      if (options.greenHostingFactor >= 0 && options.greenHostingFactor <= 1) {
        adjustments.greenHostingFactor = options.greenHostingFactor;
      } else {
        adjustments.greenHostingFactor = 0;
        console.warn(`The returnVisitPercentage option must be a number between 0 and 1. You passed in ${options.returnVisitPercentage}. 
Falling back to default value.`);
      }
    } else {
      adjustments.greenHostingFactor = 0;
      console.warn(`The returnVisitPercentage option must be a number. You passed in a ${typeof options.returnVisitPercentage}. 
Falling back to default value.`);
    }
  } else if (version === 4) {
    adjustments.greenHostingFactor = 0;
  }
  if (green) {
    adjustments.greenHostingFactor = 1;
  }
  return adjustments;
}
function getApiRequestHeaders(comment = "") {
  return {
    "User-Agent": `co2js/${"0.16.3"} ${comment}`
  };
}
function outputRating(co2e, swdmVersion) {
  let {
    FIFTH_PERCENTILE,
    TENTH_PERCENTILE,
    TWENTIETH_PERCENTILE,
    THIRTIETH_PERCENTILE,
    FORTIETH_PERCENTILE,
    FIFTIETH_PERCENTILE
  } = SWDMV3_RATINGS;
  if (swdmVersion === 4) {
    FIFTH_PERCENTILE = SWDMV4_RATINGS.FIFTH_PERCENTILE;
    TENTH_PERCENTILE = SWDMV4_RATINGS.TENTH_PERCENTILE;
    TWENTIETH_PERCENTILE = SWDMV4_RATINGS.TWENTIETH_PERCENTILE;
    THIRTIETH_PERCENTILE = SWDMV4_RATINGS.THIRTIETH_PERCENTILE;
    FORTIETH_PERCENTILE = SWDMV4_RATINGS.FORTIETH_PERCENTILE;
    FIFTIETH_PERCENTILE = SWDMV4_RATINGS.FIFTIETH_PERCENTILE;
  }
  if (lessThanEqualTo(co2e, FIFTH_PERCENTILE)) {
    return "A+";
  } else if (lessThanEqualTo(co2e, TENTH_PERCENTILE)) {
    return "A";
  } else if (lessThanEqualTo(co2e, TWENTIETH_PERCENTILE)) {
    return "B";
  } else if (lessThanEqualTo(co2e, THIRTIETH_PERCENTILE)) {
    return "C";
  } else if (lessThanEqualTo(co2e, FORTIETH_PERCENTILE)) {
    return "D";
  } else if (lessThanEqualTo(co2e, FIFTIETH_PERCENTILE)) {
    return "E";
  } else {
    return "F";
  }
}

// node_modules/@tgwf/co2/dist/esm/sustainable-web-design-v3.js
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {
  enumerable: true,
  configurable: true,
  writable: true,
  value
}) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {})) if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols) for (var prop of __getOwnPropSymbols(b)) {
    if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
  }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var SustainableWebDesign = class {
  constructor(options) {
    this.allowRatings = true;
    this.options = options;
    this.version = 3;
  }
  energyPerByteByComponent(bytes) {
    const transferedBytesToGb = bytes / file_size_default.GIGABYTE;
    const energyUsage = transferedBytesToGb * KWH_PER_GB;
    return {
      consumerDeviceEnergy: energyUsage * END_USER_DEVICE_ENERGY,
      networkEnergy: energyUsage * NETWORK_ENERGY,
      productionEnergy: energyUsage * PRODUCTION_ENERGY,
      dataCenterEnergy: energyUsage * DATACENTER_ENERGY
    };
  }
  co2byComponent(energyByComponent, carbonIntensity = GLOBAL_GRID_INTENSITY, options = {}) {
    let deviceCarbonIntensity = GLOBAL_GRID_INTENSITY;
    let networkCarbonIntensity = GLOBAL_GRID_INTENSITY;
    let dataCenterCarbonIntensity = GLOBAL_GRID_INTENSITY;
    let globalEmissions = GLOBAL_GRID_INTENSITY;
    if (options == null ? void 0 : options.gridIntensity) {
      const {
        device,
        network,
        dataCenter
      } = options.gridIntensity;
      if ((device == null ? void 0 : device.value) || (device == null ? void 0 : device.value) === 0) {
        deviceCarbonIntensity = device.value;
      }
      if ((network == null ? void 0 : network.value) || (network == null ? void 0 : network.value) === 0) {
        networkCarbonIntensity = network.value;
      }
      if ((dataCenter == null ? void 0 : dataCenter.value) || (dataCenter == null ? void 0 : dataCenter.value) === 0) {
        dataCenterCarbonIntensity = dataCenter.value;
      }
    }
    if (carbonIntensity === true) {
      dataCenterCarbonIntensity = RENEWABLES_GRID_INTENSITY;
    }
    const returnCO2ByComponent = {};
    for (const [key, value] of Object.entries(energyByComponent)) {
      if (key.startsWith("dataCenterEnergy")) {
        returnCO2ByComponent[key.replace("Energy", "CO2")] = value * dataCenterCarbonIntensity;
      } else if (key.startsWith("consumerDeviceEnergy")) {
        returnCO2ByComponent[key.replace("Energy", "CO2")] = value * deviceCarbonIntensity;
      } else if (key.startsWith("networkEnergy")) {
        returnCO2ByComponent[key.replace("Energy", "CO2")] = value * networkCarbonIntensity;
      } else {
        returnCO2ByComponent[key.replace("Energy", "CO2")] = value * globalEmissions;
      }
    }
    return returnCO2ByComponent;
  }
  perByte(bytes, carbonIntensity = false, segmentResults = false, ratingResults = false, options = {}) {
    if (bytes < 1) {
      bytes = 0;
    }
    const energyBycomponent = this.energyPerByteByComponent(bytes, options);
    if (typeof carbonIntensity !== "boolean") {
      throw new Error(`perByte expects a boolean for the carbon intensity value. Received: ${carbonIntensity}`);
    }
    const co2ValuesbyComponent = this.co2byComponent(energyBycomponent, carbonIntensity, options);
    const co2Values = Object.values(co2ValuesbyComponent);
    const co2ValuesSum = co2Values.reduce((prevValue, currentValue) => prevValue + currentValue);
    let rating = null;
    if (ratingResults) {
      rating = this.ratingScale(co2ValuesSum);
    }
    if (segmentResults) {
      if (ratingResults) {
        return __spreadProps(__spreadValues({}, co2ValuesbyComponent), {
          total: co2ValuesSum,
          rating
        });
      }
      return __spreadProps(__spreadValues({}, co2ValuesbyComponent), {
        total: co2ValuesSum
      });
    }
    if (ratingResults) {
      return {
        total: co2ValuesSum,
        rating
      };
    }
    return co2ValuesSum;
  }
  perVisit(bytes, carbonIntensity = false, segmentResults = false, ratingResults = false, options = {}) {
    const energyBycomponent = this.energyPerVisitByComponent(bytes, options);
    if (typeof carbonIntensity !== "boolean") {
      throw new Error(`perVisit expects a boolean for the carbon intensity value. Received: ${carbonIntensity}`);
    }
    const co2ValuesbyComponent = this.co2byComponent(energyBycomponent, carbonIntensity, options);
    const co2Values = Object.values(co2ValuesbyComponent);
    const co2ValuesSum = co2Values.reduce((prevValue, currentValue) => prevValue + currentValue);
    let rating = null;
    if (ratingResults) {
      rating = this.ratingScale(co2ValuesSum);
    }
    if (segmentResults) {
      if (ratingResults) {
        return __spreadProps(__spreadValues({}, co2ValuesbyComponent), {
          total: co2ValuesSum,
          rating
        });
      }
      return __spreadProps(__spreadValues({}, co2ValuesbyComponent), {
        total: co2ValuesSum
      });
    }
    if (ratingResults) {
      return {
        total: co2ValuesSum,
        rating
      };
    }
    return co2ValuesSum;
  }
  energyPerByte(bytes) {
    const energyByComponent = this.energyPerByteByComponent(bytes);
    const energyValues = Object.values(energyByComponent);
    return energyValues.reduce((prevValue, currentValue) => prevValue + currentValue);
  }
  energyPerVisitByComponent(bytes, options = {}, firstView = FIRST_TIME_VIEWING_PERCENTAGE, returnView = RETURNING_VISITOR_PERCENTAGE, dataReloadRatio = PERCENTAGE_OF_DATA_LOADED_ON_SUBSEQUENT_LOAD) {
    if (options.dataReloadRatio || options.dataReloadRatio === 0) {
      dataReloadRatio = options.dataReloadRatio;
    }
    if (options.firstVisitPercentage || options.firstVisitPercentage === 0) {
      firstView = options.firstVisitPercentage;
    }
    if (options.returnVisitPercentage || options.returnVisitPercentage === 0) {
      returnView = options.returnVisitPercentage;
    }
    const energyBycomponent = this.energyPerByteByComponent(bytes);
    const cacheAdjustedSegmentEnergy = {};
    const energyValues = Object.values(energyBycomponent);
    for (const [key, value] of Object.entries(energyBycomponent)) {
      cacheAdjustedSegmentEnergy[`${key} - first`] = value * firstView;
      cacheAdjustedSegmentEnergy[`${key} - subsequent`] = value * returnView * dataReloadRatio;
    }
    return cacheAdjustedSegmentEnergy;
  }
  energyPerVisit(bytes) {
    let firstVisits = 0;
    let subsequentVisits = 0;
    const energyBycomponent = Object.entries(this.energyPerVisitByComponent(bytes));
    for (const [key, val] of energyBycomponent) {
      if (key.indexOf("first") > 0) {
        firstVisits += val;
      }
    }
    for (const [key, val] of energyBycomponent) {
      if (key.indexOf("subsequent") > 0) {
        subsequentVisits += val;
      }
    }
    return firstVisits + subsequentVisits;
  }
  emissionsPerVisitInGrams(energyPerVisit, carbonintensity = GLOBAL_GRID_INTENSITY) {
    return formatNumber(energyPerVisit * carbonintensity);
  }
  annualEnergyInKwh(energyPerVisit, monthlyVisitors = 1e3) {
    return energyPerVisit * monthlyVisitors * 12;
  }
  annualEmissionsInGrams(co2grams, monthlyVisitors = 1e3) {
    return co2grams * monthlyVisitors * 12;
  }
  annualSegmentEnergy(annualEnergy) {
    return {
      consumerDeviceEnergy: formatNumber(annualEnergy * END_USER_DEVICE_ENERGY),
      networkEnergy: formatNumber(annualEnergy * NETWORK_ENERGY),
      dataCenterEnergy: formatNumber(annualEnergy * DATACENTER_ENERGY),
      productionEnergy: formatNumber(annualEnergy * PRODUCTION_ENERGY)
    };
  }
  ratingScale(co2e) {
    return outputRating(co2e, this.version);
  }
};
var sustainable_web_design_v3_default = SustainableWebDesign;

// node_modules/@tgwf/co2/dist/esm/sustainable-web-design-v4.js
var __defProp2 = Object.defineProperty;
var __defProps2 = Object.defineProperties;
var __getOwnPropDescs2 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols2 = Object.getOwnPropertySymbols;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __propIsEnum2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp2 = (obj, key, value) => key in obj ? __defProp2(obj, key, {
  enumerable: true,
  configurable: true,
  writable: true,
  value
}) : obj[key] = value;
var __spreadValues2 = (a, b) => {
  for (var prop in b || (b = {})) if (__hasOwnProp2.call(b, prop)) __defNormalProp2(a, prop, b[prop]);
  if (__getOwnPropSymbols2) for (var prop of __getOwnPropSymbols2(b)) {
    if (__propIsEnum2.call(b, prop)) __defNormalProp2(a, prop, b[prop]);
  }
  return a;
};
var __spreadProps2 = (a, b) => __defProps2(a, __getOwnPropDescs2(b));
var {
  OPERATIONAL_KWH_PER_GB_DATACENTER,
  OPERATIONAL_KWH_PER_GB_NETWORK,
  OPERATIONAL_KWH_PER_GB_DEVICE,
  EMBODIED_KWH_PER_GB_DATACENTER,
  EMBODIED_KWH_PER_GB_NETWORK,
  EMBODIED_KWH_PER_GB_DEVICE,
  GLOBAL_GRID_INTENSITY: GLOBAL_GRID_INTENSITY2
} = SWDV4;
function outputSegments(operationalEmissions, embodiedEmissions) {
  const totalOperationalCO2e = operationalEmissions.dataCenter + operationalEmissions.network + operationalEmissions.device;
  const totalEmbodiedCO2e = embodiedEmissions.dataCenter + embodiedEmissions.network + embodiedEmissions.device;
  const dataCenterCO2e = operationalEmissions.dataCenter + embodiedEmissions.dataCenter;
  const networkCO2e = operationalEmissions.network + embodiedEmissions.network;
  const consumerDeviceCO2e = operationalEmissions.device + embodiedEmissions.device;
  return {
    dataCenterOperationalCO2e: operationalEmissions.dataCenter,
    networkOperationalCO2e: operationalEmissions.network,
    consumerDeviceOperationalCO2e: operationalEmissions.device,
    dataCenterEmbodiedCO2e: embodiedEmissions.dataCenter,
    networkEmbodiedCO2e: embodiedEmissions.network,
    consumerDeviceEmbodiedCO2e: embodiedEmissions.device,
    totalEmbodiedCO2e,
    totalOperationalCO2e,
    dataCenterCO2e,
    networkCO2e,
    consumerDeviceCO2e
  };
}
function getGreenHostingFactor(green, options) {
  if (green) {
    return 1;
  } else if ((options == null ? void 0 : options.greenHostingFactor) || (options == null ? void 0 : options.greenHostingFactor) === 0) {
    return options.greenHostingFactor;
  }
  return 0;
}
var SustainableWebDesign2 = class {
  constructor(options) {
    this.allowRatings = true;
    this.options = options;
    this.version = 4;
  }
  operationalEnergyPerSegment(bytes) {
    const transferedBytesToGb = bytes / file_size_default.GIGABYTE;
    const dataCenter = transferedBytesToGb * OPERATIONAL_KWH_PER_GB_DATACENTER;
    const network = transferedBytesToGb * OPERATIONAL_KWH_PER_GB_NETWORK;
    const device = transferedBytesToGb * OPERATIONAL_KWH_PER_GB_DEVICE;
    return {
      dataCenter,
      network,
      device
    };
  }
  operationalEmissions(bytes, options = {}) {
    const {
      dataCenter,
      network,
      device
    } = this.operationalEnergyPerSegment(bytes);
    let dataCenterGridIntensity = GLOBAL_GRID_INTENSITY2;
    let networkGridIntensity = GLOBAL_GRID_INTENSITY2;
    let deviceGridIntensity = GLOBAL_GRID_INTENSITY2;
    if (options == null ? void 0 : options.gridIntensity) {
      const {
        device: device2,
        network: network2,
        dataCenter: dataCenter2
      } = options.gridIntensity;
      if ((device2 == null ? void 0 : device2.value) || (device2 == null ? void 0 : device2.value) === 0) {
        deviceGridIntensity = device2.value;
      }
      if ((network2 == null ? void 0 : network2.value) || (network2 == null ? void 0 : network2.value) === 0) {
        networkGridIntensity = network2.value;
      }
      if ((dataCenter2 == null ? void 0 : dataCenter2.value) || (dataCenter2 == null ? void 0 : dataCenter2.value) === 0) {
        dataCenterGridIntensity = dataCenter2.value;
      }
    }
    const dataCenterEmissions = dataCenter * dataCenterGridIntensity;
    const networkEmissions = network * networkGridIntensity;
    const deviceEmissions = device * deviceGridIntensity;
    return {
      dataCenter: dataCenterEmissions,
      network: networkEmissions,
      device: deviceEmissions
    };
  }
  embodiedEnergyPerSegment(bytes) {
    const transferedBytesToGb = bytes / file_size_default.GIGABYTE;
    const dataCenter = transferedBytesToGb * EMBODIED_KWH_PER_GB_DATACENTER;
    const network = transferedBytesToGb * EMBODIED_KWH_PER_GB_NETWORK;
    const device = transferedBytesToGb * EMBODIED_KWH_PER_GB_DEVICE;
    return {
      dataCenter,
      network,
      device
    };
  }
  embodiedEmissions(bytes) {
    const {
      dataCenter,
      network,
      device
    } = this.embodiedEnergyPerSegment(bytes);
    const dataCenterGridIntensity = GLOBAL_GRID_INTENSITY2;
    const networkGridIntensity = GLOBAL_GRID_INTENSITY2;
    const deviceGridIntensity = GLOBAL_GRID_INTENSITY2;
    const dataCenterEmissions = dataCenter * dataCenterGridIntensity;
    const networkEmissions = network * networkGridIntensity;
    const deviceEmissions = device * deviceGridIntensity;
    return {
      dataCenter: dataCenterEmissions,
      network: networkEmissions,
      device: deviceEmissions
    };
  }
  perByte(bytes, green = false, segmented = false, ratingResults = false, options = {}) {
    if (bytes < 1) {
      return 0;
    }
    const operationalEmissions = this.operationalEmissions(bytes, options);
    const embodiedEmissions = this.embodiedEmissions(bytes);
    const greenHostingFactor = getGreenHostingFactor(green, options);
    const totalEmissions = {
      dataCenter: operationalEmissions.dataCenter * (1 - greenHostingFactor) + embodiedEmissions.dataCenter,
      network: operationalEmissions.network + embodiedEmissions.network,
      device: operationalEmissions.device + embodiedEmissions.device
    };
    const total = totalEmissions.dataCenter + totalEmissions.network + totalEmissions.device;
    let rating = null;
    if (ratingResults) {
      rating = this.ratingScale(total);
    }
    if (segmented) {
      const segments = __spreadValues2({}, outputSegments(operationalEmissions, embodiedEmissions));
      if (ratingResults) {
        return __spreadProps2(__spreadValues2({}, segments), {
          total,
          rating
        });
      }
      return __spreadProps2(__spreadValues2({}, segments), {
        total
      });
    }
    if (ratingResults) {
      return {
        total,
        rating
      };
    }
    return total;
  }
  perVisit(bytes, green = false, segmented = false, ratingResults = false, options = {}) {
    let firstViewRatio = 1;
    let returnViewRatio = 0;
    let dataReloadRatio = 0;
    const greenHostingFactor = getGreenHostingFactor(green, options);
    const operationalEmissions = this.operationalEmissions(bytes, options);
    const embodiedEmissions = this.embodiedEmissions(bytes);
    if (bytes < 1) {
      return 0;
    }
    if (options.firstVisitPercentage || options.firstVisitPercentage === 0) {
      firstViewRatio = options.firstVisitPercentage;
    }
    if (options.returnVisitPercentage || options.returnVisitPercentage === 0) {
      returnViewRatio = options.returnVisitPercentage;
    }
    if (options.dataReloadRatio || options.dataReloadRatio === 0) {
      dataReloadRatio = options.dataReloadRatio;
    }
    const firstVisitEmissions = operationalEmissions.dataCenter * (1 - greenHostingFactor) + embodiedEmissions.dataCenter + operationalEmissions.network + embodiedEmissions.network + operationalEmissions.device + embodiedEmissions.device;
    const returnVisitEmissions = (operationalEmissions.dataCenter * (1 - greenHostingFactor) + embodiedEmissions.dataCenter + operationalEmissions.network + embodiedEmissions.network + operationalEmissions.device + embodiedEmissions.device) * (1 - dataReloadRatio);
    const total = firstVisitEmissions * firstViewRatio + returnVisitEmissions * returnViewRatio;
    let rating = null;
    if (ratingResults) {
      rating = this.ratingScale(total);
    }
    if (segmented) {
      const segments = __spreadProps2(__spreadValues2({}, outputSegments(operationalEmissions, embodiedEmissions)), {
        firstVisitCO2e: firstVisitEmissions,
        returnVisitCO2e: returnVisitEmissions
      });
      if (ratingResults) {
        return __spreadProps2(__spreadValues2({}, segments), {
          total,
          rating
        });
      }
      return __spreadProps2(__spreadValues2({}, segments), {
        total
      });
    }
    if (ratingResults) {
      return {
        total,
        rating
      };
    }
    return total;
  }
  ratingScale(co2e) {
    return outputRating(co2e, this.version);
  }
};
var sustainable_web_design_v4_default = SustainableWebDesign2;

// node_modules/@tgwf/co2/dist/esm/co2.js
var __defProp3 = Object.defineProperty;
var __getOwnPropSymbols3 = Object.getOwnPropertySymbols;
var __hasOwnProp3 = Object.prototype.hasOwnProperty;
var __propIsEnum3 = Object.prototype.propertyIsEnumerable;
var __defNormalProp3 = (obj, key, value) => key in obj ? __defProp3(obj, key, {
  enumerable: true,
  configurable: true,
  writable: true,
  value
}) : obj[key] = value;
var __spreadValues3 = (a, b) => {
  for (var prop in b || (b = {})) if (__hasOwnProp3.call(b, prop)) __defNormalProp3(a, prop, b[prop]);
  if (__getOwnPropSymbols3) for (var prop of __getOwnPropSymbols3(b)) {
    if (__propIsEnum3.call(b, prop)) __defNormalProp3(a, prop, b[prop]);
  }
  return a;
};
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source) if (__hasOwnProp3.call(source, prop) && exclude.indexOf(prop) < 0) target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols3) for (var prop of __getOwnPropSymbols3(source)) {
    if (exclude.indexOf(prop) < 0 && __propIsEnum3.call(source, prop)) target[prop] = source[prop];
  }
  return target;
};
var CO2 = class {
  constructor(options) {
    this.model = new sustainable_web_design_v3_default();
    if ((options == null ? void 0 : options.model) === "1byte") {
      this.model = new byte_default();
    } else if ((options == null ? void 0 : options.model) === "swd") {
      this.model = new sustainable_web_design_v3_default();
      if ((options == null ? void 0 : options.version) === 4) {
        this.model = new sustainable_web_design_v4_default();
      }
    } else if (options == null ? void 0 : options.model) {
      throw new Error(`"${options.model}" is not a valid model. Please use "1byte" for the OneByte model, and "swd" for the Sustainable Web Design model.
See https://developers.thegreenwebfoundation.org/co2js/models/ to learn more about the models available in CO2.js.`);
    }
    if ((options == null ? void 0 : options.rating) && typeof options.rating !== "boolean") {
      throw new Error(`The rating option must be a boolean. Please use true or false.
See https://developers.thegreenwebfoundation.org/co2js/options/ to learn more about the options available in CO2.js.`);
    }
    const allowRatings = !!this.model.allowRatings;
    this._segment = (options == null ? void 0 : options.results) === "segment";
    this._rating = (options == null ? void 0 : options.rating) === true;
    if (!allowRatings && this._rating) {
      throw new Error(`The rating system is not supported in the model you are using. Try using the Sustainable Web Design model instead.
See https://developers.thegreenwebfoundation.org/co2js/models/ to learn more about the models available in CO2.js.`);
    }
  }
  perByte(bytes, green = false) {
    return this.model.perByte(bytes, green, this._segment, this._rating);
  }
  perVisit(bytes, green = false) {
    var _a;
    if ((_a = this.model) == null ? void 0 : _a.perVisit) {
      return this.model.perVisit(bytes, green, this._segment, this._rating);
    } else {
      throw new Error(`The perVisit() method is not supported in the model you are using. Try using perByte() instead.
See https://developers.thegreenwebfoundation.org/co2js/methods/ to learn more about the methods available in CO2.js.`);
    }
  }
  perByteTrace(bytes, green = false, options = {}) {
    const adjustments = parseOptions(options, this.model.version, green);
    const _a = adjustments, {
      gridIntensity
    } = _a, traceVariables = __objRest(_a, ["gridIntensity"]);
    const _b = traceVariables, {
      dataReloadRatio,
      firstVisitPercentage,
      returnVisitPercentage
    } = _b, otherVariables = __objRest(_b, ["dataReloadRatio", "firstVisitPercentage", "returnVisitPercentage"]);
    return {
      co2: this.model.perByte(bytes, green, this._segment, this._rating, adjustments),
      green,
      variables: __spreadValues3({
        description: "Below are the variables used to calculate this CO2 estimate.",
        bytes,
        gridIntensity: __spreadValues3({
          description: "The grid intensity (grams per kilowatt-hour) used to calculate this CO2 estimate."
        }, adjustments.gridIntensity)
      }, otherVariables)
    };
  }
  perVisitTrace(bytes, green = false, options = {}) {
    var _a;
    if ((_a = this.model) == null ? void 0 : _a.perVisit) {
      const adjustments = parseOptions(options, this.model.version, green);
      const _b = adjustments, {
        gridIntensity
      } = _b, variables = __objRest(_b, ["gridIntensity"]);
      return {
        co2: this.model.perVisit(bytes, green, this._segment, this._rating, adjustments),
        green,
        variables: __spreadValues3({
          description: "Below are the variables used to calculate this CO2 estimate.",
          bytes,
          gridIntensity: __spreadValues3({
            description: "The grid intensity (grams per kilowatt-hour) used to calculate this CO2 estimate."
          }, adjustments.gridIntensity)
        }, variables)
      };
    } else {
      throw new Error(`The perVisitTrace() method is not supported in the model you are using. Try using perByte() instead.
See https://developers.thegreenwebfoundation.org/co2js/methods/ to learn more about the methods available in CO2.js.`);
    }
  }
  SustainableWebDesignV3() {
    return new sustainable_web_design_v3_default();
  }
  SustainableWebDesignV4() {
    return new sustainable_web_design_v4_default();
  }
  OneByte() {
    return new byte_default();
  }
};
var co2_default = CO2;

// node_modules/@tgwf/co2/dist/esm/hosting-json.js
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = {
    exports: {}
  }).exports, mod), mod.exports;
};
var require_hosting_json = __commonJS({
  "src/hosting-json.js"(exports, module) {
    function check3(domain, db) {
      return __async(this, null, function* () {
        if (typeof domain === "string") {
          return checkInJSON(domain, db);
        } else {
          return checkDomainsInJSON(domain, db);
        }
      });
    }
    function checkInJSON(domain, db) {
      if (db.indexOf(domain) > -1) {
        return true;
      }
      return false;
    }
    function greenDomainsFromResults2(greenResults) {
      const entries = Object.entries(greenResults);
      const greenEntries = entries.filter(([key, val]) => val.green);
      return greenEntries.map(([key, val]) => val.url);
    }
    function checkDomainsInJSON(domains, db) {
      let greenDomains = [];
      for (let domain of domains) {
        if (db.indexOf(domain) > -1) {
          greenDomains.push(domain);
        }
      }
      return greenDomains;
    }
    function find(domain, db) {
      if (typeof domain === "string") {
        return findInJSON(domain, db);
      } else {
        return findDomainsInJSON(domain, db);
      }
    }
    function findInJSON(domain, db) {
      if (db.indexOf(domain) > -1) {
        return domain;
      }
      return {
        url: domain,
        green: false
      };
    }
    function findDomainsInJSON(domains, db) {
      const result = {};
      for (let domain of domains) {
        result[domain] = findInJSON(domain, db);
      }
      return result;
    }
    module.exports = {
      check: check3,
      greenDomainsFromResults: greenDomainsFromResults2,
      find
    };
  }
});
var hosting_json_default = require_hosting_json();

// node_modules/@tgwf/co2/dist/esm/hosting-api.js
function check(domain, optionsOrAgentId) {
  const options = typeof optionsOrAgentId === "string" ? {
    userAgentIdentifier: optionsOrAgentId
  } : optionsOrAgentId;
  if ((options == null ? void 0 : options.db) && options.verbose) {
    throw new Error("verbose mode cannot be used with a local lookup database");
  }
  if (typeof domain === "string") {
    return checkAgainstAPI(domain, options);
  } else {
    return checkDomainsAgainstAPI(domain, options);
  }
}
function checkAgainstAPI(_0) {
  return __async(this, arguments, function* (domain, options = {}) {
    const req = yield fetch(`https://api.thegreenwebfoundation.org/greencheck/${domain}`, {
      headers: getApiRequestHeaders(options.userAgentIdentifier)
    });
    if (options == null ? void 0 : options.db) {
      return hosting_json_default.check(domain, options.db);
    }
    const res = yield req.json();
    return options.verbose ? res : res.green;
  });
}
function checkDomainsAgainstAPI(_0) {
  return __async(this, arguments, function* (domains, options = {}) {
    try {
      const apiPath = "https://api.thegreenwebfoundation.org/v2/greencheckmulti";
      const domainsString = JSON.stringify(domains);
      const req = yield fetch(`${apiPath}/${domainsString}`, {
        headers: getApiRequestHeaders(options.userAgentIdentifier)
      });
      const allGreenCheckResults = yield req.json();
      return options.verbose ? allGreenCheckResults : greenDomainsFromResults(allGreenCheckResults);
    } catch (e) {
      return options.verbose ? {} : [];
    }
  });
}
function greenDomainsFromResults(greenResults) {
  const entries = Object.entries(greenResults);
  const greenEntries = entries.filter(([key, val]) => val.green);
  return greenEntries.map(([key, val]) => val.url);
}
var hosting_api_default = {
  check
};

// node_modules/@tgwf/co2/dist/esm/hosting.js
function check2(domain, optionsOrAgentId) {
  return hosting_api_default.check(domain, optionsOrAgentId);
}
var hosting_default = check2;

// node_modules/@tgwf/co2/dist/esm/data/marginal-intensities-2021.min.js
var data2 = {
  "AFG": "414",
  "ALB": "0",
  "DZA": "528",
  "ASM": "753",
  "AND": "188",
  "AGO": "1476",
  "AIA": "753",
  "ATG": "753",
  "ARG": "478",
  "ARM": "390",
  "ABW": "753",
  "AUS": "808",
  "AUT": "242",
  "AZE": "534",
  "AZORES (PORTUGAL)": "753",
  "BHS": "753",
  "BHR": "726",
  "BGD": "528",
  "BRB": "749",
  "BLR": "400",
  "BEL": "252",
  "BLZ": "403",
  "BEN": "745",
  "BMU": "753",
  "BTN": "0",
  "BOL": "604",
  "BES": "753",
  "BIH": "1197",
  "BWA": "1486",
  "BRA": "284",
  "VGB": "753",
  "BRN": "681",
  "BGR": "911",
  "BFA": "753",
  "BDI": "414",
  "KHM": "1046",
  "CMR": "659",
  "CAN": "372",
  "CYM": "753",
  "CPV": "753",
  "CAF": "188",
  "TCD": "753",
  "CHANNEL ISLANDS (U.K)": "753",
  "CHL": "657",
  "CHN": "899",
  "COL": "410",
  "COM": "753",
  "COD": "0",
  "COG": "659",
  "COK": "753",
  "CRI": "108",
  "CIV": "466",
  "HRV": "294",
  "CUB": "559",
  "CUW": "876",
  "CYP": "751",
  "CZE": "902",
  "DNK": "362",
  "DJI": "753",
  "DMA": "753",
  "DOM": "601",
  "ECU": "560",
  "EGY": "554",
  "SLV": "547",
  "GNQ": "632",
  "ERI": "915",
  "EST": "1057",
  "SWZ": "0",
  "ETH": "0",
  "FLK": "753",
  "FRO": "753",
  "FJI": "640",
  "FIN": "267",
  "FRA": "158",
  "GUF": "423",
  "PYF": "753",
  "GAB": "946",
  "GMB": "753",
  "GEO": "289",
  "DEU": "650",
  "GHA": "495",
  "GIB": "779",
  "GRC": "507",
  "GRL": "264",
  "GRD": "753",
  "GLP": "753",
  "GUM": "753",
  "GTM": "798",
  "GIN": "753",
  "GNB": "753",
  "GUY": "847",
  "HTI": "1048",
  "HND": "662",
  "HUN": "296",
  "ISL": "0",
  "IND": "951",
  "IDN": "783",
  "IRN": "592",
  "IRQ": "1080",
  "IRL": "380",
  "IMN": "436",
  "ISR": "394",
  "ITA": "414",
  "JAM": "711",
  "JPN": "471",
  "JOR": "529",
  "KAZ": "797",
  "KEN": "574",
  "KIR": "753",
  "PRK": "754",
  "KOR": "555",
  "XKX": "1145",
  "KWT": "675",
  "KGZ": "217",
  "LAO": "1069",
  "LVA": "240",
  "LBN": "794",
  "LSO": "0",
  "LBR": "677",
  "LBY": "668",
  "LIE": "151",
  "LTU": "211",
  "LUX": "220",
  "MDG": "876",
  "MADEIRA (PORTUGAL)": "663",
  "MWI": "489",
  "MYS": "551",
  "MDV": "753",
  "MLI": "1076",
  "MLT": "520",
  "MHL": "753",
  "MTQ": "753",
  "MRT": "753",
  "MUS": "700",
  "MYT": "753",
  "MEX": "531",
  "FSM": "753",
  "MDA": "541",
  "MCO": "158",
  "MNG": "1366",
  "MNE": "899",
  "MSR": "753",
  "MAR": "729",
  "MOZ": "234",
  "MMR": "719",
  "NAM": "355",
  "NRU": "753",
  "NPL": "0",
  "NLD": "326",
  "NCL": "779",
  "NZL": "246",
  "NIC": "675",
  "NER": "772",
  "NGA": "526",
  "NIU": "753",
  "MKD": "851",
  "MNP": "753",
  "NOR": "47",
  "OMN": "479",
  "PAK": "592",
  "PLW": "753",
  "PSE": "719",
  "PAN": "477",
  "PNG": "597",
  "PRY": "0",
  "PER": "473",
  "PHL": "672",
  "POL": "828",
  "PRT": "389",
  "PRI": "596",
  "QAT": "503",
  "REU": "772",
  "ROU": "489",
  "RUS": "476",
  "RWA": "712",
  "SHN": "753",
  "KNA": "753",
  "LCA": "753",
  "MAF": "753",
  "SPM": "753",
  "VCT": "753",
  "WSM": "753",
  "SMR": "414",
  "STP": "753",
  "SAU": "592",
  "SEN": "870",
  "SRB": "1086",
  "SYC": "753",
  "SLE": "489",
  "SGP": "379",
  "SXM": "753",
  "SVK": "332",
  "SVN": "620",
  "SLB": "753",
  "SOM": "753",
  "ZAF": "1070",
  "SSD": "890",
  "ESP": "402",
  "LKA": "731",
  "SDN": "736",
  "SUR": "1029",
  "SWE": "68",
  "CHE": "48",
  "SYR": "713",
  "TWN": "484",
  "TJK": "255",
  "TZA": "531",
  "THA": "450",
  "TLS": "753",
  "TGO": "859",
  "TON": "753",
  "TTO": "559",
  "TUN": "468",
  "TUR": "376",
  "TKM": "927",
  "TCA": "753",
  "TUV": "753",
  "UGA": "279",
  "UKR": "768",
  "ARE": "556",
  "GBR": "380",
  "USA": "416",
  "URY": "174",
  "UZB": "612",
  "VUT": "753",
  "VEN": "711",
  "VNM": "560",
  "VIR": "650",
  "YEM": "807",
  "ZMB": "416",
  "ZWE": "1575",
  "MEMO:  EU 27": "409"
};
var type2 = "marginal";
var year = "2021";
var marginal_intensities_2021_min_default = {
  data: data2,
  type: type2,
  year
};

// node_modules/@tgwf/co2/dist/esm/index.js
var src_default = {
  co2: co2_default,
  hosting: hosting_default,
  averageIntensity: average_intensities_min_default,
  marginalIntensity: marginal_intensities_2021_min_default
};
export {
  average_intensities_min_default as averageIntensity,
  co2_default as co2,
  src_default as default,
  hosting_default as hosting,
  marginal_intensities_2021_min_default as marginalIntensity
};
//# sourceMappingURL=@tgwf_co2.js.map
