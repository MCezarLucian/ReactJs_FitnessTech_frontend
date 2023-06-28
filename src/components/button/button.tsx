import './button.scss';

interface ButtonComponent {
    name?: string;
    type?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonComponent> = (props: ButtonComponent): JSX.Element => {
    return (
        <button className="button_login"  onClick={props.onClick}>{props.name}</button>
    );
}

export default Button;