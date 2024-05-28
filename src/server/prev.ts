"use client"
import { useEffect, useRef } from "react";

function usePrevious(value:any) {
    const ref = useRef();
    useEffect(() => {
        if (value !== undefined) {
            ref.current = value || '';
        }
    }, [value]);
    return ref.current; //in the end, return the current ref value.
}
export default usePrevious;