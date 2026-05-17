import { CheckmarkBadge01Icon } from "hugeicons-react";

export default function PlanCards({
    name,
    price,
    description,
    features,
    index
}){
    return(
        <div className="rounded-5 p-4 pb-3" style={index === 1 ? {
            height: 'max-content',
            backgroundColor: '#fffafa',
            scale: 1.15
        } : {
            height: 'max-content',
            backgroundColor: '#fffafa'
        }}>
           <h3 className="fw-semibold mb-4">{name}</h3>         
           <h1 className="fw-semibold display-6">AOA {price}<span className="fw-normal fs-4 fw-semibold">/mês</span></h1>
           <p className="text-secondary">{description}</p>

           <button className="btn btn-primary bg-default-color text-white rounded-5 py-2 w-100">Try for free</button>

           <ul className="list-unstyled ps-2 mt-4 d-flex flex-column gap-3">
            {
                features?.map((feature, index) => (
                    <li key={index} className="d-flex align-items-center gap-2">
                        <CheckmarkBadge01Icon className="text-default-color" />
                        {feature}
                    </li>
                ))
            }
           </ul>
        </div>
    )
}