import { useState, useEffect } from 'react'

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();

        fetch(url, { signal: abortCont.signal })
            .then(res => {
                if (!res.ok) throw Error("Could not fetch resource data");
                return res.json();
            })
            .then(data => { // 'data' in this line is local to the block, different to the data state variable
                setData(data);                
                setIsPending(false);                
                setError(null);     
            })
            .catch((err) => {
                if (err.name === "AbortError") console.log("Fetch aborted");
                else {
                    setIsPending(false);  
                    setError(err.message);
                };                    
            })

        return () => abortCont.abort();
    }, [url]);

    return { data, isPending, error }
}

export default useFetch;