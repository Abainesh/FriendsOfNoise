import React, {Component} from 'react';

/* Import Components */
import CheckBox from '../components/CheckBox';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import Select from '../components/Select';
import Button from '../components/Button';

class FormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logUser: {
        fname: '',
        lname: '',
        age: '',
        gender: '',
        genrePrefs: [],
        about: ''

      },


    }

  }

  /* This lifecycle hook gets executed when the component mounts */

  handleFirstName(e) {
   let value = e.target.value;
   this.setState( prevState => ({ newUser :
        {...prevState.newUser, fname: value
        }
      }), () => console.log(this.state.newUser))
  }

  handleLastName(e) {
     let value = e.target.value;
     this.setState( prevState => ({ newUser :
          {...prevState.newUser, lname: value
          }
        }), () => console.log(this.state.newUser))
    }

  handleAge(e) {
       let value = e.target.value;
   this.setState( prevState => ({ newUser :
        {...prevState.newUser, age: value
        }
      }), () => console.log(this.state.newUser))
  }

  handleInput(e) {
       let value = e.target.value;
       let name = e.target.name;
   this.setState( prevState => ({ newUser :
        {...prevState.newUser, [name]: value
        }
      }), () => console.log(this.state.newUser))
  }

  handleTextArea(e) {
    console.log("Inside handleTextArea");
    let value = e.target.value;
    this.setState(prevState => ({
      newUser: {
        ...prevState.newUser, about: value
      }
      }), ()=>console.log(this.state.newUser))
  }


  handleCheckBox(e) {
    const newSelection = e.target.value;
    let newSelectionArray;

    if(this.state.newUser.skills.indexOf(newSelection) > -1) {
      newSelectionArray = this.state.newUser.genrePrefs.filter(s => s !== newSelection)
    } else {
      newSelectionArray = [...this.state.newUser.genrePrefs, newSelection];
    }

      this.setState( prevState => ({ newUser:
        {...prevState.newUser, genrePrefs: newSelectionArray }
      })
      )
}

  handleFormSubmit(e) {
    e.preventDefault();
    let userData = this.state.newUser;

    fetch('http://example.com',{
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(response => {
        response.json().then(data =>{
          console.log("Successful" + data);
        })
    })
  }

  handleClearForm(e) {

      e.preventDefault();
      this.setState({
        User: {
          email: '',
          password: ''
        },
      })
  }

  render() {
    return (

        <form className="container-fluid" onSubmit={this.handleFormSubmit}>

        Email:
        <Input inputType={'email'}
               title= {'email'}
               name= {'email'}
               // value={this.state.User.email}
               placeholder = {'Chanandler@email.co.tk'}
               handleChange = {this.handleInput} />

        Password: 
       <Input inputType={'password'}
              title= {'password'}
              name= {'password'}
              // value={this.state.User.password}
              placeholder = {'53cR3t!'}
              handleChange = {this.handleInput} />

              {/* user credentials */}

          <Button
              action = {this.handleFormSubmit}
              type = {'primary'}
              title = {'Submit'}
            style={buttonStyle}
          /> { /*Submit */ }

          <Button
            action = {this.handleClearForm}
            type = {'secondary'}
            title = {'Clear'}
            style={buttonStyle}
          /> {/* Clear the form */}

        </form>

    );
  }
}

const buttonStyle = {
  margin : '10px 10px 10px 10px'
}

export default FormContainer;
