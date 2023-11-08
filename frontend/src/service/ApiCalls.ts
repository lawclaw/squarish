function getCookie(name: string) {
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
        credentials: "include"
    };
    fetch("http://localhost:3030/api/login", requestOptions)
        .then(response => {
            if (response.ok) {
                window.location.href = '/'
            } else {
                alert("NOT OK")
            }
        })
        .catch(error => console.log('error', error));
}

export const signup = (email: FormDataEntryValue | null, password: FormDataEntryValue | null) => {
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

    fetch("http://127.0.0.1:3030/api/signup", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}