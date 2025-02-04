import { useEffect, useState } from "react";
import { CatAPI } from "../api/cat.api";
import { CatImage } from "../types";
import maneki from '../assets/maneki.gif';

export default function CatGallery() {
    const [catImages, setCatsImages] = useState<CatImage[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCatImages = async () => {
            const images = await CatAPI.fetchRandomImages(1);
            setCatsImages(images);
            setLoading(false); 
        };

        fetchCatImages();
    }, []);
    
    const loadNewCatImage = async () => {
        setLoading(true);
        const images = await CatAPI.fetchRandomImages(1);
        setCatsImages(images);
        setLoading(false);
    };

    if (loading) {
        return (
            <div className="w-[500px] bg-[#FFFBE6] h-[500px] flex justify-center items-center">
                <img className="w-[48px] h-[48px]" src={maneki} alt="Loading..." />
                <h1 className="text-lg font-semibold text-gray-500">Loading....</h1>
            </div>
        );
    }

    return (
        <div className="relative w-[500px] flex items-center justify-center border bg-gray-100">
            {catImages.map((image) => (
                <img key={image.id}
                    src={image.url}
                    alt=""
                    style={{ display: 'block' }} 
                />
            ))}
            <div className="fixed w-full bottom-5 flex items-center justify-center">
                <button
                    onClick={loadNewCatImage}
                    className='cursor-pointer font-semibold mt-5 text-lg bg-orange-500 rounded-full shadow text-white px-10 py-3'>
                    PssPss
                </button>
            </div>
        </div>
    );
}
