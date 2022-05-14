interface MockToolsProps {
    toggleMockSetter: React.MouseEventHandler<HTMLInputElement>
}

const MockTools: React.FC<MockToolsProps> = (props) => {
    return (
        <>
            <label htmlFor='mock'>Mock values</label>
            <input type="checkbox" id="mock" name="mock" value="mock" defaultChecked onClick={props.toggleMockSetter} />
        </>
    )
}

export default MockTools;