export interface Image {
  id: string;
  urls: {
    small: string;
    regular: string;
    full?: string; 
  };
  downloads?: number;
  views?: number;
  likes?: number;
}
