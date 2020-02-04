
;
import { theme } from '../../../../../theme.js';
import { fade } from '@material-ui/core/styles/colorManipulator';

export default {
    info: {
        backgroundColor: fade(theme.palette.primary.main, 0.2),
        marginTop: '20px',
        padding: '10px'
    },
    txt: {
        margin: '10px',
    },
    bold: {
        fontWeight: 'bold',
        textDecoration: 'underline'
    }
};