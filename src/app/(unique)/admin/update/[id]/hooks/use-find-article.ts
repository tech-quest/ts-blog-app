import { useEffect, useState } from 'react';

import { DefaultValues } from '~/app/(unique)/admin/update/[id]/components/update-article-form';
import { useFindArticleApi } from '~/features/article/hooks/use-find-article-api';

export const useFindArticle = (id: string) => {
  const [defaultValues, setDefaultValues] = useState<DefaultValues | null>();

  const { article, error, studyError, isLoading, query } = useFindArticleApi(id);

  useEffect(() => {
    query();
  }, []);

  useEffect(() => {
    if (!article) return;
    setDefaultValues({ title: article.title, content: article.content });
  }, [article]);

  return { defaultValues, findError: error, findStudyError: studyError, isLoading };
};
