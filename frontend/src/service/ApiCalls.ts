const hostName = 'http://' + location.hostname +':8080/api'
export const signup = async (email: FormDataEntryValue | null, password: FormDataEntryValue | null) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "email": email,
        "password": password
    });

    const requestOptions: RequestInit = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    const res = await fetch(hostName + "/auth/signup", requestOptions);
    if (res.ok) {
        login(email, password);
    } else {
        // For future, forward error message to ui?
        const json = await res.json()
        console.log(json.message)
    }

}
export const login = async (email: FormDataEntryValue | null, password: FormDataEntryValue | null) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "email": email,
        "password": password
    });

    const requestOptions: RequestInit = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        mode: 'cors',
        redirect: 'follow',
        credentials: 'include'
    };
    const response = await fetch(hostName + "/auth/login", requestOptions);
    const json = await response.json();
    if (response.ok) {
        localStorage.setItem('access_token', json['access_token']);
        window.location.href = '/'
    }
}


// TODO: Fix logout on server side (either implement token invalidation etc)
// export const logout = async () => {
//     const myHeaders = new Headers();
//     myHeaders.append("X-CSRF-TOKEN", getCookie("csrf_access_token") ?? '') //https://stackoverflow.com/a/72438432
//
//     const requestOptions: RequestInit = {
//         method: 'POST',
//         headers: myHeaders,
//         redirect: 'follow',
//         mode: 'cors',
//         credentials: 'include'
//     };
//     const res = await fetch(new URL(hostName + "/auth/logout"), requestOptions)
//     return res.ok
// }