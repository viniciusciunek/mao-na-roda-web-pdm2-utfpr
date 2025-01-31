import React, { useEffect, useState } from 'react'

import { Budget } from '../types/Budget';
import { BudgetItem } from '../types/BudgetItem';
import BudgetItemRepository from '../database/BudgetItemRepository';
import BudgetRepository from '../database/BudgetRepository';
import { Customer } from '../types/Customer';
import CustomerRepository from '../database/CustomerRepository';

const customerRepository = new CustomerRepository();
const budgetRepository = new BudgetRepository();
const budgetItemRepository = new BudgetItemRepository();

function ShowBudget() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [budget, setBudget] = useState<Budget | null>(null);
    const [budgetItems, setBudgetItems] = useState<BudgetItem[] | null>([]);
    const [customer, setCustomer] = useState<Customer | null>(null);

    const [badgeStatusColor, setBadgeStatusColor] = useState('bg-blue-300');
    const [textStatusColor, setTextStatusColor] = useState('text-blue-500');

    const queryParams = new URLSearchParams(window.location.search);
    const budgetId = queryParams.get('budgetId');
    const token = queryParams.get('token');

    const [status, setStatus] = useState('');

    useEffect(() => {
        if (!budgetId) {
            setError(true);
            setLoading(false);
            return;
        }

        fetchData();
    }, [budgetId]);

    async function fetchData() {
        setLoading(true);
        setError(false);
        try {
            const budgetRecord = await budgetRepository.getBudgetById(budgetId!);

            const customerRecord = await customerRepository.getCustomerById(budgetRecord.customer_id);

            const items = await budgetItemRepository.getAllBudgetItemsByBudgetId(budgetId!);

            if (budgetRecord.status === 'reproved' || budgetRecord.status === 'cancelled') {
                setBadgeStatusColor('bg-red-300');
                setTextStatusColor('text-red-500')
            } else if (budgetRecord.status === 'approved') {
                setBadgeStatusColor('bg-green-500');
                setTextStatusColor('text-white')
            } else {
                setBadgeStatusColor('bg-blue-300');
                setTextStatusColor('text-blue-500')
            }

            setBudget(budgetRecord);
            setCustomer(customerRecord);
            setBudgetItems(items);

        } catch (err) {
            console.error(err);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    async function handleApprove() {
        if (!budget) return;
        try {
            await budgetRepository.updateBudget(budgetId!, { ...budget, status: 'approved' });

            setStatus('approved')

            alert("Orçamento aprovado com sucesso!");
        } catch (err) {
            console.error(err);
            alert("Erro ao aprovar orçamento!");
        }
    }

    async function handleReprove() {
        if (!budget) return;
        try {
            await budgetRepository.updateBudget(budgetId!, { ...budget, status: 'reproved' });

            setStatus('reproved')

            alert("Orçamento reprovado!");
        } catch (err) {
            console.error(err);
            alert("Erro ao reprovar orçamento!");
        }
    }

    if (loading) return (
        <div className='flex justify-center items-center w-screen h-screen'>
            <h1 className='text-xl font-bold text-[#0E3087]'>carregando informações...</h1>
        </div>)

    if (error || !budget) return (
        <div className='bg-red-500 w-screen h-screen flex flex-col justify-center items-center'>
            <div className='flex flex-col justify-center items-center shadow p-4 rounded bg-white'>
                <h1 className='text-xl truncate font-bold text-red-500 uppercase'>não foi possível carregar dados.</h1>
                <h1>por favor, entre em contato com o administrador.</h1>
            </div>
        </div>
    )

    return (
        <div className='w-screen h-screen'>
            <div className='bg-[#0E3087] text-left p-4'>
                <h1 className='font-bold text-white text-2xl'>Visualizar Orçamento</h1>
            </div>

            <div className='p-4 shadow gap-2 h-10/12'>
                <div className='gap-2' >
                    <div className='p-2 bg-gray-200 rounded-md shadow'>
                        <p className='underline'>Orçamento Nº{"000" + budget.number}</p>
                        <p className='p-sm p-gray-400'>Cliente: {customer?.name}</p>
                    </div>

                    <div className='flex flex-row items-center mt-2 justify-center w-full'>
                        <div className={`w-3/4 p-2 p-center ${badgeStatusColor} rounded-md shadow`}>
                            <p className={`${textStatusColor} font-bold text-center`}>
                                {(() => {
                                    switch (budget?.status) {
                                        case 'pending_aprove':
                                            return 'PENDENTE APROVAÇÃO';
                                        case 'approved':
                                            return 'APROVADO';
                                        case 'cancelled':
                                            return 'CANCELADO';
                                        case 'reproved':
                                            return 'REPROVADO';
                                        case 'finished':
                                            return 'PAGO & FINALIZADO';
                                        default:
                                            return 'Desconhecido';
                                    }
                                })()}
                            </p>
                        </div>
                    </div>

                    <div className='mt-2'>
                        <div className='flex flex-row items-center justify-between w-full'>
                            <p className="w-1/3 p-2 p-center border font-nunito_xligth text-center">DESCRIÇÃO</p>
                            <p className="w-1/3 p-2 p-center border font-nunito_xligth text-center">QTD.</p>
                            <p className="w-1/3 p-2 p-center border font-nunito_xligth text-center">VALOR</p>
                        </div>
                        {budgetItems && budgetItems.map((item, index) => (
                            <div key={index} className="flex flex-row items-center justify-between w-full">
                                <p className="w-1/3 p-2 p-center border font-nunito_xligth">{item.expand.product_id.description}</p>
                                <p className="w-1/3 p-2 p-center border font-nunito_xligth text-center">{item.quantity}un</p>
                                <p className="w-1/3 p-2 p-center border font-nunito_xligth text-center">{`R$ ${item.total_price.toFixed(2)}`}</p>
                            </div>
                        ))}

                        <div className='flex flex-row items-center justify-between w-full'>
                            <p className="w-full p-2 p-center border font-nunito_xligth"></p>
                        </div>

                        <div className='flex flex-row items-center justify-between w-full'>
                            <p className="w-1/2 p-2 p-center border font-nunito_xligth text-center">VALOR TOTAL</p>
                            <p className="w-1/2 p-2 p-center border font-nunito_xligth text-center">R$ {Number(budget.total).toFixed(2)}</p>
                        </div>
                    </div>

                    <div className='mt-2'>
                        <label className='ml-2' htmlFor="obs">Observações</label>
                        <textarea name="obs" id="obs" className='flex flex-row items-center bg-transparent border border-[#0E3087] rounded-md px-4 w-full' readOnly>
                            {budget?.obs || 'Não há observações sobre o pedido.'}
                        </textarea>
                    </div>
                </div>

                <div className="gap-1 mt-2">
                    <div className="flex flex-row items-center justify-between gap-1 ">
                        <div className="flex-1">
                            <button className='flex flex-row-reverse items-center justify-evenly p-2 w-full text-center bg-red-500 text-white font-bold rounded-md shadow' onClick={handleReprove}>REPROVAR</button>
                        </div>
                        <div className="flex-1">
                            <button className='flex flex-row-reverse items-center justify-evenly p-2 w-full text-center bg-green-500 text-white font-bold rounded-md shadow' onClick={handleApprove}>APROVAR</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='bg-[#0E3087] text-left p-3 h-auto flex flex-col justify-center items-center'>
                <h1 className='font-bold text-white text-center text-xl'>Baixe nosso aplicativo na Play Store!</h1>
                <h1 className='font-bold text-white text-center text-xl'>© Mão na Roda</h1>
            </div>
        </div>
    );
}

export default ShowBudget;
