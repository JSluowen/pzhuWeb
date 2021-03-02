import React from 'react';
import { Menu } from 'antd';

import './aside.scss';

interface Item {
  id: number;
  name: string;
  num: number;
}

const Aside: React.FC<{
  title: string;
  data: Item[];
  onSelected: (selectedId) => void;
}> = ({ title, data = [], onSelected }) => {
  const handleSelected = params => {
    onSelected(params.key);
  };
  return (
    <div className="aside-container">
      <div className="aside-header">{title}</div>
      <div className="aside-menu">
        <Menu mode="vertical" defaultSelectedKeys={['-1']} onSelect={handleSelected}>
          <Menu.Item key={-1} className="menu-item">
            全部
          </Menu.Item>
          {data.map(item => (
            <Menu.Item key={item?.id} className="menu-item">
              <div>{item.name}</div>
              <div>{item.num}</div>
            </Menu.Item>
          ))}
        </Menu>
      </div>
    </div>
  );
};
export default Aside;
export { Aside, Item };
