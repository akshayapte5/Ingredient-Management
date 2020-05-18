import React, { useState, useEffect } from 'react';

const ContactForm = (props) => {
    const initialFieldValues = {
        ingredientName: '',
        quantity: '',
        
    }

    var [values, setValues] = useState(initialFieldValues)


    useEffect(() => {
        if (props.currentId == '')
            setValues({ ...initialFieldValues })
        else
            setValues({
                ...props.contactObjects[props.currentId]
            })
    }, [props.currentId, props.contactObjects])

    const handleInputChange = e => {
        var { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleFormSubmit = e => {
        e.preventDefault()
        props.addOrEdit(values);
    }

    return (
        <form autoComplete="off" onSubmit={handleFormSubmit}>
            <div className="form-group input-group">                                            
            <input type="hidden" name="myitems" value="" />
            <select className="form-control" name="ingredientName" placeholder="Ingredient name"
                    value={values.ingredientName}
                    onChange={handleInputChange } required>

                <option value="" selected disabled hidden>Choose here</option>
                <option>Bun</option>
                <option>Tomato</option>
                <option>Onion</option>
                <option>Lettuce</option>
                <option>Egg</option>
                <option>Chicken</option>
                <option>Mayonnaise</option>
            </select>
                        
              
              
              
              
                {/* <input  className="form-control" name="ingredientName" placeholder="Ingredient name"
                    value={values.ingredientName}
                    onChange={handleInputChange}
                />                     */}
               
            </div>
            <div className="form-row">
                <div className="form-group input-group">            
                    <input className="form-control" name="quantity" placeholder="Quantity"
                        value={values.quantity}
                        onChange={handleInputChange} required
                    />
                </div>
             
            </div>
           
            <div className="form-group">
                <input type="submit" value={props.currentId == "" ? "Save" : "Update"} className="btn btn-primary btn-block" />
            </div>
            <div className="form-row">
                <p>Ingredients required for 1 burger :</p>
                </div>
                <div className="form-row"> 
                <p> 
                <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                                        Bun
                    <span class="badge badge-primary badge-pill">1</span>
                 </li>
                 <li className="list-group-item d-flex justify-content-between align-items-center">
                                        Tomato
                    <span class="badge badge-primary badge-pill">2</span>
                 </li>
                 <li className="list-group-item d-flex justify-content-between align-items-center">
                                        Onion
                    <span class="badge badge-primary badge-pill">2</span>
                 </li>
                 <li className="list-group-item d-flex justify-content-between align-items-center">
                                        Lettuce
                    <span class="badge badge-primary badge-pill">2</span>
                 </li>
                 <li className="list-group-item d-flex justify-content-between align-items-center">
                                        Egg
                    <span class="badge badge-primary badge-pill">1</span>
                 </li>
                 <li className="list-group-item d-flex justify-content-between align-items-center">
                                        Chicken
                    <span class="badge badge-primary badge-pill">1</span>
                 </li>
                 <li className="list-group-item d-flex justify-content-between align-items-center">
                                        Mayonnaise                                     
                    <span class="badge badge-primary badge-pill"> 2</span>
                 </li>
                    
                </ul>
                
                </p>
             
            </div>
        </form>
        
    );
}

export default ContactForm;