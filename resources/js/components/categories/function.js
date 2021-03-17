import axios from "axios";
const url = "http://127.0.0.1:8000/api/";
export const addcategory = async FormData => {
    return await axios
        .post(
            url +
                `Add/Category/?api_token=AhmedLimatrix&token=${localStorage.adminsToken}`,
            FormData
        )
        .then(res => {
            console.log(res);
            return res;
        });
};
export const getCategories = async () => {
    return await axios
        .get(
            url +
                `Categories/?api_token=AhmedLimatrix&token=${localStorage.adminsToken}`
        )
        .then(res => {
            return res;
        });
};
export const getitem = async id => {
    return await axios
        .get(
            url +
                `get/items/${id}?api_token=AhmedLimatrix&token=${localStorage.adminsToken}`
        )
        .then(res => {
            console.log(res);
            return res;
        });
};
export const handelChange = async pageNumber => {
    return await axios
        .get(
            url +
                `Categories?page=${pageNumber}&api_token=AhmedLimatrix&&token=${localStorage.adminsToken}`,

            {
                headers: {
                    Authorization: `bearer${localStorage.adminsToken}`
                }
            }
        )
        .then(res => {
            console.log(res);
            return res;
        });
};
export const deleteCategories = async id => {
    return await axios
        .post(
            url +
                `delete/category/${id}?api_token=AhmedLimatrix&&token=${localStorage.adminsToken}`,

            {
                headers: {
                    Authorization: `bearer${localStorage.adminsToken}`
                }
            }
        )
        .then(res => {
            console.log(res);
            return res;
        });
};
export const editcategories = async id => {
    return await axios
        .get(
            url +
                `edit/category/${id}?api_token=AhmedLimatrix&&token=${localStorage.adminsToken}`,

            {
                headers: {
                    Authorization: `bearer${localStorage.adminsToken}`
                }
            }
        )
        .then(res => {
            console.log(res);
            return res;
        });
};
export const updatecategories = async (id, FormData) => {
    return await axios
        .post(
            url +
                `update/category/${id}?api_token=AhmedLimatrix&&token=${localStorage.adminsToken}`,
            FormData,

            {
                headers: {
                    Authorization: `bearer${localStorage.adminsToken}`
                }
            }
        )
        .then(res => {
            console.log(res);
            return res;
        });
};
