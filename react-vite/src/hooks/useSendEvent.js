import {useCallback} from 'react';
import {emitter} from '../events';

export function useSendEvent() {
    return useCallback((event, data = {}) => {
        emitter.emit(event, data);
    }, []);
}
