import { useEffect } from "preact/hooks"
import { Link } from 'preact-router/match';
import useSWR from "swr";

export default function Index({ meta, slug, ...props }) {
  const target = meta ? (meta == "tags" ? `tags/${slug}/posts` : `categories/${slug}/posts`) : "posts";
  const page = props.page ? parseInt(props.page) : 1;
  const { data, error, isLoading } = useSWR(`/api/${target}/?page=${page}&page_size=4&order_by=-cid&with_meta=true`);

  useEffect(() => {
    document.title = data && page != 1 ? `第 ${page} 页 - rumo` : "rumo";
  }, [data]);

  if (error) return <div>服务器错误</div>
  if (isLoading) return <div>正在加载...</div>

  return (
    <>
      {meta ? <p className="font-bold">共有 {data.all_count} 篇文章</p> : ""}
      {data.results.map((item) => {
        const created = new Date(item.created * 1000);
        const modified = new Date(item.modified * 1000);
        return (
          <div className="mt-6 first:mt-0" key={item.cid}>
            <h3 className="text-lg font-bold underline"><Link href={`/post/${item.slug}`}>{item.title}</Link></h3>
            <ul className="flex mt-1 text-gray-500 text-xs">
              <li className="mr-2">创建于 {created.toLocaleDateString()}</li>
              <li className="mr-2 last:mr-0">修改于 {modified.toLocaleDateString()}</li>
              {item.categories ? item.categories.map((cate) => {
                return (
                  <li className="mr-2 last:mr-0"><Link href={`/category/${cate.slug}`} key={cate.mid}>{cate.name}</Link></li>
                )
              }) : <li>未分类</li>}
            </ul>
            <p className="mt-1 text-sm">{item.text.split("<!--more-->")[0].slice(15)}</p>
            <ul className="flex mt-1 text-gray-500 text-xs">
              {item.tags ? item.tags.map((tag) => {
                return (
                  <li className="mr-2 last:mr-0"><Link href={`/tag/${tag.slug}`} key={tag.mid}>{tag.name}</Link></li>
                )
              }) : <li>无标签</li>}
            </ul>
          </div>
        )
      })}
      <nav className="my-6 flex">
        {data.all_count > (data.page - 1) * data.page_size && page > 1 ? <Link href={`?page=${page - 1}`}>上一页</Link> : ""}
        {data.all_count > (data.page + 1) * data.page_size ? <Link className="ml-auto" href={`?page=${page + 1}`}>下一页</Link> : ""}
      </nav>
    </>
  )
}