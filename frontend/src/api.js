const BASE_URL = "http://localhost:8081/api";

export async function fetchData(endpoint) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    if (!response.ok) throw new Error("Network response was not ok");
    return response.json();
}

export async function postData(endpoint, data) {
    const token = localStorage.getItem("token");
    console.log("TEEEST" + token);
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Network response was not ok");
    return response.json();
}

export async function putData(endpoint, data) {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Network response was not ok");
    return response.json();
}

export async function deleteData(endpoint, data) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Network response was not ok");
    return response.json();
}
