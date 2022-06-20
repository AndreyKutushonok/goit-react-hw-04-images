import { Oval } from 'react-loader-spinner';
import s from './Loader.module.css';

export default function Loader() {
    return (
        <div className={s.Loader}>
            <Oval
                ariaLabel="loading-indicator"
                height={40}
                width={40}
                strokeWidth={5}
                color="blue"
                secondaryColor="#ccc"
            />
        </div>
    );
}