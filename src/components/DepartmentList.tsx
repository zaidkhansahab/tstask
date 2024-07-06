// src/components/DepartmentList.tsx
import React, { useState } from 'react';
import { List, ListItem, ListItemText, Collapse, Checkbox, ListItemIcon } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

interface Department {
  name: string;
  subDepartments: string[];
}

const departments: Department[] = [
  {
    name: 'Department 1',
    subDepartments: ['Sub 1-1', 'Sub 1-2', 'Sub 1-3'],
  },
  {
    name: 'Department 2',
    subDepartments: ['Sub 2-1', 'Sub 2-2'],
  },
];

const DepartmentList: React.FC = () => {
  const [open, setOpen] = useState<{ [key: string]: boolean }>({});
  const [selected, setSelected] = useState<{ [key: string]: boolean }>({});

  const handleToggle = (department: string) => {
    setOpen((prevOpen) => ({ ...prevOpen, [department]: !prevOpen[department] }));
  };

  const handleSelect = (department: string, subDepartment?: string) => {
    if (subDepartment) {
      setSelected((prevSelected) => ({
        ...prevSelected,
        [`${department}-${subDepartment}`]: !prevSelected[`${department}-${subDepartment}`],
      }));
      
    } else {
      const isSelected = !selected[department];
      setSelected((prevSelected) => {
        const newSelected = { ...prevSelected, [department]: isSelected };
        departments.find(dep => dep.name === department)?.subDepartments.forEach(sub => {
          newSelected[`${department}-${sub}`] = isSelected;
        });
        return newSelected;
      });
    }
  };

  return (
    <List>
      {departments.map((department) => (
        <div key={department.name}>
          <ListItem button onClick={() => handleToggle(department.name)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={selected[department.name] || false}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(department.name);
                }}
              />
            </ListItemIcon>
            <ListItemText primary={department.name} />
            {open[department.name] ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open[department.name]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {department.subDepartments.map((subDepartment) => (
                <ListItem
                  key={subDepartment}
                  button
                  sx={{ pl: 4 }}
                  onClick={() => handleSelect(department.name, subDepartment)}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={selected[`${department.name}-${subDepartment}`] || false}
                    />
                  </ListItemIcon>
                  <ListItemText primary={subDepartment} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </div>
      ))}
    </List>
  );
};

export default DepartmentList;
