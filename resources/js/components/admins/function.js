import axios from "axios";
const url = "http://127.0.0.1:8000/api/";
export const login = async adminData => {
    return await axios
        .post(url + "login?api_token=AhmedLimatrix", {
            email: adminData.email,
            password: adminData.password
        })
        .then(res => {
            localStorage.setItem("adminsToken", res.data.admin.api_token);
            return res.data.admin.api_token;
        })
        .catch(err => {
            console.log(err);
        });
};
////////////////////////////Auth To Get Tokken /////////////////
export const getToken = async adminData => {
    return await axios
        .get(url + `User?api_token=AhmedLimatrix`, {
            headers: {
                Authorization: `bearer${localStorage.adminsToken}`
            }
        })
        .then(res => {
            return res;
        });
};
//////////////////////////////// admin count ///////////////////////////
export const getAdminCount = async () => {
    return await axios
        .get(
            url +
                `Admin/Count?api_token=AhmedLimatrix&token=${localStorage.adminsToken}`
        )
        .then(res => {
            return res;
        });
};
//////////////////////////////// items count ///////////////////////////
export const getItemCount = async () => {
    return await axios
        .get(
            url +
                `Items/Count?api_token=AhmedLimatrix&token=${localStorage.adminsToken}`
        )
        .then(res => {
            return res;
        });
};
//////////////////////////////// categories count ///////////////////////////
export const getCategoriesCount = async () => {
    return await axios
        .get(
            url +
                `Category/Count?api_token=AhmedLimatrix&token=${localStorage.adminsToken}`
        )
        .then(res => {
            return res;
        });
};
//////////////////////////////// users count ///////////////////////////
export const getUsersCount = async () => {
    return await axios
        .get(
            url +
                `Users/Count?api_token=AhmedLimatrix&token=${localStorage.adminsToken}`
        )
        .then(res => {
            return res;
        });
};
