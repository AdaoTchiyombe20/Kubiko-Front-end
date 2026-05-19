import AdminBreadcrumb from "../../components/adminBreadcrumb/adminBreadcrumb";
import AdminHeader from "../../components/adminHeader/adminHeader";
import Table from "../../components/table/table";

export default function UsersManagement(){

    const table = [
        { id: 1, name: 'Cláudio Cassoma', owner: 'Antónia Dias', type: 'Apartamento', price: 98000,  date: '25/07/2024', status: 'Publicado' },
        { id: 2, name: 'Armindo Cungiqui', owner: 'Armindo Cungiqui', type: 'Vivenda', price: 95000,  date: '24/04/2026', status: 'Inativo' },
        { id: 3, name: 'Antónia Dias', owner: 'Adão Tchiyombe', type: 'Prédio', price: 87000, date: '12/02/2026', status: 'Ativo' },
        { id: 4, name: 'Angelino Chiwena', owner: 'Cláudio Cassoma', type: 'Condomínio', price: 90000, date: '14/09/2025', status: 'Inativo' },
        { id: 5, name: 'Adão Tchiyombe', owner: 'Fazenda', type: 'Fabrica', price: 30000, date: '12/08/2025', status: 'Ativo' },
    ]

    return(
        <>
            <AdminHeader page={'Gestão de usuários'} />
            <div
                style={{
                    marginTop: '90px',
                }}
            >
                <div className="px-4">
                    <AdminBreadcrumb page={'Gestão de usuários'} label={'Listagem de usuários'} />
                </div>
                <div className="px-4 mt-4">
                    <h2 className="m-0 text-default-color fw-semibold">Gestão de usuários</h2>
                    <p className="m-0 text-secondary">Gerencie os usuários e identifique oportunidades de melhoria.</p>
                </div>
                <div className="mt-5">
                    <Table
                        tableArray={table} 
                        isThisTableFor = {'users-management'} 
                        placeholder={'Busca por Nome, Proprietário ou tipo'}
                        labelTable={'Lista de usuários'}
                    />
                </div>
            </div>
        </>
    )
}