import { CatImage } from "../types";

const apiKey: string = 'live_5oe2hWFiT3MyHImwXdDj8A1AGDhNIItc95RxnCX96PuQJSoCU692DJKC6evaOZGV'
const baseUrl: string = "https://api.thecatapi.com/v1/images/search";

export class CatAPI {
    static async fetchRandomImages(numberOfImages: number = 1): Promise<CatImage[]> {
        const url: string = `${baseUrl}?limit=${numberOfImages}`;

        try {
            const response = await fetch(url, {
                headers: {
                    'x-api-key': apiKey
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: CatImage[] = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching images:", error);
            return []; 
        }
    }
}

