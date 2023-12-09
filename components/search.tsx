
import { Input, Select } from 'antd'
import Image from 'next/image'
import React from 'react'

export const Search = ({setSearchText,handleChangePriorities }:any) => {
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
  return (
    <div className="flex mb-[28px] justify-between gap-[20px] md:flex-col md:items-start">
    <Input
      className="w-[768px] h-[54px]  md:w-[460px] sm:!w-[300px]"
      size="large"
      placeholder="Görev adını filtrele"
      prefix={<Image src="/Research.svg" alt="icon" width={18} height={18} className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0 " />}
      onChange={(e) => setSearchText(e.target.value)}
    />
    <Select
      mode="multiple"
      placeholder="Öncelikleri Seçiniz"
      onChange={handleChangePriorities}
      options={options}
      removeIcon
      className='md:max-w-[460px]  w-full max-w-[385px] sm:!w-[300px] '
    />
  </div>
  )
}
