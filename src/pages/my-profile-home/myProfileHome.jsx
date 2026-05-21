import { Mail01Icon, MoreVerticalIcon, StarIcon, UserEdit01Icon } from "hugeicons-react";
import { DropdownMenu, Theme } from "@radix-ui/themes";
export default function MyProfileHome(){
    return(
        <div
            className="px-4"
            style={{
                marginTop: '105px'
            }}
        >
            <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="d-flex align-items-center gap-3">
                    <span
                        className="d-flex align-items-center justify-content-center rounded-circle"
                        style={{
                            width: '80px',
                            height: '80px',
                            fontSize: '28px',
                            fontWeight: '500',
                            backgroundColor: '#EDF7FF',
                            color: '#10265B'
                        }}
                    >
                        CC
                    </span>
                    <div className="mt-2">
                        <p className="text-default-color fw-semibold fs-5 m-0">
                            Cláudio Cassoma
                        </p>
                    </div>
                </div>
                <div className="border rounded-2 p-1">
                    <Theme>
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger>
                                <MoreVerticalIcon />
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content
                                className="mt-2"
                            >
                                <DropdownMenu.Item
                                    className="text-default-color mb-1"
                                >
                                    <UserEdit01Icon />
                                    Editar informações
                                </DropdownMenu.Item>
                            </DropdownMenu.Content>
                        </DropdownMenu.Root>
                    </Theme>
                </div>
            </div>
            <div className='border rounded-4 p-0'>
                <div className="p-3 border-bottom mb-3">
                    <h3 className="text-default-color m-0 lh-base">Informações</h3>
                </div>
                <div className='p-3 py-1 pt-0 h-100'>
                    <ul className='list-unstyled d-flex flex-column gap-2'>
                        <li className='d-flex text-secondary justify-content-between'>Nome: <span className='text-default-color'>Cláudio Cassoma</span></li>
                        <li className='d-flex text-secondary justify-content-between'>Email: <span className='text-default-color'>claudio.cassoma@teste.com</span></li>
                        <li className='d-flex text-secondary justify-content-between'>Número de telefone: <span className='text-default-color'>+244 912 345 678</span></li>
                        <li className='d-flex text-secondary justify-content-between'>Data de integração: <span className='text-default-color'>01/01/2023</span></li>
                        <li className='d-flex text-secondary justify-content-between'>Número de imóveis anunciados: <span className='text-default-color'>12</span></li>
                        <li className='d-flex text-secondary justify-content-between'>Número de propostas enviadas: <span className='text-default-color'>8</span></li>
                        <li className='d-flex text-secondary justify-content-between'>Número de propostas recebidas: <span className='text-default-color'>15</span></li>
                        <li className='d-flex text-secondary justify-content-between'>Número de avaliações recebidas: <span className='text-default-color'>12</span></li>
                        <li className='d-flex text-secondary justify-content-between'>Avaliação média recebida: <span className='text-default-color d-flex align-items-center gap-2'><StarIcon size={'17'} /> 4.8 (12 avaliações)</span></li>                            
                    </ul>
                </div>
            </div>
        </div>
    )
}