import { useEffect, useContext } from "preact/hooks"

import { AppOptions } from "../app";

export default function ErrorPage({ ...props }) {
  const options = useContext(AppOptions);

  useEffect(() => {
    document.title = `未找到 - ${options.title}`;
  }, []);

  return (
    <>
      <h2 className="text-lg font-bold mb-2 underline">未找到</h2>
      <p>所请求的页面不存在</p>
    </>
  )
}