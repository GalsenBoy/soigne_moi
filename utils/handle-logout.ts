import Cookies from "js-cookie";
export const handleLogout = () => {
    Cookies.remove("accessToken");
    window.location.href = "/";
};