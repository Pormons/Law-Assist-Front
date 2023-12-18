import { create } from "./AdminApi";

const BASE_URL = 'https://law-backend.up.railway.app/api';

interface loginBody {
    username: string;
    password: string;
}

export const login = async (body: loginBody) => {

    const response = await fetch(`${BASE_URL}/Login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        throw new Error(`Login failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;
}

export const logout = async () => {
    const token = sessionStorage.getItem('token');

    const response = await fetch(`${BASE_URL}/Logout`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
    });

    if (!response.ok) {
        throw new Error(`Signup failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;
}



export const signup = async (body: create) => {

    const response = await fetch(`${BASE_URL}/Signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        throw new Error(`Signup failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;
}