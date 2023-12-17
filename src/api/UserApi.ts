import { userId } from "./AdminApi";

const BASE_URL = 'https://law-backend.up.railway.app/api';

export interface search {
  search: string;
}

export const fetchChats = async (id:userId) => {
    const token = sessionStorage.getItem('token');
    
    const response = await fetch(`${BASE_URL}/Chat/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
        throw new Error(`failed ${response.status}`);
    }

    const data = await response.json();
    return data;
}

export const fetchChatHistory = async () => {
  const token = sessionStorage.getItem('token');
    
    const response = await fetch(`${BASE_URL}/Chats`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
        throw new Error(`failed ${response.status}`);
    }

    const data = await response.json();
    return data;
}

export const deleteChatHistory = async (id:userId) => {
  const token = sessionStorage.getItem('token');
    
    const response = await fetch(`${BASE_URL}/Chat/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
        throw new Error(`failed ${response.status}`);
    }
}

export const fetchLawyer = async (search:search) => {
  const token = sessionStorage.getItem('token');
  const response = await fetch(`${BASE_URL}/User/Lawyers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      search: search
    }),
  });
  if (!response.ok) {
      throw new Error(`failed ${response.status}`);
  }
  const data = await response.json();
  return data;
}


export const fetchLawyerInfo = async (id:userId) => {
  const token = sessionStorage.getItem('token');
  const response = await fetch(`${BASE_URL}/User/Lawyers/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  if (!response.ok) {
      throw new Error(`failed ${response.status}`);
  }
  const data = await response.json();
  return data;
}