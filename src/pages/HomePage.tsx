// src/pages/HomePage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Paper, Grid } from '@mui/material';

const HomePage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [nameError, setNameError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const navigate = useNavigate();

  const validateName = (name: string) => {
    return name.trim().length > 0;
  };

  const validatePhone = (phone: string) => {
    const re = /^[0-9]{10}$/;
    return re.test(phone);
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = () => {
    let valid = true;
    if (!validateName(name)) {
      setNameError('Name is required.');
      valid = false;
    } else {
      setNameError(null);
    }

    if (!validatePhone(phone)) {
      setPhoneError('Invalid phone number. Must be 10 digits.');
      valid = false;
    } else {
      setPhoneError(null);
    }

    if (!validateEmail(email)) {
      setEmailError('Invalid email format.');
      valid = false;
    } else {
      setEmailError(null);
    }

    if (valid) {
      localStorage.setItem('user', JSON.stringify({ name, phone, email }));
      navigate('/second-page');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper style={{ padding: '20px', margin: '20px 0', backgroundColor: '#ffffff', borderRadius: '10px', boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)' }}>
        <Box style={{ textAlign: 'center', marginBottom: '20px' }}>
          <Typography variant="h4" style={{ color: '#69a2d1', fontWeight: 600 }}>
            User Information
          </Typography>
        </Box>
        <Grid container spacing={2} style={{ padding: '20px' }}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              variant="outlined"
              error={!!nameError}
              helperText={nameError || ''}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              fullWidth
              variant="outlined"
              error={!!phoneError}
              helperText={phoneError || ''}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              variant="outlined"
              error={!!emailError}
              helperText={emailError || ''}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default HomePage;
