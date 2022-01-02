import { useEffect } from "react";
import { useWallpaperContext } from "../contexts/WallpaperContext";
import { useParams } from "react-router-dom";
import WallpaperLayout from "../components/WallpaperLayout";
import StandardNavbar from "../components/StandardNavbar";
import WallpaperContent from "../components/WallpaperContent";
import "../styles/Wallpaper.scss";

function Wallpaper() {
    const { wallpaper, setWallpaper, fetchAndSetWallpaper } = useWallpaperContext();
    const { id } = useParams();

    useEffect(() => {
        fetchAndSetWallpaper(id);
        return () => setWallpaper(null);
    }, []);

    if (!wallpaper) return null;

    return (
        <WallpaperLayout backgroundImage={wallpaper.imageUrl.large}>
            <header>
                <div className="wallpaper__navbar">
                    <StandardNavbar />
                </div>
            </header>

            <main>
                <WallpaperContent />
            </main>
        </WallpaperLayout>
    );
}

export default Wallpaper;
