const API_URL = 'http://localhost:4567'; // Backend ruby port

export const api = {

    getPosts: async function() {
        const response = await fetch(`${API_URL}/posts`, {
            method: 'GET'
        });
        return response.json();
    },
    createPost: async function(title: string, content: string) {
        const response = await fetch(`${API_URL}/posts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content})
        });
        return response.json();
    },
    login: async function(email: string, password: string) {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password})
        });
        return response.json();
    }

};