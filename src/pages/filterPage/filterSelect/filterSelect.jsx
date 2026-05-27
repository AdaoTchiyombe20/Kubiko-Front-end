import Form from 'react-bootstrap/Form';

export default function FilterSelect({
    label,
    name,
    options,
    register
}){
    return(
       <select
       {...register(name)} 
        aria-label="Default select example" 
        className='outline-none shadow-none form-select' 
    >
            <option value={""} disabled>{label}</option> 
            {
                options.map((option) => (
                    <option value={`${option}`}>{option === 'FOR_RENT' ? 'Aluguel' : option === 'FOR_SALE' ? 'Venda' : option === 'true' ? 'Negociável' : option === "false" ? 'Não Negociável' : option}</option>
                ))
            }
        </select>
    )
}
