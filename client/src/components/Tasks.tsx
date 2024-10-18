import {
  Button,
  Card,
  Col,
  FormProps,
  Modal,
  Row,
  Space,
  Typography,
} from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { FieldType, Task } from '../lib/Types';
import FormTasksEdit from './FormTasksEdit';

const { Text, Title } = Typography;

const Tasks = ({ tasks }: { tasks: Task[] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const showModal = (task: Task) => {
    setSelectedTask(task);
    setSelectedSkills(
      task.collectionSkills.map((skill: any) =>
        typeof skill === 'object' && skill !== null ? skill.name : skill
      )
    );
    setIsModalOpen(true);
  };

  const onFinish = async (values: Task) => {
    axios
      .put(`http://localhost:5000/api/tasks/${selectedTask?._id}`, values)
      .then(() => {
        window.location.reload();
      });
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo
  ) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ padding: '4rem' }}>
      <Title level={3} style={{ textAlign: 'center', marginBottom: '4rem' }}>
        Lista de Atividades
      </Title>
      <Row gutter={[24, 24]} justify="center">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <Col key={task._id} xs={24} sm={12} md={8} lg={7}>
              <Card
                title={task.title}
                bordered={true}
                hoverable
                style={{
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                }}
              >
                <Space
                  direction="vertical"
                  size="middle"
                  style={{ width: '100%' }}
                >
                  <Text strong>Descrição:</Text>
                  <Text>{task.description || 'Descrição não disponível'}</Text>

                  <Text strong>Objetivos:</Text>
                  <Text>{task.goals}</Text>

                  <Text strong>Habilidades da BNCC:</Text>
                  <Text>
                    {task.collectionSkills
                      .map((skill) =>
                        typeof skill === 'object' && skill !== null
                          ? (skill as { name: string }).name
                          : skill
                      )
                      .join('; ')}
                  </Text>

                  <Text strong>Recursos:</Text>
                  <Text>{task.resources}</Text>

                  <Text strong>Tempo Total:</Text>
                  <Text>{task.totalTime}</Text>

                  <Text strong>Passo a Passo:</Text>
                  <Text>{task.stepByStep}</Text>

                  <Row justify="end" className="gap-2">
                    <Button type="primary" onClick={() => showModal(task)}>
                      ✏️
                    </Button>
                    <Modal
                      title="Editar Atividade"
                      open={isModalOpen}
                      onCancel={() => setIsModalOpen(false)}
                      footer={null}
                      mask={false}
                    >
                      {selectedTask && (
                        <FormTasksEdit
                          onFinish={onFinish}
                          onFinishFailed={onFinishFailed}
                          selectedTask={selectedTask}
                          selectedSkills={selectedSkills}
                          setSelectedSkills={setSelectedSkills}
                        />
                      )}
                    </Modal>
                    <Button
                      onClick={() =>
                        axios.delete(
                          `http://localhost:5000/api/tasks/${task._id}`
                        ).then(() => window.location.reload())
                      }
                    >
                      🗑️
                    </Button>
                  </Row>
                </Space>
              </Card>
            </Col>
          ))
        ) : (
          <Text>Não há tarefas!</Text>
        )}
      </Row>
    </div>
  );
};

export default Tasks;
