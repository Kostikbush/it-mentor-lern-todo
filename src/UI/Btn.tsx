import { Button, ButtonProps, styled } from '@mui/material';

interface BtnProps {
    style?: { [key: string]: string };
    text: string;
    handleClick: () => void;
}
const ColorButton = styled(Button)<ButtonProps>(sx => ({
    color: '#fff',
    border: 'none',
    textTransform: 'none',
    transition: '.3s all',
    borderRadius: '10px',
    margin: '0.5rem',
    fontSize: '13px',
    outline: '2px solid #bd93f9',
    '&:hover': {
        backgroundColor: '#bd93f9',
        border: 'none',
        borderRadius: '10px',
        outline: '2px solid #bd93f9',
    },
    '&:active': {
        outline: 'none',
    },
    ...sx,
}));

export const Btn = ({ handleClick, text, style = {} }: BtnProps) => {
    return (
        <ColorButton sx={style} onClick={handleClick} variant='outlined'>
            {text}
        </ColorButton>
    );
};
