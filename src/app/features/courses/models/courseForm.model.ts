export interface ICourseForm {
  id?: number;
  title: string;
  creationDate: string;
  duration?: number;
  description: string;
  topRated?: boolean;
  authors?: string;
}
