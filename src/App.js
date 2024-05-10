import './App.css';
import React, { useState } from 'react';
import { AppBar, Button, Toolbar, Typography, Card, CardContent, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PostScreen from './components/PostScreen';
import { styled } from '@mui/material/styles';

const SButton1 = styled(Button)({
  background: '#1ABC9C',
  color: '#FFFFFF',
  textTransform: 'none',
  borderRadius: 0,
  margin: '8px',
  marginBottom: '16px',
  padding: '8px',
  '&:hover': {
    background: '#17A589',
    color: '#FFFFFF'
  }
})

const SCard = styled(Card)({
  minWidth: '275px',
  maxWidth: '500px',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginBottom: '16px'
})

const SIconButton = styled(IconButton)({
  background: '#FFFFFF',
  color: '#CB4335',
  '&:hover': {
    background: '#CB4335',
    color: '#FFFFFF'
  }
})

function App() {
  const [postScreen, setPostScreen] = useState(false)
  const [postMessage, setPostMessage] = useState([])

  const DeletePost = (id) => {
    setPostMessage(postMessage.filter(Post => Post.id !== id))
  }

  return (
    <div className="App">
      <AppBar elevation={0} sx={{ background: '#17A589' }}>
        <Toolbar sx={{ ml: 'auto', mr: 'auto' }}>
          <Typography variant='h6'>
            Gifs App
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />

      {!postScreen
        ? <>
          <SButton1 onClick={() => setPostScreen(true)}>
            <Typography variant='body1'>
              Write a post
            </Typography>
          </SButton1>

          <Typography variant='h2' sx={{ fontFamily: 'Dancing Script', color: '#17A589' }}>
            Gifs App
          </Typography>
        </>
        : null
      }

      {postScreen
        ? <PostScreen setPostScreen={setPostScreen} postMessage={postMessage} setPostMessage={setPostMessage} />
        : null
      }

      {postMessage.map(msg =>
        <SCard>
          <CardContent>
            <Box sx={{ background: msg.color, color: msg.font, p: 0.5 }} key={msg.id}>
              <Typography variant='body1' sx={{ p: 0.5 }}>
                {msg.message}
              </Typography>

              {msg.isGiphy
                ? <img src={msg.selectGiphy.images.fixed_height.url} alt='' />
                : null
              }

              <Box textAlign='right'>
                <SIconButton onClick={() => DeletePost(msg.id)}>
                  <DeleteIcon />
                </SIconButton>
              </Box>
            </Box>
          </CardContent>
        </SCard>)
      }
    </div>
  );
}

export default App;
