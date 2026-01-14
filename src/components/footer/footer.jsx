import { Facebook01Icon, Home12Icon, InstagramIcon, Linkedin01Icon } from "hugeicons-react";
import styles from './footer.module.css'
export default function Footer(){
    return(
        <footer className="footer bg-warning text-white">
          <div className="row footer_up d-flex justify-content-between pb-5">
            <div className={`${styles.footer_up_left} footer_up_left col-4`}>
              <div className={`${styles.footerLogo} d-flex align-items-center gap-2 mb-3`}>
                <div className="d-flex align-items-center justify-content-center rounded-3">
                  <Home12Icon color="#3541A9"/>
                </div>
                <h2 className="m-0">Kubiko</h2>
              </div>
              <p className="m-0">Acreditamos que todos merecem morar em habitações de qualidade, e o Kubiko está aqui comprometido em tornar o processo de encontrar imóveis transparente, eficiente e acessível a todo angolano.</p>
            </div>
            <div className="footer_up_right col-6">
              <div className="d-flex gap-5">
                <div>
                  <p className="m-0 fw-semibold">Navegação</p>
                  <ul className={`${styles.ulFooter} list-unstyled`}>
                    <li><a href="">Alugar imóveis</a></li>
                    <li><a href="">Comprar imóveis</a></li>
                    <li><a href="">Anunciar imóveis</a></li>
                    <li><a href="">Como funciona</a></li>
                  </ul>
                </div>
                <div>
                  <p className="m-0 fw-semibold">Precisa de ajuda?</p>
                  <ul className={`${styles.ulFooter} list-unstyled`}>
                    <li><a href="">Central de ajuda</a></li>
                  </ul>
                </div>
                <div>
                    <p className="m-0 fw-semibold">Redes Sociais</p>
                    <div className="d-flex align-items-center gap-2 mt-2">
                        <InstagramIcon />
                        <Facebook01Icon />
                        <Linkedin01Icon />
                    </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center border-top border-1 pt-5">
            <p>
              2026
              &copy;
              Kubiko. Todos os direritos reservados
            </p>
            <p>Design By <a href="#" className="text-white text-decoration-none">@jousembala</a></p>
          </div>
        </footer>
    )
}