import { useState, useEffect } from "react";

export function useFetch (url){
    try{
        const [data, setData] = useState(null);

        useEffect(() => {
            fetch(url)
            .then((res) => res.json())
            .then((data) => setData(data));
        }, [url]);

        return [data];
    } catch(error){
        throw error;
    }
};

export function useFetchPost (url, options){
    try {
        const [data, setData] = useState(null);

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await fetch(url, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(options.body),
                    });

                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }

                    const responseData = await response.json();
                    setData(responseData);

                    return(await response.json())
                } catch (error) {
                    console.error("Error fetching data:", error);
                    throw new Error("Error fetching data: " + error);
                }
            };

            fetchData();
        }, [url, options]);

        return [data];
    } catch (error) {
        throw error;
    }
};