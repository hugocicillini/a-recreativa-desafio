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

  useEffect(() => {
    axios.get('http://localhost:5000/api/tasks').then((response) => {
      if (searchValue) {
        const filteredTasks = response.data.filter((task: Task) =>
          task.title.toLowerCase().includes(searchValue.toLowerCase())
        );
        setTasks(filteredTasks);
      } else {
        setTasks(response.data);
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
        <Tasks tasks={tasks} />
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
};
export default App;
