import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { Link, useNavigate } from "react-router-dom";
import { Nav, Tab, Tabs } from "react-bootstrap";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft02Icon, ArrowRight02Icon, Cancel01Icon, Download04Icon } from "hugeicons-react";
import BackButton from "../../navigateBackButton/navigateBackButton";
import RegisterPropertyCounter from "../../components/registerPropertyCounter/registerPropertyCounter";
import Logo from "../../assets/imgs/kubiko.png";
import styles from "./index.module.css";
import { toast } from "react-toastify";
import RealStateDetailsCard from "../../components/realStateDetailsCard/realStateDetailsCard";

export default function RegisterProperty() {
    const navigate = useNavigate();
    const propertySchema = z.object({
        title: z.string().trim().min(20, 'Pelo menos 20 caracteres'),
        price: z.coerce.number().min(1000, 'O preço mínimo é de 1000kz'),
        description: z.string().trim().min(25, 'Descrição muito curta'),
        municipality: z.string().refine(value => value !== '0', 'Selecione um munícipio'),
        neighborhood: z.string().trim().min(4, 'O bairro deve conter pelo menos 4 caracteres'),
    })
    const { register, handleSubmit, formState : {errors} } = useForm({
        resolver: zodResolver(propertySchema)
    });
    const [furnished, setFurnished] = useState("Não");
    const [rentOrSell, setRentOrSell] = useState("Aluguel");
    const [compartments, setCompartments] = useState({
        bedroom: 1,
        bathroom: 1,
        kitchen: 1
    })
    const handleCompartmentChange = (compartment, value) => {
        setCompartments(prev => ({
            ...prev,
            [compartment]: value
        }))
    }
    const onSubmit = (data) => {
        data["purpose"] = rentOrSell;
        data["furnished"] = furnished;
        Object.entries(compartments).forEach(([key, value]) => data[key] = value )
        propertyInfo === 'informacoes' && setPropertyInfo('fotografias')

        console.log(data);
    };
    const [propertyInfo, setPropertyInfo] = useState('informacoes');

    const { getRootProps, getInputProps} = useDropzone({
        accept: {
            'image/*': []
        },
        multiple: true,
        maxFiles: 2,
        onDrop: (fileDropped) => {
            files.some(file => file.name === fileDropped?.[0]?.name) ? 
                toast.error('Este arquivo já foi adicionado') : 
            files.length > 1 ? 
                toast.error('Só podem ser carregados no máximo 2 arquivos') : 
            setFiles(prev => [...prev, ...fileDropped])
            // const img = URL.createObjectURL(files[0])
            // console.log(img, files[0])
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
    });
    var [files, setFiles] = useState([]);
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
                        file.type.startsWith('image/') && (
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
            <header className="d-flex align-items-center justify-content-between border-bottom">
                <Link to={"/"} className="img">
                <img src={Logo} alt="" />
                </Link>
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
                                                    
                                                    <div className="mb-3">
                                                        <RegisterPropertyCounter
                                                            text={"Quartos"}
                                                            handleCompartmentChange={handleCompartmentChange}
                                                            key={"bedroom"}
                                                        />
                                                        <RegisterPropertyCounter
                                                            text={"Quartos de banho"}
                                                            handleCompartmentChange={handleCompartmentChange}
                                                            key={"bathroom"}
                                                        />
                                                        <RegisterPropertyCounter
                                                            text={"Cozinha"}
                                                            handleCompartmentChange={handleCompartmentChange}
                                                            key={"kitchen"}
                                                        />
                                                    </div>

                                                    <div className="mb-4">
                                                        <div className="d-flex align-items-center justify-content-between mb-2">
                                                            <div>
                                                                <Tab.Container
                                                                    activeKey={furnished}
                                                                    onSelect={(k) => setFurnished(k)}
                                                                    defaultActiveKey="Não"
                                                                >
                                                                    <Nav className={styles.nav}>
                                                                        <Nav.Item>
                                                                            <Nav.Link eventKey={"Sim"}>Sim</Nav.Link>
                                                                        </Nav.Item>
                                                                        <Nav.Item>
                                                                            <Nav.Link eventKey={"Não"}>Não</Nav.Link>
                                                                        </Nav.Item>
                                                                    </Nav>
                                                                </Tab.Container>
                                                            </div>
                                                            <p
                                                                className="m-0"
                                                                style={{
                                                                    fontFamily: "Parkinsans",
                                                                    fontSize: "16px",
                                                                    fontWeight: "500",
                                                                }}
                                                            >
                                                                Mobilado
                                                            </p>
                                                        </div>
                                                        <div className="d-flex align-items-center justify-content-between mb-2">
                                                            <div>
                                                                <Tab.Container
                                                                    activeKey={rentOrSell}
                                                                    onSelect={(k) => setRentOrSell(k)}
                                                                    defaultActiveKey="Aluguel"
                                                                >
                                                                    <Nav className={styles.nav}>
                                                                        <Nav.Item>
                                                                            <Nav.Link eventKey={"Aluguel"}>Aluguel</Nav.Link>
                                                                        </Nav.Item>
                                                                        <Nav.Item>
                                                                            <Nav.Link eventKey={"Venda"}>Venda</Nav.Link>
                                                                        </Nav.Item>
                                                                    </Nav>
                                                                </Tab.Container>
                                                            </div>
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
                                                                <option value="Kilamba-Kiaxi">Kilamba-Kiaxi</option>
                                                                <option value="Talatona">Talatona</option>
                                                                <option value="Ingombotas">Ingombotas</option>
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
                                                            multiple maxLength={5}
                                                            // {...register("images")}
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
                                        realStateInformations={{
                                            title: 'Casa no talatona',
                                            description: 'Casa com 4 quartos, 3 casas de banho, 1 cozinha, mobilada, localizada no talatona, com um preço acessível e ótima localização.',
                                            price: 1000000,
                                            bedrooms: 4,
                                            bathrooms: 3,
                                            kitchen: 1
                                        }} 
                                    />
                                    <form 
                                        className="mt-4 d-flex align-items-center gap-2"
                                        id="finishRegisterPropertyForm"
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
                        onClick={() => {
                            propertyInfo === 'finish' ? setPropertyInfo('fotografias') : propertyInfo === 'fotografias' ? setPropertyInfo('informacoes') : ''
                            // navigate("/")
                        }}
                    />
                </div>
                <div>
                <button
                    type="submit"
                    form={propertyInfo === 'finish' ? "finishRegisterPropertyForm" : "form"}
                    className="btn btn-primary bg-default-color border-0 d-flex align-items-center gap-2 py-2 px-3"
                    onClick={() => propertyInfo === 'fotografias' ? setPropertyInfo('finish') : ''}
                >
                    Continuar
                    <ArrowRight02Icon />
                </button>
                </div>
            </footer>
        </>
    );
}
