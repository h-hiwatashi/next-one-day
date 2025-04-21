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
  data: string;
  isPublished?: string;
};

// 記事一覧データを取得する関数
