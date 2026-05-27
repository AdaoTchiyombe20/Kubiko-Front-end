import { useEffect, useState } from "react";
import Spinner from 'react-bootstrap/Spinner';
import { Calendar04Icon, Location09Icon } from "hugeicons-react";
import { getMyProperties } from "../../utils/requests";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";

const emptyEditForm = {
    title: '',
    price: '',
    description: '',
    municipality: '',
    neighborhood: '',
    type_property_purchase: 'FOR_RENT',
    is_negotiable: false
}

export default function MyProperties(){

    const [isLoading, setIsLoading] = useState(false)    
    const [properties, setProperties] = useState([])
    const [showEditModal, setShowEditModal] = useState(false)
    const [selectedProperty, setSelectedProperty] = useState(null)
    const [editForm, setEditForm] = useState(emptyEditForm)

    useEffect(() => {
        getMyProperties(setProperties, setIsLoading)
    }, [])
    
    const openEditModal = (property) => {
        setSelectedProperty(property)
        setEditForm({
            title: property?.title || '',
            price: property?.price || '',
            description: property?.description || '',
            municipality: property?.property_localization?.municipality || '',
            neighborhood: property?.property_localization?.neighborhood || '',
            type_property_purchase: property?.type_property_purchase || 'FOR_RENT',
            is_negotiable: Boolean(property?.is_negotiable)
        })
        setShowEditModal(true)
    }

    const closeEditModal = () => {
        setShowEditModal(false)
        setSelectedProperty(null)
        setEditForm(emptyEditForm)
    }

    const handleEditChange = (field, value) => {
        setEditForm(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleSaveEdit = (e) => {
        e.preventDefault()

        if (editForm.title.trim().length < 10) {
            toast.error('O título deve ter pelo menos 10 caracteres')
            return
        }

        if (!editForm.price || Number(editForm.price) <= 0) {
            toast.error('Informe um preço válido')
            return
        }

        if (editForm.description.trim().length < 20) {
            toast.error('A descrição deve ter pelo menos 20 caracteres')
            return
        }

        setProperties(prev => prev.map(property => {
            const isSelected = (property.id || property.property_id) === (selectedProperty.id || selectedProperty.property_id)

            if (!isSelected) return property

            return {
                ...property,
                title: editForm.title.trim(),
                price: Number(editForm.price),
                description: editForm.description.trim(),
                type_property_purchase: editForm.type_property_purchase,
                is_negotiable: editForm.is_negotiable,
                updated_at: new Date().toISOString(),
                property_localization: {
                    ...property.property_localization,
                    municipality: editForm.municipality.trim(),
                    neighborhood: editForm.neighborhood.trim()
                }
            }
        }))

        toast.success('Informações atualizadas localmente')
        closeEditModal()
    }
 
    return(
        <div
            className="container-fluid px-3 px-md-4"
            style={{
                marginTop: '95px'
            }}
        >
            <h1 className="fw-semibold m-0 text-default-color">Meus Imóveis</h1>
            <p className="text-secondary m-0">Acompanhe o estado das propostas que você enviou</p>
            {
                isLoading ? (
                     <div 
                        className="w-100 d-flex justify-content-center align-items-center"
                        style={{
                            height: '80vh'
                        }}                    
                    >
                        <Spinner 
                            animation="border"
                            role="status" 
                            variant="primary"
                            style={{ width: "5rem", height: "5rem" }}
                        >
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                ) : (
                    <div className="mt-4">
                        {
                            properties.length > 0 ?(
                                properties.map((property, index) => (
                                    <div key={property.id || index} className="row g-3 align-items-center border p-3 p-md-4 rounded-3 shadow-sm mb-4 bg-white">
                                        <div className="col-12 col-lg-3">
                                            <img 
                                                src={property.property_medias?.[0]?.url}
                                                alt=""
                                                className="object-fit-cover w-100 h-100 rounded-2"
                                                style={{
                                                    minHeight: '180px',
                                                    maxHeight: '220px'
                                                }}
                                            />
                                        </div>
                                        <div className="col-12 col-lg-9 row g-3 align-items-center">
                                            <div className="col-12 col-xl-5">
                                            <div className="d-flex flex-column gap-1">
                                                <div
                                                    style={{
                                                    maxWidth: '290px'
                                                }}
                                                >
                                                    <h3 className="m-0 fw-semibold mb-2 text-default-color text-truncate">{property.title}</h3>
                                                    <p className="text-secondary m-0 d-flex align-items-center gap-2"><span><Location09Icon /></span> Luanda, {property.property_localization?.municipality}, {property.property_localization?.neighborhood}</p>
                                                </div>
                                                <p className="text-secondary m-0 d-flex align-items-center gap-2"><span><Calendar04Icon /></span> Enviada em: {new Date(property.updated_at).toLocaleString('pt-ao')}</p>
                                            </div>
                                            </div>
                                            <div className="col-12 col-md-6 col-xl-3">
                                                <p className="m-0 fs-5 fw-semibold text-default-color">{Number(property.price)?.toLocaleString("pt-AO", {style: 'currency', currency: 'AOA'})}</p>
                                                <p className="text-secondary m-0 d-flex align-items-center gap-2">Valor do imóvel</p>
                                            </div>
                                            <div className="col-12 col-md-6 col-xl-4 d-flex flex-column gap-2">
                                                <p
                                                    className={`${property.type_property_purchase === 'FOR_RENT' ? 'text-warning' : 'text-default-color'} d-flex justify-content-center fw-semibold rounded-2 border-0 py-2 m-0`}
                                                    style={{
                                                        backgroundColor: property.type_property_purchase === 'FOR_RENT' ? '#FCF3D5' : '#eaf6fc'
                                                    }}
                                                >
                                                    {property.type_property_purchase === 'FOR_RENT' ? 'Aluguel' : 'Venda'}
                                                </p>
                                                <button
                                                    className="btn btn-outline-primary fw-semibold border py-2 shadow-sm"
                                                    onClick={() => openEditModal(property)}
                                                >
                                                    Editar informações
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))) : (
                                    <div
                                        className="d-flex align-items-center justify-content-center"
                                        style={{
                                            height: '60vh'
                                        }}
                                    >
                                        <h1 className="display-4 text-center mt-5 fw-semibold text-default-color">Ainda não tem imóveis cadastrados</h1>
                                    </div>
                                )
                        }
                    </div>
                )
            }       
            <Modal show={showEditModal} onHide={closeEditModal} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Editar informações</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form id="editPropertyForm" onSubmit={handleSaveEdit}>
                        <div className="row g-3">
                            <div className="col-12">
                                <label className="form-label">Título do imóvel</label>
                                <input
                                    className="form-control shadow-none"
                                    value={editForm.title}
                                    onChange={(e) => handleEditChange('title', e.target.value)}
                                />
                            </div>
                            <div className="col-12 col-md-6">
                                <label className="form-label">Preço</label>
                                <input
                                    type="number"
                                    min="1"
                                    className="form-control shadow-none"
                                    value={editForm.price}
                                    onChange={(e) => handleEditChange('price', e.target.value)}
                                />
                            </div>
                            <div className="col-12 col-md-6">
                                <label className="form-label">Finalidade</label>
                                <select
                                    className="form-select shadow-none"
                                    value={editForm.type_property_purchase}
                                    onChange={(e) => handleEditChange('type_property_purchase', e.target.value)}
                                >
                                    <option value="FOR_RENT">Aluguel</option>
                                    <option value="FOR_SALE">Venda</option>
                                </select>
                            </div>
                            <div className="col-12 col-md-6">
                                <label className="form-label">Município</label>
                                <input
                                    className="form-control shadow-none"
                                    value={editForm.municipality}
                                    onChange={(e) => handleEditChange('municipality', e.target.value)}
                                />
                            </div>
                            <div className="col-12 col-md-6">
                                <label className="form-label">Bairro</label>
                                <input
                                    className="form-control shadow-none"
                                    value={editForm.neighborhood}
                                    onChange={(e) => handleEditChange('neighborhood', e.target.value)}
                                />
                            </div>
                            <div className="col-12">
                                <label className="form-label">Descrição</label>
                                <textarea
                                    rows="4"
                                    className="form-control shadow-none"
                                    value={editForm.description}
                                    onChange={(e) => handleEditChange('description', e.target.value)}
                                />
                            </div>
                            <div className="col-12">
                                <label className="d-flex align-items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={editForm.is_negotiable}
                                        onChange={(e) => handleEditChange('is_negotiable', e.target.checked)}
                                    />
                                    Negociável
                                </label>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-outline-secondary" onClick={closeEditModal}>Cancelar</button>
                    <button className="btn btn-primary bg-default-color border-0" form="editPropertyForm" type="submit">
                        Guardar alterações
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
