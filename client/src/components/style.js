import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
    commentOuterContainer:{
        display:'flex', justifyContent: 'space-between',
    },
    commentInnerContainer:{
        height:'200px', overflowY: 'auto', marginRight:'30px'
    }
});