import AppRouter from "./routers/AppRouter"

import { Provider } from "react-redux"
import { store } from "./store/store"

const BlogApp = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  )
}

export default BlogApp
