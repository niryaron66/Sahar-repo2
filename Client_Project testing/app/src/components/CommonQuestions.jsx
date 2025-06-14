import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Stack,
  IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import ExportIcon from '@mui/icons-material/ExitToApp';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import PropTypes from 'prop-types';

const theme = createTheme({
  typography: {
    fontFamily: '"Segoe UI", "Helvetica Neue", Arial, sans-serif', 
  },
});

function CommonQuestions({ handleLogout }) {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const faqs = [
    {
      question: 'כל כמה זמן התוסף מעדכן את המידע על השיחות?',
      answer: 'כל 2 שניות.',
    },
    {
      question: 'מתי ולמה קופצת התראה?',
      answer: 'התראה תקפוץ על שיחה עם אחוז אובדנות גבוה מ- 80%. ניתן להגדיר בדף הגדרות -> הגדרת תדירות התרעות , אחרי כמה דקות תקפוץ התראה חוזרת על אותה השיחה.',
    },
    {
      question: 'האם ניתן לראות מידע נוסף על השיחות?',
      answer: 'כן, יש ללחוץ על השיחה המבוקשת בכדי לבצע זאת.',
    },
    {
      question: 'איך ניתן להגיע לאופציית סיכום השיחה?',
      answer: 'יש ללחוץ על השיחה המבוקשת וללחוץ בחלון שנפתח על הכפתור - סיכום השיחה',
    },
    {
      question: 'כמה זמן שיחה נשארת בהיסטוריית שיחות?',
      answer: '4 שעות.',
    },
    {
      question: 'האם יש להשאיר את התוסף פתוח על מנת למשוך את השיחות?',
      answer: 'אין צורך. כל עוד האתר פתוח, הוא מתעדכן ברקע ובמידה ותתגלה שיחה עם מעל 80 אחוז אובדנות, תופיע התראה על כך.',
    },
  ];

  const goToConversationsHistory = () => {
    navigate('/conversation-history');
  };

  const goToSettings = () => {
    navigate('/settings');
  };

  const goToCommonQuestions = () => {
    navigate('/common-questions');
  };

  const goToHomePage = () => {
    navigate('/');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          direction: 'rtl',
          bgcolor: '#f0f8ff',
          overflow: 'hidden',
        }}
      >
           {/* Sidebar Menu */}
                   {isSidebarOpen && (
                                <Box
                                  sx={{
                                    width: { xs: '100%', md: 120 },
                                    position: { xs: 'relative', md: 'fixed' },
                                    top: 0,
                                    right: 0,
                                    height: { xs: 'auto', md: '100vh' },
                                    overflowY: 'auto',
                                    display: 'flex',
                                    flexDirection: { xs: 'row', md: 'column' },
                                    alignItems: 'center',
                                    justifyContent: { xs: 'space-around', md: 'flex-start' },
                                    pt: { xs: 2, md: 4 },
                                    pb: { xs: 2, md: 0 },
                                    boxShadow: 3,
                                    backgroundColor: '#4fa3f7',
                                    borderRadius: { xs: 0, md: '15px 0 0 15px' },
                                    zIndex: 1000,
                                    transition: 'transform 0.3s ease',
                                  }}
                                >
                                  {/* Sidebar buttons */}
                                  {[ 
                                    { icon: <HomeIcon sx={{ fontSize: { xs: 24, md: 30 }, color: 'white' }} />, text: 'דף בית', onClick: goToHomePage },
                                    { icon: <SettingsIcon sx={{ fontSize: { xs: 24, md: 30 }, color: 'white' }} />, text: 'הגדרות', onClick: goToSettings },
                                    { icon: <ExportIcon sx={{ fontSize: { xs: 24, md: 30 }, color: 'white' }} />, text: 'היסטוריית שיחות', onClick: goToConversationsHistory },
                                    { icon: <HelpOutlineIcon sx={{ fontSize: { xs: 24, md: 30 }, color: 'white' }} />, text: 'שאלות נפוצות', onClick: goToCommonQuestions },
                                  ].map((item, index) => (
                                    <Button
                                      key={index}
                                      onClick={item.onClick}
                                      sx={{
                                        mb: { xs: 0, md: 3 },
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: { xs: 0.5, md: 1 },
                                        textTransform: 'none',
                                        py: { xs: 0.5, md: 1 },
                                        px: { xs: 1, md: 2 },
                                        borderRadius: 2,
                                        backgroundColor: 'transparent',
                                        '&:hover': {
                                          backgroundColor: '#0056b3',
                                          boxShadow: 2,
                                        },
                                      }}
                                    >
                                      {item.icon}
                                      <Typography variant="body2" sx={{ 
                                        color: 'white',
                                        fontSize: { xs: '0.7rem', md: '0.875rem' }
                                      }}>
                                        {item.text}
                                      </Typography>
                                    </Button>
                                  ))}
                        
                                  {/* Logout button */}
                                  <Button
                                    onClick={() => typeof handleLogout === 'function' && handleLogout()}
                                    sx={{
                                      mb: { xs: 0, md: 3 },
                                      display: 'flex',
                                      flexDirection: 'column',
                                      alignItems: 'center',
                                      gap: { xs: 0.5, md: 1 },
                                      textTransform: 'none',
                                      py: { xs: 0.5, md: 1 },
                                      px: { xs: 1, md: 2 },
                                      borderRadius: 2,
                                      backgroundColor: '#66aaff',
                                      '&:hover': {
                                        backgroundColor: '#3381d6',
                                        boxShadow: 2,
                                      },
                                    }}
                                  >
                                    <LogoutIcon sx={{ fontSize: { xs: 24, md: 30 }, color: 'white' }} />
                                    <Typography variant="body2" sx={{ 
                                      color: 'white',
                                      fontSize: { xs: '0.7rem', md: '0.875rem' }
                                    }}>
                                      התנתק
                                    </Typography>
                                  </Button>
                                </Box>
                              )}
                        
                              {/* Toggle Button */}
                              <IconButton
                                onClick={toggleSidebar}
                                sx={{
                                  position: 'fixed',
                                  top: 16,
                                  right: isSidebarOpen ? { xs: 16, md: 140 } : 16,
                                  zIndex: 1100,
                                  backgroundColor: '#4fa3f7',
                                  color: 'white',
                                  '&:hover': {
                                    backgroundColor: '#3381d6',
                                  },
                                }}
                              >
                                <MenuIcon />
                              </IconButton>
  
          {/* Main Content */}
          <Box
  sx={{
    flexGrow: 1,
    p: { xs: 2, sm: 3, md: 4 },
    overflowY: 'auto',
    bgcolor: '#f0f8ff',
    width: { xs: '100%', md: isSidebarOpen ? 'calc(100% - 128px)' : '100%' },
    maxWidth: '1200px', 
    mx: { xs: 0, md: 'auto' },  
    mt: { xs: 2, md: 0 },
    mr: { xs: 0, md: isSidebarOpen ? 16 : 0 },
    transition: 'all 0.3s ease',
    height: '100vh',
    paddingBottom: 8,
  }}
