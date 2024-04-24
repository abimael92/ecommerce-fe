import { ENV, authFetch } from "@/utils";

// Function to upload file to Strapi media library
export const uploadFileToStrapi = async (file) => {
    const formData = new FormData();
    formData.append('files', file);

    try {
        const response = await authFetch(`${ENV.SERVER_HOST}api/upload`, {
            method: 'POST',
            body: formData,
        });
        // console.log(response);
        if (!response.ok) {
            throw new Error('Failed to upload file to Strapi');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error uploading file to Strapi:', error);
        throw error;
    }
};
