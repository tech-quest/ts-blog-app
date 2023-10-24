import { useEffect, useState } from 'react';

import { usePostFetch } from '~/features/app/hooks/use-post-fetch';

type ApiResponseData = { id: string };

export const useDeleteArticleApi = () => {
  const [success, setSuccess] = useState<boolean | null>(null);

  const { data, error, studyError, isLoading, mutate } = usePostFetch<ApiResponseData>(
    `http://localhost:8000/admin/articles/delete`,
  );

  useEffect(() => {
    if (!data) return;

    if (error) {
      setSuccess(false);
      return;
    }
    setSuccess(true);
  }, [data, error]);

  return { success, error, studyError, isDeleting: isLoading, deleteArticle: mutate };
};
