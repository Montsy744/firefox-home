export type Apod = {
    date: string;
    title: string;
    media_type: "image" | "video";
    explanation: string;
    alt?: string;
    hdurl?: string;
}