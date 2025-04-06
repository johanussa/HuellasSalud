export interface ListItemNavProps {
    path: string;
    name: string;
    icon: string;
    style?: boolean;
};

export interface LoginFormProps {
    errorMsg: string;
    viewPass: boolean;
    isValidData: boolean;
    changeIconEye: boolean;
    loading?: boolean;
    setViewPass: (updater: (prevState: boolean) => boolean) => void;
    setChangeIconEye: (updater: (prevState: boolean) => boolean) => void;
}