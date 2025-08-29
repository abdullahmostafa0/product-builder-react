interface IProps {
    message: string
}
const ErrorMesg = ({message} : IProps) => {
    return message ?<span className="block text-red-500 font-semibold text-sm">{message}</span> : null;
};

export default ErrorMesg;