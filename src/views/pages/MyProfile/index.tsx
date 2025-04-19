import { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  Paper,
  useTheme
} from '@mui/material';

export default function MyProfile() {
  const theme = useTheme();

  const [name, setName] = useState('Yuvraj Kumar Singh');
  const [email, setEmail] = useState('yuvraj@example.com');
  const [mobile, setMobile] = useState('+91 123 456 7890');
  const [password, setPassword] = useState('');

  const handleUpdate = (field: string, value: string | null) => {
    if (!value) return;
    if (field === 'name') setName(value);
    else if (field === 'email') setEmail(value);
    else if (field === 'mobile') setMobile(value);
    else if (field === 'password') setPassword(value);
  };

  return (
    <Paper
      elevation={4}
      sx={{
        maxWidth: 900,
        margin: '60px auto',
        p: 4,
        borderRadius: 4,
        background: `linear-gradient(145deg, #1773BA70, #FFFFFFFF)`,
        boxShadow: '0 10px 40px rgba(0,0,0,0.08)'
      }}
    >
      <Typography variant="h4" align="center" fontWeight={600} gutterBottom>
        My Profile
      </Typography>

      <Typography variant="subtitle1" align="center" color="text.secondary" mb={4}>
        You can update your profile details here
      </Typography>

      <Grid container spacing={4}>
        {/* Name */}
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Full Name
          </Typography>
          <Box display="flex" gap={1}>
            <TextField
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter full name"
              sx={{ flex: 1 }}
              InputProps={{
                sx: {
                  borderRadius: 2,
                  backgroundColor: '#f9f9f9'
                }
              }}
            />
            <Button
              variant="contained"
              onClick={() => handleUpdate('name', prompt('Enter new name:', name))}
              sx={{
                // borderRadius: 2,
                height: '53px',
                whiteSpace: 'nowrap'
              }}
            >
              Update
            </Button>
          </Box>
        </Grid>

        {/* Email */}
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Email Address
          </Typography>
          <Box display="flex" gap={1}>
            <TextField
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              sx={{ flex: 1 }}
              InputProps={{
                sx: {
                  borderRadius: 2,
                  backgroundColor: '#f9f9f9'
                }
              }}
            />
            <Button
              variant="contained"
              onClick={() => handleUpdate('email', prompt('Enter new email:', email))}
              sx={{
                // borderRadius: 2,
                height: '53px',
                whiteSpace: 'nowrap'
              }}
            >
              Update
            </Button>
          </Box>
        </Grid>

        {/* Mobile */}
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Mobile Number
          </Typography>
          <Box display="flex" gap={1}>
            <TextField
              fullWidth
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter mobile number"
              sx={{ flex: 1 }}
              InputProps={{
                sx: {
                  borderRadius: 2,
                  backgroundColor: '#f9f9f9'
                }
              }}
            />
            <Button
              variant="contained"
              onClick={() =>
                handleUpdate('mobile', prompt('Enter new mobile number:', mobile))
              }
                sx={{
                  // borderRadius: 2,
                  height: '53px',
                  whiteSpace: 'nowrap'
                }}
            >
              Update
            </Button>
          </Box>
        </Grid>

        {/* Password */}
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Password
          </Typography>
          <Box display="flex" gap={1}>
            <TextField
              fullWidth
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              sx={{ flex: 1 }}
              InputProps={{
                sx: {
                  borderRadius: 2,
                  backgroundColor: '#f9f9f9'
                }
              }}
            />
            <Button
              variant="contained"
              onClick={() =>
                handleUpdate('password', prompt('Enter new password:', password))
              }
              sx={{
                // borderRadius: 2,
                height: '53px',
                whiteSpace: 'nowrap'
              }}
            >
              Update
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
