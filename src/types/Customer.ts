export type Customer = {
    id?: string;
    email: string;
    name: string;
    phone: string;
    username?: string;
    verified?: boolean;
    password?: string;
    passwordConfirm?: string;
    cnpj?: string;
    cpf?: string;
}
