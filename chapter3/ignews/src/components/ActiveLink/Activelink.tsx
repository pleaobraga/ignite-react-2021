import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'

interface activeLinkProps extends LinkProps {
  name: string
  activeClassName: string
}

export function ActiveLink({
  activeClassName,
  name,
  ...rest
}: activeLinkProps) {
  const { asPath } = useRouter()

  const className = asPath === rest.href ? activeClassName : ''

  return (
    <Link
      className={className}
      {...rest}
    >
      {name}
    </Link>
  )
}
