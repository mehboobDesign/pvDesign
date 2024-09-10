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

 export {USER_REGEX, PWD_REGEX, 
    EMAIL_REGEX, CASE_NUMBER_REGEX, CHAR_REGEX, 
    SEC_REGEX, DATE_REGEX, CHAR_REGEX_COURT_NAME,CHAR_REGEX_CASE_CAT, ONLY_CHAR_REGEX};