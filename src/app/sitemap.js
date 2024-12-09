import { useFetchTourData } from "@/hook/useFetchTourData";

export default async function sitemap() {

    const localApi = process.env.API_URL;
    const productionApi = process.env.HOST_URL;
    const apiPoint = process.env.NODE_ENV === "development" ? localApi : productionApi;

    const { tourData } = useFetchTourData('group-tours');

    const tourDetails = tourData?.map((tour) => {
        return {
            url: `${apiPoint}/${tour?.id}`,
            lastModified: tour?.created_at,
        };
    });

    return [
        {
            url: `${apiPoint}`,
            lastModified: new Date(),
        },
        ...tourDetails,
    ]
}