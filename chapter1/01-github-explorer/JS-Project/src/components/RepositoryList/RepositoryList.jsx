import { useEffect, useState } from 'react';
import { RepositoryItem } from '../RepositoryItem/RepositoryItem';

import './RepositoryList.scss'

export function RepositoryList() {
  const [repos, setRepos] = useState([])

  useEffect(() => {
    fetch('https://api.github.com/orgs/rockeatseat/repos')
      .then((response) => response.json())
      .then((data) => {
        setRepos(data)
      })
  }, [])

  return (
    <section className="respository-list">
      <h1>Lista de reposotórios</h1>
      <ul>
        {
          repos.map((repo) => <RepositoryItem key={repo.id} repository={repo} />)
        }
      </ul>
    </section>
  )
}
