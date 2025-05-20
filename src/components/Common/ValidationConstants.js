//const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9_ ]{3,23}$/;
const USER_REGEX = /^[a-zA-Z ]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const CASE_NUMBER_REGEX = /^[0-9]{1,4}\/[0-9]{4}$/;
const CHAR_REGEX = /^[A-Za-z0-9 ,.'-]+$/;
const SEC_REGEX = /^[^ ][a-zA-Z0-9 ,]*$/;
const DATE_REGEX = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0,1,2])\/(19|20)\d{2}$/;
const CHAR_REGEX_COURT_NAME = /^[^ ][A-Za-z &]+$/;
const CHAR_REGEX_CASE_CAT = /^[^ ][A-Za-z ( )]+$/;
const ONLY_CHAR_REGEX = /^[^ ][A-Za-z ]+$/;

const ONLY_NUMBER = /^[0-9]{1,4}$/;
const NUMBER_DECIMAL = /^([0-9]{1,6})(\.[0-9]{1,6})$/;
const ALPHA_NUMERIC = /^[ a-zA-Z0-9.-]{3,23}$/;
const ONLY_INTEGER = /^[0-9]{1,7}$/;
const DOUBLE_TYPE = /^[0-9]\d*(\.\d{1,5})?$/;
const NOT_SPECIAL_CHAR = /^[a-zA-Z0-9 .-]{3,50}$/;
const DIRECTION = /^[a-zA-Z0-9 '^0.-]{3,35}$/;
const VALID_YEAR = /^[0-9]{4}$/;

const ONE_TO_100 = /^(100(\.0+)?|(\d{1,2}))$/;

const IRRADIATION_DATAS = [
   {
      "year": 2024,
      "month": "January",
      "glob_hor": 110.4,
      "glob_inc": 141.2,
   },
   {
      "year": 2024,
      "month": "February",
      "glob_hor": 112,
      "glob_inc": 132.2,
   },
   {
      "year": 2024,
      "month": "March",
      "glob_hor": 149.9,
      "glob_inc": 162.6,
   },
   {
      "year": 2024,
      "month": "April",
      "glob_hor": 142.1,
      "glob_inc": 144.4,
   },
   {
      "year": 2024,
      "month": "May",
      "glob_hor": 142.7,
      "glob_inc": 137.5,
   },
   {
      "year": 2024,
      "month": "June",
      "glob_hor": 136.3,
      "glob_inc": 128.4,
   },
   {
      "year": 2024,
      "month": "July",
      "glob_hor": 129.4,
      "glob_inc": 122.8,
   },
   {
      "year": 2024,
      "month": "August",
      "glob_hor": 142.4,
      "glob_inc": 140.4,
   },
   {
      "year": 2024,
      "month": "September",
      "glob_hor": 129.8,
      "glob_inc": 136.3,
   },
   {
      "year": 2024,
      "month": "October",
      "glob_hor": 124.8,
      "glob_inc": 140.7,
   },
   {
      "year": 2024,
      "month": "November",
      "glob_hor": 123.1,
      "glob_inc": 156.6,
   },
   {
      "year": 2024,
      "month": "December",
      "glob_hor": 111.2,
      "glob_inc": 148.1,
   }
];
const GLOBAL_IRRADATION_DATA = {
   "year": 2024,
   "globalIncident": 108.82,
   "irradianceLoss": 98.39,
   "iam_factor": 99.75,
   "soilingLoss": 97.66,
   "groundReflection": 100.00
}

export {
   USER_REGEX, PWD_REGEX,
   EMAIL_REGEX, CASE_NUMBER_REGEX, CHAR_REGEX,
   SEC_REGEX, DATE_REGEX, CHAR_REGEX_COURT_NAME, CHAR_REGEX_CASE_CAT, ONLY_CHAR_REGEX, ONLY_NUMBER,
   NUMBER_DECIMAL, ALPHA_NUMERIC, ONLY_INTEGER, DOUBLE_TYPE, NOT_SPECIAL_CHAR, DIRECTION, VALID_YEAR,
   IRRADIATION_DATAS, ONE_TO_100, GLOBAL_IRRADATION_DATA
};