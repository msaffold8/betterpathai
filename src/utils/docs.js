import { lstatSync, readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

const docsDir = join(process.cwd(), 'docs');

export const getArticle = (slug, fields = []) => {
  try {
    const filePath = join(docsDir, `${slug}.md`);
    const fileData = readFileSync(filePath, "utf8");
    const { data, content } = matter(fileData);

    const article = {};

    fields.forEach((field) => {
      if (field === "slug") {
        article[field] = slug;
      }

      if (field === "content") {
        article[field] = content;
      }

      if (typeof data[field] !== "undefined") {
        article[field] = data[field];
      }
    });

    return article;
  } catch (error) {
    console.error(`Error fetching article with slug "${slug}":`, error);
    return null; // Or return an empty object {} or a default error article structure
  }
};

export const getArticles = (fields = []) => {
  let filePaths = [];
  try {
    filePaths = readdirSync(docsDir).filter((item) => {
      const currPath = join(docsDir, item);
      return !lstatSync(currPath).isDirectory();
    });
  } catch (error) {
    console.error("Error reading the docs directory:", error);

    return [];
  }

  return filePaths
    .map((filePath) => getArticle(filePath.replace(/\.md$/, ""), fields))
    .filter((article) => article !== null);
};
