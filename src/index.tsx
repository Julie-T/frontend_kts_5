import * as React from  'react';
import {render} from 'react-dom';
import styles from './styles.module.scss'
import './global.scss'
import Button from "components/Button";
import 'regenerator-runtime';

render(<div className={styles.title}>
    React приложение
    <div className={styles.picture}/>
    <Button object={null}>Button</Button>
</div>, document.getElementById('root'));

if (module.hot) {
    module.hot.accept();
}