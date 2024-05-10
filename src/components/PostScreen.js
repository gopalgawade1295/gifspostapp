import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Card, CardContent, Box, IconButton, Typography, TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import CircleIcon from '@mui/icons-material/Circle'
import { styled } from '@mui/material/styles'

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
    marginBottom: '8px',
    '&:hover': {
        background: '#CB4335',
        color: '#FFFFFF'
    }
})

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

const SButton2 = styled(Button)({
    background: '#28B463',
    color: '#FFFFFF',
    textTransform: 'none',
    borderRadius: 0,
    margin: '8px',
    marginBottom: '16px',
    padding: '8px',
    '&:hover': {
        background: '#28B463',
        color: '#FFFFFF'
    }
})

function PostScreen({ setPostScreen, postMessage, setPostMessage }) {
    const inputRef = useRef(null)
    const [message, setMessage] = useState('')
    const [color, setColor] = useState('#FFFFFF')
    const [font, setFont] = useState('#000000')
    const [gifsScreen, setGifsScreen] = useState(false)
    const [search, setSearch] = useState('')
    const [giphy, setGiphy] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [selectGiphy, setSelectGiphy] = useState([])
    const [messageGiphy, setMessageGiphy] = useState(false)
    const [isGiphy, setIsGiphy] = useState(false)

    const CFFFFFF = () => {
        setColor('#FFFFFF')
        setFont('#000000')
        inputRef.current.style.background = '#FFFFFF'
    }

    const C7B7D7D = () => {
        setColor('#7B7D7D')
        setFont('#FFFFFF')
        inputRef.current.style.background = '#7B7D7D'
    }

    const CDC7633 = () => {
        setColor('#DC7633')
        setFont('#FFFFFF')
        inputRef.current.style.background = '#DC7633'
    }

    const CD4AC0D = () => {
        setColor('#D4AC0D')
        setFont('#FFFFFF')
        inputRef.current.style.background = '#D4AC0D'
    }

    const C28B463 = () => {
        setColor('#28B463')
        setFont('#FFFFFF')
        inputRef.current.style.background = '#28B463'
    }

    const Search = async (e) => {
        e.preventDefault()
        setSearch(e.target.value)
        setError(false)
        setLoading(true)
        try {
            const response = await axios('https://api.giphy.com/v1/gifs/search', { params: { api_key: '', q: search } })
            setGiphy(response.data.data)
            setLoading(false)
        }
        catch (error) {
            setError(true)
            console.log(error)
        }
    }

    const SelectGiphy = async (id) => {
        let gif_id = id
        setIsGiphy(true)
        const response = await axios(`https://api.giphy.com/v1/gifs/${gif_id}`, { params: { api_key: '' } })
        setSelectGiphy(response.data.data)
        setMessageGiphy(true)
    }

    const Post = (e) => {
        e.preventDefault()
        setPostMessage([...postMessage, { id: Math.random(), message: message, color: color, font: font, selectGiphy: selectGiphy, isGiphy: isGiphy }])
        setPostScreen(false)
    }

    useEffect(() => {
        async function GetGiphy() {
            setError(false)
            setLoading(true)
            try {
                const response = await axios('https://api.giphy.com/v1/gifs/trending', { params: { api_key: '', limit: 5 } })
                console.log(response)
                setGiphy(response.data.data)
                setLoading(false)
            }
            catch (error) {
                setError(true)
                console.log(error)
            }
        }
        GetGiphy()
    }, [])

    return (
        <div>
            <SCard>
                <CardContent>
                    <Box textAlign='right'>
                        <SIconButton onClick={() => setPostScreen(!PostScreen)}>
                            <CloseIcon fontSize='small' />
                        </SIconButton>
                    </Box>

                    <Typography variant='body1' sx={{ background: '#1ABC9C', color: '#FFFFFF', p: 1, mb: 2 }}>
                        Compose post
                    </Typography>

                    <TextField fullWidth
                        id='outlined-size-small'
                        size='small'
                        sx={{ mb: 2, input: { color: font } }}
                        value={message}
                        ref={inputRef}
                        onChange={(e) => setMessage(e.target.value)}
                    />

                    {messageGiphy
                        ? <img src={selectGiphy.images.fixed_height.url} alt='' style={{ marginBottom: '16px' }} />
                        : null
                    }

                    <Box sx={{ mb: 1 }}>
                        <IconButton onClick={CFFFFFF}>
                            <RadioButtonUncheckedIcon fontSize='large' />
                        </IconButton>

                        <IconButton onClick={C7B7D7D}>
                            <CircleIcon fontSize='large' sx={{ color: '#7B7D7D' }} />
                        </IconButton>

                        <IconButton onClick={CDC7633}>
                            <CircleIcon fontSize='large' sx={{ color: '#DC7633' }} />
                        </IconButton>

                        <IconButton onClick={CD4AC0D}>
                            <CircleIcon fontSize='large' sx={{ color: '#D4AC0D' }} />
                        </IconButton>

                        <IconButton onClick={C28B463}>
                            <CircleIcon fontSize='large' sx={{ color: '#28B463' }} />
                        </IconButton>
                    </Box>

                    <SButton1 onClick={() => setGifsScreen(!gifsScreen)}>
                        <Typography variant='body1'>
                            Gifs
                        </Typography>
                    </SButton1>

                    <SButton2 onClick={Post}>
                        <Typography variant='body1'>
                            Post
                        </Typography>
                    </SButton2>

                    {gifsScreen
                        ? <Box sx={{ mb: 1 }}>
                            <TextField fullWidth
                                label='Search'
                                id='outlined-size-small'
                                size='small'
                                sx={{ mb: 2, input: { color: font } }}
                                value={search}
                                onChange={Search}
                            />
                        </Box>
                        : null
                    }

                    {loading
                        ? <Typography variant='body2'>Loading</Typography>
                        : error
                            ? <Typography variant='body2'>Error</Typography>
                            : <>
                                {giphy.map(Data => {
                                    return (
                                        <Box key={Data.id}>
                                            <img src={Data.images.fixed_height.url} alt='' onClick={() => SelectGiphy(Data.id)} />
                                        </Box>
                                    )
                                })}
                            </>
                    }
                </CardContent>
            </SCard>
        </div>
    )
}

export default PostScreen
