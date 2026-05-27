import { NumberField } from "@base-ui/react"
import { Add01Icon, MinusSignIcon } from "hugeicons-react"
import { FaTrash } from "react-icons/fa6"

export default function RegisterPropertyCounter({
    text,
    handleChangeCompartment,
    handleRemoveCompartment,
    quantity
}){

    // const textRemovedUnderscore = text.replace(/_/g, ' ')

    return(
        <div className="d-flex justify-content-between align-items-center gap-3 mb-2 flex-wrap">
            <p 
                className="m-0"
                style={{
                    fontFamily: 'Parkinsans',
                    fontSize: '16px',
                    fontWeight: '500',
                    overflowWrap: 'anywhere'
                }}
            >
                {text}
            </p>
            <div className="d-flex align-items-center gap-3 flex-shrink-0">
                <NumberField.Root
                    value={quantity} 
                    min={1}
                    onValueChange = {(value) => handleChangeCompartment(Number(value))} 
                >
                    <NumberField.ScrubArea>
                        <NumberField.ScrubAreaCursor />
                    </NumberField.ScrubArea>
                    <NumberField.Group className={"d-flex align-items-center gap-2"}>
                        <NumberField.Decrement
                            className="d-flex justify-content-center align-items-center border border-0 rounded-circle"
                            style={{
                                width: '32px',
                                height: '32px',
                                backgroundColor: '#EDEFFD'
                            }}
                        >
                            <MinusSignIcon size={14} color="#3541A9"/>
                        </NumberField.Decrement>
                        <NumberField.Input  
                            className={"border-0 outline-none text-center"}
                            style={{
                                width: '40px'
                            }}
                        />
                        <NumberField.Increment
                            className="d-flex justify-content-center align-items-center border border-0 rounded-circle"
                            style={{
                                width: '32px',
                                height: '32px',
                                backgroundColor: '#EDEFFD'
                            }}
                        >
                            <Add01Icon size={14} color="#3541A9"/>
                        </NumberField.Increment>
                    </NumberField.Group>
                </NumberField.Root>
                <FaTrash
                    color="red" 
                    className="cursor-pointer"
                    onClick={handleRemoveCompartment}
                />
            </div>
        </div>
    )
}
