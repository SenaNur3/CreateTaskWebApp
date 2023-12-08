
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
    <div className="flex mb-[28px] justify-between">
    <Input
      className="w-[768px] h-[54px]"
      size="large"
      placeholder="Görev adını filtrele"
      prefix={<Image src="/Research.svg" alt="icon" width={18} height={18} className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0 " />}
      onChange={(e) => setSearchText(e.target.value)}
    />
    <Select
      mode="multiple"
      style={{ width: '100%', maxWidth: '385px' }}
      placeholder="Öncelikleri Seçiniz"
      onChange={handleChangePriorities}
      options={options}
    />
  </div>
  )
}
