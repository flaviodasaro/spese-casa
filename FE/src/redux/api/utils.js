import axios from "axios";

const handleApiresult = (promise, onSuccess, onFailure) =>
  promise.then(onSuccess).catch(onFailure);

export const performGet = (url, queryParams, onSuccess, onFailure) => {
  return handleApiresult(
    axios.get(url, { params: queryParams || {} }),
    onSuccess,
    onFailure
  );
};
