const API = "http://localhost:4000/v1"

async function getProjects(limit = 100, skip = 0) {
    const req = await fetch(`${API}/project?limit=${limit}&skip=${skip}`)
    return req.json()
}

async function getProjectById(id) {
    const req = await fetch(`${API}/project/${id}`)
    return req.json()
}

async function removeProjectById(token, project_id) {
    const req = await fetch(`${API}/project/${project_id}`, {
        method: 'DELETE',
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    return req.status
}

async function updateProjectById(token, project_id, update_field) {
    const req = await fetch(`${API}/project/${project_id}`, {
        method: 'PUT',
        body: JSON.stringify({
            ...update_field
        }),
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    return req.status
}


async function getProjectByUserId(user_id) {
    const req = await fetch(`${API}/user/${user_id}/projects`)
    return req.json()
}

async function getSupportById(project_id) {
    const req = await fetch(`${API}/support/${project_id}`)
    return req.json()
}

async function getUserById(user_id) {
    const req = await fetch(`${API}/user/${user_id}`)
    return req.json()
}

async function login(username, password) {
    const req = await fetch(`${API}/login`, {
        method: 'POST',
        body: JSON.stringify({
            username,
            password
        }),
        headers: {
            "Content-type": "application/json"
        }
    })
    if (req.status === 200) {
        return await req.json()
    } else {
        throw new Error(`Status code: ${req.status}`)
    }
}

async function donate(token, project_id, value) {
    const req = await fetch(`${API}/support`, {
        method: 'POST',
        body: JSON.stringify({
            project_id,
            value
        }),
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    return req.status
}

export {
    getProjects,
    getProjectById,
    getProjectByUserId,
    removeProjectById,
    updateProjectById,
    getSupportById,
    getUserById,
    login,
    donate
}