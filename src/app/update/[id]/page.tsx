'use client';

import { MyAlertMessage } from '~/components/surface/dialogs/alert-message';
import { MyPageContainer } from '~/features/app/components/page-container';
import { MyStudyAlert } from '~/features/app/components/study-alert';
import { MyArticleContainer } from '~/features/article/components/article-container';

import { MyArticleActions } from './components/article-actions';
import { MyUpdateArticleForm } from './components/update-article-form';
import { useHooks } from './hooks';

type Params = {
  id: string;
};

export default function ArticleUpdatePage({ params }: { params: Params }) {
  const {
    defaultValues,
    findError,
    findStudyError,
    isLoading,
    updateError,
    updateStudyError,
    isUpdating,
    handleSubmit,
    deleteError,
    deleteStudyError,
    isDeleting,
    handleDelete,
  } = useHooks(params.id);

  return (
    <MyPageContainer>
      <h1>メモ編集</h1>
      <MyArticleContainer>
        {findError && <MyAlertMessage color="error">{findError.message}</MyAlertMessage>}
        {updateError && <MyAlertMessage color="error">{updateError.message}</MyAlertMessage>}
        {deleteError && <MyAlertMessage color="error">{deleteError.message}</MyAlertMessage>}
        {!defaultValues && isLoading && <div>読み込み中...</div>}
        {defaultValues && (
          <MyUpdateArticleForm defaultValues={defaultValues} isSubmitting={isUpdating} onSubmit={handleSubmit} />
        )}
        <MyArticleActions onClickDelete={handleDelete} isDeleting={isDeleting} />
      </MyArticleContainer>
      {findStudyError && (
        <MyStudyAlert
          message={findStudyError.message}
          description="API (http://localhost:8000/articles/detail/:id) の開発が完了すると「選択したメモの値が設定された編集フォーム」が表示されるようになります。"
        />
      )}
      {updateStudyError && (
        <MyStudyAlert
          message={updateStudyError.message}
          description="API (http://localhost:8000/articles/update) の開発が完了すると保存ボタンをクリックした際に「選択したメモの変更内容をデータベースに保存」し、「一覧画面に戻る」ようになります。"
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
