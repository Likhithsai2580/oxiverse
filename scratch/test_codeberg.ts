async function test() {
  const repoPath = 'oxiverse/intentforge'
  const dir = 'docs'
  const res = await fetch(`https://codeberg.org/api/v1/repos/${repoPath}/contents/${dir}`, {
      headers: { 'Accept': 'application/json' }
  })
  if (res.ok) {
      const data = await res.json()
      console.log(JSON.stringify(data, null, 2))
  } else {
    console.log('Failed to fetch', res.status)
  }
}

test()
