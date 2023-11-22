import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  commentOuterContainer: {
    justifyContent: 'space-between',
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    maxWidth: 600,
    margin: "auto",
  },
  commentInnerContainer: {
    height: '200px',
    overflowY: 'auto',
    marginRight: '30px',
  },
  commentPaper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  commentFormContainer: {
    marginTop: theme.spacing(3),
  },
}));

export default useStyles;
