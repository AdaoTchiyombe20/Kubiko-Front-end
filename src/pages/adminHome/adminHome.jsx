import AdminHeader from "../../components/adminHeader/adminHeader";
import AdminIndicatorsCards from "../../components/adminIndicatorsCards/adminIndicatorsCards";
import Table from "../../components/table/table";

export default function AdminHome(){

    const contentManagementData = [
        {
            title: 'Total de imóveis',
            value: '6',
        },
        {
            title: 'Imóveis Pendentes',
            value: '92',
        },
        {
            title: 'Total de utilizadores',
            value: '147',
        },
        {
            title: 'Receita total',
            value: '$1.500.000,00',
        },
    ]
    const table = [
        { id: 1, title: 'Apartamento inacabado na Maianga', owner: 'Antónia Dias', type: 'Apartamento', price: 98000,  date: '25/07/2024', status: 'Publicado' },
        { id: 2, title: 'Vivenda T5 no Talatona com garagem pra até 5 carros', owner: 'Armindo Cungiqui', type: 'Vivenda', price: 95000,  date: '24/04/2026', status: 'Inativo' },
        { id: 3, title: 'Edifício com 6 andares nos combatentes', owner: 'Adão Tchiyombe', type: 'Prédio', price: 87000, date: '12/02/2026', status: 'Ativo' },
        { id: 4, title: 'Condomínio Vasto, legalizado em Luanda', owner: 'Cláudio Cassoma', type: 'Condomínio', price: 90000, date: '14/09/2025', status: 'Inativo' },
        { id: 5, title: 'Terreno com 40 mm2 no municipio de Icolo e Bengo', owner: 'Fazenda', type: 'Fabrica', price: 30000, date: '12/08/2025', status: 'Ativo' },
        { id: 6, title: 'Como funciona o período de férias', owner:'Angelino Chiwena', type: 'Residência', price: 77000, date: '16/05/2025', status:'Inativo'}
    ]
    return(
        <>
            <AdminHeader page={'Página inicial'} />
            <div
                style={{
                    marginTop: '90px'
                }}
            >
                <div className="px-3">
                    <h2 className="text-default-color fw-semibold">Seja bem-vindo!</h2>
                    <p className="m-0 text-secondary">Acompanhe os conteúdos sincronizados e identifique oportunidades de melhoria.</p>
                </div>
                <div className="container-fluid">
                    <div className="row gap-4 px-3 mt-4 mb-5">
                        {
                            contentManagementData.map((data) => (
                                <AdminIndicatorsCards title={data.title} value={data.value} />
                            ))
                        }
                    </div>
                </div>
                <div>
                    <Table 
                        tableArray={table} 
                        isThisTableFor = {'adminHome'} 
                        placeholder={'Busca por título, palavra-chave ou ID Externo'}
                        labelTable={'Lista de imóveis'}
                    />
                </div>

            </div>
        </>
    )
}