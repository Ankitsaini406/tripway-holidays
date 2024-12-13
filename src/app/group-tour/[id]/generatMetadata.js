
export async function generateMetadata(params) {
    const id = params.id;

    const localApi = process.env.API_URL;
    const productionApi = process.env.HOST_URL;
    const apiPoint = process.env.NODE_ENV === "development" ? localApi : productionApi;

    try {
        const response = await fetch(`${apiPoint}api/group-tours/${id}`);
        if (!response.ok) {
            throw new Error("Failed to fetch tour data");
        }

        const data = await response.json();
        if (!data || data.length === 0) {
            return {
                title: "Not Found",
                description: "The page you are looking for does not exist",
            };
        }
        return {
            openGraph: {
                title: `Tripway Holidays - ${data.name}`,
                description: data.description,
                images: [`${process.env.IMAGE_URL}${data.imageUrl}`],
            },
        }
    } catch (error) {
        console.error(error);
        return {
            title: "Not Found",
            description: "The page you are looking for does not exist",
        }
    }
}
