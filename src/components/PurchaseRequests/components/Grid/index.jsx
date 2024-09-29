import * as G from './styles';
import GridItem from '../GridItem'
// const lang = require(`../../../Languages/${process.env.REACT_APP_LANG}.json`)

const Header = ({ purchasesData, checked, setChecked, handleEdit }) => {

    return (
        <>
            <G.TableContent >
                <G.Table>
                    <G.Thead>
                        <G.Tr>
                            <G.Th width={25}></G.Th>
                            <G.Th width={25}>N°</G.Th>
                            <G.Th width={120}>Data</G.Th>
                            <G.Th width={145}>Centro de Custo</G.Th>
                            <G.Th width={100}>Solicitante</G.Th>
                            <G.Th width={250}>Descrição</G.Th>
                            <G.Th width={50}>Status</G.Th>
                            <G.Th width={50}>Editar</G.Th>
                        </G.Tr>
                    </G.Thead>
                    <G.Tbody>
                        {Array.from(purchasesData)?.map((item, index) => (
                            <GridItem key={item._id || index} item={item} index={index} checked={checked} setChecked={setChecked} handleEdit={handleEdit} />
                        ))}
                    </G.Tbody>
                </G.Table>
            </G.TableContent>
        </>
    )
}

export default Header

