'use client';

import { Button, FormProps, Modal } from 'antd';
import { useState } from 'react';
import { FieldType } from '../lib/Types';
import FormTasks from './FormTasks';
import axios from 'axios';

const CreateTasks = () => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const data = {
      ...values,
      collectionSkills: selectedSkills,
    };
    axios.post('http://localhost:5000/api/tasks/create', data).then(() => {
      window.location.reload();
    });
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo
  ) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Criar +
      </Button>
      <Modal
        title="Criar nova atividade"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <FormTasks
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          selectedSkills={selectedSkills}
          setSelectedSkills={setSelectedSkills}
        />
      </Modal>
    </>
  );
};
export default CreateTasks;
