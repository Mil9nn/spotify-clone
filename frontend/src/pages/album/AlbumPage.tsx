import { useMusicStore } from "@/store/useMusicStore";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const AlbumPage = () => {
    const { getAlbumById, selectedAlbum } = useMusicStore();
    const { albumId } = useParams();

    useEffect(() => {
       getAlbumById(albumId);
    }, [albumId]);

  return (
    <div>
      
    </div>
  )
}

export default AlbumPage
