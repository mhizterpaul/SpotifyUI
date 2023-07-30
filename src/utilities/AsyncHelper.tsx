import axios from "axios"
import credentials from './apiKeys'
import React from "react";

const AsyncHelper = (relativeRoute: string, id: string, Children) => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {

    const onSuccess = (data: string | object) => {
      if (typeof data === 'string') {
        //make data request to end
        //setData
      }
      return <Children prop={data} />;
    },
      handleError = (err) => {
        //setData
        return <Children prop={data} />;
      };

    async () => {
      const { client_id, client_secret } = JSON.parse(credentials);

      axios.post('https://accounts.spotify.com/api/token', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',

          'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
        },
        form: {
          grant_type: 'client_credentials'
        },
        json: true
      }
      ).then(
        (res) => onSuccess(res.access_token)
      ).catch(
        (err) => handleError(err)
      );

    }

  }, []);

}

/*const client = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/posts" 
});

export default function App() {
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    async function getPost() {
      const response = await client.get("/1");
      setPost(response.data);
    }
    getPost();
  }, []);

  async function deletePost() {
    await client.delete("/1");
    alert("Post deleted!");
    setPost(null);
  }

  if (!post) return "No post!";

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <button onClick={deletePost}>Delete Post</button>
    </div>
  );
}

var client_id = 'CLIENT_ID';
var client_secret = 'CLIENT_SECRET';

var authOptions = {
  
};

request.post(authOptions, function(error, response, body) {
  if (!error && response.statusCode === 200) {
    var token = body.access_token;
  }
});
*/