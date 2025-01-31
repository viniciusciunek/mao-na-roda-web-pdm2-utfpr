import { Customer } from "../types/Customer";

export interface ICustomerRepository {
    getAllCustomers(): Promise<Customer[]>;
    getCustomerById(id: string): Promise<Customer>;
    createCustomer(customer: Customer): Promise<Customer>;
    updateCustomer(id: string, customer: Customer): Promise<Customer>;
    deleteCustomer(id: string): Promise<boolean>;
}
