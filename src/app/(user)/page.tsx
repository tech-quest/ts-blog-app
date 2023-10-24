'use client';

import Link from 'next/link';

import { MyButton } from '~/components/elements/buttons/button';
import { MyJumbotron } from '~/components/elements/images/jumbotron';
import { MyAlertMessage } from '~/components/surface/dialogs/alert-message';
import { MyContainer } from '~/features/app/components/container';
import { MyPageContainer } from '~/features/app/components/page-container';
import { MyStudyAlert } from '~/features/app/components/study-alert';

import heroImage from './assets/images/picture-hero-image.jpg';
import { MyArticleList } from './components/article-list';
import { useHooks } from './hooks';

export default function HomePage() {
  const { articles, fetchError, fetchStudyError, isLoading, deleteError, deleteStudyError, isDeleting, handleDelete } =
    useHooks();

  return (
    <MyPageContainer>
      <MyJumbotron heading="Articles" image={heroImage} />
      <MyContainer>
        {fetchError && <MyAlertMessage color="error">{fetchError.message}</MyAlertMessage>}
        {isLoading ? (
          <div>読み込み中...</div>
        ) : (
          <MyArticleList articles={articles} onClickDelete={handleDelete} isDeleting={isDeleting} />
        )}
        {fetchStudyError && (
          <MyStudyAlert
            message={fetchStudyError.message}
            description="API (http://localhost:8000/articles) の開発が完了すると「メモの一覧」が表示されるようになります。"
          />
        )}
      </MyContainer>
    </MyPageContainer>
  );
}
