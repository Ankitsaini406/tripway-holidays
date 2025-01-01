import { getPlaiceholder } from "plaiceholder";

export default async function getBlurPlaceholder(url) {
    if (!url) throw new Error("Image URL is required");

    try {
        const { base64 } = await getPlaiceholder(url);
        return base64;
    } catch (error) {
        console.error("Error generating blur placeholder:", error);
        throw error;
    }
}