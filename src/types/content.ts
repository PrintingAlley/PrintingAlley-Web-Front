export interface CreateContent {
  title: string;
  content: string;
  thumbnail: File | null;
}

export interface UpdateContent {
  title: string;
  content: string;
  thumbnail: File | string | null;
}
