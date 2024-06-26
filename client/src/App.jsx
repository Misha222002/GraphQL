import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_ALL_USERS, GET_ONE_USER } from "./query/user";
import { CREATE_USER } from "./mutaions/user";

function App() {
  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS);
  const { data: oneUser, loading: loadingOneUser } = useQuery(GET_ONE_USER, {
    variables: {
      id: 1,
    },
  });
  const [newUser] = useMutation(CREATE_USER);
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(0);
  console.log(oneUser);
  useEffect(() => {
    if (!loading) {
      setUsers(data.getAllUsers);
    }
  }, [data]);

  const addUser = (e) => {
    e.preventDefault();
    newUser({
      variables: {
        input: {
          username,
          age: Number(age),
        },
      },
    }).then(({ data }) => {
      console.log(data);
    });
  };

  const getAll = (e) => {
    e.preventDefault();
    refetch();
  };

  return (
    <>
      <form action="">
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
        />
        <input
          value={age}
          onChange={(e) => setAge(e.target.value)}
          type="number"
        />
        <div>
          <button onClick={(e) => addUser(e)}>Создать</button>
          <button onClick={getAll}>Получить</button>
        </div>
      </form>
      <div>
        {users.map((user) => (
          <div key={user.id}>
            {user.id}. {user.username} - {user.age}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
