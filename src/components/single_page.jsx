import { useEffect } from "preact/hooks"
import useSWR from "swr";

export default function SinglePage({ slug }) {
  const { data, error, isLoading } = useSWR(`/api/pages/${slug}`);

  useEffect(() => {
    document.title = data?`${data.title} - rumo`:"rumo";
  }, [data]);

  if (error) return <div>服务器错误</div>
  if (isLoading) return <div>正在加载...</div>

  return (
    <>
      <h2 className="text-lg font-bold mb-2 underline">{data.title}</h2>
      <p>{data.text.slice(15)}</p>
    </>
  )
}