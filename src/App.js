import logo from './logo.svg';
import './App.css';
import { Button } from "@material-tailwind/react";
// import {motion} from "framer-motion"
import {AnimatePresence, motion} from 'framer-motion/dist/framer-motion'
import { Login } from './login1';
import { TransactionsTable } from './table';
import Modal from './modal';

function App() {
  return (<>
 {/* <TransactionsTable/>
//  */}
  <Modal/>
</>)
}

export default App;
