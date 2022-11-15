import { FC } from 'react';

interface loadingProps {}

const loading: FC<loadingProps> = ({}) => {
    return (
        <div className="my-20 text-center text-blue-400">
            Loading Messages...
        </div>
    );
};

export default loading;
