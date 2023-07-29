
function isEmpty(value: string | undefined): value is undefined {
  return value === undefined || value === ''
}

function parseProtocol(url: string): string {
  if (url.startsWith('https://github.com/')) {
    return url.replace('https://github.com/', '')
  }

  if (url.startsWith('git@github.com:')) {
    return url.replace('git@github.com:', '')
  }

  throw new Error(`Unsupported URL. Only SSH- and HTTPS-like GitHub URLs are supported (${url})`)
}

function normalizeName(name: string, type: string | undefined): string {
  return isEmpty(type) ? name.replace(/\.git$/, '') : name
}

interface ModRepo {
  owner: string
  name: string
}

export function parseGitHubUrl(url: string): ModRepo {
  const [owner, name, type] = parseProtocol(url).split('/')

  if (isEmpty(owner) || isEmpty(name)) {
    throw new Error(`GitHub URL must contain repo's owner and name (${url})`)
  }

  return {
    owner,
    name: normalizeName(name, type)
  }
}
