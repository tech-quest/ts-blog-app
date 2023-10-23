import styles from './styles.module.css';

type Props = {
  children: React.ReactNode;
};

export const MyPageLayout = ({ children }: Props) => {
  return (
    <div id="page">
      <header id="masthead" className={styles.header}>
        <div className={styles.logo}>My Blog</div>
      </header>
      <main id="main" className={styles.main}>
        {children}
      </main>
    </div>
  );
};
