export interface ICourseForm {
  id: number | undefined;
  title: string | undefined;
  creationDate: string | undefined;
  duration: number | undefined;
  description: string | undefined;
  topRated?: boolean;
  authors: string | undefined;
}
