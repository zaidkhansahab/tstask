// src/pages/SecondPage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Paper, Box } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import DepartmentList from '../components/DepartmentList';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'userId', headerName: 'User ID', width: 150 },
  { field: 'title', headerName: 'Title', width: 300 },
  { field: 'body', headerName: 'Body', width: 500 },
];

const SecondPage: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Post[]>([]);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
      <Typography variant="h4" style={{ color: '#69a2d1', fontWeight: 600 }}>
          Data Table
        </Typography>
        <Paper elevation={3} sx={{ height: 400, width: '100%', p: 2 }}>
          <DataGrid rows={data} columns={columns} />
        </Paper>
      </Box>
      <Box sx={{ mt: 4 }}>
      <Typography variant="h4" style={{ color: '#69a2d1', fontWeight: 600 }}>
          Departments
        </Typography>
        <Paper elevation={3} sx={{ p: 2 }}>
          <DepartmentList />
        </Paper>
      </Box>
    </Container>
  );
};

export default SecondPage;
