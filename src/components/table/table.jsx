import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Theme } from "@radix-ui/themes";
import { DropdownMenu } from '@radix-ui/themes';;
import { MoreVerticalIcon, Setup02Icon, UserCircle02Icon } from 'hugeicons-react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { GrMoreVertical } from 'react-icons/gr';

export default function Table({
    tableArray,
    placeholder,
    isThisTableFor,
    labelTable
}){


    const navigate = useNavigate()
    const [customers, setCustomers] = useState([]);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });    
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    useEffect(() => {
        setCustomers(tableArray);
    }, [tableArray]);

    const onGlobalFilterChange = (event) => {
        const value = event.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
    };

    const renderHeader = () => {
        const value = filters['global'] ? filters['global'].value : '';

        return (
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText type="search" className='w-25 rounded-4 outline-none shadow-none' value={value || ''} onChange={(e) => onGlobalFilterChange(e)} placeholder={placeholder} />
            </IconField>
        );
    };

    const header = renderHeader();

    return(
        <div className='bg-white prime_table px-3'>
            <div className="mb-3">
                {
                    header
                }
            </div>
            <div
                className='border border-bottom-0 rounded-top-4 d-flex align-items-center ps-3'
                style={{
                    height: '62px'
                }}
            >
                <p
                    className='text-default-color m-0'
                    style={{
                        fontSize: '18px',
                        fontWeight: '600'
                    }}
                >
                    {labelTable}
                </p>
            </div>
            {
                isThisTableFor === 'adminHome' && (
                    <DataTable
                        className='bg-white border p-1'
                        value={customers}
                        paginator
                        rows={5}
                        filters={filters}
                        onFilter={(e) => setFilters(e.filters)}    
                        selection={selectedCustomer} 
                        onSelectionChange={(e) => setSelectedCustomer(e.value)} 
                        selectionMode="single" 
                        dataKey="id"
                        stateStorage="session" 
                        stateKey="dt-state-demo-local" 
                        emptyMessage="No customers found." 
                        tableStyle={{ minWidth: '50rem' }}
                    >
                        <Column field="id" header="#" filterPlaceholder="Search" sortable style={{ width: '5%' }} bodyClassName={'id_column'}></Column>
                        <Column field="title" header="Título" sortable filterPlaceholder="Search" style={{ width: '20%' }} body = {
                            (item) => {
                                return(
                                    <span className='text-default-color text-truncate px-0'>
                                        {item.title}
                                    </span>
                                )}
                            }
                        >
                        </Column>
                        <Column field="owner" header="Proprietário" sortable filterPlaceholder="Search" style={{ width: '20%' }} body = {
                            (item) => {
                                return(
                                    <span className='text-default-color text-truncate px-0'>
                                        {item.owner}
                                    </span>
                                )}
                            }
                        >
                        </Column>
                        <Column field="type" header="Tipo" sortable filterPlaceholder="Search" style={{ width: '20%' }} body = {
                            (item) => {
                                return(
                                    <span className='text-default-color text-truncate px-0'>
                                        {item.type}
                                    </span>
                                )}
                            }
                        >
                        </Column>
                        <Column field="price" header="Preço" sortable filterPlaceholder="Search" style={{ width: '20%' }} body = {
                            (item) => {
                                return(
                                    <span className='text-default-color text-truncate px-0'>
                                        {item.price.toLocaleString('pt')},00kz
                                    </span>
                                )}
                            }
                        >
                        </Column>
                        <Column field='date' header="Data" sortable style={{ width: '15%' }} body = {
                            (item) => {
                                return(
                                    <span className='text-default-color text-truncate px-0'>
                                        {new Date(item.date).toLocaleDateString('pt-AO')}
                                    </span>
                                )}
                            }
                        >
                        </Column>
                        <Column field='status' header="Estado" sortable style={{ width: '10%' }} body = {
                            (item) => {
                                return(
                                    <span 
                                        className='text-white'
                                        style={{
                                            backgroundColor: item.status === 'Inativo' ?  '#FFCC00' : item.status === 'Ativo' ?'#278BFF' : item.status === 'Pendente' ? '#E83337' : item.status === 'Publicado' ? '#34C759' : '#CCCCCC',
                                            fontSize: '12px',
                                            padding: '4px 8px',
                                            borderRadius: '6px'
                                        }}
                                    >
                                        {item.status}
                                    </span>
                                )}
                            }
                        >
                        </Column>
                        <Column body = {
                                (item) => (
                                    <Theme>
                                        <DropdownMenu.Root>
                                            <DropdownMenu.Trigger>
                                                <GrMoreVertical />
                                            </DropdownMenu.Trigger>
                                            <DropdownMenu.Content>
                                                <DropdownMenu.Item
                                                    // onClick={() => {
                                                    //     setIsDeleting(false)
                                                    //     setSelectedEmployee(item)
                                                    //     setIsEditing(true)
                                                    //     handleShow()
                                                    // }}
                                                    className='cursor-pointer'
                                                >
                                                    Editar
                                                </DropdownMenu.Item>
                                                <DropdownMenu.Item 
                                                    className='cursor-pointer'
                                                    // onClick={() => {
                                                    //     setIsDeleting(true)
                                                    //     handleShow()
                                                    // }}
                                                > 
                                                    Eliminar
                                                </DropdownMenu.Item>
                                            </DropdownMenu.Content>
                                        </DropdownMenu.Root>
                                    </Theme>
                                )
                            }>
                            </Column>
                    </DataTable>
                )
            }
        </div>
    )
}