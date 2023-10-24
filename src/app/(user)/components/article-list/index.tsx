import Link from 'next/link';

import lifeImage from '~/app/(user)/assets/images/picture-article-life.jpg';
import programmingImage from '~/app/(user)/assets/images/picture-article-programming.jpg';
import { MyButton } from '~/components/elements/buttons/button';
import { MyChip } from '~/components/elements/chips/chip';
import { MyFluidImage } from '~/components/elements/images/fluid-image';
import { ArticleUiModel } from '~/features/article/ui-models/article';

import styles from './styles.module.css';

type Props = {
  articles: ArticleUiModel[];
  onClickDelete: (id: string) => void;
  isDeleting?: boolean;
};

export const MyArticleList = ({ articles, onClickDelete, isDeleting }: Props) => {
  if (!articles.length) {
    return <div>メモがありません。作成をしてメモを残しましょう！</div>;
  }

  return (
    <div className={styles.root}>
      {articles.map((article) => {
        const image = article.category === 'プログラミング' ? programmingImage : lifeImage;
        const chipColor = article.category === 'プログラミング' ? 'primary' : 'secondary';
        return (
          <article key={article.id} className={styles.article}>
            <Link href={`/detail/${article.id}`} className={styles.link}>
              <div className={styles.body}>
                <h2>{article.title}</h2>
                <div className={styles.tags}>
                  <MyChip label={article.category} color={chipColor} />
                </div>
                <div className={styles.datetime}>{article.createdAt}</div>
              </div>
              <figure className={styles.image}>
                <MyFluidImage src={image} />
              </figure>
            </Link>
          </article>
        );
      })}
    </div>
  );
};
