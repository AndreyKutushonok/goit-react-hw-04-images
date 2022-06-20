import propTypes from 'prop-types';
import s from './Button.module.css';

export default function Button({ onClick }) {
    return (
        <div className={s.Wrapper}>
            <button className={s.Button} type="button" onClick={onClick}>
                Load more
            </button>
        </div>
    );
}

Button.propTypes = {
    onClick: propTypes.func.isRequired,
};