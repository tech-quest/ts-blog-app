import { useDeleteArticle } from './use-delete-article';
import { useFindArticle } from './use-find-article';

export const useHooks = (id: string) => {
  const { article, findError, findStudyError, isLoading } = useFindArticle(id);
  const { deleteError, deleteStudyError, isDeleting, handleDelete } = useDeleteArticle(id);

  return { article, findError, findStudyError, isLoading, deleteError, deleteStudyError, isDeleting, handleDelete };
};
