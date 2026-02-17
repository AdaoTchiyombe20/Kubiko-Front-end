import { motion, useScroll, useTransform, AnimatePresence } from "motion/react"
import { useRef ,useState} from "react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import house from "../../assets/imgs/house.png"
import house2 from "../../assets/imgs/house2.jpg"
import house3 from "../../assets/imgs/house3.jpg"
import house4 from "../../assets/imgs/house4.jpg"

export default function FeaturedProperties() {

    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => setShowModal(!showModal)
    const [activeItem, setActiveItem] = useState<typeof items[0] | null>(null)

    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    })

    // Move from first item centered to last item centered
    const totalDistance = (items.length - 1) * (ITEM_WIDTH + GAP)
    const x = useTransform(scrollYProgress, [0, 1], [0, -totalDistance])

    return (
        <div id="example">
            <div>
                <AnimatePresence>
                    {
                        showModal && (

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.4 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                style={{
                                position: "fixed",
                                    inset: 0,
                                    backgroundColor: "black",
                                    zIndex: 1000,
                                }}
                                onClick={handleShowModal}
                            >
                                <Modal
                                    show={true}
                                    onHide={handleShowModal}
                                    backdrop={false}
                                    centered
                                    contentClassName="p-3 border border-0 transparent-modal"
                                    size="xl"
                                >
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.12 } }}
                                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                    >
                                        <Modal.Body className="p-0 border border-0" style={{
                                            height: '80vh'
                                        }}>
                                            <a href="/filters" className="d-flex flex-column text-decoration-none justify-content-between" style={{
                                                width: '100%',
                                                height: '100%',
                                                backgroundImage: `url(${activeItem?.image})`,
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                                objectFit: 'cover',
                                                borderRadius: 20,
                                                marginBottom: 20,
                                            }}>
                                                <div className="p-4">
                                                    <h1 className="text-white">House Title</h1>
                                                </div>
                                                <motion.div
                                                    initial={{ y: 40, opacity: 0 }}  
                                                    animate={{ y: 0, opacity: 1 }}   
                                                    exit={{ y: 50, opacity: 0, transition: {duration: 0.1} }}     
                                                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
                                                >
                                                    <div className="text-white bg-dark p-4" style={{
                                                        height: '100%',
                                                        borderBottomLeftRadius: 20,
                                                        borderBottomRightRadius: 20
                                                    }}>
                                                       <h3>Footer Title</h3>
                                                       <p className="text-secondary mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis impedit, adipisci dolorum sunt nihil iusto nemo nisi inventore distinctio aspernatur ducimus voluptates illo qui maiores fugiat est magnam iste quia reprehenderit repudiandae incidunt cupiditate non nostrum dignissimos? Doloremque, amet. Nam, ea! Nostrum aperiam quasi quia alias asperiores impedit aliquid possimus perferendis eveniet magni tempore sequi libero molestiae autem expedita, rem ad accusantium illo veniam. Quasi obcaecati voluptatum accusantium labore asperiores unde totam maiores aliquid odit iusto optio quas, impedit quis?</p>
                                                    </div>
                                                </motion.div>
                                            </a>
                                        </Modal.Body>
                                    </motion.div>
                                </Modal>
                            </motion.div>
                        )
                    }
                </AnimatePresence>
            </div>
            <section className="intro-section">
                <h1 className="impact">Imóveis em <span className="text-warning">destaque</span></h1>
            </section>

            <div ref={containerRef} className="scroll-container">
                <div className="sticky-wrapper">
                    <motion.div className="gallery" style={{ x }}>
                        {
                            items.map((item) => (
                                <div
                                    key={item.id}
                                    className="gallery-item bg-black cursor-pointer"
                                    onClick={() => {
                                        setActiveItem(item)
                                        handleShowModal()
                                    }}
                                    style={
                                        {
                                            "--item-color": item.color,
                                            "--item-image": `url(${item.image})`,
                                        } as React.CSSProperties
                                    }
                                >
                                    <div className="item-content w-100 p-3">
                                        <span className="item-number">0{item.id}</span>
                                        <h2>{item.label}</h2>
                                    </div>
                                </div>
                            ))
                        }
                    </motion.div>
                </div>
            </div>
            <StyleSheet />
        </div>
    )
}

/**
 * ==============   Styles   ================
 */

function StyleSheet() {
    return (
        <style>{`

            body {
                overflow-x: hidden;
            }

            #example {
                height: auto;
                overflow: visible;
            }

            .intro-section {
                height: 20vh;
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                align-items: center;
                text-align: center;
                padding-bottom: 40px;
            }

            .intro-section h1 {
                font-size: clamp(36px, 8vw, 72px);
                color: #00000;
                margin: 0;
                text-transform: uppercase;
            }

            .scroll-container {
                height: 170vh;
                position: relative;
            }

            .sticky-wrapper {
                position: sticky;
                top: 0;
                height: 60vh;
                width: 400px;
                margin: 0 auto;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                overflow: visible;
            }

            .gallery {
                display: flex;
                gap: 30px;
                will-change: transform;
            }

            .gallery-item {
                flex-shrink: 0;
                width: 350px;
                height: 500px;
                border-radius: 12px;
                position: relative;
                overflow: hidden;
                background-image: var(--item-image);
                background-size: cover;
                background-position: center;
                border-radius: 40px;
            }
            

            .item-content {
                height: 35%;
                backdrop-filter: blur(8px);
                position: absolute;
                bottom: 0px;
                left: 0px;
                z-index: 1;
            }

            .item-number {
                font-size: 14px;
                color: var(--item-color);
                font-family: "Azeret Mono", monospace;
                display: block;
                margin-bottom: 8px;
            }

            .gallery-item h2 {
                font-size: 28px;
                font-weight: 600;
                color: #f5f5f5;
                margin: 0;
            }

            @media (max-width: 600px) {
                .sticky-wrapper {
                    width: 280px;
                }

                .gallery {
                    gap: 15px;
                }

                .gallery-item {
                    width: 280px;
                    height: 350px;
                }
            }

            @media (prefers-reduced-motion: reduce) {
                .gallery {
                    transform: none !important;
                }
                .scroll-container {
                    height: auto;
                }
                .sticky-wrapper {
                    position: relative;
                    height: auto;
                    width: 100%;
                    overflow-x: auto;
                    padding: 50px 0;
                }
            }
        `}</style>
    )
}

/**
 * ==============   Data   ================
 */

const items = [
    { id: 1, color: "#ff0088", label: "Night One", image: house4 },
    { id: 2, color: "#dd00ee", label: "Night Two", image: house},
    { id: 3, color: "#9911ff", label: "Night Three", image: house2 },
    { id: 4, color: "#0d63f8", label: "Night Four", image: house3 },
    { id: 5, color: "#0cdcf7", label: "Night Five", image: house4 },
]

const ITEM_WIDTH = 400
const GAP = 30
