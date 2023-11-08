export const getCookie = (name: string): string | undefined => { // https://stackoverflow.com/a/15724300
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

export const fetchToken = (email: FormDataEntryValue | null, password: FormDataEntryValue | null) => {
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
    fetch("http://localhost:3030/api/login", requestOptions)
        .then(response => {
            if (response.ok) {
                window.location.href = '/'
                //logout()
            } else {
                alert("NOT OK")
            }
        })
        .catch(error => console.log('error', error));
}

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

    const res = await fetch("http://127.0.0.1:3030/api/signup", requestOptions);
    if (res.ok) {
        fetchToken(email, password);
    } else {
        // TODO: Do something for UI when wrong info? or we can handle validation on client side?
        const json = await res.json()
        console.log(json.message)
    }

}

export const logout = async () => {
    const myHeaders = new Headers();
    myHeaders.append("X-CSRF-TOKEN", getCookie("csrf_access_token") ?? '') //https://stackoverflow.com/a/72438432

    const requestOptions: RequestInit = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow',
        mode: 'cors',
        credentials: 'include'
    };
    const res = await fetch("http://localhost:3030/api/logout", requestOptions)
    return res.ok
}