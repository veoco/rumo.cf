import { useEffect, useContext } from "preact/hooks"
import useSWR from "swr";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import behead from 'remark-behead';

import { AppOptions } from "../app";

export default function SinglePage({ slug }) {
  const options = useContext(AppOptions);

  const { data, error, isLoading } = useSWR(`/api/pages/${slug}`);

  useEffect(() => {
    document.title = data ? `${data.title} - ${options.title}` : options.title;
  }, [data]);

  if (error) return <div>服务器错误</div>
  if (isLoading) return <div>正在加载...</div>

  const markdown = data.text.slice(15).replace("<!--more-->", "");
  return (
    <>
      <h2 className="text-lg font-bold mb-2 underline">{data.title}</h2>
      <div className="mt-1 prose prose-pre:bg-gray-600">
        <ReactMarkdown children={markdown} remarkPlugins={[remarkGfm, [behead, { minDepth: 3 }]]} />
      </div>
    </>
  )
}