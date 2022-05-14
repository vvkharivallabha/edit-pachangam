import { observer } from "mobx-react";
import { useEffect, useRef, useState } from "react";
import StorageService, { Panchangam } from "../services/StorageService";


const EditPanchangam: React.FC = () => {

    const [selectedDate, setSelectedDate] = useState<Date>();
    const document = selectedDate && StorageService.docs.get(selectedDate.toDateString());
    const [tithi, setTithi] = useState<string>();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const document = selectedDate && StorageService.docs.get(selectedDate.toDateString());
        setTithi(document?.tithi);
    }, [selectedDate])

    const handleDateChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setSelectedDate(new Date(event.currentTarget.value))
    }

    const handleTextInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setTithi(event.currentTarget.value)
    }

    const onSubmitChange = () => {
        const newValue = inputRef.current?.value;
        const newData = { ...document, tithi: newValue } as Panchangam;
        document?.ref && StorageService.updateValue(document.ref, newData)
    }

    if (StorageService.docs.size !== 0) {
        return (
            <div>
                <h1>Edit panchangam</h1>
                <input type="date" id="date" name="date" onChange={handleDateChange} />
                {selectedDate &&
                    <div>
                        <label htmlFor="tithi">Tithi:</label>
                        <input ref={inputRef} type="text" id="tithi" name="tithi" value={tithi} onChange={handleTextInputChange} />
                        <button onClick={onSubmitChange}>Change</button>
                    </div>}
            </div>)
    } else {
        return (<div>Data not available</div>)
    }

}

export default observer(EditPanchangam)