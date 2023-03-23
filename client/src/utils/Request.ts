
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

export const postSignUp = async (username:string, password:string, email:string) => {

  const data = await fetch("http://localhost:5000/signup", {
    method: "POST",
    mode: "cors",
    headers: { 'Access-Control-Allow-Origin': 'http://localhost:5173/', 'Content-Type': 'application/json' },
    credentials: "include",
    body: JSON.stringify({
      email: email,
      username: username,
      password: password
    })   
  })

  if (data.status === 200) {
    return true
  }

  return false
}

export const postDelete = async (postId:string) => {

  const data = await fetch(`http://localhost:5000/posts/${postId}`, {
    method: "DELETE",
    mode: "cors",
    headers: { 'Access-Control-Allow-Origin': 'http://localhost:5173/', 'Content-Type': 'application/json' },
    credentials: "include",
  })

  if (data.status === 200) {
    return true
  }

  return false

}

export const postChangePost = async (postContent:string, postTitle:string, postAuthor:string , postId:string) => {

  const data = await fetch(`http://localhost:5000/posts/${postId}`, {
    method: "PUT",
    mode: "cors",
    headers: { 'Access-Control-Allow-Origin': 'http://localhost:5173/', 'Content-Type': 'application/json' },
    credentials: "include",
    body: JSON.stringify({
      title: postTitle,
      description: postContent,
      author: postAuthor
    })
  })

  if (data.status === 200) {
    return true
  }

  return false
}