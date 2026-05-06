async function test() {
  const repoPath = 'oxiverse/intentforge'
  const branch = 'main'
  const res = await fetch(`https://codeberg.org/api/v1/repos/${repoPath}/git/trees/${branch}?recursive=true`, {
      headers: { 'Accept': 'application/json' }
  })
  if (res.ok) {
      const data = await res.json()
      console.log(JSON.stringify(data.tree.filter((i: any) => i.path.startsWith('docs/')), null, 2))
  } else {
    console.log('Failed to fetch', res.status)
  }
}

test()
