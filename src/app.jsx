import Router from 'preact-router';
import { Link } from 'preact-router/match';
import { SWRConfig } from 'swr'

import SinglePage from './components/single_page';
import Index from './components';
import Detail from './components/detail';
import ErrorPage from './components/error_page';

export function App() {
  return (
    <SWRConfig
      value={{ fetcher: (resource, init) => fetch(resource, init).then(res => res.json()) }}
    >
      <header className="max-w-2xl mx-auto px-2">
        <h1 className="text-2xl mt-2">如墨</h1>
        <small className="text-gray-500">——测试站点</small>
        <nav className="flex mt-2">
          <Link className="mr-4" activeClassName="font-bold" href="/">首页</Link>
          <Link activeClassName="font-bold" href="/start-page">关于</Link>
        </nav>
      </header>

      <main className="max-w-2xl mx-auto mt-4 px-2">
        <Router>
          <Index path="/" meta="" />
          <Index path="/tag/:slug" meta="tags" />
          <Index path="/category/:slug" meta="categories" />
          <Detail path="/post/:slug" />
          <SinglePage path="/start-page" slug={"start-page"} />
          <ErrorPage type="404" default />
        </Router>
      </main>

      <footer className="flex justify-center items-center mt-16 text-sm py-1 text-gray-400">
        <Link href="https://github.com/veoco/rumo" data-native>rumo</Link>
        <span className='mx-2'>|</span>
        <Link target="_blank" href="https://github.com/veoco/rumo.cf" data-native>rumo.cf</Link>
      </footer>
    </SWRConfig>
  )
}
