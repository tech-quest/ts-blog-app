import { MyMultilineString } from '~/components/elements/typographies/multiline-string';
import { MyPanel } from '~/components/surface/panels/panel';
import { ArticleDetailUiModel } from '~/features/article/ui-models/article';

import styles from './styles.module.css';

type Props = { article: ArticleDetailUiModel };

export const MyArticleDetail = ({ article }: Props) => {
  return (
    <MyPanel>
      <div className={styles.field}>
        <div className={styles.label}>タイトル</div>
        <div>
          <MyMultilineString value={article.title} />
        </div>
      </div>
      <div className={styles.field}>
        <div className={styles.label}>内容</div>
        <div>
          <MyMultilineString value={article.content} />
        </div>
      </div>
      <div className={styles.field}>
        <div className={styles.label}>作成日時</div>
        <div>{article.createdAt}</div>
      </div>
      <div className={styles.field}>
        <div className={styles.label}>更新日時</div>
        <div>{article.updatedAt}</div>
      </div>
    </MyPanel>
  );
};
