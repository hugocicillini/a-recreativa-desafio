import { Layout } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import CreateTasks from './components/CreateTasks';
import SearchBar from './components/SearchBar';
import Tasks from './components/Tasks';
import { Task } from './lib/Types';

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get('https://a-recreativa-desafio.onrender.com/api/tasks')
      .then((response) => {
        if (searchValue) {
          const filteredTasks = response.data.filter((task: Task) =>
            task.title.toLowerCase().includes(searchValue.toLowerCase())
          );
          setTasks(filteredTasks);
          setIsLoading(false);
        } else {
          setTasks(response.data);
          setIsLoading(false);
        }
      });
  }, [searchValue]);

  return (
    <Layout>
      <Header className="flex justify-between items-center md:px-64 py-12 bg-gray-600">
        <h1 className="text-xl lg:text-4xl">Atividades Pedagógicas</h1>
        <CreateTasks />
      </Header>
      <Content>
        <SearchBar setSearchValue={setSearchValue} />
        {isLoading ? (
          <p className="text-center min-h-[100vh] pt-12">Carregando...</p>
        ) : (
          <Tasks tasks={tasks} />
        )}
      </Content>
      <Footer className="flex justify-center items-center bg-gray-600">
        @2024 - hugocicillini :)
      </Footer>
    </Layout>
  );
};
export default App;
