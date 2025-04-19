import {useEffect} from 'react';
import {emitter} from "../events";

export function useOnEvent(event, callback) {
    useEffect(() => {
        // Add event listener
        emitter.on(event, callback);

        // Cleanup subscription
        return () => emitter.off(event, callback);
    }, [event, callback]);

    return emitter;
}
