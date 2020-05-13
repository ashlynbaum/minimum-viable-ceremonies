exports.onCreatePage = async ({ page, actions: { createPage } }) => {
  if (!page.path.match(/^\/room\//)) { return }

  createPage({ ...page, matchPath: '/room/*' })
}
