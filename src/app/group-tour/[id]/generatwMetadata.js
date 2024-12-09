import { useSingleTourData } from "@/hook/useSingleTour";

export async function generateMetadata(params) {
    const id = params.id;
    const { tour } = useSingleTourData(`group-tours/${id}`);

    try {
        const response = await tour;
        if (!response || response.length === 0) {
            return {
                title: "Not Found",
                description: "The page you are looking for does not exist",
            };
        }
        return {
            openGraph: {
                title: response.name,
                description: response.description,
                images: [`${process.env.IMAGE_URL}${response.imageUrl}`],
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
