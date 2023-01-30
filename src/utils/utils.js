import axios from "axios";
const url = "http://localhost:5000";

const removeDuplicatedCalues = (arr) => {
  return arr.filter((item, index) => arr.indexOf(item) === index);
};

const getAll = async(urlPath)=>{
  const res = await axios.get(`${url}/${urlPath}`)
  return res
}

const getAllUsers = async()=>{
  const res = await axios.get(`${url}/users`,{headers:{"x-access-token":sessionStorage["token"]}})
  const users = res.data.users
  return users;
}

const getMovies = async () => {
  const res = await axios.get(`${url}/movies`, {
    headers: { "x-access-token": sessionStorage["token"] },
  });
  const movies = res.data;
 
  return movies;
};

const getCurrentUserData = async () => {
  const res = await axios.get(`${url}/users/${sessionStorage["userId"]}`, {
    headers: { "x-access-token": sessionStorage["token"] },
  });
  const user = await res.data.user;
  return user;
};

const deleteItem = async (urlPath, itemId) => {
  const res = await axios.delete(`${url}/${urlPath}/${itemId}`, {
    headers: { "x-access-token": "text/json" },
  });
  return res;
};

const removeDuplicatedValuesFrom2Arrays = (arr1, arr2) => {
  let result = arr1.filter((x) => !arr2.includes(x));
  return result;
};

const deleteTrim = (e) => {
  let values = e.target.value;
  let array = values.split(",").map((item) => item.trim());
  console.log(array)
  return array;
};

const createNewItem = async (urlPath, newItem) => {
  const res = await axios.post(`${url}/${urlPath}`, newItem, {
    headers: { "x-access-token": "text/json" },
  });
};

const updateItem = async (urlPath, itemId, obj) => {
  const res = await axios
    .put(`${url}/${urlPath}/${itemId}`, obj, {
      headers: { "x-access-token": "text/json" },
    })
    .then(() => alert("Updated!"))
    .catch(() => alert("error"));
};



export {
  removeDuplicatedCalues,
  createNewItem,
  getMovies,
  getCurrentUserData,
  deleteItem,
  removeDuplicatedValuesFrom2Arrays,
  deleteTrim,
  updateItem,
  getAll,
  getAllUsers,
};
