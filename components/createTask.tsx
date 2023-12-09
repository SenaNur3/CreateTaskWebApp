import React, { useEffect, useState } from 'react';
import { Input, Select, Button, message } from 'antd';

const CreateTask = ({ setTask }: any) => {
  const [text, setText] = useState("");
  const [prioritySelection, setPrioritySelection] = useState<any>(null);

  const handleMenuClick = (value: string) => {
    setPrioritySelection(value);
  };

  const createTask = () => {
    // Görev adı kontrol
    if (text.trim() === '' || text.length > 255 || !/^[a-zA-Z0-9]+$/.test(text)) {
      message.error('Görev adı geçerli değil. 255 karakteri geçmemeli ve sadece alfanümerik karakterler içermelidir.');
      return;
    }

    if (text.trim() === '' || prioritySelection.trim() === '') {
      message.error('Görev adı ve öncelik seçimi zorunludur.');
      return;
    }

    const newTask = { name: text, priority: prioritySelection };

    // Önce mevcut görevleri local storage'dan al
    const existingTasks = localStorage.getItem('tasks');
    const parsedExistingTasks = existingTasks ? JSON.parse(existingTasks) : [];

    // Yeni görevi ekleyerek güncelle
    const updatedTasks = [...parsedExistingTasks, newTask];
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    // Görevleri React state'ini güncelleyerek ekranı yenile
    setTask(updatedTasks);

    setText('');
    setPrioritySelection(null);
    message.success('Görev oluşturuldu');
  };

  return (
    <div className='mt-[40px]'>
      <div className='text-[31px] font-medium leading-[38px] text-[#363A45] mb-[20px]'>Yeni Görev Oluştur</div>
      <div>
        <div className='flex justify-between items-end gap-[20px] md:flex-col md:items-start'>
          <div className='flex flex-col w-[783px] md:w-[460px] sm:!w-[300px] '>
            <div className='text-[#2B2F37] text-[15px]'>Görev Adı</div>
            <Input className='h-[46px]' placeholder="Görev adını giriniz" value={text} onChange={(e) => setText(e.target.value)} />
          </div>
          <div className='flex flex-col w-[288px] '>
            <div className='text-[#2B2F37] text-[15px]'>Görev Önceligi</div>
            <Select
              placeholder="Seçiniz"
              className="w-[288px] h-[46px] sm:!w-[300px] md:w-[460px] "
              onChange={handleMenuClick}
              value={prioritySelection}
              options={[
                { value: 'Yüksek', label: 'Yüksek' },
                { value: 'Orta', label: 'Orta' },
                { value: 'Düşük', label: 'Düşük' },
              ]}
            />
          </div>
          <Button className='bg-[#FF6F09] text-[#fff] w-[89px] h-[46px] sm:w-[300px] ' onClick={createTask}>Oluştur</Button>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
