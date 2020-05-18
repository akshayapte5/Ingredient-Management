import React, { useState, useEffect } from 'react';
import ContactForm from "./ContactForm";
import firebaseDb from "../firebase";
import '../App.css';




const Contacts = () => {
  
	var [currentId, setCurrentId] = useState('');
    var [contactObjects, setContactObjects] = useState({})

    //Once components load complete
    useEffect(() => {
        firebaseDb.child('contacts').on('value', snapshot => {
            if (snapshot.val() != null) {
                setContactObjects({
                    ...snapshot.val()
                });
            }
        })
    }, [])


    const addOrEdit = (obj) => {
        if (currentId == '')
            firebaseDb.child('contacts').push(
                obj,
                err => {
                    if (err)
                        console.log(err)
                    else
                        setCurrentId('')
                })
        else
            firebaseDb.child(`contacts/${currentId}`).set(
                obj,
                err => {
                    if (err)
                        console.log(err)
                    else
                        setCurrentId('')
                })
    }

    const onDelete = id => {
        if (window.confirm('Are you sure to delete this record?')) {
            firebaseDb.child(`contacts/${id}`).remove(
                err => {
                    if (err)
                        console.log(err)
                    else
                        setCurrentId('')
                })
        }
        window.location.reload();
    
    }
    
        
    
    let basket = {"Bun": 0,"Tomato":0,"Onion":0,"Lettuce":0,"Egg":0,"Chicken":0,"Mayonnaise":0};
    Object.keys(contactObjects).forEach(function(ide){
        if(contactObjects[ide].ingredientName == "Bun"){
            basket.Bun = ~~(contactObjects[ide].quantity);
        }
        if(contactObjects[ide].ingredientName == "Tomato"){
            basket.Tomato = ~~(contactObjects[ide].quantity/2);
        }
        if(contactObjects[ide].ingredientName == "Onion"){
            basket.Onion = ~~(contactObjects[ide].quantity/2);
        }
        if(contactObjects[ide].ingredientName == "Lettuce"){
            basket.Lettuce = ~~(contactObjects[ide].quantity/2);
        }
        if(contactObjects[ide].ingredientName == "Egg"){
            basket.Egg = ~~(contactObjects[ide].quantity);
        }
        if(contactObjects[ide].ingredientName == "Chicken"){
            basket.Chicken = ~~(contactObjects[ide].quantity);
        }
        if(contactObjects[ide].ingredientName == "Mayonnaise"){
            basket.Mayonnaise = ~~(contactObjects[ide].quantity/2);
        }
        
    })
    // console.log(basket);
    console.log(contactObjects);
    var key_min   = Object.keys(basket);
    var lowest = Math.min.apply(null, key_min.map(function(x) { return basket[x]} ));
    // console.log(lowest);
    const howManyBurgers = (lowest) =>{
        let answer;
         document.getElementById("answer").innerHTML = lowest;
    
    }
     
      
 
 
  
  return (
        <>
            <div className="jumbotron jumbotron-fluid">
            
                <div className="container">
                    <h1 className="display-4 text-center">INGREDIENT MANAGEMENT</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-5">
                    <ContactForm {...({ currentId, contactObjects, addOrEdit })} />
                </div>
                <div className="col-md-7">
                    <table className="table table-borderless table-stripped">
                        <thead className="thead-light">
                            <tr>
                            <td>
                                <button class="btn btn-info" onClick={()=>howManyBurgers(lowest)}> Check how many burgers</button>
                                <span> </span>
                                <textbox id="answer" > </textbox>
                                </td>
                                
                            </tr>
                            <br></br>
                            <tr>
                                <th>Ingredient Name</th>
                                <th>Quantity</th>
                                <th>Action</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(contactObjects).map((key) => (

                                
                                    <tr key={key}>
                                        
                                        <td>{contactObjects[key].ingredientName}</td>
                                        <td>{contactObjects[key].quantity}</td>
                                        
                                        
                                        <td>
                                            <button type="button" class="btn btn-primary" onClick={() => { setCurrentId(key) }}>
                                                {/* <i className="fas fa-pencil-alt"></i> */}
                                                <span>Add / Remove</span>                                               
                                            </button>
                                            <span> </span>                                         
                                            <button  type="button" class="btn btn-danger" onClick={() => { onDelete(key) }}>
                                                {/* <i className="far fa-trash-alt"></i> */}
                                                <span>Delete</span>
                                            </button>
                                            <span> </span> 
                                            
                                            
                                          
                                        </td>
                                        
                                        

                                    </tr>
                                
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Contacts;