import {useEffect} from 'react';
import {emitter} from "../events";

export function useOnEvent(event, callback) {
    useEffect(() => {
        //Normalize events to array
        const events = Array.isArray(event) ? event : [event];

        //Add event listeners
        events.forEach(event => {
            emitter.on(event, (data) => callback(event, data));
        });

        //Cleanup subscriptions
        return () => {
            events.forEach(event => {
                emitter.off(event, (data) => callback(event, data));
            });
        };
    }, [event, callback]);

    return emitter;
}
