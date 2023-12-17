const BASE_URL = 'https://law-backend.up.railway.app/api';

export interface create {
    name: string;
    username: string;
    email: string;
    phone_number: string;
    address: string;
    region: string;
    password: string;
}

export interface userId {

    id: number;

}

export const fetchAllLawyers = async () => {
    const token = sessionStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/Admin/Lawyers`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
    });

    if (!response.ok) {
        throw new Error(`Login failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;
}

export const fetchAllUsers = async () => {
    const token = sessionStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/Admin/Users`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
    });

    if (!response.ok) {
        throw new Error(`Login failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;
}


export const fetchLawyerInfo = async (id:userId) => {
    const token = sessionStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/Admin/View/${id}`, {
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

export const editLawyerInfo = async (id: userId, body: create) => {
    const token = sessionStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/Admin/Edit/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        throw new Error(`Login failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;
}

export const deleteLawyerinfo = async (id:userId) => {
    const token = sessionStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/Admin/Delete/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error(`Login failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;
}



export const createLawyer = async (body: Body) => {
    const token = sessionStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/Admin/Lawyer`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        throw new Error(`Login failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;
}

export const loggedIn = async () => {
    const token = sessionStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/Admin/Auth`, {
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

export const dashboard = async () => {
    const token = sessionStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/Admin/Dashboard`, {
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



