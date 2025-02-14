//const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9_ ]{3,23}$/;
const USER_REGEX = /^[a-zA-Z ]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const CASE_NUMBER_REGEX = /^[0-9]{1,4}\/[0-9]{4}$/;
const CHAR_REGEX = /^[A-Za-z ,.'-]+$/;
const SEC_REGEX = /^[^ ][a-zA-Z0-9 ,]*$/;
const DATE_REGEX = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0,1,2])\/(19|20)\d{2}$/;
const CHAR_REGEX_COURT_NAME = /^[^ ][A-Za-z &]+$/;
const CHAR_REGEX_CASE_CAT = /^[^ ][A-Za-z ( )]+$/;
const ONLY_CHAR_REGEX = /^[^ ][A-Za-z ]+$/;

const ONLY_NUMBER = /^[0-9]{1,4}$/;
const NUMBER_DECIMAL = /^([0-9]{2,6})(\.[0-9]{1,2})$/;
const ALPHA_NUMERIC = /^[a-zA-Z0-9.-]{3,23}$/;
const ONLY_INTEGER = /^[0-9]{1,4}$/;
const DOUBLE_TYPE = /^[0-9]\d*(\.\d{1,2})?$/;
const NOT_SPECIAL_CHAR = /^[a-zA-Z0-9 .-]{3,35}$/;
const DIRECTION = /^[a-zA-Z0-9 '^0.-]{3,35}$/;
const VALID_YEAR = /^[0-9]{4}$/;

export {
   USER_REGEX, PWD_REGEX,
   EMAIL_REGEX, CASE_NUMBER_REGEX, CHAR_REGEX,
   SEC_REGEX, DATE_REGEX, CHAR_REGEX_COURT_NAME, CHAR_REGEX_CASE_CAT, ONLY_CHAR_REGEX, ONLY_NUMBER,
   NUMBER_DECIMAL, ALPHA_NUMERIC, ONLY_INTEGER, DOUBLE_TYPE, NOT_SPECIAL_CHAR, DIRECTION, VALID_YEAR
};