import React, { useEffect, useState } from 'react';
import { Space, Table, Tag, message, Select, ConfigProvider, Input, Modal, Popconfirm, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Image from 'next/image';
import UpdateModal from './updateModal';
import { Search } from './search';

const TaskList = ({ task, setTask }: any) => {

  interface TaskType {
    key: string;
    name: string;
    priority: string;
  }

  const [searchText, setSearchText] = useState<string>('');
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskType>();
  const [tableData, setTableData] = React.useState<TaskType[]>([]);



  const confirm = (key: string) => {
    const updatedTask = task.filter((item: TaskType, index: number) => index.toString() !== key);
    setTask(updatedTask);
    setTableData(updatedTask);
    message.success('Görev silindi');

    // Local storage'dan görevi silme
    const existingTasks = localStorage.getItem('tasks');
    if (existingTasks) {
      const parsedExistingTasks: TaskType[] = JSON.parse(existingTasks);
      const updatedTasks = parsedExistingTasks.filter((item, index: number) => index.toString() !== key);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
  };
  const cancel = () => {
    message.error('Görev silinmedi');
  };


  const showModal = (record: TaskType) => {
    setEditingTask(record);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    if (editingTask) {
      // Task listesinde güncellenen görevin index'ini bul
      const updatedTaskIndex = task.findIndex((item: TaskType, index: number) => index.toString() === editingTask.key);

      // Task listesinde güncellenen görevi değiştir
      const updatedTaskList = [...task];
      updatedTaskList[updatedTaskIndex] = editingTask;

      // Task state'ini güncelle
      setTask(updatedTaskList);

      // Local storage'da da güncelle
      localStorage.setItem('tasks', JSON.stringify(updatedTaskList));
    }
    setIsModalOpen(false);

  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const handleChangePriorities = (values: string[]) => {
    setSelectedPriorities(values);
  };

  const columns: ColumnsType<TaskType> = [
    {
      title: 'Görev Adı',
      dataIndex: 'name',
      key: 'name',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text) => <a>{text}</a>,
      width: '788px',
    },
    {
      title: 'Öncelik',
      key: 'priority',
      dataIndex: 'priority',
      width: '206px',
      render: (priority) => (
        <>
          <Tag color={getTagColor(priority)} style={{
            color: getTextColor(priority), width: "100px", display: "flex", justifyContent: "center",
            fontSize: " 16px",
            fontWeight: " 500",
            lineHeight: " 22px",
            letterSpacing: "0.08px"
          }} >
            {priority.toUpperCase()}
          </Tag>
        </>
      ),
    },
    {
      title: 'İşlem',
      key: 'action',
      width: '206px',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => showModal(record)}>
            <div className='edit-button'/>
          </a>
          <Popconfirm
            title="Uyarı"
            description="Görevi silmek istediginize emin misiniz ? "
            onConfirm={() => confirm(record.key)}
            onCancel={cancel}
            okText="Evet"
            cancelText="Hayır"
          >
            <Button>
              <div
                className='trash-button'
              />
            </Button>
          </Popconfirm>

        </Space>
      ),
    },
  ];

  const getTagColor = (priority: string) => {
    switch (priority) {
      case 'Yüksek':
        return '#FCDCDC';
      case 'Orta':
        return '#FFFADB';
      case 'Düşük':
        return '#DFEAFE';
      default:
        return '#fff';
    }
  };
  const getTextColor = (priority: string) => {
    switch (priority) {
      case 'Yüksek':
        return '#BC1919';
      case 'Orta':
        return '#998200';
      case 'Düşük':
        return '#20509E';
      default:
        return 'black';
    }
  };

  useEffect(() => {
    const filteredData = task
      .filter((item: TaskType) => (!searchText || item?.name?.includes(searchText)))
      .filter((item: TaskType) => selectedPriorities.length === 0 || selectedPriorities.includes(item.priority));

    setTableData(
      filteredData.map((item: { name: string; priority: string }, index: number) => ({
        key: index.toString(),
        name: item.name,
        priority: item.priority,
      }))
    );
  }, [task, searchText, selectedPriorities]);

  return (
    <div className="mt-[66px]">
      <div className="text-[31px] font-medium leading-[38px] text-[#363A45] mb-[20px]">Görev Listesi</div>
      <Search setSearchText={setSearchText} handleChangePriorities={handleChangePriorities} />
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: '#FAFAFA',
              headerColor: '#3981F6',
              rowHoverBg: '#fff'
            },
          },
        }}
      >
        <Table columns={columns} dataSource={tableData} bordered pagination={false} />
      </ConfigProvider>
      <UpdateModal isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} setEditingTask={setEditingTask} editingTask={editingTask} />
    </div>
  );
};

export default TaskList;
