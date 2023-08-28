export interface ICourseForm {
  id: number | undefined; // | null
  name: string | undefined;
  date: string | undefined;
  length: number | undefined;
  description: string | undefined;
  isTopRated?: boolean;
  authors: string | undefined;
}
