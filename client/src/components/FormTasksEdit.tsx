import { Button, Checkbox, Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FieldType } from '../lib/Types';

const FormTasksEdit = ({
  onFinish,
  onFinishFailed,
  selectedTask,
  selectedSkills,
  setSelectedSkills,
}: any) => {
  const [skills, setSkills] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/skills')
      .then((response) => {
        setSkills(response.data.map((skill: { name: string }) => skill.name));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Form
        name="basic"
        initialValues={{
          title: selectedTask.title,
          description: selectedTask?.description || '',
          goals: selectedTask.goals,
          collectionSkills: selectedSkills,
          totalTime: selectedTask.totalTime,
          resources: selectedTask.resources,
          stepByStep: selectedTask.stepByStep,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Título"
          name="title"
          rules={[{ required: true, message: 'Digite o título!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Descrição"
          name="description"
          rules={[{ required: false }]}
        >
          <TextArea />
        </Form.Item>

        <Form.Item<FieldType>
          label="Objetivos"
          name="goals"
          rules={[{ required: true, message: 'Digite os objetivos!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Habilidades"
          name="collectionSkills"
          rules={[{ required: true, message: 'Selecione as habilidades!' }]}
        >
          <Checkbox.Group
            options={skills}
            value={selectedSkills}
            onChange={(checkedValues) =>
              setSelectedSkills(checkedValues as string[])
            }
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Tempo Total"
          name="totalTime"
          rules={[{ required: true, message: 'Digite o tempo total!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Recursos Necessários"
          name="resources"
          rules={[{ required: true, message: 'Digite os recursos!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Passo a Passo"
          name="stepByStep"
          rules={[{ required: true, message: 'Digite o passo a passo!' }]}
        >
          <TextArea />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default FormTasksEdit;
