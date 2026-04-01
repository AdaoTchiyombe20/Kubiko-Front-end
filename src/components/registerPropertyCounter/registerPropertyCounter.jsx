import { NumberField } from "@base-ui/react"
import { Add01Icon, MinusSignIcon } from "hugeicons-react"

export default function RegisterPropertyCounter({
    text,
    handleCompartmentChange,
    registerLabel
}){
    return(
        <div className="d-flex justify-content-between mb-2">
            <p 
                className="m-0"
                style={{
                    fontFamily: 'Parkinsans',
                    fontSize: '16px',
                    fontWeight: '500',
                }}
            >
                {text}
            </p>
            <div>
                <NumberField.Root
                    defaultValue={1} 
                    min={1}
                    onValueChange = { e => handleCompartmentChange(registerLabel, e) } 
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
            </div>
        </div>
    )
}