>
            <Typography
              variant="h4"
              sx={{
                textAlign: 'center',
                fontWeight: 'bold',
                color: 'white',
                mt: { xs: 2, md: 4 },
                mb: 4,
                direction: 'rtl',
                bgcolor: '#4fa3f7',
                borderRadius: 3,
                p: 2,
                mx: { xs: 0, sm: 2, md: 8 },
                fontSize: { xs: '1.3rem', sm: '1.5rem', md: '1.75rem' },
              }}
            >
              שאלות נפוצות
            </Typography>
  
            <Stack spacing={{ xs: 2, md: 4 }}>
              {faqs.map((faq, idx) => (
                <Box
                  key={idx}
                  sx={{
                    p: { xs: 2, md: 3 },
                    borderRadius: 2,
                    bgcolor: idx % 2 === 0 ? '#f1f8ff' : '#e3f2fd',
                    boxShadow: 1,
                    '&:hover': {
                      boxShadow: 3,
                      cursor: 'pointer',
                    },
                    borderBottom: '1px solid #ddd',
                    mx: { xs: 0, sm: 2, md: 5 },
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 'bold',
                      mb: 1,
                      color: '#1976d2',
                      fontSize: { xs: '0.9rem', md: '1rem' },
                    }}
                  >
                    {faq.question}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#555',
                      fontSize: { xs: '0.8rem', md: '0.875rem' },
                    }}
                  >
                    {faq.answer}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        </Box>
    </ThemeProvider>
  );
  
}

CommonQuestions.propTypes = {
  handleLogout: PropTypes.func.isRequired, 
};

export default CommonQuestions;
