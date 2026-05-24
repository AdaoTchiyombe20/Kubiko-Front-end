import Spinner from 'react-bootstrap/Spinner';

export default function SpinnerLoading({
    height,
    width
}){
    return(                            
        <Spinner 
            animation="border"
            role="status" 
            variant="primary"
            style={{ width: `${width}rem`, height: `${height}rem` }}
        >
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    )
}