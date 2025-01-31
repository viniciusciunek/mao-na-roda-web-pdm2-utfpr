import { Customer } from "../types/Customer";
import { ICustomerRepository } from './../interfaces/ICustomerRepository';
import pb from "../services/pocketbase";

export default class CustomerRepository implements ICustomerRepository {
    async getAllCustomers(): Promise<Customer[]> {
        return await pb.collection('customers').getFullList();
    }

    async getCustomerById(id: string): Promise<Customer> {
        return await pb.collection('customers').getOne(id, {
            $autoCancel: false,
        });
    }

    async createCustomer(customer: Customer): Promise<Customer> {
        return await pb.collection('customers').create(customer);
    }

    async updateCustomer(id: string, customer: Customer): Promise<Customer> {
        return await pb.collection('customers').update(id, customer);
    }

    async deleteCustomer(id: string): Promise<boolean> {
        return await pb.collection('customers').delete(id);
    }
}
