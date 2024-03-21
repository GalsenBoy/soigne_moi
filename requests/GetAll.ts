import Cookies from "js-cookie";

type getAllType = {
    endpoint: string;
    setter: (data: any) => void;
}
export default async function getAllData({ endpoint, setter }: getAllType) {
    try {
        const token = Cookies.get("accessToken");
        if (!token) {
            throw new Error("No token found");
        }
        const response = await fetch(`http://localhost:8000/${endpoint}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
        console.log("success", response);
        setter(await response.json());
    } catch (error) {
        console.error(error);
    }

}