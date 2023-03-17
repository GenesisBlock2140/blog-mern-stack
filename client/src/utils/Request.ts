
// Login request to back-end, return true if login is valid and false if not valid / network error
export const postLogin = async (username:string, password:string, setAuth:(user: string) => void ) => {

  try {
    const data = await fetch("http://localhost:5000/login", {
    method: "POST",
    mode: "cors",
    headers: { 'Access-Control-Allow-Origin': 'http://localhost:5173/', 'Content-Type': 'application/json' },
    credentials: "include",
    body: JSON.stringify({
      username: username,
      password: password
    })   
  })

  if (data.status === 200) {
    setAuth(username)
    return true
  }

  } catch (error) {
    console.log(error)
  }

  return false

}


// Fetching All Posts data from public API
export const fetchAllPost = async () => {
  try {
    const fetchPosts = await fetch("http://localhost:5000/posts")
    const data = fetchPosts.json()
    return data
  } catch (error) {
    console.log(error);
  }
}