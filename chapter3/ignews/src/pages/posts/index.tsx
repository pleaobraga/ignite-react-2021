import { getPrismicClient } from '@/services/prismic'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { RichText } from 'prismic-dom'

import styles from './styles.module.scss'

type Post = {
  slug: string
  title: string
  excerpt: string
  updatedAt: string
}

interface PostsProps {
  posts: Post[]
}

export default function Posts({ posts }: PostsProps) {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map((post) => {
            return (
              <a key={post.slug}>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            )
          })}
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient()

  const response = await prismic.getAllByType('post', {
    fetch: ['post.title', 'post.content'],
    pageSize: 100,
  })

  console.log('response', response)

  const posts = response.map((post) => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt:
        post.data.content.find((content) => content.type === 'paragraph')
          ?.text ?? '',
      updatedAt: new Date(post.last_publication_date).toLocaleDateString(
        'pt-BR',
        {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }
      ),
    }
  })

  console.log('response', response)

  return {
    props: { posts },
  }
}
