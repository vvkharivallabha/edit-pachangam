import { observer } from "mobx-react";
import StorageService from "../services/StorageService";

const PanchangamTable: React.FC = () => {
    if (StorageService.docs.size !== 0) {
        return (
            <>
                <h1>Panchangam table</h1>
                <table style={{ "margin": "auto" }}>
                    <tbody>
                        <tr>
                            <th>Date</th>
                            <th>Tithi</th>
                        </tr>
                        {Array.from(StorageService.docs.keys()).map((date) => {
                            const data = StorageService.docs.get(date);
                            return data && (<tr key={data.id}>
                                <td>{date}</td>
                                <td>{data.tithi}</td>
                            </tr>)
                        })}
                    </tbody>
                </table>
            </>)
    } else {
        return (<div>Data not available</div>)
    }
}

export default observer(PanchangamTable);