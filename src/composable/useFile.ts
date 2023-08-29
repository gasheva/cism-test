export const useFile = () => {
    const generateTxtBlob = (data: string) => {
        return new Blob([data], {type: 'text/plain'});
    }
    const downloadBlobAsFile = (blob: Blob, filename?: string) => {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        if(filename){
            link.download = filename;
        }
        link.click();
    }

    return {generateTxtBlob, downloadBlobAsFile};
}