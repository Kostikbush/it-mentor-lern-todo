import { TextField, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
    palette: {
        text: {
            primary: '#fff',
            disabled: '#fff',
            secondary: '#fff',
        },
        primary: {
            main: '#bd93f9',
        },
        secondary: {
            main: '#bd93f9',
        },
    },
});
interface Props {
    text: string;
    handleChange: Function;
    width: number;
    textField: string;
    placeholderText?: string;
}
export const Input = ({ handleChange, text, width, textField, placeholderText = '' }: Props) => {
    return (
        <ThemeProvider theme={theme}>
            <TextField
                sx={{
                    width: '100%',
                    margin: '0.5rem',
                    maxWidth: `${width}px`,
                    borderRadius: '.5rem',
                    color: '#bd93f9',
                    '&.Mui-checked': {
                        color: '#bd93f9',
                    },
                    '&:hover': {
                        borderColor: '#bd93f9',
                    },
                }}
                placeholder={placeholderText}
                size='small'
                value={text}
                onChange={e => handleChange(e.target.value)}
                id='outlined-basic'
                label={textField}
                variant='outlined'
            />
        </ThemeProvider>
    );
};
