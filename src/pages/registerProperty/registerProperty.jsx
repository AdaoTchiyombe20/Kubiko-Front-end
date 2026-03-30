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

export default function RegisterProperty() {
    const navigate = useNavigate();
    const propertySchema = z.object({
        title: z.string().min(20, 'Pelo menos 10 caracteres'),
        price: z.coerce.number().min(1000, 'O preço mínimo é de 1000kz'),
        description: z.string().min(255, 'Descrição muito curta'),
        bedroom: z.coerce.number().min(1, 'Número inválido'),
        bathroom: z.coerce.number().min(1, 'Número inválido'),
        kitchen: z.coerce.number().min(1, 'Número inválido'),
        municipality: z.string().min(1, 'Selecione um município'),
        neighborhood: z.string().min(4, 'O bairro deve conter pelo menos 4 caracteres'),
    })
    const { register, handleSubmit, formState : {errors} } = useForm({
        resolver: zodResolver(propertySchema)
    });
    const [furnished, setFurnished] = useState("Não");
    const [rentOrSell, setRentOrSell] = useState("Aluguel");
    const onSubmit = (data) => {
        data["purpose"] = rentOrSell;
        data["furnished"] = furnished;
        console.log(data);
    };
    const [propertyInfo, setPropertyInfo] = useState('informacoes');
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
        accept: {
            'image/*': []
        },
        multiple: true,
        maxFiles: 6,
        onDropRejected: () => alert('Apenas imagens são permitidas')
    });
    const files = acceptedFiles.map(file => (
        <li 
            key={file.path}
            style={{
                height: '70px',
                minWidth: '320px'
            }}
            className="d-flex align-items-center justify-content-between border rounded-3 px-3"
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
            <Cancel01Icon size={16}/>
        </li>
    ));
    console.log(acceptedFiles)

    return (
        <>
            <header className="d-flex align-items-center justify-content-between border-bottom">
                <Link to={"/"} className="img">
                <img src={Logo} alt="" />
                </Link>
            </header>
            <div className="container-fluid p-0">
                <div
                    className="row w-100 m-0"
                    style={{
                        height: "calc(100vh - 160px)",
                    }}
                >
                    <div className="col d-flex flex-column justify-content-center align-items-center ">
                        <AnimatePresence mode="wait">
                            {
                                propertyInfo === 'informacoes' ? (
                                    <motion.div
                                        key="informacoes"
                                        initial={{ opacity: 0, y: -30 }}
                                        animate={{ opacity: 1, y: -1 }}
                                        exit={{ opacity: 0, y: 50 }}
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
                                            Informações do imóvel
                                        </h1>
                                        <p className="m-0 text-secondary">
                                            Fique à vontade para editar os dados do seu imóvel.
                                        </p>
                                    </motion.div>
                                ) : propertyInfo === 'fotografias' ? (
                                    <motion.div
                                        key="fotografias"
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
                                            Fotografias do imóvel
                                        </h1>
                                        <p className="m-0 text-secondary">
                                            Adicione fotografias que destaquem o melhor do seu imóvel.
                                        </p>
                                    </motion.div>
                                ) : ''
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
                                                        id="floatingInputGrid"
                                                        defaultValue={"Ex: Casa no talatona"}
                                                    />
                                                    <label className="text-black" htmlFor="floatingInputGrid">
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
                                                        placeholder="Kz"
                                                        min={'1000'}
                                                        defaultValue={"1000"}
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
                                                    defaultValue="Insira a descrição do imóvel"
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
                                                    register={register}
                                                    registerLabel={"bedroom"}
                                                />
                                                <RegisterPropertyCounter
                                                    text={"Quartos de banho"}
                                                    register={register}
                                                    registerLabel={"bathroom"}
                                                />
                                                <RegisterPropertyCounter
                                                    text={"Cozinha"}
                                                    register={register}
                                                    registerLabel={"Kitchen"}
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
                                                        {...register("municipality", {required: true})}
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
                                                        defaultValue="Golf2"
                                                    />
                                                    <label className="text-black" htmlFor="floatingInputGrid">
                                                        Bairro
                                                    </label>
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
                                                <input {...getInputProps()} className="border" multiple maxLength={5}/>
                                            </div>
                                            <aside>
                                                <ul
                                                    className="list-unstyled d-flex justify-content-center flex-wrap gap-2 mt-4"
                                                >
                                                    {files}
                                                </ul>
                                            </aside>
                                        </section>
                                    </motion.div>
                                ) : ''
                            }

                        </AnimatePresence>
                        
                    </div>
                </div>
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
                        setPropertyInfo('informacoes')
                        // navigate("/")
                    }}
                />
                </div>
                <div>
                <button
                    type="submit"
                    form="form"
                    className="btn btn-primary bg-default-color border-0 d-flex align-items-center gap-2 py-2 px-3"
                    onClick={() => setPropertyInfo('fotografias')}
                >
                    Continuar
                    <ArrowRight02Icon />
                </button>
                </div>
            </footer>
        </>
    );
}
