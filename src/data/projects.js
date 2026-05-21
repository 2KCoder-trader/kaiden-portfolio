// auto-discovers project manifests in ./projects/*.json (skips _template)
const modules = import.meta.glob('./projects/[!_]*.json', { eager: true })

const projects = Object.values(modules)
  .map(m => m.default ?? m)
  .sort((a, b) => {
    const ao = a.order ?? Number.POSITIVE_INFINITY
    const bo = b.order ?? Number.POSITIVE_INFINITY
    if (ao !== bo) return ao - bo
    return a.slug.localeCompare(b.slug)
  })

export default projects
