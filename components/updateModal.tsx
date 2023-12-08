import { Input, Modal, Select } from 'antd'

import React, { useState } from 'react'

const UpdateModal = ({isModalOpen,handleOk,handleCancel,setEditingTask,editingTask}:any) => {
    interface TaskType {
        key: string;
        name: string;
        priority: string;
      }
      const options = [
        {
          label: 'Yüksek',
          value: 'Yüksek',
        },
        {
          label: 'Orta',
          value: 'Orta',
        },
        {
          label: 'Düşük',
          value: 'Düşük',
        },
      ];
   
  const updateName = (value:any) => {
    setEditingTask((prev:any) => ({ ...prev, name: value }));
  };
  const updatePriority = (value:any) => {
    setEditingTask((prev:any) => ({ ...prev, priority: value }));
  };
  return (
    <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
    <div className='text-gray-600 text-center font-inter text-base font-medium leading-26 tracking-tighter mb-[20px]'>Görevi Düzenle</div>
    <div className='text-[#2B2F37] text-[15px] mb-[6px]'>Görev</div>
    <Input
      className='h-[34px] mb-[20px]'
      placeholder="Görev adını giriniz"
      value={editingTask?.name}
      onChange={(e) => updateName(e.target.value)}
    />

    <div className='text-[#2B2F37] text-[15px] mb-[6px]'>Görev Önceligi</div>
    <Select
      style={{ width: '100%' }}
      placeholder="Öncelikleri Seçiniz"
      onChange={(value) => updatePriority(value)}
      options={options}
      className='mb-[20px]'
      value={editingTask?.priority}
    />
  </Modal>
  )
}

export default UpdateModal