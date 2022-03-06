export const fetchData = async () => {
    const API = "http://127.0.0.1:5000/";
    const res = await fetch(API, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
    });
    const data = await res.json();
    return data;
};

export const getPropsServerSide = async () => {
    const data = await fetchData();
    return {
        props: {
            data
        }
    }
};

