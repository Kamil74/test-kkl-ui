import { snackbarStore } from './snackbarStore';


export {Snackbar} from "./Snackbar";
export const openSnackbar = snackbarStore.getState().open;
