import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Map from "../../_components/map/map";
import { listActions } from '../../_actions';
import Pagination from '../../_components/pagination/pagination';
import MaterialTable from 'material-table'
//import { options } from 'colorette';

function ListPage() {
    const list = useSelector(state => state.list);
    const [currentItems, setCurrentItems] = useState([]);
    const [selectedPositions, setSelectedPositions] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listActions.getAll());
    }, []);

    function handleDeleteItem(id) {
        dispatch(listActions.delete(id));
    }
    function getItemById(id){
        return currentItems.find(item=>item.id===id);
    }

    function onRowSelected(id) {
        const item = getItemById(id);
        const mapPositions = [
            {
                key: item.id,
                lat: item.positions[0].lat,
                lng: item.positions[0].lng,
                title: `userId ${item.userId}`,
                description: item.title,
            }, {
                key: item.id+1,
                lat: item.positions[1].lat,
                lng: item.positions[1].lng,
                title: `userId ${item.userId}`,
                description: item.title,
            }
        ];
        console.log("selectedPositions: ", selectedPositions)

        setSelectedPositions(mapPositions);
    }

    function onChangePage(pager) {
        console.log("pager", pager);
        setCurrentItems(pager.items);
    }

    return (
        <>
            <div className="">
                <div className="row"> 
                    {list.loading && <em>Loading items...</em>}
                    {list.error && <span className="text-danger">ERROR: {list.error}</span>}
                    {currentItems &&
                        <div className="col-9">
                            <MaterialTable
                                columns={[
                                    { title: 'id', field: 'id', type: 'string' },
                                    { title: 'title', field: 'title', type: 'string' }
                                ]}
                                data={currentItems.map((item) => { return { id: item.id, title: item.title } })}
                                title="Data"
                                onRowClick={(event, rowData) => {
                                    console.log("item: " + event.target)
                                         console.log("rowData: " + rowData)
                                    onRowSelected(rowData.id);
                                }}
                            />
                        </div>
                        // <ul>
                        //     {currentItems.map((item, index) =>
                        //         <li key={item.id}>
                        //             {item.title}
                        //         </li>
                        //     )}
                        // </ul>
                    }
                    <div className="col-3">
                        <div className="wrp-map">
                        {selectedPositions && <Map positions={selectedPositions} />}
                        </div>
                    </div>
                </div>
            </div>
            <Pagination items={list.items} onChangePage={onChangePage} />
        </>

    );
}


export { ListPage };