import Chip from '@mui/material/Chip';

const CommandStatusChip = ({ status }) => {
  const getStatusChip = (status) => {
    switch (status) {
      case 1:
      case 2:
      case 3:
        return (
          <Chip
            label="Pending"
            sx={{ backgroundColor: '#F7CB73', color: 'black',  borderRadius: 0 }}
          />
        );
      case 4:
        return (
          <Chip
            label="Success"
            sx={{ backgroundColor: '#82FF88', color: 'black',  borderRadius: 0 }}
          />
        );
      case 5:
        return (
          <Chip
            label="Failed"
            sx={{ backgroundColor: '#F8D3D2', color: 'black',  borderRadius: 0 }}
          />
        );
      case 6:
        return (
          <Chip
            label="Pending"
            sx={{ backgroundColor: '#F7CB73', color: 'black',  borderRadius: 0 }}
          />
        );

      default:
        return null;
    }
  };

  return getStatusChip(status);
};

export default CommandStatusChip;
