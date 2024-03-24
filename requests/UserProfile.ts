"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import UserType from "@/types/user-type";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function useFetchUserProfile() {
    const [user, setUser] = useState<UserType>();
    const router = useRouter();
    const pathName = usePathname()
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = Cookies.get("accessToken");
                if (!token) {
                    throw new Error("No access token found in cookies. User is not authenticated.");
                }
                const response = await fetch("http://localhost:8000/auth/profile", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error(`Unable to fetch user profile. Server responded with status: ${response.status}`);
                }
                setUser(await response.json());
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };
        if (!user) {
            fetchUserProfile();
        }
    }, [user, router, pathName]);
    return user;
}