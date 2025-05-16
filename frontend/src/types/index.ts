export interface Song {
    _id: string;
    title: string;
    duration: string;
    artist: string;
    imageUrl: string;
    audioUrl: string;
    createdAt: string;
    updatedAt: string;
    albumId: string;
}

export interface Album {
  _id: string;
  imageUrl: string;
  title: string;
  artist: string;
  releaseYear: number;
  updatedAt: string;
  songs: Song[];
}

export interface selectedAlbum {
    _id: string;
    title: string;
    imageUrl: string;
    artist: string;
    songs: Song[];
    releaseYear: string;
    createdAt: string;
}

export interface MusicStore {
    albums: Album[];
    users: unknown[];
    songs: Song[];
    isLoading: boolean;
    selectedAlbum: selectedAlbum | null;
    getAlbums: () => Promise<void>;
    getAlbumById: (id: unknown) => Promise<void>;
    fetchAllSongs: () => Promise<void>;
    fetchFeaturedSongs: () => Promise<void>;
    fetchTrendingSongs: () => Promise<void>;
    fetchMadeForYouSongs: () => Promise<void>;
    featuredSongs: Song[];
    trendingSongs: Song[];
    madeForYouSongs: Song[];
}
