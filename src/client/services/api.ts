const TOKEN_KEY = "token";
const TOKEN = localStorage.getItem(TOKEN_KEY);

const fetcher = async (path: string, method = "GET", data = {}) => {
    const headers: { [key: string]: string } = {
        Authorization: `Bearer ${TOKEN}`
    };

    const fetchOptions: RequestInit = {
        method,
        headers
    };

    if (method === "POST" || method === "PUT") {
        headers["Content-Type"] = "application/json";
        fetchOptions["body"] = JSON.stringify(data);
    }

    return fetch(`${path}`, fetchOptions);
};

export const GET = (path: string) => fetcher(path);
export const POST = (path: string, data: {}) => fetcher(path, "POST", data);
export const PUT = (path: string, data: {}) => fetcher(path, "PUT", data);
export const DELETE = (path: string) => fetcher(path, "DELETE");
