import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { start } from "repl";

// 記事の場所を指定
const postDirectory = path.join(process.cwd(), "data/news");

// 投稿数
const PAGE_SIZE = 5;

// ページ数を計算する関数
const range = (start: number, end: number, length = end - start + 1) =>
  Array.from({ length }, (_, i) => start + i);

// 記事データの型定義
type PostData = {
  slug: string;
  title: string;
  date: string;
  isPublished?: string;
};

// 記事一覧データを取得する関数
export async function getNewsData(page: number = 1) {
  const fileNames = fs.readdirSync(postDirectory);
  const allPostData: PostData[] = fileNames
    .map((fileName) => {
      // ファイル名から .md を削除しスラッグを取得する。
      const slug = fileName.replace(/\.md$/, "");
      // ファイルの場所を取得する。
      const fullPath = path.join(postDirectory, fileName);
      // ファイルの内容を取得する。
      const fileContents = fs.readFileSync(fullPath, "utf8");
      // ファイルの内容を解析する。
      const matterResult = matter(fileContents);
      return {
        // 記事のスラッグ名。
        slug,
        // メタデータ。
        ...(matterResult.data as Omit<PostData, "slug">),
      };
      // 公開された記事のみを取得する。
    })
    .filter((post) => post.isPublished !== "false");

  // 投稿を日付でソートする。
  const sortedPosts = allPostData.sort((postA, postB) =>
    new Date(postA.date) > new Date(postB.date) ? -1 : 1
  );

  // パジネーション処理を行う。
  const pages = range(1, Math.ceil(allPostData.length / PAGE_SIZE));
  const posts = sortedPosts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return {
    posts,
    pages,
  };
}

type NewProps = {
  params: {
    page?: string;
  };
};
