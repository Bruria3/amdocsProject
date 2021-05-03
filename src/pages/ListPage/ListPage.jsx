import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Map from "../../_components/map/map";
import { listActions } from '../../_actions';
import Pagination from '../../_components/pagination/pagination';
import MaterialTable from 'material-table'
import './list-page.scss'

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
    function getItemById(id) {
        return currentItems.find(item => item.id === id);
    }

    function getItemByEmail(email) {
        return currentItems.find(item => item.email === email)
    }

    function onRowSelected(email) {
        const item = getItemByEmail(email);
        const mapPositions = [
            {
                key: item._id,
                lat: +item.latitude,
                lng: +item.longitude,
                title: item.company,
                description: item.address,
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
            <div className="row">
                {list.loading && <em>Loading items...</em>}
                {list.error && <span className="text-danger">ERROR: {list.error}</span>}
                {currentItems &&
                    <div className="col-8">
                        <MaterialTable
                            columns={[
                                { title: 'First name', field: 'firstName', type: 'string' },
                                { title: 'Last name', field: 'lastName', type: 'string' },
                                { title: 'Company', field: 'company', type: 'string' },
                                { title: 'Email', field: 'email', type: 'string' }
                            ]}
                            data={currentItems.map((item) => { return { firstName: item.name.first, lastName: item.name.last, company: item.company, email: item.email } })}
                            title="People"
                            onRowClick={(event, rowData) => {
                                onRowSelected(rowData.email);
                            }}
                        />
                        <Pagination items={list.items} onChangePage={onChangePage} />
                    </div>

                    // <ul>
                    //     {currentItems.map((item, index) =>
                    //         <li key={item.id}>
                    //             {item.title}
                    //         </li>
                    //     )}
                    // </ul>
                }
                

                <div className="col-1">
                    <div className="wrp-map">
                        {selectedPositions && <Map positions={selectedPositions} />}
                    </div>
                </div>
            </div>
        </>

    );
}


export { ListPage };