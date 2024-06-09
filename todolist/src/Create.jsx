/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import axios from 'axios';

// eslint-disable-next-line react/prop-types
export const Create = ({ onAddSuccess }) => {
    const [task, setTask] = useState('');
    
    const handleAdd = () => {
        axios.post('http://localhost:3001/add', { task })
            .then(result => {
                console.log(result);
                onAddSuccess();
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='create_form'>
            <input 
                type="text" 
                placeholder='Enter Task' 
                onChange={(e) => setTask(e.target.value)} 
                value={task} 
            />
            <button type="button" onClick={handleAdd}>Add</button>
        </div>
    );
};
