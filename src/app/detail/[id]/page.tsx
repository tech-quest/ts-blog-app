'use client';

import { MyAlertMessage } from '~/components/surface/dialogs/alert-message';
import { MyPageContainer } from '~/features/app/components/page-container';
import { MyStudyAlert } from '~/features/app/components/study-alert';
import { MyArticleContainer } from '~/features/article/components/article-container';

import { MyArticleActions } from './components/article-actions';
import { MyArticleDetail } from './components/article-detail';
import { useHooks } from './hooks';

type Params = {
  id: string;
};

export default function ArticleDetailPage({ params }: { params: Params }) {
  const { article, findError, findStudyError, isLoading, deleteError, deleteStudyError, isDeleting, handleDelete } =
    useHooks(params.id);

  return (
    <MyPageContainer>
      <h1>メモ詳細</h1>
      <MyArticleContainer>
        {findError && <MyAlertMessage color="error">{findError.message}</MyAlertMessage>}
        {deleteError && <MyAlertMessage color="error">{deleteError.message}</MyAlertMessage>}
        {!article && isLoading && <div>読み込み中...</div>}
        {article && <MyArticleDetail article={article} />}
        <MyArticleActions id={params.id} onClickDelete={handleDelete} isDeleting={isDeleting} />
      </MyArticleContainer>
      {findStudyError && (
        <MyStudyAlert
          message={findStudyError.message}
          description="API (http://localhost:8000/articles/detail/:id) の開発が完了すると「選択したメモの詳細」が表示されるようになります。"
        />
      )}
      {deleteStudyError && (
        <MyStudyAlert
          message={deleteStudyError.message}
          description="API (http://localhost:8000/articles/delete) の開発が完了すると削除ボタンをクリックした際に「選択したメモの変更内容をデータベースから削除」し、「一覧画面に戻る」ようになります。"
        />
      )}
    </MyPageContainer>
  );
}
