//HOSTNAME
const NO_IP_PROVIDED_HOSTNAME = "http://spesecasa.ddns.net:8000";
const CORS_ANY_WHERE_PREFIX = "https://cors-anywhere.herokuapp.com";
export const SESSION_STORAGE_HOST_TYPE_KEY = "commonHostType";
export const SESSION_STORAGE_HOSTNAME_KEY = "commonHostname";
export const MOCKED_HOST_NAME = "http://localhost:4000";
export const LOCAL_BE_HOST_NAME = "http://localhost:8080";
export const PASSPARTOUT_HOSTNAME = `${CORS_ANY_WHERE_PREFIX}/${NO_IP_PROVIDED_HOSTNAME}`;

export const HOSTNAME_VALUES = {
  PASSPARTOUT:"PASSPARTOUT",
  LOCAL_BE: "LOCAL_BE",
  LOCAL_MOCK_BE: "LOCAL_MOCK_BE",
  CUSTOM: "CUSTOM"
};
export const HOSTNAME_OPTIONS = [
  HOSTNAME_VALUES.PASSPARTOUT,
  HOSTNAME_VALUES.LOCAL_BE,
  HOSTNAME_VALUES.LOCAL_MOCK_BE,
  HOSTNAME_VALUES.CUSTOM
];

//FEEDBACK
export const ALERT_TYPE_ERROR = "error";
export const ALERT_TYPE_SUCCESS = "success";
export const ALERT_TYPE_INFO = "info";
