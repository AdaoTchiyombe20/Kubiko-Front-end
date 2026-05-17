import Form from 'react-bootstrap/Form';

export default function FilterSelect(props){
    return(
       <Form.Select aria-label="Default select example" className='outline-none shadow-none'>
            <option>{props.name}</option>
            {
                props.options.map((option) => (
                    <option value={`${option}`}>{option}</option>
                ))
            }
        </Form.Select>
    )
}