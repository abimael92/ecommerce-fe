import { useState } from 'react';

export function useConfirm(initialState = false) {
    const [isConfirmed, setIsConfirmed] = useState(initialState);

    const confirm = () => setIsConfirmed(true);
    const cancel = () => setIsConfirmed(false);

    return { isConfirmed, confirm, cancel };
}
