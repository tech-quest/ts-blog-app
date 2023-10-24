import { useState } from 'react';

import { MyButton } from '~/components/elements/buttons/button';
import { MyRadioField } from '~/components/elements/forms/radio-field';
import { MyTextField } from '~/components/elements/forms/text-field';
import { MyTextareaField } from '~/components/elements/forms/textarea-field';
import { MyPanel } from '~/components/surface/panels/panel';
import { ArticleCategory, ArticleStatus } from '~/features/article/ui-models/article';

import styles from './styles.module.css';

const statusItems = [
  { value: '公開', label: '公開' },
  { value: '下書き', label: '下書き' },
];

type Props = {
  isSubmitting: boolean;
  onSubmit: (title: string, content: string, category: ArticleCategory, status: ArticleStatus) => void;
};

export const MyCreateArticleForm = ({ isSubmitting, onSubmit }: Props) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<ArticleStatus>('公開');
  const [category, setCategory] = useState<ArticleCategory>('プログラミング');

  const handleChangeTitle = (value: string) => {
    setTitle(value);
  };
  const handleChangeContent = (value: string) => {
    setContent(value);
  };
  const handleChangeStatus = (value) => {
    setStatus(value);
  };
  const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value as ArticleCategory);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(title, content, category, status);
  };

  return (
    <MyPanel>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <MyTextField label="タイトル" name="title" value={title} onChange={handleChangeTitle} />
        <MyTextareaField label="内容" name="content" value={content} onChange={handleChangeContent} />
        <div>
          <select name="category" value={category} onChange={handleChangeCategory}>
            <option value="プログラミング">プログラミング</option>
            <option value="日常">日常</option>
          </select>
        </div>
        <MyRadioField
          items={statusItems}
          label="ステータス"
          name="status"
          value={status}
          onChange={handleChangeStatus}
        />
        <div>
          <MyButton type="submit" color="primary" disabled={isSubmitting}>
            {isSubmitting ? '送信中' : '作成'}
          </MyButton>
        </div>
      </form>
    </MyPanel>
  );
};
