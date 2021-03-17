import axios from "axios";
const url = "http://127.0.0.1:8000/api/";
export const additems = async (admin_id, formData) => {
    return await axios
        .post(
            url +
                `create/items?api_token=AhmedLimatrix&token=${localStorage.adminsToken}` +
                admin_id,
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
export const getitems = async () => {
    return await axios
        .get(
            url +
                `items?api_token=AhmedLimatrix&token=${localStorage.adminsToken}`,

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
export const edititems = async id => {
    return await axios
        .get(
            url +
                `edit/item/${id}?api_token=AhmedLimatrix&token=${localStorage.adminsToken}`
        )
        .then(res => {
            console.log(res);
            return res;
        });
};
export const updateitems = async (id, formData) => {
    return await axios
        .post(
            url +
                `update/item/${id}?api_token=AhmedLimatrix&token=${localStorage.adminsToken}` +
                id,
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
export const deleteitems = async id => {
    return await axios
        .delete(
            url +
                `delete/item/${id}?api_token=AhmedLimatrix&token=${localStorage.adminsToken}`
        )
        .then(res => {
            console.log(res);
            return res;
        });
};
