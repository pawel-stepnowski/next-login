import { useLanguage } from "../context/LanguageContext";

export const defaultClassNames =
{
    container: 'alert alert-danger alert-dismissible',
    closeButton: 'btn-close'
};

/**
 * @param {{ message: string, onClose: () => void }} param0 
 * @returns 
 */
export default function FormError({ message, onClose })
{
    const { u } = useLanguage();
    const element = message && 
    <div className={defaultClassNames.container}>
        <span>{u(message)}</span>
        <button type="button" className={defaultClassNames.closeButton} onClick={onClose}></button>
    </div>;
    return element;
}