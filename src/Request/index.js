import axios from "axios";

export const getAllComments = async () => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/comments"
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getFirstHundredComments = async () => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/comments?_limit=100"
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
