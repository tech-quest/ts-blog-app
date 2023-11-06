import { PrismaClient } from '@prisma/client';
import express from 'express';

import { applyServerSettings } from './settings';

const app = express();
const port = 8000;

// Middlewares and settings
applyServerSettings(app);

// ↓↓↓ バックエンド処理を記述して実際に開発してみましょう！！

declare global {
  // eslint-disable-next-line no-var
  var __db__: PrismaClient | undefined;
}

const initPrisma = () => {
  if (process.env.NODE_ENV === 'production') return new PrismaClient();

  const db = (global.__db__ = global.__db__ ?? new PrismaClient());
  db.$connect();
  return db;
};

const prisma = initPrisma();

// APIのURL http://localhost:8000/admin/articles
// 作成が完了したら http://localhost:3000/admin にアクセスして確認してみましょう！
app.get('/admin/articles', async (req, res) => {
  const records = await prisma.article.findMany();

  const articles = records.map((record) => {
    return {
      id: record.id,
      title: record.title,
      content: record.content,
      category: record.category,
      status: record.status,
      createdAt: formatDateInJa(record.createdAt),
      updatedAt: formatDateInJa(record.updatedAt),
    };
  });

  res.json({ data: articles });
});

// APIのURL http://localhost:8000/admin/articles/detail/1
// 存在しないIDを指定した場合 http://localhost:8000/admin/articles/detail/a -> 404 Not Found
// 作成が完了したら http://localhost:3000/admin/update/1 にアクセスして確認してみましょう！
app.get('/admin/articles/detail/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    res.status(404).json({ error: { message: 'ID 形式が不正な形式となっています' } });
    return;
  }

  const record = await prisma.article.findUnique({ where: { id } });
  if (!record) {
    res.status(404).json({ error: { message: '記事が見つかりませんでした' } });
    return;
  }

  const article = {
    id: record.id,
    title: record.title,
    content: record.content,
    category: record.category,
    status: record.status,
    createdAt: formatDateInJa(record.createdAt),
    updatedAt: formatDateInJa(record.updatedAt),
  };

  res.json({ data: article });
});

// APIのURL http://localhost:8000/admin/articles/create
// 作成が完了したら http://localhost:3000/admin/create にアクセスして確認してみましょう！
app.post('/admin/articles/create', async (req, res) => {
  const { title, content, category, status } = req.body;

  const requiredMessage = '未入力の内容があります';

  if (title === '') {
    res.status(400).json({ error: { message: requiredMessage } });
    return;
  }

  if (content === '') {
    res.status(400).json({ error: { message: requiredMessage } });
    return;
  }

  if (category === '') {
    res.status(400).json({ error: { message: requiredMessage } });
    return;
  }

  if (status === '') {
    res.status(400).json({ error: { message: requiredMessage } });
    return;
  }

  const record = await prisma.article.create({ data: { title, content, category, status } });

  res.json({ data: { id: record.id.toString(10) } });
});

// APIのURL http://localhost:8000/admin/articles/update
// 作成が完了したら http://localhost:3000/admin/update/1 にアクセスして確認してみましょう！
app.post('/admin/articles/update', async (req, res) => {
  const { articleId, title, content, category, status } = req.body;

  const id = Number(articleId);
  if (Number.isNaN(id)) {
    res.status(400).json({ error: { message: 'ID 形式が不正な形式となっています' } });
    return;
  }

  const requiredMessage = '未入力の内容があります';

  if (title === '') {
    res.status(400).json({ error: { message: requiredMessage } });
    return;
  }

  if (content === '') {
    res.status(400).json({ error: { message: requiredMessage } });
    return;
  }

  if (category === '') {
    res.status(400).json({ error: { message: requiredMessage } });
    return;
  }

  if (status === '') {
    res.status(400).json({ error: { message: requiredMessage } });
    return;
  }

  try {
    const record = await prisma.article.update({ where: { id }, data: { title, content, category, status } });

    res.json({ data: { id: record.id.toString(10) } });
  } catch {
    res.status(500).json({ error: { message: 'データベース操作に失敗しました。' } });
  }
});

// APIのURL http://localhost:8000/admin/articles/delete
// 作成が完了したら http://localhost:3000/admin などの削除ボタンをクリックしてみよう
app.post('/admin/articles/delete', async (req, res) => {
  const { articleId } = req.body;

  const id = Number(articleId);
  if (Number.isNaN(id)) {
    res.status(400).json({ error: { message: 'ID 形式が不正な形式となっています' } });
    return;
  }

  try {
    const record = await prisma.article.delete({ where: { id } });

    res.json({ data: { id: record.id.toString(10) } });
  } catch {
    res.status(500).json({ error: { message: 'データベース操作に失敗しました。' } });
  }
});

const formatDateInJa = (date: Date) => {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${year}/${month}/${day} ${hours}:${minutes}`;
};

// ↑↑↑ バックエンド処理を記述して実際に開発してみましょう！！

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
