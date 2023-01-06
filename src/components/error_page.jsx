import { useEffect } from "preact/hooks"

export default function ErrorPage({ ...props }) {
  useEffect(() => {
    document.title = `未找到 - 如墨`;
  }, []);

  return (
    <>
      <h2 className="text-lg font-bold mb-2 underline">未找到</h2>
      <p>所请求的页面不存在</p>
    </>
  )
}