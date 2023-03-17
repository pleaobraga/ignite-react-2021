import './RepositoryItem.scss'

export function RepositoryItem({ repository }) {
  return (
    <li className="repository-item">
      <strong>{repository?.name}</strong>
      <p>{repository?.description}</p>
      <a href={repository?.html_url}>Acessar reposotório</a>
    </li>
  )
}
