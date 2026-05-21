import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { Nav, Tab, Tabs } from "react-bootstrap";
import { Link } from "react-router-dom";
import z, { array, set } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft02Icon, ArrowRight02Icon, Cancel01Icon, Download04Icon } from "hugeicons-react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import BackButton from "../../navigateBackButton/navigateBackButton";
import RealStateDetailsCard from "../../components/realStateDetailsCard/realStateDetailsCard";
import RegisterPropertyCounter from "../../components/registerPropertyCounter/registerPropertyCounter";
import { refreshToken, registerProperty } from "../../utils/requests";
import VariousModal from "../../components/modal/modal";
import Logo from "../../assets/imgs/kubiko.png";
import styles from "./index.module.css";
import { AppContext } from "../../components/context/appcontext";

export default function RegisterProperty() {

    const type_of_property = [
        {id: 1, name: 'APARTAMENTO'},
        {id: 2, name: 'VIVENDA'},
        {id: 3, name: 'ESCRITORIO'},
        {id: 4, name: 'FAZENDA'},
        {id: 5, name: 'TERRENO'},
        {id: 6, name: 'LOJA'},
        {id: 7, name: 'ARMAZEM'},
        {id: 8, name: 'HOTEL'},
        {id: 9, name: 'PENTHOUSE'},
        {id: 10, name: 'DUPLEX'},
        {id: 11, name: 'TRIPLEX'},
        {id: 12, name: 'QUARTO'},
        {id: 13, name: 'SUITE'},
        {id: 14, name: 'CONDOMINIO'},
        {id: 15, name: 'RESORT'},
        {id: 16, name: 'HOSPITAL'},
        {id: 17, name: 'ESCOLA'},
        {id: 18, name: 'RESTAURANTE'},
        {id: 19, name: 'CINEMA'},
        {id: 20, name: 'SHOPPING'}
    ]

    const municipalities = [
        {id: 1, name: 'Belas'},
        {id: 2, name: 'Cacuaco'},
        {id: 3, name: 'Camama'},
        {id: 4, name: 'Cazenga'},
        {id: 5, name: 'Hoji Ya Henda'},
        {id: 6, name: 'Ingombota'},
        {id: 7, name: 'Kilamba-Kiaxi'},
        {id: 8, name: 'Kilamba'},
        {id: 9, name: 'Maianga'},
        {id: 10, name: 'Mulenvos'},
        {id: 11, name: 'Mussulo'},
        {id: 12, name: 'Rangel'},
        {id: 13, name: 'Samba'},
        {id: 14, name: 'Sambizanga'},
        {id: 15, name: 'Talatona'},
        {id: 16, name: 'Viana'},
    ]

    const compartments_types = [
        {id: 1, name: 'QUARTO'},
        {id: 2, name: 'SALA_DE_ESTAR'},
        {id: 3, name: 'SALA_DE_LAZER'},
        {id: 4, name: 'ESCRITORIO'},
        {id: 5, name: 'QUARTO_DE_BANHO'},
        {id: 6, name: 'COZINHA'},
        {id: 7, name: 'LAVANDARIA'},
        {id: 8, name: 'GARAGEM'},
        {id: 9, name: 'VARANDA'},
        {id: 10, name: 'CLOSET'},
        {id: 11, name: 'DESPENSA'},
        {id: 12, name: 'HALL_DE_ENTRADA'},
        {id: 13, name: 'SALA_DE_JANTAR'},
        {id: 14, name: 'BIBLIOTECA'},
        {id: 15, name: 'QUARTO_DE_VISITAS'},
        {id: 16, name: 'SUITE_PRINCIPAL'},
        {id: 17, name: 'ADEGA'},
        {id: 18, name: 'QUARTO_DE_EMPREGADOS'},
        {id: 19, name: 'RECEPCAO'},
        {id: 20, name: 'SALA_DE_REUNIOES'},
        {id: 21, name: 'AUDITORIO'},
        {id: 22, name: 'LOJA'},
        {id: 23, name: 'ARMAZEM'},
        {id: 24, name: 'CANTINA'},
        {id: 25, name: 'GINASIO'},
        {id: 26, name: 'SPA'},
        {id: 27, name: 'PISCINA'},
        {id: 28, name: 'TERRAÇO'}
    ]

    const cadastrarImovel = {
        title: 'Nome do imovel', // já
        description: 'Descrição do imóvel', // já
        address_info: '[País], [Provincia], [Municipio]', // já
        neighborhood: 'Golf2', // já
        municipality: 'Belas', // já
        price: '250.000', // já
        is_negotiable: false, // já
        type_purchase: 'for_sale || for_rent', // já
        type_of_property: 'Loja', // já
        compartments : [
            {
                type: 'Quarto',
                quantity: 3
            },
            {
                type: 'SALA_DE_ESTAR',
                quantity: 1
            }
        ], // já
        total_area: '0', // já 
        latitude: '0', // já
        longitude: '0', // já
        images: [
            {}
        ], // já
        video: {
            url: 'https://www.youtube.com/watch?v=example',
        }
    }

    const {setShowModal, setShowLocalModal} = useContext(AppContext)

    useEffect(() =>{
        setShowModal(true)
        setShowLocalModal('registerProperty')
        refreshToken()
    }, [])

    const  [isLoading, setIsLoading] = useState(false)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const date = new Date().toLocaleDateString('pt-AO')
    const [payload, setPayload] = useState({})

    const [is_negotiable, setIsNegotiable] = useState(false);
    const [type_purchase, setTypePurchase] = useState("for_rent"); 

    const compartmentsSchema = z.object({
        type: z.string().refine(value => value !== '0', 'Selecione um compartimento'),
        quantity: z.string().min(1, 'A quantidade deve ser um número positivo')
    })
    const propertySchema = z.object({
        title: z.string().trim().min(20, 'Pelo menos 20 caracteres'),
        price: z.string().min(4, 'O preço mínimo é de 1000kz'),
        description: z.string().trim().min(25, 'Descrição muito curta'),
        municipality: z.string().refine(value => value !== '0', 'Selecione um munícipio'),
        type_of_property: z.string().refine(value => value !== '0', 'Selecione um tipo de propriedade'),
        neighborhood: z.string().trim().min(4, 'O bairro deve conter pelo menos 4 caracteres'),
    })
    const { register, handleSubmit, formState : {errors} } = useForm({
        mode: 'onChange',
        resolver: zodResolver(propertySchema)
    });
    const { register: registerCompartments, handleSubmit: handleSubmitCompartments, formState : {errors: errorCompartments}, reset: resetCompartmentsFields} = useForm({
        mode: 'onChange',
        resolver: zodResolver(compartmentsSchema)
    });
    const [compartmentsList, setCompartmentsList] = useState([
        {
            type: 'Quarto',
            quantity: 2
        },
        {
            type: 'SALA_DE_ESTAR',
            quantity: 1
        },
        {
            type: 'COZINHA',
            quantity: 1
        }
    ])
    const addCompartment = (type, quantity) => {
        setCompartmentsList(prev => [...prev, {
            type,
            quantity
        }])
    }
    const handleRemoveCompartment = (index) => {

        if(compartmentsList.length === 1)
            return toast.error('Pelo menos um compartimento é necessário')
        setCompartmentsList(prev => prev.filter((_, i) => i !== index))
    }
    const handleChangeCompartment = (index, field, value) => {
        setCompartmentsList(prev => prev.map((compartment, i) => i === index ? {
            ...compartment,
            [field]: Number(value)
        } : compartment))
    }
    const compartmentsPayload = (data) => {
        if(compartmentsList.some(compartment => compartment.type === data.type))
            return toast.error('Este compartimento já foi adicionado')
        addCompartment(data.type, Number(data.quantity))
        handleClose()
        resetCompartmentsFields()
    }
    const onSubmit = (data) => {
        data["type_purchase"] = type_purchase;
        data["is_negotiable"] = Boolean(is_negotiable)
        data["address_info"] = `Angola, Luanda, ${data.municipality}`
        data["compartments"] = compartmentsList
        data["total_area"] = '0'
        data["latitude"] = '0'
        data["longitude"] = '0'
        console.log(compartmentsList)
        setPayload(data)

        if (propertyInfo === 'informacoes') 
            setPropertyInfo('fotografias');
                        
        console.log(data)
    };
   
    const [propertyInfo, setPropertyInfo] = useState('informacoes');
    const { getRootProps, getInputProps} = useDropzone({
        accept: {
            'image/*': [],
            'video/*': []
        },
        multiple: true,
        maxFiles: 2,
        maxSize: 5 * 1024 * 1024, // 5MB
        onDrop: (fileDropped) => {
            const newVideos = fileDropped.filter(f => f.type.startsWith('video/'))
            const existingVideos = files.filter(f => f.type.startsWith('video/'))

            if (existingVideos.length + newVideos.length > 1) {
                toast.error('Só é permitido 1 vídeo')
                return
            }
            files.some(file => file.name === fileDropped?.[0]?.name) ? 
                toast.error('Este arquivo já foi adicionado') : 
            files.length > 1 || files.length + fileDropped.length > 2 ? 
                toast.error('Só podem ser carregados no máximo 2 arquivos') : 
            setFiles(prev => [...prev, ...fileDropped])
        },
        onDropRejected: (files) => {
            let errosAlert = []
            files.forEach((files) => {
                if(files.errors[0].code === 'too-many-files' && errosAlert.some((error) => error === 'Só podem ser carregados no máximo 2 arquivos') === false)
                    errosAlert.push('Só podem ser carregados no máximo 2 arquivos')
                else if(files.errors[0].code === 'file-invalid-type' && errosAlert.some((error) => error === 'Apenas arquivos de imagem são permitidos, por favor selecione arquivos com as seguintes extensões: .jpg, .jpeg, .png, .gif') === false)
                    errosAlert.push('Apenas arquivos de imagem são permitidos, por favor selecione arquivos com as seguintes extensões: .jpg, .jpeg, .png, .gif')
                else if(files.errors[0].code === 'file-too-large' && errosAlert.some((error) => error === 'O arquivo é muito grande, o limite é de 5MB por arquivo') === false)
                    errosAlert.push('O arquivo é muito grande, o limite é de 5MB por arquivo')
            })

            errosAlert.forEach( error => { toast.error(error) })
        }
    })

    const [files, setFiles] = useState([]);
    const fileItems = files.map(file => (
        <li 
            key={file.path}
            style={{
                height: '70px',
                minWidth: '320px'
            }}
            className="d-flex align-items-center justify-content-between border rounded-3 px-2"
        >
            <div className="d-flex gap-3 align-items-center h-100">
                <div>
                    {
                        file.type.startsWith('image/') ? (
                            <img
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                style={{
                                    width: '50px',
                                    height: '50px',
                                    objectFit: 'cover',
                                    borderRadius: '8px'
                                }}
                            />
                        ) : (
                            <video
                                src={URL.createObjectURL(file)}
                                style={{
                                    width: '50px',
                                    height: '50px',
                                    objectFit: 'cover',
                                    borderRadius: '8px'
                                }}
                            />
                        )
                    }
                </div>
            
                <div 
                    className="d-flex flex-column justify-content-evenly h-100"
                >
                    <p 
                        className="fw-semibold text-truncate m-0"
                        style={{
                            maxWidth: '260px',
                        }}
                    >
                        {file.name}
                    </p>
                    <p className="m-0 fw-light text-secondary">{ Number((file.size / 1000000).toFixed(2)) } MB</p>
                </div>
            </div>
            <Cancel01Icon
                size={16}
                onClick={() => setFiles(prev => prev.filter(prevFile => prevFile.name !== file.name)) }
            />
        </li>
    ))
    const showTitle = (key, title, descripiton) => {
        return(
            <motion.div
                key={key}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: -1 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.4 }}
                className="d-flex flex-column align-items-center gap-2"
            >
                <h1
                    className="m-0"
                    style={{
                        fontFamily: "Parkinsans",
                        fontSize: "38px",
                        fontWeight: "700",
                    }}
                >
                    {title}
                </h1>
                <p className="m-0 text-secondary">
                    {descripiton}
                </p>
            </motion.div>
        )
    }

    return (
        <>
            <VariousModal />

            <header className="d-flex align-items-center justify-content-between border-bottom">
                <Link to={"/"} className="img">
                    <img src={Logo} alt="" />
                </Link>
                <div className={styles.steps}>
                    {
                        [...Array(3)].map((_, index) => (
                            <div 
                                key={index}
                                className={`${styles.step} ${propertyInfo === 'informacoes' && index === 0 ? styles.active : propertyInfo === 'fotografias' && index === 1 ? styles.active : propertyInfo === 'finish' && index === 2 ? styles.active : ''}`}
                            >
                            </div>
                        ))
                    }
                </div>
            </header>
            <div className="container-fluid p-0">
                {
                    propertyInfo !== 'finish' ? (
                        <div
                            className="row w-100 m-0"
                            style={{
                                height: "calc(100vh - 160px)",
                            }}
                        >
                            <div className="col d-flex flex-column justify-content-center align-items-center h-100">
                                <AnimatePresence mode="wait">
                                    {
                                        propertyInfo === 'informacoes' ? showTitle('informacoes', 'Informações de imóvel', 'Fique à vontade para editar os dados do seu imóvel.') : propertyInfo === 'fotografias' ? showTitle('fotografias', 'Fotografias do imóvel', 'Adicione fotografias que destaquem o melhor do seu imóvel.') : ''
                                    }
                                </AnimatePresence>
                            </div>
                            <div className="col p-0 overflow-hidden">
                                <AnimatePresence mode="wait">
                                    {
                                        propertyInfo === 'informacoes' ? (
                                            <motion.div
                                                key="informacoes"
                                                initial={{ opacity: 0, x: -50 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -50 }}
                                                transition={{ duration: 0.4 }}
                                                className="w-100 h-100 d-flex justify-content-center align-items-center"
                                            >
                                                <form
                                                    id="form"
                                                    onSubmit={handleSubmit(onSubmit)}
                                                    action="#"
                                                    style={{
                                                        width: "80%",
                                                    }}
                                                >
                                                    <div className="form-floating w-100 mb-3">
                                                            <select
                                                                className="form-select text-secondary cursor-pointer outline-none shadow-none"
                                                                id="floatingSelecttype_of_property"
                                                                defaultValue={"0"}
                                                                {...register("type_of_property")}
                                                            >
                                                                <option value={"0"} hidden disabled>
                                                                    Selecione o tipo de propriedade
                                                                </option>
                                                                {
                                                                    type_of_property.map(property => (
                                                                        <option key={property.id} value={property.name}>{property.name.toLocaleString()}</option>
                                                                    ))
                                                                }
                                                            </select>
                                                            <label
                                                                className="text-black"
                                                                htmlFor="floatingSelecttype_of_property"
                                                            >
                                                                Tipo de Propriedade
                                                            </label>
                                                            {errors.type_of_property && ( <small className="text-danger">{errors.type_of_property.message}</small> )}
                                                    </div>
                                                    <div className="d-flex justify-content-between gap-4 mb-3">
                                                        <div className="form-floating w-100">
                                                            <input
                                                                {...register("title")}
                                                                type="text"
                                                                className="form-control text-secondary shadow-none outline-none"
                                                                id="floatingTitleInput"
                                                                placeholder="Ex: Casa no talatona"
                                                            />
                                                            <label className="text-black" htmlFor="floatingTitleInput">
                                                                Título do imóvel
                                                            </label>
                                                            {errors.title && ( <small className="text-danger">{errors.title.message}</small> )}
                                                        </div>
                                                        <div className="form-floating w-100">
                                                            <input
                                                                {...register("price")}
                                                                type="number"
                                                                className="form-control text-secondary shadow-none outline-none"
                                                                id="floatingPriceInput"
                                                                placeholder="1000"
                                                                min={'1000'}
                                                            />
                                                            <label className="text-black" htmlFor="floatingPriceInput">
                                                                Preço
                                                            </label>
                                                            {errors.price && ( <small className="text-danger">{errors.price.message}</small> )}
                                                        </div>
                                                    </div>

                                                    <div className="form-floating mb-4">
                                                        <textarea
                                                            {...register("description")}
                                                            className="form-control text-secondary shadow-none"
                                                            placeholder="Insira a descrição do imóvel"
                                                            id="floatingTextarea2Disabled"
                                                            style={{ 
                                                                height: "180px",
                                                                resize: "none"
                                                            }}
                                                        >
                                                        </textarea>
                                                        <label
                                                            className="text-black"
                                                            htmlFor="floatingTextarea2Disabled"
                                                        >
                                                            Descrição
                                                        </label>
                                                        {errors.description && ( <small className="text-danger">{errors.description.message}</small> )}
                                                    </div>

                                                    <div>
                                                        {
                                                            compartmentsList.map((compartment, index) => (
                                                                <RegisterPropertyCounter
                                                                    key={index}
                                                                    text={compartment.type}
                                                                    handleChangeCompartment={(value) =>
                                                                        handleChangeCompartment(index, 'quantity', Number(value))
                                                                    }
                                                                    quantity={compartment.quantity}
                                                                    handleRemoveCompartment={() => handleRemoveCompartment(index)}
                                                                />
                                                            ))
                                                        }
                                                    </div>

                                                    <div className="w-100 mb-3">
                                                        <>
                                                            <Button
                                                                variant="primary" 
                                                                onClick={handleShow}
                                                                className="w-100 bg-default-color border-0"
                                                            >
                                                                Adicionar um compartimento
                                                            </Button>

                                                            <Modal show={show} onHide={handleClose} centered size="lg">
                                                                <Modal.Header closeButton className="m-0 p-0 border-0">
                                                                <Modal.Title>Adicionar um compartimento</Modal.Title>
                                                                </Modal.Header>
                                                                <Modal.Body className="p-0 pt-3">
                                                                    <form 
                                                                        action=""
                                                                        id="addCompartmentsForm"
                                                                    >
                                                                        <div className="form-floating w-100 mb-3">
                                                                            <select
                                                                                className="form-select text-secondary cursor-pointer outline-none shadow-none"
                                                                                id="floatingSelectCompartments"
                                                                                defaultValue={"0"}
                                                                                {...registerCompartments("type")}
                                                                            >
                                                                                <option value={"0"} hidden disabled>
                                                                                    Selecione um compartimento
                                                                                </option>
                                                                                {
                                                                                    compartments_types.map(compartment => (
                                                                                        <option key={compartment.id} value={compartment.name}>{compartment.name}</option>
                                                                                    ))
                                                                                }
                                                                            </select>
                                                                            <label
                                                                                className="text-black"
                                                                                htmlFor="floatingSelectCompartments"
                                                                            >
                                                                                Tipo de compartimento
                                                                            </label>
                                                                        {errorCompartments.type && ( <small className="text-danger">{errorCompartments.type.message}</small> )}
                                                                        </div>

                                                                        <div className="form-floating w-100 mb-3">
                                                                            <input
                                                                                type="number"
                                                                                className="form-control text-secondary shadow-none outline-none"
                                                                                id="floatingInputCompartmentsQuantity"
                                                                                placeholder="Ex: 3"
                                                                                min={1}
                                                                                {...registerCompartments("quantity")}
                                                                            />
                                                                            <label className="text-black" htmlFor="floatingInputCompartmentsQuantity">
                                                                                Quantidade
                                                                            </label>
                                                                            {errorCompartments.quantity && ( <small className="text-danger">{errorCompartments.quantity.message}</small> )}
                                                                        </div>
                                                                    </form>
                                                                </Modal.Body>
                                                                <Modal.Footer className="p-0 m-0 border-0">
                                                                <button
                                                                    className="btn btn-primary bg-default-color py-2 border-0 w-100"
                                                                    onClick={handleSubmitCompartments(compartmentsPayload)}
                                                                    variant="primary"
                                                                    // onClick={handleClose}
                                                                >
                                                                    Adicionar compartimento
                                                                </button>
                                                                </Modal.Footer>
                                                            </Modal>
                                                        </>
                                                    </div>

                                                    <div className="mb-4">
                                                        <div className="d-flex align-items-center justify-content-between mb-2">
                                                            <p
                                                                className="m-0"
                                                                style={{
                                                                    fontFamily: "Parkinsans",
                                                                    fontSize: "16px",
                                                                    fontWeight: "500",
                                                                }}
                                                            >
                                                                Negociável
                                                            </p>
                                                            <div>
                                                                <Tab.Container
                                                                    activeKey={is_negotiable}
                                                                    onSelect={(k) => setIsNegotiable(k)}
                                                                    defaultActiveKey={false}
                                                                >
                                                                    <Nav className={styles.nav}>
                                                                        <Nav.Item>
                                                                            <Nav.Link eventKey={true}>Sim</Nav.Link>
                                                                        </Nav.Item>
                                                                        <Nav.Item>
                                                                            <Nav.Link eventKey={false}>Não</Nav.Link>
                                                                        </Nav.Item>
                                                                    </Nav>
                                                                </Tab.Container>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex align-items-center justify-content-between mb-2">
                                                            <p
                                                                className="m-0"
                                                                style={{
                                                                    fontFamily: "Parkinsans",
                                                                    fontSize: "16px",
                                                                    fontWeight: "500",
                                                                }}
                                                            >
                                                                Finalidade
                                                            </p>
                                                            <div>
                                                                <Tab.Container
                                                                    activeKey={type_purchase}
                                                                    onSelect={(k) => setTypePurchase(k)}
                                                                    defaultActiveKey="for_rent"
                                                                >
                                                                    <Nav className={styles.nav}>
                                                                        <Nav.Item>
                                                                            <Nav.Link eventKey={"for_rent"}>Aluguel</Nav.Link>
                                                                        </Nav.Item>
                                                                        <Nav.Item>
                                                                            <Nav.Link eventKey={"for_sale"}>Venda</Nav.Link>
                                                                        </Nav.Item>
                                                                    </Nav>
                                                                </Tab.Container>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="d-flex justify-content-between gap-4 mb-3">
                                                        <div className="form-floating w-100">
                                                            <select
                                                                className="form-select text-secondary cursor-pointer outline-none shadow-none"
                                                                id="floatingSelectMunicipality"
                                                                defaultValue={"0"}
                                                                {...register("municipality")}
                                                            >
                                                                <option value={"0"} hidden disabled>
                                                                    Selecione o munícipio
                                                                </option>
                                                                {
                                                                    municipalities.map(municipality => (
                                                                        <option key={municipality.id} value={municipality.name}>{municipality.name}</option>
                                                                    ))
                                                                }
                                                            </select>
                                                            <label
                                                                className="text-black"
                                                                htmlFor="floatingSelectMunicipality"
                                                            >
                                                                Munícipio
                                                            </label>
                                                            {errors.municipality && ( <small className="text-danger">{errors.municipality.message}</small> )}
                                                        </div>
                                                        <div className="form-floating w-100">
                                                            <input
                                                                type="text"
                                                                {...register("neighborhood")}
                                                                className="form-control text-secondary shadow-none outline-none"
                                                                id="floatingInputGrid"
                                                                placeholder="Golf2"
                                                            />
                                                            <label className="text-black" htmlFor="floatingInputGrid">
                                                                Bairro
                                                            </label>
                                                            {errors.neighborhood && ( <small className="text-danger">{errors.neighborhood.message}</small> )}
                                                        </div>
                                                    </div>
                                                </form>
                                            </motion.div>
                                        ) :  propertyInfo === 'fotografias' ? (
                                            <motion.div
                                                key="fotografias"
                                                initial={{ opacity: 0, y: -30 }}
                                                animate={{ opacity: 1, y: -1 }}
                                                exit={{ opacity: 0, y: 50 }}
                                                transition={{ duration: 0.4 }}
                                                className="w-100 h-100 d-flex justify-content-center align-items-center"
                                            >
                                                <section className={`${styles.dropzone} container col d-flex flex-column align-items-center justify-content-center p-0`}>
                                                    <div 
                                                        {...getRootProps({className: 'dropzone d-flex flex-column align-items-center h-100 py-5'})}
                                                        style={{
                                                            width: '90%',
                                                            border: '2px dashed #ECECF2',
                                                            borderRadius: '8px',
                                                        }}
                                                    >
                                                        <Download04Icon size={38} strokeWidth={'1'}/>
                                                        <p className='m-0 mt-2'>Clique para adicionar imagens</p>
                                                        <input 
                                                            {...getInputProps()}
                                                            className="border"
                                                            multiple
                                                            maxLength={2}
                                                        />
                                                    </div>
                                                    <aside>
                                                        <ul
                                                            className="list-unstyled d-flex justify-content-center flex-wrap gap-2 mt-4"
                                                        >
                                                            {fileItems}
                                                        </ul>
                                                    </aside>
                                                </section>
                                            </motion.div>
                                        ) : ''
                                    }
                                </AnimatePresence>
                            </div>
                        </div>
                    ) : (
                        <div 
                            className="row w-100 m-0"
                            style={{
                                height: "calc(100vh - 160px)",
                                padding: '40px 64px 64px 64px'
                            }}
                        >
                            <AnimatePresence mode="wait">                       
                                <motion.div
                                    key={'finish'}
                                    initial={{ opacity: 0, y: -30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 30 }}
                                    transition={{ duration: 0.4 }}
                                    className="w-100 h-100"
                                >
                                    <h1
                                        className="text-center mb-5"
                                        style={{
                                            fontFamily: "Parkinsans",
                                            fontSize: "58px",
                                            fontWeight: "700",
                                        }}
                                    >
                                        Cadastrar o seu imóvel
                                    </h1>
                                    <RealStateDetailsCard 
                                        whatIsThis="registerProperty"
                                        realStateInformations={payload} 
                                    />
                                    <form 
                                        className="mt-4 d-flex align-items-center gap-2"
                                        id="finishRegisterPropertyForm"
                                        onSubmit={(e)=>{
                                            e.preventDefault()
                                            
                                            registerProperty(payload, setIsLoading)
                                            console.log("Enviando dados para o backend...")
                                        }}
                                    >
                                        <input 
                                            type="checkbox"
                                            className="outline-none"
                                            name="terms"
                                            id="terms"
                                            style={{
                                                width: '18px',
                                                height: '18px'
                                            }}
                                            required
                                        />
                                        <label 
                                            htmlFor="terms"
                                            className="cursor-pointer"
                                            style={{
                                                fontSize: '18px'
                                            }}
                                        >
                                            Ao prosseguir com o cadastro, informo que li e concordo com os Termos e condições de cadastro e utilização desta plataforma e dos serviços prestados através do mesmo. *
                                        </label>
                                    </form>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    )
                }
            </div>
            <footer
                className="d-flex align-items-center justify-content-between border px-5"
                style={{
                    height: "80px",
                }}
            >
                <div>
                    <BackButton
                        icon={<ArrowLeft02Icon />}
                        onClick={() => propertyInfo === 'finish' ? setPropertyInfo('fotografias') : propertyInfo === 'fotografias' ? setPropertyInfo('informacoes') : ''}
                    />
                </div>
                <div>
                <button
                    type="submit"
                    form={propertyInfo === 'finish' ? "finishRegisterPropertyForm" : "form"}
                    disabled={isLoading}
                    className="btn btn-primary bg-default-color border-0 d-flex align-items-center gap-2 py-2 px-3"
                    onClick={() => {
                        if (propertyInfo === 'fotografias') {
                            if(files.length < 2){
                                toast.error('Adicione pelo menos 2 imagens do imóvel para prosseguir')
                                return
                            }

                            const images = files.filter(f => f.type.startsWith('image/'))
                            const videos = files.filter(f => f.type.startsWith('video/'))

                            if (images.length < 1) {
                                toast.error('Adicione pelo menos 1 imagem do imóvel')
                                return
                            }

                            if (videos.length > 1) {
                                toast.error('Só é permitido 1 vídeo')
                                return
                            }

                            setPayload(prev => ({
                                ...prev, 
                                images,
                                videos,
                                createdAt: date
                            }))
                            setPropertyInfo('finish')
                        }
                    }}
                >
                    {isLoading ? 'Enviando...' :  'Continuar'}
                    <ArrowRight02Icon />
                </button>
                </div>
            </footer>
        </>
    )
}