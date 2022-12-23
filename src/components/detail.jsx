import { useEffect } from "preact/hooks"
import { Link } from 'preact-router/match';
import useSWR from "swr";

export default function Detail({ slug }) {
  const { data, error, isLoading } = useSWR(`/api/posts/${slug}?with_meta=true`);

  useEffect(() => {
    document.title = data ? `${data.title} - rumo` : "rumo";
  }, [data]);

  if (error) return <div>服务器错误</div>
  if (isLoading) return <div>正在加载...</div>

  const item = data;
  const created = new Date(item.created * 1000);
  const modified = new Date(item.modified * 1000);
  const texts = data.text.slice(15).replace("<!--more-->", "").split("\n");
  return (
    <>
      <h2 className="text-lg font-bold mb-2 underline">{data.title}</h2>
      <ul className="flex mt-1 text-gray-500 text-xs">
        <li className="mr-2">创建于 {created.toLocaleDateString()}</li>
        <li className="mr-2 last:mr-0">修改于 {modified.toLocaleDateString()}</li>
        {item.categories.map((cate) => {
          return (
            <li className="mr-2 last:mr-0"><Link href={`/category/${cate.slug}`} key={cate.mid}>{cate.name}</Link></li>
          )
        })}
      </ul>
      <div className="mt-1">
        {texts.map((text, i)=>{
          return (
            <p className="my-4" key={i}>{text}</p>
          )
        })}
      </div>
      <ul className="flex mt-1 text-gray-500 text-xs">
        {item.tags ? "" : <li>无标签</li>}
        {item.tags.map((tag) => {
          return (
            <li className="mr-2 last:mr-0"><Link href={`/tag/${tag.slug}`} key={tag.mid}>{tag.name}</Link></li>
          )
        })}
      </ul>
    </>
  )
}