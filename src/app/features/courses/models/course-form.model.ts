import { IAuthor } from './author.model';

export interface ICourseForm {
  id: number | undefined | null;
  name: string | undefined | null;
  date: string | undefined | null;
  length: number | undefined | null;
  description: string | undefined | null;
  isTopRated?: boolean;
  authors: IAuthor[] | null | undefined;
}
