import axios from "axios";
import { urls } from "../helpers/common";

export const getAllStory = async () => {
  try {
    const data = await axios.get(`${urls.BASE_URL}get-all-post`);
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getStoryApi = async (postId) => {
  try {
    const data = await axios.get(`${urls.BASE_URL}get-post/${postId}`);
    console.log(data);
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const addViews = async (postId) => {
  try {
    const data = await axios.post(`${urls.BASE_URL}view-post/${postId}`);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const addStory = async (storyData) => {
  try {
    const data = await axios.post(`${urls.BASE_URL}add-post`, storyData);
    return data
  } catch (error) {
    console.log(error);
  }
};

export const addCommentApi = async (commentData , postId) => {
  try {
    const data = await axios.post(`${urls.BASE_URL}add-comment/${postId}`, commentData);
    return data
  } catch (error) {
    console.log(error);
  }
};
