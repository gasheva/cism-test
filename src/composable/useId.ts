export const useId = () => {
    const generateId = () => Date.now();

    return {generateId};
}