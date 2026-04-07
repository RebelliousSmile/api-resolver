import { validateUrl } from '../lib/validate-url.js'
import { fetchHtml } from '../lib/fetch-html.js'
import { resolveImage } from '../resolvers/index.js'

export async function resolveRoute(fastify) {
  fastify.post('/resolve', async (request, reply) => {
    const { source_page } = request.body ?? {}

    if (!source_page) {
      return reply.code(400).send({ error: 'source_page is required' })
    }

    const validation = await validateUrl(source_page)
    if (!validation.valid) {
      return reply.code(400).send({ error: validation.error })
    }

    let html
    try {
      const result = await fetchHtml(source_page)
      if (!result.html) {
        return reply.code(404).send({ error: 'not_found' })
      }
      html = result.html
    } catch (err) {
      if (err.code === 'FETCH_TIMEOUT') {
        return reply.code(404).send({ error: 'not_found' })
      }
      throw err
    }

    const imageUrl = await resolveImage(html, source_page)
    if (!imageUrl) {
      return reply.code(404).send({ error: 'not_found' })
    }

    return reply.send({ url: imageUrl })
  })
}
