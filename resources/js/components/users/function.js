import axios from "axios";
const url = "http://127.0.0.1:8000/api/";
export const Addusers = async formData => {
    return await axios
        .post(
            url +
                `Add/user?api_token=AhmedLimatrix&token=${localStorage.adminsToken}`,
            formData,
            {
                headers: {
                    Authorization: `bearer ${localStorage.adminsToken}`
                }
            }
        )
        .then(res => {
            console.log(res);
            return res;
        });
};
export const getusers = async () => {
    return await axios
        .get(
            url +
                `users?api_token=AhmedLimatrix&token=${localStorage.adminsToken}`,

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
export const handelChange = async pageNumber => {
    return await axios
        .get(
            url +
                `items?page=${pageNumber}&api_token=AhmedLimatrix&&token=${localStorage.adminsToken}`,

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
export const deleteusers = async id => {
    return await axios
        .delete(
            url +
                `delete/users/${id}?api_token=AhmedLimatrix&token=${localStorage.adminsToken}`
        )
        .then(res => {
            return res;
        });
};
export const editUsers = async id => {
    return await axios
        .get(
            url +
                `edit/user/${id}?api_token=AhmedLimatrix&token=${localStorage.adminsToken}`
        )
        .then(res => {
            return res;
        });
};
export const UpdateUsers = async (id, formData) => {
    return await axios
        .post(
            url +
                `update/user/${id}?api_token=AhmedLimatrix&token=${localStorage.adminsToken}`,
            formData
        )
        .then(res => {
            console.log(res);
            return res;
        });
};


