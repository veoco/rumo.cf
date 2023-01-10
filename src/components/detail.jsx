import { useEffect, useContext } from "preact/hooks"
import { Link } from 'preact-router/match';
import useSWR from "swr";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import behead from 'remark-behead';

import { AppOptions } from "../app";

export default function Detail({ slug }) {
  const options = useContext(AppOptions);
  const { data, error, isLoading } = useSWR(`/api/posts/${slug}?with_meta=true`);

  useEffect(() => {
    document.title = data ? `${data.title} - ${options.title}` : options.title;
  }, [data]);

  if (error) return <div>服务器错误</div>
  if (isLoading) return <div>正在加载...</div>

  const item = data;
  const created = new Date(item.created * 1000);
  const modified = new Date(item.modified * 1000);
  const markdown = data.text.slice(15).replace("<!--more-->", "");
  return (
    <>
      <h2 className="text-lg font-bold mb-2 underline">{data.title}</h2>
      <ul className="flex mt-1 text-gray-500 text-xs">
        <li className="mr-2">创建于 {created.toLocaleDateString()}</li>
        {item.created == item.modified ? "" : <li className="mr-2 last:mr-0" title={modified.toLocaleString()}>修改于 {modified.toLocaleDateString()}</li>}
        {item.categories ? item.categories.map((cate) => {
          return (
            <li className="mr-2 last:mr-0"><Link href={`/category/${cate.slug}`} key={cate.mid}>{cate.name}</Link></li>
          )
        }) : <li>未分类</li>}
        {item.tags ? item.tags.map((tag) => {
          return (
            <li className="mr-2 underline before:content-['#'] last:mr-0"><Link href={`/tag/${tag.slug}`} key={tag.mid}>{tag.name}</Link></li>
          )
        }) : <li>无标签</li>}
      </ul>
      <div className="mt-1 prose prose-pre:bg-gray-600">
        <ReactMarkdown children={markdown} remarkPlugins={[remarkGfm, [behead, { minDepth: 3 }]]} />
      </div>
    </>
  )
}